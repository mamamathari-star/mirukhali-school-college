<?php
$page_title = 'সকল নোটিশ';
require_once 'data/notices.php';
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
                    <h2>সকল নোটিশ</h2>
                    <div class="notice-list">
                        <?php if (empty($notices)): ?>
                            <p style="padding:20px;text-align:center;">কোন নোটিশ পাওয়া যায়নি।</p>
                        <?php else: ?>
                            <?php foreach ($notices as $notice): ?>
                            <div class="notice-card">
                                <div class="notice-date-big">
                                    <?php echo e($notice['month']); ?><hr><?php echo e($notice['year']); ?>
                                </div>
                                <div class="notice-info">
                                    <h3><?php echo e($notice['title']); ?></h3>
                                    <a href="<?php echo e($base_url); ?>notice-details.php?id=<?php echo intval($notice['id']); ?>">বিস্তারিত দেখুন &rarr;</a>
                                    <?php if (!empty($notice['file'])): ?>
                                    <br><a href="<?php echo e($notice['file']); ?>" download><i class="fa fa-download"></i> ডাউনলোড</a>
                                    <?php endif; ?>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

<?php
$hide_gallery = true;
require_once 'includes/footer.php';
?>
