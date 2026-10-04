(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const cfg=window.WEDDING_INVITATION||{};
$$('[data-field]').forEach(el=>{if(typeof cfg[el.dataset.field]==='string')el.textContent=cfg[el.dataset.field]});
$$('[data-link]').forEach(el=>{const value=cfg[el.dataset.link];if(typeof value==='string'&&/^https:\/\//.test(value))el.href=value});
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,4200)}
const audio=$('#wedding-bgm'),music=$('#music-toggle');
if(cfg.musicUrl)audio.src=cfg.musicUrl;
audio.volume=.45;
function playing(value){music.setAttribute('aria-pressed',String(value));music.setAttribute('aria-label',value?'暂停背景音乐':'播放背景音乐');music.textContent=value?'♫':'♪'}
function play(){return audio.play().then(()=>playing(true)).catch(()=>{playing(false);toast('音乐暂时无法播放，请再点一次音符按钮。')})}
music.addEventListener('click',()=>{if(audio.paused)play();else{audio.pause();playing(false)}});
audio.addEventListener('pause',()=>playing(false));audio.addEventListener('play',()=>playing(true));
$('#start-mission').addEventListener('click',()=>{$('#invitation').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});if(audio.paused)play()});
function countdown(){const time=new Date(cfg.dateTime).getTime();$('#days-count').textContent=Number.isFinite(time)?String(Math.max(0,Math.ceil((time-Date.now())/86400000))):'待定'}countdown();setInterval(countdown,60000);
const FOUND_KEY='stardew_wenshang_dengyi_20261115_blessings';
let found=new Set();try{const data=JSON.parse(localStorage.getItem(FOUND_KEY)||'[]');if(Array.isArray(data))found=new Set(data.filter(n=>Number.isInteger(n)&&n>=0&&n<6))}catch{}
const blessings=['初见欢喜','相伴四季','日日有光','岁岁丰收','一路同心','百年好合'];
function updateCollection(){const count=found.size;$('#collection-count').textContent=count+'/6';$('#collection-status').setAttribute('aria-label',`已收集 ${count} 份祝福，共 6 份`);$$('[data-find]').forEach(el=>{const done=found.has(Number(el.dataset.find));el.classList.toggle('found',done);el.setAttribute('aria-pressed',String(done))});const unlocked=count===6;$('#photo-lock').hidden=unlocked;$('#photo-unlocked').hidden=!unlocked;$('#photo-title').textContent=unlocked?'我们的婚纱照 · 已解锁':'我们的婚纱照 · 尚未解锁';}
function collect(n){if(found.has(n))return false;found.add(n);try{localStorage.setItem(FOUND_KEY,JSON.stringify([...found]))}catch{}updateCollection();toast(`找到第 ${found.size} 个祝尼魔 · ${blessings[n]}`);return true}
function reward(){if(found.size===6&&!$('#reward-dialog').open)$('#reward-dialog').showModal()}
$$('[data-find]:not(#bush)').forEach(el=>el.addEventListener('click',()=>{if(collect(Number(el.dataset.find)))reward();else toast('这份祝福已经收好啦，继续寻找其他祝尼魔吧。')}));
const bush=$('#bush'),bushAction=$('#bush-action');let bushBusy=false,bushHintTimer;
function revealBush(){bushAction.pause();bushAction.hidden=true;$('#bush-guests').hidden=false;$('#bush-junimo').hidden=false;bush.setAttribute('aria-expanded','true');}
if(found.has(3))revealBush();
bush.addEventListener('click',()=>{if(bushBusy)return;bushBusy=true;bush.disabled=true;$('#bush-guests').hidden=true;$('#bush-junimo').hidden=true;bush.setAttribute('aria-expanded','false');$('#bush-status').hidden=false;clearTimeout(bushHintTimer);bushHintTimer=setTimeout(()=>$('#bush-status').hidden=true,2600);if(!matchMedia('(prefers-reduced-motion: reduce)').matches){bushAction.hidden=false;bushAction.currentTime=0;bushAction.play().catch(()=>{bushAction.hidden=true})}setTimeout(()=>{revealBush();const fresh=collect(3);bushBusy=false;bush.disabled=false;if(fresh&&found.size===6)setTimeout(reward,1600)},850)});
$('#collection-status').addEventListener('click',()=>{if(found.size===6){$('#photo-unlocked').scrollIntoView({behavior:'smooth',block:'center'});toast('六份祝福已集齐，婚纱照区域已解锁。')}else toast(`已找到 ${found.size}/6 个：留意星空、邀请信、任务板、灌木、地图和结尾。`)});
$('#close-reward').addEventListener('click',()=>{$('#reward-dialog').close();$('#photo-unlocked').scrollIntoView({behavior:'smooth',block:'center'})});updateCollection();
const photos=Array.isArray(cfg.photos)?cfg.photos:[];const gallery=$('#photo-gallery');for(const photo of photos){if(!photo||typeof photo.src!=='string'||!/^\.\/assets\//.test(photo.src))continue;const img=document.createElement('img');img.src=photo.src;img.alt=photo.alt||'文尚与邓旖的婚纱照';img.loading='lazy';img.addEventListener('error',()=>{img.remove();$('#photo-pending').hidden=false});gallery.append(img)}$('#photo-pending').hidden=gallery.children.length>0;
const KEY='oc_wedding_wenshang_dengyi_20261115_rsvp';const form=$('#rsvp-form'),success=$('#rsvp-success'),error=$('#rsvp-error'),count=$('#message-count');
function attendance(){const yes=form.elements.attending.value==='yes';$('#attendance-details').classList.toggle('is-disabled',!yes);$('#attendance-details').querySelectorAll('input,select').forEach(el=>el.disabled=!yes)}
function messageCount(){count.textContent=String(form.elements.message.value.length)}
function showSuccess(data){form.hidden=true;success.hidden=false;$('#rsvp-success-summary').textContent=`${data.guestName} · ${data.attending==='yes'?'演示选择赴约':'演示选择缺席'}。只保存在当前浏览器，不会发送给新人。`;}
form.elements.message.addEventListener('input',messageCount);$$('[name=attending]').forEach(el=>el.addEventListener('change',attendance));
try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data&&typeof data==='object'&&typeof data.guestName==='string'){for(const [k,v]of Object.entries(data)){const el=form.elements.namedItem(k);if(el&&typeof v==='string'&&'value'in el)el.value=v}showSuccess(data)}}catch{}
attendance();messageCount();
form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));data.guestName=(data.guestName||'').trim();data.mobile=(data.mobile||'').trim();if(!data.guestName||!data.mobile||!['yes','no'].includes(data.attending)){error.textContent='请填写姓名、联系电话，并选择是否赴约。';error.hidden=false;return}if(data.website)return;try{localStorage.setItem(KEY,JSON.stringify(data))}catch{error.textContent='浏览器未允许本地存储，信息尚未保存。请允许网站存储后重试。';error.hidden=false;return}error.hidden=true;showSuccess(data);success.focus()});
$('#rsvp-edit').addEventListener('click',()=>{success.hidden=true;form.hidden=false;form.elements.guestName.focus()});
$('#rsvp-clear').addEventListener('click',()=>{try{localStorage.removeItem(KEY)}catch{$('#rsvp-success-summary').textContent='无法清除记录，请在浏览器设置中清除此网站的数据。';return}form.reset();attendance();messageCount();success.hidden=true;form.hidden=false;error.hidden=true;toast('本机登记已清除。')});
})();
