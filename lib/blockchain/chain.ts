import { EventEmitter } from 'events'
import Common from '@fourtwentyjs/common'
import { Block, BlockHeader } from '@fourtwentyjs/block'
import Blockchain from '@fourtwentyjs/blockchain'
import { BN, toBuffer } from 'fourtwentyjs-util'
import { defaultLogger } from '../logging'
import type { LevelUp } from 'levelup'

/**
 * The options that the Blockchain constructor can receive.
 */
export interface ChainOptions {
  /**
   * Database to store blocks and metadata. Should be an abstract-leveldown compliant store.
   */
  db?: LevelUp

  /**
   * Specify the chain and hardfork by passing a Common instance.
   *
   * If not provided this defaults to chain `mainnet` and hardfork `chainstart`
   */
  common?: Common

  /**
   * Specify a blockchain which implements the Chain interface
   */
  blockchain?: Blockchain

  /**
   * Logging provider
   */
  logger?: any
}

/**
 * Returns properties of the canonical blockchain.
 */
export interface ChainBlocks {
  /**
   * The latest block in the chain
   */
  latest: Block | null

  /**
   * The total difficulty of the blockchain
   */
  td: BN

  /**
   * The height of the blockchain
   */
  height: BN
}

/**
 * Returns properties of the canonical headerchain.
 */
export interface ChainHeaders {
  /**
   * The latest header in the chain
   */
  latest: BlockHeader | null

  /**
   * The total difficulty of the headerchain
   */
  td: BN

  /**
   * The height of the headerchain
   */
  height: BN
}

/**
 * common.genesis() <any> with all values converted to Buffer
 */
export interface GenesisBlockParams {
  [key: string]: Buffer
}

/**
 * Blockchain
 * @memberof module:blockchain
 */
export class Chain extends EventEmitter {
  public logger: any
  public common: Common
  public db: any
  public blockchain: Blockchain
  public opened: boolean

  private _headers: ChainHeaders = {
    latest: null,
    td: new BN(0),
    height: new BN(0),
  }

  private _blocks: ChainBlocks = {
    latest: null,
    td: new BN(0),
    height: new BN(0),
  }

  /**
   * Create new chain
   * @param {ChainOptions} options
   */
  constructor(options: ChainOptions = {}) {
    super()
    this.logger = options.logger || defaultLogger
    this.common = options.common || new Common({ chain: 'mainnet', hardfork: 'chainstart' })

    this.blockchain =
      options.blockchain ||
      new Blockchain({
        db: options.db,
        validateBlocks: false,
        validatePow: false,
        common: this.common,
      })

    this.db = this.blockchain.db
    this.opened = false
  }

  /**
   * Resets _header, _blocks
   */
  private reset() {
    this._headers = {
      latest: null,
      td: new BN(0),
      height: new BN(0),
    }
    this._blocks = {
      latest: null,
      td: new BN(0),
      height: new BN(0),
    }
  }

  /**
   * Network ID
   * @return {number}
   */
  get networkId(): number {
    return this.common.networkId()
  }

  /**
   * Genesis block parameters
   */
  get genesis(): GenesisBlockParams {
    const genesis = this.common.genesis()
    Object.entries(genesis).forEach(([k, v]) => {
      genesis[k] = toBuffer(v as string)
    })
    return genesis
  }

  /**
   * Returns properties of the canonical headerchain.
   * @return {ChainHeaders}
   */
  get headers(): ChainHeaders {
    return { ...this._headers }
  }

  /**
   * Returns properties of the canonical blockchain.
   * @return {ChainBlocks}
   */
  get blocks(): ChainBlocks {
    return { ...this._blocks }
  }

  /**
   * Open blockchain and wait for database to load
   * @return {Promise<boolean|void>} Returns false if chain is already open
   */
  async open(): Promise<boolean | void> {
    if (this.opened) {
      return false
    }

    await this.blockchain.db.open()
    this.opened = true
    await this.update()
  }

