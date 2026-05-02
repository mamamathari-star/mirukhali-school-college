<?php
$page_title = 'প্রাক্তন কমিটির সদস্যবৃন্দ';
require_once 'data/committee.php';

$page_content = '<div style="text-align:center;">';
foreach ($previous_committee as $member) {
    $page_content .= '
    <div class="person-card">
        <img src="' . $member['image'] . '" alt="' . $member['name'] . '">
        <h4>' . $member['name'] . '</h4>
        <p>' . $member['designation'] . '</p>
    </div>';
}
$page_content .= '</div>';

require_once 'includes/page-template.php';
