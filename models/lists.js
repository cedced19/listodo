var Waterline = require('Waterline');

var Tasks = Waterline.Collection.extend({
    identity: 'lists',
    connection: 'save',

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        tasks: {
            model: 'tasks',
            via: 'list'
        }
    }
});

module.exports = Tasks;