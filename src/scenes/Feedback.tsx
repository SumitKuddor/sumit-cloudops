import { useState } from 'react'
import { Star } from 'lucide-react'
import { profile } from '../data/profile'
import { apiEnabled, sendFeedback } from '../lib/api'
const feels = ['Impressive', 'Clear', 'Creative', 'Confusing', 'Too heavy']
export default function Feedback() {
  const [rating, setRating] = useState(0); const [feel, setFeel] = useState(''); const [improve, setImprove] = useState('')
  const [name, setName] = useState(''); const [hp, setHp] = useState(''); const [ok, setOk] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const submit = async () => {
    setState('sending')
    try { await sendFeedback({ rating, feel, improve, name, website: hp }); setState('done') } catch { setState('error') }
  }
  return (
    <div className="max-w-xl">
      <h2 className="font-mono text-g text-lg mb-1">// FEEDBACK</h2>
      <p className="text-slate-400 text-sm mb-4">How does this profile feel, and what should I improve? Everything except the rating is optional.</p>
      {!apiEnabled && <div className="panel mb-4 text-w text-sm">Feedback form not configured yet (set VITE_FORM_URL at build time). See README.</div>}
      {state === 'done' ? <div className="panel font-mono space-y-3"><div className="text-g">✓ Thanks, feedback received.</div><p className="text-slate-300 text-sm font-sans">If you liked what you saw, let's connect.</p><a className="node inline-block" href={profile.linkedin} target="_blank" rel="noopener noreferrer">CONNECT ON LINKEDIN</a></div> : (
        <div className="panel space-y-4">
          <div role="radiogroup" aria-label="Rating" className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setRating(n)}><Star className={'w-7 h-7 ' + (n <= rating ? 'text-w fill-w' : 'text-slate-500')} /></button>)}</div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="How does it feel">{feels.map(f => <button key={f} aria-pressed={feel === f} onClick={() => setFeel(feel === f ? '' : f)} className={'node !min-w-0 ' + (feel === f ? 'sel' : '')}>{f}</button>)}</div>
          <label className="block text-sm">What can I improve?<textarea value={improve} maxLength={1000} onChange={e => setImprove(e.target.value)} rows={4} className="mt-1 w-full bg-bg border border-c/30 rounded p-2 text-white" /></label>
          <label className="block text-sm">Name (optional)<input value={name} maxLength={80} onChange={e => setName(e.target.value)} className="mt-1 w-full bg-bg border border-c/30 rounded p-2 text-white" /></label>
          <input value={hp} onChange={e => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          <label className="flex gap-2 text-xs text-slate-400"><input type="checkbox" checked={ok} onChange={e => setOk(e.target.checked)} />I agree my rating and any text I type are stored so Sumit can read them. Nothing else about me is collected.</label>
          <button disabled={!rating || !ok || !apiEnabled || state === 'sending'} onClick={submit} className="node disabled:opacity-40">{state === 'sending' ? 'SENDING...' : 'SUBMIT FEEDBACK'}</button>
          {state === 'error' && <div className="text-d text-sm">Could not send. Please try again later.</div>}
        </div>)}
    </div>)
}
