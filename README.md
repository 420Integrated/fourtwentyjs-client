# SYNOPSIS

This is the work repository for the FourtwentyJS client project targeting both Node.js and the browser as a platform.

See [Technical Guidelines](#technical-guidelines) to dive directly into development info.

Current development stage: `EARLY DEVELOPMENT`

# PROJECT SUMMARY

Project summary from [this document](./PROJECT.md) is currently outdated. Please refer to our communication channels for some information on the current state of client development.

# TECHNICAL GUIDELINES

## Client Setup

**Installing the Client**

```shell
npm install fourtwentyjs-client
```

For the `fourtwentyjs` CLI command to work run:

```shell
npm link
```

Note: for development purposes you can invoke the client by build with `npm run build:node` and 
then run `node ./dist/bin/cli.js`.

**Running the Client**

Some building blocks for the client have already been implemented or outlined to further build upon.

You can run the current state of the client with:

```shell
fourtwentyjs --network=mainnet [--loglevel=debug]
```

For development you might want to connect to `rinkeby` as the network with the currently 
most reliable connection:

```shell
fourtwentyjs --network rinkeby
```

The help can be shown with:

```shell
fourtwentyjs --help
```

If you want to have verbose logging output for the p2p communication you can use...

```shell
DEBUG=*,-babel [CLIENT_START_COMMAND]
```

for all output or something more targeted by listing the loggers like

```shell
DEBUG=devp2p:rlpx,devp2p:fourtwenty,-babel [CLIENT_START_COMMAND]
```

## API

[API Reference](./docs/README.md)

See also this [diagram](./diagram/client.svg) for an overview of the client structure with the initialization and message flow.

## JSON-RPC

**Overview**

You can expose a [JSON-RPC](https://github.com/fourtwentyereum/wiki/wiki/JSON-RPC) interface along a client run with:

```shell
fourtwentyjs --rpc
```

To run just the server without syncing:

```shell
fourtwentyjs --rpc --maxPeers=0
```

Currently only a small subset of `RPC` methods are implemented.(\*) You can have a look at the
[./lib/rpc/modules/](./lib/rpc/modules) source folder or the tracking issue
[#17](https://github.com/420integrated/fourtwentyjs-client/issues/17) for an overview.

(*) Side note: implementing RPC methods is actually an extremely thankful task for a first-time
contribution on the project *hint\* _hint_. 😄

**API Examples**

You can use `cURL` to request data from an API endpoint. Here is a simple example for
[web3_clientVersion](https://github.com/fourtwentyereum/wiki/wiki/JSON-RPC#web3_clientversion):

```shell
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","id":1,"method":"web3_clientVersion", "params": []}' http://localhost:6174
```

Note that `"params": []` can also be omitted in this case.

Or - somewhat more convenient and with formatted output - with a tool like [httpie](http://httpie.org/):

```shell
http POST http://localhost:6174 jsonrpc=2.0 id=1 method=web3_clientVersion params:=[]
```

Note the `:=` separator for the `params` parameter to
[indicate](https://httpie.org/docs#non-string-json-fields) raw `JSON` as an input.

This will give you an output like the following:

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": "FourtwentyJS/0.0.5/darwin/node12.15.0"
}
```

Here's an example for a call on an endpoint with the need for parameters. The following call uses
the [fourtwenty_getBlockByNumer](https://github.com/fourtwentyereum/wiki/wiki/JSON-RPC#fourtwenty_getblockbynumber) endpoint
to request data for block number 436 (you can use an tool like
[RapidTables](https://www.rapidtables.com/convert/number/decimal-to-hex.html) for conversion to `hex`):

```shell
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"fourtwenty_getBlockByNumber","params":["0x1b4", true],"id":1}' http://127.0.0.1:6174
```

Same with `httpie`:

```shell
http POST http://localhost:6174 jsonrpc=2.0 id=1 method=fourtwenty_getBlockByNumber params:='["0x1b4",true]'
```

Output:

```json
{
  "id": "1",
  "jsonrpc": "2.0",
  "result": {
    "header": {
      "bloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
      "difficulty": "0x04ea3f27bc",
      "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
      "smokeLimit": "0x1388",
      "smokeUsed": "0x",
      "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
      "nonce": "0x689056015818adbe",
      "number": "0x01b4",
      "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
      "receiptTrie": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
      "timestamp": "0x55ba467c",
      "transactionsTrie": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "uncleHash": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347"
    },
    "transactions": [],
    "uncleHeaders": []
  }
}
```

## EXAMPLES

### Example 1: Light sync

In this example, we will run two fourtwentyjs-clients. The first will be a fast sync client that
will connect to the rinkeby network and start downloading the blockchain. The second will be a
light client that connects to the first client and syncs headers as they are downloaded.

The first client will use RLPx to connect to the rinkeby network, but will also provide a libp2p
listener. The second client will use libp2p to connect to the first client.

Run the first client and start downloading blocks:

```
fourtwentyjs --syncmode fast --lightserv true  --datadir first --network rinkeby --transports rlpx libp2p:multiaddrs=/ip4/127.0.0.1/tcp/50505/ws
```

Output:

<pre>
...
INFO [10-24|11:42:26] Listener up transport=rlpx url=enode://1c3a3d70e9fb7c274355b7ffbbb34465576ecec7ab275947fd4bdc7ddcd19320dfb61b210cbacc0702011aea6971204d4309cf9cc1856fce4887145962281907@[::]:13013
INFO [10-24|11:37:48] Listener up transport=libp2p url=<b>/ip4/127.0.0.1/tcp/50505/ws/ipfs/QmYAuYxw6QX1x5aafs6g3bUrPbMDifP5pDun3N9zbVLpEa</b>
...
</pre>

Copy the libp2p URL from the output. In this example, the url is `/ip4/127.0.0.1/tcp/50505/ws/ipfs/QmYAuYxw6QX1x5aafs6g3bUrPbMDifP5pDun3N9zbVLpEa` but it will be different in your case.

Wait until a few thousand blocks are downloaded and then run the second client in a new terminal, using the url above to connect to the first client:

<pre>
fourtwentyjs --syncmode light --network rinkeby --datadir second --transports libp2p:multiaddrs=/ip4/0.0.0.0/tcp/50506,bootnodes=<b>/ip4/127.0.0.1/tcp/50505/ws/ipfs/QmYAuYxw6QX1x5aafs6g3bUrPbMDifP5pDun3N9zbVLpEa</b>
</pre>

Notice that we have to run the second client on port 50506 using the `multiaddrs=/ip4/0.0.0.0/tcp/50506` libp2p option to avoid port conflicts.

### Example 2: Light sync from within a browser

In this example, we will again perform a light sync by connecting to the first client from above. However, this time we will connect directly to the first client from within a browser window using libp2p websockets.

First, let's make the bundle:

```
git clone https://github.com/420integrated/fourtwentyjs-client
cd fourtwentyjs-client
npm i
npm run build:browser
```

This will create the file `dist/bundle.js`. Now, we will create an`index.html` file that serves it up on `http://localhost:8080`.

```
echo '<script src="/dist/bundle.js"></script>' > index.html
npm i -g http-server
http-server
```

Now, open a new browser window and navigate to `http://localhost:8080`. Open the developer console in your browser and run the following command to start syncing to the first client. Again, remember to change the value of bootnodes to match the url of the first client from above:

```
fourtwentyjs.run({ network: 'rinkeby', syncmode: 'light', bootnodes: '/ip4/127.0.0.1/tcp/50505/ws/ipfs/QmYAuYxw6QX1x5aafs6g3bUrPbMDifP5pDun3N9zbVLpEa' })
```

That's it! Now, you should start seeing headers being downloaded to the local storage of your browser. Since IndexDB is being used, even if you close and re-open the browser window, the headers you've downloaded will be saved.

![FourtwentyJS Client Libp2p Browser Syncing](./browser_sync.png?raw=true)

## Design

**Goals**

Contributors should aim to achieve the following goals when making design decisions:

- **Loosely coupled components**: Components should require as little knowledge of the definitions of
  other components as possible. This reduces dependencies between PRs and encourages contributors
  to work in parallel. It also improves extensibility of the code as new features like sharding
  and libp2p support are added.
- **Easily tested**: The design should make testing of individual components as easy as possible.
  This goes hand in hand with the previous goal of loose coupling.
- **Readable code**: More readable code should encourage more contributions from the community and help
  with bug fixing.
- **Well documented**: Similar to above, this will help both contributors and users of the project.

The current design tries to achieves the goals of loose coupling and ease of testing by using an
event-driven architecture where possible. Readability is improved by using features of JavaScript
ES6 such as classes, async/await, promises, arrow functions, for...of, template literals and
destructuring assignment among others. Shorter names are used when possible and long functions are
broken up into smaller helpers, along with TypeDoc annotations for most methods and parameters.
Documentation is auto-generated from TypeDoc comments and many examples of usage are provided (TO DO).

We will now briefly describe the directory structure and main components of the Fourtwentyjs client
to help contributors better understand how the project is organized.

**Directory structure**

- `/bin` Contains the CLI script for the `fourtwentyjs` command.
- `/docs` Contains auto-generated API docs.
- `/lib/blockchain` Contains the `Chain` class.
- `/lib/net` Contains all of the network layer classes including `Peer`, `Protocol` and its subclasses, `Server` and its subclasses, and `PeerPool`.
- `/lib/service` Contains the main Fourtwenty services (`FastFourtwentyService` and `LightFourtwentyService`).
- `/lib/rpc` Contains the RPC server (optionally) embedded in the client.
- `/lib/sync` Contains the various chain synchronizers and `Fetcher` helpers.
- `/test` Contains test cases, testing helper functions, mocks and test data.

**Components**

- `Chain` [**In Progress**] This class represents the blockchain and is a wrapper around
  `fourtwentyjs-blockchain`. It handles creation of the data directory, provides basic blockchain operations
  and maintains an updated current state of the blockchain, including current height, total difficulty, and
  latest block.
- `Server` This class represents a server that discovers new peers and handles incoming and dropped
  connections. When a new peer connects, the `Server` class will negotiate protocols and emit a `connected`
  event with a new `Peer`instance. The peer will have properties corresponding to each protocol. For example,
  if a new peer understands the `fourtwenty` protocol, it will contain an `fourtwenty` property that provides all `fourtwenty`
  protocol methods (for example: `peer.fourtwenty.getBlockHeaders()`) - `RlpxServer` [**In Progress**] Subclass of `Server` that implements the `devp2p/rlpx` transport. - `Libp2pServer` [**In Progress**] Subclass of `Server` that implements the `libp2p` transport.
- `Peer` Represents a network peer. Instances of `Peer` are generated by the `Server`
  subclasses and contain instances of supported protocol classes as properties. Instances of `Peer` subclasses can also be used to directly connect to other nodes via the `connect()` method. Peers emit `message` events
  whenever a new message is received using any of the supported protocols. - `RlpxPeer` [**In Progress**] Subclass of `Peer` that implements the `devp2p/rlpx` transport. - `Libp2pPeer` [**In Progress**] Subclass of `Peer` that implements the `libp2p` transport.
- `Protocol` [**In Progress**] This class and subclasses provide a user-friendly wrapper around the
  low level 420coin protocols such as `fourtwenty/62`, `fourtwenty/63` and `les/2`. Subclasses must define the messages provided by the protocol. - `FourtwentyProtocol` [**In Progress**] Implements the `fourtwenty/62` and `fourtwenty/63` protocols. - `LesProtocol` [**In Progress**] Implements the `les/2` protocol. - `ShhProtocol` [**Not Started**] Implements the whisper protocol.
- `PeerPool` [**In Progress**] Represents a pool of network peers. `PeerPool` instances emit `added`
  and `removed` events when new peers are added and removed and also emit the `message` event whenever
  any of the peers in the pool emit a message. Each `Service` has an associated `PeerPool` and they are used primarily by `Synchronizer`s to help with blockchain synchronization.
- `Synchronizer` Subclasses of this class implements a specific blockchain synchronization strategy. They
  also make use of subclasses of the `Fetcher` class that help fetch headers and bodies from pool peers. The fetchers internally make use of streams to handle things like queuing and backpressure. - `FastSynchronizer` [**In Progress**] Implements fast syncing of the blockchain - `LightSynchronizer` [**In Progress**] Implements light syncing of the blockchain
- `Handler` Subclasses of this class implements a protocol message handler. Handlers respond to incoming requests from peers.
  - `EthHandler` [**In Progress**] Handles incoming FOURTWENTY requests
  - `LesHandler` [**In Progress**] Handles incoming LES requests
- `Service` Subclasses of `Service` will implement specific functionality of a `Node`. For example, the `FourtwentyService` subclasses will synchronize the blockchain using the fast or light sync protocols. Each service must specify which protocols it needs and define a `start()` and `stop()` function.
  - `FastFourtwentyService` [**In Progress**] Implementation of 420coin fast sync.
  - `LightFourtwentyService` [**In Progress**] Implementation of 420coin light sync.
  - `WhisperService` [**Not Started**] Implementation of an 420coin whisper node.
- `Node` [**In Progress**] Represents the top-level 420coin node, and is responsible for managing the lifecycle of included services.
- `RPCManager` [**In Progress**] Implements an embedded JSON-RPC server to handle incoming RPC requests.

## Developer

### Diagram Updates

To update the structure diagram files in the root folder open the `client.drawio` file in [draw.io](https://draw.io/), make your changes, and open a PR with the updated files. Export `svg` and `png` with `border` `width=20` and `transparency=false`. For `png` go to "Advanced" and select `300 DPI`.

## Environment / Ecosystem

**FourtwentyJS Ecosystem**

This project will be embedded in the FourtwentyJS ecosystem and many submodules already exist and
can be used within the project, have a look e.g. at [fourtwentyjs-block](https://github.com/420integrated/fourtwentyjs-vm/tree/master/packages/block), [fourtwentyjs-vm](https://github.com/420integrated/fourtwentyjs-vm), the
[merkle-patricia-tree](https://github.com/fourtwentyjs/merkle-patricia-tree) or the
[fourtwentyjs-devp2p](https://github.com/420integrated/fourtwentyjs-devp2p) implementation. Work needs to be done both within this repos and related libraries.

Related issues are labelled with the `fourtwentyjs-client` label, see [here](https://github.com/search?utf8=%E2%9C%93&q=org%3Afourtwentyjs+label%3Afourtwentyjs-client&type=Issues&ref=advsearch&l=&l=) for an org-wide search.


