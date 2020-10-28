import tape from 'tape'
import { intToHex, BN } from 'fourtwentyjs-util'
import { startRPC, createManager, createNode, params, baseRequest } from '../helpers'

const method = 'fourtwenty_blockNumber'

tape(`${method}: call with valid arguments`, (t) => {
  const mockBlockNumber = 123
  const mockBlockChain = {
    getLatestHeader: async function (): Promise<any> {
      return Promise.resolve({
        number: new BN(mockBlockNumber),
      })
    },
  }
  const manager = createManager(createNode({ blockchain: mockBlockChain }))
  const server = startRPC(manager.getMethods())

  const req = params(method)
  const expectRes = (res: any) => {
    t.equal(res.body.result, intToHex(mockBlockNumber))
  }
  baseRequest(t, server, req, 200, expectRes)
})
