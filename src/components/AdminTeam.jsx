import React, { useState, useEffect } from 'react';
import { Icon } from './Icons';
import { formatUZS } from '../utils/formatters';

/* ------------------------------------------------------------------ */
/*  Default data                                                       */
/* ------------------------------------------------------------------ */

export const defaultStaff = [
  { id: 's1', name: 'Rustam Karimov', role: 'Bosh oshpaz', phone: '+998 90 111 22 33', branch: 'Chilonzor', shift: '08:00 – 20:00', salary: 9500000, status: 'active', avatar: '👨‍🍳' },
  { id: 's2', name: 'Dilnoza Yusupova', role: 'Menejer', phone: '+998 91 222 33 44', branch: 'Markaz', shift: '09:00 – 18:00', salary: 8000000, status: 'active', avatar: '👩‍💼' },
  { id: 's3', name: 'Bekzod Tursunov', role: 'Oshpaz', phone: '+998 93 333 44 55', branch: 'Yunusobod', shift: '14:00 – 02:00', salary: 6500000, status: 'active', avatar: '👨‍🍳' },
  { id: 's4', name: 'Madina Rahimova', role: 'Kassir', phone: '+998 94 444 55 66', branch: 'Chilonzor', shift: '10:00 – 22:00', salary: 4800000, status: 'break', avatar: '👩‍💻' },
  { id: 's5', name: 'Sardor Aliyev', role: 'Ofitsiant', phone: '+998 97 555 66 77', branch: 'Markaz', shift: '12:00 – 00:00', salary: 4200000, status: 'active', avatar: '🧑‍🍳' },
  { id: 's6', name: 'Gulnora Saidova', role: 'Tozalik xodimi', phone: '+998 99 666 77 88', branch: 'Yunusobod', shift: '07:00 – 16:00', salary: 3500000, status: 'off', avatar: '🧹' }
];

export const defaultCouriers = [
  { id: 'c1', name: 'Jasur Ergashev', phone: '+998 90 700 10 01', transport: 'moto', plate: '01 A 777 AA', zone: 'Chilonzor, Sergeli', baseFee: 12000, perKm: 2000, rating: 4.9, deliveriesToday: 18, status: 'online' },
  { id: 'c2', name: 'Otabek Nazarov', phone: '+998 91 700 20 02', transport: 'avto', plate: '01 B 123 BC', zone: 'Yunusobod, Mirzo Ulug\'bek', baseFee: 15000, perKm: 2500, rating: 4.8, deliveriesToday: 14, status: 'delivering' },
  { id: 'c3', name: 'Shoxrux Qodirov', phone: '+998 93 700 30 03', transport: 'velo', plate: '—', zone: 'Markaz, Mirobod', baseFee: 8000, perKm: 1500, rating: 4.7, deliveriesToday: 22, status: 'online' },
  { id: 'c4', name: 'Aziz Hamidov', phone: '+998 94 700 40 04', transport: 'moto', plate: '01 C 450 CD', zone: 'Yakkasaroy, Shayxontohur', baseFee: 12000, perKm: 2000, rating: 4.6, deliveriesToday: 11, status: 'delivering' },
  { id: 'c5', name: 'Nodir Usmonov', phone: '+998 97 700 50 05', transport: 'avto', plate: '01 D 909 DE', zone: 'Olmazor, Uchtepa', baseFee: 15000, perKm: 2500, rating: 4.9, deliveriesToday: 9, status: 'offline' }
];

export const transportMeta = {
  velo: { label: 'Velosiped', icon: '🚲', color: 'from-emerald-500 to-teal-500' },
  moto: { label: 'Mototsikl', icon: '🛵', color: 'from-amber-500 to-orange-500' },
  avto: { label: 'Avtomobil', icon: '🚗', color: 'from-sky-500 to-indigo-500' }
};

