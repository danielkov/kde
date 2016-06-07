var socket = io();

var newsLetter = {
   name: document.getElementById('newslName'),
   email: document.getElementById('newslMail'),
   submit: document.getElementById('newslSubmit'),
   status: document.getElementById('newslStatus'),
   send: function(){
      if (this.email.value) {
         socket.emit('newsLetter', {name: this.name.value, email: this.email.value});
         socket.on('nlStatus', function(data){
            newsLetter.status.style.visibility = 'visible';
            newsLetter.status.innerHTML = data.message;
            newsLetter.email.value = "";
            newsLetter.name.value = "";
            socket.removeListener('nlStatus', function(){
               console.log('Listener removed.');
            })
         });
      }else{
         this.status.style.visibility = 'visible';
         this.status.innerHTML = 'Kérlek add meg az e-mail címed!';
      }
   }
}

var contact = {
   name: document.getElementById('contactName'),
   email: document.getElementById('contactEmail'),
   tel: document.getElementById('contactTel'),
   details: document.getElementById('contactDetails'),
   submit: document.getElementById('contactSubmit'),
   status: document.getElementById('contactStatus'),
   send: function(){
      this.name.style.background = 'white';
      this.email.style.background = 'white';
      this.tel.style.background = 'white';
      this.details.style.background = 'white';
      if(this.name.value && this.email.value && this.tel.value && this.details.value){
         socket.emit('contactForm', {name: this.name.value, email: this.email.value, phone: this.tel.value, details: this.details.value});
         socket.on('contactRes', function(data){
            if (data.success === true) {
               contact.status.style.visibility = 'visible';
               contact.status.style.color = '#009933';
               contact.status.innerHTML = data.message;
               contact.name.value = "";
               contact.email.value = "";
               contact.tel.value = "";
               contact.details.value = "";
            }else{
               contact.status.style.visibility = 'visible';
               contact.status.innerHTML = data.message;
               contact.status.style.color = '#990000';
               contact.email.style.background = '#c6aaaa';
            }
         });
      }else{
         if(this.name.value === ""){
            this.status.style.visibility = 'visible';
            this.status.style.color = '#990000';
            this.status.innerHTML = 'Kérlek töltsd ki az összes mezőt!';
            this.name.style.background = "#c6aaaa";
         }
         if(this.email.value === ""){
            this.status.style.visibility = 'visible';
            this.status.style.color = '#990000';
            this.status.innerHTML = 'Kérlek töltsd ki az összes mezőt!';
            this.email.style.background = "#c6aaaa";
         }
         if(this.tel.value === ""){
            this.status.style.visibility = 'visible';
            this.status.style.color = '#990000';
            this.status.innerHTML = 'Kérlek töltsd ki az összes mezőt!';
            this.tel.style.background = "#c6aaaa";
         }
         if(this.details.value === ""){
            this.status.style.visibility = 'visible';
            this.status.style.color = '#990000';
            this.status.innerHTML = 'Kérlek töltsd ki az összes mezőt!';
            this.details.style.background = "#c6aaaa";
         }
      }
   }
}
