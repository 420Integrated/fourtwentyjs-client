[fourtwentyjs-client](../README.md) › ["service/fourtwentyservice"](../modules/_service_fourtwentyservice_.md) › [FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md)

# Class: FourtwentyService

420coin service

**`memberof`** module:service

## Hierarchy

  ↳ [Service](_service_service_.service.md)

  ↳ **FourtwentyService**

  ↳ [FastFourtwentyService](_service_fastfourtwentyservice_.fastfourtwentyservice.md)

  ↳ [LightFourtwentyService](_service_lightfourtwentyservice_.lightfourtwentyservice.md)

## Index

### Constructors

* [constructor](_service_fourtwentyservice_.fourtwentyservice.md#constructor)

### Accessors

* [protocols](_service_fourtwentyservice_.fourtwentyservice.md#protocols)

### Methods

* [close](_service_fourtwentyservice_.fourtwentyservice.md#close)
* [handle](_service_fourtwentyservice_.fourtwentyservice.md#handle)
* [open](_service_fourtwentyservice_.fourtwentyservice.md#open)
* [start](_service_fourtwentyservice_.fourtwentyservice.md#start)
* [stop](_service_fourtwentyservice_.fourtwentyservice.md#stop)

## Constructors

###  constructor

\+ **new FourtwentyService**(`options`: object): *[FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md)*

*Overrides [Service](_service_service_.service.md).[constructor](_service_service_.service.md#constructor)*

*Defined in [lib/service/fourtwentyservice.js:20](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L20)*

Create new FOURTWENTY service

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | object | constructor parameters |

**Returns:** *[FourtwentyService](_service_fourtwentyservice_.fourtwentyservice.md)*

## Accessors

###  protocols

• **get protocols**(): *any[]*

*Inherited from [Service](_service_service_.service.md).[protocols](_service_service_.service.md#protocols)*

*Defined in [lib/service/service.js:62](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/service.js#L62)*

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

*Inherited from [Service](_service_service_.service.md).[handle](_service_service_.service.md#handle)*

*Defined in [lib/service/service.js:127](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/service.js#L127)*

Handles incoming request from connected peer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message` | Object | message object |
`protocol` | string | protocol name |
`peer` | any | peer |

**Returns:** *Promise‹any›*

___

###  open

▸ **open**(): *Promise‹any›*

*Overrides [Service](_service_service_.service.md).[open](_service_service_.service.md#open)*

*Defined in [lib/service/fourtwentyservice.js:60](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L60)*

Open fourtwenty service. Must be called before service is started

**Returns:** *Promise‹any›*

___

###  start

▸ **start**(): *Promise‹any›*

*Overrides [Service](_service_service_.service.md).[start](_service_service_.service.md#start)*

*Defined in [lib/service/fourtwentyservice.js:76](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L76)*

Starts service and ensures blockchain is synchronized. Returns a promise
that resolves once the service is started and blockchain is in sync.

**Returns:** *Promise‹any›*

___

###  stop

▸ **stop**(): *Promise‹any›*

*Overrides [Service](_service_service_.service.md).[stop](_service_service_.service.md#stop)*

*Defined in [lib/service/fourtwentyservice.js:88](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L88)*

Stop service. Interrupts blockchain synchronization if its in progress.

**Returns:** *Promise‹any›*
