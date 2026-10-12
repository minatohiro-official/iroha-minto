(() => {'use strict';
const videoButton=document.querySelector('#demo-video-load');if(videoButton)videoButton.addEventListener('click',()=>{const box=document.querySelector('#demo-video-frame');const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/pcXEZzu-L4g';frame.title='湊音ヒロの公開動画 / YouTube掲載例';frame.allow='encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';box.replaceChildren(frame);box.hidden=false;videoButton.hidden=true});
const dialog=document.querySelector('#demo-gallery-dialog');let opener;
for(const button of document.querySelectorAll('[data-gallery]'))button.addEventListener('click',()=>{opener=button;const image=document.querySelector('#demo-gallery-image');image.src=button.dataset.gallery;image.alt=button.dataset.caption;document.querySelector('#demo-gallery-caption').textContent=button.dataset.caption;dialog.showModal()});
document.querySelector('#demo-gallery-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());
})();
