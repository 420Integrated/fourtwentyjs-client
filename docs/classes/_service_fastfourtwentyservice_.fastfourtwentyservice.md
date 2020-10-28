[fourtwentyjs-client](../README.md) › ["service/fastfourtwentyservice"](../modules/_service_fastfourtwentyservice_.md) › [FastFourtwentyService](_service_fastfourtwentyservice_.fastfourtwentyservice.md)

# Class: FastFourtwentyService

420coin service

**`memberof`** module:service

## Hierarchy

  ↳ [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md)

  ↳ **FastFourtwentyService**

## Index

### Constructors

* [constructor](_service_fastfourtwentyservice_.fastfourtwentyservice.md#constructor)

### Accessors

* [protocols](_service_fastfourtwentyservice_.fastfourtwentyservice.md#protocols)

### Methods

* [close](_service_fastfourtwentyservice_.fastfourtwentyservice.md#close)
* [handle](_service_fastfourtwentyservice_.fastfourtwentyservice.md#handle)
* [handleFourtwenty](_service_fastfourtwentyservice_.fastfourtwentyservice.md#handlefourtwenty)
* [handleLes](_service_fastfourtwentyservice_.fastfourtwentyservice.md#handleles)
* [init](_service_fastfourtwentyservice_.fastfourtwentyservice.md#init)
* [open](_service_fastfourtwentyservice_.fastfourtwentyservice.md#open)
* [start](_service_fastfourtwentyservice_.fastfourtwentyservice.md#start)
* [stop](_service_fastfourtwentyservice_.fastfourtwentyservice.md#stop)

## Constructors

###  constructor

\+ **new FastFourtwentyService**(`options`: object): *[FastFourtwentyService](_service_fastfourtwentyservice_.fastfourtwentyservice.md)*

*Overrides [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md).[constructor](_service_fourtwentyservice_.fourtwentyservice.md#constructor)*

*Defined in [lib/service/fastfourtwentyservice.js:16](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L16)*

Create new FOURTWENTY service

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | object | constructor parameters |

**Returns:** *[FastFourtwentyService](_service_fastfourtwentyservice_.fastfourtwentyservice.md)*

## Accessors

###  protocols

• **get protocols**(): *any[]*

*Overrides [Service](_service_service_.service.md).[protocols](_service_service_.service.md#protocols)*

*Defined in [lib/service/fastfourtwentyservice.js:52](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L52)*

Returns all protocols required by this service

**`type`** {Protocol[]} required protocols

**Returns:** *any[]*

## Methods

###  close

▸ **close**(): *Promise‹any›*

*Inherited from [Service](_service_service_.service.md).[close](_service_service_.service.md#close)*

*Defined in [lib/service/service.js:90](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/service.js#L90)*

Close service.

**Returns:** *Promise‹any›*

___

###  handle

▸ **handle**(`message`: Object, `protocol`: string, `peer`: any): *Promise‹any›*

*Overrides [Service](_service_service_.service.md).[handle](_service_service_.service.md#handle)*

*Defined in [lib/service/fastfourtwentyservice.js:74](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L74)*

Handles incoming message from connected peer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Object | message object |
`protocol` | string | protocol name |
`peer` | any | peer |

**Returns:** *Promise‹any›*

___

###  handleFourtwenty

▸ **handleFourtwenty**(`message`: Object, `peer`: any): *Promise‹any›*

*Defined in [lib/service/fastfourtwentyservice.js:88](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L88)*

Handles incoming FOURTWENTY message from connected peer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Object | message object |
`peer` | any | peer |

**Returns:** *Promise‹any›*

___

###  handleLes

▸ **handleLes**(`message`: Object, `peer`: any): *Promise‹any›*

*Defined in [lib/service/fastfourtwentyservice.js:109](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L109)*

Handles incoming LES message from connected peer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Object | message object |
`peer` | any | peer |

**Returns:** *Promise‹any›*

___

###  init

▸ **init**(): *void*

*Defined in [lib/service/fastfourtwentyservice.js:36](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fastfourtwentyservice.js#L36)*

**Returns:** *void*

___

###  open

▸ **open**(): *Promise‹any›*

*Inherited from [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md).[open](_service_fourtwentyservice_.fourtwentyservice.md#open)*

*Overrides [Service](_service_service_.service.md).[open](_service_service_.service.md#open)*

*Defined in [lib/service/fourtwentyservice.js:60](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L60)*

Open fourtwenty service. Must be called before service is started

**Returns:** *Promise‹any›*

___

###  start

▸ **start**(): *Promise‹any›*

*Inherited from [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md).[start](_service_fourtwentyservice_.fourtwentyservice.md#start)*

*Overrides [Service](_service_service_.service.md).[start](_service_service_.service.md#start)*

*Defined in [lib/service/fourtwentyservice.js:76](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L76)*

Starts service and ensures blockchain is synchronized. Returns a promise
that resolves once the service is started and blockchain is in sync.

**Returns:** *Promise‹any›*

___

###  stop

▸ **stop**(): *Promise‹any›*

*Inherited from [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md).[stop](_service_fourtwentyservice_.fourtwentyservice.md#stop)*

*Overrides [Service](_service_service_.service.md).[stop](_service_service_.service.md#stop)*

*Defined in [lib/service/fourtwentyservice.js:88](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L88)*

Stop service. Interrupts blockchain synchronization if its in progress.

**Returns:** *Promise‹any›*
