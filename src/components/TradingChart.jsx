import React, { useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Trading-style revenue chart (candlesticks + volume + MA + crosshair) */
/* ------------------------------------------------------------------ */

// Deterministic pseudo-random generator so the chart is stable between renders
const seeded = (seed) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

const timeframes = {
  '1K': { label: '1K', title: 'Bugun (soatlik)', count: 24, seed: 11, base: 0.55, vol: 0.12, labelFn: (i) => `${String(i).padStart(2, '0')}:00` },
  '1H': { label: '1H', title: 'Hafta (kunlik)', count: 7, seed: 23, base: 14.5, vol: 1.6, labelFn: (i) => ['Dush', 'Sesh', 'Chor', 'Pay', 'Juma', 'Shan', 'Yak'][i] },
  '1O': { label: '1O', title: 'Oy (kunlik)', count: 30, seed: 37, base: 13.2, vol: 1.4, labelFn: (i) => `${i + 1}-kun` },
  '1Y': { label: '1Y', title: 'Yil (oylik)', count: 12, seed: 53, base: 320, vol: 38, labelFn: (i) => ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'][i] }
};

const buildCandles = ({ count, seed, base, vol, labelFn }) => {
  const rnd = seeded(seed);
  const out = [];
  let prevClose = base;
  for (let i = 0; i < count; i++) {
    const drift = (rnd() - 0.42) * vol; // slight upward trend
    const open = prevClose;
    const close = Math.max(base * 0.4, open + drift);
    const high = Math.max(open, close) + rnd() * vol * 0.55;
    const low = Math.min(open, close) - rnd() * vol * 0.55;
    const volume = Math.round(40 + rnd() * 160 + Math.abs(drift / vol) * 120);
    out.push({ label: labelFn(i), open, close, high, low, volume });
    prevClose = close;
  }
  // moving average (MA-5)
  return out.map((c, i, arr) => {
    const slice = arr.slice(Math.max(0, i - 4), i + 1);
    return { ...c, ma: slice.reduce((s, x) => s + x.close, 0) / slice.length };
  });
};

const fmt = (v) => {
  if (v >= 100) return v.toFixed(1);
  if (v >= 10) return v.toFixed(2);
  return v.toFixed(3);
};

export const TradingChart = () => {
  const [tf, setTf] = useState('1H');
  const [mode, setMode] = useState('candle'); // 'candle' | 'line'
  const [showMA, setShowMA] = useState(true);
  const [hover, setHover] = useState(null);
  const svgRef = useRef(null);

  const data = useMemo(() => buildCandles(timeframes[tf]), [tf]);

  // Geometry
  const W = 900, H = 290;
  const padL = 12, padR = 72, padT = 14;
  const priceH = 190, volTop = padT + priceH + 14, volH = 44;
  const plotW = W - padL - padR;
  const step = plotW / data.length;
  const bodyW = Math.max(3, Math.min(26, step * 0.62));

  const maxP = Math.max(...data.map(d => d.high));
  const minP = Math.min(...data.map(d => d.low));
  const range = (maxP - minP) || 1;
  const top = maxP + range * 0.08;
  const bottom = minP - range * 0.08;
  const y = (v) => padT + ((top - v) / (top - bottom)) * priceH;
  const x = (i) => padL + step * i + step / 2;
  const maxVol = Math.max(...data.map(d => d.volume));

  const last = data[data.length - 1];
  const first = data[0];
  const change = last.close - first.open;
  const changePct = (change / first.open) * 100;
  const up = change >= 0;
  const dayHigh = Math.max(...data.map(d => d.high));
  const dayLow = Math.min(...data.map(d => d.low));
  const totalVol = data.reduce((s, d) => s + d.volume, 0);

  const gridLevels = Array.from({ length: 6 }, (_, i) => bottom + ((top - bottom) * i) / 5);
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.close)}`).join(' ');
  const areaPath = `${linePath} L${x(data.length - 1)},${padT + priceH} L${x(0)},${padT + priceH} Z`;
  const maPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d.ma)}`).join(' ');

  const handleMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const vy = ((e.clientY - rect.top) / rect.height) * H;
    const idx = Math.floor((vx - padL) / step);
    if (idx >= 0 && idx < data.length) setHover({ idx, vy });
    else setHover(null);
  };

  const active = hover ? data[hover.idx] : last;
  const activeUp = active.close >= active.open;

  return (
    <div className="rounded-3xl overflow-hidden bg-[#0B0E14] border border-[#1E2533] shadow-2xl text-gray-200">
      {/* ===== Top ticker bar ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 border-b border-[#1E2533] bg-gradient-to-r from-[#0F131B] to-[#121826]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F3BE53] to-[#9B1832] flex items-center justify-center text-lg shadow-lg">
            📈
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black tracking-wide" style={{ color: '#F9FAFB' }}>ISTIQLOL / UZS</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1E2533] text-gray-400">TUSHUM</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">{timeframes[tf].title} • mln UZS</p>
          </div>
          <div className="pl-4 border-l border-[#1E2533]">
            <p className={`text-xl font-black tabular-nums ${up ? 'text-emerald-400' : 'text-rose-500'}`}>
              {fmt(last.close)}
            </p>
            <p className={`text-xs font-bold tabular-nums ${up ? 'text-emerald-400' : 'text-rose-500'}`}>
              {up ? '▲' : '▼'} {up ? '+' : ''}{fmt(change)} ({up ? '+' : ''}{changePct.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-4 gap-5 text-[11px]">
          <div><p className="text-gray-500 font-semibold">Eng yuqori</p><p className="font-black text-emerald-400 tabular-nums">{fmt(dayHigh)}</p></div>
          <div><p className="text-gray-500 font-semibold">Eng past</p><p className="font-black text-rose-500 tabular-nums">{fmt(dayLow)}</p></div>
          <div><p className="text-gray-500 font-semibold">Buyurtmalar</p><p className="font-black tabular-nums" style={{ color: '#FFFFFF' }}>{totalVol.toLocaleString()}</p></div>
          <div><p className="text-gray-500 font-semibold">MA (5)</p><p className="font-black text-[#F3BE53] tabular-nums">{fmt(last.ma)}</p></div>
        </div>
      </div>

      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 border-b border-[#1E2533] bg-[#0D1118]">
        <div className="flex items-center gap-1">
          {Object.keys(timeframes).map(k => (
            <button
              key={k}
              type="button"
              onClick={() => { setTf(k); setHover(null); }}
              className={`px-3 py-1 rounded-md text-xs font-black transition-all ${tf === k ? 'bg-[#F3BE53] text-[#0B0E14]' : 'text-gray-400 hover:text-white hover:bg-[#1E2533]'
                }`}
            >
              {timeframes[k].label}
            </button>
          ))}
          <span className="w-px h-4 bg-[#1E2533] mx-2" />
          <button
            type="button"
            onClick={() => setMode('candle')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${mode === 'candle' ? 'bg-[#1E2533] text-white' : 'text-gray-500 hover:text-white'}`}
            title="Shamlar"
          >
            🕯 Sham
          </button>
          <button
            type="button"
            onClick={() => setMode('line')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${mode === 'line' ? 'bg-[#1E2533] text-white' : 'text-gray-500 hover:text-white'}`}
            title="Chiziq"
          >
            📈 Chiziq
          </button>
          <button
            type="button"
            onClick={() => setShowMA(v => !v)}
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${showMA ? 'text-[#F3BE53] bg-[#F3BE53]/10' : 'text-gray-500 hover:text-white'}`}
          >
            MA
          </button>
        </div>

        {/* OHLC readout (TradingView style) */}
        <div className="flex items-center gap-3 text-[11px] font-bold tabular-nums">
          <span className="text-gray-400">{active.label}</span>
          <span className="text-gray-500">O <span className={activeUp ? 'text-emerald-400' : 'text-rose-500'}>{fmt(active.open)}</span></span>
          <span className="text-gray-500">H <span className={activeUp ? 'text-emerald-400' : 'text-rose-500'}>{fmt(active.high)}</span></span>
          <span className="text-gray-500">L <span className={activeUp ? 'text-emerald-400' : 'text-rose-500'}>{fmt(active.low)}</span></span>
          <span className="text-gray-500">C <span className={activeUp ? 'text-emerald-400' : 'text-rose-500'}>{fmt(active.close)}</span></span>
          <span className="hidden sm:inline text-gray-500">Vol <span className="text-sky-400">{active.volume}</span></span>
        </div>
      </div>

      {/* ===== Chart ===== */}
      <div className="relative px-2 pt-2 pb-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto max-h-[300px] select-none cursor-crosshair"
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="tvArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={up ? '#10B981' : '#F43F5E'} stopOpacity="0.35" />
              <stop offset="100%" stopColor={up ? '#10B981' : '#F43F5E'} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Watermark */}
          <text x={padL + plotW / 2} y={padT + priceH / 2 + 12} textAnchor="middle" fill="#ffffff" opacity="0.035" fontSize="42" fontWeight="900">
            ISTIQLOL
          </text>

          {/* Horizontal grid + price axis */}
          {gridLevels.map((lvl, i) => (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y(lvl)} y2={y(lvl)} stroke="#1E2533" strokeDasharray="3 4" />
              <text x={W - padR + 8} y={y(lvl) + 4} fill="#6B7280" fontSize="11" fontWeight="700">{fmt(lvl)}</text>
            </g>
          ))}

          {/* Vertical grid + time labels */}
          {data.map((d, i) => {
            const every = Math.ceil(data.length / 8);
            if (i % every !== 0) return null;
            return (
              <g key={`v${i}`}>
                <line x1={x(i)} x2={x(i)} y1={padT} y2={volTop + volH} stroke="#161C27" />
                <text x={x(i)} y={H - 4} textAnchor="middle" fill="#6B7280" fontSize="11" fontWeight="700">{d.label}</text>
              </g>
            );
          })}

          {/* Volume separator */}
          <line x1={padL} x2={W - padR} y1={volTop - 6} y2={volTop - 6} stroke="#1E2533" />

          {/* Volume bars */}
          {data.map((d, i) => {
            const h = (d.volume / maxVol) * volH;
            const isUp = d.close >= d.open;
            return (
              <rect
                key={`vol${i}`}
                x={x(i) - bodyW / 2}
                y={volTop + volH - h}
                width={bodyW}
                height={h}
                fill={isUp ? '#10B981' : '#F43F5E'}
                opacity={hover?.idx === i ? 0.75 : 0.35}
                rx="1.5"
              />
            );
          })}

          {/* Price series */}
          {mode === 'line' ? (
            <>
              <path d={areaPath} fill="url(#tvArea)" />
              <path d={linePath} fill="none" stroke={up ? '#10B981' : '#F43F5E'} strokeWidth="2.5" strokeLinejoin="round" />
            </>
          ) : (
            data.map((d, i) => {
              const isUp = d.close >= d.open;
              const color = isUp ? '#10B981' : '#F43F5E';
              const bTop = y(Math.max(d.open, d.close));
              const bH = Math.max(1.5, Math.abs(y(d.open) - y(d.close)));
              return (
                <g key={`c${i}`} opacity={hover && hover.idx !== i ? 0.75 : 1}>
                  <line x1={x(i)} x2={x(i)} y1={y(d.high)} y2={y(d.low)} stroke={color} strokeWidth="1.5" />
                  <rect x={x(i) - bodyW / 2} y={bTop} width={bodyW} height={bH} fill={isUp ? color : color} stroke={color} rx="1.5" />
                </g>
              );
            })
          )}

          {/* Moving average */}
          {showMA && <path d={maPath} fill="none" stroke="#F3BE53" strokeWidth="1.6" strokeDasharray="0" opacity="0.9" />}

          {/* Last price line + tag */}
          <line x1={padL} x2={W - padR} y1={y(last.close)} y2={y(last.close)} stroke={up ? '#10B981' : '#F43F5E'} strokeDasharray="4 3" strokeWidth="1" />
          <rect x={W - padR + 2} y={y(last.close) - 10} width={padR - 6} height="20" rx="4" fill={up ? '#10B981' : '#F43F5E'} />
          <text x={W - padR + (padR - 6) / 2 + 2} y={y(last.close) + 4} textAnchor="middle" fill="#0B0E14" fontSize="11" fontWeight="900">
            {fmt(last.close)}
          </text>

          {/* Crosshair */}
          {hover && (() => {
            const d = data[hover.idx];
            const cy = Math.min(Math.max(hover.vy, padT), padT + priceH);
            const priceAtCursor = top - ((cy - padT) / priceH) * (top - bottom);
            const tipX = x(hover.idx) > W / 2 ? x(hover.idx) - 168 : x(hover.idx) + 14;
            const isUp = d.close >= d.open;
            return (
              <g pointerEvents="none">
                <line x1={x(hover.idx)} x2={x(hover.idx)} y1={padT} y2={volTop + volH} stroke="#9CA3AF" strokeDasharray="3 3" opacity="0.7" />
                <line x1={padL} x2={W - padR} y1={cy} y2={cy} stroke="#9CA3AF" strokeDasharray="3 3" opacity="0.7" />
                <rect x={W - padR + 2} y={cy - 10} width={padR - 6} height="20" rx="4" fill="#374151" />
                <text x={W - padR + (padR - 6) / 2 + 2} y={cy + 4} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">{fmt(priceAtCursor)}</text>

                {/* Tooltip */}
                <g transform={`translate(${tipX}, ${padT + 4})`}>
                  <rect width="154" height="112" rx="10" fill="#111827" stroke="#2A3344" opacity="0.97" />
                  <text x="12" y="20" fill="#F3BE53" fontSize="12" fontWeight="900">{d.label}</text>
                  <text x="142" y="20" textAnchor="end" fill={isUp ? '#10B981' : '#F43F5E'} fontSize="11" fontWeight="900">
                    {isUp ? '▲' : '▼'} {(((d.close - d.open) / d.open) * 100).toFixed(2)}%
                  </text>
                  {[
                    ['Ochilish', d.open], ['Eng yuqori', d.high], ['Eng past', d.low], ['Yopilish', d.close]
                  ].map(([k, v], j) => (
                    <g key={k}>
                      <text x="12" y={40 + j * 16} fill="#9CA3AF" fontSize="11" fontWeight="600">{k}</text>
                      <text x="142" y={40 + j * 16} textAnchor="end" fill="#F9FAFB" fontSize="11" fontWeight="800">{fmt(v)}</text>
                    </g>
                  ))}
                  <text x="12" y="104" fill="#9CA3AF" fontSize="11" fontWeight="600">Buyurtmalar</text>
                  <text x="142" y="104" textAnchor="end" fill="#38BDF8" fontSize="11" fontWeight="800">{d.volume}</text>
                </g>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* ===== Bottom legend ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-[#1E2533] bg-[#0D1118] text-[11px] font-bold">
        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> O'sish</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Pasayish</span>
          {showMA && <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-[#F3BE53]" /> MA (5)</span>}
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-400/60" /> Buyurtmalar hajmi</span>
        </div>
        <span className={`px-2.5 py-1 rounded-md ${up ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
          O'sish sur'ati: {up ? '+' : ''}{changePct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
