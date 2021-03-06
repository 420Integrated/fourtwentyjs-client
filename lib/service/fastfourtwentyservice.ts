import { FourtwentyService } from './fourtwentyservice'
import { FastSynchronizer } from '../sync/fastsync'
import { FourtwentyProtocol } from '../net/protocol/fourtwentyprotocol'
import { LesProtocol } from '../net/protocol/lesprotocol'
import { Peer } from '../net/peer/peer'
import { BoundProtocol } from '../net/protocol'

const defaultOptions = {
  lightserv: false,
}

/**
 * Fourtwenty service
 * @memberof module:service
 */
export class FastFourtwentyService extends FourtwentyService {
  public lightserv: any
  /**
   * Create new FOURTWENTY service
   * @param {Object}   options constructor parameters
   * @param {Server[]} options.servers servers to run service on
   * @param {boolean}  [options.lightserv=false] serve LES requests
   * @param {Chain}    [options.chain] blockchain
   * @param {Common}   [options.common] 420coin network name
   * @param {number}   [options.minPeers=3] number of peers needed before syncing
   * @param {number}   [options.maxPeers=25] maximum peers allowed
   * @param {number}   [options.interval] sync retry interval
   * @param {Logger}   [options.logger] logger instance
   */
  constructor(options?: any) {
    super(options)
    options = { ...defaultOptions, ...options }
    this.lightserv = options.lightserv
    this.init()
  }

  init() {
    this.logger.info('Fast sync mode')
    this.synchronizer = new FastSynchronizer({
      logger: this.logger,
      pool: this.pool,
      chain: this.chain,
      common: this.common,
      minPeers: this.minPeers,
      interval: this.interval,
    })
  }

  /**
   * Returns all protocols required by this service
   * @type {Protocol[]} required protocols
   */
  get protocols(): any[] {
    const protocols: any[] = [
      new FourtwentyProtocol({
        chain: this.chain,
        timeout: this.timeout,
      }),
    ]
    if (this.lightserv) {
      protocols.push(
        new LesProtocol({
          chain: this.chain,
          flow: this.flow,
          timeout: this.timeout,
        })
      )
    }
    return protocols
  }

  /**
   * Handles incoming message from connected peer
   * @param  {Object}  message message object
   * @param  protocol protocol name
   * @param  peer peer
   */
  async handle(message: any, protocol: string, peer: Peer): Promise<any> {
    if (protocol === 'fourtwenty') {
      return this.handleFourtwenty(message, peer)
    } else {
      return this.handleLes(message, peer)
    }
  }

  /**
   * Handles incoming FOURTWENTY message from connected peer
   * @param  {Object}  message message object
   * @param  peer peer
   */
  async handleFourtwenty(message: any, peer: Peer): Promise<void> {
    if (message.name === 'GetBlockHeaders') {
      const { block, max, skip, reverse } = message.data
      const headers: any = await this.chain.getHeaders(block, max, skip, reverse)
      ;(peer.fourtwenty as BoundProtocol).send('BlockHeaders', headers)
    } else if (message.name === 'GetBlockBodies') {
      const hashes = message.data
      const blocks = await Promise.all(hashes.map((hash: any) => this.chain.getBlock(hash)))
      const bodies: any = blocks.map((block: any) => block.raw().slice(1))
      ;(peer.fourtwenty as BoundProtocol).send('BlockBodies', bodies)
    } else if (message.name === 'NewBlockHashes') {
      this.synchronizer.announced(message.data, peer)
    }
  }

  /**
   * Handles incoming LES message from connected peer
   * @param  {Object}  message message object
   * @param  peer peer
   */
  async handleLes(message: any, peer: Peer): Promise<void> {
    if (message.name === 'GetBlockHeaders' && this.lightserv) {
      const { reqId, block, max, skip, reverse } = message.data
      const bv = this.flow.handleRequest(peer, message.name, max)
      if (bv < 0) {
        this.pool.ban(peer, 300000)
        this.logger.debug(`Dropping peer for violating flow control ${peer}`)
      } else {
        const headers: any = await this.chain.getHeaders(block, max, skip, reverse)
        ;(peer.les as BoundProtocol).send('BlockHeaders', { reqId, bv, headers })
      }
    }
  }
}
