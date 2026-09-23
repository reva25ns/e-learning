const $=id=>document.getElementById(id);
const S={name:'',game:'',i:0,score:0,total:0,sound:true,numberOrder:[]};
const childrenSong=$('childrenSong');
const songButtons=[...document.querySelectorAll('[data-song-toggle]')];

function syncSongButtons(){
 const playing=Boolean(childrenSong&&!childrenSong.paused);
 songButtons.forEach(button=>{
  button.textContent=playing?'⏸ Jeda Lagu':'🎵 Putar Lagu';
  button.setAttribute('aria-pressed',String(playing));
 });
}
async function playChildrenSong(){
 if(!childrenSong)return false;
 childrenSong.volume=.3;
 try{await childrenSong.play();syncSongButtons();return true}catch(e){syncSongButtons();return false}
}
songButtons.forEach(button=>button.onclick=async()=>{
 if(!childrenSong)return;
 if(childrenSong.paused){
  if(await playChildrenSong())toast('Lagu Bintang Kecil diputar');
  else toast('Browser memblokir lagu. Coba tekan tombol lagi ya.');
 }else{childrenSong.pause();syncSongButtons();toast('Lagu dijeda');}
});
childrenSong?.addEventListener('play',syncSongButtons);
childrenSong?.addEventListener('pause',syncSongButtons);
document.addEventListener('pointerdown',event=>{
 if(!event.target.closest('[data-song-toggle]'))playChildrenSong();
},{once:true});
syncSongButtons();
const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const words={A:'Apel',B:'Bola',C:'Ceri',D:'Dadu',E:'Es Krim',F:'Foto',G:'Gajah',H:'Harimau',I:'Ikan',J:'Jeruk',K:'Kucing',L:'Lemon',M:'Mangga',N:'Nanas',O:'Obor',P:'Pisang',Q:'Quesadilla',R:'Rumah',S:'Sapi',T:'Topi',U:'Ular',V:'Vas',W:'Wortel',X:'Xilofon',Y:'Yoyo',Z:'Zebra'};
const letterVisuals={
 A:{emoji:'🍎',label:'Apel',color:'pink'},
 B:{emoji:'⚽',label:'Bola',color:'blue'},
 C:{emoji:'🍒',label:'Ceri',color:'red'},
 D:{emoji:'🎲',label:'Dadu',color:'yellow'},
 E:{emoji:'🍦',label:'Es Krim',color:'mint'},
 F:{emoji:'📷',label:'Foto',color:'purple'},
 G:{emoji:'🐘',label:'Gajah',color:'blue'},
 H:{emoji:'🐯',label:'Harimau',color:'orange'},
 I:{emoji:'🐟',label:'Ikan',color:'blue'},
 J:{emoji:'🍊',label:'Jeruk',color:'orange'},
 K:{emoji:'🐱',label:'Kucing',color:'pink'},
 L:{emoji:'🍋',label:'Lemon',color:'yellow'},
 M:{emoji:'🥭',label:'Mangga',color:'orange'},
 N:{emoji:'🍍',label:'Nanas',color:'yellow'},
 O:{emoji:'🔥',label:'Obor',color:'orange'},
 P:{emoji:'🍌',label:'Pisang',color:'yellow'},
 Q:{emoji:'🧀',label:'Quesadilla',color:'yellow'},
 R:{emoji:'🏠',label:'Rumah',color:'blue'},
 S:{emoji:'🐄',label:'Sapi',color:'mint'},
 T:{emoji:'🎩',label:'Topi',color:'purple'},
 U:{emoji:'🐍',label:'Ular',color:'green'},
 V:{emoji:'🏺',label:'Vas',color:'pink'},
 W:{emoji:'🥕',label:'Wortel',color:'orange'},
 X:{emoji:'🎵',label:'Xilofon',color:'purple'},
 Y:{emoji:'🪀',label:'Yoyo',color:'blue'},
 Z:{emoji:'🦓',label:'Zebra',color:'mint'}
};
const numberNames={1:'Satu',2:'Dua',3:'Tiga',4:'Empat',5:'Lima',6:'Enam',7:'Tujuh',8:'Delapan',9:'Sembilan',10:'Sepuluh'};
const numberVisuals={
 1:{emoji:'🍎',label:'Satu Apel'},2:{emoji:'🍎',label:'Dua Apel'},3:{emoji:'⭐',label:'Tiga Bintang'},
 4:{emoji:'🦋',label:'Empat Kupu-kupu'},5:{emoji:'🌸',label:'Lima Bunga'},6:{emoji:'🐟',label:'Enam Ikan'},
 7:{emoji:'🍓',label:'Tujuh Stroberi'},8:{emoji:'⚽',label:'Delapan Bola'},9:{emoji:'🌈',label:'Sembilan Pelangi'},10:{emoji:'🍭',label:'Sepuluh Permen'}
};
const nums=Object.keys(numberNames).map(n=>[numberVisuals[n].emoji,Number(n)]);
const colorLevels=[
 [
  {id:'kuning',name:'Kuning',hex:'#ffd43b',emoji:'🌟'},
  {id:'hijau',name:'Hijau',hex:'#42cfa4',emoji:'🍀'},
  {id:'biru',name:'Biru',hex:'#5bb8ff',emoji:'💧'}
 ],
 [
  {id:'merah',name:'Merah',hex:'#ff6b6b',emoji:'🍎'},
  {id:'ungu',name:'Ungu',hex:'#9b6cff',emoji:'🍇'},
  {id:'oranye',name:'Oranye',hex:'#ff9f43',emoji:'🍊'},
  {id:'hijau',name:'Hijau',hex:'#42cfa4',emoji:'🍀'}
 ],
 [
  {id:'kuning',name:'Kuning',hex:'#ffd43b',emoji:'🌟'},
  {id:'hijau',name:'Hijau',hex:'#42cfa4',emoji:'🍀'},
  {id:'biru',name:'Biru',hex:'#5bb8ff',emoji:'💧'},
  {id:'merah',name:'Merah',hex:'#ff6b6b',emoji:'🍎'},
  {id:'ungu',name:'Ungu',hex:'#9b6cff',emoji:'🍇'}
 ]
];

