HTMLElement.prototype.removeClass = function(remove){
   var newClass = "";
   var i;
   var classes = this.className.split(" ");
   for (i = 0; i < classes.length; i++) {
      if (classes[i] !== remove) {
         newClass += classes[i] + " ";
      }
   }
   this.className = newClass;
}

HTMLElement.prototype.addClass = function(add){
   this.className += " " + add;
}

var fadeIn = (function(){
   var el = document.getElementsByClassName('fadeIn');
   window.onscroll = function(){
      var scr = document.body.getBoundingClientRect().top;
      for (var i = 0; i < el.length; i++) {
         var d = el[i].getBoundingClientRect().top-window.innerHeight+el[i].getBoundingClientRect().height
         if (d < 0) {
            el[i].addClass('fadedIn');
            el[i].removeClass('fadeIn');
            el = document.getElementsByClassName('fadeIn');
         }
      }
   }
})();

var toggle = false;

var contactBox = (function(){
   var trigger = document.getElementById('cta');
   var container = document.getElementById('contactBox');
   var toggler = function(){
      if (!toggle) {
         trigger.addClass('down-arrow');
         container.style.display = 'block';
         toggle = true;
      }else{
         container.style.display = 'none';
         toggle = false;
      }
   }
   container.style.display = 'none';
   trigger.addEventListener('mouseenter', function(){
      trigger.addClass('down-arrow');
      if (toggle === true) {
         trigger.addEventListener('mouseleave', function(){
            trigger.removeClass('down-arrow');
         });
      };
   });
   trigger.addEventListener('click', function(e){
      e.preventDefault();
      toggler();
   });
})();

var heroContainer = document.getElementById('hero');

var maxVh = function(el){
   var newHeight = window.innerHeight + "px";
   el.style.height = newHeight;
}

var updateVh = function(el){
   var elHeight = Number(el.style.height.replace(/\D/g,''));
   if (60 < elHeight - window.innerHeight || 60 < window.innerHeight - elHeight) {
      el.style.height = window.innerHeight + 'px';
   }
}

window.onload = function(){
   maxVh(heroContainer);
}
window.onresize = function(){
   updateVh(heroContainer);
}
