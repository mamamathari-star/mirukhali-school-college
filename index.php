<?php
$page_title = '';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
require_once 'data/notices.php';
?>

        <!-- News Ticker -->
        <div class="scroll-notice">
            <div class="notice-title">নিউজ:</div>
            <div class="notice-body">
                <div class="ticker-content">
                    <p>কোন আপডেট নিউজ নাই। খুব শীঘ্রই আপডেট নিউজ দেয়া হবে।</p>
                    <p>কোন আপডেট নিউজ নাই। খুব শীঘ্রই আপডেট নিউজ দেয়া হবে।</p>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="useo-maincontent">
            <!-- Left Content -->
            <div class="useo-leftside">
                <!-- Image Slider -->
                <div class="useo-slider">
                    <div class="slider-container">
                        <div class="slider-wrapper">
                            <img src="<?php echo $base_url; ?>assets/images/slide-1.jpg" alt="Slide 1">
                            <img src="<?php echo $base_url; ?>assets/images/slide-2.jpg" alt="Slide 2">
                            <img src="<?php echo $base_url; ?>assets/images/slide-3.jpg" alt="Slide 3">
                            <img src="<?php echo $base_url; ?>assets/images/slide-4.jpg" alt="Slide 4">
                        </div>
                        <button class="slider-prev"><i class="fa fa-chevron-left"></i></button>
                        <button class="slider-next"><i class="fa fa-chevron-right"></i></button>
                    </div>
                </div>

                <!-- Institution History -->
                <div class="msg-area">
                    <h2>প্রতিষ্ঠানের ইতিহাস</h2>
                    <img src="<?php echo $base_url; ?>assets/images/institution-history.jpg" class="img-ed" alt="প্রতিষ্ঠানের ইতিহাস">
                    <p>The name of our Institution is Mirukhali Higher Secondary School. It is situated the north side of the upzila mathbaria in the district of pirojpur. It is a famuse school in pirojpur district. The school was founded in 01.01.1937 as a ME school. The name of first Headmaster was Khitish Chandra Chowdury. It was recognised [&hellip;]</p>
                    <a class="read-more" href="<?php echo $base_url; ?>institution-history.php">More &rarr;</a>
                </div>

                <!-- President Message -->
                <div class="msg-area">
                    <h2>সভাপতির বাণী</h2>
                    <img src="<?php echo $base_url; ?>assets/images/president.jpg" class="img-ed" alt="সভাপতির বাণী">
                    <p>খুব শীঘ্রই আপডেট করা হবে&hellip;&hellip;</p>
                    <a class="read-more" href="<?php echo $base_url; ?>president-message.php">More &rarr;</a>
                </div>

                <!-- Principal Message -->
                <div class="msg-area">
                    <h2>অধ্যক্ষের বাণী</h2>
                    <img src="<?php echo $base_url; ?>assets/images/vice-principal.png" class="img-ed" alt="অধ্যক্ষের বাণী">
                    <p>খুব শীঘ্রই আপডেট করা হবে&hellip;</p>
                    <a class="read-more" href="<?php echo $base_url; ?>principal-message.php">More &rarr;</a>
                </div>
            </div>

            <!-- Sidebar -->
            <?php require_once 'includes/sidebar.php'; ?>
        </div>

<?php require_once 'includes/footer.php'; ?>
