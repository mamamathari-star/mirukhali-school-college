import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mirukhali.edu.bd' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@mirukhali.edu.bd',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Teachers
  const teachers = [
    { name: 'মো. আব্দুল করিম', designation: 'প্রধান শিক্ষক', subject: 'বাংলা', qualification: 'এম.এ, বি.এড', phone: '01711000001', order: 1 },
    { name: 'মো. রফিকুল ইসলাম', designation: 'সহকারী প্রধান শিক্ষক', subject: 'গণিত', qualification: 'এম.এসসি, বি.এড', phone: '01711000002', order: 2 },
    { name: 'মোসাম্মৎ নাসরিন বেগম', designation: 'সিনিয়র শিক্ষক', subject: 'ইংরেজি', qualification: 'এম.এ, বি.এড', phone: '01711000003', order: 3 },
    { name: 'মো. শফিকুল ইসলাম', designation: 'সিনিয়র শিক্ষক', subject: 'পদার্থবিজ্ঞান', qualification: 'এম.এসসি, বি.এড', phone: '01711000004', order: 4 },
    { name: 'মোসাম্মৎ রহিমা খাতুন', designation: 'সহকারী শিক্ষক', subject: 'রসায়ন', qualification: 'এম.এসসি', phone: '01711000005', order: 5 },
    { name: 'মো. জাহাঙ্গীর আলম', designation: 'সহকারী শিক্ষক', subject: 'জীববিজ্ঞান', qualification: 'এম.এসসি, বি.এড', phone: '01711000006', order: 6 },
    { name: 'মো. আনিসুর রহমান', designation: 'সহকারী শিক্ষক', subject: 'ইতিহাস', qualification: 'এম.এ, বি.এড', phone: '01711000007', order: 7 },
    { name: 'মোসাম্মৎ সালমা বেগম', designation: 'সহকারী শিক্ষক', subject: 'ভূগোল', qualification: 'এম.এ', phone: '01711000008', order: 8 },
    { name: 'মো. মিজানুর রহমান', designation: 'সহকারী শিক্ষক', subject: 'হিসাববিজ্ঞান', qualification: 'এম.কম, বি.এড', phone: '01711000009', order: 9 },
    { name: 'মো. কামরুল হাসান', designation: 'সহকারী শিক্ষক', subject: 'ব্যবসায় শিক্ষা', qualification: 'এম.বি.এ', phone: '01711000010', order: 10 },
    { name: 'মোসাম্মৎ ফাতেমা বেগম', designation: 'সহকারী শিক্ষক', subject: 'ইসলাম শিক্ষা', qualification: 'এম.এ', phone: '01711000011', order: 11 },
    { name: 'মো. হাবিবুর রহমান', designation: 'সহকারী শিক্ষক', subject: 'তথ্য প্রযুক্তি', qualification: 'বি.এসসি (কম্পিউটার)', phone: '01711000012', order: 12 },
    { name: 'মো. সিরাজুল ইসলাম', designation: 'সহকারী শিক্ষক', subject: 'শারীরিক শিক্ষা', qualification: 'বি.পি.এড', phone: '01711000013', order: 13 },
  ]
  for (const t of teachers) {
    await prisma.teacher.create({ data: { ...t, joinDate: new Date('2010-01-01'), active: true } })
  }
  console.log('✅ Teachers created:', teachers.length)

  // Students
  const students = [
    { name: 'মো. রাকিব হাসান', roll: '101', registration: '2024101001', class: '10', group: 'Science', session: '2023-24' },
    { name: 'মোসাম্মৎ সুমাইয়া আক্তার', roll: '102', registration: '2024101002', class: '10', group: 'Science', session: '2023-24' },
    { name: 'মো. তামিম ইকবাল', roll: '103', registration: '2024101003', class: '10', group: 'Commerce', session: '2023-24' },
    { name: 'মোসাম্মৎ নাফিসা খানম', roll: '104', registration: '2024101004', class: '10', group: 'Humanities', session: '2023-24' },
    { name: 'মো. সাকিব আল হাসান', roll: '201', registration: '2024091001', class: '9', group: 'Science', session: '2023-24' },
    { name: 'মোসাম্মৎ তাসনিম জাহান', roll: '202', registration: '2024091002', class: '9', group: 'Science', session: '2023-24' },
    { name: 'মো. আরিফ হোসেন', roll: '203', registration: '2024091003', class: '9', group: 'Commerce', session: '2023-24' },
    { name: 'মোসাম্মৎ মিথিলা রহমান', roll: '204', registration: '2024091004', class: '9', group: 'Humanities', session: '2023-24' },
    { name: 'মো. নাফিউল ইসলাম', roll: '301', registration: '2024111001', class: '11', group: 'Science', session: '2023-24' },
    { name: 'মোসাম্মৎ সাবরিনা আক্তার', roll: '302', registration: '2024111002', class: '11', group: 'Commerce', session: '2023-24' },
    { name: 'মো. রিয়াদ হোসেন', roll: '401', registration: '2024121001', class: '12', group: 'Science', session: '2023-24' },
    { name: 'মোসাম্মৎ নুসরাত জাহান', roll: '402', registration: '2024121002', class: '12', group: 'Humanities', session: '2023-24' },
    { name: 'মো. শাহরিয়ার হোসেন', roll: '105', registration: '2024101005', class: '10', group: 'Science', session: '2023-24' },
    { name: 'মোসাম্মৎ আফরিন সুলতানা', roll: '106', registration: '2024101006', class: '10', group: 'Commerce', session: '2023-24' },
    { name: 'মো. মাহফুজ আলম', roll: '205', registration: '2024091005', class: '9', group: 'Science', session: '2023-24' },
  ]
  const createdStudents = []
  for (const s of students) {
    const st = await prisma.student.create({ data: { ...s, active: true, phone: '01800000000', address: 'মিরুখালি, মঠবাড়িয়া, পিরোজপুর' } })
    createdStudents.push(st)
  }
  console.log('✅ Students created:', students.length)

  // Notices
  const notices = [
    { title: 'SSC পরীক্ষার সময়সূচি প্রকাশ', content: 'আগামী ২০২৪ সালের SSC পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। সকল পরীক্ষার্থীকে নির্ধারিত সময়ে পরীক্ষা কেন্দ্রে উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে। পরীক্ষা শুরু হবে ১৫ ফেব্রুয়ারি ২০২৪ তারিখ থেকে।', category: 'exam', published: true, publishedAt: new Date('2024-01-15') },
    { title: 'HSC ভর্তি বিজ্ঞপ্তি ২০২৪', content: '২০২৪-২৫ শিক্ষাবর্ষে একাদশ শ্রেণিতে ভর্তির জন্য আবেদন শুরু হয়েছে। আগ্রহী শিক্ষার্থীরা বিদ্যালয় অফিসে যোগাযোগ করুন। ভর্তির শেষ তারিখ ৩০ জুন ২০২৪।', category: 'admission', published: true, publishedAt: new Date('2024-02-01') },
    { title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৪', content: 'আগামী ১৫ মার্চ ২০২৪ তারিখে বিদ্যালয়ের বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল ছাত্র-ছাত্রীকে অংশগ্রহণের জন্য আমন্ত্রণ জানানো হচ্ছে।', category: 'event', published: true, publishedAt: new Date('2024-03-01') },
    { title: 'JSC/JDC পরীক্ষার ফলাফল প্রকাশ', content: 'জুনিয়র স্কুল সার্টিফিকেট (JSC) পরীক্ষার ফলাফল প্রকাশিত হয়েছে। এবছর আমাদের বিদ্যালয়ের ৯৮% শিক্ষার্থী পাস করেছে এবং ২৫ জন A+ পেয়েছে।', category: 'result', published: true, publishedAt: new Date('2024-01-01') },
    { title: 'শ্রেণি পরীক্ষার সময়সূচি', content: 'আগামী মাসে অনুষ্ঠিতব্য প্রথম সাময়িক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। সকল শিক্ষার্থী নিয়মিত ক্লাসে উপস্থিত থাকুন এবং পরীক্ষার প্রস্তুতি নিন।', category: 'exam', published: true, publishedAt: new Date('2024-03-15') },
    { title: 'অভিভাবক সভার নোটিশ', content: 'আগামী ২০ এপ্রিল ২০২৪ তারিখে বিদ্যালয়ে অভিভাবক সভা অনুষ্ঠিত হবে। সকল অভিভাবককে উপস্থিত থাকার জন্য বিনীত অনুরোধ করা হচ্ছে।', category: 'general', published: true, publishedAt: new Date('2024-04-10') },
  ]
  for (const n of notices) {
    await prisma.notice.create({ data: { ...n, authorId: admin.id } })
  }
  console.log('✅ Notices created:', notices.length)

  // Results
  const results = [
    { studentId: createdStudents[0].id, exam: 'SSC', year: '2023', class: '10', group: 'Science', roll: '101', registration: '2024101001', gpa: 5.0, grade: 'A+', subjects: JSON.stringify([{ name: 'Bangla', gpa: 5.0 }, { name: 'English', gpa: 5.0 }, { name: 'Mathematics', gpa: 5.0 }, { name: 'Physics', gpa: 5.0 }, { name: 'Chemistry', gpa: 5.0 }]), verified: true },
    { studentId: createdStudents[1].id, exam: 'SSC', year: '2023', class: '10', group: 'Science', roll: '102', registration: '2024101002', gpa: 4.83, grade: 'A', subjects: JSON.stringify([{ name: 'Bangla', gpa: 5.0 }, { name: 'English', gpa: 4.5 }, { name: 'Mathematics', gpa: 5.0 }, { name: 'Physics', gpa: 4.75 }, { name: 'Chemistry', gpa: 4.5 }]), verified: true },
    { studentId: createdStudents[2].id, exam: 'SSC', year: '2023', class: '10', group: 'Commerce', roll: '103', registration: '2024101003', gpa: 4.5, grade: 'A', subjects: JSON.stringify([{ name: 'Bangla', gpa: 4.5 }, { name: 'English', gpa: 4.25 }, { name: 'Accounting', gpa: 5.0 }, { name: 'Business', gpa: 4.25 }]), verified: true },
    { studentId: createdStudents[10].id, exam: 'HSC', year: '2023', class: '12', group: 'Science', roll: '401', registration: '2024121001', gpa: 4.92, grade: 'A+', subjects: JSON.stringify([{ name: 'Bangla', gpa: 5.0 }, { name: 'English', gpa: 4.75 }, { name: 'Physics', gpa: 5.0 }, { name: 'Chemistry', gpa: 4.75 }, { name: 'Mathematics', gpa: 5.0 }]), verified: true },
    { studentId: createdStudents[11].id, exam: 'HSC', year: '2023', class: '12', group: 'Humanities', roll: '402', registration: '2024121002', gpa: 4.58, grade: 'A', subjects: JSON.stringify([{ name: 'Bangla', gpa: 4.75 }, { name: 'English', gpa: 4.5 }, { name: 'History', gpa: 4.5 }, { name: 'Geography', gpa: 4.5 }]), verified: true },
  ]
  for (const r of results) {
    await prisma.result.create({ data: r })
  }
  console.log('✅ Results created:', results.length)

  // Committee members
  const committee = [
    { name: 'জনাব মো. আব্দুল মান্নান', designation: 'সভাপতি', role: 'President', phone: '01711100001', order: 1 },
    { name: 'জনাব মো. কামরুজ্জামান', designation: 'সহ-সভাপতি', role: 'Vice President', phone: '01711100002', order: 2 },
    { name: 'জনাব মো. নুরুল ইসলাম', designation: 'সাধারণ সম্পাদক', role: 'Secretary', phone: '01711100003', order: 3 },
    { name: 'জনাব মো. রমিজ উদ্দিন', designation: 'কোষাধ্যক্ষ', role: 'Treasurer', phone: '01711100004', order: 4 },
    { name: 'জনাব মো. আলাউদ্দিন', designation: 'সদস্য', role: 'Member', phone: '01711100005', order: 5 },
    { name: 'বেগম রাহেলা বেগম', designation: 'সদস্য', role: 'Member', phone: '01711100006', order: 6 },
  ]
  for (const c of committee) {
    await prisma.committeeMember.create({ data: { ...c, active: true } })
  }
  console.log('✅ Committee members created:', committee.length)

  // Facilities
  const facilities = [
    { name: 'পাঠাগার', description: 'বিদ্যালয়ে একটি সমৃদ্ধ পাঠাগার রয়েছে যেখানে ৫০০০+ বই সংগ্রহ আছে। শিক্ষার্থীরা নিয়মিত পাঠাগার ব্যবহার করতে পারে।', icon: 'BookOpen', category: 'academic', order: 1 },
    { name: 'কম্পিউটার ল্যাব', description: '১৫টি আধুনিক কম্পিউটার সম্বলিত কম্পিউটার ল্যাব। শিক্ষার্থীরা এখানে তথ্য প্রযুক্তি শিক্ষা গ্রহণ করে।', icon: 'Monitor', category: 'technology', order: 2 },
    { name: 'বিজ্ঞান গবেষণাগার', description: 'আধুনিক যন্ত্রপাতি সম্বলিত বিজ্ঞান গবেষণাগার যেখানে পদার্থ, রসায়ন ও জীববিজ্ঞানের ব্যবহারিক ক্লাস নেওয়া হয়।', icon: 'FlaskConical', category: 'academic', order: 3 },
    { name: 'খেলার মাঠ', description: 'বিশাল খেলার মাঠে ক্রিকেট, ফুটবল সহ বিভিন্ন খেলাধুলার ব্যবস্থা রয়েছে।', icon: 'Trophy', category: 'sports', order: 4 },
    { name: 'মসজিদ', description: 'বিদ্যালয় প্রাঙ্গণে একটি মসজিদ রয়েছে যেখানে শিক্ষক-শিক্ষার্থীরা নামাজ আদায় করতে পারেন।', icon: 'Building', category: 'welfare', order: 5 },
    { name: 'শিক্ষক মিলনায়তন', description: 'শিক্ষকদের বিশ্রাম ও আলোচনার জন্য একটি সুসজ্জিত কক্ষ রয়েছে।', icon: 'Users', category: 'welfare', order: 6 },
  ]
  for (const f of facilities) {
    await prisma.facility.create({ data: { ...f, active: true } })
  }
  console.log('✅ Facilities created:', facilities.length)

  // Gallery items
  const gallery = [
    { title: 'বিদ্যালয় ভবন', description: 'মিরুখালি স্কুল ও কলেজের মূল ভবন', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', category: 'campus', published: true },
    { title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা', description: '২০২৪ সালের বার্ষিক ক্রীড়া প্রতিযোগিতা', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', category: 'sports', published: true },
    { title: 'বিজ্ঞান মেলা', description: 'জাতীয় বিজ্ঞান সপ্তাহ উপলক্ষে বিজ্ঞান মেলা', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543559059de5?w=800', category: 'academic', published: true },
    { title: 'সাংস্কৃতিক অনুষ্ঠান', description: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান ২০২৩', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', category: 'cultural', published: true },
    { title: 'পুরস্কার বিতরণী', description: 'মেধাবী শিক্ষার্থীদের পুরস্কার বিতরণী অনুষ্ঠান', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', category: 'academic', published: true },
    { title: 'কম্পিউটার ল্যাব', description: 'বিদ্যালয়ের অত্যাধুনিক কম্পিউটার ল্যাব', imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800', category: 'campus', published: true },
  ]
  for (const g of gallery) {
    await prisma.galleryItem.create({ data: g })
  }
  console.log('✅ Gallery items created:', gallery.length)

  // Settings
  const settings = [
    { key: 'school_name', value: 'মিরুখালি স্কুল ও কলেজ', type: 'text', group: 'general' },
    { key: 'school_name_en', value: 'Mirukhali School & College', type: 'text', group: 'general' },
    { key: 'eiin', value: '102726', type: 'text', group: 'general' },
    { key: 'established', value: '01 January 1937', type: 'text', group: 'general' },
    { key: 'phone', value: '01716213807', type: 'text', group: 'contact' },
    { key: 'phone_alt', value: '01309102726', type: 'text', group: 'contact' },
    { key: 'address', value: 'মিরুখালি, মঠবাড়িয়া, পিরোজপুর, বরিশাল, বাংলাদেশ', type: 'text', group: 'contact' },
    { key: 'address_en', value: 'Mirukhali, Mathbaria, Pirojpur, Barishal, Bangladesh', type: 'text', group: 'contact' },
    { key: 'email', value: 'info@mirukhali.edu.bd', type: 'text', group: 'contact' },
    { key: 'student_count', value: '679', type: 'number', group: 'stats' },
    { key: 'teacher_count', value: '13', type: 'number', group: 'stats' },
    { key: 'staff_count', value: '4', type: 'number', group: 'stats' },
    { key: 'first_headmaster', value: 'Khitish Chandra Chowdhury', type: 'text', group: 'history' },
    { key: 'institute_level', value: 'Higher Secondary', type: 'text', group: 'general' },
    { key: 'management', value: 'Private MPO enlisted', type: 'text', group: 'general' },
    { key: 'gender', value: 'Co-Education', type: 'text', group: 'general' },
  ]
  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
  }
  console.log('✅ Settings created:', settings.length)

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
