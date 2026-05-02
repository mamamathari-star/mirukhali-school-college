<?php require_once __DIR__ . '/../config.php'; ?>

    </div>
    <!-- /useo-wrap -->

    <!-- Photo Gallery Section -->
    <?php if (!isset($hide_gallery) || !$hide_gallery): ?>
    <?php require_once __DIR__ . '/../data/gallery.php'; ?>
    <div class="useo-scroll">
        <h2>PHOTO GALLERY</h2>
        <div class="gallery-slider">
            <button class="gallery-nav prev"><i class="fa fa-chevron-left"></i></button>
            <div class="gallery-track">
                <?php foreach ($gallery_images as $img): ?>
                <img src="<?php echo e($base_url . $img['file']); ?>" alt="<?php echo e($img['title']); ?>">
                <?php endforeach; ?>
            </div>
            <button class="gallery-nav next"><i class="fa fa-chevron-right"></i></button>
        </div>
    </div>
    <?php endif; ?>

    <!-- Footer -->
    <div class="useo-footer">
        <div class="useo-single-footer">
            <h2>প্রতিষ্ঠানের মেইলিং ঠিকানা</h2>
            <div class="textwidget">
                <p>
                    মোবাইল নম্বর: <span><?php echo e($site['mobile']); ?></span><br>
                    ই. আই. আই. এন: <span><?php echo e($site['eiin']); ?></span><br>
                    ইমেইল: <span><?php echo e($site['email']); ?></span><br>
                    ওয়েব সাইটঃ <span><?php echo e($site['website']); ?></span><br>
                    কেন্দ্র কোডঃ <?php echo e($site['center_code']); ?><br>
                    ডাকঘরঃ <?php echo e($site['post_office']); ?><br>
                    উপজেলাঃ <?php echo e($site['upazila']); ?><br>
                    জেলাঃ <?php echo e($site['district']); ?>
                </p>
            </div>
        </div>
        <div class="useo-single-footer">
            <h2>ফেইসবুকে আমরা</h2>
            <div class="fb-placeholder">
                <p>আমাদের ফেইসবুক পেইজ দেখুন</p>
                <a href="<?php echo e($site['facebook']); ?>" target="_blank"><i class="fa fa-facebook-square" style="font-size:40px;color:#4267B2;margin-top:10px;"></i></a>
                <p style="margin-top:10px;">মিরুখালী উচ্চ মাধ্যমিক বিদ্যালয়</p>
            </div>
        </div>
        <div class="useo-single-footer">
            <h2>ভিজিটর পরিসংখ্যান</h2>
            <div class="visitor-stats">
                <div class="stat-item"><i class="fa fa-users" style="color:#4CAF50;"></i> Users Today : <span id="users-today">7</span></div>
                <div class="stat-item"><i class="fa fa-users" style="color:#2196F3;"></i> Users Yesterday : <span>80</span></div>
                <div class="stat-item"><i class="fa fa-calendar" style="color:#FF9800;"></i> This Year : <span>12991</span></div>
                <div class="stat-item"><i class="fa fa-bar-chart" style="color:#9C27B0;"></i> Total Users : <span>27356</span></div>
                <div class="stat-item"><i class="fa fa-eye" style="color:#E91E63;"></i> Views Today : <span>154</span></div>
                <div class="stat-item"><i class="fa fa-user" style="color:#00BCD4;"></i> Who's Online : <span>4</span></div>
            </div>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="useo-footer-bottom">
        <p class="copyright-info">
            কপিরাইট @ <?php echo e($site['name_bn']); ?> সর্ব স্বত্ব সংরক্ষণ করে
        </p>
        <p class="developer-info">
            <a href="http://www.sikdercomputer.com" target="_blank">
                <img src="<?php echo e($base_url); ?>assets/images/developer-logo.png" alt="Developer Logo">
            </a>
        </p>
    </div>

    <!-- Scroll to Top -->
    <a href="#" class="cd-top">Top</a>

    <!-- Lightbox -->
    <div id="lightbox" class="lightbox">
        <span class="close-btn">&times;</span>
        <img id="lightbox-img" src="" alt="Gallery Image">
    </div>

    <script src="<?php echo e($base_url); ?>assets/js/main.js"></script>
</body>
</html>
