import { profile, skills, education, certs } from '../data/profile'
export type View = 'overview'|'aws'|'journey'|'experience'|'labs'|'automation'|'skills'|'certs'|'resume'|'contact'
export type Result = { out: string[]; view?: View; fx?: 'matrix'|'clear' }
export const names = ['help','whoami','profile','about','journey','experience','projects','skills','aws','linux','automation','certifications','education','contact','resume','neofetch','status','ls','pwd','clear','matrix','coffee','sudo about']
const who = ['SUMIT KUDDOR','AWS CLOUD ENGINEER','','FOCUS:','  Cloud Infrastructure','  AWS','  Linux','  Automation','  Toward DevOps']
export function run(raw: string): Result {
  const c = raw.trim().toLowerCase()
  switch (c) {
    case '': return { out: [] }
    case 'help': return { out: ['Commands: ' + names.filter(n => n !== 'sudo about').join(', '), 'Tab completes, ↑/↓ browse history.'] }
    case 'whoami': case 'profile': return { out: who, view: 'overview' }
    case 'about': case 'sudo about': return { out: [profile.summary], view: 'overview' }
    case 'status': return { out: ['SYSTEM   ONLINE','AWS      ACTIVE','LINUX    ACTIVE','AUTOMATION ACTIVE','PROFILE  AVAILABLE'], view: 'overview' }
    case 'journey': return { out: ['Opening mission control...'], view: 'journey' }
    case 'experience': return { out: ['Listing deployments...'], view: 'experience' }
    case 'projects': return { out: ['Entering engineering lab...'], view: 'labs' }
    case 'skills': return { out: [...Object.entries(skills).map(([k, v]) => `${k}: ${v.join(', ')}`)], view: 'skills' }
    case 'aws': return { out: ['Loading AWS infrastructure view...'], view: 'aws' }
    case 'linux': return { out: ['$ ls skills/linux', ...skills['Linux Administration'].map(s => '  ' + s.toLowerCase().replace(/ & | /g, '-'))], view: 'skills' }
    case 'automation': return { out: ['Starting automation engine...'], view: 'automation' }
    case 'certifications': return { out: certs.map(x => `${x.date.padEnd(14)} ${x.name}`), view: 'certs' }
    case 'education': return { out: education.map(e => `${e.years}  ${e.name}, ${e.where}, ${e.score}`) }
    case 'contact': return { out: [profile.email, profile.github, profile.linkedin], view: 'contact' }
    case 'resume': return { out: ['Opening DOCUMENT // SUMIT_KUDDOR_RESUME'], view: 'resume' }
    case 'ls': return { out: ['overview/  journey/  experience/  projects/  skills/  aws/  automation/  certs/  resume.pdf'] }
    case 'pwd': return { out: ['/home/sumit/cloudops'] }
    case 'neofetch': return { out: ['__NEOFETCH__'] }
    case 'clear': return { out: [], fx: 'clear' }
    case 'matrix': return { out: ['Wake up, recruiter... (visual effect only)'], fx: 'matrix' }
    case 'coffee': return { out: ['   ( (','    ) )','  ........','  |      |]','  \\      /','   `----\'','Brewing... (nothing real runs here)'] }
    default: return { out: [`command not found: ${raw.trim().slice(0, 40)}. Type "help".`] }
  }
}
