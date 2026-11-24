(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var els=document.querySelectorAll('.rv');
if('IntersectionObserver' in window&&!reduce){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.15});
els.forEach(function(el){io.observe(el)});
}else{els.forEach(function(el){el.classList.add('on')})}
var bar=document.querySelector('.prog'),moon=document.querySelector('.moon');
function f(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight,y=window.scrollY||0;
if(bar)bar.style.width=(m>0?y/m*100:0)+'%';
if(moon&&!reduce)moon.style.transform='translateY('+(y*0.18)+'px)'}
window.addEventListener('scroll',f,{passive:true});f();
})();
(function(){
var bs=document.querySelectorAll('.filter button'),ss=document.querySelectorAll('.song[data-g]');
bs.forEach(function(b){b.addEventListener('click',function(){
bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
var g=b.getAttribute('data-g');
ss.forEach(function(s){s.hidden=!(g==='all'||s.getAttribute('data-g')===g)});
var c=document.getElementById('cnt');if(c)c.textContent=document.querySelectorAll('.song[data-g]:not([hidden])').length+'曲';
})});
var f=document.querySelector('form.f');
if(f)f.addEventListener('submit',function(e){e.preventDefault();var m=document.getElementById('sent');if(m)m.hidden=false});
})();
