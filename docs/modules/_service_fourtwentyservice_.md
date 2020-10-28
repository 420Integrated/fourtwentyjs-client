[fourtwentyjs-client](../README.md) › ["service/fourtwentyservice"](_service_fourtwentyservice_.md)

# Module: "service/fourtwentyservice"

## Index

### Classes

* [FourtwentyService](../classes/_service_fourtwentyservice_.fourtwentyservice.md)

### Variables

* [Chain](_service_fourtwentyservice_.md#chain)
* [Common](_service_fourtwentyservice_.md#const-common)
* [FlowControl](_service_fourtwentyservice_.md#const-flowcontrol)
* [Service](_service_fourtwentyservice_.md#const-service)

### Object literals

* [defaultOptions](_service_fourtwentyservice_.md#const-defaultoptions)

## Variables

###  Chain

• **Chain**: *[Chain](../classes/_blockchain_chain_.chain.md)*

*Defined in [lib/service/fourtwentyservice.js:5](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L5)*

___

### `Const` Common

• **Common**: *Common* = require('fourtwentyjs-common').default

*Defined in [lib/service/fourtwentyservice.js:6](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L6)*

___

### `Const` FlowControl

• **FlowControl**: *[FlowControl](../classes/_net_protocol_flowcontrol_.flowcontrol.md)* = require('../net/protocol/flowcontrol')

*Defined in [lib/service/fourtwentyservice.js:4](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L4)*

___

### `Const` Service

• **Service**: *[Service](../classes/_service_service_.service.md)* = require('./service')

*Defined in [lib/service/fourtwentyservice.js:3](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L3)*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [lib/service/fourtwentyservice.js:8](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L8)*

###  common

• **common**: *Common‹›* = new Common('mainnet', 'chainstart')

*Defined in [lib/service/fourtwentyservice.js:10](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L10)*

###  interval

• **interval**: *number* = 1000

*Defined in [lib/service/fourtwentyservice.js:13](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L13)*

###  lightserv

• **lightserv**: *boolean* = false

*Defined in [lib/service/fourtwentyservice.js:9](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L9)*

###  minPeers

• **minPeers**: *number* = 3

*Defined in [lib/service/fourtwentyservice.js:11](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L11)*

###  timeout

• **timeout**: *number* = 5000

*Defined in [lib/service/fourtwentyservice.js:12](https://github.com/420integrated/fourtwentyjs-client/blob/master/lib/service/fourtwentyservice.js#L12)*
