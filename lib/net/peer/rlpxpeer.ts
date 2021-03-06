import { randomBytes } from 'crypto'
import { Peer } from './peer'
import { Protocol } from '../protocol/protocol'
import { RlpxSender } from '../protocol/rlpxsender'
import {
  Capabilities as Devp2pCapabilities,
  DPT as Devp2pDPT,
  FOURTWENTY as Devp2pFOURTWENTY,
  LES as Devp2pLES,
  Peer as Devp2pRlpxPeer,
  RLPx as Devp2pRLPx,
} from 'fourtwentyjs-devp2p'

const devp2pCapabilities: any = {
  fourtwenty62: Devp2pFOURTWENTY.fourtwenty62,
  fourtwenty63: Devp2pFOURTWENTY.fourtwenty63,
  les2: Devp2pLES.les2,
}

/**
 * Devp2p/RLPx peer
 * @memberof module:net/peer
 * @example
 *
 * const { RlpxPeer } = require('./lib/net/peer')
 * import { Chain } from './lib/blockchain'
 * const { FourtwentyProtocol } = require('./lib/net/protocol')
 *
 * const chain = new Chain()
 * const protocols = [ new FourtwentyProtocol({ chain })]
 * const id = '70180a7fcca96aa013a3609fe7c23cc5c349ba82652c077be6f05b8419040560a622a4fc197a450e5e2f5f28fe6227637ccdbb3f9ba19220d1fb607505ffb455'
 * const host = '192.0.2.1'
 * const port = 12345
 *
 * new RlpxPeer({ id, host, port, protocols })
 *   .on('error', (err) => console.log('Error:', err))
 *   .on('connected', () => console.log('Connected'))
 *   .on('disconnected', (reason) => console.log('Disconnected:', reason))
 *   .connect()
 */
export class RlpxPeer extends Peer {
  private host: string
  private port: number
  public rlpx: Devp2pRLPx | null
  public rlpxPeer: Devp2pRlpxPeer | null
  public connected: boolean

  /**
   * Create new devp2p/rlpx peer
   * @param {Object} options constructor parameters
   * @param {string} options.id peer id
   * @param {string} options.host peer hostname or ip address
   * @param {number} options.port peer port
   * @param {Protocols[]} [options.protocols=[]] supported protocols
   * @param {Logger} [options.logger] Logger instance
   */
  constructor(options: any) {
    super({
      ...options,
      transport: 'rlpx',
      address: `${options.host}:${options.port}`,
    })

    this.host = options.host
    this.port = options.port
    this.server = null
    this.rlpx = null
    this.rlpxPeer = null
    this.connected = false
  }

  /**
   * Return devp2p/rlpx capabilities for the specified protocols
   * @param  {Protocols[]} protocols protocol instances
   * @return {Object[]} capabilities
   */
  static capabilities(protocols: Protocol[]): Devp2pCapabilities[] {
    const capabilities: Devp2pCapabilities[] = []
    protocols.forEach((protocol) => {
      const { name, versions } = protocol
      const keys = versions.map((v: number) => name + String(v))
      keys.forEach((key: any) => {
        const capability = devp2pCapabilities[key]
        if (capability) {
          capabilities.push(capability)
        }
      })
    })
    return capabilities
  }

  /**
   * Initiate peer connection
   * @return {Promise}
   */
  async connect(): Promise<void> {
    if (this.connected) {
      return
    }
    const key = randomBytes(32)
    await Promise.all(this.protocols.map((p: any) => p.open()))
    this.rlpx = new Devp2pRLPx(key, {
      capabilities: RlpxPeer.capabilities(this.protocols),
      listenPort: null,
      dpt: (<unknown>null) as Devp2pDPT, // TODO: required option
      maxPeers: (<unknown>null) as number, // TODO: required option
    })
    await this.rlpx.connect({
      id: Buffer.from(this.id, 'hex'),
      address: this.host,
      tcpPort: this.port,
    })
    this.rlpx.on('peer:error', (rlpxPeer: Devp2pRlpxPeer, error: Error) => {
      this.emit('error', error)
    })
    this.rlpx.once('peer:added', async (rlpxPeer: Devp2pRlpxPeer) => {
      try {
        await this.bindProtocols(rlpxPeer)
        this.emit('connected')
      } catch (error) {
        this.emit('error', error)
      }
    })
    this.rlpx.once('peer:removed', (rlpxPeer: Devp2pRlpxPeer, reason: any) => {
      try {
        if (rlpxPeer !== this.rlpxPeer) {
          return
        }
        reason = rlpxPeer.getDisconnectPrefix(reason)
        this.rlpxPeer = null
        this.connected = false
        this.emit('disconnected', reason as string)
      } catch (error) {
        this.emit('error', error)
      }
    })
  }

  /**
   * Accept new peer connection from an rlpx server
   * @private
   * @return {Promise}
   */
  async accept(rlpxPeer: Devp2pRlpxPeer, server: any): Promise<void> {
    if (this.connected) {
      return
    }
    await this.bindProtocols(rlpxPeer)
    this.server = server
  }

  /**
   * Adds protocols to this peer given an rlpx native peer instance.
   * @private
   * @param  {Object}  rlpxPeer rlpx native peer
   * @return {Promise}
   */
  async bindProtocols(rlpxPeer: Devp2pRlpxPeer): Promise<void> {
    this.rlpxPeer = rlpxPeer
    await Promise.all(
      rlpxPeer.getProtocols().map((rlpxProtocol: any) => {
        const name = rlpxProtocol.constructor.name.toLowerCase()
        const protocol = this.protocols.find((p: any) => p.name === name)
        if (protocol) {
          return this.bindProtocol(protocol, new RlpxSender(rlpxProtocol))
        }
      })
    )
    this.connected = true
  }
}
