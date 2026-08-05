/* ==========================================================================
   AHMED & SAMA WEDDING INVITATION — INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const LOCATION_URL = "https://maps.app.goo.gl/q8xLkfdbFu9yCB8u9";

    // ----------------------------------------------------------------------
    // 1. PETALS CANVAS ANIMATION
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('petals-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petalsCount = 35;
        const petals = [];

        for (let i = 0; i < petalsCount; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 6 + 4,
                speedY: Math.random() * 0.8 + 0.3,
                speedX: Math.random() * 0.5 - 0.25,
                angle: Math.random() * Math.PI * 2,
                spin: Math.random() * 0.02 - 0.01,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animatePetals() {
            ctx.clearRect(0, 0, width, height);

            petals.forEach(p => {
                p.y -= p.speedY;
                p.x += p.speedX;
                p.angle += p.spin;

                if (p.y < -20) {
                    p.y = height + 20;
                    p.x = Math.random() * width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = `rgba(200, 169, 81, ${p.opacity})`;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            requestAnimationFrame(animatePetals);
        }

        animatePetals();
    }

    // ----------------------------------------------------------------------
    // 2. YOUTUBE PLAYER — Perfect by Ed Sheeran
    // ----------------------------------------------------------------------
    const musicBtn = document.getElementById('music-toggle-btn');
    let ytPlayer = null;
    let isPlaying = false;

    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: '2Vv-BfVoq4g',
            playerVars: {
                autoplay: 0,
                loop: 1,
                playlist: '2Vv-BfVoq4g',
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0
            },
            events: {
                onReady: () => {
                    if (musicBtn) musicBtn.title = 'Perfect — Ed Sheeran';
                }
            }
        });
    };

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!ytPlayer || !ytPlayer.playVideo) {
                showToast('Music is loading, please try again...');
                return;
            }

            if (isPlaying) {
                ytPlayer.pauseVideo();
                musicBtn.classList.remove('playing');
                showToast('Perfect — paused');
            } else {
                ytPlayer.playVideo();
                musicBtn.classList.add('playing');
                showToast('Playing Perfect — Ed Sheeran');
            }
            isPlaying = !isPlaying;
        });

        const handleFirstInteraction = () => {
            if (!isPlaying && ytPlayer && ytPlayer.playVideo) {
                ytPlayer.playVideo();
                isPlaying = true;
                musicBtn.classList.add('playing');
            }
            document.removeEventListener('click', handleFirstInteraction);
        };
        document.addEventListener('click', handleFirstInteraction, { once: true });
    }

    // ----------------------------------------------------------------------
    // 3. COUNTDOWN TIMER (AUGUST 13, 2026 AT 7:00 PM)
    // ----------------------------------------------------------------------
    function initCountdown() {
        const targetDate = new Date('2026-08-13T19:00:00+03:00').getTime();

        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');

        function updateTimer() {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                if (daysEl) daysEl.textContent = '00';
                if (hoursEl) hoursEl.textContent = '00';
                if (minsEl) minsEl.textContent = '00';
                if (secsEl) secsEl.textContent = '00';
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
            if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
            if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
    initCountdown();

    // ----------------------------------------------------------------------
    // 4. SCROLL REVEAL & NAVBAR SCROLL
    // ----------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));

    // ----------------------------------------------------------------------
    // 5. MOBILE DRAWER NAVIGATION
    // ----------------------------------------------------------------------
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const drawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => drawer.classList.add('open'));
    }
    if (closeDrawerBtn && drawer) {
        closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => drawer.classList.remove('open'));
    });

    // ----------------------------------------------------------------------
    // 6. QR CODE GENERATION
    // ----------------------------------------------------------------------
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer && typeof QRCode !== 'undefined') {
        new QRCode(qrContainer, {
            text: LOCATION_URL,
            width: 180,
            height: 180,
            colorDark: '#1F1717',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Map Preview Toggle
    const toggleMapBtn = document.getElementById('toggle-map-preview-btn');
    const mapBox = document.getElementById('map-preview-box');
    if (toggleMapBtn && mapBox) {
        toggleMapBtn.addEventListener('click', () => {
            mapBox.classList.toggle('hidden');
            if (!mapBox.classList.contains('hidden')) {
                toggleMapBtn.innerHTML = `
                    <svg class="btn-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg> Hide Interactive Map`;
            } else {
                toggleMapBtn.innerHTML = `
                    <svg class="btn-svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                    </svg> View Interactive Map`;
            }
        });
    }

    // ----------------------------------------------------------------------
    // 7. GUESTBOOK / WISHES WALL
    // ----------------------------------------------------------------------
    const WISHES_KEY = 'ahmed_sama_wishes';
    const wishesGrid = document.getElementById('wishes-grid');
    const wishesEmpty = document.getElementById('wishes-empty');
    const wishForm = document.getElementById('wish-form');
    let wishIdCounter = parseInt(localStorage.getItem('ahmed_sama_wish_id') || '0', 10);

    // Clear old default wishes on first load after update
    const wishesVersion = localStorage.getItem('ahmed_sama_wishes_version');
    if (wishesVersion !== '2') {
        localStorage.setItem(WISHES_KEY, JSON.stringify([]));
        localStorage.setItem('ahmed_sama_wishes_version', '2');
    }

    function getWishes() {
        return JSON.parse(localStorage.getItem(WISHES_KEY)) || [];
    }

    function saveWishes(wishes) {
        localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
    }

    function loadWishes() {
        const wishes = getWishes();
        if (!wishesGrid) return;
        wishesGrid.innerHTML = '';

        if (wishes.length === 0) {
            wishesEmpty?.classList.remove('hidden');
        } else {
            wishesEmpty?.classList.add('hidden');
        }

        wishes.forEach(w => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.dataset.id = w.id;

            card.innerHTML = `
                <button class="wish-delete-btn" data-id="${w.id}" title="Delete wish" aria-label="Delete wish">&times;</button>
                <div class="wish-header">
                    <span class="wish-sender">${escapeHTML(w.sender)}</span>
                    <span class="wish-time">${w.time || 'Just now'}</span>
                </div>
                <p class="wish-body">${escapeHTML(w.message)}</p>
            `;
            wishesGrid.appendChild(card);
        });

        document.querySelectorAll('.wish-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id, 10);
                deleteWish(id);
            });
        });
    }

    async function deleteWish(id) {
        const confirmed = await showConfirmDialog('Are you sure you want to delete this wish? This action cannot be undone.');
        if (!confirmed) return;

        const wishes = getWishes().filter(w => w.id !== id);
        saveWishes(wishes);
        loadWishes();
        showToast('Wish deleted');
    }

    function showConfirmDialog(message) {
        return new Promise((resolve) => {
            const modal = document.getElementById('confirm-modal');
            const messageEl = document.getElementById('confirm-message');
            const cancelBtn = document.getElementById('confirm-cancel');
            const okBtn = document.getElementById('confirm-ok');

            if (!modal || !messageEl || !cancelBtn || !okBtn) {
                resolve(window.confirm(message));
                return;
            }

            messageEl.textContent = message;
            modal.removeAttribute('hidden');
            modal.classList.add('active');
            okBtn.focus();

            function cleanup(result) {
                modal.classList.remove('active');
                modal.setAttribute('hidden', '');
                cancelBtn.removeEventListener('click', onCancel);
                okBtn.removeEventListener('click', onOk);
                modal.removeEventListener('click', onBackdrop);
                document.removeEventListener('keydown', onKeydown);
                resolve(result);
            }

            function onCancel() { cleanup(false); }
            function onOk() { cleanup(true); }
            function onBackdrop(e) {
                if (e.target === modal) cleanup(false);
            }
            function onKeydown(e) {
                if (e.key === 'Escape') cleanup(false);
            }

            cancelBtn.addEventListener('click', onCancel);
            okBtn.addEventListener('click', onOk);
            modal.addEventListener('click', onBackdrop);
            document.addEventListener('keydown', onKeydown);
        });
    }

    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sender = document.getElementById('wish-sender').value.trim();
            const message = document.getElementById('wish-message').value.trim();

            if (!sender || !message) return;

            wishIdCounter += 1;
            localStorage.setItem('ahmed_sama_wish_id', String(wishIdCounter));

            const wishes = getWishes();
            wishes.unshift({ id: wishIdCounter, sender, message, time: 'Just now' });
            saveWishes(wishes);

            document.getElementById('wish-sender').value = '';
            document.getElementById('wish-message').value = '';

            loadWishes();
            showToast('Thank you! Your wish has been added ❤️');
        });
    }

    loadWishes();

    // ----------------------------------------------------------------------
    // 10. ADD TO CALENDAR BUTTON
    // ----------------------------------------------------------------------
    const calendarBtn = document.getElementById('add-to-calendar-btn');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', () => {
            const title = encodeURIComponent("Ahmed & Sama Wedding");
            const details = encodeURIComponent("We joyfully invite you to celebrate Ahmed & Sama's wedding at the Artillery Officers Club.");
            const location = encodeURIComponent("Artillery Officers Club - Cairo, Egypt");
            const startDate = "20260813T160000Z";
            const endDate = "20260813T210000Z";

            const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
            window.open(googleCalUrl, '_blank');
        });
    }

    // ----------------------------------------------------------------------
    // 11. SHARE UTILITIES & TOAST
    // ----------------------------------------------------------------------
    const whatsappBtn = document.getElementById('share-whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const text = encodeURIComponent("Ahmed & Sama joyfully invite you to celebrate their wedding on Thursday, August 13, 2026 at the Artillery Officers Club, Cairo. Location: " + LOCATION_URL);
            window.open(`https://wa.me/?text=${text}`, '_blank');
        });
    }

    const copyLocBtn = document.getElementById('copy-location-btn');
    if (copyLocBtn) {
        copyLocBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(LOCATION_URL);
            showToast('Location link copied successfully! 📍');
        });
    }

    const copyInviteBtn = document.getElementById('copy-invitation-link');
    if (copyInviteBtn) {
        copyInviteBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Invitation link copied successfully! 🔗');
        });
    }

    function showToast(msg) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

});
