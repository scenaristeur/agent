import _ from 'lodash';

export default function(Gun) {

    /**
     * Get a graph tree as a JSON
     * @returns Promise
     */
    Gun.chain.getJSON = function() {
        return new Promise(resolve => {

            const gun = this;
            // get current state of the node
            gun.once(node => {
                const json = {};

                const promises = [];
                const promiseMap = {};
                _.forEach(node, (value, key) => {
                    if (key === '#') { // ignore meta data
                        return;
                    }
                    if (key === '_' && value['#']) { // get only an id (Gun soul), ignore other meta data
                        json._ = {'#': value['#']};
                        return;
                    }
                    // it's object, it means there is a relation (graph edge) to another graph node
                    if (_.isPlainObject(value)) {
                        promiseMap[promises.length] = key;
                        // get a graph subtree recursively
                        promises.push(gun.get(key).getJSON());
                    }
                    // take primitive values (strings, numbers, booleans, etc) as is
                    else {
                        json[key] = value;
                    }
                });

                // wait for all the data and return it
                Promise.all(promises).then(results => {
                    _.forEach(results, (result, index) => {
                        json[promiseMap[index]] = result;
                    });
                    resolve(json);
                });
            });

        });
    };

}
