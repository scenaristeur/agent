import _ from 'lodash';

export function gunToJson(value, removeSoul) {
    if (_.isObject(value) && value !== null) {

        let shouldBeArray = true, size = 0;
        if (!value.__isArray) {
            _.forEach(value, (item, index) => {
                if (index === '_' || index === '__keys') {
                    return;
                }
                size++;
                if (String(Number(index)) !== index) {
                    shouldBeArray = false;
                }
            });
        }
        const object = value.__isArray || (shouldBeArray && size) ? [] : {};

        let keys;
        try {
            keys = _.map(JSON.parse(value.__keys), String);
        } catch (e) {
          console.log(e)
        }

        _.forEach(value, (item, index) => {
            if (item !== null &&
                (!keys || _.indexOf(keys, String(index)) !== -1) &&
                (!removeSoul || index !== '_')) {
                object[index] = gunToJson(item, removeSoul);
            }
        });
        return object;
    } else {
        return value;
    }
}
