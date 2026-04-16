'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Search, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const verifySchema = z.object({
  query: z.string().min(3, 'অনুগ্রহ করে সার্টিফিকেট আইডি বা হ্যাশ কোড দিন'),
})
type VerifyForm = z.infer<typeof verifySchema>

export default function VerifyPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: VerifyForm) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/public/verify?query=${encodeURIComponent(data.query)}`)
      const json = await res.json()
      setResult(json)
      setVerified(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">সনদ যাচাই</h1>
          <p className="text-blue-200">Certificate Verification System</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>সনদপত্র যাচাই করুন</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>সার্টিফিকেট আইডি / যাচাই কোড</Label>
                <Input
                  placeholder="MHC-2024-XXXXXX বা হ্যাশ কোড দিন"
                  {...register('query')}
                />
                {errors.query && <p className="text-red-500 text-xs mt-1">{errors.query.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-800" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> যাচাই হচ্ছে...</>
                ) : (
                  <><Search className="mr-2 h-4 w-4" /> যাচাই করুন</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {verified && result && (
          <Card className={`mt-6 border-2 ${result.valid ? 'border-green-500' : 'border-red-500'}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {result.valid ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
                    {result.valid ? 'সনদ বৈধ' : 'সনদ অবৈধ বা পাওয়া যায়নি'}
                  </h3>
                </div>
              </div>
              {result.valid && result.certificate && (
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="font-medium text-gray-600">সার্টিফিকেট আইডি:</span>
                      <p>{result.certificate.certificateId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">ধরন:</span>
                      <p>{result.certificate.type}</p>
                    </div>
                    {result.certificate.student && (
                      <>
                        <div>
                          <span className="font-medium text-gray-600">শিক্ষার্থীর নাম:</span>
                          <p>{result.certificate.student.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">রোল নম্বর:</span>
                          <p>{result.certificate.student.roll}</p>
                        </div>
                      </>
                    )}
                    {result.certificate.result && (
                      <>
                        <div>
                          <span className="font-medium text-gray-600">পরীক্ষা:</span>
                          <p>{result.certificate.result.exam} {result.certificate.result.year}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">GPA:</span>
                          <p className="font-bold text-blue-700">{result.certificate.result.gpa}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <span className="font-medium text-gray-600">ইস্যু তারিখ:</span>
                      <p>{new Date(result.certificate.issuedAt).toLocaleDateString('bn-BD')}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">অবস্থা:</span>
                      <p><Badge variant="success">বৈধ</Badge></p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
