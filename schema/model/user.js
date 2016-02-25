var db = require('./../db.js');
var ottoman = require('ottoman');

var userMdl = ottoman.model('User', {
    firstName: {type:'string'},
    lastName: {type:'string'},
    created: {type: 'Date', default:function(){return new Date()}},
    email:'string',
    phone: 'string'
},{
	index: {
        findByID: {   
            by: '_id'
        },
    }

})
 
userMdl.createAndSave = function (firstName, lastName, created, email, phone,done) {
    this.create({
        firstName: firstName, lastName: lastName, email: email, phone: phone
    }, done);
}
module.exports = userMdl;