const letterQuiz=[['Huruf apa yang ada di awal kata “Apel”?',['A','B','C','D'],'A'],['Huruf pertama dari kata “Bola” adalah...',['A','B','C','D'],'B'],['Hewan yang diawali huruf K adalah...',['Kucing','Sapi','Ikan','Ayam'],'Kucing'],['Huruf pertama dari kata “Gajah” adalah...',['G','H','J','K'],'G'],['Buah yang diawali huruf M adalah...',['Mangga','Apel','Jeruk','Nanas'],'Mangga'],['Huruf terakhir dari kata “Sapi” adalah...',['A','I','P','S'],'I'],['Kata “Zebra” diawali huruf...',['X','Y','Z','W'],'Z'],['Huruf yang berada setelah C adalah...',['A','B','D','E'],'D']];
const numberQuiz=[['Berapa jumlah jari pada satu tangan?',['3','4','5','6'],'5'],['Setelah angka 4 adalah...',['3','5','6','7'],'5'],['Ada berapa gambar? 🍎🍎🍎',['2','3','4','5'],'3'],['Angka sebelum 10 adalah...',['7','8','9','11'],'9'],['Berapa angka setelah 7?',['6','8','9','10'],'8'],['Berapa jumlah benda? ⭐⭐⭐⭐',['3','4','5','6'],'4'],['Angka pertama adalah...',['0','1','2','3'],'1'],['Angka setelah 2 adalah...',['1','2','3','4'],'3']];
const adventureQuiz=[
  {type:'add',a:4,b:2,emoji:'🍎',name:'apel'},
  {type:'add',a:2,b:3,emoji:'⚽',name:'bola'},
  {type:'add',a:3,b:4,emoji:'🍊',name:'jeruk'},
  {type:'add',a:5,b:2,emoji:'🍓',name:'stroberi'},
  {type:'add',a:1,b:6,emoji:'🧸',name:'boneka'},
  {type:'sub',a:7,b:2,emoji:'🍎',name:'apel'},
  {type:'sub',a:8,b:3,emoji:'⚽',name:'bola'},
  {type:'sub',a:9,b:4,emoji:'🍊',name:'jeruk'},
  {type:'sub',a:6,b:1,emoji:'🍓',name:'stroberi'},
  {type:'sub',a:10,b:5,emoji:'🧸',name:'boneka'}
];
const quizzes=[...letterQuiz,...numberQuiz];
let indonesianVoice=null;

function prepareIndonesianVoice(){
 if(!window.speechSynthesis)return;
 const voices=speechSynthesis.getVoices();
 indonesianVoice=
  voices.find(v=>/^id(?:[-_]|$)/i.test(v.lang)&&/google|gadis|indonesia/i.test(v.name))||
  voices.find(v=>/^id(?:[-_]|$)/i.test(v.lang))||
  voices.find(v=>/indonesia/i.test(v.name))||null;
}
prepareIndonesianVoice();
window.speechSynthesis?.addEventListener?.('voiceschanged',prepareIndonesianVoice);

