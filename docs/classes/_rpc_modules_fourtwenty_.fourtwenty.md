[fourtwentyjs-client](../README.md) › ["rpc/modules/fourtwenty"](../modules/_rpc_modules_fourtwenty_.md) › [Fourtwenty](_rpc_modules_fourtwenty_.fourtwenty.md)

# Class: Fourtwenty

fourtwenty_* RPC module

**`memberof`** module:rpc/modules

## Hierarchy

* **Fourtwenty**

## Index

### Constructors

* [constructor](_rpc_modules_fourtwenty_.fourtwenty.md#constructor)

### Methods

* [getBlockByHash](_rpc_modules_fourtwenty_.fourtwenty.md#getblockbyhash)
* [getBlockByNumber](_rpc_modules_fourtwenty_.fourtwenty.md#getblockbynumber)
* [getBlockTransactionCountByHash](_rpc_modules_fourtwenty_.fourtwenty.md#getblocktransactioncountbyhash)
* [protocolVersion](_rpc_modules_fourtwenty_.fourtwenty.md#protocolversion)

## Constructors

###  constructor

\+ **new Fourtwenty**(`node`: any): *[Fourtwenty](_rpc_modules_fourtwenty_.fourtwenty.md)*

*Defined in [lib/rpc/modules/fourtwenty.js:10](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/rpc/modules/fourtwenty.js#L10)*

Create fourtwenty_* RPC module

**Parameters:**

Name | Type |
------ | ------ |
`node` | any |

**Returns:** *[Fourtwenty](_rpc_modules_fourtwenty_.fourtwenty.md)*

## Methods

###  getBlockByHash

▸ **getBlockByHash**(`params`: undefined | any[], `cb`: undefined | Function): *Promise‹any›*

*Defined in [lib/rpc/modules/fourtwenty.js:65](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/rpc/modules/fourtwenty.js#L65)*

Returns information about a block by hash

**Parameters:**

Name | Type |
------ | ------ |
`params` | undefined &#124; any[] |
`cb` | undefined &#124; Function |

**Returns:** *Promise‹any›*

___

###  getBlockByNumber

▸ **getBlockByNumber**(`params`: undefined | any[], `cb`: undefined | Function): *Promise‹any›*

*Defined in [lib/rpc/modules/fourtwenty.js:41](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/rpc/modules/fourtwenty.js#L41)*

Returns information about a block by block number

**Parameters:**

Name | Type |
------ | ------ |
`params` | undefined &#124; any[] |
`cb` | undefined &#124; Function |

**Returns:** *Promise‹any›*

___

###  getBlockTransactionCountByHash

▸ **getBlockTransactionCountByHash**(`params`: undefined | string[], `cb`: undefined | Function): *Promise‹any›*

*Defined in [lib/rpc/modules/fourtwenty.js:89](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/rpc/modules/fourtwenty.js#L89)*

Returns the transaction count for a block given by the block hash

**Parameters:**

Name | Type |
------ | ------ |
`params` | undefined &#124; string[] |
`cb` | undefined &#124; Function |

**Returns:** *Promise‹any›*

___

###  protocolVersion

▸ **protocolVersion**(`params`: undefined | any[], `cb`: undefined | Function): *void*

*Defined in [lib/rpc/modules/fourtwenty.js:108](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/rpc/modules/fourtwenty.js#L108)*

Returns the current 420coin protocol version

**Parameters:**

Name | Type |
------ | ------ |
`params` | undefined &#124; any[] |
`cb` | undefined &#124; Function |

**Returns:** *void*
