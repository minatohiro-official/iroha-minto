(() => { 'use strict';
const WD=['日','月','火','水','木','金','土'];
const st={start:'2026-10-12',note:'架空の予定を入れた制作サンプル',days:{}};
const values=[['22:00','雑談',false],['21:00','歌枠',false],['','',true],['22:00','ゲーム',false],['21:00','歌枠',false],['20:00','コラボ',false],['22:00','雑談',false]];
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dates(){const p=st.start.split('-').map(Number);return values.map((_,i)=>new Date(p[0],p[1]-1,p[2]+i))}
function day(k){return st.days[k]}
dates().forEach((d,i)=>{const v=values[i];st.days[ymd(d)]={time:v[0],what:v[1],off:v[2]}});
function FF(){return '\"Zen Maru Gothic\",\"Hiragino Maru Gothic ProN\",sans-serif'}
function fontReady(){return document.fonts?document.fonts.ready:Promise.resolve()}
    function img(src){ return new Promise(function(ok){ var i=new Image(); i.onload=function(){ok(i);}; i.onerror=function(){ok(null);}; i.src=src; }); }
    function rr(x,X,Y,W,H,r){ x.beginPath(); x.moveTo(X+r,Y); x.arcTo(X+W,Y,X+W,Y+H,r); x.arcTo(X+W,Y+H,X,Y+H,r); x.arcTo(X,Y+H,X,Y,r); x.arcTo(X,Y,X+W,Y,r); x.closePath(); }
    function fit(x,txt,max){ var s=txt; while(s.length>1 && x.measureText(s).width>max) s=s.slice(0,-1); return s===txt?s:s.slice(0,-1)+'…'; }
    var blob=null;
    function draw(){
      var F=FF();
      return fontReady().then(function(){ return Promise.all([img('assets/schedule-shii-logo.webp'),img('assets/schedule-shii-chibi.webp'),img('assets/schedule-shii-drip.svg')]); }).then(function(im){
        var W=1080,H=1350,c=document.createElement('canvas'),x=c.getContext('2d'); c.width=W; c.height=H;
        var g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,'#FBE7EE'); g.addColorStop(1,'#EFC3D2'); x.fillStyle=g; x.fillRect(0,0,W,H);
        x.fillStyle='rgba(255,255,255,.6)'; for(var y=18;y<H;y+=36) for(var xx=18+(y/36%2)*18;xx<W;xx+=36){ x.beginPath(); x.arc(xx,y,2.6,0,7); x.fill(); }
        if(im[2]){ for(var dx=0;dx<W;dx+=360*1.6) x.drawImage(im[2],dx,0,360*1.6,50*1.6); }
        if(im[0]){ var lw=380, lh=im[0].height*lw/im[0].width; x.drawImage(im[0],60,82,lw,lh); }
        var ds=dates(), a=ds[0], b=ds[6];
        x.textAlign='right'; x.fillStyle='#E07496'; x.font='500 64px "Quicksand","Avenir Next",'+F; x.fillText('WEEKLY',W-64,170);
        x.fillText('SCHEDULE',W-64,236);
        x.fillStyle='#8E5C69'; x.font='700 36px '+F; x.fillText((a.getMonth()+1)+'/'+a.getDate()+' 〜 '+(b.getMonth()+1)+'/'+b.getDate(),W-64,292);
        var top=326, rh=106, gap=12, X=60, RW=W-120;
        ds.forEach(function(d,i){
          var v=day(ymd(d)), Y=top+i*(rh+gap), w=d.getDay();
          x.save(); x.shadowColor='rgba(200,80,120,.18)'; x.shadowOffsetY=6; x.shadowBlur=0;
          x.fillStyle=v.off?'rgba(255,255,255,.55)':'#fff'; rr(x,X,Y,RW,rh,30); x.fill(); x.restore();
          x.fillStyle=v.off?'#E5D6EF':(w===0?'#EC6F98':w===6?'#86A6E8':'#F08DB0'); rr(x,X+14,Y+14,150,rh-28,22); x.fill();
          x.textAlign='center'; x.fillStyle='#fff'; x.font='700 38px '+F; x.fillText((d.getMonth()+1)+'/'+d.getDate(),X+89,Y+57);
          x.font='700 24px '+F; x.fillText(WD[w],X+89,Y+86);
          x.textAlign='left';
          if(v.off){ x.fillStyle='#A28AB8'; x.font='700 42px '+F; x.fillText('おやすみ 💤',X+200,Y+68); }
          else{
            x.fillStyle='#E07496'; x.font='700 46px "Quicksand","Avenir Next",'+F; var tt=fit(x,v.time||'',260); x.fillText(tt,X+196,Y+70);
            var tw=Math.max(170,x.measureText(tt).width+24);
            x.fillStyle='#5E3540'; x.font='700 38px '+F; x.fillText(fit(x,v.what||'配信',RW-196-tw-30),X+196+tw,Y+68);
          }
        });
        var by=top+7*(rh+gap)+8;
        if(st.note){ x.fillStyle='#fff'; rr(x,X,by,RW-220,74,37); x.fill(); x.fillStyle='#C9557B'; x.font='700 34px '+F; x.textAlign='left'; x.fillText(fit(x,'♡ '+st.note,RW-280),X+30,by+49); }
        x.textAlign='left'; x.fillStyle='#8E5C69'; x.font='700 28px '+F; x.fillText('Mirrativ ／ X @shiitarou210',X+4,H-34);
        if(im[1]){ var ch=190, cw=im[1].width*ch/im[1].height; x.drawImage(im[1],W-cw-40,H-ch-16,cw,ch); }
        return new Promise(function(ok){ c.toBlob(function(bb){ blob=bb; ok(URL.createObjectURL(bb)); },'image/png'); });
      });
    }

document.addEventListener('iroha-schedule-demo',event=>{const data=event.detail;if(!data||data.days?.length!==7)return;st.start=data.start;st.note=data.note;st.days={};dates().forEach((d,i)=>{st.days[ymd(d)]=data.days[i]});draw().then(url=>{document.querySelectorAll('[data-shii-schedule]').forEach(el=>{el.src=url;el.dataset.loaded='true'});document.dispatchEvent(new CustomEvent('iroha-schedule-ready'))})});
let promise;
function load(el){if(!promise)promise=draw();promise.then(url=>{el.src=url;el.dataset.loaded='true'}).catch(()=>{el.alt='予定表の画像を読み込めませんでした。再読み込みしてください。'});}
const images=document.querySelectorAll('[data-shii-schedule]');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){load(e.target);observer.unobserve(e.target)}}),{rootMargin:'180px'});images.forEach(el=>observer.observe(el))}else images.forEach(load);
})();