const LOCAL_SESSION_KEY='paud_study_kids_session';
const LOCAL_SCORES_KEY='paud_study_kids_scores';

function setAuthenticated(user){
 $('authScreen').classList.add('hidden');$('appShell').classList.remove('hidden');
 $('userBadge').textContent=`👤 ${user?.nama||'Pengguna'}`;
}
function getLocalSession(){
 try{return JSON.parse(localStorage.getItem(LOCAL_SESSION_KEY)||'null')}catch(e){return null}
}
function setLocalSession(user){
 try{localStorage.setItem(LOCAL_SESSION_KEY,JSON.stringify({user,loggedAt:Date.now()}))}catch(e){}
}
function clearLocalSession(){try{localStorage.removeItem(LOCAL_SESSION_KEY)}catch(e){}}
async function requestJson(url,options={}){
 const r=await fetch(url,options);
 const text=await r.text();
 let j;
 try{j=JSON.parse(text)}catch(e){
  const contentType=r.headers.get('content-type')||'';
  const message=contentType.includes('text/html')||/^\s*<!doctype html/i.test(text)
   ? 'Layanan API tidak tersedia di hosting ini. Mode offline diaktifkan.'
   : 'Server mengirim respons yang tidak valid.';
  const err=new Error(message);err.apiUnavailable=true;err.status=r.status;throw err;
 }
 return {r,j};
}
function restoreSession(){
 const local=getLocalSession();
 if(local?.user){setAuthenticated(local.user)}
}
$('loginForm').onsubmit=async e=>{
 e.preventDefault();
 const error=$('loginError');
 error.textContent='';
 const submit=e.currentTarget.querySelector('button[type=submit]');
 submit.disabled=true;
 submit.textContent='Memeriksa...';
 const username=$('username').value.trim();
 const password=$('password').value;

 try{
  // Login ke server agar cookie sesi dibuat.
  // Dengan sesi ini, nilai dapat disimpan ke database dan
  // dibaca kembali dari perangkat/browser lain.
  const {r,j}=await requestJson('/api/login',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   credentials:'same-origin',
   body:JSON.stringify({username,password})
  });

  if(!r.ok || !j.success){
   throw new Error(j.message||'Username atau password salah.');
  }

  setLocalSession(j.user);
  setAuthenticated(j.user);
  $('password').value='';
  toast('Berhasil masuk.');
 }catch(e){
  // Mode offline hanya sebagai cadangan. Jika API tersedia tetapi
  // username/password salah, jangan masuk menggunakan login lokal.
  if(e.apiUnavailable && username==='admin' && password==='admin123'){
   const user={username:'admin',nama:'Administrator'};
   setLocalSession(user);
   setAuthenticated(user);
   $('password').value='';
   toast('Mode offline: login lokal.');
  }else{
   error.textContent=e.message||'Tidak dapat masuk.';
  }
 }finally{
  submit.disabled=false;
  submit.textContent='🔐 Masuk';
 }
};
$('logout').onclick=()=>{
 clearLocalSession();
 location.replace('/');
};

function show(id){['home','name','menu','game','video','score'].forEach(x=>$(x)?.classList.toggle('hidden',x!==id));}
function speak(t){if(!S.sound||!window.speechSynthesis)return;prepareIndonesianVoice();speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(String(t)),resumeSong=Boolean(childrenSong&&!childrenSong.paused);if(resumeSong)childrenSong.volume=.08;u.lang='id-ID';if(indonesianVoice)u.voice=indonesianVoice;u.volume=1;u.rate=1.0;u.pitch=1.15;u.onend=u.onerror=()=>{if(resumeSong&&childrenSong&&!childrenSong.paused)childrenSong.volume=.3};speechSynthesis.speak(u)}
function speakQuestion(question){speak(question)}
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1800)}
function confetti(){let c=$('confetti');c.innerHTML='';let e=['⭐','🎉','✨','🌈','💖','🎈'];for(let i=0;i<35;i++){let p=document.createElement('span');p.className='piece';p.textContent=e[Math.floor(Math.random()*e.length)];p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*.7+'s';c.appendChild(p)}setTimeout(()=>c.innerHTML='',2600)}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function shuffle(a){return a.sort(()=>Math.random()-.5)}
function randWrong(c){let x=new Set;while(x.size<3){let n=Math.floor(Math.random()*10)+1;if(n!==c)x.add(n)}return [...x]}

