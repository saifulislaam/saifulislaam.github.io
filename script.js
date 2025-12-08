 // --- DATA ---
        const ASSETS = {
            projectMockup: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
            landscape: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
            abstract: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
        };

        const NAV_LINKS = ["Home", "About", "Skills", "Work", "Blog", "Contact"];

        const SKILLS = [
            { name: "HTML5", level: "Expert" },
            { name: "CSS3 / Tailwind", level: "Expert" },
            { name: "JavaScript (ES6+)", level: "Advanced" },
            { name: "React", level: "Advanced" },
            { name: "Node.js", level: "Intermediate" },
            { name: "UI/UX", level: "Advanced" },
            { name: "Animation", level: "Intermediate" },
            { name: "Accessibility", level: "Intermediate" }
        ];

        const PROJECTS = [
            {
                id: "project-1",
                title: "NotePad — Hand-Sketched Notes",
                image: ASSETS.projectMockup,
                desc: "A minimal notes app with playful, tactile micro-interactions and offline-first syncing.",
                tags: ["React", "PWA", "IndexedDB"],
                links: { live: "#", code: "#" },
                caseStudy: {
                    problem: "Digital note-taking feels too sterile and rigid.",
                    solution: "Implemented a canvas-based drawing engine with 'imperfect' rendering logic to mimic graphite.",
                    result: "User engagement increased by 40% due to the 'fun factor'."
                }
            },
            {
                id: "project-2",
                title: "Mountain Store",
                image: ASSETS.landscape,
                desc: "Concept shop for outdoor gear; focus on product pages with hand-drawn annotations.",
                tags: ["HTML", "Tailwind", "Stripe"],
                links: { live: "#", code: "#" },
                caseStudy: {
                    problem: "Outdoor gear needs to feel rugged, not corporate.",
                    solution: "Used texture overlays and rough typography to match the brand identity.",
                    result: "A highly thematic shopping experience."
                }
            },
            {
                id: "project-3",
                title: "Photo Portfolio",
                image: ASSETS.abstract,
                desc: "Photo gallery with sketchy overlays and interactive lightbox resembling paper frames.",
                tags: ["Vanilla JS", "CSS Grid"],
                links: { live: "#", code: "#" },
                caseStudy: null
            },
            {
                id: "project-4",
                title: "SketchKit Dashboard",
                image: ASSETS.projectMockup,
                desc: "Admin dashboard with hand-drawn widgets and playful chart annotations.",
                tags: ["React", "D3"],
                links: { live: "#", code: "#" },
                caseStudy: {
                    problem: "Dashboards are usually boring.",
                    solution: "Added wobble animations to charts and hand-written data labels.",
                    result: "Clients found data less intimidating."
                }
            }
        ];

        const BLOG_POSTS = [
            { title: "Designing With Imperfection", date: "June 01, 2025", excerpt: "Why hand-drawn UI works: personality, trust, and friction reduction." },
            { title: "Animating Chalk", date: "May 15, 2025", excerpt: "Motion techniques that resemble natural chalk dust and smudges." }
        ];

        // --- RENDER FUNCTIONS ---

        function init() {
            renderNav();
            renderSkills();
            renderProjects();
            renderBlog();
            lucide.createIcons(); // Initialize Icons
        }

        function renderNav() {
            const desktopNav = document.getElementById('desktop-nav');
            const mobileNav = document.getElementById('mobile-nav-links');
            
            NAV_LINKS.forEach(link => {
                const targetId = link.toLowerCase();
                
                // Desktop
                const dBtn = document.createElement('a');
                dBtn.href = `#${targetId}`;
                dBtn.className = "text-lg hover:text-chalk-yellow transition-colors relative group font-bold";
                dBtn.innerHTML = `${link}<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-chalk-yellow group-hover:w-full transition-all duration-300 transform -rotate-1"></span>`;
                desktopNav.appendChild(dBtn);

                // Mobile
                const mBtn = document.createElement('a');
                mBtn.href = `#${targetId}`;
                mBtn.onclick = toggleMenu;
                mBtn.className = "text-4xl font-heading font-bold text-white hover:text-chalk-yellow hover:scale-110 transition-transform";
                mBtn.innerText = link;
                mobileNav.appendChild(mBtn);
            });
        }

        function renderSkills() {
            const container = document.getElementById('skills-container');
            SKILLS.forEach(skill => {
                const div = document.createElement('div');
                div.className = "px-8 py-4 border-2 border-white text-xl font-bold hover:border-chalk-yellow hover:text-chalk-yellow hover:-rotate-2 transition-all cursor-default bg-black/40 sketch-border";
                div.innerText = skill.name;
                container.appendChild(div);
            });
        }

        function renderProjects() {
            const grid = document.getElementById('projects-grid');
            PROJECTS.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = "group relative bg-black border-2 border-white p-4 cursor-pointer hover:-translate-y-2 hover:shadow-[8px_8px_0px_#FFFF00] transition-all duration-300 sketch-border";
                card.onclick = () => openModal(index);

                const tagsHtml = project.tags.map(tag => `<span class="text-xs border border-white/50 px-2 py-1 rounded-full">${tag}</span>`).join('');

                card.innerHTML = `
                    <div class="h-48 mb-4 overflow-hidden rounded-[10px_50px_10px_30px] border border-white/20">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                    </div>
                    <h3 class="text-2xl font-heading font-bold text-chalk-yellow mb-2">${project.title}</h3>
                    <p class="text-gray-300 mb-4 line-clamp-3 text-sm">${project.desc}</p>
                    <div class="flex flex-wrap gap-2 mt-auto">${tagsHtml}</div>
                `;
                grid.appendChild(card);
            });
        }

        function renderBlog() {
            const grid = document.getElementById('blog-grid');
            BLOG_POSTS.forEach(post => {
                const div = document.createElement('div');
                div.className = "border-b-2 border-dashed border-white/30 pb-6 hover:bg-white/5 p-4 transition-colors rounded-lg";
                div.innerHTML = `
                    <div class="text-chalk-pink font-bold text-sm mb-2">${post.date}</div>
                    <h3 class="text-2xl font-bold mb-3 hover:text-chalk-yellow cursor-pointer">${post.title}</h3>
                    <p class="text-gray-400">${post.excerpt}</p>
                    <a href="#" class="inline-block mt-4 text-chalk-yellow hover:underline decoration-wavy">Read More &rarr;</a>
                `;
                grid.appendChild(div);
            });
        }

        // --- INTERACTIONS ---

        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('opacity-0')) {
                menu.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                menu.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        function openModal(index) {
            const project = PROJECTS[index];
            const overlay = document.getElementById('modal-overlay');
            const body = document.getElementById('modal-body');

            let caseStudyHtml = `<p class="italic text-gray-400">Full case study coming soon...</p>`;
            
            if (project.caseStudy) {
                caseStudyHtml = `
                    <div class="bg-white/5 p-6 rounded-lg border border-white/20">
                        <h4 class="text-chalk-yellow text-xl font-bold mb-4">Case Study Sketch</h4>
                        <div class="space-y-4">
                            <p><strong class="text-chalk-pink">The Problem:</strong> ${project.caseStudy.problem}</p>
                            <p><strong class="text-chalk-pink">The Sketch:</strong> ${project.caseStudy.solution}</p>
                            <p><strong class="text-chalk-pink">The Result:</strong> ${project.caseStudy.result}</p>
                        </div>
                    </div>
                `;
            }

            body.innerHTML = `
                <h3 class="text-chalk-yellow text-3xl font-bold mb-4 font-heading">${project.title}</h3>
                <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover mb-6 sketch-border" />
                
                <div class="space-y-6 font-body text-lg">
                    <div>
                        <h4 class="text-xl font-bold mb-2 border-b-2 border-dashed border-white/30 inline-block">Project Overview</h4>
                        <p class="leading-relaxed">${project.desc}</p>
                    </div>

                    ${caseStudyHtml}

                    <div class="flex gap-4 mt-8">
                        <a href="${project.links.live}" class="btn-primary sketch-border">Live Demo</a>
                        <a href="${project.links.code}" class="btn-secondary sketch-border">View Code</a>
                    </div>
                </div>
            `;

            overlay.classList.remove('modal-hidden');
            overlay.classList.add('modal-visible');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        function closeModal() {
            const overlay = document.getElementById('modal-overlay');
            overlay.classList.remove('modal-visible');
            overlay.classList.add('modal-hidden');
            document.body.style.overflow = 'auto';
        }

        // Close modal on click outside
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') closeModal();
        });

        // Form Handling
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = 'Sketching...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Sent! <i data-lucide="check" class="w-5 h-5"></i>';
                btn.classList.add('bg-green-600', 'border-green-600');
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.remove('bg-green-600', 'border-green-600');
                    btn.disabled = false;
                    document.getElementById('contact-form').reset();
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });

        // Initialize App
        window.onload = init;
