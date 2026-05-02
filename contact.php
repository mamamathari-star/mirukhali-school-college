<?php
$page_title = 'যোগাযোগ';
require_once 'config.php';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
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

        <div class="useo-maincontent">
            <div class="useo-leftside" style="width:100%;">
                <div class="useo-leftside-otherpage">
                    <h2>যোগাযোগ</h2>
                    <div style="display:flex;gap:30px;flex-wrap:wrap;padding:20px;">
                        <!-- Contact Info -->
                        <div class="contact-info" style="flex:1;min-width:300px;">
                            <h3 style="margin-bottom:15px;color:#0e5918;">প্রতিষ্ঠানের ঠিকানা</h3>
                            <p><i class="fa fa-institution" style="color:#0e5918;margin-right:8px;"></i> <strong><?php echo $site['name_bn']; ?></strong></p>
                            <p><i class="fa fa-map-marker" style="color:#0e5918;margin-right:8px;"></i> <?php echo $site['address_bn']; ?></p>
                            <p><i class="fa fa-phone" style="color:#0e5918;margin-right:8px;"></i> মোবাইল: <?php echo $site['mobile']; ?></p>
                            <p><i class="fa fa-phone" style="color:#0e5918;margin-right:8px;"></i> ফোন: <?php echo $site['phone']; ?></p>
                            <p><i class="fa fa-envelope" style="color:#0e5918;margin-right:8px;"></i> ইমেইল: <?php echo $site['email']; ?></p>
                            <p><i class="fa fa-globe" style="color:#0e5918;margin-right:8px;"></i> ওয়েবসাইট: <?php echo $site['website']; ?></p>
                            <p><i class="fa fa-id-card" style="color:#0e5918;margin-right:8px;"></i> ই. আই. আই. এন: <?php echo $site['eiin']; ?></p>

                            <div class="map-container">
                                <h3 style="margin:20px 0 10px;color:#0e5918;">মানচিত্র</h3>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29458.99!2d89.92!3d22.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIyJzQ4LjAiTiA4OcKwNTUnMTIuMCJF!5e0!3m2!1sbn!2sbd!4v1" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div class="contact-form" style="flex:1;min-width:300px;">
                            <h3 style="margin-bottom:15px;color:#0e5918;">মেসেজ পাঠান</h3>
                            <form method="post" action="">
                                <div class="form-group">
                                    <label>আপনার নাম</label>
                                    <input type="text" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label>ইমেইল</label>
                                    <input type="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label>বিষয়</label>
                                    <input type="text" name="subject" required>
                                </div>
                                <div class="form-group">
                                    <label>মেসেজ</label>
                                    <textarea name="message" required></textarea>
                                </div>
                                <button type="submit">পাঠান</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<?php
$hide_gallery = true;
require_once 'includes/footer.php';
?>
