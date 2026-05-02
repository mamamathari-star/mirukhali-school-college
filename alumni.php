<?php
$page_title = 'প্রাক্তন শিক্ষার্থী';
require_once 'data/students.php';

$page_content = '<div style="text-align:center;">';
foreach ($alumni as $a) {
    $page_content .= '
    <div class="person-card">
        <img src="' . $a['image'] . '" alt="' . $a['name'] . '">
        <h4>' . $a['name'] . '</h4>
        <p>' . $a['batch'] . '</p>
        <p>' . $a['profession'] . '</p>
    </div>';
}
$page_content .= '</div>';

require_once 'includes/page-template.php';
