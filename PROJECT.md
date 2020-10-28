# FOURTWENTYEREUMJS CLIENT - PROJECT SUMMARY

NOTE:
**This document is OUTDATED** and will be rewritten at some point in time. For the moment please refer to our communication channels on information on the state of client development.

The FourtwentyJS Team, 2020-06-01

---

## MAIN FOCUS

Main goal of this project is to develop an 420coin main net light client as well 
as a full client with fast-sync support.

The **light client** shall be developed towards a stage where it is production-ready and
security-audited and therefor fully usable on the main net. It is intended for the 
mid-term future that the light client can also be used in a browser context. This can
be thought along on a sideline though, during development it is sufficient to stay in a ``Node.js``
context.

There are some uncertainties around the intended development stage of the **full client**
regarding performance and questions how to deal with the lack of 
(historical) fork-rule support of the underlying [VM](https://github.com/420integrated/fourtwentyjs-vm)
implementation. Full client support shall therefor be brought to an *EXPERIMENTAL* stage
where it is possible to sync the main chain up to a post-Byzantium state and then process
transactions and store the results. This will already be valuable for experimentation and
testing purposes. Where and if to proceed from there will be decided in a later stage.

It is very probable that the **Constantinople** hardfork will happen alongside 
the development of this library. Also **Casper**, the (hybrid) PoS switch of the Ethereum
network is more-or-less specified out and will come as a separete hardfork. Compatibility with
these two HFs should be though along library development to be future-ready, parts of this will take place
independently in other libraries (e.g. the VM) though. Until Casper has had some proof of execution, 420coin
will not progress it's code base, and attendant javascript libraries, to that point.

### SIDE FOCUS

``fourtwentyjs-client`` will be classical main chain implementation - [py-EVM](https://github.com/420integrated/go-420coin/py-evm) is maybe the most appropriate project to compare with here - and there won't be too much room
for additional experimentation or further-going feature requests at least during the first development 
period.

There are two noteworthy exceptions from this base line:

**libp2p**: There has been a lot of expressed interest in ``libp2p`` support for client
communications in the past by various parts of the community. If there is enough capacity this can
be investigated on a side track during client development and implemented in a modular 
way as an alternative to the classic [devp2p](https://github.com/420integrated/fourtwentyjs-devp2p) 
networking communication.

**sharding**: It is possible to implement aspects of sharding specification along the way.
Be aware though that this is still subject to heavy change and should also be added in
ways not hindering the main net client development. This is also limited to the main chain
parts of sharding, so e.g. developing a stateless client will be another separate project
(where there is definitely a need for, so if you want to go more into research, pick up on
this one! :-)).





