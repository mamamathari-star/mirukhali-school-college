<?php
$page_title = 'প্রাক্তন প্রতিষ্ঠান প্রধানগণ';
require_once 'data/teachers.php';

$page_content = '<div style="text-align:center;">';
foreach ($previous_principals as $p) {
    $page_content .= '
    <div class="person-card">
        <img src="' . $p['image'] . '" alt="' . $p['name'] . '">
        <h4>' . $p['name'] . '</h4>
        <p>' . $p['tenure'] . '</p>
    </div>';
}
$page_content .= '</div>';

require_once 'includes/page-template.php';
