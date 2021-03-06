import { Service } from './service'
import { FlowControl } from '../net/protocol/flowcontrol'
import { Chain } from '../blockchain'
import Common from '@fourtwentyjs/common'

const defaultOptions = {
  lightserv: false,
  common: new Common({ chain: 'mainnet', hardfork: 'chainstart' }),
  minPeers: 3,
  timeout: 8000,
  interval: 1000,
}

/**
 * Fourtwenty service
 * @memberof module:service
 */
export class FourtwentyService extends Service {
  public flow: FlowControl
  public chain: Chain
  public common: Common
  public minPeers: number
  public interval: number
  public timeout: number
  public synchronizer: any

  /**
   * Create new FOURTWENTY service
   * @param {Object}   options constructor parameters
   * @param {Server[]} options.servers servers to run service on
   * @param {Chain}    [options.chain] blockchain
   * @param {LevelDB}  [options.db=null] blockchain database
   * @param {Common}   [options.common] 420coin network name
   * @param {number}   [options.minPeers=3] number of peers needed before syncing
   * @param {number}   [options.maxPeers=25] maximum peers allowed
   * @param {number}   [options.timeout] protocol timeout
   * @param {number}   [options.interval] sync retry interval
   * @param {Logger}   [options.logger] logger instance
   */
  constructor(options?: any) {
    options = { ...defaultOptions, ...options }
    super(options)

    this.flow = new FlowControl(options)
    this.chain = options.chain || new Chain(options)
    this.common = options.common
    this.minPeers = options.minPeers
    this.interval = options.interval
    this.timeout = options.timeout
    this.synchronizer = null
  }

  /**
   * Service name
   * @protected
   * @type {string}
   */
  get name() {
    return 'fourtwenty'
  }

  /**
   * Open fourtwenty service. Must be called before service is started
   * @return {Promise}
   */
  async open() {
    if (this.opened) {
      return false
    }
    await super.open()
    this.synchronizer.on('synchronized', () => this.emit('synchronized'))
    this.synchronizer.on('error', (error: Error) => this.emit('error', error))
    await this.chain.open()
    await this.synchronizer.open()
  }

  /**
   * Starts service and ensures blockchain is synchronized. Returns a promise
   * that resolves once the service is started and blockchain is in sync.
   * @return {Promise}
   */
  async start(): Promise<void | boolean> {
    if (this.running) {
      return false
    }
    await super.start()
    this.synchronizer.start()
  }

  /**
   * Stop service. Interrupts blockchain synchronization if its in progress.
   * @return {Promise}
   */
  async stop(): Promise<void | boolean> {
    if (!this.running) {
      return false
    }
    await this.synchronizer.stop()
    await super.stop()
  }
}
