import { Fragment, useState } from 'react'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import CloudMap from '../components/CloudMap'
import { profile, certs, skills, logs } from '../data/profile'
import { missions } from '../data/journey'
import { deployments } from '../data/experience'
import { labs } from '../data/projects'
import { levels, levelLabels } from '../data/skillLevels'
export const resumeUrl = import.meta.env.BASE_URL + 'resume.pdf'
const H = ({ t, s }: { t: string; s?: string }) => <div className="mb-4"><h2 className="font-mono text-g text-lg">// {t}</h2>{s && <p className="text-slate-400 text-sm">{s}</p>}</div>
function Pipe({ steps }: { steps: { l: string; d: string }[] }) {
  const [i, setI] = useState(0)
  return <div className="grid md:grid-cols-[220px_1fr] gap-4 items-start"><div className="flex flex-col items-center">
    {steps.map((s, k) => <Fragment key={k}>{k > 0 && <span className="flow" />}<button className={'node ' + (i === k ? 'sel' : '')} onClick={() => setI(k)}>{s.l}</button></Fragment>)}</div>
    <div className="panel font-mono text-sm" aria-live="polite"><div className="text-w">{steps[i].l}</div><p className="font-sans text-slate-300 mt-1">{steps[i].d}</p></div></div>
}
export function Overview() {
  return <div><H t={`SUMIT KUDDOR // CLOUD OPERATIONS CENTER`} s="Type a command below, or use the rail to navigate." />
    <div className="panel mb-4"><div className="font-mono text-c text-2xl sm:text-4xl font-bold">{profile.name.toUpperCase()}</div><div className="font-mono text-g">{profile.role.toUpperCase()}</div><p className="mt-3 text-slate-300 max-w-prose">{profile.summary}</p></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">{[['CLOUD','AWS'],['CERTIFICATIONS','02'],['PROJECTS','02'],['EXPERIENCE','1+ YEAR'],['LINUX','ACTIVE'],['AUTOMATION','ACTIVE']].map(([a, b]) => <div key={a} className="panel"><div className="text-slate-400">{a}</div><div className="text-c text-xl">{b}</div></div>)}</div>
    <div className="panel mt-4 font-mono text-xs text-slate-400 max-h-40 overflow-auto" aria-label="System log">{logs.map((l, i) => <div key={i} className={l.startsWith('[OK') || l.startsWith('[READY') ? 'text-g' : ''}>{l}</div>)}</div></div>
}
export const Aws = () => <div><H t="AWS INFRASTRUCTURE" s="Only services named on the resume. Select a node." /><CloudMap /></div>
export function Journey() {
  const [o, setO] = useState('04')
  return <div><H t="MISSION CONTROL" s="Role order follows the resume listing; exact role dates aren't stated." />
    <div className="space-y-2 max-w-2xl">{missions.map(m => <div key={m.id} className="panel"><button className="w-full text-left font-mono" aria-expanded={o === m.id} onClick={() => setO(o === m.id ? '' : m.id)}>
      <span className="text-c">MISSION {m.id}</span> <span className="text-white">{m.name}</span> <span className={'float-right text-xs ' + (m.status === 'ACTIVE' ? 'text-g pulse' : m.status === 'NEXT' ? 'text-w' : 'text-slate-400')}>● {m.status}</span></button>
      {o === m.id && <div className="mt-2 text-sm"><div className="text-slate-400 font-mono text-xs">{m.when}</div><ul className="list-disc pl-5 mt-1">{m.items.map(i => <li key={i}>{i}</li>)}</ul></div>}</div>)}</div></div>
}
export const Experience = () => <div><H t="DEPLOYMENTS" /><div className="grid xl:grid-cols-2 gap-4">{deployments.map(d => <div key={d.id} className="panel font-mono text-xs leading-6">
  <div className="text-c">DEPLOYMENT // {d.id}</div><div>ROLE <span className="text-white">{d.role}</span> · {d.client}</div><div>ENV <span className="text-white">{d.env}</span> · {d.period}</div>
  <div className={d.status === 'ACTIVE' ? 'text-g' : 'text-slate-400'}>STATUS ● {d.status}</div>
  {Object.entries(d.groups).map(([g, l]) => <div key={g} className="mt-2"><div className="text-w">{g}</div>{l.map((x, i) => <div key={x}>{i === l.length - 1 ? '└── ' : '├── '}{x}</div>)}</div>)}</div>)}</div></div>
