<?php if (!defined('SITE_LOADED')) { define('SITE_LOADED', true); } ?>
<?php require_once __DIR__ . '/../config.php'; ?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0">
    <link rel="shortcut icon" type="image/png" href="<?php echo $base_url; ?>assets/logo/fevicon.png"/>
    <title><?php echo isset($page_title) ? $page_title . ' - ' : ''; ?><?php echo $site['name_bn']; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>assets/css/style.css">
    <link rel="stylesheet" href="<?php echo $base_url; ?>assets/css/responsive.css">
</head>
<body>
    <!-- Top Bar -->
    <div class="useo-topbar">
        <ul class="contatc">
            <li><i class="fa fa-phone" aria-hidden="true"></i> Phone: <?php echo $site['phone']; ?></li>
            <li><i class="fa fa-envelope" aria-hidden="true"></i> Email: <span><?php echo $site['email']; ?></span></li>
            <li><i class="fa fa-globe" aria-hidden="true"></i> Website: <span><?php echo $site['website']; ?></span></li>
            <li><i class="fa fa-user" aria-hidden="true"></i> <a href="#">Login</a></li>
        </ul>
    </div>

    <!-- Main Wrapper -->
    <div class="useo-wrap">
        <!-- Header Image -->
        <div class="useo-header">
            <a href="<?php echo $base_url; ?>index.php"><img src="<?php echo $base_url; ?>assets/logo/Mirukhali.png" alt="<?php echo $site['name_bn']; ?>"></a>
        </div>
