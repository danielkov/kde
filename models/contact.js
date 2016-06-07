var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   details: {
      type: String,
      required: true
   },
   send_date: {
      type: Date,
      default: Date.now
   }
});

var Contact = module.exports = mongoose.model('Contact', contactSchema);

module.exports.newContact = function(contact, cb){
   Contact.create(contact, cb);
}
