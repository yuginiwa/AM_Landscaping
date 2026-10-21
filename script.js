/**
 * A.M. Builders & Landscaping Services
 * NFC Contact Landing Page Logic
 * Zero dependencies, ultra-fast, mobile touch-optimized
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Sticky Header Scroll Indicator
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Toast Notification System
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 4. Copy-to-Clipboard Functionality
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetBtn = e.currentTarget;
      const text = targetBtn.getAttribute('data-copy');
      if (!text) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers / non-HTTPS local contexts
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast(`Copied: ${text}`);
      } catch (err) {
        showToast('Copied to clipboard');
      }
    });
  });

  // 5. Contact VCF Download Feedback
  const vcfLinks = [
    document.getElementById('save-contact-action'),
    document.getElementById('mobile-vcf-btn')
  ];
  vcfLinks.forEach(link => {
    if (link) {
      link.addEventListener('click', () => {
        showToast('Contact card downloaded! Open to add to phone.', 3800);
      });
    }
  });

  // 6. Portfolio Projects Data
  const projectDetails = {
    glass: {
      name: 'Glass House with Loft',
      category: 'RESIDENTIAL · 2024',
      location: 'Makati, Metro Manila',
      images: ['glass-1', 'glass-2', 'glass-3'],
      descriptions: [
        'Glass House exterior facade with patio entrance',
        'Interior loft, bespoke stairs and modern kitchen view',
        'Structural and finishing work in progress'
      ],
      inquiryMsg: 'Hello A.M. Builders! I saw your Glass House with Loft project and would like to ask about residential construction.'
    },
    darkberry: {
      name: 'Darkberry Cafe',
      category: 'COMMERCIAL · 2023',
      location: 'Dasmariñas, Cavite',
      images: ['darkberry-1', 'darkberry-2', 'darkberry-3'],
      descriptions: [
        'Completed Darkberry Cafe illuminated storefront',
        'Custom front counter and specialty cafe interior fit-out',
        'Customer seating area with bespoke wood and steel works'
      ],
      inquiryMsg: 'Hello A.M. Builders! I saw your Darkberry Cafe project and would like to ask about commercial interior fit-outs.'
    },
    bellazone: {
      name: 'Bellazone Subdivision',
      category: 'RESIDENTIAL · 2023',
      location: 'Bacoor, Cavite',
      images: ['bellazone-1', 'bellazone-2', 'bellazone-3'],
      descriptions: [
        'Covered carport roofing and structural steel work',
        'Carport front elevation with ceiling lighting',
        'Finished residential facade, perimeter wall and steel gate'
      ],
      inquiryMsg: 'Hello A.M. Builders! I would like to inquire about home extensions, roofing, and carport works.'
    },
    bolasco: {
      name: 'Bolasco Farm',
      category: 'OUTDOOR · 2023',
      location: 'Angat, Bulacan',
      images: ['bolasco-1', 'bolasco-2', 'bolasco-3'],
      descriptions: [
        'Farm cabin, landscape pathway and outdoor setting',
        'Covered outdoor parking and utility area',
        'Open-air leisure grounds with preserved mature canopy trees'
      ],
      inquiryMsg: 'Hello A.M. Builders! I saw your Bolasco Farm project and would like to inquire about landscaping and property development.'
    },
    cornerstone: {
      name: 'Cornerstone Executive Village',
      category: 'RESIDENTIAL · 2023',
      location: 'Imus, Cavite',
      images: ['cornerstone-1', 'cornerstone-2', 'cornerstone-3'],
      descriptions: [
        'Multi-level residential facade and perimeter steel gate',
        'Modern interior kitchen and custom cabinetry installation',
        'Bright interior living space with architectural staircase'
      ],
      inquiryMsg: 'Hello A.M. Builders! I saw your Cornerstone project and would like to inquire about residential building and interiors.'
    },
    taifini: {
      name: 'Taifini Copper & Conductor',
      category: 'COMMERCIAL · 2023',
      location: 'Silang, Cavite',
      images: ['taifini-1', 'taifini-2', 'taifini-3'],
      descriptions: [
        'Industrial facility ceiling trusses and overhead high-bay lighting',
        'Ceiling structural installation and MEP services in progress',
        'Completed industrial facility lighting and ceiling fit-out'
      ],
      inquiryMsg: 'Hello A.M. Builders! I would like to inquire about commercial civil, MEP, and industrial structural works.'
    }
  };

  // 7. Project Gallery Lightbox Dialog
  const projectDialog = document.getElementById('project-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogCategory = document.getElementById('dialog-category');
  const dialogLocation = document.getElementById('dialog-location');
  const dialogPhoto = document.getElementById('dialog-photo');
  const dialogDescription = document.getElementById('dialog-description');
  const dialogCount = document.getElementById('gallery-count');
  const dialogDotsContainer = document.getElementById('gallery-dots');
  const dialogInquiryBtn = document.getElementById('dialog-inquiry-btn');
  const dialogCloseBtn = document.getElementById('dialog-close');
  const galleryPrev = document.getElementById('gallery-prev');
  const galleryNext = document.getElementById('gallery-next');
  const galleryStage = document.getElementById('gallery-stage');

  let activeProject = null;
  let galleryIndex = 0;

  function renderGallery() {
    if (!activeProject) return;
    const total = activeProject.images.length;
    const imgName = activeProject.images[galleryIndex];
    const desc = activeProject.descriptions[galleryIndex];

    dialogPhoto.style.opacity = '0';
    setTimeout(() => {
      dialogPhoto.src = `assets/${imgName}.webp`;
      dialogPhoto.alt = desc;
      dialogDescription.textContent = desc;
      dialogCount.textContent = `${galleryIndex + 1} / ${total}`;
      dialogPhoto.style.opacity = '1';
    }, 120);

    // Update dots
    const dots = dialogDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === galleryIndex);
      dot.setAttribute('aria-pressed', idx === galleryIndex ? 'true' : 'false');
    });

    // Update Inquire button
    if (dialogInquiryBtn) {
      const msg = encodeURIComponent(activeProject.inquiryMsg);
      dialogInquiryBtn.href = `https://m.me/ambuilderslandscapingservices?text=${msg}`;
    }
  }

  function openProject(projectId) {
    activeProject = projectDetails[projectId];
    if (!activeProject) return;

    galleryIndex = 0;
    dialogTitle.textContent = activeProject.name;
    dialogCategory.textContent = activeProject.category;
    dialogLocation.textContent = activeProject.location;

    // Render dot indicators
    dialogDotsContainer.innerHTML = '';
    activeProject.images.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Photo ${idx + 1}`);
      dot.addEventListener('click', () => {
        galleryIndex = idx;
        renderGallery();
      });
      dialogDotsContainer.appendChild(dot);
    });

    renderGallery();
    if (typeof projectDialog.showModal === 'function') {
      projectDialog.showModal();
    }
  }

  function moveGallery(step) {
    if (!activeProject) return;
    const total = activeProject.images.length;
    galleryIndex = (galleryIndex + step + total) % total;
    renderGallery();
  }

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.project));
  });

  if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener('click', () => projectDialog.close());
  }
  if (galleryPrev) {
    galleryPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      moveGallery(-1);
    });
  }
  if (galleryNext) {
    galleryNext.addEventListener('click', (e) => {
      e.stopPropagation();
      moveGallery(1);
    });
  }

  projectDialog.addEventListener('click', (e) => {
    if (e.target === projectDialog) projectDialog.close();
  });

  projectDialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveGallery(-1);
    else if (e.key === 'ArrowRight') moveGallery(1);
    else if (e.key === 'Escape') projectDialog.close();
  });

  // Mobile Touch Swipe Gesture on Gallery
  let touchStartX = 0;
  let touchEndX = 0;
  if (galleryStage) {
    galleryStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) {
          moveGallery(1); // Swiped Left -> Next
        } else {
          moveGallery(-1); // Swiped Right -> Prev
        }
      }
    }, { passive: true });
  }

  // 8. Project Category Filters
  const filterButtons = document.querySelectorAll('.project-filter .filter');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filterButtons.forEach(b => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });

      projectCards.forEach(card => {
        const match = category === 'all' || card.dataset.category === category;
        card.hidden = !match;
      });
    });
  });

  // 9. QR Code & Card Sharing Dialog
  const qrDialog = document.getElementById('qr-dialog');
  const qrDialogClose = document.getElementById('qr-dialog-close');
  const qrTriggers = [
    document.getElementById('header-qr-btn'),
    document.getElementById('hero-share-btn'),
    document.getElementById('qr-trigger-card')
  ];
  const qrShareNativeBtn = document.getElementById('qr-share-native-btn');
  const qrCopyLinkBtn = document.getElementById('qr-copy-link-btn');

  function openQRModal() {
    if (qrDialog && typeof qrDialog.showModal === 'function') {
      qrDialog.showModal();
    }
  }

  qrTriggers.forEach(btn => {
    if (btn) btn.addEventListener('click', openQRModal);
  });

  if (qrDialogClose) {
    qrDialogClose.addEventListener('click', () => qrDialog.close());
  }

  qrDialog.addEventListener('click', (e) => {
    if (e.target === qrDialog) qrDialog.close();
  });

  if (qrShareNativeBtn) {
    qrShareNativeBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'A.M. Builders & Landscaping Services',
        text: 'A.M. Builders & Landscaping Services — Official Contact Card & Portfolio',
        url: window.location.href
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          showToast('Shared successfully!');
          qrDialog.close();
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyCardUrl();
          }
        }
      } else {
        copyCardUrl();
      }
    });
  }

  async function copyCardUrl() {
    try {
      const currentUrl = window.location.href;
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = currentUrl;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast('Card link copied to clipboard!');
      if (qrDialog.open) qrDialog.close();
    } catch (e) {
      showToast('Card URL: ' + window.location.href);
    }
  }

  if (qrCopyLinkBtn) {
    qrCopyLinkBtn.addEventListener('click', copyCardUrl);
  }
});
