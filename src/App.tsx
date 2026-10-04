import { useState, useCallback, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Terminal as TI, Cloud, Map, Briefcase, FlaskConical, Workflow, Cpu, Award, FileText, Mail, Menu, X, LayoutDashboard } from 'lucide-react'
import Boot from './components/Boot'
import Terminal from './components/Terminal'
import { Overview, Aws, Journey, Experience, Labs, Automation, Skills, Certs, Resume, Contact } from './scenes/Views'
import type { View, Result } from './terminal/commands'
const nav: [View, string, typeof Cloud][] = [['overview','OVERVIEW',LayoutDashboard],['aws','AWS MAP',Cloud],['journey','JOURNEY',Map],['experience','EXPERIENCE',Briefcase],['labs','LABS',FlaskConical],['automation','AUTOMATION',Workflow],['skills','SKILLS',Cpu],['certs','CERTS',Award],['resume','RESUME',FileText],['contact','CONTACT',Mail]]
const scenes: Record<View, ReactNode> = { overview: <Overview />, aws: <Aws />, journey: <Journey />, experience: <Experience />, labs: <Labs />, automation: <Automation />, skills: <Skills />, certs: <Certs />, resume: <Resume />, contact: <Contact /> }
export default function App() {
  const [booted, setBooted] = useState(false); const [view, setView] = useState<View>('overview'); const [menu, setMenu] = useState(false); const [matrix, setMatrix] = useState(false)
  const onResult = useCallback((r: Result) => { if (r.view) setView(r.view); if (r.fx === 'matrix') { setMatrix(true); setTimeout(() => setMatrix(false), 6000) } }, [])
  const Rail = ({ cls }: { cls: string }) => <nav aria-label="Main" className={cls}>{nav.map(([k, l, I]) => <button key={k} onClick={() => { setView(k); setMenu(false) }} aria-current={view === k} className={'flex items-center gap-2 px-3 py-2 rounded font-mono text-xs text-left ' + (view === k ? 'bg-g/10 text-g border-l-2 border-g' : 'text-slate-400 hover:text-c')}><I className="w-4 h-4" />{l}</button>)}</nav>
  return (
    <div className="scan h-[100dvh] flex flex-col grid-bg" onMouseMove={e => { const s = document.documentElement.style; s.setProperty('--mx', `${e.clientX / 60}px`); s.setProperty('--my', `${e.clientY / 60}px`) }}>
      {!booted && <Boot done={() => setBooted(true)} />}
      {matrix && <div aria-hidden className="fixed inset-0 z-40 pointer-events-none overflow-hidden opacity-60 font-mono text-g text-xs">{Array.from({ length: 28 }, (_, i) => <div key={i} className="absolute" style={{ left: `${i * 3.6}%`, animation: `rain ${2 + (i % 5)}s linear infinite` }}>{Array.from({ length: 14 }, (_, j) => <div key={j}>{(i * 7 + j * 3) % 2}</div>)}</div>)}</div>}
      <header className="flex items-center justify-between px-3 h-11 border-b border-c/30 bg-panel/90 font-mono text-xs">
        <div className="flex items-center gap-2"><TI className="w-4 h-4 text-g" /><span className="text-white">SUMIT // CLOUDOPS</span></div>
        <div className="flex items-center gap-3"><span className="text-g"><span className="pulse">●</span> SYSTEM ONLINE</span><button className="md:hidden" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>
      </header>
      {menu && <Rail cls="md:hidden flex flex-col p-2 bg-panel border-b border-c/30" />}
      <div className="flex-1 min-h-0 flex">
        <Rail cls="hidden md:flex flex-col gap-1 w-44 p-2 border-r border-c/20 bg-panel/60 overflow-auto" />
        <main className="flex-1 overflow-auto p-4 sm:p-6" tabIndex={-1}>
          <AnimatePresence mode="wait"><motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>{scenes[view]}</motion.div></AnimatePresence>
        </main>
        <aside className="hidden xl:block w-56 p-3 border-l border-c/20 bg-panel/60 font-mono text-xs space-y-3" aria-label="System telemetry">
          <div className="text-w">TELEMETRY</div>{[['SYSTEM','ONLINE'],['AWS','ACTIVE'],['LINUX','ACTIVE'],['AUTOMATION','ACTIVE'],['PROFILE','AVAILABLE']].map(([a, b]) => <div key={a} className="flex justify-between"><span><span className="text-g pulse">●</span> {a}</span><span className="text-slate-400">{b}</span></div>)}
          <div className="text-slate-500 pt-3">Status labels only. No live metrics are shown.</div>
        </aside>
      </div>
      <Terminal onResult={onResult} />
    </div>)
}
