const API = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')
export const apiEnabled = !!API
export type Stats = { visits: number; ratingCount: number; ratingAvg: number }
// Counts a visit once per browser session. Stores no personal data.
export async function trackVisit() {
  if (!API || sessionStorage.getItem('visited')) return
  sessionStorage.setItem('visited', '1')
  try { await fetch(API + '/visit', { method: 'POST' }) } catch { /* ignore */ }
}
export async function getStats(): Promise<Stats | null> {
  if (!API) return null
  try { const r = await fetch(API + '/stats'); return r.ok ? await r.json() : null } catch { return null }
}
export async function sendFeedback(body: object) {
  if (!API) throw new Error('API not configured')
  const r = await fetch(API + '/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!r.ok) throw new Error('Request failed')
}
