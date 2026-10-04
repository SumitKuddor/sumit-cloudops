import { useEffect, useState } from 'react'
const lines = ['Loading kernel','Loading identity module','Loading AWS infrastructure','Loading Linux environment','Loading automation engine','Loading project database','Loading career timeline']
export default function Boot({ done }: { done: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => { const t = setInterval(() => setN(x => Math.min(x + 1, lines.length + 1)), 280); return () => clearInterval(t) }, [])
  const ready = n > lines.length
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Enter' && ready) done() }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [ready, done])
  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center p-6 font-mono text-sm z-50" onClick={() => ready && done()}>
      <div className="max-w-md w-full">
        <div className="text-c mb-3">INITIALIZING SUMIT.CLOUDOPS...</div>
        {lines.slice(0, n).map(l => <div key={l}><span className="text-g">[ OK ]</span> {l}</div>)}
        <div className="mt-4 h-1 bg-panel border border-c/30"><div className="h-full bg-g transition-all duration-300" style={{ width: `${Math.min(100, (n / (lines.length + 1)) * 100)}%` }} /></div>
        {ready ? <button autoFocus onClick={done} className="mt-4 text-g pulse">CLOUDOPS SYSTEM ONLINE: press ENTER or tap to continue</button> : <div className="mt-4 text-slate-500">booting...</div>}
        <button onClick={done} className="mt-6 text-xs text-slate-400 underline">Skip</button>
      </div>
    </div>)
}
