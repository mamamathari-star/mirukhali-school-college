'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search, Loader2, Trophy, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

const searchSchema = z.object({
  roll: z.string().optional(),
  registration: z.string().optional(),
  year: z.string().min(4, 'সাল দিন'),
  exam: z.string().min(1, 'পরীক্ষার ধরন দিন'),
}).refine((d) => d.roll || d.registration, { message: 'রোল নম্বর বা রেজিস্ট্রেশন নম্বর দিন', path: ['roll'] })

type SearchForm = z.infer<typeof searchSchema>

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  })

  const onSubmit = async (data: SearchForm) => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (data.roll) params.set('roll', data.roll)
      if (data.registration) params.set('registration', data.registration)
      params.set('year', data.year)
      params.set('exam', data.exam)

      const res = await fetch(`/api/public/results?${params}`)
      const json = await res.json()
      setResults(json.results || [])
      setSearched(true)
    } catch {
      setError('ফলাফল খুঁজে পাওয়া যাচ্ছে না')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">পরীক্ষার ফলাফল</h1>
          <p className="text-blue-200">রোল নম্বর বা রেজিস্ট্রেশন নম্বর দিয়ে ফলাফল খুঁজুন</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              ফলাফল অনুসন্ধান
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exam">পরীক্ষার ধরন *</Label>
                  <Select onValueChange={(v) => setValue('exam', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="পরীক্ষা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SSC">SSC</SelectItem>
                      <SelectItem value="HSC">HSC</SelectItem>
                      <SelectItem value="JSC">JSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">সাল *</Label>
                  <Input id="year" placeholder="যেমন: 2024" {...register('year')} />
                  {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roll">রোল নম্বর</Label>
                  <Input id="roll" placeholder="রোল নম্বর" {...register('roll')} />
                </div>
                <div>
                  <Label htmlFor="registration">রেজিস্ট্রেশন নম্বর</Label>
                  <Input id="registration" placeholder="রেজিস্ট্রেশন নম্বর" {...register('registration')} />
                </div>
              </div>
              {errors.roll && <p className="text-red-500 text-xs">{errors.roll.message}</p>}
              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-800" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> খোঁজা হচ্ছে...</>
                ) : (
                  <><Search className="mr-2 h-4 w-4" /> ফলাফল দেখুন</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searched && results.length === 0 && !error && (
          <div className="text-center py-8 text-gray-400">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>কোনো ফলাফল পাওয়া যায়নি</p>
          </div>
        )}

        {results.map((result) => (
          <Card key={result.id} className="mb-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{result.student?.name || 'শিক্ষার্থী'}</h3>
                  <p className="text-gray-500 text-sm">রোল: {result.roll} | রেজি: {result.registration}</p>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${result.gpa >= 5 ? 'text-green-600' : result.gpa >= 4 ? 'text-blue-600' : 'text-amber-600'}`}>
                    {result.gpa?.toFixed(2)}
                  </div>
                  <Badge variant={result.grade === 'A+' ? 'success' : 'default'}>{result.grade}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                <div><span className="font-medium">পরীক্ষা:</span> {result.exam}</div>
                <div><span className="font-medium">সাল:</span> {result.year}</div>
                <div><span className="font-medium">শ্রেণি:</span> {result.class}</div>
                {result.group && <div><span className="font-medium">বিভাগ:</span> {result.group}</div>}
              </div>
              {result.subjects && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">বিষয়ভিত্তিক ফলাফল:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {(typeof result.subjects === 'string' ? JSON.parse(result.subjects) : result.subjects).map((s: { name: string; gpa: number }) => (
                      <div key={s.name} className="flex justify-between text-sm bg-gray-50 px-3 py-1.5 rounded">
                        <span className="text-gray-600">{s.name}</span>
                        <span className="font-semibold text-blue-700">{s.gpa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
