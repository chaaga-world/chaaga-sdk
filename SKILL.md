## Using chaaga SDK


The `chaaga.rpc.js` library connect a javascript app to a remote key-value store without any configuration.

It is availble on a CDN at `https://cdn.jsdelivr.net/gh/chaaga-world/chaaga-sdk@latest/chaaga.rpc.js`



### Initialising

The first step to use the SDK is creating an instance of ChaagaRPC `const chaaga = new ChaagaRPC();` configuring the following callbacks:
    * `async chaaga.onReady(state)`: Called when the client is connected to the store.
    * `chaaga.onError(e)`: Called when an error occurs.
    * `chaaga.onUpdate(key, value)`: Called when a key in the store changes.
    * `chaaga.onTakeControl(state)`: Called when this client becomes the "Main Peer" (leader). Only one client is the leader at a time.
    * The `state` argument in the function is an object {} representing the current game state. Keys are strings. Values can be numbers or strings (max 128 chars).
    * Note: These callback methods return `this`, allowing for method chaining (e.g., `chaaga.onReady(...).onUpdate(...)`).

### Chaaga API

You can then use the following functions
    * `chaaga.start()`: Starts the connection to the store.
    * `async chaaga.set(key, value)`: Updates a value in the store.
    * `async chaaga.setMany([{key, value}, ...])`: Updates multiple values in the store.
    * `async chaaga.delete(key)`: Deletes a value from the store.
    * `async chaaga.deleteMany([key, ...])`: Deletes multiple values from the store.
    * `async chaaga.get(key)`: Gets a value from the local copy of the store.
    * `async chaaga.getMany([key, ...])`: Gets multiple values from the local copy of the store.
    * `async chaaga.getUserId()`: Returns the current client's unique ID.
    * `async chaaga.getUserName()`: Returns the current client's user name.
