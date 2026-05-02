<?php
$page_title = 'এক নজরে সকল তথ্য';
require_once 'config.php';
$page_content = '
<table class="data-table">
    <tr><th>বিষয়</th><th>তথ্য</th></tr>
    <tr><td>প্রতিষ্ঠানের নাম</td><td>' . $site['name_bn'] . '</td></tr>
    <tr><td>প্রতিষ্ঠাকাল</td><td>' . $site['established'] . ' খ্রি:</td></tr>
    <tr><td>ই. আই. আই. এন</td><td>' . $site['eiin'] . '</td></tr>
    <tr><td>মোবাইল</td><td>' . $site['mobile'] . '</td></tr>
    <tr><td>ইমেইল</td><td>' . $site['email'] . '</td></tr>
    <tr><td>ওয়েবসাইট</td><td>' . $site['website'] . '</td></tr>
    <tr><td>ডাকঘর</td><td>' . $site['post_office'] . '</td></tr>
    <tr><td>উপজেলা</td><td>' . $site['upazila'] . '</td></tr>
    <tr><td>জেলা</td><td>' . $site['district'] . '</td></tr>
    <tr><td>শিক্ষার ধরণ</td><td>মাধ্যমিক ও উচ্চ মাধ্যমিক</td></tr>
    <tr><td>প্রতিষ্ঠানের ধরণ</td><td>সরকারি</td></tr>
</table>
';
require_once 'includes/page-template.php';
