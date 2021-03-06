import { Peer } from '../net/peer/peer'
import { BoundProtocol } from '../net/protocol'
import { Synchronizer } from './sync'
import { HeaderFetcher } from './fetcher'
import { BN } from 'fourtwentyjs-util'
import { short } from '../util'

/**
 * Implements an 420coin light sync synchronizer
 * @memberof module:sync
 */
export class LightSynchronizer extends Synchronizer {
  private headerFetcher: HeaderFetcher | null

  constructor(options: any) {
    super(options)
    this.headerFetcher = null
  }

  /**
   * Returns synchronizer type
   * @return {string} type
   */
  get type(): string {
    return 'light'
  }

  /**
   * Returns true if peer can be used for syncing
   * @return {boolean}
   */
  syncable(peer: Peer): boolean {
    return peer.les && peer.les.status.serveHeaders
  }

  /**
   * Finds the best peer to sync with. We will synchronize to this peer's
   * blockchain. Returns null if no valid peer is found
   */
  best(): Peer | undefined {
    let best
    const peers = this.pool.peers.filter(this.syncable.bind(this))
    if (peers.length < this.minPeers && !this.forceSync) return
    for (const peer of peers) {
      if (peer.les) {
        const td = peer.les.status.headTd
        if (
          (!best && td.gte((this.chain.headers as any).td)) ||
          (best && best.les && best.les.status.headTd.lt(td))
        ) {
          best = peer
        }
      }
    }
    return best
  }

  /**
   * Sync all headers and state from peer starting from current height.
   * @param  peer remote peer to sync with
   * @return Resolves when sync completed
   */
  async syncWithPeer(peer?: Peer): Promise<boolean> {
    if (!peer) return false
    const height = new BN((peer.les as BoundProtocol).status.headNum)
    const first = ((this.chain.headers as any).height as BN).addn(1)
    const count = height.sub(first).addn(1)
    if (count.lten(0)) return false

    this.logger.debug(`Syncing with peer: ${peer.toString(true)} height=${height.toString(10)}`)

    this.headerFetcher = new HeaderFetcher({
      pool: this.pool,
      chain: this.chain,
      common: this.common,
      flow: this.flow,
      logger: this.logger,
      interval: this.interval,
      first,
      count,
    })
    this.headerFetcher
      .on('error', (error: Error) => {
        this.emit('error', error)
      })
      .on('fetched', (headers: any[]) => {
        const first = new BN(headers[0].number)
        const hash = short(headers[0].hash())
        this.logger.info(
          `Imported headers count=${headers.length} number=${first.toString(
            10
          )} hash=${hash} peers=${this.pool.size}`
        )
      })
    await this.headerFetcher.fetch()
    // TODO: Should this be deleted?
    // @ts-ignore: error: The operand of a 'delete' operator must be optional
    delete this.headerFetcher
    return true
  }

  /**
   * Fetch all headers from current height up to highest found amongst peers
   * @return Resolves with true if sync successful
   */
  async sync(): Promise<boolean> {
    const peer = this.best()
    return this.syncWithPeer(peer)
  }

  /**
   * Open synchronizer. Must be called before sync() is called
   */
  async open(): Promise<void> {
    await this.chain.open()
    await this.pool.open()
    const number = ((this.chain.headers as any).height as number).toString(10)
    const td = ((this.chain.headers as any).td as number).toString(10)
    const hash = ((this.chain.blocks as any).latest as any).hash()
    this.logger.info(`Latest local header: number=${number} td=${td} hash=${short(hash)}`)
  }

  /**
   * Stop synchronization. Returns a promise that resolves once its stopped.
   * @return {Promise}
   */
  async stop(): Promise<boolean> {
    if (!this.running) {
      return false
    }
    if (this.headerFetcher) {
      this.headerFetcher.destroy()
      // TODO: Should this be deleted?
      // @ts-ignore: error: The operand of a 'delete' operator must be optional
      delete this.headerFetcher
    }
    await super.stop()
    return true
  }
}
