<?php
require_once 'data/notices.php';

$notice_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$notice = null;

foreach ($notices as $n) {
    if ($n['id'] == $notice_id) {
        $notice = $n;
        break;
    }
}

$page_title = $notice ? $notice['title'] : 'নোটিশ পাওয়া যায়নি';
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
                    <h2>নোটিশ বিস্তারিত</h2>
                    <?php if ($notice): ?>
                    <div class="notice-detail-content">
                        <h2><?php echo $notice['title']; ?></h2>
                        <p><strong>তারিখ:</strong> <?php echo $notice['date']; ?></p>
                        <hr style="margin:15px 0;">
                        <p><?php echo $notice['content']; ?></p>
                        <?php if (!empty($notice['file'])): ?>
                        <p style="margin-top:20px;">
                            <a href="<?php echo $notice['file']; ?>" download class="read-more" style="float:none;">
                                <i class="fa fa-download"></i> ফাইল ডাউনলোড করুন
                            </a>
                        </p>
                        <?php endif; ?>
                    </div>
                    <?php else: ?>
                    <div class="page-content">
                        <p>নোটিশ পাওয়া যায়নি। <a href="<?php echo $base_url; ?>notice.php">সকল নোটিশ দেখুন</a></p>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

<?php
$hide_gallery = true;
require_once 'includes/footer.php';
?>
