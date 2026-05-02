        <!-- Navigation -->
        <div class="main-navigation">
            <button class="menu-toggle"><i class="fa fa-bars"></i> মেনু</button>
            <div id="main-nav" class="stellarnav">
                <ul>
                    <li class="<?php echo active_page('index.php'); ?>"><a href="<?php echo $base_url; ?>index.php">প্রচ্ছদ</a></li>
                    <li class="has-children">
                        <a href="#">প্রতিষ্ঠান সম্পর্কিত</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>institution-history.php">প্রতিষ্ঠানের ইতিহাস</a></li>
                            <li><a href="<?php echo $base_url; ?>founder.php">প্রতিষ্ঠাতা</a></li>
                            <li><a href="<?php echo $base_url; ?>donor.php">জমি ও অর্থ দাতা</a></li>
                            <li><a href="<?php echo $base_url; ?>at-a-glance.php">এক নজরে সকল তথ্য</a></li>
                            <li><a href="<?php echo $base_url; ?>mission-vision.php">আমাদের লক্ষ্য ও বৈশিষ্ট্য</a></li>
                            <li><a href="<?php echo $base_url; ?>rules.php">প্রতিষ্ঠানের নিয়মাবলী</a></li>
                            <li><a href="<?php echo $base_url; ?>manpower.php">জনবল কাঠামো</a></li>
                            <li><a href="<?php echo $base_url; ?>permanent-assets.php">স্থায়ী সম্পদ</a></li>
                            <li><a href="<?php echo $base_url; ?>infrastructure.php">ভৌত অবকাঠামো</a></li>
                            <li><a href="<?php echo $base_url; ?>holiday.php">প্রতিষ্ঠানের ছুটি</a></li>
                            <li><a href="<?php echo $base_url; ?>hostel.php">ছাত্রাবাস ও ছাত্রী নিবাস</a></li>
                            <li><a href="<?php echo $base_url; ?>transport.php">প্রতিষ্ঠানের নিজস্ব যানবহন</a></li>
                            <li><a href="<?php echo $base_url; ?>income-source.php">প্রতিষ্ঠানের আয়ের উৎস</a></li>
                            <li><a href="<?php echo $base_url; ?>residential.php">আবাসিক বাসভবন</a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">পরিচালনা পর্ষদ</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>committee-current.php">বর্তমান কমিটির সদস্যবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>committee-previous.php">প্রাক্তন কমিটির সদস্যবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>president-list.php">প্রাক্তন সভাপতিবৃন্দ</a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">শিক্ষক-কর্মচারী</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>current-principal.php">বর্তমান প্রতিষ্ঠান প্রধান</a></li>
                            <li><a href="<?php echo $base_url; ?>teachers.php">কর্মরত শিক্ষক শিক্ষিকাবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>staff.php">কর্মরত কর্মচারীবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>previous-principals.php">প্রাক্তন প্রতিষ্ঠান প্রধানগণ</a></li>
                            <li><a href="<?php echo $base_url; ?>previous-teachers.php">প্রাক্তন শিক্ষক-শিক্ষিকাবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>previous-staff.php">প্রাক্তন কর্মচারীবৃন্দ</a></li>
                            <li><a href="<?php echo $base_url; ?>teacher-attendance.php">শিক্ষক/কর্মচারীদের হাজিরা</a></li>
                            <li><a href="<?php echo $base_url; ?>vacant-posts.php">শূণ্য ও সৃষ্ট পদের তথ্য</a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">সকল ছাত্র-ছাত্রী</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>students-class-6.php">ষষ্ঠ শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-7.php">সপ্তম শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-8.php">অষ্টম শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-9.php">নবম শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-10.php">দশম শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-11.php">একাদশ শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>students-class-12.php">দ্বাদশ শ্রেণী</a></li>
                            <li><a href="<?php echo $base_url; ?>alumni.php">প্রাক্তন শিক্ষার্থী</a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">একাডেমিক</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>academic.php">শ্রেণীভিত্তিক শিক্ষার্থী</a></li>
                            <li><a href="<?php echo $base_url; ?>attendance.php">ছাত্র-ছাত্রীর হাজিরা</a></li>
                            <li><a href="<?php echo $base_url; ?>merit-students.php">বর্তমান কৃতি শিক্ষার্থী</a></li>
                            <li><a href="<?php echo $base_url; ?>merit-students-previous.php">প্রাক্তন কৃতি শিক্ষার্থী</a></li>
                            <li><a href="<?php echo $base_url; ?>scholarship.php">বৃত্তি প্রাপ্ত শিক্ষার্থী</a></li>
                            <li class="has-children">
                                <a href="#">অন্যান্য তথ্য</a>
                                <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                                <ul>
                                    <li><a href="<?php echo $base_url; ?>student-cabinet.php">ষ্টুডেন্ট কেবিনেট</a></li>
                                    <li><a href="<?php echo $base_url; ?>gallery.php">ফটো গ্যালারি</a></li>
                                    <li><a href="<?php echo $base_url; ?>class-routine.php">সকল ক্লাস রুটিন</a></li>
                                    <li><a href="<?php echo $base_url; ?>syllabus.php">সকল সিলেবাস</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">ফলাফল</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>result-jsc.php">জে. এস. সি</a></li>
                            <li><a href="<?php echo $base_url; ?>result-ssc.php">এস. এস. সি</a></li>
                            <li><a href="<?php echo $base_url; ?>result-hsc.php">এইচ. এস. সি</a></li>
                            <li><a href="<?php echo $base_url; ?>annual-result.php">বার্ষিক পরীক্ষা</a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#">সকল কর্নার</a>
                        <button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>
                        <ul>
                            <li><a href="<?php echo $base_url; ?>gallery.php?cat=মুক্তিযুদ্ধ">মুক্তিযুদ্ধ কর্নার</a></li>
                            <li><a href="<?php echo $base_url; ?>gallery.php?cat=সূবর্ণজয়ন্তী">সূবর্ণজয়ন্তী কর্নার</a></li>
                            <li><a href="<?php echo $base_url; ?>gallery.php?cat=প্রতিষ্ঠান">প্রতিষ্ঠান কর্নার</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="mgc-search">
                <form role="search" method="get" action="<?php echo $base_url; ?>search.php">
                    <div class="search-box">
                        <div class="expSearchBox">
                            <div class="expSearchFrom">
                                <input type="text" name="q" placeholder="অনুসন্ধান করুন..."/>
                                <div class="search-icon"><i class="fa fa-search"></i></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