const courierStatusMeta = {
  online: { label: 'Bo\'sh • Onlayn', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300', dot: 'bg-emerald-500' },
  delivering: { label: 'Yetkazmoqda', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300', dot: 'bg-amber-500' },
  offline: { label: 'Oflayn', cls: 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400', dot: 'bg-gray-400' }
};

const staffStatusMeta = {
  active: { label: 'Ishda', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  break: { label: 'Tanaffusda', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  off: { label: 'Dam olishda', cls: 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400' }
};

const staffRoles = ['Bosh oshpaz', 'Oshpaz', 'Menejer', 'Kassir', 'Ofitsiant', 'Tozalik xodimi', 'Qadoqlovchi'];
const branchList = ['Chilonzor', 'Markaz', 'Yunusobod', 'Sergeli', 'Mirzo Ulug\'bek'];

/* ------------------------------------------------------------------ */
/*  Persisted state hook                                               */
/* ------------------------------------------------------------------ */

export const usePersistedList = (key, fallback) => {
  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return fallback;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [key, list]);
  return [list, setList];
};

export const calcDeliveryPrice = (courier, km) => {
  const distance = Math.max(0, Number(km) || 0);
  const included = 3; // first 3 km included in base fee
  const extra = Math.max(0, distance - included);
  return Math.round((courier.baseFee + extra * courier.perKm) / 500) * 500;
};

/* ------------------------------------------------------------------ */
/*  Small shared UI                                                    */
/* ------------------------------------------------------------------ */

const inputCls = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-[#4E1726] bg-gray-50 dark:bg-[#250D15] text-sm font-semibold focus:outline-none focus:border-[#9B1832]';

const StatCard = ({ icon, label, value, accent }) => (
  <div className="relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-[#1A0B10] border border-gray-200 dark:border-[#3D1422] shadow-sm">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-xl`} />
    <div className="relative flex items-center gap-3">
      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-xl shadow-md`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
        <p className="text-xl font-black text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

const ModalShell = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
    <div
      className="bg-white dark:bg-[#180A0F] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-[#4E1726]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-[#3D1422] bg-gradient-to-r from-[#5A0E22] to-[#9B1832] text-white rounded-t-3xl">
        <h3 className="text-base font-black">{title}</h3>
        <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-white/15">
          <Icon name="x" className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const PhoneActions = ({ phone }) => {
  const clean = phone.replace(/\s/g, '');
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={`tel:${clean}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-white text-xs font-black transition-all"
        title="Qo'ng'iroq qilish"
      >
        <Icon name="phone" className="w-3.5 h-3.5" />
        <span>{phone}</span>
      </a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(phone)}
        className="p-1.5 rounded-lg text-gray-400 hover:text-[#9B1832] hover:bg-[#9B1832]/10"
        title="Raqamni nusxalash"
      >
        <Icon name="copy" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  STAFF PANEL — Ishchilar                                            */
/* ------------------------------------------------------------------ */

export const StaffPanel = ({ showToast }) => {
  const [staff, setStaff] = usePersistedList('istiqlol_staff', defaultStaff);
  const [filterRole, setFilterRole] = useState('all');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null | {} (new) | staff obj

  const emptyForm = { name: '', role: 'Oshpaz', phone: '+998 ', branch: 'Chilonzor', shift: '09:00 – 21:00', salary: 5000000, status: 'active', avatar: '🧑‍🍳' };
  const [form, setForm] = useState(emptyForm);

  const openForm = (s) => {
    setEditing(s || {});
    setForm(s ? { ...s } : emptyForm);
  };

  const saveForm = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 9) {
      showToast?.('Ism va telefon raqamni to\'liq kiriting', 'info');
      return;
    }
    if (editing?.id) {
      setStaff(prev => prev.map(s => (s.id === editing.id ? { ...form, salary: Number(form.salary) } : s)));
      showToast?.(`${form.name} ma'lumotlari yangilandi ✅`);
    } else {
      setStaff(prev => [{ ...form, id: `s${Date.now()}`, salary: Number(form.salary) }, ...prev]);
      showToast?.(`${form.name} ishchilar ro'yxatiga qo'shildi 🎉`);
    }
    setEditing(null);
  };

  const removeStaff = (s) => {
    if (confirm(`${s.name} ni ishchilar ro'yxatidan o'chirasizmi?`)) {
      setStaff(prev => prev.filter(x => x.id !== s.id));
      showToast?.(`${s.name} o'chirildi`, 'info');
    }
  };

  const cycleStatus = (s) => {
    const order = ['active', 'break', 'off'];
    const next = order[(order.indexOf(s.status) + 1) % order.length];
    setStaff(prev => prev.map(x => (x.id === s.id ? { ...x, status: next } : x)));
  };

  const filtered = staff.filter(s =>
    (filterRole === 'all' || s.role === filterRole) &&
    (s.name.toLowerCase().includes(query.toLowerCase()) || s.phone.includes(query))
  );

  const totalSalary = staff.reduce((sum, s) => sum + Number(s.salary || 0), 0);
  const onDuty = staff.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white">👥 Ishchilar jamoasi</h3>
          <p className="text-xs text-gray-500">Oshpazlar, kassirlar, menejerlar va boshqa xodimlar boshqaruvi</p>
        </div>
        <button
          type="button"
          onClick={() => openForm(null)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#9B1832] to-[#BA1D3D] hover:brightness-110 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-[#9B1832]/30 active:scale-95 transition-all"
        >
          <Icon name="plus" className="w-4 h-4" />
          <span>Yangi ishchi qo'shish</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Jami ishchilar" value={staff.length} accent="from-[#9B1832] to-[#E0405E]" />
        <StatCard icon="✅" label="Hozir ishda" value={onDuty} accent="from-emerald-500 to-teal-500" />
        <StatCard icon="🏪" label="Filiallar" value={new Set(staff.map(s => s.branch)).size} accent="from-sky-500 to-indigo-500" />
        <StatCard icon="💰" label="Oylik fondi" value={formatUZS(totalSalary)} accent="from-[#F3BE53] to-[#D99B26]" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism yoki telefon bo'yicha qidirish..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-[#3D1422] bg-white dark:bg-[#1A0B10] text-xs font-semibold focus:outline-none focus:border-[#9B1832]"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {['all', ...staffRoles].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setFilterRole(r)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-black transition-all ${
                filterRole === r
                  ? 'bg-[#9B1832] text-white shadow'
                  : 'bg-white dark:bg-[#1A0B10] text-gray-500 border border-gray-200 dark:border-[#3D1422] hover:text-[#9B1832]'
              }`}
            >
              {r === 'all' ? 'Barchasi' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Staff cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(s => (
          <div
            key={s.id}
            className="group p-5 rounded-3xl bg-white dark:bg-[#1A0B10] border border-gray-200 dark:border-[#3D1422] shadow-sm hover:shadow-xl hover:border-[#9B1832]/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5A0E22] to-[#9B1832] flex items-center justify-center text-2xl shadow-md ring-2 ring-[#F3BE53]/30">
                  {s.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 dark:text-white">{s.name}</h4>
                  <p className="text-xs font-bold text-[#9B1832] dark:text-[#F3BE53]">{s.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => cycleStatus(s)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-black ${staffStatusMeta[s.status]?.cls}`}
                title="Holatni o'zgartirish"
              >
                {staffStatusMeta[s.status]?.label}
              </button>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <PhoneActions phone={s.phone} />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15]">
                  <p className="text-[10px] text-gray-400 font-bold">🏪 Filial</p>
                  <p className="font-black text-gray-800 dark:text-gray-100">{s.branch}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15]">
                  <p className="text-[10px] text-gray-400 font-bold">🕒 Smena</p>
                  <p className="font-black text-gray-800 dark:text-gray-100">{s.shift}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F3BE53]/10 border border-[#F3BE53]/25">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">Oylik maosh</span>
                <span className="text-sm font-black text-[#B87D0E] dark:text-[#F3BE53]">{formatUZS(s.salary)}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#3D1422] flex justify-end gap-2">
              <button type="button" onClick={() => openForm(s)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-sky-600 hover:bg-sky-500/10">
                Tahrirlash
              </button>
              <button type="button" onClick={() => removeStaff(s)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-500/10">
                O'chirish
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-400 py-10">Hech qanday ishchi topilmadi</p>
        )}
      </div>

      {/* Add / Edit modal */}
      {editing && (
        <ModalShell title={editing.id ? 'Ishchini tahrirlash' : 'Yangi ishchi qo\'shish'} onClose={() => setEditing(null)}>
          <form onSubmit={saveForm} className="space-y-3 text-xs">
            <div className="grid grid-cols-[70px_1fr] gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Belgi</label>
                <select value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} className={inputCls}>
                  {['👨‍🍳', '👩‍🍳', '🧑‍🍳', '👩‍💼', '👨‍💼', '👩‍💻', '🧹', '📦'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Ism familiya</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Masalan: Ali Valiyev" className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Lavozim</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls}>
                  {staffRoles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Telefon raqam</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Filial</label>
                <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputCls}>
                  {branchList.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Smena vaqti</label>
                <input value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Oylik maosh (UZS)</label>
                <input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Holati</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputCls}>
                  <option value="active">Ishda</option>
                  <option value="break">Tanaffusda</option>
                  <option value="off">Dam olishda</option>
                </select>
              </div>
            </div>
            <div className="pt-3 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#250D15] font-bold">Bekor</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B1832] to-[#BA1D3D] text-white font-black shadow-md">Saqlash</button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  COURIERS PANEL — Kuryerlar + yetkazish narxlari                   */
/* ------------------------------------------------------------------ */

export const CouriersPanel = ({ couriers, setCouriers, showToast }) => {
  const [editing, setEditing] = useState(null);
  const [calcKm, setCalcKm] = useState(5);
  const [filter, setFilter] = useState('all');

  const emptyForm = { name: '', phone: '+998 ', transport: 'moto', plate: '', zone: '', baseFee: 12000, perKm: 2000, rating: 5.0, deliveriesToday: 0, status: 'online' };
  const [form, setForm] = useState(emptyForm);

  const openForm = (c) => {
    setEditing(c || {});
    setForm(c ? { ...c } : emptyForm);
  };

  const saveForm = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 9) {
      showToast?.('Kuryer ismi va telefon raqamini kiriting', 'info');
      return;
    }
    const clean = { ...form, baseFee: Number(form.baseFee), perKm: Number(form.perKm), deliveriesToday: Number(form.deliveriesToday) };
    if (editing?.id) {
      setCouriers(prev => prev.map(c => (c.id === editing.id ? clean : c)));
      showToast?.(`Kuryer ${form.name} yangilandi ✅`);
    } else {
      setCouriers(prev => [{ ...clean, id: `c${Date.now()}` }, ...prev]);
      showToast?.(`Yangi kuryer ${form.name} qo'shildi 🛵`);
    }
    setEditing(null);
  };

  const removeCourier = (c) => {
    if (confirm(`Kuryer ${c.name} ni o'chirasizmi?`)) {
      setCouriers(prev => prev.filter(x => x.id !== c.id));
      showToast?.(`${c.name} o'chirildi`, 'info');
    }
  };

  const setStatus = (c, status) => {
    setCouriers(prev => prev.map(x => (x.id === c.id ? { ...x, status } : x)));
  };

  const filtered = couriers.filter(c => filter === 'all' || c.status === filter);
  const onlineCount = couriers.filter(c => c.status !== 'offline').length;
  const totalDeliveries = couriers.reduce((s, c) => s + Number(c.deliveriesToday || 0), 0);
  const totalEarnings = couriers.reduce((s, c) => s + Number(c.deliveriesToday || 0) * Number(c.baseFee || 0), 0);
  const avgFee = couriers.length ? Math.round(couriers.reduce((s, c) => s + Number(c.baseFee), 0) / couriers.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white">🛵 Kuryerlar va yetkazib berish</h3>
          <p className="text-xs text-gray-500">Kuryerlar telefon raqamlari, transporti va yetkazib berish narxlari</p>
        </div>
        <button
          type="button"
          onClick={() => openForm(null)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#F3BE53] to-[#E09F24] hover:brightness-105 text-[#1E0910] font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-[#F3BE53]/30 active:scale-95 transition-all"
        >
          <Icon name="plus" className="w-4 h-4" />
          <span>Yangi kuryer qo'shish</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🛵" label="Faol kuryerlar" value={`${onlineCount} / ${couriers.length}`} accent="from-emerald-500 to-teal-500" />
        <StatCard icon="📦" label="Bugungi yetkazishlar" value={totalDeliveries} accent="from-sky-500 to-indigo-500" />
        <StatCard icon="💵" label="O'rtacha narx" value={formatUZS(avgFee)} accent="from-[#F3BE53] to-[#D99B26]" />
        <StatCard icon="💰" label="Bugungi daromad" value={formatUZS(totalEarnings)} accent="from-[#9B1832] to-[#E0405E]" />
      </div>

      {/* Tariffs + Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white dark:bg-[#1A0B10] border border-gray-200 dark:border-[#3D1422] shadow-sm">
          <h4 className="text-sm font-black text-gray-900 dark:text-white mb-1">💳 Yetkazib berish tariflari</h4>
          <p className="text-[11px] text-gray-500 mb-4">Boshlang'ich narxga dastlabki 3 km kiradi, keyingi har bir km uchun qo'shimcha to'lov</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(transportMeta).map(([key, meta]) => {
              const sample = couriers.find(c => c.transport === key) || { baseFee: key === 'velo' ? 8000 : key === 'moto' ? 12000 : 15000, perKm: key === 'velo' ? 1500 : key === 'moto' ? 2000 : 2500 };
              const count = couriers.filter(c => c.transport === key).length;
              return (
                <div key={key} className="relative overflow-hidden p-4 rounded-2xl border border-gray-200 dark:border-[#3D1422] bg-gray-50 dark:bg-[#250D15]">
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${meta.color}`} />
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{meta.icon}</span>
                    <span className="text-[10px] font-black text-gray-400">{count} ta kuryer</span>
                  </div>
                  <p className="mt-2 text-xs font-black text-gray-800 dark:text-gray-100">{meta.label}</p>
                  <p className="text-lg font-black text-[#9B1832] dark:text-[#F3BE53]">{formatUZS(sample.baseFee)}</p>
                  <p className="text-[11px] text-gray-500 font-semibold">+ {formatUZS(sample.perKm)} / km (3 km dan keyin)</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#5A0E22] via-[#7A132D] to-[#2B0812] text-white shadow-xl border border-[#F3BE53]/30">
          <h4 className="text-sm font-black">🧮 Narx kalkulyatori</h4>
          <p className="text-[11px] text-rose-100/80 mb-3">Masofani kiriting — har bir transport uchun narx</p>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="25"
              value={calcKm}
              onChange={(e) => setCalcKm(Number(e.target.value))}
              className="flex-1 accent-[#F3BE53]"
            />
            <span className="w-16 text-center text-sm font-black bg-black/30 rounded-lg py-1 border border-white/10">{calcKm} km</span>
          </div>
          <div className="mt-4 space-y-2">
            {Object.entries(transportMeta).map(([key, meta]) => {
              const sample = couriers.find(c => c.transport === key) || { baseFee: 12000, perKm: 2000 };
              return (
                <div key={key} className="flex items-center justify-between p-2.5 rounded-xl bg-black/25 border border-white/10">
                  <span className="text-xs font-bold">{meta.icon} {meta.label}</span>
                  <span className="text-sm font-black text-[#F3BE53]">{formatUZS(calcDeliveryPrice(sample, calcKm))}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: `Barchasi (${couriers.length})` },
          { id: 'online', label: '🟢 Bo\'sh' },
          { id: 'delivering', label: '🟡 Yetkazmoqda' },
          { id: 'offline', label: '⚪ Oflayn' }
        ].map(f => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-black transition-all ${
              filter === f.id
                ? 'bg-[#9B1832] text-white shadow'
                : 'bg-white dark:bg-[#1A0B10] text-gray-500 border border-gray-200 dark:border-[#3D1422] hover:text-[#9B1832]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Courier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => {
          const tm = transportMeta[c.transport] || transportMeta.moto;
          const st = courierStatusMeta[c.status] || courierStatusMeta.offline;
          return (
            <div
              key={c.id}
              className="relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-[#1A0B10] border border-gray-200 dark:border-[#3D1422] shadow-sm hover:shadow-xl hover:border-[#F3BE53]/50 transition-all"
            >
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${tm.color}`} />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tm.color} flex items-center justify-center text-2xl shadow-md`}>
                      {tm.icon}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1A0B10] ${st.dot}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">{c.name}</h4>
                    <p className="text-[11px] font-bold text-gray-500">{tm.label} • {c.plate || '—'}</p>
                    <p className="text-[11px] font-black text-amber-500">⭐ {Number(c.rating).toFixed(1)}</p>
                  </div>
                </div>
                <select
                  value={c.status}
                  onChange={(e) => setStatus(c, e.target.value)}
                  className={`text-[10px] font-black rounded-full px-2 py-1 border-0 cursor-pointer focus:outline-none ${st.cls}`}
                >
                  <option value="online">Bo'sh</option>
                  <option value="delivering">Yetkazmoqda</option>
                  <option value="offline">Oflayn</option>
                </select>
              </div>

              <div className="mt-4 space-y-2.5">
                <PhoneActions phone={c.phone} />

                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-semibold">
                  <Icon name="map-pin" className="w-3.5 h-3.5 text-[#9B1832]" />
                  <span className="truncate">Hudud: {c.zone || '—'}</span>
                </div>

                {/* Pricing block */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F3BE53]/10 border border-[#F3BE53]/30 text-center">
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Boshlang'ich</p>
                    <p className="text-xs font-black text-[#B87D0E] dark:text-[#F3BE53]">{formatUZS(c.baseFee)}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] text-center">
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Har km</p>
                    <p className="text-xs font-black text-gray-800 dark:text-gray-100">{formatUZS(c.perKm)}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#250D15] text-center">
                    <p className="text-[9px] font-bold text-gray-500 uppercase">5 km</p>
                    <p className="text-xs font-black text-gray-800 dark:text-gray-100">{formatUZS(calcDeliveryPrice(c, 5))}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">📦 Bugun: {c.deliveriesToday} ta</span>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                    {formatUZS(c.deliveriesToday * c.baseFee)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#3D1422] flex justify-end gap-2">
                <button type="button" onClick={() => openForm(c)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-sky-600 hover:bg-sky-500/10">
                  Tahrirlash
                </button>
                <button type="button" onClick={() => removeCourier(c)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-500/10">
                  O'chirish
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-400 py-10">Bu holatda kuryer yo'q</p>
        )}
      </div>

      {/* Add / Edit courier modal */}
      {editing && (
        <ModalShell title={editing.id ? 'Kuryerni tahrirlash' : 'Yangi kuryer qo\'shish'} onClose={() => setEditing(null)}>
          <form onSubmit={saveForm} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Ism familiya</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Masalan: Jamshid Olimov" className={inputCls} />
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">📞 Telefon raqam</label>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Transport</label>
                <select
                  value={form.transport}
                  onChange={(e) => {
                    const t = e.target.value;
                    const defaults = { velo: [8000, 1500], moto: [12000, 2000], avto: [15000, 2500] }[t];
                    setForm({ ...form, transport: t, baseFee: defaults[0], perKm: defaults[1] });
                  }}
                  className={inputCls}
                >
                  {Object.entries(transportMeta).map(([k, m]) => <option key={k} value={k}>{m.icon} {m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Davlat raqami</label>
                <input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} placeholder="01 A 123 AA" className={inputCls} />
              </div>
            </div>
            <div>
              <label className="font-bold text-gray-500 block mb-1">Xizmat hududi</label>
              <input value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} placeholder="Chilonzor, Sergeli..." className={inputCls} />
            </div>
            <div className="p-3 rounded-2xl bg-[#F3BE53]/10 border border-[#F3BE53]/30 space-y-3">
              <p className="font-black text-[#B87D0E] dark:text-[#F3BE53]">💵 Yetkazib berish narxi</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Boshlang'ich (3 km gacha)</label>
                  <input type="number" step="500" value={form.baseFee} onChange={(e) => setForm({ ...form, baseFee: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Har qo'shimcha km</label>
                  <input type="number" step="500" value={form.perKm} onChange={(e) => setForm({ ...form, perKm: e.target.value })} className={inputCls} />
                </div>
              </div>
              <p className="text-[11px] text-gray-500">
                Misol: 5 km → <strong className="text-[#9B1832] dark:text-[#F3BE53]">{formatUZS(calcDeliveryPrice({ baseFee: Number(form.baseFee), perKm: Number(form.perKm) }, 5))}</strong>,
                10 km → <strong className="text-[#9B1832] dark:text-[#F3BE53]">{formatUZS(calcDeliveryPrice({ baseFee: Number(form.baseFee), perKm: Number(form.perKm) }, 10))}</strong>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-gray-500 block mb-1">Bugungi yetkazishlar</label>
                <input type="number" value={form.deliveriesToday} onChange={(e) => setForm({ ...form, deliveriesToday: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="font-bold text-gray-500 block mb-1">Holati</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputCls}>
                  <option value="online">Bo'sh • Onlayn</option>
                  <option value="delivering">Yetkazmoqda</option>
                  <option value="offline">Oflayn</option>
                </select>
              </div>
            </div>
            <div className="pt-3 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-[#250D15] font-bold">Bekor</button>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B1832] to-[#BA1D3D] text-white font-black shadow-md">Saqlash</button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
};

