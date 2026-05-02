<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../data/notices.php';
require_once __DIR__ . '/../data/links.php';
require_once __DIR__ . '/../data/teachers.php';
?>
            <div class="useo-sidebar">
                <!-- Institution Head -->
                <div class="useo-singlesidebar">
                    <h2>প্রতিষ্ঠান প্রধান</h2>
                    <img width="200" height="220" alt="প্রতিষ্ঠান প্রধান" src="<?php echo $base_url . $principal['image']; ?>">
                    <div class="widget_sp_image-description">
                        <p><?php echo $principal['name']; ?><br><?php echo $principal['designation']; ?></p>
                    </div>
                </div>

                <!-- Latest Notices -->
                <div class="useo-singlesidebar">
                    <h2>সদ্য প্রকাশিত নোটিশ</h2>
                    <div class="notice-list-sidebar">
                        <?php foreach ($notices as $notice): ?>
                        <div class="notice-item">
                            <div class="notice-date-box">
                                <?php echo $notice['month']; ?><hr><?php echo $notice['year']; ?>
                            </div>
                            <a href="<?php echo $base_url; ?>notice-details.php?id=<?php echo $notice['id']; ?>"><?php echo $notice['title']; ?></a>
                        </div>
                        <?php endforeach; ?>
                        <div class="all-notice">
                            <a href="<?php echo $base_url; ?>notice.php">All Notice</a>
                        </div>
                    </div>
                </div>

                <!-- Education Board Links -->
                <div class="useo-singlesidebar">
                    <h2>শিক্ষা বোর্ডের লিংক</h2>
                    <ul class="list">
                        <?php foreach ($education_board_links as $link): ?>
                        <li><a href="<?php echo $link['url']; ?>" target="_blank"><?php echo $link['name']; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Important Links -->
                <div class="useo-singlesidebar">
                    <h2>গুরুত্বপূর্ণ লিংক</h2>
                    <ul class="list">
                        <?php foreach ($important_links as $link): ?>
                        <li><a href="<?php echo $link['url']; ?>" target="_blank"><?php echo $link['name']; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
