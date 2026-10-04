// 1 Listed · 2 Basic · 3 Working · 4 Professional (used in a role on the resume).
// Derived from how each skill appears on the resume. Edit to match your own honest view.
export const levelLabels = ['', 'Listed', 'Basic', 'Working', 'Professional']
const linux = ['User & Group Management','File Permissions','Process Monitoring','Log Analysis','Package Management','Disk & Storage Management','Basic Networking']
export const levels: Record<string, number> = {
  EC2: 4, EBS: 4, S3: 4, IAM: 4, CloudWatch: 4, Glacier: 4, Glue: 4, Athena: 4, VPC: 4,
  RDS: 3, Lambda: 3, 'Step Functions': 3, EFS: 1,
  Docker: 2, Git: 2, 'CI/CD Concepts': 2, 'Shell Scripting (Basic)': 2,
  ...Object.fromEntries(linux.map(l => [l, 3])),
}
