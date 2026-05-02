<?php
$page_title = 'প্রাক্তন সভাপতিবৃন্দ';
require_once 'data/committee.php';

$page_content = '<div style="text-align:center;">';
foreach ($president_list as $member) {
    $page_content .= '
    <div class="person-card">
        <img src="' . $member['image'] . '" alt="' . $member['name'] . '">
        <h4>' . $member['name'] . '</h4>
        <p>' . $member['tenure'] . '</p>
    </div>';
}
$page_content .= '</div>';

require_once 'includes/page-template.php';
