import { useRef, useState, useEffect } from 'react'
import { run, names, type Result } from '../terminal/commands'
import { profile } from '../data/profile'
const ART = ` ___ _   _ __  __ ___ _____\n/ __| | | |  \\/  |_ _|_   _|\n\\__ \\ |_| | |\\/| || |  | |\n|___/\\___/|_|  |_|___| |_|`
export default function Terminal({ onResult }: { onResult: (r: Result) => void }) {
  const [log, setLog] = useState<string[]>(['Welcome to CloudOps. Type "help". This terminal is a front-end simulation; nothing runs on a server.'])
  const [v, setV] = useState(''); const hist = useRef<string[]>([]); const hp = useRef(0); const box = useRef<HTMLDivElement>(null)
  const sug = v ? names.filter(n => n.startsWith(v.toLowerCase())).slice(0, 5) : []
  useEffect(() => { box.current?.scrollTo(0, box.current.scrollHeight) }, [log])
  const submit = () => {
    const r = run(v); hist.current.push(v); hp.current = hist.current.length
    const out = r.out[0] === '__NEOFETCH__' ? [ART, `OS       : CloudOps`, `Role     : ${profile.role}`, `Cloud    : AWS`, `Focus    : Infrastructure / Automation / toward DevOps`, `Location : Mumbai`, `Status   : ONLINE`] : r.out
    setLog(l => r.fx === 'clear' ? [] : [...l, `sumit@cloudops:~$ ${v}`, ...out]); onResult(r); setV('')
  }
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'Tab') { e.preventDefault(); if (sug[0]) setV(sug[0]) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (hp.current > 0) setV(hist.current[--hp.current]) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setV(hist.current[++hp.current] ?? '') }
  }
  return (
    <div className="border-t border-c/30 bg-panel/95 font-mono text-xs" onClick={() => document.getElementById('cmd')?.focus()}>
      <div ref={box} role="log" aria-live="polite" className="h-28 sm:h-36 overflow-auto px-3 pt-2 whitespace-pre-wrap text-slate-300">{log.join('\n')}</div>
      {sug.length > 1 && <div className="px-3 text-slate-500">{sug.join('  ')}</div>}
      <label className="flex gap-2 px-3 py-2 items-center"><span className="text-g shrink-0">sumit@cloudops:~$</span>
        <input id="cmd" value={v} onChange={e => setV(e.target.value)} onKeyDown={key} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal command" className="flex-1 bg-transparent outline-none text-white min-w-0" /></label>
    </div>)
}
