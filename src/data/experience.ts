export const deployments: { id: string; client: string; role: string; env: string; status: string; period: string; groups: Record<string, string[]> }[] = [
  { id: 'UPI-INFRASTRUCTURE', client: 'Mindgate Solutions', role: 'AWS Cloud Engineer', env: 'AWS / PRODUCTION', status: 'ACTIVE', period: 'Current project',
    groups: { MONITORING: ['EC2 instances and application health','CloudWatch alarms and log analysis'],
      DATA: ['Transaction logs in S3 analysed with Glue and Athena','Archived logs retrieved from Glacier (audit, compliance)'],
      OPERATIONS: ['Managing UPI production infrastructure (availability, reliability)','Network troubleshooting, incidents within SLA','Resource tagging strategy (cost visibility, governance)','Disk space management, proactive maintenance'] } },
  { id: 'PFL-POONAWALLA-FINCORP', client: 'Poonawalla Fincorp Project', role: 'AWS Cloud Engineer', env: 'AWS / PRODUCTION + UAT', status: 'COMPLETE', period: '6 months',
    groups: { COMPUTE: ['Provisioned Linux & Windows EC2 instances','Patching on Linux and Windows servers'], STORAGE: ['EBS volumes, snapshots','S3 buckets for secure data storage'],
      SECURITY: ['Resolved VAPT findings: security hardening, IAM policy improvements'], COST: ['Tagging and periodic resource review'] } },
  { id: 'CLOUD-SUPPORT', client: 'Applied Cloud Computing', role: 'Cloud Support Engineer', env: 'AWS / SUPPORT', status: 'COMPLETE', period: '3 months',
    groups: { MONITORING: ['Infrastructure, alerts, system health (99%+ uptime)'], SERVICE: ['Incidents and service requests','Cross-functional coordination','Basic application/server troubleshooting'], REPORTING: ['Monitoring reports','Server inventory'] } },
]
