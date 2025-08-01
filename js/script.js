document.addEventListener('DOMContentLoaded', () => {
    // === INITIALIZATIONS ===
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true
    });
    gsap.registerPlugin(ScrollTrigger);

    // === NAME MODAL ===
    const nameModal = document.getElementById('name-modal');
    const nameModalContent = document.getElementById('name-modal-content');
    const nameModalOverlay = document.getElementById('name-modal-overlay');
    const nameModalClose = document.getElementById('name-modal-close');
    const nameForm = document.getElementById('name-form');
    const userNameInput = document.getElementById('user-name-input');
    const userNameSpan = document.getElementById('user-name');
    const typingText = document.getElementById('typing-text');

    // Sembunyikan tombol close agar pengguna tahu tidak bisa diklik
    if (nameModalClose) {
        nameModalClose.style.display = 'none';
    }

    const showNameModal = () => {
        document.body.classList.add('modal-active'); // Tambahkan kelas saat modal ditampilkan
        nameModal.classList.remove('hidden');
        gsap.to(nameModalContent, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' });
    };

    const closeNameModal = () => {
        gsap.to(nameModalContent, {
            scale: 0.95,
            opacity: 0,
            duration: 0.2,
            ease: 'power3.in',
            onComplete: () => {
                nameModal.classList.add('hidden');
                document.body.classList.remove('modal-active'); // Hapus kelas saat modal ditutup
                document.body.style.position = ''; // Reset posisi body
                document.body.style.width = ''; // Reset lebar body
                document.body.style.height = ''; // Reset tinggi body
                // Reset viewport untuk mencegah zoom
                document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                window.scrollTo(0, 0); // Kembali ke posisi atas
                // Paksa refresh layout
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            }
        });
    };

    // Selalu tampilkan modal saat halaman dimuat
    showNameModal();

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = userNameInput.value.trim();

        // Hanya tutup modal jika nama tidak kosong
        if (name) {
            userNameSpan.textContent = name; // Update nama di H1
            closeNameModal();
            startTypingAnimation(); // Mulai animasi mengetik setelah nama disubmit
        } else {
            // Opsional: Beri feedback jika pengguna mencoba submit nama kosong
            userNameInput.placeholder = "Nama tidak boleh kosong!";
            gsap.from(nameModalContent, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'power2.inOut' });
        }
    });

    // --- PERUBAHAN DI BAWAH INI ---
    // Event listener untuk tombol close dan overlay dinonaktifkan/dihapus
    // nameModalClose.addEventListener('click', closeNameModal);
    // nameModalOverlay.addEventListener('click', closeNameModal);


    // === TYPING ANIMATION ===
    const phrases = [
        'Welcome to My Portfolio',
        'Crafting Innovative Digital Experiences',
        'Explore My Creative Journey'
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeTimeout;

    const type = () => {
        clearTimeout(typeTimeout);
        const currentPhrase = phrases[currentPhraseIndex];
        let delay = 100;

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex--);
            delay = 50;
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                delay = 500;
            }
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex++);
            if (currentCharIndex > currentPhrase.length) {
                isDeleting = true;
                delay = 1500;
            }
        }
        typeTimeout = setTimeout(type, delay);
    };

    const startTypingAnimation = () => {
        currentPhraseIndex = 0;
        currentCharIndex = 0;
        isDeleting = false;
        typingText.textContent = '';
        type();
    };


    // === DYNAMIC SKILLS ===
    const skills = [
        { name: "JavaScript", icon: `<img src="assets/icons/js.png" class="h-5 w-5" alt="JavaScript">` },
        { name: "TypeScript", icon: `<img src="assets/icons/ts.png" class="h-5 w-5" alt="TypeScript">` },
        { name: "React", icon: `<img src="assets/icons/react.png" class="h-5 w-5" alt="React">` },
        { name: "Laravel", icon: `<img src="assets/icons/laravel.png" class="h-5 w-5" alt="Laravel">` },
        { name: "Tailwind CSS", icon: `<img src="assets/icons/tailwind.png" class="h-5 w-5" alt="Tailwind CSS">` },
        { name: "Dart", icon: `<img src="assets/icons/dart.png" class="h-5 w-5" alt="Dart">` },
        { name: "Flutter", icon: `<img src="assets/icons/flutter.png" class="h-5 w-5" alt="Flutter">` },
    ];

    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'flex items-center space-x-3 skill-item p-3 rounded-lg shadow-md transition-transform hover:scale-105';
        skillElement.innerHTML = `${skill.icon}<span class="font-semibold">${skill.name}</span>`;
        skillsContainer.appendChild(skillElement);
    });

    // === DARK MODE TOGGLE (VANILLA CSS METHOD) ===
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    const setDarkMode = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    const prefersDark = localStorage.getItem('theme') === 'dark' ||
        (localStorage.getItem('theme') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(prefersDark);

    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        setDarkMode(isDark);
    });

    // === FORM SUBMISSION ===
    document.getElementById('message-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const message = document.getElementById('message-text').value;
        const outputContainer = document.getElementById('message-output');
        const placeholder = document.getElementById('placeholder-message');

        if (placeholder) placeholder.style.display = 'none';

        const now = new Date();
        const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        const currentTime = `${date}, ${time}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble shadow-md rounded-lg p-4 space-y-1 text-sm';

        messageBubble.innerHTML = `
            <p><span class="font-semibold">Time:</span> ${currentTime}</p>
            <p><span class="font-semibold">Name:</span> ${name}</p>
            <p><span class="font-semibold">Date of Birth:</span> ${dob}</p>
            <p><span class="font-semibold">Gender:</span> ${gender}</p>
            <p><span class="font-semibold">Message:</span> ${message}</p>
        `;

        outputContainer.appendChild(messageBubble);
        outputContainer.scrollTop = outputContainer.scrollHeight;
        gsap.from(messageBubble, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
        e.target.reset();
    });

    // === SISA KODE (TIDAK ADA PERUBAHAN) ===

    // === MOBILE MENU TOGGLE ===
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // === BACK TO TOP BUTTON ===
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            gsap.to(backToTopButton, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
        } else {
            gsap.to(backToTopButton, { y: 100, autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (this.classList.contains('mobile-nav-link')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // === PORTFOLIO MODAL ===
    const portfolioModal = document.getElementById('portfolio-modal');
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const openModal = (card) => {
        const title = card.dataset.title;
        const description = card.dataset.description;
        const techStack = card.dataset.tech.split(',').map(tech => tech.trim());
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-description').textContent = description;
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        techStack.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300 text-sm font-semibold px-3 py-1 rounded-full';
            techContainer.appendChild(techTag);
            techTag.textContent = tech;
        });
        portfolioModal.classList.remove('hidden');
        gsap.to(modalContent, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' });
    };
    const closeModal = () => {
        gsap.to(modalContent, {
            scale: 0.95, opacity: 0, duration: 0.2, ease: 'power3.in', onComplete: () => {
                portfolioModal.classList.add('hidden');
            }
        });
    };
    portfolioCards.forEach(card => card.addEventListener('click', () => openModal(card)));
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // === GSAP ANIMATIONS ===
    gsap.from(".hero-element", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out" });
    gsap.to("#profile-image", {
        scale: 1.1,
        scrollTrigger: {
            trigger: "#profile",
            start: "top center",
            end: "bottom center",
            scrub: true,
        }
    });
});