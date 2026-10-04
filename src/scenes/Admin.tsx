import { useState } from 'react'
import { getAdminFeedback, type FeedbackItem } from '../lib/api'
export default function Admin() {
  const [key, setKey] = useState(''); const [items, setItems] = useState<FeedbackItem[] | null>(null); const [err, setErr] = useState('')
  const load = async () => { setErr(''); try { setItems(await getAdminFeedback(key)) } catch { setErr('Access denied, or the backend is not configured.') } }
  return (
    <div className="max-w-3xl">
      <h2 className="font-mono text-g text-lg mb-3">// PRIVATE: FEEDBACK INBOX</h2>
      {items === null ? (
        <div className="panel space-y-3"><label className="block text-sm">Admin key<input type="password" value={key} onChange={e => setKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} autoComplete="off" className="mt-1 w-full bg-bg border border-c/30 rounded p-2 text-white" /></label>
          <button className="node" onClick={load}>UNLOCK</button>{err && <div className="text-d text-sm">{err}</div>}</div>
      ) : items.length === 0 ? <div className="panel">No feedback yet.</div> : (
        <div className="space-y-3">{items.map(i => <div key={i.ts} className="panel text-sm"><div className="font-mono text-xs text-slate-400">{new Date(i.ts).toLocaleString()} {i.name && '· ' + i.name}</div>
          <div className="text-w">{'★'.repeat(i.rating)}{'☆'.repeat(5 - i.rating)} <span className="text-c font-mono text-xs">{i.feel}</span></div>{i.improve && <p className="mt-1 text-slate-200">{i.improve}</p>}</div>)}</div>)}
    </div>)
}