$('start').onclick=()=>show('name');
$('continue').onclick=()=>{let n=$('nameInput').value.trim();if(!n){$('nameErr').textContent='Tulis nama kamu dulu ya 😊';return}S.name=n;$('hello').innerHTML=`Halo, ${esc(n)}! 👋`;show('menu');speak(`Halo ${n}! Sebelum belajarrrr., jangan lupaaaaaaaaaaaaaaa  ., baca doaaaaaaa .,`)};
$('nameInput').onkeydown=e=>{if(e.key==='Enter')$('continue').click()};
$('sound').onclick=()=>{S.sound=!S.sound;$('sound').textContent=S.sound?'🔊':'🔇';toast(S.sound?'Suara Bahasa Indonesia dinyalakan':'Suara dimatikan')};
document.querySelectorAll('.game[data-game]').forEach(b=>b.onclick=()=>start(b.dataset.game));
$('scores').onclick=showScores;$('scores2').onclick=showScores;$('back').onclick=()=>show('menu');$('backScore').onclick=()=>show('menu');$('backVideo').onclick=()=>show('menu');

function start(g){
 S.game=g;S.i=0;S.score=0;S.totalMatched=0;S.colorStepIndex=0;S.colorMatched=[];S.colorItems=null;S.colorItemsLevel=null;S.colorAnnounced=false;S.colorWarmupDone=false;S.colorWarmupRunning=false;
 // Petualangan angka ditampilkan berurutan agar anak belajar bertahap.
 S.numberOrder=g==='berhitung'?shuffle([...Array(nums.length).keys()]):[];
 if(g==='video'){show('video');speak('Ayo menonton video eksperimen sains seru untuk anak usia dini.');return}
 S.total=g==='huruf'?26:g==='berhitung'?10:g==='petualangan_angka'?adventureQuiz.length:g==='warna'?colorLevels.reduce((n,l)=>n+l.length,0):g==='latihan_huruf'?letterQuiz.length:g==='latihan_angka'?numberQuiz.length:0;
 show('game');$('title').textContent={huruf:'🔤 Dunia Huruf',berhitung:'🔢 Dunia Angka',petualangan_angka:'➕➖ Tambah & Pengurangan',warna:'🎨 Cocokkan Warna'}[g];render()
}
function render(){
 $('progress').textContent=`${S.i+1} / ${S.total}`;$('bar').style.width=((S.i)/S.total*100)+'%';
 if(S.game==='huruf')letter();else if(S.game==='berhitung')number();else if(S.game==='petualangan_angka')adventure();else if(S.game==='warna')colorGame();else if(S.game==='latihan_huruf')practiceLetter();else if(S.game==='latihan_angka')practiceNumber();else show('menu')
}
function letter(){
 let l=letters[S.i],w=words[l],v=letterVisuals[l]||{emoji:'⭐',label:w};
 $('content').innerHTML=`<div class="letter-lesson">
   <div class="visual-slide" aria-label="Gambar ${esc(v.label)} untuk huruf ${l}">
     <div class="visual-glow"></div>
     <div class="visual-object">${v.emoji}</div>
     <div class="visual-caption"><span>Huruf ${l}</span> • ${esc(v.label)}</div>
   </div>
   <div class="letter-row"><div class="letter">${l}</div><div class="letter-word"><div class="word">${esc(w)}</div><p class="hint">Huruf <b>${l}</b> untuk <b>${esc(w)}</b>.</p></div></div>
   <div class="slide-dots">${letters.map((x,i)=>`<i class="${i===S.i?'active':''}"></i>`).join('')}</div>
   <button class="listen" id="listen" aria-label="Dengarkan huruf ${l}">🔊</button>
   <br><button class="next" id="next">${S.i===S.total-1?'Selesai 🎉':'Lanjut ➜'}</button>
 </div>`;
 $('listen').onclick=()=>speak(`Huruf ${l}. ${w}.`);
 $('next').onclick=()=>{S.i++;if(S.i>=S.total)finish();else render()};
 speak(`Huruf ${l}. ${w}.`);
}
function number(){
 let idx=S.numberOrder[S.i]??S.i;
 let [emoji,n]=nums[idx];
 let v=numberVisuals[n];
 let objects=Array(n).fill(emoji).join(' ');
 $('content').innerHTML=`<div class="number-lesson">
   <div class="visual-slide number-visual" aria-label="${esc(v.label)}">
     <div class="visual-glow"></div>
     <div class="visual-object">${emoji}</div>
     <div class="visual-caption"><span>Angka ${n}</span> • ${esc(v.label)}</div>
   </div>
   <div class="number-row"><div class="number">${n}</div><div class="number-word"><div class="word">${esc(numberNames[n])}</div><p class="hint">Angka <b>${n}</b> dibaca <b>${esc(numberNames[n])}</b>.</p></div></div>
   <div class="count-objects">${objects}</div>
   <div class="slide-dots">${nums.map((x,i)=>`<i class="${i===idx?'active':''}"></i>`).join('')}</div>
   <button class="listen" id="listen" aria-label="Dengarkan angka ${n}">🔊</button>
   <br><button class="next" id="next">${S.i===S.total-1?'Selesai 🎉':'Lanjut ➜'}</button>
 </div>`;
 $('listen').onclick=()=>speak(`Angka ${n}. ${numberNames[n]}.`);
 $('next').onclick=()=>{S.i++;if(S.i>=S.total)finish();else render()};
 speak(`Angka ${n}. ${numberNames[n]}.`);
}
function answerNumber(b,c){document.querySelectorAll('.answer').forEach(x=>x.disabled=true);let v=+b.dataset.x;if(v===c){S.score++;b.classList.add('correct');speak('Hebat! Jawaban kamu benar!');toast('⭐ Hebat! Benar!')}else{b.classList.add('wrong');document.querySelector(`.answer[data-x="${c}"]`)?.classList.add('correct');speak(`Belum tepat. Jawaban yang benar ${c}.`);toast('Coba lagi di soal berikutnya 😊')}setTimeout(()=>{S.i++;if(S.i>=S.total)finish();else render()},800)}
function adventure(){
 const q=adventureQuiz[S.i];
 const answer=q.type==='add'?q.a+q.b:q.a-q.b;
 const op=q.type==='add'?'+':'−';
 const left=Array(q.a).fill(q.emoji).join('');
 const right=Array(q.b).fill(q.emoji).join('');
 const options=[answer,Math.max(0,answer-1),answer+1,Math.min(10,answer+2)];
 const unique=[...new Set(options)].slice(0,4);
 while(unique.length<4){
   const n=Math.floor(Math.random()*11);
   if(!unique.includes(n))unique.push(n);
 }
 const opts=unique;
 const instruction=q.type==='add'?'Ayo gabungkan kedua kelompok benda!':'Ayo ambil benda yang dikurangi!';
 $('content').innerHTML=`<div class="adventure-card visual-math-card">
   <div class="pill">TAMBAH & PENGURANGAN</div>
   <div class="adventure-icon">${q.type==='add'?'➕':'➖'} ${q.emoji}</div>
   <div class="math-instruction">${instruction}</div>
   <div class="object-equation" aria-label="${q.a} ${op} ${q.b}">
     <div class="object-group">${left}</div>
     <div class="operator">${op}</div>
     <div class="object-group">${right}</div>
     <div class="operator">=</div>
     <div class="question-mark">?</div>
   </div>
   <div class="number-equation"><span>${q.a}</span> <b>${op}</b> <span>${q.b}</span> <b>=</b> <span>?</span></div>
   <p class="hint">Hitung gambar ${q.name}, lalu pilih jawabannya.</p>
   <button class="listen" id="listenQuestion" type="button" aria-label="Dengarkan soal">🔊</button>
   <div class="answers visual-answers">${opts.map(x=>`<button class="answer visual-answer" data-x="${x}"><span class="answer-number">${x}</span><span class="answer-objects">${Array(Number(x)).fill(q.emoji).join(' ')}</span></button>`).join('')}</div>
 </div>`;
 $('listenQuestion').onclick=()=>speak(`${q.a} ${q.type==='add'?'ditambah':'dikurangi'} ${q.b} sama dengan berapa?`);
 document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answerAdventure(b,answer));
 speak(`${q.a} ${q.type==='add'?'ditambah':'dikurangi'} ${q.b} sama dengan berapa?`);
}
function answerAdventure(b,c){
 document.querySelectorAll('.answer').forEach(x=>x.disabled=true);
 let v=+b.dataset.x;
 if(v===c){S.score++;b.classList.add('correct');speak('Hebat! Jawaban kamu benar!');toast('⭐ Hebat! Benar!')}
 else{b.classList.add('wrong');[...document.querySelectorAll('.answer')].find(x=>x.dataset.x===String(c))?.classList.add('correct');speak(`Belum tepat. Jawaban yang benar ${c}.`);toast('Coba lagi ya 😊')}
 setTimeout(()=>{S.i++;if(S.i>=S.total)finish();else render()},800)
}

