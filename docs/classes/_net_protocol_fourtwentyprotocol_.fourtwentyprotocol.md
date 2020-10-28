[fourtwentyjs-client](../README.md) › ["net/protocol/fourtwentyprotocol"](../modules/_net_protocol_fourtwentyprotocol_.md) › [FourtwentyProtocol](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md)

# Class: FourtwentyProtocol

Implements fourtwenty/62 and fourtwenty/63 protocols

**`memberof`** module:net/protocol

## Hierarchy

  ↳ [Protocol](_net_protocol_protocol_.protocol.md)

  ↳ **FourtwentyProtocol**

## Index

### Constructors

* [constructor](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#constructor)

### Accessors

* [messages](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#messages)
* [name](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#name)
* [versions](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#versions)

### Methods

* [bind](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#bind)
* [decodeStatus](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#decodestatus)
* [encodeStatus](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#encodestatus)
* [open](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md#open)

## Constructors

###  constructor

\+ **new FourtwentyProtocol**(`options`: object): *[FourtwentyProtocol](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md)*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[constructor](_net_protocol_protocol_.protocol.md#constructor)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:44](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L44)*

Create fourtwenty protocol

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | object | constructor parameters |

**Returns:** *[FourtwentyProtocol](_net_protocol_fourtwentyprotocol_.fourtwentyprotocol.md)*

## Accessors

###  messages

• **get messages**(): *[Protocol](_net_protocol_protocol_.protocol.md)‹›*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[messages](_net_protocol_protocol_.protocol.md#messages)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:78](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L78)*

Messages defined by this protocol

**`type`** {Protocol~Message[]}

**Returns:** *[Protocol](_net_protocol_protocol_.protocol.md)‹›*

___

###  name

• **get name**(): *string*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[name](_net_protocol_protocol_.protocol.md#name)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:62](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L62)*

Name of protocol

**`type`** {string}

**Returns:** *string*

___

###  versions

• **get versions**(): *number[]*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[versions](_net_protocol_protocol_.protocol.md#versions)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:70](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L70)*

Protocol versions supported

**`type`** {number[]}

**Returns:** *number[]*

## Methods

###  bind

▸ **bind**(`peer`: any, `sender`: any): *Promise‹any›*

*Inherited from [Protocol](_net_protocol_protocol_.protocol.md).[bind](_net_protocol_protocol_.protocol.md#bind)*

*Defined in [lib/net/protocol/protocol.js:155](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/protocol.js#L155)*

Binds this protocol to a given peer using the specified sender to handle
message communication.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`peer` | any | peer |
`sender` | any | sender |

**Returns:** *Promise‹any›*

___

###  decodeStatus

▸ **decodeStatus**(`status`: Object): *Object*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[decodeStatus](_net_protocol_protocol_.protocol.md#decodestatus)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:112](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L112)*

Decodes FOURTWENTY status message payload into a status object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`status` | Object | status message payload |

**Returns:** *Object*

___

###  encodeStatus

▸ **encodeStatus**(): *Object*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[encodeStatus](_net_protocol_protocol_.protocol.md#encodestatus)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:98](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L98)*

Encodes status into FOURTWENTY status message payload

**Returns:** *Object*

___

###  open

▸ **open**(): *Promise‹any›*

*Overrides [Protocol](_net_protocol_protocol_.protocol.md).[open](_net_protocol_protocol_.protocol.md#open)*

*Defined in [lib/net/protocol/fourtwentyprotocol.js:86](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/net/protocol/fourtwentyprotocol.js#L86)*

Opens protocol and any associated dependencies

**Returns:** *Promise‹any›*
