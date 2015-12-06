var Waterline = require('Waterline');

var Tasks = Waterline.Collection.extend({
    identity: 'tasks',
    connection: 'save',

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        content: {
            type: 'string',
            required: true
        },
        list: {
            model: 'lists',
            required: true   
        }
    }
});

module.exports = Tasks;