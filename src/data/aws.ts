export type Svc = { x: number; y: number; group: string; refs: string[]; ctx: string }
export const services: Record<string, Svc> = {
  AWS: { x: 300, y: 28, group: 'Platform', refs: ['Whole profile'], ctx: 'Cloud platform I work on professionally.' },
  EC2: { x: 70, y: 110, group: 'Compute', refs: ['Mindgate', 'PFL', 'Cloud Support', 'Both projects'], ctx: 'Provisioning Linux & Windows instances, health monitoring, utilization metrics.' },
  EBS: { x: 30, y: 200, group: 'Storage', refs: ['PFL'], ctx: 'Volumes and snapshots.' },
  EFS: { x: 30, y: 290, group: 'Storage', refs: ['Technical skills'], ctx: 'Listed in skills only; no specific project on the resume.' },
  RDS: { x: 130, y: 200, group: 'Database', refs: ['Skills', 'Both projects'], ctx: 'Utilization metrics and inventory in the automation projects.' },
  VPC: { x: 215, y: 110, group: 'Network', refs: ['Summary', 'Skills'], ctx: 'Named in the professional summary; network troubleshooting at Mindgate.' },
  IAM: { x: 320, y: 110, group: 'Security', refs: ['PFL', 'Both projects'], ctx: 'Policy improvements for VAPT findings; least-privilege access for automation.' },
  CloudWatch: { x: 425, y: 110, group: 'Monitoring', refs: ['Mindgate', 'Cloud Support', 'Both projects'], ctx: 'Alarms, log analysis, utilization metrics.' },
  Lambda: { x: 380, y: 200, group: 'Compute', refs: ['Serverless project'], ctx: 'Serverless utilization reporting.' },
  'Step Functions': { x: 380, y: 290, group: 'Orchestration', refs: ['Serverless project'], ctx: 'Orchestrates the reporting workflow.' },
  S3: { x: 530, y: 110, group: 'Storage', refs: ['PFL', 'Mindgate', 'Serverless project'], ctx: 'Secure data storage, transaction logs, report outputs.' },
  Glacier: { x: 570, y: 200, group: 'Storage', refs: ['Mindgate'], ctx: 'Retrieving archived logs for audit and compliance.' },
  Glue: { x: 490, y: 200, group: 'Analytics', refs: ['Mindgate'], ctx: 'Analysing transaction logs stored in S3.' },
  Athena: { x: 490, y: 290, group: 'Analytics', refs: ['Mindgate'], ctx: 'Analysing transaction logs stored in S3.' },
}
export const edges: [string, string][] = [['AWS','EC2'],['AWS','VPC'],['AWS','IAM'],['AWS','CloudWatch'],['AWS','S3'],['EC2','EBS'],['EC2','RDS'],['EBS','EFS'],['CloudWatch','Lambda'],['Lambda','Step Functions'],['S3','Glacier'],['S3','Glue'],['Glue','Athena']]
