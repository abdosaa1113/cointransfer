
/* ============================================================
   CoinTransfer — transfer-only console
   Senders (coin-holding accounts) · Orders (clients) · Funds · Admin
   ============================================================ */
(() => {
'use strict';

/* ---------------- Icons ---------------- */
const IC = {
  users:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  cart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  gear:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  coin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4"/></svg>',
  sun:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>',
  menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  x:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  edit:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
  trash:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  chart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  copy:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  inbox:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  play:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
  split:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3 3 21"/></svg>',
  link:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  cal:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  power:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg>',
  group:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  tag:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>'
};

/* ---------------- Store ---------------- */
const LS = 'cointransfer.v2';
const defSettings = {
  brand: 'CoinTransfer',
  support: 'support@cointransfer.io',
  transferRate: 0.50,          // $ per 100k — GLOBAL, admin-controlled
  feePercent: 0,
  minOrderK: 100,
  platforms: { ps:{on:true,take:4.50}, xbox:{on:true,take:4.50}, pc:{on:true,take:4.50} },
  usdt: {
    trc20: { addr:'', on:true,  label:'USDT · TRON (TRC20)',    net:'TRC20' },
    erc20: { addr:'', on:false, label:'USDT · Ethereum (ERC20)',net:'ERC20' },
    bep20: { addr:'', on:false, label:'USDT · BNB Chain (BEP20)',net:'BEP20' }
  },
  payoutNote: 'Send the exact amount on the correct network and keep the TxID. Deposits are credited after 3 confirmations.'
};
const defUsers = [{ id:'u_admin', username:'admin', password:'admin123', name:'Administrator', role:'admin', active:true, balance:0, created: Date.now() }];
const defSenders = [
  { id:'S-001', account:'supplier-a@cointransfer', platform:'ps',   group:'Alpha', priority:1, take:0, keep:0, status:'available', coins:2450000, taken:320000, rate:4.50, pass:'', backup:'', proxy:'', lock:true,  start: Date.now()-86400000*12, updated: Date.now()-3600e3*5 },
  { id:'S-002', account:'supplier-b@cointransfer', platform:'xbox', group:'Alpha', priority:2, take:0, keep:0, status:'available', coins:1180000, taken:145000, rate:4.50, pass:'', backup:'', proxy:'', lock:true,  start: Date.now()-86400000*9,  updated: Date.now()-3600e3*9 },
  { id:'S-003', account:'supplier-c@cointransfer', platform:'pc',   group:'Beta',  priority:1, take:50000, keep:10000, status:'taken', coins:760000, taken:240000, rate:4.50, pass:'', backup:'', proxy:'', lock:true,  start: Date.now()-86400000*6,  updated: Date.now()-3600e3*14 },
  { id:'S-004', account:'supplier-d@cointransfer', platform:'ps',   group:'Beta',  priority:3, take:0, keep:20000, status:'disabled', coins:3400000, taken:610000, rate:4.50, pass:'', backup:'', proxy:'', lock:false, start: Date.now()-86400000*3,  updated: Date.now()-3600e3*20 }
];
const defOrders = [
  { id:'ORD-10241', receiver:'client-001@cointransfer', platform:'console', method:'own',   amount:500000,  delivered:500000,  status:'done',    lock:true,  check:false, pass:'', backup:'', proxy:'', when: Date.now()-3600e3*26 },
  { id:'ORD-10242', receiver:'client-002@cointransfer', platform:'pc',      method:'own',   amount:1000000, delivered:350000,  status:'active',  lock:true,  check:false, pass:'', backup:'', proxy:'', when: Date.now()-3600e3*4 },
  { id:'ORD-10243', receiver:'client-003@cointransfer', platform:'console', method:'own',   amount:250000,  delivered:0,       status:'nosender',lock:true,  check:true,  pass:'', backup:'', proxy:'', when: Date.now()-3600e3*2 },
  { id:'ORD-10244', receiver:'client-004@cointransfer', platform:'pc',      method:'public', amount:750000,  delivered:0,       status:'pending', lock:true,  check:false, pass:'', backup:'', proxy:'', when: Date.now()-3600e3*1 }
];
const defPayments = [
  { id:'PAY-11230', user:'u_admin', usd:39.99,  when: Date.now()-86400000*8,  chain:'BEP20', tx:'0x8862c3f6a7b479a18bfdafcb1d9bb5a38eadab304a2e9a61254a2c67ffd688ce' },
  { id:'PAY-11089', user:'u_admin', usd:64.99,  when: Date.now()-86400000*15, chain:'TRC20', tx:'0x0f01e80f675fb2f6cb751a369fdf8e04f5e31389377c218eaf63f14a4f7a6bd1' },
  { id:'PAY-10778', user:'u_admin', usd:9.99,   when: Date.now()-86400000*23, chain:'BEP20', tx:'0xc92c6c968082631198b0397b8ede032c60a53e7decb39927d142e6b874001456' }
];

let DB = load();
function load(){
  try {
    const raw = localStorage.getItem(LS);
    if (raw) { const d = JSON.parse(raw); return Object.assign({ settings:defSettings, users:defUsers, senders:defSenders, orders:defOrders, payments:defPayments }, d); }
  } catch(e){}
  return { settings:JSON.parse(JSON.stringify(defSettings)), users:JSON.parse(JSON.stringify(defUsers)),
           senders:JSON.parse(JSON.stringify(defSenders)), orders:JSON.parse(JSON.stringify(defOrders)),
           payments:JSON.parse(JSON.stringify(defPayments)), session:null };
}
function save(){ try { localStorage.setItem(LS, JSON.stringify(DB)); } catch(e){} }

/* ---------------- Helpers ---------------- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const K  = n => { n=Number(n)||0; if(n>=1e6) return (n/1e6).toFixed(n%1e6?2:0)+'M'; if(n>=1e3) return (n/1e3).toFixed(n%1e3?1:0)+'k'; return String(n); };
const num = n => (Number(n)||0).toLocaleString('en-US');
const money = n => '$'+(Number(n)||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const money4 = n => '$'+(Number(n)||0).toLocaleString('en-US',{minimumFractionDigits:4,maximumFractionDigits:4});
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = p => p + Math.random().toString(36).slice(2,9);
function fmtTime(ts){ const d=new Date(ts||Date.now()); const p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
function ago(ts){ const s=(Date.now()-(ts||Date.now()))/1000; if(s<60)return 'just now'; if(s<3600)return Math.floor(s/60)+'m ago'; if(s<86400)return Math.floor(s/3600)+'h ago'; return Math.floor(s/86400)+'d ago'; }
function toast(msg, kind){ const t=document.createElement('div'); t.className='toast '+(kind||''); t.textContent=msg; $('#toasts').appendChild(t); setTimeout(()=>{ t.style.transition='opacity .3s, transform .3s'; t.style.opacity='0'; t.style.transform='translateX(24px)'; setTimeout(()=>t.remove(),320); }, 2800); }
function copy(txt){ if(navigator.clipboard) navigator.clipboard.writeText(txt).then(()=>toast('Copied to clipboard','ok')).catch(()=>toast('Copy failed','err')); else toast('Copy unavailable','err'); }
function platIcon(p){ return `<img src="${p==='xbox'?'./xbox.png':p==='pc'?'./origin.png':'./ps-light.png'}" alt="">`; }
function platName(p){ return p==='xbox'?'Xbox':p==='pc'?'PC':'PlayStation'; }

/* Business math — single global rate */
const per100k = (coins) => (Number(coins)||0)/1000 * (DB.settings.transferRate||0);   // user payout
const taxPct  = () => DB.settings.feePercent||0;
const netOf   = (o) => { const gross = per100k(o.amount); const tax = gross*taxPct()/100; return gross - tax; };
const TAXRATE = 0.147;   // EA transfer market tax shown for reference

/* ---------------- Auth ---------------- */
function login(u,p){
  const user = DB.users.find(x => x.username.toLowerCase() === String(u).toLowerCase().trim() && x.password === p);
  if (!user) return { ok:false, msg:'Invalid username or password.' };
  if (!user.active) return { ok:false, msg:'This account has been deactivated. Contact the administrator.' };
  DB.session = { userId:user.id, at:Date.now() };
  save();
  return { ok:true, user };
}
function logout(){ DB.session=null; save(); location.hash=''; boot(); }
function currentUser(){ return DB.session ? (DB.users.find(u=>u.id===DB.session.userId)||null) : null; }

/* ---------------- Nav ---------------- */
const NAV = [
  { id:'senders', label:'Senders', icon:IC.users  },
  { id:'orders',  label:'Orders',  icon:IC.cart   },
  { id:'funds',   label:'Funds',   icon:IC.wallet },
  { id:'admin',   label:'Admin',   icon:IC.gear,  adminOnly:true }
];

function boot(){
  const user = currentUser();
  $('#loginScreen').style.display = user ? 'none' : 'flex';
  $('#app').classList.toggle('on', !!user);
  if (!user) return;
  $('#avatar').textContent = (user.name||user.username).charAt(0).toUpperCase();
  $('#avatar').title = `${user.name} · ${user.role}`;
  $('#nav').innerHTML = NAV.filter(n => !n.adminOnly || user.role==='admin').map(n => {
    const badge = n.id==='orders' ? `<span class="nav-badge">${DB.orders.filter(o=>o.status!=='done').length}</span>` : '';
    return `<div class="nav-item" data-page="${n.id}">${n.icon}<span>${n.label}</span>${badge}</div>`;
  }).join('');
  $$('#nav .nav-item').forEach(el => el.onclick = () => { go(el.dataset.page); closeSidebar(); });
  renderBalance();
  const start = (location.hash||'').replace('#/','');
  go(NAV.some(n=>n.id===start) ? start : 'orders');
}

function renderBalance(){
  const u = currentUser(); if(!u) return;
  $('#balance').textContent = money(u.balance||0);
  $('#balance').title = 'Your balance — click to add funds';
  $('#balance').style.cursor = 'pointer';
  $('#balance').onclick = () => go('funds');
}

let CURRENT='orders';
function go(page){
  CURRENT = page;
  $$('#nav .nav-item').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  $$('.page').forEach(el => el.classList.toggle('on', el.id==='page-'+page));
  const titles = {
    senders:['Senders','Coin-holding supplier accounts'],
    orders:['Orders','Client coin orders & delivery'],
    funds:['Funds','Add balance & payment history'],
    admin:['Admin','Transfer rate, networks & accounts']
  };
  const t = titles[page]||['CoinTransfer',''];
  $('#pageTitle').innerHTML = `${t[0]}<small>${t[1]}</small>`;
  if (location.hash !== '#/'+page) history.replaceState(null,'','#/'+page);
  if (page==='senders') renderSenders();
  if (page==='orders')  renderOrders();
  if (page==='funds')   renderFunds();
  if (page==='admin')   renderAdmin();
}

/* ================= PAGE: SENDERS ================= */
let sQuery='';
function renderSenders(){
  const s = DB.settings;
  const list = DB.senders.filter(x => !sQuery || (x.id+' '+x.account+' '+x.group).toLowerCase().includes(sQuery));
  const totalStock = DB.senders.reduce((a,x)=>a+(x.coins||0),0);
  const totalTaken = DB.senders.reduce((a,x)=>a+(x.taken||0),0);
  const avail = DB.senders.filter(x=>x.status==='available').length;
  const costPerM = (s.platforms.ps.take*10);

  $('#senderStats').innerHTML = `
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.coin}</div><div class="stat-name">Coins available</div></div>
      <div class="stat-val">${num(totalStock/1000|0)}<small> k</small></div>
      <div class="stat-sub">${avail} of ${DB.senders.length} accounts ready</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.chart}</div><div class="stat-name">Coins taken</div></div>
      <div class="stat-val">${num(totalTaken/1000|0)}<small> k</small></div>
      <div class="stat-sub">across all sender accounts</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.dollar}</div><div class="stat-name">Your buy rate</div></div>
      <div class="stat-val">${money(costPerM)}<small> / 1M</small></div>
      <div class="stat-sub">paid to suppliers per 1M taken</div>
    </div>`;

  $('#senderRows').innerHTML = list.length ? list.map(x => `
    <tr>
      <td><span class="batch">#${esc(x.id)}</span></td>
      <td><b>${esc(x.account)}</b></td>
      <td><span class="plat">${platIcon(x.platform)}${platName(x.platform)}</span></td>
      <td>${esc(x.group)}</td>
      <td>${x.priority||0}</td>
      <td>${x.take? K(x.take):'—'}</td>
      <td>${x.keep? K(x.keep):'—'}</td>
      <td>${num(x.coins)}</td>
      <td>${num(x.taken)}</td>
      <td><span class="badge ${x.status==='available'?'on':x.status==='taken'?'pending':'off'}">${x.status==='available'?'Available':x.status==='taken'?'Amount taken':'Disabled'}</span></td>
      <td><div class="rowacts"><button class="btn btn-ghost btn-sm" data-sedit="${x.id}" title="Edit sender">${IC.edit}</button><button class="btn btn-danger btn-sm" data-sdel="${x.id}" title="Delete sender">${IC.trash}</button></div></td>
    </tr>`).join('') : `<tr><td colspan="11"><div class="empty">${IC.inbox}<div>No sender accounts yet — add your first one.</div></div></td></tr>`;

  $$('#senderRows [data-sedit]').forEach(b=>b.onclick=()=>senderModal(b.dataset.sedit));
  $$('#senderRows [data-sdel]').forEach(b=>b.onclick=()=>{ if(confirm('Delete this sender account?')){ DB.senders=DB.senders.filter(x=>x.id!==b.dataset.sdel); save(); renderSenders(); toast('Sender deleted','ok'); } });
}

/* Sender actions menu — every item named + explained */
function senderActions(id){
  const x = DB.senders.find(s=>s.id===id); if(!x) return;
  const rows = [
    ['refresh',  IC.refresh, 'Refresh balance',  'Re-read the live coin balance from the game'],
    ['edit',     IC.edit,    'Edit sender',      'Change login details, limits and pricing'],
    ['toggle',   x.status==='available'?IC.power:IC.check, x.status==='available'?'Disable account':'Enable account', x.status==='available'?'Stop using this account for transfers':'Allow this account to be used'],
    ['cost',     IC.tag,     'Correct cost',     'Fix the price per 100k paid to this supplier'],
    ['taken',    IC.chart,   'Coins taken',      'History of coins pulled from this account'],
    ['gtaken',   IC.group,   'Group taken',      'Total coins taken per group'],
    ['rstart',   IC.history, 'Reset start',      'Restart the baseline count from now'],
    ['rtaken',   IC.history, 'Reset taken',      'Set the taken counter back to zero']
  ];
  modal({
    title:`Sender · #${x.id}`,
    sub:`${x.account} · ${platName(x.platform)}`,
    body:`<div class="actlist">${rows.map(([k,ic,name,desc])=>`
      <button class="actitem" data-act="${k}">
        <span class="acticon">${ic}</span>
        <span class="acttext"><b>${name}</b><small>${desc}</small></span>
      </button>`).join('')}</div>`,
    ok:'Close', onOk:()=>{},
    onOpen: () => {
      $$('#overlay [data-act]').forEach(b => b.onclick = () => {
        const a = b.dataset.act;
        if (a==='refresh'){ x.updated=Date.now(); save(); renderSenders(); toast('Balance refreshed','ok'); }
        else if (a==='edit'){ closeModal(); senderModal(x.id); return; }
        else if (a==='toggle'){ x.status = x.status==='available' ? 'disabled' : 'available'; save(); renderSenders(); toast(x.status==='available'?'Account enabled':'Account disabled','ok'); closeModal(); }
        else if (a==='cost'){ closeModal(); modal({ title:'Correct cost', sub:`Price per 100k you pay ${x.account}`, body:`<div class="field"><label>Price per 100k ($)</label><input id="c_cost" type="number" step="0.01" value="${(x.rate||0).toFixed(2)}"></div>`, ok:'Save', onOk:()=>{ x.rate=+$('#c_cost').value||x.rate; save(); renderSenders(); toast('Cost corrected','ok'); return true; } }); }
        else if (a==='taken'){ closeModal(); modal({ title:'Coins taken', sub:x.account, body:`<div class="kv"><span>Total taken</span><b>${num(x.taken)}</b></div><div class="kv"><span>Cost to you</span><b>${money((x.taken/1000)*(x.rate||0))}</b></div><div class="kv"><span>Last update</span><b>${fmtTime(x.updated)}</b></div>`, ok:'Close', onOk:()=>{} }); }
        else if (a==='gtaken'){ closeModal(); const g={}; DB.senders.forEach(s2=>g[s2.group]=(g[s2.group]||0)+(s2.taken||0)); modal({ title:'Group taken', sub:'Coins pulled per group', body:`<div class="kvs">${Object.keys(g).map(k=>`<div class="kv"><span>${esc(k)}</span><b>${num(g[k])}</b></div>`).join('')||'<div class="empty">No groups</div>'}</div>`, ok:'Close', onOk:()=>{} }); }
        else if (a==='rstart'){ x.start=Date.now(); save(); renderSenders(); toast('Start reset','ok'); closeModal(); }
        else if (a==='rtaken'){ x.taken=0; save(); renderSenders(); toast('Taken counter reset','ok'); closeModal(); }
      });
    }
  });
}

function senderModal(id){
  const x = id ? DB.senders.find(s=>s.id===id) : null;
  modal({
    title: x ? 'Edit sender' : 'Add sender',
    sub:  x ? `#${x.id} · ${x.account}` : 'Register a coin-holding account',
    body: `
      <div class="form-grid">
        <div class="field full"><label>Account email or phone</label><input id="s_account" value="${esc(x?x.account:'')}" placeholder="name@example.com or +1 5551234567"></div>
        <div class="field"><label>Password</label><input id="s_pass" value="${esc(x?x.pass:'')}" placeholder="account password"></div>
        <div class="field"><label>Platform</label><select id="s_platform">
          <option value="ps" ${x&&x.platform==='ps'?'selected':''}>PlayStation</option>
          <option value="xbox" ${x&&x.platform==='xbox'?'selected':''}>Xbox</option>
          <option value="pc" ${x&&x.platform==='pc'?'selected':''}>PC</option>
        </select></div>
        <div class="field"><label>Amount to take (k)</label><input id="s_take" type="number" value="${x?x.take:0}"><div class="hint">0 = unlimited</div></div>
        <div class="field"><label>Amount to keep (k)</label><input id="s_keep" type="number" value="${x?x.keep:0}"></div>
        <div class="field"><label>Group</label><input id="s_group" value="${esc(x?x.group:'Alpha')}"></div>
        <div class="field"><label>Priority</label><input id="s_priority" type="number" value="${x?x.priority:1}" min="0"></div>
        <div class="field"><label>Price you pay per 100k ($)</label><input id="s_rate" type="number" step="0.01" value="${x&&x.rate!=null?x.rate:(DB.settings.platforms[x?x.platform:'ps'].take).toFixed(2)}"></div>
        <div class="field"><label>Coins available</label><input id="s_coins" type="number" value="${x?x.coins:0}"></div>
        <div class="field full"><label>Backup codes / authenticator / cookie</label><textarea id="s_backup" rows="3" placeholder="111111,222222&#10;a1b2cde3fg&#10;or paste a cookie">${esc(x?x.backup:'')}</textarea></div>
        <div class="field full"><label>Custom proxy</label><input id="s_proxy" value="${esc(x?x.proxy:'')}" placeholder="ip:port:username:password"></div>
        <div class="field full"><label class="check"><input id="s_lock" type="checkbox" ${!x||x.lock?'checked':''}> Account lock (hold this account while transferring)</label></div>
      </div>`,
    ok: x ? 'Save sender' : 'Add sender',
    onOk: () => {
      const account = $('#s_account').value.trim();
      if (!account) return toast('Account email or phone is required','err'), false;
      const data = {
        account, pass:$('#s_pass').value, platform:$('#s_platform').value,
        take:+$('#s_take').value||0, keep:+$('#s_keep').value||0,
        group:$('#s_group').value.trim()||'Alpha', priority:+$('#s_priority').value||0,
        rate:+$('#s_rate').value||0, coins:+$('#s_coins').value||0,
        backup:$('#s_backup').value, proxy:$('#s_proxy').value, lock:$('#s_lock').checked,
        updated:Date.now()
      };
      if (x) Object.assign(x, data);
      else DB.senders.push(Object.assign({ id:nextSenderId(), status:'available', taken:0, start:Date.now() }, data));
      save(); renderSenders(); toast(x?'Sender updated':'Sender added','ok');
      return true;
    }
  });
}
function nextSenderId(){
  const nums = DB.senders.map(x=>parseInt(String(x.id).replace(/\D/g,''),10)).filter(n=>!isNaN(n));
  return 'S-'+String((nums.length?Math.max(...nums):0)+1).padStart(3,'0');
}

/* ================= PAGE: ORDERS ================= */
let oQuery='', oFilter='all';
function renderOrders(){
  const rate = DB.settings.transferRate;
  const all = DB.orders.slice().sort((a,b)=>b.when-a.when);
  const counts = { all:all.length, pending:0, active:0, done:0, nosender:0 };
  all.forEach(o=>{ if(counts[o.status]!=null) counts[o.status]++; });

  $('#orderStats').innerHTML = `
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.coin}</div><div class="stat-name">Sender stock (avg)</div></div>
      <div class="stat-val">${DB.senders.length? K(DB.senders.reduce((a,x)=>a+(x.coins||0),0)/DB.senders.length) : '0'}</div>
      <div class="stat-sub">per active sender account</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.chart}</div><div class="stat-name">Transferred / tax today</div></div>
      <div class="stat-val">${K(all.filter(o=>o.status==='done').reduce((a,o)=>a+(o.delivered||0),0))}</div>
      <div class="stat-sub">tax ${(TAXRATE*100).toFixed(2)}% · platform fee ${DB.settings.feePercent}%</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.tag}</div><div class="stat-name">Transfer rate</div></div>
      <div class="stat-val">${money4(rate)}<small> / 100k</small></div>
      <div class="stat-sub">applies to every order${currentUser()&&currentUser().role==='admin'?' · <a href="#/admin" data-goadmin>change</a>':''}</div>
    </div>`;

  const list = all.filter(o => (oFilter==='all'||o.status===oFilter)
      && (!oQuery || (o.id+' '+o.receiver).toLowerCase().includes(oQuery)));

  $('#orderRows').innerHTML = list.length ? list.map(o => {
    const pct = o.amount ? Math.min(100, Math.round((o.delivered||0)/o.amount*100)) : 0;
    const st = { pending:['pending','Pending'], active:['part','Transferring'], done:['done','Completed'], nosender:['fail','No sender'] }[o.status] || ['off',o.status];
    return `<tr>
      <td class="mono"><b>${esc(o.id)}</b></td>
      <td><span class="plat">${platIcon(o.platform==='pc'?'pc':o.platform==='console'?'ps':'xbox')}${esc(o.receiver)}</span></td>
      <td>${o.method==='public'?'Public':o.method==='private'?'Private':'Own sender'}</td>
      <td>${fmtTime(o.when)}</td>
      <td>${o.status==='done'?fmtTime(o.when+3600e3*2):'—'}</td>
      <td>${o.status==='done'?money(netOf(o)*(TAXRATE)):'—'}</td>
      <td><span class="badge ${st[0]}">${st[1]}</span></td>
      <td><div class="sandtrack"><span style="width:${pct}%"></span></div><small>${pct}% · ${K(o.delivered||0)} / ${K(o.amount)}</small></td>
      <td><b>${money(per100k(o.delivered||0))}</b></td>
      <td><div class="rowacts">
        <button class="btn btn-ghost btn-sm" data-oact="${o.id}" title="Order actions">Actions</button>
      </div></td>
    </tr>`;
  }).join('') : `<tr><td colspan="10"><div class="empty">${IC.inbox}<div>No orders in this view.</div></div></td></tr>`;

  $$('#orderRows [data-oact]').forEach(b=>b.onclick=()=>orderActions(b.dataset.oact));
  const ga = $('#orderStats [data-goadmin]'); if(ga) ga.onclick=()=>go('admin');
  $$('#orderTabs .tab').forEach(t=>t.classList.toggle('active', t.dataset.f===oFilter));
  $$('#orderTabs .tab').forEach(t=>t.onclick=()=>{ oFilter=t.dataset.f; renderOrders(); });
}

function orderActions(id){
  const o = DB.orders.find(x=>x.id===id); if(!o) return;
  const link = location.origin + location.pathname + '?order=' + o.id;
  const rows = [
    ['link',   IC.copy,  'Copy info link',    'Tracking link you send to the client'],
    ['start',  IC.play,  'Start transfer',    'Begin delivering coins to this account'],
    ['edit',   IC.edit,  'Edit order',        'Change account, amount or platform'],
    ['daily',  IC.cal,   'Delivered daily',   'How much was delivered each day'],
    ['price',  IC.tag,   'Correct price',     'Fix the payout for this order'],
    ['split',  IC.split, 'Split order',       'Spread the amount across several senders'],
    ['finish', IC.check, 'Complete order',    'Mark the order as fully delivered'],
    ['del',    IC.trash, 'Delete order',      'Remove this order permanently']
  ];
  modal({
    title:`Order · ${o.id}`,
    sub:`${o.receiver} · ${K(o.amount)} coins`,
    body:`<div class="actlist">${rows.map(([k,ic,name,desc])=>`
      <button class="actitem" data-act="${k}">
        <span class="acticon">${ic}</span>
        <span class="acttext"><b>${name}</b><small>${desc}</small></span>
      </button>`).join('')}</div>`,
    ok:'Close', onOk:()=>{},
    onOpen: () => {
      $$('#overlay [data-act]').forEach(b=>b.onclick=()=>{
        const a=b.dataset.act;
        if (a==='link'){ copy(link); }
        else if (a==='start'){ closeModal(); if(o.status==='pending'||o.status==='nosender'){ o.status='active'; if(!o.delivered) o.delivered=Math.round(o.amount*0.25); save(); renderOrders(); toast('Transfer started','ok'); } else toast('Already running','err'); }
        else if (a==='edit'){ closeModal(); orderModal(o.id); }
        else if (a==='daily'){ closeModal(); const d=Math.max(1,Math.ceil((Date.now()-o.when)/86400000)); modal({ title:'Delivered daily', sub:o.id, body:`<div class="kv"><span>Per day (avg)</span><b>${K(Math.round((o.delivered||0)/d))}</b></div><div class="kv"><span>Delivered</span><b>${num(o.delivered||0)}</b></div><div class="kv"><span>Remaining</span><b>${num(Math.max(0,o.amount-(o.delivered||0)))}</b></div>`, ok:'Close', onOk:()=>{} }); }
        else if (a==='price'){ closeModal(); modal({ title:'Correct price', sub:'Payout for this order', body:`<div class="field"><label>Price the client pays ($)</label><input id="c_price" type="number" step="0.01" value="${per100k(o.amount).toFixed(2)}"><div class="hint">Auto = ${K(o.amount)} × ${money4(DB.settings.transferRate)} / 100k</div></div>`, ok:'Save', onOk:()=>{ o.priceOverride=+$('#c_price').value; save(); renderOrders(); toast('Price corrected','ok'); return true; } }); }
        else if (a==='split'){ closeModal(); modal({ wide:true, title:'Split order', sub:`Spread ${K(o.amount)} across sender accounts`, body:`<div class="splitbox">${DB.senders.filter(s2=>s2.status==='available').map(s2=>`<label class="check splitrow"><input type="checkbox" value="${s2.id}" checked><span>${s2.id}</span><b>${esc(s2.account)}</b><small>${K(s2.coins||0)} available</small></label>`).join('')||'<div class="empty">No available senders</div>'}</div>`, ok:'Split', onOk:()=>{ const ids=$$('#overlay .splitrow input:checked').map(i=>i.value); if(!ids.length) return toast('Pick at least one sender','err'), false; const each=Math.floor(o.amount/ids.length); o.split=ids.map(i=>({id:i,amount:each})); save(); renderOrders(); toast(`Split across ${ids.length} senders`,'ok'); return true; } }); }
        else if (a==='finish'){ o.status='done'; o.delivered=o.amount; save(); renderOrders(); renderBalance(); toast('Order completed','ok'); closeModal(); }
        else if (a==='del'){ if(confirm('Delete this order?')){ DB.orders=DB.orders.filter(x=>x.id!==o.id); save(); renderOrders(); toast('Order deleted','ok'); closeModal(); } }
      });
    }
  });
}

function orderModal(id){
  const o = id ? DB.orders.find(x=>x.id===id) : null;
  const rate = DB.settings.transferRate;
  modal({
    wide:true,
    title: o ? 'Edit order' : 'Add order',
    sub:  o ? o.id : 'Log a client coin order',
    body: `
      <div class="tabs mini" id="oCustTabs">
        <div class="tab active" data-c="new">New client</div>
        <div class="tab" data-c="saved">Saved client</div>
      </div>
      <div id="oSavedPane" class="savedpane d-none">
        <div class="savedlist">${savedClients().map(c=>`<button class="savedrow" data-cust="${esc(c)}">${esc(c)}</button>`).join('')||'<div class="empty">No saved clients yet</div>'}</div>
      </div>
      <div class="form-grid">
        <div class="field full"><label>Client account email or phone</label><input id="o_receiver" value="${esc(o?o.receiver:'')}" placeholder="name@example.com or +1 5551234567"></div>
        <div class="field"><label>Password</label><input id="o_pass" value="${esc(o?o.pass:'')}" placeholder="account password"></div>
        <div class="field"><label>Order amount (k coins)</label><input id="o_amount" type="number" value="${o?o.amount/1000:100}"><div class="hint">Max from available sender stock: ${K(DB.senders.reduce((a,x)=>a+(x.coins||0),0))}</div></div>
        <div class="field"><label>Coins delivered (k)</label><input id="o_delivered" type="number" value="${o?o.delivered/1000:0}"></div>
        <div class="field"><label>Platform</label><select id="o_platform">
          <option value="ps" ${o&&o.platform==='ps'?'selected':''}>PlayStation</option>
          <option value="xbox" ${o&&o.platform==='xbox'?'selected':''}>Xbox</option>
          <option value="pc" ${o&&o.platform==='pc'?'selected':''}>PC</option>
        </select></div>
        <div class="field"><label>Status</label><select id="o_status">
          <option value="pending" ${o&&o.status==='pending'?'selected':''}>Pending</option>
          <option value="active" ${o&&o.status==='active'?'selected':''}>Transferring</option>
          <option value="done" ${o&&o.status==='done'?'selected':''}>Completed</option>
        </select></div>
        <div class="field full"><label>Backup codes / authenticator / cookie</label><textarea id="o_backup" rows="3" placeholder="111111,222222&#10;a1b2cde3fg&#10;or paste a cookie">${esc(o?o.backup:'')}</textarea></div>
        <div class="field full"><label>Custom proxy</label><input id="o_proxy" value="${esc(o?o.proxy:'')}" placeholder="ip:port:username:password"></div>
        <div class="field full"><label>Source of coins</label><select id="o_method">
          <option value="own" ${!o||o.method==='own'?'selected':''}>Own senders</option>
          <option value="public" ${o&&o.method==='public'?'selected':''}>Public</option>
          <option value="private" ${o&&o.method==='private'?'selected':''}>Private</option>
        </select></div>
      </div>
      <div class="payout box">
        <div><span>Client pays you</span><b id="o_payout">${money(per100k(o?o.amount:100000))}</b></div>
        <small>${K(o?o.amount:100000)} × ${money4(rate)} / 100k · global rate</small>
      </div>
      <div class="checks">
        <label class="check"><input id="o_check" type="checkbox" ${o&&o.check?'checked':''}> Check details first</label>
        <label class="check"><input id="o_lock" type="checkbox" ${!o||o.lock?'checked':''}> Account lock</label>
      </div>`,
    ok: o ? 'Save order' : 'Add order',
    onOk: () => {
      const receiver = $('#o_receiver').value.trim();
      if (!receiver) return toast('Client account is required','err'), false;
      const data = {
        receiver, pass:$('#o_pass').value,
        amount:(+$('#o_amount').value||0)*1000,
        delivered:(+$('#o_delivered').value||0)*1000,
        platform:$('#o_platform').value, status:$('#o_status').value,
        backup:$('#o_backup').value, proxy:$('#o_proxy').value,
        method:$('#o_method').value, check:$('#o_check').checked, lock:$('#o_lock').checked
      };
      if (o) Object.assign(o, data);
      else DB.orders.push(Object.assign({ id:nextOrderId(), when:Date.now() }, data));
      save(); renderOrders(); toast(o?'Order updated':'Order added','ok');
      return true;
    },
    onOpen: () => {
      const amt = $('#o_amount');
      const upd = () => { const p=$('#o_payout'); if(p) p.textContent = money(per100k((+amt.value||0)*1000)); };
      amt && (amt.oninput = upd);
      $$('#oCustTabs .tab').forEach(t=>t.onclick=()=>{
        $$('#oCustTabs .tab').forEach(x=>x.classList.remove('active')); t.classList.add('active');
        const saved = t.dataset.c==='saved';
        $('#oSavedPane').classList.toggle('d-none', !saved);
      });
      $$('#overlay .savedrow').forEach(b=>b.onclick=()=>{ $('#o_receiver').value=b.dataset.cust; });
      upd();
    }
  });
}
function nextOrderId(){
  const nums = DB.orders.map(x=>parseInt(String(x.id).replace(/\D/g,''),10)).filter(n=>!isNaN(n));
  return 'ORD-'+String((nums.length?Math.max(...nums):10000)+1);
}
function savedClients(){ return Array.from(new Set(DB.orders.map(o=>o.receiver))).slice(0,12); }

/* ================= PAGE: FUNDS (all users) ================= */
function renderFunds(){
  const u = currentUser(); if(!u) return;
  const s = DB.settings;
  const mine = DB.payments.filter(p=>p.user===u.id);
  const total = mine.reduce((a,p)=>a+(p.usd||0),0);

  $('#fundStats').innerHTML = `
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.wallet}</div><div class="stat-name">Your balance</div></div>
      <div class="stat-val">${money(u.balance||0)}</div>
      <div class="stat-sub">available to spend on transfers</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.chart}</div><div class="stat-name">Total deposited</div></div>
      <div class="stat-val">${money(total)}</div>
      <div class="stat-sub">${mine.length} deposit${mine.length===1?'':'s'}</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.dollar}</div><div class="stat-name">Transfer cost</div></div>
      <div class="stat-val">${money4(s.transferRate)}<small> /100k</small></div>
      <div class="stat-sub">current global rate</div>
    </div>`;

  const nets = Object.keys(s.usdt).filter(k=>s.usdt[k].on && s.usdt[k].addr);
  $('#fundNetworks').innerHTML = nets.map(k=>{
    const n=s.usdt[k];
    return `<div class="net-addr-row">
      <span class="tag">${n.net}</span>
      <span class="mono">${esc(n.addr)}</span>
      <button class="btn btn-ghost btn-sm" data-copy="${esc(n.addr)}" title="Copy address">${IC.copy}</button>
    </div>`;
  }).join('') || '<div class="empty">No deposit addresses are enabled yet — contact the administrator.</div>';

  $$('#fundNetworks [data-copy]').forEach(b=>b.onclick=()=>copy(b.dataset.copy));

  $('#payRows').innerHTML = mine.length ? mine.slice().sort((a,b)=>b.when-a.when).map(p=>`
    <tr>
      <td class="mono"><b>${esc(p.id)}</b></td>
      <td>${money(p.usd)}</td>
      <td>€ ${(p.usd*0.89).toFixed(2)}</td>
      <td>${fmtTime(p.when)}</td>
      <td>Crypto</td>
      <td><span class="tag">${esc(p.chain)}</span></td>
      <td class="mono truncate" title="${esc(p.tx)}">${esc(p.tx)}</td>
      <td><button class="btn btn-ghost btn-sm" data-pdet="${p.id}">Details</button></td>
    </tr>`).join('') : `<tr><td colspan="8"><div class="empty">${IC.inbox}<div>No deposits yet.</div></div></td></tr>`;

  $$('#payRows [data-pdet]').forEach(b=>b.onclick=()=>{
    const p = mine.find(x=>x.id===b.dataset.pdet); if(!p) return;
    modal({ title:'Payment details', sub:p.id, body:`
      <div class="kv"><span>Method</span><b>USDT (crypto)</b></div>
      <div class="kv"><span>Chain</span><b>${esc(p.chain)}</b></div>
      <div class="kv"><span>Amount</span><b>${money(p.usd)}</b></div>
      <div class="kv"><span>Timestamp</span><b>${fmtTime(p.when)}</b></div>
      <div class="kv"><span>Transaction ID</span><b class="mono wrap">${esc(p.tx)}</b></div>`, ok:'Close', onOk:()=>{} });
  });

  $('#addFundsForm') && ($('#addFundsForm').onsubmit = e => {
    e.preventDefault();
    const v = +$('#usdtAmount').value;
    if (!v || v<=0) return toast('Enter a valid USDT amount','err');
    const enabled = Object.keys(s.usdt).filter(k=>s.usdt[k].on && s.usdt[k].addr);
    if (!enabled.length) return toast('No deposit address available','err');
    const chain = enabled[0];
    DB.payments.push({ id:'PAY-'+Math.floor(10000+Math.random()*89999), user:u.id, usd:v, when:Date.now(), chain:s.usdt[chain].net, tx:'pending — awaiting your transfer' });
    u.balance = (u.balance||0) + v;
    save(); renderFunds(); renderBalance();
    toast(`Reservation created for ${money(v)} — send USDT to the ${s.usdt[chain].net} address`,'ok');
    $('#usdtAmount').value='';
  });
}

/* ================= PAGE: ADMIN ================= */
function renderAdmin(){
  const u = currentUser(); if(!u || u.role!=='admin') return;
  const s = DB.settings;

  const net = (key,n) => `
    <div class="net-card ${n.on?'on':''}" data-net="${key}">
      <div class="net-head">
        <div><b>${esc(n.label)}</b><div class="hint">${key==='trc20'?'Lowest fees · recommended':key==='erc20'?'Ethereum mainnet · higher gas':'BNB Smart Chain · low fees'}</div></div>
        <span class="badge ${n.on?'on':'off'}">${n.on?'Enabled':'Off'}</span>
      </div>
      <div class="net-addr">
        <span class="mono">${n.addr? esc(n.addr) : '<i style="color:var(--dim)">No address set</i>'}</span>
        ${n.addr?`<button class="copy" data-copy="${esc(n.addr)}" title="Copy">${IC.copy}</button>`:''}
      </div>
      <div class="row-actions" style="margin-top:12px">
        <button class="btn btn-ghost btn-sm" data-setaddr="${key}">Set address</button>
        <button class="btn ${n.on?'btn-ghost':'btn-gold'} btn-sm" data-toggle="${key}">${n.on?'Disable':'Enable'}</button>
      </div>
    </div>`;
  $('#adminNetworks').innerHTML = net('trc20',s.usdt.trc20)+net('erc20',s.usdt.erc20)+net('bep20',s.usdt.bep20);

  $('#adminRate').innerHTML = `
    <div class="ratebox">
      <div>
        <span class="ratelabel">Transfer rate — what clients pay you</span>
        <div class="ratevalue">${money4(s.transferRate)} <small>/ 100k coins</small></div>
        <div class="hint">Applies to every order for every user. Suppliers are paid separately from the buy rates below.</div>
      </div>
      <button class="btn btn-gold" id="editRate">Change rate</button>
    </div>`;

  $('#adminConfig').innerHTML = `
    <div class="kv"><span>Platform fee on payouts</span><b>${s.feePercent}%</b> <button class="btn btn-ghost btn-sm" id="editFee">Change</button></div>
    <div class="kv"><span>Minimum order</span><b>${num(s.minOrderK)}k</b> <button class="btn btn-ghost btn-sm" id="editMin">Change</button></div>
    <div class="kv"><span>Buy rate — PlayStation</span><b>${money(s.platforms.ps.take)} /100k</b> <button class="btn btn-ghost btn-sm" id="editPs">Change</button></div>
    <div class="kv"><span>Buy rate — Xbox</span><b>${money(s.platforms.xbox.take)} /100k</b> <button class="btn btn-ghost btn-sm" id="editXbox">Change</button></div>
    <div class="kv"><span>Buy rate — PC</span><b>${money(s.platforms.pc.take)} /100k</b> <button class="btn btn-ghost btn-sm" id="editPc">Change</button></div>
    <div class="kv"><span>Support contact</span><b>${esc(s.support)}</b> <button class="btn btn-ghost btn-sm" id="editSupport">Change</button></div>
    <div class="kv"><span>Deposit instructions</span><b class="wrap muted">${esc(s.payoutNote)}</b></div>
    <div class="row-actions" style="margin-top:14px"><button class="btn btn-gold btn-sm" id="editNote">Edit deposit instructions</button></div>`;

  $('#userRows').innerHTML = DB.users.map(x=>`
    <tr>
      <td><b>${esc(x.name)}</b></td>
      <td class="mono">${esc(x.username)}</td>
      <td><span class="badge ${x.role==='admin'?'pending':'on'}">${x.role}</span></td>
      <td>${money(x.balance||0)}</td>
      <td><span class="badge ${x.active?'on':'off'}">${x.active?'Active':'Disabled'}</span></td>
      <td>${fmtTime(x.created)}</td>
      <td><div class="rowacts">
        <button class="btn btn-ghost btn-sm" data-uedit="${x.id}" title="Edit account">${IC.edit}</button>
        <button class="btn ${x.active?'btn-danger':'btn-success'} btn-sm" data-utog="${x.id}">${x.active?'Disable':'Enable'}</button>
        <button class="btn btn-ghost btn-sm" data-ufunds="${x.id}" title="Adjust balance">${IC.wallet}</button>
        ${x.role!=='admin'||DB.users.filter(y=>y.role==='admin').length>1?`<button class="btn btn-danger btn-sm" data-udel="${x.id}" title="Delete account">${IC.trash}</button>`:''}
      </div></td>
    </tr>`).join('');

  $$('#adminNetworks [data-copy]').forEach(b=>b.onclick=()=>copy(b.dataset.copy));
  $$('#adminNetworks [data-toggle]').forEach(b=>b.onclick=()=>{ const k=b.dataset.toggle; s.usdt[k].on=!s.usdt[k].on; save(); renderAdmin(); toast(`${s.usdt[k].net} ${s.usdt[k].on?'enabled':'disabled'}`,'ok'); });
  $$('#adminNetworks [data-setaddr]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.setaddr, n=s.usdt[k];
    modal({ title:'Set '+n.net+' address', sub:'Deposit address clients send USDT to',
      body:`<div class="field"><label>USDT address (${n.net})</label><input id="a_addr" value="${esc(n.addr)}" placeholder="${k==='trc20'?'T...':'0x...'}"><div class="hint">Coins sent to a mismatched network are unrecoverable — double-check.</div></div>`,
      ok:'Save address', onOk:()=>{ s.usdt[k].addr=$('#a_addr').value.trim(); save(); renderAdmin(); toast('Address saved','ok'); return true; } });
  });

  const numBox = (title, sub, val, step, onSave) => modal({ title, sub,
    body:`<div class="field"><label>${title}</label><input id="nv" type="number" step="${step||'1'}" value="${val}"></div>`,
    ok:'Save', onOk:()=>{ onSave(+$('#nv').value); save(); renderAdmin(); toast('Saved','ok'); return true; } });

  on('#editRate', ()=>numBox('Transfer rate','US dollars per 100k coins', s.transferRate, '0.01', v=>{ s.transferRate = Math.max(0, v); }));
  on('#editFee',  ()=>numBox('Platform fee','Percentage kept from payouts', s.feePercent, '0.1', v=>{ s.feePercent = Math.max(0,Math.min(50,v)); }));
  on('#editMin',  ()=>numBox('Minimum order','Smallest order accepted (k coins)', s.minOrderK, '1', v=>{ s.minOrderK = Math.max(0,v); }));
  on('#editPs',   ()=>numBox('PlayStation buy rate','You pay suppliers per 100k', s.platforms.ps.take, '0.01', v=>{ s.platforms.ps.take = Math.max(0,v); }));
  on('#editXbox', ()=>numBox('Xbox buy rate','You pay suppliers per 100k', s.platforms.xbox.take, '0.01', v=>{ s.platforms.xbox.take = Math.max(0,v); }));
  on('#editPc',   ()=>numBox('PC buy rate','You pay suppliers per 100k', s.platforms.pc.take, '0.01', v=>{ s.platforms.pc.take = Math.max(0,v); }));
  on('#editSupport',()=>modal({ title:'Support contact', sub:'Shown to signed-in users', body:`<div class="field"><label>Email or handle</label><input id="nv2" value="${esc(s.support)}"></div>`, ok:'Save', onOk:()=>{ s.support=$('#nv2').value.trim(); save(); renderAdmin(); toast('Saved','ok'); return true; } }));
  on('#editNote', ()=>modal({ wide:true, title:'Deposit instructions', sub:'Shown on the Funds page', body:`<div class="field"><textarea id="nv3" rows="4">${esc(s.payoutNote)}</textarea></div>`, ok:'Save', onOk:()=>{ s.payoutNote=$('#nv3').value.trim(); save(); renderAdmin(); toast('Saved','ok'); return true; } }));

  $$('#userRows [data-utog]').forEach(b=>b.onclick=()=>{ const x=DB.users.find(y=>y.id===b.dataset.utog); if(x.id===u.id) return toast("You can't disable your own account",'err'); x.active=!x.active; save(); renderAdmin(); toast('User '+(x.active?'enabled':'disabled'),'ok'); });
  $$('#userRows [data-udel]').forEach(b=>b.onclick=()=>{ const x=DB.users.find(y=>y.id===b.dataset.udel); if(x.id===u.id) return toast("You can't delete your own account",'err'); if(confirm('Delete user "'+x.username+'"?')){ DB.users=DB.users.filter(y=>y.id!==x.id); save(); renderAdmin(); toast('User deleted','ok'); } });
  $$('#userRows [data-uedit]').forEach(b=>b.onclick=()=>userModal(b.dataset.uedit));
  $$('#userRows [data-ufunds]').forEach(b=>b.onclick=()=>{ const x=DB.users.find(y=>y.id===b.dataset.ufunds); modal({ title:'Adjust balance', sub:x.username, body:`<div class="field"><label>Balance ($)</label><input id="bf" type="number" step="0.01" value="${x.balance||0}"></div>`, ok:'Save', onOk:()=>{ x.balance=+$('#bf').value||0; save(); renderAdmin(); renderBalance(); toast('Balance updated','ok'); return true; } }); });
  on('#addUser', ()=>userModal(null));
}

function userModal(id){
  const x = id ? DB.users.find(y=>y.id===id) : null;
  modal({
    title: x ? 'Edit account' : 'Generate account',
    sub:  x ? x.username : 'Create a sign-in for a sender or admin',
    body: `
      <div class="form-grid">
        <div class="field"><label>Display name</label><input id="u_name" value="${esc(x?x.name:'')}" placeholder="Supplier E"></div>
        <div class="field"><label>Username</label><input id="u_user" value="${esc(x?x.username:'')}" placeholder="supplier-e"></div>
        <div class="field"><label>Password</label><input id="u_pass" value="${esc(x?x.password:'')}" placeholder="auto-generated if empty"></div>
        <div class="field"><label>Role</label><select id="u_role">
          <option value="sender" ${x&&x.role==='sender'?'selected':''}>Sender</option>
          <option value="admin" ${x&&x.role==='admin'?'selected':''}>Admin</option>
        </select></div>
      </div>
      <div class="hint" style="margin-top:8px">Sign-in only — there is no public registration. Share these credentials privately.</div>`,
    ok: x ? 'Save account' : 'Generate account',
    onOk: () => {
      const name=$('#u_name').value.trim(), user=$('#u_user').value.trim().toLowerCase();
      let pass=$('#u_pass').value.trim();
      if(!name) return toast('Display name required','err'), false;
      if(!user) return toast('Username required','err'), false;
      if(DB.users.some(y=>y.username===user && y!==x)) return toast('Username already taken','err'), false;
      if(!pass) pass = 'ct-'+Math.random().toString(36).slice(2,10);
      if(x) Object.assign(x,{name,username:user,password:pass,role:$('#u_role').value});
      else DB.users.push({ id:uid('u_'), name, username:user, password:pass, role:$('#u_role').value, active:true, balance:0, created:Date.now() });
      save(); renderAdmin(); toast(`Account saved · password: ${pass}`,'ok');
      return true;
    }
  });
}

/* ================= Modal / theme / wiring ================= */
function modal(opts){
  const ov = $('#overlay');
  ov.innerHTML = `<div class="modal ${opts.wide?'wide':''}" role="dialog">
    <div class="modal-head">
      <div><h3>${esc(opts.title)}</h3>${opts.sub?`<p>${esc(opts.sub)}</p>`:''}</div>
      <button class="modal-x" data-close>${IC.x}</button>
    </div>
    <div class="modal-body">${opts.body||''}</div>
    <div class="modal-foot">
      <button class="btn btn-ghost" data-close>Cancel</button>
      <button class="btn btn-gold" data-ok>${esc(opts.ok||'Save')}</button>
    </div>
  </div>`;
  ov.classList.add('on');
  const close = () => { ov.classList.remove('on'); ov.innerHTML=''; document.removeEventListener('keydown', onKey); };
  const onKey = e => { if(e.key==='Escape') close(); };
  document.addEventListener('keydown', onKey);
  $$('[data-close]', ov).forEach(b=>b.onclick=close);
  $('[data-ok]', ov).onclick = () => { const r = opts.onOk ? opts.onOk() : true; if (r!==false) close(); };
  ov.onclick = e => { if(e.target===ov) close(); };
  setTimeout(()=>{ const f=ov.querySelector('input,select,textarea'); f&&f.focus(); }, 40);
  if (opts.onOpen) setTimeout(opts.onOpen, 30);
}
function closeModal(){ const ov=$('#overlay'); ov.classList.remove('on'); ov.innerHTML=''; }

function setTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('ct.theme', t); $('#themeBtn').innerHTML = t==='dark'?IC.moon:IC.sun; }
function openSidebar(){ $('#sidebar').classList.add('on'); $('#scrim').classList.add('on'); }
function closeSidebar(){ $('#sidebar').classList.remove('on'); $('#scrim').classList.remove('on'); }

