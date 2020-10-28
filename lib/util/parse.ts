import { BlockHeader } from '@fourtwentyjs/block'
import { SecureTrie as Trie } from 'merkle-patricia-tree'
import { Account, BN, keccak, rlp, toBuffer, unpadBuffer, isHexPrefixed } from 'fourtwentyjs-util'
import { parse } from 'url'

export function parseBootnodes(string: string) {
  if (!string) {
    return
  }
  try {
    return string.split(',').map((s) => {
      const match = s.match(/^(\d+\.\d+\.\d+\.\d+):([0-9]+)$/)
      if (match) {
        return { ip: match[1], port: match[2] }
      }
      const { auth: id, hostname: ip, port } = parse(s)
      return { id, ip, port }
    })
  } catch (e) {
    throw new Error(`Invalid bootnode URLs: ${e.message}`)
  }
}

export function parseTransports(transports: any[]) {
  return transports.map((t) => {
    const options: any = {}
    const [name, ...pairs] = t.split(':')
    if (pairs.length) {
      pairs
        .join(':')
        .split(',')
        .forEach((p: any) => {
          const [key, value] = p.split('=')
          options[key] = value
        })
    }
    return { name, options }
  })
}

async function parseStorage(storage: any) {
  const trie = new Trie()
  for (const [address, value] of Object.entries(storage)) {
    const key = Buffer.from(address, 'hex')
    const val = rlp.encode(unpadBuffer(Buffer.from(value as string, 'hex')))
    await trie.put(key, val)
  }
  return trie
}

async function parseG420State(alloc: any) {
  const trie = new Trie()
  for (const [key, value] of Object.entries(alloc)) {
    const address = isHexPrefixed(key) ? toBuffer(key) : Buffer.from(key, 'hex')
    const { balance, code, storage } = value as any
    const account = new Account()
    if (balance) {
      // note: balance is a Buffer
      account.balance = new BN(toBuffer(balance))
    }
    if (code) {
      account.codeHash = keccak(toBuffer(code))
    }
    if (storage) {
      const storageTrie = await parseStorage(storage)
      account.stateRoot = storageTrie.root
    }
    await trie.put(address, account.serialize())
  }
  return trie
}

async function parseG420Header(json: any) {
  const { smokeLimit, difficulty, extraData, number, nonce, timestamp, mixHash, alloc } = json
  const storageTrie = await parseG420State(alloc)
  const stateRoot = storageTrie.root
  const headerData = {
    smokeLimit,
    difficulty,
    extraData,
    number,
    nonce,
    timestamp,
    mixHash,
    stateRoot,
  }
  return BlockHeader.fromHeaderData(headerData) // TODO: Pass in common?
}

async function parseG420Params(json: any) {
  const {
    name,
    config,
    timestamp,
    smokeLimit,
    difficulty,
    nonce,
    extraData,
    mixHash,
    coinbase,
  } = json
  const { chainId } = config
  const header = await parseG420Header(json)
  const { stateRoot } = header
  const hash = header.hash()
  const params: any = {
    name,
    chainId,
    networkId: chainId,
    genesis: {
      hash,
      timestamp,
      smokeLimit,
      difficulty,
      nonce,
      extraData,
      mixHash,
      coinbase,
      stateRoot,
    },
    bootstrapNodes: [],
  }
  const hardforks = [
    'chainstart',
    'homestead',
    'dao',
    'tangerineWhistle',
    'spuriousDragon',
    'byzantium',
    'constantinople',
    'hybridCasper',
  ]
  const forkMap: { [key: string]: string } = {
    homestead: 'homesteadBlock',
    dao: 'daoForkBlock',
    tangerineWhistle: 'eip150Block',
    spuriousDragon: 'eip155Block',
    byzantium: 'byzantiumBlock',
  }
  params.hardforks = hardforks.map((name) => ({
    name: name,
    block: name === 'chainstart' ? 0 : config[forkMap[name]] || null,
  }))
  return params
}

export async function parseParams(json: any, name?: string) {
  try {
    if (json.config && json.difficulty && json.smokeLimit && json.alloc) {
      json.name = json.name || name
      if (json.nonce === undefined || json.nonce === '0x0') {
        json.nonce = '0x0000000000000000'
      }
      return parseG420hParams(json)
    } else {
      throw new Error('Invalid format')
    }
  } catch (e) {
    throw new Error(`Error parsing parameters file: ${e.message}`)
  }
}
