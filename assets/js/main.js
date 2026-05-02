/**
 * মিরুখালী স্কুল এন্ড কলেজ
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== Image Slider =====
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = sliderWrapper.querySelectorAll('img');
        let currentSlide = 0;
        const totalSlides = slides.length;

        function goToSlide(index) {
            if (index >= totalSlides) index = 0;
            if (index < 0) index = totalSlides - 1;
            currentSlide = index;
            sliderWrapper.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        }

        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');

        if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

        setInterval(function () { goToSlide(currentSlide + 1); }, 4000);
    }

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.stellarnav > ul');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function () {
            mainMenu.classList.toggle('open');
        });
    }

    // ===== Mobile Dropdown Toggle =====
    document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var subMenu = this.parentElement.querySelector('ul');
            if (subMenu) {
                subMenu.classList.toggle('open');
            }
            var icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-angle-down');
                icon.classList.toggle('fa-angle-up');
            }
        });
    });

    // ===== Gallery Slider (Homepage) =====
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
        const galleryPrev = document.querySelector('.gallery-nav.prev');
        const galleryNext = document.querySelector('.gallery-nav.next');

        if (galleryPrev) {
            galleryPrev.addEventListener('click', function () {
                galleryTrack.scrollBy({ left: -200, behavior: 'smooth' });
            });
        }
        if (galleryNext) {
            galleryNext.addEventListener('click', function () {
                galleryTrack.scrollBy({ left: 200, behavior: 'smooth' });
            });
        }
    }

    // ===== Lightbox =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    document.querySelectorAll('.gallery-item img, .gallery-track img').forEach(function (img) {
        img.addEventListener('click', function () {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
            }
        });
    });

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('close-btn')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // ===== Scroll to Top =====
    var scrollBtn = document.querySelector('.cd-top');
    if (scrollBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('is-visible');
            } else {
                scrollBtn.classList.remove('is-visible');
            }
        });

        scrollBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== News Ticker =====
    var tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        var clone = tickerContent.cloneNode(true);
        tickerContent.parentNode.appendChild(clone);
    }
});
