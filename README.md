# মিরুখালী স্কুল এন্ড কলেজ - ওয়েবসাইট

Mirukhali School & College - Full PHP Website  
EIIN: 102726

## প্রকল্প সম্পর্কে

এটি মিরুখালী স্কুল এন্ড কলেজের অফিসিয়াল ওয়েবসাইট প্রকল্প। PHP, HTML, CSS ও JavaScript দিয়ে তৈরি। কোনো ডাটাবেস প্রয়োজন নেই। সরাসরি cPanel/shared hosting এ আপলোড করে ব্যবহার করা যাবে।

## বৈশিষ্ট্য

- ৫০+ পেইজ সহ সম্পূর্ণ ওয়েবসাইট
- রেসপন্সিভ ডিজাইন (মোবাইল, ট্যাবলেট, ডেস্কটপ)
- ফটো গ্যালারি (ক্যাটাগরি ফিল্টার ও লাইটবক্স সহ)
- নোটিশ বোর্ড সিস্টেম
- যোগাযোগ ফর্ম (PHP mail)
- নিউজ টিকার
- ইমেজ স্লাইডার
- XSS সুরক্ষা (htmlspecialchars)
- সাবফোল্ডার সাপোর্ট (auto base_url detection)

## cPanel এ আপলোড করার নিয়ম

1. **ZIP ফাইলটি ডাউনলোড করুন**
2. **cPanel → File Manager → public_html ফোল্ডারে যান**
3. **Upload ক্লিক করে ZIP ফাইলটি আপলোড করুন**
4. **ZIP ফাইলে রাইট ক্লিক → Extract করুন**
5. **ওয়েবসাইট রেডি!** yourdomain.com এ ভিজিট করুন

### সাবফোল্ডারে ইনস্টল (public_html/mssac/)

1. public_html এর ভেতরে `mssac` নামে ফোল্ডার তৈরি করুন
2. সব ফাইল `mssac` ফোল্ডারে আপলোড/এক্সট্রাক্ট করুন
3. yourdomain.com/mssac/ এ ভিজিট করুন
4. base_url স্বয়ংক্রিয়ভাবে সেট হবে

## লোকালভাবে চালানোর নিয়ম (XAMPP/Laragon)

1. XAMPP বা Laragon ইনস্টল করুন
2. প্রজেক্ট ফোল্ডারটি `htdocs/mssac/` এ কপি করুন
3. Apache চালু করুন
4. ব্রাউজারে `http://localhost/mssac/` ভিজিট করুন

## লোগো পরিবর্তন

1. নতুন হেডার ইমেজ তৈরি করুন
2. `assets/logo/Mirukhali.png` ফাইলটি নতুন ইমেজ দিয়ে রিপ্লেস করুন
3. ফেভিকন: `assets/logo/fevicon.png` রিপ্লেস করুন

## নোটিশ আপডেট

`data/notices.php` ফাইল এডিট করুন:

```php
$notices = [
    [
        'id' => 9,
        'title' => 'নতুন নোটিশের শিরোনাম',
        'date' => '১৫ জানুয়ারী, ২০২৫',
        'month' => 'জানু',
        'year' => '২০২৫',
        'content' => 'নোটিশের বিস্তারিত বিবরণ এখানে লিখুন।',
        'file' => ''
    ],
    // ... আগের নোটিশগুলো
];
```

## শিক্ষক তথ্য আপডেট

`data/teachers.php` ফাইল এডিট করুন:

```php
$teachers = [
    [
        'name' => 'শিক্ষকের নাম',
        'designation' => 'পদবি',
        'subject' => 'বিষয়',
        'image' => 'assets/images/teachers/teacher-name.jpg'
    ],
    // ...
];
```

## গ্যালারি আপডেট

1. নতুন ছবি `assets/gallery/` ফোল্ডারে রাখুন
2. `data/gallery.php` ফাইলে এন্ট্রি যোগ করুন:

```php
$gallery_images = [
    [
        'file' => 'assets/gallery/new-photo.jpg',
        'title' => 'ছবির শিরোনাম',
        'category' => 'প্রতিষ্ঠান'
    ],
    // ...
];
```

## ছাত্র-ছাত্রী তথ্য আপডেট

`data/students.php` ফাইল এডিট করুন। প্রতিটি শ্রেণীর জন্য আলাদা ডেটা আছে।

## কমিটি তথ্য আপডেট

`data/committee.php` ফাইল এডিট করুন।

## সাইটের সাধারণ তথ্য পরিবর্তন

`config.php` ফাইল এডিট করুন:

```php
$site = [
    'name_bn' => 'প্রতিষ্ঠানের নাম',
    'email' => 'email@example.com',
    'phone' => '01XXXXXXXXX',
    // ...
];
```

## ফোল্ডার কাঠামো

```
/
├── index.php              # হোমপেইজ
├── config.php             # সাইট কনফিগারেশন
├── contact.php            # যোগাযোগ ফর্ম
├── notice.php             # সকল নোটিশ
├── gallery.php            # ফটো গ্যালারি
├── assets/
│   ├── css/               # স্টাইলশিট
│   ├── js/                # জাভাস্ক্রিপ্ট
│   ├── images/            # ছবি
│   ├── logo/              # লোগো
│   └── gallery/           # গ্যালারি ছবি
├── includes/
│   ├── header.php         # হেডার
│   ├── navbar.php         # নেভিগেশন
│   ├── sidebar.php        # সাইডবার
│   ├── footer.php         # ফুটার
│   └── page-template.php  # পেইজ টেমপ্লেট
└── data/
    ├── notices.php         # নোটিশ ডেটা
    ├── teachers.php        # শিক্ষক ডেটা
    ├── students.php        # ছাত্র ডেটা
    ├── committee.php       # কমিটি ডেটা
    ├── gallery.php         # গ্যালারি ডেটা
    └── links.php           # লিংক ডেটা
```

## প্রযুক্তি

- PHP (কোনো ফ্রেমওয়ার্ক ছাড়া)
- HTML5 / CSS3
- JavaScript (Vanilla)
- Font Awesome 4.7
- Noto Sans Bengali ফন্ট
