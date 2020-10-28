[fourtwentyjs-client](../README.md) › ["util/parse"](_util_parse_.md)

# Module: "util/parse"

## Index

### Variables

* [Account](_util_parse_.md#const-account)
* [Block](_util_parse_.md#const-block)
* [Trie](_util_parse_.md#const-trie)
* [path](_util_parse_.md#const-path)
* [url](_util_parse_.md#const-url)
* [util](_util_parse_.md#const-util)

### Functions

* [parseBootnodes](_util_parse_.md#parsebootnodes)
* [parseG420Header](_util_parse_.md#parseg420header)
* [parseG420Params](_util_parse_.md#parseg420params)
* [parseG420State](_util_parse_.md#parseg420state)
* [parseParams](_util_parse_.md#parseparams)
* [parseStorage](_util_parse_.md#parsestorage)
* [parseTransports](_util_parse_.md#parsetransports)
* [toBuffer](_util_parse_.md#tobuffer)

## Variables

### `Const` Account

• **Account**: *Account* = require('fourtwentyjs-account').default

*Defined in [lib/util/parse.js:3](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L3)*

___

### `Const` Block

• **Block**: *any* = require('fourtwentyjs-block')

*Defined in [lib/util/parse.js:4](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L4)*

___

### `Const` Trie

• **Trie**: *any* = require('merkle-patricia-tree/secure')

*Defined in [lib/util/parse.js:5](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L5)*

___

### `Const` path

• **path**: *PlatformPath* = require('path')

*Defined in [lib/util/parse.js:8](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L8)*

___

### `Const` url

• **url**: *"url"* = require('url')

*Defined in [lib/util/parse.js:7](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L7)*

___

### `Const` util

• **util**: *"/Users/ryanghods/dev/fourtwentyjs-client/node_modules/fourtwentyjs-util/dist/index"* = require('fourtwentyjs-util')

*Defined in [lib/util/parse.js:6](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L6)*

## Functions

###  parseBootnodes

▸ **parseBootnodes**(`string`: any): *any*

*Defined in [lib/util/parse.js:14](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`string` | any |

**Returns:** *any*

___

###  parseG420Header

▸ **parseG420Header**(`json`: any): *Promise‹any›*

*Defined in [lib/util/parse.js:89](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`json` | any |

**Returns:** *Promise‹any›*

___

###  parseG420Params

▸ **parseG420Params**(`json`: any): *Promise‹object›*

*Defined in [lib/util/parse.js:102](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`json` | any |

**Returns:** *Promise‹object›*

___

###  parseG420State

▸ **parseG420State**(`alloc`: any): *Promise‹any›*

*Defined in [lib/util/parse.js:63](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`alloc` | any |

**Returns:** *Promise‹any›*

___

###  parseParams

▸ **parseParams**(`jsonFilePath`: any): *Promise‹object›*

*Defined in [lib/util/parse.js:145](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`jsonFilePath` | any |

**Returns:** *Promise‹object›*

___

###  parseStorage

▸ **parseStorage**(`storage`: any): *Promise‹any›*

*Defined in [lib/util/parse.js:46](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`storage` | any |

**Returns:** *Promise‹any›*

___

###  parseTransports

▸ **parseTransports**(`transports`: any): *any*

*Defined in [lib/util/parse.js:32](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`transports` | any |

**Returns:** *any*

___

###  toBuffer

▸ **toBuffer**(`string`: any): *Buffer‹›*

*Defined in [lib/util/parse.js:10](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/util/parse.js#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`string` | any |

**Returns:** *Buffer‹›*
