        // --- MATRIX RAIN EFFECT ---
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for(let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Neon Green
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 33);


        // --- TYPEWRITER EFFECT ---
        const textToType = "Full-Stack Web Developer | HTML, CSS, React, Laravel | Building modern web apps.";
        const typeContainer = document.getElementById('typing-text');
        let typeIndex = 0;

        function typeWriter() {
            if (typeIndex < textToType.length) {
                typeContainer.textContent += textToType.charAt(typeIndex);
                typeIndex++;
                setTimeout(typeWriter, 50); // Typing speed
            }
        }
        // Start typing after a brief delay
        setTimeout(typeWriter, 1000);


        // --- SCROLL ANIMATIONS (Intersection Observer) ---
        const revealElements = document.querySelectorAll('.reveal');

        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        };

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver(revealCallback, revealOptions);
        revealElements.forEach(el => observer.observe(el));


        // --- MOBILE MENU TOGGLE ---
        const menuBtn = document.getElementById('menu-btn');
        const sidebar = document.getElementById('sidebar');
        let isMenuOpen = false;

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if(isMenuOpen) {
                sidebar.classList.remove('-translate-x-full');
            } else {
                sidebar.classList.add('-translate-x-full');
            }
        });

        // Close menu when clicking a link on mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if(window.innerWidth < 1024) {
                    sidebar.classList.add('-translate-x-full');
                    isMenuOpen = false;
                }
            });
        });

        // --- ACTIVE LINK HIGHLIGHTER ---
        const sections = document.querySelectorAll('section');
        const navLi = document.querySelectorAll('.sidebar ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if(scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLi.forEach(a => {
                a.classList.remove('active');
                if(a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
        });

