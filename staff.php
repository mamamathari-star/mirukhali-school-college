<?php
$page_title = 'কর্মরত কর্মচারীবৃন্দ';
require_once 'data/teachers.php';

$page_content = '
<table class="data-table">
    <tr>
        <th>ক্রমিক</th>
        <th>নাম</th>
        <th>পদবী</th>
        <th>মোবাইল</th>
    </tr>';

$sl = 1;
foreach ($staff as $s) {
    $page_content .= '
    <tr>
        <td>' . $sl++ . '</td>
        <td>' . $s['name'] . '</td>
        <td>' . $s['designation'] . '</td>
        <td>' . $s['phone'] . '</td>
    </tr>';
}

$page_content .= '</table>';

require_once 'includes/page-template.php';
