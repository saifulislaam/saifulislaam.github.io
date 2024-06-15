 document.addEventListener('DOMContentLoaded', () => {
            const menuIcon = document.getElementById('menu-icon');
            const navLinks = document.getElementById('nav-links');

            // Toggle nav visibility when menu icon is clicked
            menuIcon.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Hide nav when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Hide nav when clicking outside of it
            document.addEventListener('click', (event) => {
                if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
                    navLinks.classList.remove('active');
                }
            });
        });
