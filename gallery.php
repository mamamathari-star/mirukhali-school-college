<?php
$page_title = 'ফটো গ্যালারি';
require_once 'data/gallery.php';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

$selected_cat = isset($_GET['cat']) ? htmlspecialchars($_GET['cat'], ENT_QUOTES, 'UTF-8') : 'সকল';
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
                    <h2>ফটো গ্যালারি</h2>

                    <!-- Category Filter -->
                    <div style="padding:15px;text-align:center;">
                        <?php foreach ($gallery_categories as $cat): ?>
                        <a href="?cat=<?php echo urlencode($cat); ?>"
                           style="display:inline-block;padding:5px 15px;margin:3px;background:<?php echo ($selected_cat === $cat) ? '#0e5918' : '#ddd'; ?>;color:<?php echo ($selected_cat === $cat) ? '#fff' : '#333'; ?>;border-radius:3px;font-size:13px;">
                            <?php echo e($cat); ?>
                        </a>
                        <?php endforeach; ?>
                    </div>

                    <!-- Gallery Grid -->
                    <div class="gallery-grid">
                        <?php foreach ($gallery_images as $img): ?>
                            <?php if ($selected_cat === 'সকল' || $img['category'] === $selected_cat): ?>
                            <div class="gallery-item">
                                <img src="<?php echo e($base_url . $img['file']); ?>" alt="<?php echo e($img['title']); ?>">
                            </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

<?php
$hide_gallery = true;
require_once 'includes/footer.php';
?>
