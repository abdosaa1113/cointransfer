
/* ============================================================
   CoinTransfer — Admin Console logic
   Vanilla JS, localStorage persistence, hash router
   ============================================================ */
(() => {
'use strict';

/* ---------------- Icons (inline SVG) ---------------- */
const IC = {
  dash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3"/><path d="m17 5 3 3"/><path d="m14 8 3 3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>'
};

/* ---------------- Store ---------------- */
const LS = 'cointransfer.v1';
const defaultSettings = {
  brand: 'CoinTransfer',
  support: 'support@cointransfer.io',
  feePercent: 10,
  minOrderK: 100,
  usdt: {
    trc20: { addr: '', on: true,  label: 'USDT · TRON (TRC20)' },
    erc20: { addr: '', on: false, label: 'USDT · Ethereum (ERC20)' },
    bep20: { addr: '', on: false, label: 'USDT · BNB Chain (BEP20)' }
  },
  payoutNote: 'Send the exact amount and include your Order ID in the memo. Transfers confirm within 5–15 minutes.',
  platforms: { ps: { on:true, take: 4.50 }, xbox:{ on:true, take: 4.50 }, pc:{ on:true, take: 4.50 } }
};
const defaultUsers = [
  { id:'u_admin', username:'admin', password:'admin123', name:'Administrator', role:'admin', active:true, created: Date.now() }
];
const defaultSenders = [
  { id:'S-001', label:'Supplier A', account:'range-a@cointransfer', platform:'ps',   stock: 2450000, taken: 320000, group:'Alpha', priority:1, status:'active',  take:0,   keep:0,    createdAt: Date.now()-86400000*12 },
  { id:'S-002', label:'Supplier B', account:'range-b@cointransfer', platform:'xbox', stock: 1180000, taken: 145000, group:'Alpha', priority:2, status:'active',  take:0,   keep:0,    createdAt: Date.now()-86400000*9 },
  { id:'S-003', label:'Supplier C', account:'range-c@cointransfer', platform:'pc',   stock: 760000,  taken: 240000, group:'Beta',  priority:1, status:'disabled',take:50000,keep:10000, createdAt: Date.now()-86400000*6 },
  { id:'S-004', label:'Supplier D', account:'range-d@cointransfer', platform:'ps',   stock: 3400000, taken: 610000, group:'Beta',  priority:3, status:'active',  take:0,   keep:20000, createdAt: Date.now()-86400000*3 }
];
const defaultOrders = [
  { id:'ORD-10241', client:'Client 001', platform:'ps',   amount: 500000, price: 6.90, status:'done',       network:'trc20', sent: 500000, when: Date.now()-3600e3*26 },
  { id:'ORD-10242', client:'Client 002', platform:'xbox', amount: 1000000,price: 7.20, status:'processing', network:'trc20', sent: 350000, when: Date.now()-3600e3*4 },
  { id:'ORD-10243', client:'Client 003', platform:'pc',   amount: 250000, price: 6.50, status:'pending',    network:'erc20', sent: 0,      when: Date.now()-3600e3*2 },
  { id:'ORD-10244', client:'Client 004', platform:'ps',   amount: 750000, price: 6.75, status:'pending',    network:'trc20', sent: 0,      when: Date.now()-3600e3*1 }
];

let DB = load();
function load(){
  try {
    const raw = localStorage.getItem(LS);
    if (raw) { const d = JSON.parse(raw); return Object.assign({settings:defaultSettings, users:defaultUsers, senders:defaultSenders, orders:defaultOrders}, d); }
  } catch(e){}
  return { settings: JSON.parse(JSON.stringify(defaultSettings)), users: JSON.parse(JSON.stringify(defaultUsers)), senders: JSON.parse(JSON.stringify(defaultSenders)), orders: JSON.parse(JSON.stringify(defaultOrders)), session:null };
}
function save(){ try { localStorage.setItem(LS, JSON.stringify(DB)); } catch(e){} }

/* ---------------- Helpers ---------------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const K = n => { n = Number(n)||0; if (n>=1e6) return (n/1e6).toFixed(n%1e6?2:0)+'M'; if (n>=1e3) return (n/1e3).toFixed(n%1e3?1:0)+'k'; return String(n); };
const money = n => '$' + (Number(n)||0).toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2});
const num = n => (Number(n)||0).toLocaleString('en-US');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = p => p + Math.random().toString(36).slice(2,9);
function fmtTime(ts){ const d=new Date(ts); const p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
function ago(ts){ const s=(Date.now()-ts)/1000; if(s<60)return 'just now'; if(s<3600)return Math.floor(s/60)+'m ago'; if(s<86400)return Math.floor(s/3600)+'h ago'; return Math.floor(s/86400)+'d ago'; }
function toast(msg, kind){ const t=document.createElement('div'); t.className='toast '+(kind||''); t.textContent=msg; $('#toasts').appendChild(t); setTimeout(()=>{ t.style.transition='opacity .3s, transform .3s'; t.style.opacity='0'; t.style.transform='translateX(24px)'; setTimeout(()=>t.remove(),320); }, 2600); }
function copy(txt){ navigator.clipboard?.writeText(txt).then(()=>toast('Copied to clipboard','ok')).catch(()=>toast('Copy failed','err')); }

/* ---------------- Auth ---------------- */
function login(u, p){
  const user = DB.users.find(x => x.username.toLowerCase() === String(u).toLowerCase().trim() && x.password === p);
  if (!user) return { ok:false, msg:'Invalid username or password.' };
  if (!user.active) return { ok:false, msg:'This account has been deactivated. Contact the administrator.' };
  DB.session = { userId: user.id, at: Date.now() };
  save();
  return { ok:true, user };
}
function logout(){ DB.session=null; save(); location.hash=''; boot(); }
function currentUser(){ if(!DB.session) return null; return DB.users.find(u=>u.id===DB.session.userId)||null; }

/* ---------------- Render: shell ---------------- */
const NAV = [
  { id:'senders', label:'Senders',   icon:IC.users,  sol:false },
  { id:'orders',  label:'Orders',    icon:IC.cart,   sol:false },
  { id:'admin',   label:'Admin',     icon:IC.gear,   sol:true  }
];

function boot(){
  const user = currentUser();
  $('#loginScreen').style.display = user ? 'none' : 'flex';
  $('#app').classList.toggle('on', !!user);
  if (!user) { $('#loginForm') && ($('#loginForm').reset()); return; }
  // identity
  $('#avatar').textContent = (user.name||user.username).charAt(0).toUpperCase();
  $('#avatar').title = user.name + ' · ' + user.username;
  // nav
  $('#nav').innerHTML = NAV.map(n => {
    if (n.sol && user.role!=='admin') return '';
    const badge = n.id==='orders' ? `<span class="nav-badge">${DB.orders.filter(o=>o.status!=='done').length}</span>` : '';
    return `<div class="nav-item" data-page="${n.id}">${n.icon}<span>${n.label}</span>${badge}</div>`;
  }).join('');
  $$('#nav .nav-item').forEach(el => el.onclick = () => { go(el.dataset.page); closeSidebar(); });
  renderBalance();
  const start = (location.hash||'').replace('#/','') || 'senders';
  go(NAV.some(n=>n.id===start) ? start : 'senders');
}

function renderBalance(){
  // wallet = pending payouts (admin) summed from orders net
  const s = DB.settings;
  let gross=0;
  DB.orders.forEach(o=>{ if(o.status!=='pending') gross += (o.amount/100000)*o.price; });
  const fee = gross * (s.feePercent/100);
  $('#balance').textContent = money(fee);
  $('#balance').title = 'Platform fees earned';
}

let CURRENT='senders';
function go(page){
  CURRENT = page;
  $$('#nav .nav-item').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  $$('.page').forEach(el => el.classList.toggle('on', el.id==='page-'+page));
  const titles = { senders:['Senders','Coin-holding supplier accounts'], orders:['Orders','Client coin orders & delivery'], admin:['Admin','Payments, users & platform control'] };
  const t = titles[page] || ['CoinTransfer',''];
  $('#pageTitle').innerHTML = `${t[0]}<small>${t[1]}</small>`;
  if (location.hash !== '#/'+page) history.replaceState(null,'','#/'+page);
  if (page==='senders') renderSenders();
  if (page==='orders')  renderOrders();
  if (page==='admin')   renderAdmin();
}

/* ---------------- Page: Senders ---------------- */
let senderQuery='';
function renderSenders(){
  const s = DB.settings;
  const senders = DB.senders;
  const totStock = senders.reduce((a,x)=>a+x.stock,0);
  const totTaken = senders.reduce((a,x)=>a+x.taken,0);
  const active = senders.filter(x=>x.status==='active').length;

  $('#stats').innerHTML = `
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.coin}</div><div class="stat-name">Total Stock</div></div>
      <div class="stat-val">${num(totStock/1000|0)}<small> k</small></div>
      <div class="stat-sub">${active} of ${senders.length} accounts active</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.chart}</div><div class="stat-name">Coins Taken</div></div>
      <div class="stat-val">${num(totTaken/1000|0)}<small> k</small></div>
      <div class="stat-sub">across all suppliers</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.wallet}</div><div class="stat-name">Buy Rate</div></div>
      <div class="stat-val">${money(s.platforms.ps.take*10)}<small> /M</small></div>
      <div class="stat-sub">avg supplier payout per 1M</div>
    </div>`;

  const list = senders.filter(x => !senderQuery || (x.label+' '+x.account+' '+x.group+' '+x.platform).toLowerCase().includes(senderQuery));

  $('#senderRows').innerHTML = list.length ? list.map(s2 => `
    <tr>
      <td><span class="batch">#${esc(s2.id)}</span></td>
      <td><b>${esc(s2.label)}</b></td>
      <td><span class="plat">${platIcon(s2.platform)}${platName(s2.platform)}</span></td>
      <td class="mono">${esc(s2.account)}</td>
      <td>${esc(s2.group)}</td>
      <td>${num(s2.stock)}</td>
      <td>${num(s2.taken)}</td>
      <td><span class="badge ${s2.status==='active'?'on':'off'}">${s2.status==='active'?'Active':'Disabled'}</span></td>
      <td>
        <div class="td-actions">
          <button class="btn btn-ghost btn-sm" data-edit="${s2.id}">${IC.edit}</button>
          <button class="btn btn-danger btn-sm" data-del="${s2.id}">${IC.trash}</button>
        </div>
      </td>
    </tr>`).join('') : `<tr><td colspan="9"><div class="empty">${IC.inbox}<div>No suppliers yet. Add your first one.</div></div></td></tr>`;

  $$('#senderRows [data-edit]').forEach(b => b.onclick = () => senderModal(b.dataset.edit));
  $$('#senderRows [data-del]').forEach(b => b.onclick = () => { if(confirm('Delete this supplier?')){ DB.senders=DB.senders.filter(x=>x.id!==b.dataset.del); save(); renderSenders(); toast('Supplier removed','ok'); } });
}
function platIcon(p){
  const m = { ps:'./ps-light.png', xbox:'./xbox.png', pc:'./origin.png' };
  return `<img src="${m[p]||m.ps}" alt="">`;
}
function platName(p){ return p==='xbox'?'Xbox':p==='pc'?'PC':'PlayStation'; }

function senderModal(id){
  const s = id ? DB.senders.find(x=>x.id===id) : null;
  const m = modal({
    title: s?'Edit supplier':'Add supplier',
    sub:  s?'Update supplier details & stock':'Register a coin-holding account',
    body: `
      <div class="form-grid">
        <div class="field"><label>Supplier label</label><input id="f_label" value="${esc(s?s.label:'')}" placeholder="e.g. Supplier E"></div>
        <div class="field"><label>Platform</label><select id="f_platform">
          <option value="ps" ${s&&s.platform==='ps'?'selected':''}>PlayStation</option>
          <option value="xbox" ${s&&s.platform==='xbox'?'selected':''}>Xbox</option>
          <option value="pc" ${s&&s.platform==='pc'?'selected':''}>PC</option>
        </select></div>
        <div class="field full"><label>Account reference</label><input id="f_account" value="${esc(s?s.account:'')}" placeholder="range-x@cointransfer"><div class="hint">Internal handle for the sender account (no real credentials stored).</div></div>
        <div class="field"><label>Stock (coins)</label><input id="f_stock" type="number" value="${s?s.stock:0}" min="0"></div>
        <div class="field"><label>Coins taken</label><input id="f_taken" type="number" value="${s?s.taken:0}" min="0"></div>
        <div class="field"><label>Group</label><input id="f_group" value="${esc(s?s.group:'Alpha')}"></div>
        <div class="field"><label>Priority</label><input id="f_priority" type="number" value="${s?s.priority:1}" min="0"></div>
        <div class="field"><label>Amount to take</label><input id="f_take" type="number" value="${s?s.take:0}" min="0"><div class="hint">0 = unlimited</div></div>
        <div class="field"><label>Amount to keep</label><input id="f_keep" type="number" value="${s?s.keep:0}" min="0"></div>
        <div class="field full"><label>Buy rate — $ per 1M taken</label><input id="f_rate" type="number" step="0.01" value="${s&&s.rate?s.rate:(DB.settings.platforms[s?s.platform:'ps'].take*10).toFixed(2)}"></div>
        <div class="field full"><label class="check"><input id="f_active" type="checkbox" ${!s||s.status==='active'?'checked':''}> Account active</label></div>
      </div>`,
    ok: 'Save supplier',
    onOk: () => {
      const label = $('#f_label').value.trim();
      if (!label) return toast('Supplier label is required','err'), false;
      const data = {
        label,
        platform: $('#f_platform').value,
        account: $('#f_account').value.trim() || (label.toLowerCase().replace(/\s+/g,'-')+'@cointransfer'),
        stock: +$('#f_stock').value||0,
        taken: +$('#f_taken').value||0,
        group: $('#f_group').value.trim()||'Alpha',
        priority: +$('#f_priority').value||0,
        take: +$('#f_take').value||0,
        keep: +$('#f_keep').value||0,
        rate: +$('#f_rate').value||0,
        status: $('#f_active').checked ? 'active':'disabled'
      };
      if (s) Object.assign(s, data);
      else { const nums = DB.senders.map(x=>parseInt(String(x.id).replace(/\D/g,''),10)).filter(n=>!isNaN(n)); const n=(nums.length?Math.max(...nums):0)+1; DB.senders.push(Object.assign({ id:'S-'+String(n).padStart(3,'0'), createdAt:Date.now() }, data)); }
      save(); renderSenders(); toast(s?'Supplier updated':'Supplier added','ok');
      return true;
    }
  });
}

/* ---------------- Page: Orders ---------------- */
let orderQuery='', orderFilter='all';
function renderOrders(){
  const all = DB.orders.slice().sort((a,b)=>b.when-a.when);
  const counts = { all:all.length, pending:0, processing:0, done:0 };
  all.forEach(o=>{ if(counts[o.status]!=null) counts[o.status]++; });
  const gross = all.filter(o=>o.status!=='pending').reduce((a,o)=>a+o.amount/1e5*o.price,0);

  $('#orderStats').innerHTML = `
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.cart}</div><div class="stat-name">Total Orders</div></div>
      <div class="stat-val">${counts.all}</div>
      <div class="stat-sub">${counts.pending} awaiting delivery</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.chart}</div><div class="stat-name">Gross Volume</div></div>
      <div class="stat-val">${money(gross)}</div>
      <div class="stat-sub">completed + in progress</div>
    </div>
    <div class="card stat-card">
      <div class="stat-top"><div class="stat-icon">${IC.wallet}</div><div class="stat-name">Platform Fees</div></div>
      <div class="stat-val">${money(gross*DB.settings.feePercent/100)}</div>
      <div class="stat-sub">at ${DB.settings.feePercent}% fee</div>
    </div>`;

  $$('#orderTabs .tab').forEach(t => t.classList.toggle('active', t.dataset.f===orderFilter));
  const list = all.filter(o => (orderFilter==='all'||o.status===orderFilter)
      && (!orderQuery || (o.id+' '+o.client+' '+o.platform).toLowerCase().includes(orderQuery)));

  $('#orderRows').innerHTML = list.length ? list.map(o => {
    const total = o.amount/1e5*o.price;
    const pct = o.amount? Math.min(100, Math.round(o.sent/o.amount*100)) : 0;
    return `<tr>
      <td class="mono"><b>${esc(o.id)}</b></td>
      <td>${esc(o.client)}</td>
      <td><span class="plat">${platIcon(o.platform)}${platName(o.platform)}</span></td>
      <td>${num(o.amount)}</td>
      <td>${money(o.price)}</td>
      <td><b>${money(total)}</b></td>
      <td><div class="sandtrack"><span style="width:${pct}%"></span></div><small style="color:var(--dim)">${pct}%</small></td>
      <td><span class="tag">${esc((DB.settings.usdt[o.network]||{}).label||o.network.toUpperCase())}</span></td>
      <td><span class="badge ${o.status==='done'?'done':o.status==='pending'?'pending':o.status==='fail'?'fail':'part'}">${o.status}</span></td>
      <td>
        <div class="td-actions">
          <button class="btn btn-ghost btn-sm" data-adv="${o.id}" title="Advance status">${IC.check}</button>
          <button class="btn btn-ghost btn-sm" data-edito="${o.id}">${IC.edit}</button>
          <button class="btn btn-danger btn-sm" data-delo="${o.id}">${IC.trash}</button>
        </div>
      </td>
    </tr>`;
  }).join('') : `<tr><td colspan="10"><div class="empty">${IC.inbox}<div>No orders match this view.</div></div></td></tr>`;

  $$('#orderRows [data-adv]').forEach(b => b.onclick = () => {
    const o = DB.orders.find(x=>x.id===b.dataset.adv);
    const flow = ['pending','processing','done'];
    const i = flow.indexOf(o.status);
    o.status = flow[(i+1)%flow.length];
    if (o.status==='done') o.sent = o.amount;
    if (o.status==='processing' && !o.sent) o.sent = Math.round(o.amount*0.35);
    save(); renderOrders(); renderBalance(); toast(`${o.id} → ${o.status}`,'ok');
  });
  $$('#orderRows [data-edito]').forEach(b => b.onclick = () => orderModal(b.dataset.edito));
  $$('#orderRows [data-delo]').forEach(b => b.onclick = () => { if(confirm('Delete this order?')){ DB.orders=DB.orders.filter(x=>x.id!==b.dataset.delo); save(); renderOrders(); renderBalance(); toast('Order removed','ok'); } });
}

function orderModal(id){
  const o = id ? DB.orders.find(x=>x.id===id) : null;
  const s = DB.settings;
  modal({
    title: o?'Edit order':'New order',
    sub: o? o.id : 'Log a client coin order',
    body: `
      <div class="form-grid">
        <div class="field"><label>Order ID</label><input id="o_id" value="${esc(o?o.id:'ORD-'+Math.floor(10000+Math.random()*89999))}"></div>
        <div class="field"><label>Client</label><input id="o_client" value="${esc(o?o.client:'')}" placeholder="Client 005"></div>
        <div class="field"><label>Platform</label><select id="o_platform">
          <option value="ps" ${o&&o.platform==='ps'?'selected':''}>PlayStation</option>
          <option value="xbox" ${o&&o.platform==='xbox'?'selected':''}>Xbox</option>
          <option value="pc" ${o&&o.platform==='pc'?'selected':''}>PC</option>
        </select></div>
        <div class="field"><label>Coins ordered</label><input id="o_amount" type="number" value="${o?o.amount:500000}"></div>
        <div class="field"><label>Price $ / 100k</label><input id="o_price" type="number" step="0.01" value="${o?o.price:6.90}"></div>
        <div class="field"><label>Coins delivered</label><input id="o_sent" type="number" value="${o?o.sent:0}"></div>
        <div class="field"><label>Payment network</label><select id="o_network">
          <option value="trc20" ${o&&o.network==='trc20'?'selected':''}>USDT TRC20</option>
          <option value="erc20" ${o&&o.network==='erc20'?'selected':''}>USDT ERC20</option>
          <option value="bep20" ${o&&o.network==='bep20'?'selected':''}>USDT BEP20</option>
        </select></div>
        <div class="field"><label>Status</label><select id="o_status">
          ${['pending','processing','done'].map(st=>`<option value="${st}" ${o&&o.status===st?'selected':''}>${st}</option>`).join('')}
        </select></div>
      </div>`,
    ok: o?'Save order':'Create order',
    onOk: () => {
      const id2 = $('#o_id').value.trim();
      if(!id2) return toast('Order ID required','err'), false;
      if(!o && DB.orders.some(x=>x.id===id2)) return toast('Order ID already exists','err'), false;
      const data = { id:id2, client:$('#o_client').value.trim()||'Client', platform:$('#o_platform').value,
        amount:+$('#o_amount').value||0, price:+$('#o_price').value||0, sent:+$('#o_sent').value||0,
        network:$('#o_network').value, status:$('#o_status').value, when: o?o.when:Date.now() };
      if (o) Object.assign(o, data); else DB.orders.push(data);
      save(); renderOrders(); renderBalance(); toast(o?'Order updated':'Order created','ok');
      return true;
    }
  });
}

/* ---------------- Page: Admin ---------------- */
function renderAdmin(){
  const s = DB.settings;
  const net = (key, n) => `
    <div class="net-card ${n.on?'on':''}" data-net="${key}">
      <div class="net-head">
        <div>
          <b>${esc(n.label)}</b>
          <div class="hint">${key==='trc20'?'Lowest fees · recommended':key==='erc20'?'Ethereum mainnet · higher gas':'BNB Smart Chain · low fees'}</div>
        </div>
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

  $('#adminNetworks').innerHTML = net('trc20', s.usdt.trc20) + net('erc20', s.usdt.erc20) + net('bep20', s.usdt.bep20);

  $('#adminConfig').innerHTML = `
    <div class="kv"><span>Platform fee</span><b>${s.feePercent}%</b> <button class="btn btn-ghost btn-sm" id="editFee">Change</button></div>
    <div class="kv"><span>Minimum order</span><b>${num(s.minOrderK)}k</b> <button class="btn btn-ghost btn-sm" id="editMin">Change</button></div>
    <div class="kv"><span>Support contact</span><b>${esc(s.support)}</b> <button class="btn btn-ghost btn-sm" id="editSupport">Change</button></div>
    <div class="kv"><span>Payout instructions</span><b style="max-width:52%;text-align:right;font-weight:500;color:var(--muted)">${esc(s.payoutNote)}</b></div>
    <div class="row-actions" style="margin-top:14px"><button class="btn btn-gold btn-sm" id="editPayout">Edit payout instructions</button></div>`;

  $('#userRows').innerHTML = DB.users.map(u => `
    <tr>
      <td><b>${esc(u.name)}</b></td>
      <td class="mono">${esc(u.username)}</td>
      <td><span class="badge ${u.role==='admin'?'pending':'on'}">${u.role}</span></td>
      <td><span class="badge ${u.active?'on':'off'}">${u.active?'Active':'Disabled'}</span></td>
      <td>${fmtTime(u.created)}</td>
      <td><div class="td-actions">
        <button class="btn btn-ghost btn-sm" data-uedit="${u.id}">${IC.edit}</button>
        <button class="btn ${u.active?'btn-danger':'btn-success'} btn-sm" data-utog="${u.id}">${u.active?'Disable':'Enable'}</button>
        ${u.role!=='admin'||DB.users.filter(x=>x.role==='admin').length>1?`<button class="btn btn-danger btn-sm" data-udel="${u.id}">${IC.trash}</button>`:''}
      </div></td>
    </tr>`).join('');

  $$('#adminNetworks [data-copy]').forEach(b => b.onclick = () => copy(b.dataset.copy));
  $$('#adminNetworks [data-toggle]').forEach(b => b.onclick = () => { const k=b.dataset.toggle; DB.settings.usdt[k].on=!DB.settings.usdt[k].on; save(); renderAdmin(); toast('Network '+(DB.settings.usdt[k].on?'enabled':'disabled'),'ok'); });
  $$('#adminNetworks [data-setaddr]').forEach(b => b.onclick = () => {
    const k=b.dataset.setaddr, n=DB.settings.usdt[k];
    modal({ title:'Set '+n.label+' address', sub:'Paste your receive address for this network',
      body:`<div class="field"><label>USDT address (${k.toUpperCase()})</label><input id="a_addr" value="${esc(n.addr)}" placeholder="${k==='trc20'?'T...':k==='erc20'?'0x...':k==='bep20'?'0x...':''}"><div class="hint">Double-check the network. Coins sent to a mismatched network are unrecoverable.</div></div>`,
      ok:'Save address', onOk:()=>{ DB.settings.usdt[k].addr=$('#a_addr').value.trim(); save(); renderAdmin(); toast('Address saved','ok'); return true; } });
  });
  $('#editFee') && ($('#editFee').onclick = () => modal({ title:'Platform fee', sub:'Percentage retained from each order',
    body:`<div class="field"><label>Fee %</label><input id="c_fee" type="number" step="0.1" value="${s.feePercent}"></div>`, ok:'Save',
    onOk:()=>{ s.feePercent=Math.max(0,Math.min(50,+$('#c_fee').value||0)); save(); renderAdmin(); renderBalance(); toast('Fee updated','ok'); return true; } }));
  $('#editMin') && ($('#editMin').onclick = () => modal({ title:'Minimum order', sub:'Smallest order the platform accepts',
    body:`<div class="field"><label>Minimum (k coins)</label><input id="c_min" type="number" value="${s.minOrderK}"></div>`, ok:'Save',
    onOk:()=>{ s.minOrderK=Math.max(0,+$('#c_min').value||0); save(); renderAdmin(); toast('Minimum updated','ok'); return true; } }));
  $('#editSupport') && ($('#editSupport').onclick = () => modal({ title:'Support contact', sub:'Shown to sign-in accounts',
    body:`<div class="field"><label>Email or handle</label><input id="c_sup" value="${esc(s.support)}"></div>`, ok:'Save',
    onOk:()=>{ s.support=$('#c_sup').value.trim(); save(); renderAdmin(); toast('Support contact saved','ok'); return true; } }));
  $('#editPayout') && ($('#editPayout').onclick = () => modal({ wide:true, title:'Payout instructions', sub:'Shown on the client order page',
    body:`<div class="field"><textarea id="c_note" rows="4">${esc(s.payoutNote)}</textarea></div>`, ok:'Save',
    onOk:()=>{ s.payoutNote=$('#c_note').value.trim(); save(); renderAdmin(); toast('Instructions saved','ok'); return true; } }));

  $$('#userRows [data-utog]').forEach(b=>b.onclick=()=>{ const u=DB.users.find(x=>x.id===b.dataset.utog); if(u.id===currentUser().id) return toast("You can't disable your own account",'err'); u.active=!u.active; save(); renderAdmin(); toast('User '+(u.active?'enabled':'disabled'),'ok'); });
  $$('#userRows [data-udel]').forEach(b=>b.onclick=()=>{ const u=DB.users.find(x=>x.id===b.dataset.udel); if(u.id===currentUser().id) return toast("You can't delete your own account",'err'); if(confirm('Delete user "'+u.username+'"?')){ DB.users=DB.users.filter(x=>x.id!==u.id); save(); renderAdmin(); toast('User deleted','ok'); } });
  $$('#userRows [data-uedit]').forEach(b=>b.onclick=()=>userModal(b.dataset.uedit));
  $('#addUser').onclick = () => userModal(null);
}

function userModal(id){
  const u = id? DB.users.find(x=>x.id===id):null;
  modal({
    title: u?'Edit account':'Generate account',
    sub: u? u.username : 'Create a sign-in for a sender or admin',
    body: `
      <div class="form-grid">
        <div class="field"><label>Display name</label><input id="u_name" value="${esc(u?u.name:'')}" placeholder="Supplier E"></div>
        <div class="field"><label>Username</label><input id="u_user" value="${esc(u?u.username:'')}" placeholder="supplier-e"></div>
        <div class="field"><label>Password</label><input id="u_pass" value="${esc(u?u.password:'')}" placeholder="auto-generated if empty"></div>
        <div class="field"><label>Role</label><select id="u_role">
          <option value="sender" ${u&&u.role==='sender'?'selected':''}>Sender</option>
          <option value="admin" ${u&&u.role==='admin'?'selected':''}>Admin</option>
        </select></div>
      </div>
      <div class="hint" style="margin-top:8px">Sign-in only — there is no public registration. Share these credentials privately.</div>`,
    ok: u?'Save account':'Generate account',
    onOk: () => {
      const name=$('#u_name').value.trim(), user=$('#u_user').value.trim().toLowerCase();
      let pass=$('#u_pass').value.trim();
      if(!name) return toast('Display name required','err'), false;
      if(!user) return toast('Username required','err'), false;
      if(DB.users.some(x=>x.username===user && x!==u)) return toast('Username already taken','err'), false;
      if(!pass) pass = 'ct-'+Math.random().toString(36).slice(2,10);
      if(u){ Object.assign(u,{name,username:user,password:pass,role:$('#u_role').value}); }
      else DB.users.push({ id:uid('u_'), name, username:user, password:pass, role:$('#u_role').value, active:true, created:Date.now() });
      save(); renderAdmin(); toast(`Account saved · password: ${pass}`,'ok');
      return true;
    }
  });
}

/* ---------------- Modal system ---------------- */
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
  $('[data-ok]', ov).onclick = () => { const r=opts.onOk?opts.onOk():true; if(r!==false) close(); };
  ov.onclick = e => { if(e.target===ov) close(); };
  setTimeout(()=>{ const f=ov.querySelector('input,select,textarea'); f&&f.focus(); }, 40);
}

/* ---------------- Theme ---------------- */
function setTheme(t){ document.documentElement.setAttribute('data-theme', t); localStorage.setItem('ct.theme', t); $('#themeBtn').innerHTML = t==='dark'?IC.moon:IC.sun; }
function initTheme(){ setTheme(localStorage.getItem('ct.theme')||'dark'); }

/* ---------------- Sidebar (mobile) ---------------- */
function openSidebar(){ $('#sidebar').classList.add('on'); $('#scrim').classList.add('on'); }
function closeSidebar(){ $('#sidebar').classList.remove('on'); $('#scrim').classList.remove('on'); }

/* ---------------- Wire up ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  const on      = (sel, fn) => { const el = $(sel); if (el) el.onclick = fn; };
  const oninput = (sel, fn) => { const el = $(sel); if (el) el.oninput = fn; };
  initTheme();

  // login
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const r = login($('#loginUser').value, $('#loginPass').value);
    if (!r.ok) { $('#loginErr').textContent = r.msg; return; }
    $('#loginErr').textContent='';
    toast('Welcome back, '+r.user.name,'ok');
    boot();
  });
  on('#seedAdmin', () => { $('#loginUser').value='admin'; $('#loginPass').value='admin123'; toast('Default credentials filled','ok'); });

  // header
  on('#themeBtn', () => setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
  on('#avatar', () => {
    const u = currentUser(); if(!u) return;
    modal({ title:'Account', sub:u.username, body:`
      <div class="kv"><span>Name</span><b>${esc(u.name)}</b></div>
      <div class="kv"><span>Role</span><b>${esc(u.role)}</b></div>
      <div class="kv"><span>Member since</span><b>${fmtTime(u.created)}</b></div>`,
      ok:'Close', onOk:()=>{} });
  });
  on('#logoutBtn', () => { if(confirm('Sign out?')) logout(); });
  on('#hamburger', openSidebar);
  on('#scrim', closeSidebar);

  // senders toolbar
  on('#addSenderBtn', () => senderModal(null));
  oninput('#senderSearch', e => { senderQuery = e.target.value.toLowerCase().trim(); renderSenders(); });
  on('#exportSenders', () => exportCsv('senders'));
  // orders toolbar
  on('#addOrderBtn', () => orderModal(null));
  oninput('#orderSearch', e => { orderQuery = e.target.value.toLowerCase().trim(); renderOrders(); });
  $$('#orderTabs .tab').forEach(t => t.onclick = () => { orderFilter=t.dataset.f; renderOrders(); });
  on('#exportOrders', () => exportCsv('orders'));

  window.addEventListener('hashchange', () => { const p=(location.hash||'').replace('#/',''); if(p && p!==CURRENT) go(p); });

  boot();
});

/* ---------------- CSV export ---------------- */
function exportCsv(what){
  let rows, name;
  if (what==='senders'){
    rows = [['id','label','platform','account','group','priority','stock','taken','take','keep','status']]
      .concat(DB.senders.map(s=>[s.id,s.label,s.platform,s.account,s.group,s.priority,s.stock,s.taken,s.take,s.keep,s.status]));
    name='senders.csv';
  } else {
    rows = [['id','client','platform','amount','price_per_100k','total_usd','sent','network','status','created']]
      .concat(DB.orders.map(o=>[o.id,o.client,o.platform,o.amount,o.price,(o.amount/1e5*o.price).toFixed(2),o.sent,o.network,o.status,fmtTime(o.when)]));
    name='orders.csv';
  }
  const csv = rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click();
  toast('Exported '+name,'ok');
}

})();
