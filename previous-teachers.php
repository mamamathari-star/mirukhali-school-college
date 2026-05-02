<?php
$page_title = 'প্রাক্তন শিক্ষক-শিক্ষিকাবৃন্দ';
require_once 'data/teachers.php';
$page_content = '
<p>মিরুখালি স্কুল এন্ড কলেজের প্রাক্তন শিক্ষক-শিক্ষিকাদের তালিকা:</p>
<table class="data-table">
    <tr><th>ক্রমিক</th><th>নাম</th><th>পদবি</th><th>বিষয়</th></tr>';
$sl = 1;
foreach ($previous_teachers as $t) {
    $page_content .= '<tr><td>' . $sl++ . '</td><td>' . $t['name'] . '</td><td>' . $t['designation'] . '</td><td>' . $t['subject'] . '</td></tr>';
}
$page_content .= '</table>';
require_once 'includes/page-template.php';
