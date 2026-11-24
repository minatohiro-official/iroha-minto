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
