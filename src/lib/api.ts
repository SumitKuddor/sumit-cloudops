// Free, no-backend setup: feedback goes to a Formspree form that emails the site owner.
const FORM = import.meta.env.VITE_FORM_URL as string | undefined
export const apiEnabled = !!FORM
export async function sendFeedback(body: Record<string, unknown>) {
  if (!FORM) throw new Error('Form not configured')
  const r = await fetch(FORM, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
  if (!r.ok) throw new Error('Request failed')
}
