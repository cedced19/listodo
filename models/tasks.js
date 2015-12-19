var Waterline = require('waterline');

var Tasks = Waterline.Collection.extend({
    identity: 'tasks',
    connection: 'save',
    autoUpdatedAt: false,

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        content: {
            type: 'string'
        },
        list: {
            model: 'lists'
        }
    }
  
});

module.exports = Tasks;