var Waterline = require('Waterline');

var Tasks = Waterline.Collection.extend({
    identity: 'lists',
    connection: 'save',
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        tasks: {
            collection: 'tasks',
            via: 'list'
        }
    }
});

module.exports = Tasks;