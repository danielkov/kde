var mongoose = require('mongoose');

var newsletterSchema = mongoose.Schema({
   name: {
      type: String
   },
   email: {
      type: String,
      required: true
   },
   sub_date: {
      type: Date,
      default: Date.now
   }
});

var Newsletter = module.exports = mongoose.model('Newsletter', newsletterSchema);

module.exports.newSubscriber = function(name, email, cb){
   Newsletter.create({name: name, email: email}, cb);
}
