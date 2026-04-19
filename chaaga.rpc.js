class ChaagaRPC {
    constructor() {
        this._id = 0;
        this._pending = new Map();
        this._onUpdate = null;
        this._onError = null;
        this._onReady = null;
        this._onTakeControl = null;
    }
    start() {
        window.addEventListener('message', (event) => {
            const { id, result, error, method, params } = event.data;
            console.debug("event data", event.data)
            // Handle updates from parent
            if (method === 'update' && this._onUpdate) {
                this._onUpdate(params[0], params[1]);
                return;
            }
            if (method === 'error' && this._onError) {
                this._onError(params);
                return;
            }
            if (method === 'ready' && this._onReady) {
                this._onReady(params);
                return;
            }
            if (method === 'takecontrol' && this._onTakeControl) {
                this._onTakeControl(params);
                return;
            }

            // Handle RPC responses
            if (id !== undefined && this._pending.has(id)) {
                const { resolve, reject } = this._pending.get(id);
                this._pending.delete(id);
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            }
        });
        window.parent.postMessage({ method: 'start' }, '*');
        return this;
    }

   async _send(method, params) {
        return new Promise((resolve, reject) => {
            const id = ++this._id;
            this._pending.set(id, { resolve, reject });
            window.parent.postMessage({ id, method, params }, '*');
        });
    }

    async get(key) {
        return this._send('get', key);
    }

    async set(key, value) {
        return this._send('set', { key, value });
    }

    async delete(key) {
        return this._send('delete', key);
    }

    async getMany(keys) {
        return this._send('getMany', keys);
    }

    async setMany(entries) {
        return this._send('setMany', entries);
    }

    async deleteMany(keys) {
        return this._send('deleteMany', keys);
    }

    onReady(callback) {
        this._onReady = callback;
        return this;
    }
    onUpdate(callback) {
        this._onUpdate = callback;
        return this;
    }
    onError(callback) {
        this._onError = callback;
        return this;
    }
    onTakeControl(callback) {
        this._onTakeControl = callback;
        return this;
    }

    getUserId() {
        return this._send('getUserId');
    }
    getUserName() {
        return this._send('getUserName');
    }

    listFiles() {
        return this._send('listFiles');
    }
}

window.ChaagaRPC = ChaagaRPC;