export function Labs() {
  return <div><H t="ENGINEERING LAB" s="Select a stage in each pipeline." />{labs.map(l => <div key={l.id} className="panel mb-5"><div className="font-mono"><span className="text-g">● OPERATIONAL</span> <span className="text-c">{l.id}</span> {l.name} <span className="text-slate-400">({l.type})</span></div>
    {l.cost && <div className="my-3 font-mono"><span className="text-slate-400 text-xs">ESTIMATED MONTHLY COST </span><span className="text-w text-4xl font-bold">{l.cost}</span></div>}
    <div className="grid sm:grid-cols-2 gap-x-6 font-mono text-xs my-3">{Object.entries(l.facts).map(([k, v]) => <div key={k}><span className="text-slate-400">{k} </span>{v}</div>)}</div><Pipe steps={l.steps} /></div>)}</div>
}
export const Automation = () => <div><H t="AUTOMATION ENGINE" s="Common shape of both utilization-reporting projects." /><Pipe steps={[
  { l: 'COLLECT', d: 'EC2 and RDS utilization metrics from CloudWatch; EC2/RDS inventory in the serverless version.' },
  { l: 'PROCESS', d: 'Python tool (local, scheduled) or Lambda orchestrated by Step Functions (serverless).' },
  { l: 'GENERATE', d: 'Word and Excel reports; the local version includes graphical insights.' },
  { l: 'STORE', d: 'Serverless version stores outputs in Amazon S3 at an estimated ~$0.22 per month.' }]} /></div>
export function Skills() {
  return <div><H t="SKILL MAP" s="Levels reflect how each skill appears on the resume: listed, basic, working, or used in a role." /><div className="grid md:grid-cols-3 gap-4">{Object.entries(skills).map(([k, v]) => <div key={k} className="panel"><div className="font-mono text-g mb-2">{k}</div>
    <ul className="space-y-1">{v.map(x => { const lv = levels[x] ?? 1; return <li key={x} className="flex items-center justify-between gap-2 font-mono text-xs"><span>{x}</span><span className="flex items-center gap-1 shrink-0" title={levelLabels[lv]} aria-label={`${x}: ${levelLabels[lv]}`}>{[1, 2, 3, 4].map(n => <i key={n} className={'w-2 h-2 rounded-full ' + (n <= lv ? 'bg-g' : 'bg-slate-700')} />)}<span className="text-slate-400 w-20 text-right">{levelLabels[lv]}</span></span></li> })}</ul></div>)}</div>
    <div className="panel mt-4 font-mono text-xs"><div className="text-w">DEVOPS ROADMAP</div>CURRENT: Docker · Git · CI/CD concepts · Shell scripting (basic)<br />NEXT: DevOps engineering</div></div>
}
export const Certs = () => <div><H t="CREDENTIAL VAULT" s="Validation links are configurable in src/data/profile.ts." /><div className="grid md:grid-cols-2 gap-4">{certs.map(c => <div key={c.name} className="panel border-g/50 font-mono text-sm"><div className="text-g">✓ VERIFIED CREDENTIAL <span className="text-slate-400 text-xs">(as listed on resume)</span></div>
  <div className="text-white text-lg my-2">{c.name}</div><div>ISSUED: {c.date.toUpperCase()}</div><p className="font-sans text-slate-300 mt-2">{c.desc}</p>{c.url && <a className="text-c underline" href={c.url} rel="noopener">Validate</a>}</div>)}</div></div>
export const Resume = () => <div><H t="DOCUMENT // SUMIT_KUDDOR_RESUME" /><div className="flex gap-3 mb-3"><a className="node" href={resumeUrl} download="Sumit_Kuddor_Resume.pdf"><Download className="inline w-3 h-3" /> DOWNLOAD</a></div>
  <iframe title="Resume PDF" src={resumeUrl} className="w-full h-[60vh] rounded border border-c/30 bg-white" /></div>
export const Contact = () => <div><H t="CONNECT" /><div className="panel font-mono text-sm space-y-3"><div className="text-g">sumit@cloudops:~$ connect</div>
  {[[Mail, 'EMAIL', profile.email, 'mailto:' + profile.email], [Github, 'GITHUB', 'github.com/SumitKuddor', profile.github], [Linkedin, 'LINKEDIN', 'linkedin.com/in/sumitkuddor16', profile.linkedin]].map(([I, k, v, h]) => { const Ic = I as typeof Mail; return <div key={k as string}><div className="text-slate-400 text-xs">{k as string}</div><a className="text-c underline inline-flex gap-2 items-center" href={h as string} rel="noopener"><Ic className="w-4 h-4" />{v as string}</a></div> })}</div></div>
