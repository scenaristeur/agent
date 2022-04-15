import _ from 'lodash';

const TYPE_UNDEFINED = 'undefined';

export default function(Gun) {

    /**
     * Update a graph using JSON
     *
     * Updates a graph tree according to a given JSON.
     * Calculating diff and doing as minimum updates as possible
     *
     * @param json
     * @param [callback]
     * @param [isArray]
     * @returns {Gun.chain}
     */
     console.log("GUN", Gun, this.$gun)
    Gun.chain.putJSON = function putJSON(json, callback, isArray) {
        const gun = this;

        // get current state of the node
        gun.once(node => {
            const nodeUpdate = {}; // values to update

            // update the existing node
            _.forEach(node, (value, key) => {
                if (key === '_' || key === '__isArray') { // ignore meta data
                    return;
                }
                const newValue = json[key];
                const _isArray = Array.isArray(newValue);

                // update a leaf
                if (_.isPlainObject(newValue) || _isArray) {
                    const soul = Gun.node.soul(newValue);
                    // if the new value is already known Gun node with id (Gun soul)
                    if (soul) {
                        const n = gun.back(-1).get(soul); // get a corresponding node directly
                        n.putJSON(newValue, callback, _isArray); // save/update it
                        // if it's a new leaf, update the relation (graph edge)
                        if (!_.isObject(value) || value['#'] !== soul) {
                            gun.get(key).put(n, callback);
                        }
                    }
                    // if the new value doesn't have id (Gun soul), just update it
                    else {
                        gun.get(key).putJSON(newValue, callback, _isArray);
                    }
                }
                // remove an old value
                else if (typeof newValue === TYPE_UNDEFINED || newValue === null) {
                    // if it's not already removed value, mark it as removed
                    if (value !== null) {
                        gun.get(key).put(null, callback);
                    }
                }
                // update an old primitive (string, number, boolean) value
                else if (value !== newValue) {
                    nodeUpdate[key] = newValue;
                }
            });

            // apply new changes
            _.forEach(json, (value, key) => {
                if (key === '_' || key === '__isArray') { // ignore meta data
                    return;
                }
                // proceed only if:
                // - there is a new node
                // - OR the value doesn't exist or was removed
                if (!node
                    || !Object.prototype.hasOwnProperty.call(node, key)
                    || node[key] === null
                    || typeof node[key] === TYPE_UNDEFINED) { // add

                    const _isArray = Array.isArray(value);
                    if (_.isPlainObject(value) || _isArray) { // add a leaf
                        const soul = Gun.node.soul(value);
                        // if the new value is already known Gun node with id (Gun soul)
                        if (soul) {
                            const n = gun.back(-1).get(soul); // get a corresponding node directly
                            n.putJSON(value, callback, _isArray); // save/update it
                            gun.get(key).put(n, callback); // set the relation (graph edge)
                        }
                        // if the new value has no id (Gun soul), just update it
                        else {
                            gun.get(key).putJSON(value, callback, _isArray);
                        }
                    }
                    // add a primitive value (ignore null and undefined as removed values)
                    else if (typeof value !== TYPE_UNDEFINED && value !== null) {
                        nodeUpdate[key] = value;
                    }
                }
            });

            // mark the node as an array only if
            // - it is an array
            // - it wasn't marked as an array before
            if (isArray && (!node || !node.__isArray)) {
                nodeUpdate['__isArray'] = true;
            }
            // remove id (Gun soul) in case of empty objects
            delete nodeUpdate['#'];

            // update the node only if it's a new node or there are some updates
            if (!_.isEmpty(nodeUpdate) || !node) {
                gun.put(nodeUpdate, callback);
            }
        });

        // return a context unchanged (common behavior in Gun)
        return gun;
    };
}