function speakColorWarmupSequence(onDone){
 if(!S.sound||!window.speechSynthesis){onDone?.();return}
 prepareIndonesianVoice();
 speechSynthesis.cancel();
 const lines=['Ayo ikuti gerakannya.','Ayo melompat.','Ayo berdiri.','Angkat tangan keatas.','Selesai.'];
 let index=0;
 const next=()=>{
  if(index>=lines.length){onDone?.();return}
  const u=new SpeechSynthesisUtterance(lines[index++]);
  u.lang='id-ID';
  if(indonesianVoice)u.voice=indonesianVoice;
  u.volume=1;u.rate=.95;u.pitch=1.15;
  u.onend=()=>setTimeout(next,220);
  u.onerror=()=>setTimeout(next,120);
  speechSynthesis.speak(u);
 };
 next();
}

function colorWarmup(){
 $('progress').textContent='Persiapan • Level 1';
 $('bar').style.width='0%';
 $('content').innerHTML=`<div class="color-warmup" aria-live="polite">
   <div class="pill">🎨 PERSIAPAN PERMAINAN • LEVEL 1</div>
   <h2>🙆 Ayo Ikuti Gerakannya!</h2>
   <p class="warmup-subtitle">Dengarkan suara dan ikuti gerakan sederhana sebelum mulai bermain.</p>
   <div class="warmup-steps">
     <div class="warmup-step"><div class="warmup-icon jump">🦘</div><b>Ayo melompat</b></div>
     <div class="warmup-step"><div class="warmup-icon stand">🧍</div><b>Ayo berdiri</b></div>
     <div class="warmup-step"><div class="warmup-icon stretch">🙆</div><b>Angkat tangan keatas</b></div>
     <div class="warmup-step"><div class="warmup-icon done">🎉</div><b>Selesai</b></div>
   </div>
   <div class="warmup-note">🔊 Dengarkan instruksi suara sampai selesai, lalu permainan dimulai.</div>
 </div>`;
 if(!S.colorWarmupRunning){
  S.colorWarmupRunning=true;
  speakColorWarmupSequence(()=>{
   S.colorWarmupRunning=false;
   S.colorWarmupDone=true;
   render();
  });
 }
}

