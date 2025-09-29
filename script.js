document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentIndex = 0;

    // --- Lightbox Functionality ---

    // Open Lightbox
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryItems[currentIndex].src;
        lightbox.classList.add('visible');
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    // Navigation (Next/Prev)
    function navigate(direction) {
        // Find all *currently visible* images (for filtering)
        const visibleItems = galleryItems.filter(item => !item.classList.contains('filtered'));

        if (visibleItems.length === 0) return;

        // Find the index of the current lightbox image within the visible set
        let currentVisibleIndex = visibleItems.findIndex(item => item.src === lightboxImg.src);

        // Calculate new index
        currentVisibleIndex = (currentVisibleIndex + direction + visibleItems.length) % visibleItems.length;

        // Update the lightbox image
        lightboxImg.src = visibleItems[currentVisibleIndex].src;
    }


    // Event Listeners for Gallery Items (Click to open)
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Event Listeners for Lightbox Controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Close on overlay click (but not on image content)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
            closeLightbox();
        }
    });


    // --- Bonus: Image Filters/Categories ---
    filterBtns.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Toggle active class on buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter images
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('filtered');
                } else {
                    item.classList.add('filtered');
                }
            });
        });
    });
});