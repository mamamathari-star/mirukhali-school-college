<?php
/**
 * Generic page template for inner pages
 * Set $page_title and $page_content before including this file
 */
require_once __DIR__ . '/header.php';
require_once __DIR__ . '/navbar.php';
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
            <div class="useo-leftside">
                <div class="useo-leftside-otherpage">
                    <h2><?php echo $page_title; ?></h2>
                    <div class="page-content">
                        <?php echo $page_content; ?>
                    </div>
                </div>
            </div>
            <?php require_once __DIR__ . '/sidebar.php'; ?>
        </div>

<?php
$hide_gallery = true;
require_once __DIR__ . '/footer.php';
?>