function colorGame(){
 const levelIndex=Math.min(S.i>0?Math.floor(S.colorStepIndex||0):0,colorLevels.length-1);
 // S.colorStepIndex stores the current level; it is initialized in start().
 const level=S.colorStepIndex||0;
 if(level===0 && !S.colorWarmupDone){colorWarmup();return}
 const items=shuffle(colorLevels[level].map(x=>({...x})));
 // Keep the current level order stable while the child is interacting.
 if(!S.colorItems || S.colorItemsLevel!==level){
  S.colorItems=items;
  S.colorItemsLevel=level;
 }
 const current=S.colorItems;
 const targets=shuffle(colorLevels[level].map(x=>({...x})));
 const matched=new Set(S.colorMatched||[]);
 $('progress').textContent=`Level ${level+1} / ${colorLevels.length}`;
 $('bar').style.width=((S.totalMatched||0)/S.total*100)+'%';
 $('content').innerHTML=`<div class="color-game">
   <div class="pill">PERMAINAN WARNA • LEVEL ${level+1}</div>
   <div class="color-instruction">🎨 Seret benda ke warna yang sama!</div>
   <p class="color-subtitle">Tekan dan tahan bendanya, lalu geser ke tempat yang warnanya sama.</p>
   <div class="color-board">
     <div class="color-column">
       <h3>🧸 Benda</h3>
       <div class="color-items" id="colorItems">
         ${current.map((x,i)=>matched.has(x.id)?`<div class="color-item-placeholder" data-id="${x.id}">✓</div>`:
           `<button class="color-item" type="button" data-id="${x.id}" data-name="${esc(x.name)}" aria-label="Seret ${esc(x.name)}">
             <span class="color-object" style="--item-color:${x.hex}">${x.emoji}</span>
             <span class="color-name">${esc(x.name)}</span>
           </button>`).join('')}
       </div>
     </div>
     <div class="color-column">
       <h3>🎯 Tempat Tujuan</h3>
       <div class="color-targets" id="colorTargets">
         ${targets.map(x=>`<div class="color-target ${matched.has(x.id)?'matched':''}" data-target="${x.id}" style="--target-color:${x.hex}">
           <span class="target-circle"></span><span>${esc(x.name)}</span>${matched.has(x.id)?'<b>✓</b>':''}
         </div>`).join('')}
       </div>
     </div>
   </div>
   <div class="color-feedback" id="colorFeedback" aria-live="polite">Ayo cari warna yang sama 😊</div>
   <button class="listen" id="listenColor" type="button" aria-label="Dengarkan instruksi">🔊</button>
 </div>`;
 setupColorDrag();
 $('listenColor').onclick=()=>speak('Ayo pindahkan benda ke tempat yang memiliki warna sama.');
 if(!S.colorAnnounced){S.colorAnnounced=true;speak(`Level ${level+1}. Ayo pindahkan benda ke warna yang sama.`)}
}

