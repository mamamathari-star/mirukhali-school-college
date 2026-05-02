<?php
$page_title = 'প্রাক্তন কর্মচারীবৃন্দ';
require_once 'data/teachers.php';
$page_content = '
<p>মিরুখালি স্কুল এন্ড কলেজের প্রাক্তন কর্মচারীদের তালিকা:</p>
<table class="data-table">
    <tr><th>ক্রমিক</th><th>নাম</th><th>পদবি</th></tr>';
$sl = 1;
foreach ($previous_staff as $s) {
    $page_content .= '<tr><td>' . $sl++ . '</td><td>' . $s['name'] . '</td><td>' . $s['designation'] . '</td></tr>';
}
$page_content .= '</table>';
require_once 'includes/page-template.php';
