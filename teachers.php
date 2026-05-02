<?php
$page_title = 'কর্মরত শিক্ষক শিক্ষিকাবৃন্দ';
require_once 'data/teachers.php';

$page_content = '
<table class="data-table">
    <tr>
        <th>ক্রমিক</th>
        <th>নাম</th>
        <th>পদবী</th>
        <th>বিষয়</th>
        <th>মোবাইল</th>
    </tr>';

$sl = 1;
foreach ($teachers as $teacher) {
    $page_content .= '
    <tr>
        <td>' . $sl++ . '</td>
        <td>' . $teacher['name'] . '</td>
        <td>' . $teacher['designation'] . '</td>
        <td>' . $teacher['subject'] . '</td>
        <td>' . $teacher['phone'] . '</td>
    </tr>';
}

$page_content .= '</table>';

require_once 'includes/page-template.php';
