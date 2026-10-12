(() => { 'use strict';
const key='iroha-minto-admin-demo-v1';
const initial={name:'ミントの配信部屋',notice:'今週は歌枠とゲーム配信を予定しています。初めての方もお気軽にどうぞ。',day:'金曜日',time:'21:00',topic:'歌枠 / リクエスト歓迎'};
const fields=['name','notice','day','time','topic'];
const form=document.querySelector('#demo-editor-form');if(!form)return;
const feedback=document.querySelector('#demo-feedback');
function valid(v){return v&&fields.every(k=>typeof v[k]==='string')&&v.name.length<=30&&v.notice.length<=160&&v.topic.length<=40&&['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日'].includes(v.day)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v.time)}
function render(v){document.querySelector('#preview-title').textContent=v.name;for(const k of ['notice','day','time','topic'])document.querySelector('#preview-'+k).textContent=v[k]}
function populate(v){for(const k of fields)form.elements[k].value=v[k];render(v)}
let state=initial;try{const saved=JSON.parse(localStorage.getItem(key));if(valid(saved))state=saved}catch{}populate(state);
form.addEventListener('submit',e=>{e.preventDefault();const next={};for(const k of fields)next[k]=form.elements[k].value.trim();if(!valid(next)||!next.name||!next.notice||!next.topic){feedback.textContent='活動名・お知らせ・配信内容を入力してください。';return}render(next);try{localStorage.setItem(key,JSON.stringify(next));feedback.textContent='デモに反映しました。このブラウザ内だけに保存しています。'}catch{feedback.textContent='デモに反映しました。ブラウザ内への保存はできませんでした。'}});
document.querySelector('#demo-reset').addEventListener('click',()=>{populate(initial);try{localStorage.removeItem(key)}catch{}feedback.textContent='初期のデモ内容に戻しました。'});
document.querySelector('#demo-video-load').addEventListener('click',e=>{const box=document.querySelector('#demo-video-frame');const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/pcXEZzu-L4g';frame.title='湊音ヒロの公開動画 / YouTube掲載例';frame.allow='encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';box.replaceChildren(frame);box.hidden=false;e.currentTarget.hidden=true});
const dialog=document.querySelector('#demo-gallery-dialog');let opener;
for(const button of document.querySelectorAll('[data-gallery]'))button.addEventListener('click',()=>{opener=button;const image=document.querySelector('#demo-gallery-image');image.src=button.dataset.gallery;image.alt=button.dataset.caption;document.querySelector('#demo-gallery-caption').textContent=button.dataset.caption;dialog.showModal()});
document.querySelector('#demo-gallery-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());
})();
