// Highlights the menu item for the section currently visible on screen.
const menuLinks = document.querySelectorAll('.main-menu a');
const sections = document.querySelectorAll('[id]');

const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		}

		menuLinks.forEach((link) => {
			link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
		});
	});
}, { threshold: 0.45 });

sections.forEach((section) => sectionObserver.observe(section));
