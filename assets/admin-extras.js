(() => {'use strict';
const $=id=>document.getElementById(id);const dialog=$('extra-reply-dialog');if(!dialog)return;
function FF(){return '"Hiragino Maru Gothic ProN",sans-serif'}
let cur=null,iconImg=null,cardBlob=null,opener=null;
const icon=new Image();icon.onload=()=>{iconImg=icon;if(dialog.open)drawReply();drawWall()};icon.src='assets/demo-mascot.svg';
const messages=[{body:'昨日の配信、楽しかったです！また歌枠を楽しみにしています。',read:false},{body:'次はどんなゲームをする予定ですか？',read:false}];let deleted=null;
const messagePanel=$('demo-panel-msg');const list=messagePanel.querySelector('ul');const count=document.createElement('b');count.id='extra-unread-count';$('demo-tab-msg').append(count);
const undo=document.createElement('button');undo.type='button';undo.className='demo-action extra-msg-undo';undo.textContent='消したデモメッセージを戻す';undo.hidden=true;list.after(undo);undo.addEventListener('click',()=>{if(deleted){messages.push(deleted);deleted=null;renderMessages()}});
function openReply(item,button){cur=item;opener=button;$('replyTxt').value='';$('extra-reply-status').textContent='架空の返信画像です。投稿や送信は行いません。';dialog.showModal();drawReply()}
function renderMessages(){list.replaceChildren();count.textContent=messages.filter(m=>!m.read).length||'';messages.forEach(item=>{const li=document.createElement('li');li.className='demo-item'+(item.read?' is-read':'');const meta=document.createElement('small');meta.className='extra-msg-meta';meta.textContent=item.read?'読んだ✓ / 架空のメッセージ':'未読 / 架空のメッセージ';const body=document.createElement('p');body.textContent=item.body;const actions=document.createElement('div');actions.className='extra-msg-actions';for(const [title,fn] of [['返信画像を作る',button=>{item.read=true;renderMessages();openReply({kind:'msg',item},button)}],[item.read?'未読にする':'読んだ✓',()=>{item.read=!item.read;renderMessages()}],['消す',()=>{deleted=item;messages.splice(messages.indexOf(item),1);renderMessages()}]]){const b=document.createElement('button');b.type='button';b.className='demo-action';b.textContent=title;b.addEventListener('click',()=>fn(b));actions.append(b)}li.append(meta,body,actions);list.append(li)});undo.hidden=!deleted;messagePanel.querySelector('.demo-status').textContent='架空の受信内容です。読んだ印・返信画像・消す操作を試せます。実際の受信箱やXには接続しません。'}renderMessages();
for(const li of document.querySelectorAll('#demo-requests .demo-item')){const b=document.createElement('button');b.type='button';b.className='demo-action';b.textContent='返信画像を作る';const [song,artist]=li.querySelector('h3').textContent.split(' / ');b.addEventListener('click',()=>openReply({kind:'req',item:{song,artist,comment:li.querySelector('p').textContent,name:'デモのリスナー'}},b));li.append(b)}
$('replyTxt').addEventListener('input',drawReply);$('extra-reply-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus();else $('demo-tab-msg').focus()});
function saveBlob(blob,name,status){if(!blob){status.textContent='画像ができるまでお待ちください。';return}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='画像の保存を開始しました。外部への投稿や送信はしていません。'}
$('extra-reply-save').addEventListener('click',()=>saveBlob(cardBlob,'iroha-demo-reply.png',$('extra-reply-status')));
  function wrap(ctx,text,maxW){
    var lines=[];
    String(text).split('\n').forEach(function(par){
      var line='';
      Array.from(par).forEach(function(ch){
        if(ctx.measureText(line+ch).width>maxW){ lines.push(line); line=ch; } else line+=ch;
      });
      lines.push(line);
    });
    return lines;
  }
  function rr(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
  function drawReply(){
    if(!cur) return;
    var W=1200, P=70, F=FF();
    var cv=document.createElement('canvas'), x=cv.getContext('2d');
    var it=cur.item, isReq=cur.kind==='req', reply=$('replyTxt').value.trim();
    // 中身の行を先に数えて高さを決める
    x.font='700 46px '+F;
    var qLines, qSub=[];
    if(isReq){
      x.font='700 56px '+F; qLines=wrap(x,'♪ '+it.song,W-P*2-100);
      x.font='500 36px '+F; if(it.artist) qSub=qSub.concat(wrap(x,it.artist,W-P*2-100));
      if(it.comment) qSub=qSub.concat(wrap(x,'「'+it.comment+'」',W-P*2-100));
      qSub.push('from '+(it.name||'見守り隊さん'));
    } else { x.font='700 46px '+F; qLines=wrap(x,it.body,W-P*2-100); }
    x.font='700 44px '+F; var rLines=reply?wrap(x,reply,W-P*2-260):[];
    var qh=(isReq?qLines.length*76:qLines.length*74)+qSub.length*52+90;
    var rh=reply?Math.max(160,rLines.length*70+80):0;
    var H=140+qh+(reply?rh+50:0)+120;
    cv.width=W; cv.height=H;
    var g=x.createLinearGradient(0,0,0,H); g.addColorStop(0,'#FBE7EE'); g.addColorStop(1,'#EBB7CA'); x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle='rgba(255,255,255,.55)'; for(var yy=16;yy<H;yy+=32) for(var xx=16+(yy/32%2)*16;xx<W;xx+=32){ x.beginPath(); x.arc(xx,yy,2.4,0,7); x.fill(); }
    // ラベル
    x.font='700 34px '+F; var lab=isReq?'🎤 歌のリクエスト':'💌 匿名メッセージ', lw=x.measureText(lab).width+56;
    x.fillStyle='#E07496'; rr(x,P,48,lw,62,31); x.fill(); x.fillStyle='#fff'; x.textBaseline='middle'; x.fillText(lab,P+28,80);
    // 質問カード
    var qy=140; x.save(); x.shadowColor='rgba(200,80,120,.2)'; x.shadowOffsetY=8; x.fillStyle='#fff'; rr(x,P,qy,W-P*2,qh,40); x.fill(); x.restore();
    var ty=qy+45+(isReq?38:37);
    if(isReq){ x.fillStyle='#C9557B'; x.font='700 56px '+F; qLines.forEach(function(l){ x.fillText(l,P+50,ty); ty+=76; }); x.fillStyle='#8E5C69'; x.font='500 36px '+F; qSub.forEach(function(l){ x.fillText(l,P+50,ty-12); ty+=52; }); }
    else { x.fillStyle='#5E3540'; x.font='700 46px '+F; qLines.forEach(function(l){ x.fillText(l,P+50,ty); ty+=74; }); }
    // お返事
    if(reply){
      var ry=qy+qh+50, bx=P+170, bw=W-P-bx;
      if(iconImg){ x.save(); x.beginPath(); x.arc(P+70,ry+70,70,0,7); x.closePath(); x.fillStyle='#fff'; x.fill(); x.clip(); x.drawImage(iconImg,P+6,ry+6,128,128); x.restore(); x.strokeStyle='#fff'; x.lineWidth=8; x.beginPath(); x.arc(P+70,ry+70,68,0,7); x.stroke(); }
      x.fillStyle='#F08DB0'; rr(x,bx,ry,bw,rh,40); x.fill();
      x.beginPath(); x.moveTo(bx+2,ry+50); x.lineTo(bx-26,ry+70); x.lineTo(bx+2,ry+90); x.fill();
      x.fillStyle='#fff'; x.font='700 44px '+F; var y2=ry+(rh-rLines.length*70)/2+35; rLines.forEach(function(l){ x.fillText(l,bx+44,y2); y2+=70; });
      x.fillStyle='#C9557B'; x.font='700 28px '+F; x.fillText('ミント',P+44,ry+178);
    }
    x.textAlign='right'; x.fillStyle='#8E5C69'; x.font='700 30px '+F; x.fillText('ミントの部屋 ♡ 架空のデモ',W-P,H-56); x.textAlign='left';
    cv.toBlob(function(b){ cardBlob=b; var u=URL.createObjectURL(b); var img=$('sheetImg'); if(img.dataset.u) URL.revokeObjectURL(img.dataset.u); img.src=u; img.dataset.u=u; },'image/png');
  }

const canvas=$('extra-wall-canvas');const ctx=canvas.getContext('2d');let uploaded=null;let draftUrl=null;
function font(){const v=$('extra-wall-font').value;return v==='serif'?'serif':v==='sans'?'sans-serif':'"Hiragino Maru Gothic ProN",sans-serif'}
function heart(x,y,size){ctx.beginPath();ctx.moveTo(x,y+size*.35);ctx.bezierCurveTo(x-size,y-size*.45,x-size*.7,y-size,x,y-size*.2);ctx.bezierCurveTo(x+size*.7,y-size,x+size,y-size*.45,x,y+size*.35);ctx.fill()}
function drawWall(){if(!canvas)return;const W=canvas.width,H=canvas.height;const bg=$('extra-wall-color').value;ctx.clearRect(0,0,W,H);ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(255,255,255,.6)';const pattern=$('extra-wall-pattern').value;if(pattern==='stripe'){for(let i=-H;i<W;i+=140){ctx.save();ctx.translate(i,0);ctx.rotate(.25);ctx.fillRect(0,0,50,H*1.4);ctx.restore()}}else if(pattern==='gingham'){for(let i=0;i<W;i+=180)ctx.fillRect(i,0,85,H);for(let y=0;y<H;y+=180)ctx.fillRect(0,y,W,85)}else if(pattern!=='plain'){for(let y=60;y<H;y+=150)for(let x=60;x<W;x+=150){if(pattern==='dot'){ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill()}else if(pattern==='heart')heart(x,y,25);else{ctx.font='42px sans-serif';ctx.fillText('✦',x,y)}}}
ctx.textAlign='center';ctx.fillStyle='#315f53';ctx.font='700 65px '+font();const logo=$('extra-wall-logo').value;if(logo!=='none')ctx.fillText('ミントの部屋 / DEMO',W/2,logo==='top'?175:H-90);
const image=uploaded||iconImg;const mode=$('extra-wall-mode').value;if(image){const scale=Number($('extra-wall-size').value)/100;let iw=700*scale,ih=1150*scale;let cx=W/2,cy=H*Number($('extra-wall-position').value)/100;let X=cx-iw/2,Y=cy-ih/2;ctx.save();if(mode==='full'){iw=W;ih=H;X=0;Y=0;ctx.globalAlpha=.7}else if(mode==='card'){ctx.fillStyle='#fff';rr(ctx,X-45,Y-45,iw+90,ih+150,20);ctx.fill()}else if(mode==='circle'){ctx.beginPath();ctx.arc(cx,cy,Math.min(iw,ih)/2,0,Math.PI*2);ctx.clip()}else if(mode==='heart'){ctx.beginPath();ctx.moveTo(cx,cy+ih*.35);ctx.bezierCurveTo(cx-iw*.7,cy-ih*.12,cx-iw*.5,cy-ih*.55,cx,cy-ih*.28);ctx.bezierCurveTo(cx+iw*.5,cy-ih*.55,cx+iw*.7,cy-ih*.12,cx,cy+ih*.35);ctx.clip()}const ratio=Math.min(iw/image.naturalWidth,ih/image.naturalHeight);const dw=image.naturalWidth*ratio,dh=image.naturalHeight*ratio;ctx.drawImage(image,X+(iw-dw)/2,Y+(ih-dh)/2,dw,dh);ctx.restore()}
const deco={heart:'♡',sparkle:'✦',sweets:'🍬',ribbon:'🎀',music:'♪'}[$('extra-wall-deco').value];if(deco){ctx.fillStyle='#e07496';ctx.font='75px sans-serif';[[130,360],[W-130,550],[155,1500],[W-155,1380]].forEach(([x,y])=>ctx.fillText(deco,x,y))}
const words=$('extra-wall-message').value.split('\n').slice(0,2);ctx.fillStyle='#315f53';ctx.font='700 48px '+font();words.forEach((line,i)=>ctx.fillText(line.slice(0,25),W/2,1605+i*68));
if($('extra-wall-calendar').checked){const now=new Date();const next=new Date(now.getFullYear(),now.getMonth()+1,1);const year=next.getFullYear(),month=next.getMonth();const first=next.getDay();const days=new Date(year,month+1,0).getDate();const marks=new Set($('extra-wall-marks').value.split(/[,、\s]+/).map(Number).filter(n=>n>=1&&n<=days));ctx.fillStyle='rgba(255,255,255,.85)';rr(ctx,110,1790,950,570,36);ctx.fill();ctx.fillStyle='#315f53';ctx.font='700 42px '+font();ctx.fillText(year+' / '+String(month+1).padStart(2,'0'),W/2,1860);const labels=['日','月','火','水','木','金','土'];ctx.font='700 30px '+font();labels.forEach((v,i)=>{ctx.fillStyle=i===0?'#c9557b':i===6?'#5074b1':'#315f53';ctx.fillText(v,180+i*135,1920)});for(let day=1;day<=days;day++){const index=first+day-1;const col=index%7,row=Math.floor(index/7);ctx.fillStyle=col===0?'#c9557b':col===6?'#5074b1':'#315f53';ctx.font='700 34px '+font();ctx.fillText(String(day),180+col*135,1990+row*63);if(marks.has(day)){ctx.fillStyle='#e07496';ctx.font='26px sans-serif';ctx.fillText('♡',212+col*135,1972+row*63)}}}ctx.textAlign='left';$('extra-wall-status').textContent='見本に反映しました。素材・設定はこのデモ内だけで使用しています。'}
for(const id of ['extra-wall-mode','extra-wall-position','extra-wall-size','extra-wall-color','extra-wall-pattern','extra-wall-deco','extra-wall-logo','extra-wall-calendar','extra-wall-marks','extra-wall-message','extra-wall-font'])$(id).addEventListener('input',drawWall);
$('extra-wall-file').addEventListener('change',()=>{const f=$('extra-wall-file').files[0];if(!f)return;if(f.size>10*1024*1024){$('extra-wall-status').textContent='10MB以下の画像を選んでください。';return}if(draftUrl)URL.revokeObjectURL(draftUrl);draftUrl=URL.createObjectURL(f);const img=new Image();img.onload=()=>{uploaded=img;drawWall()};img.onerror=()=>{$('extra-wall-status').textContent='画像を読み込めませんでした。別の画像を選んでください。'};img.src=draftUrl});$('extra-wall-default').addEventListener('click',()=>{uploaded=null;$('extra-wall-file').value='';if(draftUrl){URL.revokeObjectURL(draftUrl);draftUrl=null}drawWall()});
$('extra-wall-save').addEventListener('click',()=>{try{canvas.toBlob(blob=>saveBlob(blob,'iroha-demo-wallpaper.png',$('extra-wall-status')),'image/png')}catch{$('extra-wall-status').textContent='この画像は保存できませんでした。別の画像でお試しください。'}});$('extra-wall-set').addEventListener('click',()=>{$('extra-wall-status').textContent='このデモのごほうび見本に設定しました。実際のサイトの特典は変更していません。'});drawWall();
})();