function on(sel, fn){ const el=$(sel); if(el) el.onclick=fn; }
function oninput(sel, fn){ const el=$(sel); if(el) el.oninput=fn; }

document.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('ct.theme')||'dark');

  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const r = login($('#loginUser').value, $('#loginPass').value);
    if (!r.ok) { $('#loginErr').textContent = r.msg; return; }
    $('#loginErr').textContent='';
    toast('Welcome back, '+r.user.name,'ok');
    boot();
  });
  on('#seedAdmin', ()=>{ $('#loginUser').value='admin'; $('#loginPass').value='admin123'; toast('Default credentials filled','ok'); });

  on('#themeBtn', ()=> setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
  on('#avatar', ()=>{ const u=currentUser(); if(!u) return; modal({ title:'Account', sub:u.username, body:`
      <div class="kv"><span>Name</span><b>${esc(u.name)}</b></div>
      <div class="kv"><span>Role</span><b>${esc(u.role)}</b></div>
      <div class="kv"><span>Balance</span><b>${money(u.balance||0)}</b></div>
      <div class="kv"><span>Member since</span><b>${fmtTime(u.created)}</b></div>`, ok:'Close', onOk:()=>{} }); });
  on('#logoutBtn', ()=>{ if(confirm('Sign out?')) logout(); });
  on('#hamburger', openSidebar);
  on('#scrim', closeSidebar);

  on('#addSenderBtn', ()=>senderModal(null));
  oninput('#senderSearch', e=>{ sQuery=e.target.value.toLowerCase().trim(); renderSenders(); });
  on('#exportSenders', ()=>exportCsv('senders'));

  on('#addOrderBtn', ()=>orderModal(null));
  oninput('#orderSearch', e=>{ oQuery=e.target.value.toLowerCase().trim(); renderOrders(); });
  on('#exportOrders', ()=>exportCsv('orders'));

  window.addEventListener('hashchange', ()=>{ const p=(location.hash||'').replace('#/',''); if(p && p!==CURRENT) go(p); });
  boot();
});

function exportCsv(what){
  let rows, name;
  if (what==='senders'){
    rows = [['id','account','platform','group','priority','take_k','keep_k','coins','taken','rate','status']]
      .concat(DB.senders.map(x=>[x.id,x.account,x.platform,x.group,x.priority,x.take,x.keep,x.coins,x.taken,x.rate,x.status]));
    name='senders.csv';
  } else {
    rows = [['id','receiver','platform','amount','delivered','payout','status','created']]
      .concat(DB.orders.map(o=>[o.id,o.receiver,o.platform,o.amount,o.delivered||0,per100k(o.delivered||0).toFixed(2),o.status,fmtTime(o.when)]));
    name='orders.csv';
  }
  const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=name; a.click();
  toast('Exported '+name,'ok');
}

})();
