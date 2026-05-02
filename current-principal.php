<?php
$page_title = 'বর্তমান প্রতিষ্ঠান প্রধান';
require_once 'data/teachers.php';

$page_content = '
<div style="text-align:center;">
    <div class="person-card" style="width:300px;display:inline-block;">
        <img src="' . $principal['image'] . '" alt="' . $principal['name'] . '" style="width:200px;height:220px;">
        <h4>' . $principal['name'] . '</h4>
        <p>' . $principal['designation'] . '</p>
    </div>
</div>
';

require_once 'includes/page-template.php';
