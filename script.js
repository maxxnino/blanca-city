/* ═══════════════════════════════════════════════
   BLANCA CITY – script.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     AGENT SYSTEM
     ──────────────────────────────────────────────────────────────
     Mỗi thành viên là một object trong AGENTS.
     Truy cập bằng URL: ?agent=nam  hoặc  ?agent=linh  v.v.

     Các trường:
       name     – Tên hiển thị đầy đủ
       role     – Chức danh / vai trò
       phone    – Số điện thoại (dùng cho href="tel:...")
       phoneDisplay – Số hiển thị với khoảng cách (vd: 0898 6789 86)
       zalo     – Link Zalo đầy đủ (https://zalo.me/SỐ_ĐIỆN_THOẠI)
       avatar   – Đường dẫn ảnh đại diện (vd: images/nam.jpg)
       footer   – Dòng ghi chú dưới footer (tuỳ chọn, bỏ qua để dùng tên mặc định)

     ► THÊM THÀNH VIÊN MỚI: copy một block dưới đây, đổi key và điền thông tin.
  ══════════════════════════════════════════════════════════════ */

  const AGENTS = {

    nam: {
      name: 'Dương Phương Nam',
      role: 'Trưởng phòng kinh doanh · Blanca City Vũng Tàu',
      phone: '0898678986',
      phoneDisplay: '0898 6789 86',
      zalo: 'https://zalo.me/0898678986',
      avatar: 'images/nam.jpg',
      footer: 'Dương Phương Nam - Trưởng phòng kinh doanh Blanca City',
    },
    "tran-ky": {
      name: "Trần Thị Kỳ",
      role: "Trưởng phòng kinh doanh · Blanca City Vũng Tàu",
      phone: "0768149568",
      phoneDisplay: "0768 149 568",
      zalo: 'https://zalo.me/0768149568',
      avatar: "images/tran-ky.jpg",
      footer: 'Trần Thị Kỳ - Trưởng phòng kinh doanh Blanca City',
    },
    "tu-anh": {
      name: "Nguyễn Khoa Tú Anh",
      role: "Trưởng phòng kinh doanh · Blanca City Vũng Tàu",
      phone: "0901107776",
      phoneDisplay: "090 110 7776",
      zalo: 'https://zalo.me/0901107776',
      avatar: "images/tu-anh.jpg",
      footer: 'Nguyễn Khoa Tú Anh - Trưởng phòng kinh doanh Blanca City',
    },
    "thien-khiem": {
      name: "Trần Thiện Khiêm",
      role: "PGĐ Kinh Doanh D.A Blanca City - Vũng Tàu by Sun Group",
      phone: "0932787278",
      phoneDisplay: "0932 78 72 78",
      zalo: 'https://zalo.me/0932787278',
      avatar: "images/thien-khiem.jpg",
      footer: 'Trần Thiện Khiêm - PGĐ Kinh Doanh D.A Blanca City - Vũng Tàu',
    }

    // ── THÊM THÀNH VIÊN MỚI Ở ĐÂY ───────────────────────────────
    // hung: {
    //   name:         'Trần Văn Hùng',
    //   role:         'Chuyên viên tư vấn · Blanca City Vũng Tàu',
    //   phone:        '0912345678',
    //   phoneDisplay: '0912 345 678',
    //   zalo:         'https://zalo.me/0912345678',
    //   avatar:       'images/hung.jpg',
    //   footer:       'Trần Văn Hùng - Chuyên viên tư vấn Blanca City',
    // },

  };

  /* ── Giá trị mặc định khi không có ?agent= trong URL ─────────── */
  const DEFAULT_AGENT = 'nam';

  /* ── Đọc ?agent= từ URL và áp dụng vào trang ─────────────────── */
  function applyAgent() {
    const params = new URLSearchParams(window.location.search);
    const key = (params.get('agent') || DEFAULT_AGENT).toLowerCase().trim();
    const agent = AGENTS[key] || AGENTS[DEFAULT_AGENT];

    /* Zalo links (sticky CTA + hero buttons + final CTA) */
    document.querySelectorAll('a[href*="zalo.me"]').forEach((el) => {
      el.href = agent.zalo;
    });

    /* Phone link */
    document.querySelectorAll('a[href^="tel:"]').forEach((el) => {
      el.href = 'tel:' + agent.phone;
      /* Update visible phone number text if it looks like a number */
      if (el.querySelector('span')) {
        el.querySelector('span').textContent = 'Gọi: ' + agent.phoneDisplay;
      }
    });

    /* Contact card – avatar */
    const avatar = document.querySelector('.contact-avatar');
    if (avatar) {
      avatar.src = agent.avatar;
      avatar.alt = agent.name;
    }

    /* Contact card – name & role */
    const contactName = document.querySelector('.contact-info strong');
    const contactRole = document.querySelector('.contact-info span');
    if (contactName) contactName.textContent = agent.name;
    if (contactRole) contactRole.textContent = agent.role;

    /* Footer copyright line */
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      footerCopy.textContent = '© 2025 ' + (agent.footer || agent.name);
    }
  }

  applyAgent();

  /* ══════════════════════════════════════════════════════════════
     PHẦN CÒN LẠI GIỮ NGUYÊN
  ══════════════════════════════════════════════════════════════ */

  /* ── 1. SCROLL REVEAL ─────────────────────────── */
  const revealEls = document.querySelectorAll('.animate-on-scroll');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
          let idx = Array.from(siblings).indexOf(entry.target);
          const parent = entry.target.parentElement;
          if (parent.classList.contains('amenities-grid') ||
            parent.classList.contains('psych-points') ||
            parent.classList.contains('press-list')) {
            idx = Math.min(idx, 6);
            entry.target.style.transitionDelay = `${idx * 0.07}s`;
          }
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── 2. STICKY BOTTOM CTA ─────────────────────── */
  const stickyCta = document.getElementById('stickyCta');
  let stickyShown = false;

  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!stickyShown) {
          stickyCta.classList.add('visible');
          stickyShown = true;
        }
      } else {
        stickyCta.classList.remove('visible');
        stickyShown = false;
      }
    },
    { threshold: 0.05 }
  );
  const stickyPart = document.getElementById('show-cta');
  if (stickyPart) stickyObserver.observe(stickyPart);

  /* ── 3. PARALLAX ─────────────────────────────── */
  const heroVideos = document.querySelectorAll('.hero-video');

  function onScroll() {
    const scrollY = window.scrollY;
    heroVideos.forEach((vid) => {
      const section = vid.closest('.hero-section');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible) return;
      const progress = (scrollY - section.offsetTop) / section.offsetHeight;
      const shift = progress * 40;
      vid.style.transform = `translateY(${shift}px) scale(1.05)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 4. LAZY VIDEO AUTOPLAY ───────────────────── */
  const bgVideos = document.querySelectorAll('.hero-video');

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      });
    },
    { threshold: 0.1 }
  );
  bgVideos.forEach((v) => videoObserver.observe(v));

  /* ── 5. SMOOTH SCROLL ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 6. ZALO iOS FALLBACK ─────────────────────── */
  function isZaloIOS() {
    const ua = navigator.userAgent || '';
    const isZalo = /ZaloApp|Zalo\/|zalo/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    return isZalo && isIOS;
  }

  const videos = [
    document.getElementById('videoWaterpark'),
    document.getElementById('videoFireworks')
  ];

  if (isZaloIOS()) {
    for (const video of videos) {
      if (!video) continue;
      const wrap = video.closest('.hero-video-wrap');
      wrap.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${video.poster})`;
      wrap.style.backgroundSize = 'cover';
      wrap.style.backgroundPosition = 'center';
      video.style.display = 'none';
    }
  }

})();
