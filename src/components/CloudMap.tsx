import { useState } from 'react'
import { services, edges } from '../data/aws'
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches
export default function CloudMap() {
  const [sel, setSel] = useState('EC2'); const [hov, setHov] = useState<string | null>(null)
  const cur = hov ?? sel; const s = services[cur]
  return (
    <div className="grid lg:grid-cols-[1fr_260px] gap-4">
      <svg viewBox="0 0 600 320" role="group" aria-label="AWS services map" className="w-full panel p-1">
        {edges.map(([a, b], i) => { const A = services[a], B = services[b]; const d = `M${A.x} ${A.y} L${B.x} ${B.y}`
          return <g key={i}><path d={d} stroke="rgba(0,217,255,.3)" fill="none" />
            {!reduce && <circle r="2.5" fill="#00FF9C"><animateMotion dur={`${2 + (i % 4) * .5}s`} repeatCount="indefinite" path={d} /></circle>}</g> })}
        {Object.entries(services).map(([k, v]) => (
          <g key={k} tabIndex={0} role="button" aria-label={k} className="cursor-pointer" onClick={() => setSel(k)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSel(k)} onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(k)} onBlur={() => setHov(null)}>
            <circle cx={v.x} cy={v.y} r={cur === k ? 17 : 13} fill="#0A0F14" stroke={cur === k ? '#00FF9C' : '#00D9FF'} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 ${cur === k ? 8 : 3}px ${cur === k ? '#00FF9C' : '#00D9FF'})` }} />
            <text x={v.x} y={v.y + 28} textAnchor="middle" fontSize="10" fill="#cfe0ea" fontFamily="monospace">{k}</text>
          </g>))}
      </svg>
      <div className="panel font-mono text-xs leading-6" aria-live="polite">
        <div className="text-w">RESOURCE</div><div className="text-g text-lg">{cur}</div><div className="text-c">{s.group}</div>
        <div className="mt-2 text-slate-400">Referenced in:</div>{s.refs.map(r => <div key={r}>- {r}</div>)}
        <div className="mt-2 text-slate-400">Context:</div><div className="font-sans text-sm leading-5">{s.ctx}</div>
      </div>
    </div>)
}
