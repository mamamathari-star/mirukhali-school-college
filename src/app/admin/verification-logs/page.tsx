import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDateTime } from '@/lib/utils'

export default async function VerificationLogsPage() {
  const logs = await prisma.verificationLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 100,
    include: { certificate: { select: { certificateId: true } } },
  })

  return (
    <div>
      <PageHeader title="যাচাই লগ" description="সনদ যাচাইয়ের ইতিহাস" />
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>সময়</TableHead>
              <TableHead>সার্টিফিকেট ID</TableHead>
              <TableHead>রোল</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>ফলাফল</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-xs">{formatDateTime(log.timestamp)}</TableCell>
                <TableCell className="font-mono text-xs">{log.certificate?.certificateId||'-'}</TableCell>
                <TableCell>{log.roll||'-'}</TableCell>
                <TableCell className="text-xs text-gray-500">{log.ip||'-'}</TableCell>
                <TableCell><Badge variant={log.success?'success':'destructive'}>{log.success?'সফল':'ব্যর্থ'}</Badge></TableCell>
              </TableRow>
            ))}
            {logs.length===0&&(<TableRow><TableCell colSpan={5} className="text-center py-8 text-gray-400">কোনো লগ নেই</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
