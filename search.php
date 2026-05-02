<?php
$query = isset($_GET['q']) ? htmlspecialchars($_GET['q']) : '';
$page_title = 'অনুসন্ধান: ' . $query;
$page_content = '
<p>আপনি অনুসন্ধান করেছেন: <strong>' . $query . '</strong></p>
<p>অনুসন্ধান ফলাফল এখানে প্রদর্শিত হবে।</p>
<p>দয়া করে মেনু থেকে পৃষ্ঠা নির্বাচন করুন।</p>
';
require_once 'includes/page-template.php';
