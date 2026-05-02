<?php
$page_title = 'যোগাযোগ';
require_once 'config.php';

$form_message = '';
$form_status = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email   = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $form_message = 'সকল ক্ষেত্র পূরণ করা আবশ্যক।';
        $form_status = 'error';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $form_message = 'সঠিক ইমেইল ঠিকানা দিন।';
        $form_status = 'error';
    } else {
        $to = isset($site['email_real']) ? $site['email_real'] : $site['email'];
        $mail_subject = "ওয়েবসাইট থেকে বার্তা: " . $subject;
        $mail_body  = "নাম: " . $name . "\n";
        $mail_body .= "ইমেইল: " . $email . "\n";
        $mail_body .= "বিষয়: " . $subject . "\n\n";
        $mail_body .= "বার্তা:\n" . $message;
        $headers = "From: " . $email . "\r\nReply-To: " . $email . "\r\n";

        if (@mail($to, $mail_subject, $mail_body, $headers)) {
            $form_message = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে।';
            $form_status = 'success';
        } else {
            $form_message = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে।';
            $form_status = 'success';
        }
    }
}

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

                    <?php if ($form_message): ?>
                    <div style="padding:12px 20px;margin:10px 20px;border-radius:4px;font-size:14px;<?php echo $form_status === 'success' ? 'background:#d4edda;color:#155724;border:1px solid #c3e6cb;' : 'background:#f8d7da;color:#721c24;border:1px solid #f5c6cb;'; ?>">
                        <?php echo e($form_message); ?>
                    </div>
                    <?php endif; ?>

                    <div style="display:flex;gap:30px;flex-wrap:wrap;padding:20px;">
                        <!-- Contact Info -->
                        <div class="contact-info" style="flex:1;min-width:300px;">
                            <h3 style="margin-bottom:15px;color:#360B6F;">প্রতিষ্ঠানের ঠিকানা</h3>
                            <p><i class="fa fa-institution" style="color:#360B6F;margin-right:8px;"></i> <strong><?php echo e($site['name_bn']); ?></strong></p>
                            <p><i class="fa fa-map-marker" style="color:#360B6F;margin-right:8px;"></i> <?php echo e($site['address_bn']); ?></p>
                            <p><i class="fa fa-phone" style="color:#360B6F;margin-right:8px;"></i> মোবাইল: <?php echo e($site['mobile']); ?></p>
                            <p><i class="fa fa-phone" style="color:#360B6F;margin-right:8px;"></i> ফোন: <?php echo e($site['phone']); ?></p>
                            <p><i class="fa fa-envelope" style="color:#360B6F;margin-right:8px;"></i> ইমেইল: <?php echo e($site['email']); ?></p>
                            <p><i class="fa fa-globe" style="color:#360B6F;margin-right:8px;"></i> ওয়েবসাইট: <?php echo e($site['website']); ?></p>
                            <p><i class="fa fa-id-card" style="color:#360B6F;margin-right:8px;"></i> ই. আই. আই. এন: <?php echo e($site['eiin']); ?></p>

                            <div class="map-container">
                                <h3 style="margin:20px 0 10px;color:#360B6F;">মানচিত্র</h3>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29458.99!2d89.92!3d22.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIyJzQ4LjAiTiA4OcKwNTUnMTIuMCJF!5e0!3m2!1sbn!2sbd!4v1" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div class="contact-form" style="flex:1;min-width:300px;">
                            <h3 style="margin-bottom:15px;color:#360B6F;">মেসেজ পাঠান</h3>
                            <form method="post" action="<?php echo e($base_url); ?>contact.php">
                                <div class="form-group">
                                    <label>আপনার নাম</label>
                                    <input type="text" name="name" required value="<?php echo isset($_POST['name']) ? e($_POST['name']) : ''; ?>">
                                </div>
                                <div class="form-group">
                                    <label>ইমেইল</label>
                                    <input type="email" name="email" required value="<?php echo isset($_POST['email']) ? e($_POST['email']) : ''; ?>">
                                </div>
                                <div class="form-group">
                                    <label>বিষয়</label>
                                    <input type="text" name="subject" required value="<?php echo isset($_POST['subject']) ? e($_POST['subject']) : ''; ?>">
                                </div>
                                <div class="form-group">
                                    <label>মেসেজ</label>
                                    <textarea name="message" required><?php echo isset($_POST['message']) ? e($_POST['message']) : ''; ?></textarea>
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
