var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var helmet = require('helmet');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var mongodb_db_url = process.env.MONGOLAB_URI || 'mongodb://kde:kde10@ds025603.mlab.com:25603/heroku_p4cvkbsv';

var mongoose = require('mongoose');
mongoose.connect(mongodb_db_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('Connected to MongoDB');
});

var Newsletter = require('./models/newsletter');
var Contact = require('./models/contact');

var port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('tiny'));
app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules/socket.io-client'));

app.get('/', function(req, res){
   res.render('/client/index.html');
});

var socketHandler = {
   getSockets: function(){
      for(var i in this.list){
         console.log(this.list[i].id);
      }
   },
   list: {}
}


var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

io.on('connection', function(socket){
   var id = socket.id;
   socketHandler.list[id] = socket;
   console.log('Sockets connected: ' + Object.keys(socketHandler.list).length);
   socketHandler.getSockets();

   socket.on('newsLetter', function(data){
      var name;
      var email = data.email;
      if(data.name){
         name = data.name;
      }else{
         name = 'Feliratkozó';
      }
      if(validateEmail(email)) {
         Newsletter.newSubscriber(name, email, function(){
            console.log(name+' just subscribed!');
            socket.emit('nlStatus', {message: 'Sikeresen feliratkoztál! :)'});
         });
      }else{
         socket.emit('nlStatus', {message: 'Úgy tűnik, hibás e-mailt adtál meg.'});
      }
   });

   socket.on('contactForm', function(data){
      var name = data.name, email = data.email, phone = data.phone, details = data.details;
      if (name && validateEmail(email) && phone && details) {
         Contact.newContact(data, function(){
            socket.emit('contactRes', {message: 'Sikeresen elküldve! Válaszomat az e-mail fiókodban keresd!', success: true})
            console.log('New contact saved');
         });
      }else if(name){
         socket.emit('contactRes', {message:'Úgy tűnik, hibás e-mailt adtál meg.', success: false});
      }
   });

   socket.on('disconnect', function(socket){
      delete socketHandler.list[id];
      console.log('Sockets connected: ' + Object.keys(socketHandler.list).length);
      socketHandler.getSockets();
   });
});

server.listen(port, function(){
  console.log("Listening on " +port)
});
