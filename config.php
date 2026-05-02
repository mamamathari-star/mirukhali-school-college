<?php
/**
 * Site Configuration
 * মিরুখালী স্কুল এন্ড কলেজ
 */

$site = [
    'name_bn'       => 'মিরুখালি স্কুল এন্ড কলেজ',
    'name_en'       => 'Mirukhali School & College',
    'established'   => '১৯০৭',
    'eiin'          => '102726',
    'phone'         => '01309-102726',
    'mobile'        => '01716-213807',
    'email'         => 'mirukhalisac102726@gamil.com',
    'email_real'    => 'mirukhalisac102726@gmail.com',
    'website'       => 'mssac.edu.bd',
    'address_bn'    => 'ডাকঘরঃ মিরুখালি, উপজেলাঃ মঠবাড়িয়া, জেলাঃ পিরোজপুর',
    'post_office'   => 'মিরুখালি',
    'upazila'       => 'মঠবাড়িয়া',
    'district'      => 'পিরোজপুর',
    'center_code'   => '',
    'logo'          => 'assets/logo/Mirukhali.png',
    'header_image'  => 'assets/logo/Mirukhali.png',
    'favicon'       => 'assets/logo/fevicon.png',
    'facebook'      => 'https://web.facebook.com/মিরুখালী-উচ্চ-মাধ্যমিক-বিদ্যালয়-167760383354090',
];

// Auto-detect base URL for subfolder hosting
$script_name = dirname($_SERVER['SCRIPT_NAME']);
$base_url = ($script_name === '/' || $script_name === '\\') ? '/' : rtrim($script_name, '/') . '/';

function active_page($page) {
    $current = basename($_SERVER['PHP_SELF']);
    return ($current === $page) ? 'active' : '';
}

function e($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
