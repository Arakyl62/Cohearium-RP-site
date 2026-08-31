// Keep the top of the page visible when the document is opened from a previous scroll position.
window.addEventListener('load', () => {
	window.scrollTo(0, 0);
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
});

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

const myrrDropdown = document.querySelector('.myrr-dropdown');
const myrrBar = document.querySelector('.myrr-bar');

if (myrrDropdown && myrrBar) {
	myrrBar.addEventListener('click', () => {
		const isOpen = myrrDropdown.classList.toggle('is-open');
		myrrBar.setAttribute('aria-expanded', String(isOpen));
	});
}

/* ouverture progressive des panels Myrr */
document.querySelectorAll('.myrr-panel').forEach(panel => {
    const content = panel.querySelector('.myrr-panel-content');

    panel.querySelector('summary').addEventListener('click', event => {
        event.preventDefault();

        if (panel.open) {
            content.style.maxHeight = content.scrollHeight + 'px';

            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.padding = '0 28px';
            });

            setTimeout(() => {
                panel.open = false;
            }, 400);

        } else {
            panel.open = true;

            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.style.padding = '0 28px';

            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                content.style.padding = '0 28px 28px';
            });
        }
    });
});