function setupColorDrag(){
 document.querySelectorAll('.color-item').forEach(item=>{
  let dragging=false,clone=null,offsetX=0,offsetY=0,startX=0,startY=0;
  const id=item.dataset.id;
  const cleanup=()=>{
   if(clone){clone.remove();clone=null}
   dragging=false;item.classList.remove('dragging');
  };
  item.addEventListener('pointerdown',e=>{
   e.preventDefault();
   dragging=true;startX=e.clientX;startY=e.clientY;
   item.setPointerCapture?.(e.pointerId);
   const r=item.getBoundingClientRect();
   offsetX=e.clientX-r.left;offsetY=e.clientY-r.top;
   clone=item.cloneNode(true);
   clone.classList.add('drag-ghost');
   clone.style.width=r.width+'px';
   clone.style.height=r.height+'px';
   clone.style.left=(e.clientX-offsetX)+'px';
   clone.style.top=(e.clientY-offsetY)+'px';
   document.body.appendChild(clone);
   item.classList.add('dragging');
  });
  item.addEventListener('pointermove',e=>{
   if(!dragging||!clone)return;
   clone.style.left=(e.clientX-offsetX)+'px';
   clone.style.top=(e.clientY-offsetY)+'px';
   const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.color-target');
   document.querySelectorAll('.color-target').forEach(t=>t.classList.toggle('drag-over',Boolean(target&&t===target)));
  });
  const end=e=>{
   if(!dragging)return;
   const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.color-target');
   const feedback=$('colorFeedback');
   document.querySelectorAll('.color-target').forEach(t=>t.classList.remove('drag-over'));
   if(target){
    const targetId=target.dataset.target;
    if(targetId===id){
     S.colorMatched=S.colorMatched||[];
     if(!S.colorMatched.includes(id))S.colorMatched.push(id);
     S.score++;S.totalMatched=(S.totalMatched||0)+1;
     feedback.textContent='🎉 Hebat! Warnanya sama!';
     feedback.className='color-feedback success';
     target.classList.add('matched');
     speak(`Hebat! Warna ${item.dataset.name} sama!`);
     cleanup();
     setTimeout(()=>{
      const all=colorLevels[S.colorStepIndex||0].length;
      if(S.colorMatched.length>=all){
       const next=(S.colorStepIndex||0)+1;
       if(next>=colorLevels.length){finish();}
       else{
        S.colorStepIndex=next;S.colorMatched=[];S.colorItems=null;S.colorItemsLevel=null;S.colorAnnounced=false;render();
       }
      }else render();
     },850);
     return;
    }else{
     feedback.textContent='😊 Coba lagi, cari warna yang sama.';
     feedback.className='color-feedback wrong';
     speak('Belum tepat. Coba cari warna yang sama.');
    }
   }else{
    feedback.textContent='Tarik bendanya ke tempat warna yang sama ya 😊';
    feedback.className='color-feedback';
   }
   cleanup();
  };
  item.addEventListener('pointerup',end);
  item.addEventListener('pointercancel',cleanup);
 });
}

