# মিরুখালি স্কুল এন্ড কলেজ - Mirukhali School & College

Official website for মিরুখালি স্কুল এন্ড কলেজ (Mirukhali School & College), Mathbaria, Pirojpur.

Built with PHP, HTML, CSS, JavaScript and designed for easy deployment on cPanel/shared hosting.

## Features

- Complete multi-page educational institute website
- Bangla language support with Noto Sans Bengali font
- Responsive design (Desktop, Tablet, Mobile)
- Image slider on homepage
- Notice board system
- Photo gallery with category filtering and lightbox
- Teacher/Staff directory
- Student class-wise listing
- Exam result pages
- Contact page with form
- Reusable PHP includes (header, navbar, sidebar, footer)
- Easy data management via PHP array files

## Folder Structure

```
/
├── index.php                    # Homepage
├── config.php                   # Site configuration
├── institution-history.php      # Institution history
├── founder.php                  # Founder info
├── donor.php                    # Land & money donors
├── at-a-glance.php              # At a glance
├── mission-vision.php           # Mission & vision
├── rules.php                    # Institution rules
├── manpower.php                 # Manpower structure
├── permanent-assets.php         # Permanent assets
├── infrastructure.php           # Physical infrastructure
├── holiday.php                  # Holiday list
├── hostel.php                   # Hostel information
├── transport.php                # Transport
├── income-source.php            # Income sources
├── residential.php              # Residential buildings
├── committee-current.php        # Current committee
├── committee-previous.php       # Previous committee
├── president-list.php           # Previous presidents
├── current-principal.php        # Current principal
├── teachers.php                 # Current teachers
├── staff.php                    # Current staff
├── previous-principals.php      # Previous principals
├── previous-teachers.php        # Previous teachers
├── previous-staff.php           # Previous staff
├── teacher-attendance.php       # Teacher attendance
├── vacant-posts.php             # Vacant posts
├── students-class-6.php         # Class 6 students
├── students-class-7.php         # Class 7 students
├── students-class-8.php         # Class 8 students
├── students-class-9.php         # Class 9 students
├── students-class-10.php        # Class 10 students
├── students-class-11.php        # Class 11 students
├── students-class-12.php        # Class 12 students
├── alumni.php                   # Alumni
├── academic.php                 # Academic (class-wise students)
├── attendance.php               # Student attendance
├── merit-students.php           # Merit students (current)
├── merit-students-previous.php  # Merit students (previous)
├── scholarship.php              # Scholarship students
├── student-cabinet.php          # Student cabinet
├── gallery.php                  # Photo gallery
├── class-routine.php            # Class routine
├── syllabus.php                 # Syllabus
├── result-jsc.php               # JSC results
├── result-ssc.php               # SSC results
├── result-hsc.php               # HSC results
├── annual-result.php            # Annual exam results
├── notice.php                   # Notice board
├── notice-details.php           # Notice details
├── contact.php                  # Contact page
├── president-message.php        # President's message
├── principal-message.php        # Principal's message
├── search.php                   # Search page
├── assets/
│   ├── css/
│   │   ├── style.css            # Main stylesheet
│   │   └── responsive.css       # Responsive styles
│   ├── js/
│   │   └── main.js              # Main JavaScript
│   ├── images/                  # Site images
│   ├── logo/                    # Logo files
│   ├── gallery/                 # Gallery photos
│   └── fonts/                   # Custom fonts (if any)
├── includes/
│   ├── header.php               # HTML head + top bar
│   ├── navbar.php               # Navigation menu
│   ├── sidebar.php              # Right sidebar
│   ├── footer.php               # Footer + scripts
│   └── page-template.php        # Generic page template
├── data/
│   ├── notices.php              # Notice data array
│   ├── teachers.php             # Teacher/staff data
│   ├── students.php             # Student data by class
│   ├── gallery.php              # Gallery image data
│   ├── committee.php            # Committee member data
│   └── links.php                # Important links data
└── .htaccess                    # Apache config
```

## How to Run Locally (XAMPP / Laragon)

### Using XAMPP:
1. Download and install [XAMPP](https://www.apachefriends.org/)
2. Copy the entire project folder to `C:\xampp\htdocs\mssac\`
3. Start Apache from XAMPP Control Panel
4. Open browser and go to `http://localhost/mssac/`

### Using Laragon:
1. Download and install [Laragon](https://laragon.org/)
2. Copy the project folder to `C:\laragon\www\mssac\`
3. Start Laragon
4. Open browser and go to `http://mssac.test/` or `http://localhost/mssac/`

## How to Upload to cPanel

1. Log in to your cPanel account
2. Open **File Manager**
3. Navigate to `public_html` (or subdomain folder)
4. Upload all project files (you can zip and upload, then extract)
5. Make sure `index.php` is in the root of `public_html`
6. Your website should be live at your domain

## How to Replace Images

1. Go to `assets/images/` folder
2. Replace the image file with your new image using the **same filename**
3. For logo: Replace `assets/logo/Mirukhali.png`
4. For slider: Replace `assets/images/slide-1.jpg`, `slide-2.jpg`, etc.
5. For gallery: Add/replace images in `assets/gallery/` and update `data/gallery.php`
6. For principal: Replace `assets/images/principal.png`

## How to Update Notices

Edit `data/notices.php` and add new notices to the array:

```php
$notices = [
    [
        'id'      => 2,
        'title'   => 'New Notice Title',
        'date'    => '2024-01-15',
        'month'   => 'Jan-15',
        'year'    => '2024',
        'content' => 'Notice details here...',
        'file'    => 'path/to/file.pdf',  // optional
    ],
    // ... existing notices
];
```

## How to Update Teachers/Staff/Students Data

- **Teachers:** Edit `data/teachers.php` - add entries to `$teachers` array
- **Staff:** Edit `data/teachers.php` - add entries to `$staff` array
- **Students:** Edit `data/students.php` - add entries to respective class arrays
- **Committee:** Edit `data/committee.php` - update committee member arrays
- **Gallery:** Edit `data/gallery.php` - add image entries to `$gallery_images` array
- **Links:** Edit `data/links.php` - update link arrays

## How to Update Site Information

Edit `config.php` to change:
- Institution name
- Phone number
- Email
- Address
- EIIN number
- Social media links

## Technology Stack

- PHP (no framework, plain PHP)
- HTML5
- CSS3
- JavaScript (vanilla)
- Font Awesome 4.7 (icons)
- Google Fonts (Noto Sans Bengali)

## Browser Support

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Mobile browsers

## Credits

- Design reference: [mssac.edu.bd](https://mssac.edu.bd/)
- Original theme by: Sikder Computer
