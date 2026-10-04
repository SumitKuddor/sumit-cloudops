// All facts come from the resume. Edit here to update the site.
export const profile = {
  name: 'Sumit Kuddor', role: 'AWS Cloud Engineer', location: 'Mumbai, Maharashtra',
  email: 'sumitkuddor555@gmail.com', github: 'https://github.com/SumitKuddor',
  linkedin: 'https://www.linkedin.com/in/sumitkuddor16',
  summary: 'AWS Cloud Engineer with 1+ year of experience in cloud infrastructure management, server provisioning, monitoring, and security compliance. Hands-on expertise in EC2, S3, IAM, VPC, and CloudWatch. AWS Certified Solutions Architect – Associate with strong Linux administration and automation skills.',
}
export const certs = [
  { name: 'AWS Certified Solutions Architect – Associate', date: 'March 2026', desc: 'AWS architecture, core services, security, and cost optimization. Designing scalable, secure, highly available cloud solutions.', url: '' },
  { name: 'AWS Certified Cloud Practitioner', date: 'January 2025', desc: 'Foundational AWS concepts, core services, security, and pricing models.', url: '' },
] // put validation links in `url`
export const skills: Record<string, string[]> = {
  'AWS Cloud': ['EC2','EBS','EFS','S3','Glacier','VPC','IAM','RDS','CloudWatch','Lambda','Step Functions','Glue','Athena'],
  'Linux Administration': ['User & Group Management','File Permissions','Process Monitoring','Log Analysis','Package Management','Disk & Storage Management','Basic Networking'],
  'DevOps (Basic)': ['Docker','Git','CI/CD Concepts','Shell Scripting (Basic)'],
}
export const education = [
  { years: '2021–2024', name: "Bachelor's of Computer Application (BCA)", where: 'Tilak Maharashtra Vidyapeeth', score: '67.80% | CGPA 7.17' },
  { years: '2019–2021', name: 'Computer Technology (Class XII)', where: 'Tulsi Technical Institute (VES)', score: '74.50%' },
]
export const logs = [
  '[BOOT] CloudOps environment initialized','[INFO] AWS profile loaded','[INFO] Linux environment loaded',
  '[OK]   2025-01 AWS Certified Cloud Practitioner verified','[INFO] 2025-03 Applied Cloud Computing started',
  '[INFO] Cloud Support Engineer (3 months)','[INFO] AWS Cloud Engineer, PFL (6 months)',
  '[ACTIVE] AWS Cloud Engineer, Mindgate UPI infrastructure','[OK]   2026-03 AWS Certified Solutions Architect – Associate verified',
  '[INFO] Automation projects loaded','[READY] Sumit CloudOps online',
]
