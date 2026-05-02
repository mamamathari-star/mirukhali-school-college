<?php
$class_num = '8';
$page_title = 'অষ্টম শ্রেণী';
require_once 'data/students.php';

$class_key = 'class-' . $class_num;
$class_data = isset($students[$class_key]) ? $students[$class_key] : null;

$page_content = '';
if ($class_data) {
    $page_content .= '
    <table class="data-table">
        <tr>
            <th>রোল</th>
            <th>নাম</th>
            <th>শাখা</th>
            <th>বিভাগ</th>
        </tr>';
    foreach ($class_data['students'] as $student) {
        $page_content .= '
        <tr>
            <td>' . $student['roll'] . '</td>
            <td>' . $student['name'] . '</td>
            <td>' . $student['section'] . '</td>
            <td>' . $student['group'] . '</td>
        </tr>';
    }
    $page_content .= '</table>';
} else {
    $page_content = '<p>খুব শীঘ্রই আপডেট করা হবে...</p>';
}

require_once 'includes/page-template.php';