  /**
   * Closes chain
   * @return {Promise<boolean|void>} Returns false if chain is closed
   */
  async close(): Promise<boolean | void> {
    if (!this.opened) {
      return false
    }
    this.reset()
    await this.blockchain.db.close()
    this.opened = false
  }

  /**
   * Update blockchain properties (latest block, td, height, etc...)
   * @return {Promise<boolean|void>} Returns false if chain is closed
   */
  async update(): Promise<boolean | void> {
    if (!this.opened) {
      return false
    }
    const headers: any = {}
    const blocks: any = {}
    headers.latest = await this.getLatestHeader()
    blocks.latest = await this.getLatestBlock()

    headers.height = new BN(headers.latest.number)
    blocks.height = new BN(blocks.latest.header.number)

    headers.td = await this.getTd(headers.latest.hash(), headers.height)
    blocks.td = await this.getTd(blocks.latest.hash(), blocks.height)

    this._headers = headers
    this._blocks = blocks
    this.emit('updated')
  }

  /**
   * Get blocks from blockchain
   * @param  {Buffer | BN}      block   hash or number to start from
   * @param  {number = 1}       max     maximum number of blocks to get
   * @param  {number = 0}       skip    number of blocks to skip
   * @param  {boolean = false}  reverse get blocks in reverse
   * @return {Promise<Block[]>}
   */
  async getBlocks(
    block: Buffer | BN,
    max: number = 1,
    skip: number = 0,
    reverse: boolean = false
  ): Promise<Block[]> {
    await this.open()
    return this.blockchain.getBlocks(block, max, skip, reverse)
  }

  /**
   * Gets a block by its hash or number
   * @param  {Buffer|BN}        block
   * @return {Promise<Block>}
   */
  async getBlock(block: Buffer | BN): Promise<Block> {
    await this.open()
    return this.blockchain.getBlock(block)
  }

  /**
   * Insert new blocks into blockchain
   * @param  {Block[]}       blocks list of blocks to add
   * @return {Promise<void>}
   */
  async putBlocks(blocks: Block[]): Promise<void> {
    if (!blocks) {
      return
    }
    await this.open()
    blocks = blocks.map((b: Block) => Block.fromValuesArray(b.raw(), { common: this.common }))
    await this.blockchain.putBlocks(blocks)
    await this.update()
  }

  /**
   * Get headers from blockchain
   * @param  {Buffer|BN}  block   block hash or number to start from
   * @param  {number}     max     maximum number of headers to get
   * @param  {number}     skip    number of headers to skip
   * @param  {boolean}    reverse get headers in reverse
   * @return {Promise<BlockHeader[]>}
   */
  async getHeaders(
    block: Buffer | BN,
    max: number,
    skip: number,
    reverse: boolean
  ): Promise<BlockHeader[]> {
    const blocks = await this.getBlocks(block, max, skip, reverse)
    return blocks.map((b) => b.header)
  }

  /**
   * Insert new headers into blockchain
   * @param  {BlockHeader[]} headers
   * @return {Promise<void>}
   */
  async putHeaders(headers: BlockHeader[]): Promise<void> {
    if (!headers) {
      return
    }
    await this.open()
    headers = headers.map((h) => BlockHeader.fromValuesArray(h.raw(), { common: this.common }))
    await this.blockchain.putHeaders(headers)
    await this.update()
  }

  /**
   * Gets the latest header in the canonical chain
   * @return {Promise<BlockHeader>}
   */
  async getLatestHeader(): Promise<BlockHeader> {
    await this.open()
    return this.blockchain.getLatestHeader()
  }

  /**
   * Gets the latest block in the canonical chain
   * @return {Promise<Block>}
   */
  async getLatestBlock(): Promise<Block> {
    await this.open()
    return this.blockchain.getLatestBlock()
  }

  /**
   * Gets total difficulty for a block
   * @param  {Buffer}      hash
   * @param  {BN}          num
   * @return {Promise<BN>}
   */
  async getTd(hash: Buffer, num: BN): Promise<BN> {
    await this.open()
    return this.blockchain._getTd(hash, num)
  }
}