function practiceLetter(){let [q,opt,a]=letterQuiz[S.i],opts=shuffle([...opt]);$('content').innerHTML=`<div><div class="pill">LATIHAN HURUF ${S.i+1}</div><div class="question">${esc(q)}</div><button class="listen" id="listenQuestion" type="button" aria-label="Dengarkan soal">🔊</button><div class="answers">${opts.map(x=>`<button class="answer" data-x="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`;$('listenQuestion').onclick=()=>speakQuestion(q);document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answerQuiz(b,a));speakQuestion(q)}
function practiceNumber(){let [q,opt,a]=numberQuiz[S.i],opts=shuffle([...opt]);$('content').innerHTML=`<div><div class="pill">LATIHAN ANGKA ${S.i+1}</div><div class="question">${esc(q)}</div><button class="listen" id="listenQuestion" type="button" aria-label="Dengarkan soal">🔊</button><div class="answers">${opts.map(x=>`<button class="answer" data-x="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`;$('listenQuestion').onclick=()=>speakQuestion(q);document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answerQuiz(b,a));speakQuestion(q)}
function quiz(){let [q,opt,a]=quizzes[S.i],opts=shuffle([...opt]);$('content').innerHTML=`<div><div class="pill">KUIS ${S.i+1}</div><div class="question">${esc(q)}</div><button class="listen" id="listenQuestion" type="button" aria-label="Dengarkan soal">🔊</button><div class="answers">${opts.map(x=>`<button class="answer" data-x="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`;$('listenQuestion').onclick=()=>speakQuestion(q);document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>answerQuiz(b,a));speakQuestion(q)}
function answerQuiz(b,c){document.querySelectorAll('.answer').forEach(x=>x.disabled=true);let v=b.dataset.x;if(v===c){S.score++;b.classList.add('correct');speak('Benar! Kamu hebat!');toast('🌟 Jawaban benar!')}else{b.classList.add('wrong');[...document.querySelectorAll('.answer')].find(x=>x.dataset.x===c)?.classList.add('correct');speak(`Belum tepat. Jawaban yang benar ${c}.`);toast('Coba lagi ya 😊')}setTimeout(()=>{S.i++;if(S.i>=S.total)finish();else render()},800)}
function finish(){$('bar').style.width='100%';let pct=(S.game==='huruf'||S.game==='berhitung')?100:Math.round(S.score/S.total*100),stars=pct>=90?5:pct>=75?4:pct>=60?3:pct>=40?2:1;$('content').innerHTML=`<div class="result"><div class="big">${pct>=75?'🏆':'🌱'}</div><h2>Latihan selesai! 🎉</h2><p>Hebat, <b>${esc(S.name)}</b>!</p><div class="stars">${'⭐'.repeat(stars)}</div><div class="score">${S.game==='huruf'?'A–Z':S.score+' / '+S.total}</div><p>${S.game==='huruf'?'Kamu sudah mengenal huruf A sampai Z!':`Nilai kamu ${pct}%.`}</p><button class="main-btn" id="save">Simpan Nilai & Kembali 🏠</button></div>`;confetti();speak(pct>=75?'Hebat sekali! Kamu berhasil!':'Permainan selesai. Terus semangat belajar!');saveScore();$('save').onclick=()=>show('menu')}
async function saveScore(){
 let score=(S.game==='huruf'||S.game==='berhitung')?S.total:S.score;
 const record={nama_anak:S.name,permainan:S.game,skor:score,total_soal:S.total,waktu_main:new Date().toISOString()};
 try{
  const {r}=await requestJson('/api/save_score',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify(record)});
  if(r.ok)return;
 }catch(e){
  if(!e.apiUnavailable)toast('Nilai belum tersimpan. Coba lagi nanti ya.');
 }
 try{
  const scores=JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY)||'[]');
  scores.unshift(record);localStorage.setItem(LOCAL_SCORES_KEY,JSON.stringify(scores.slice(0,50)));
 }catch(e){}
}
async function showScores(){
 show('score');$('scoreContent').innerHTML='<div class="empty">Memuat nilai... ⏳</div>';
 const game=g=>({huruf:'Dunia Huruf',berhitung:'Dunia Angka',petualangan_angka:'Petualangan Benda',warna:'Cocokkan Warna'}[g]||g);
 try{
  const {r,j}=await requestJson('/api/get_scores',{credentials:'same-origin'});
  if(!r.ok||!j.success)throw new Error(j.message||'Database belum siap.');
  renderScores(j.data,game);return;
 }catch(e){
  try{
   const local=JSON.parse(localStorage.getItem(LOCAL_SCORES_KEY)||'[]');
   if(local.length){renderScores(local,game);return}
  }catch(x){}
  $('scoreContent').innerHTML=`<div class="empty">Belum ada nilai tersimpan 🌱<br><small>Nilai akan tersimpan di perangkat ini saat mode offline.</small></div>`;
 }
}
function renderScores(data,game){
 if(!data.length){$('scoreContent').innerHTML='<div class="empty">Belum ada nilai tersimpan 🌱</div>';return}
 $('scoreContent').innerHTML=`<div style="overflow:auto"><table><tr><th>Nama</th><th>Permainan</th><th>Skor</th><th>Waktu</th></tr>${data.map(x=>`<tr><td>${esc(x.nama_anak)}</td><td>${game(x.permainan)}</td><td><b>${x.skor}/${x.total_soal}</b></td><td>${new Date(x.waktu_main).toLocaleString('id-ID')}</td></tr>`).join('')}</table></div>`;
}

restoreSession();
