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
document.querySelectorAll('.panel').forEach(panel => {
    const content = panel.querySelector('.panel-content');

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

/* Gestion du carrousel de lore */
const loreEntries = [
    {
        image: "nid.jpg",
        title: "Le nid",
        description:
            "Les anciennes maisons des naturalistes, aménagées directement dans la roche ou sur des plateformes de bois, liées entre elles par des passerelles ou des ponts suspendus. Ou ce qu'il en reste, la plupart sont détruites servant comme repaire de virus."
    },

    {
        image: "canopée.jpg",
        title: "La grande canopée",
        description:
            "Une immense structuer d'accrobranche. Filets, ponts suspendus et tyroliennes sont au menu. Une des premières installation de Veyrass Industries, elle est étonnament en bon état malgré les attaques de vius."
    },

    {
        image: "Eagle-top.jpg",
        title: "Eagle-top",
        description:
            "Rien de plus simple que le point le plus culminant de Peaks, une formation verticale rocheuse. Transformée en belvédère, elle offre une vie imprenable sur l'entièreté de la vallée. Seul problème, la difficulté d'accès. C'est un lieu parfait pour les sportifs et les amateurs, servant aussi d'un départ d'escalade."
    },

    {
        image: "Galeries.jpg",
        title: "Galeries",
        description:
            "Des galeries creusées pour laisser passer des roller coasters qui sillonnent les montagnes, aussi bien autour qu'au travers, et zigzagant à travers les profondeurs de la forêt. Un tajet rapide pour une découverte mouvementée à pleine vitesse. Je ne garantis pas l'état actuel des rails."
    },

    {
        image: "théâtre-cimes.jpg",
        title: "Le théâtre des cimes",
        description:
            "Un théâtre naturel construit dans une des ruches rocheuses de Peaks. Prévu pour accueillir des spectacles en plein air. La scène est encore intacte, les virus semblent y avoir trouvé un certain intérêt..."
    },
];

let currentIndex = 0;
let loreUpdateTimer;

// Récupération des éléments HTML
const image = document.getElementById("lore-image");
const title = document.getElementById("lore-title");
const description = document.getElementById("lore-description");
const counter = document.getElementById("lore-counter");
const loreIndex = document.getElementById("lore-index");
const progressFill = document.getElementById("lore-progress-fill");
const thumbnails = document.getElementById("lore-thumbnails");
const coordinate = document.getElementById("lore-coordinate");
const carousel = document.querySelector(".lore-carousel");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

if (image && title && description && counter && loreIndex && progressFill && thumbnails && coordinate && carousel && previousButton && nextButton) {
    const formatIndex = (index) => String(index + 1).padStart(2, "0");

    loreEntries.forEach((entry, index) => {
        const button = document.createElement("button");
        const thumbnail = document.createElement("img");
        const label = document.createElement("span");

        button.type = "button";
        button.className = "lore-thumbnail";
        button.setAttribute("aria-label", `Afficher ${entry.title}`);
        button.setAttribute("aria-pressed", String(index === currentIndex));
        thumbnail.src = entry.image;
        thumbnail.alt = "";
        thumbnail.loading = "lazy";
        label.textContent = entry.title;
        button.append(thumbnail, label);
        button.addEventListener("click", () => updateLore(index));
        thumbnails.append(button);
    });

    function updateLore(index) {
        currentIndex = (index + loreEntries.length) % loreEntries.length;
        const entry = loreEntries[currentIndex];

        image.classList.add("is-changing");
        clearTimeout(loreUpdateTimer);

        loreUpdateTimer = setTimeout(() => {
            image.src = entry.image;
            image.alt = entry.title;
            title.textContent = entry.title;
            description.textContent = entry.description;
            counter.innerHTML = `${formatIndex(currentIndex)} <span>/ ${String(loreEntries.length).padStart(2, "0")}</span>`;
            loreIndex.innerHTML = `Dossier ${formatIndex(currentIndex)} <span>/ ${String(loreEntries.length).padStart(2, "0")}</span>`;
            coordinate.textContent = `C / ${formatIndex(currentIndex)}`;
            progressFill.style.width = `${((currentIndex + 1) / loreEntries.length) * 100}%`;
            thumbnails.querySelectorAll(".lore-thumbnail").forEach((button, buttonIndex) => {
                const isCurrent = buttonIndex === currentIndex;
                button.classList.toggle("is-current", isCurrent);
                button.setAttribute("aria-pressed", String(isCurrent));
            });
            image.classList.remove("is-changing");
        }, 180);
    }

    nextButton.addEventListener("click", () => updateLore(currentIndex + 1));
    previousButton.addEventListener("click", () => updateLore(currentIndex - 1));
    carousel.addEventListener("keydown", (event) => {
        if (event.target.matches("button, input, textarea, select")) return;
        if (event.key === "ArrowRight") updateLore(currentIndex + 1);
        if (event.key === "ArrowLeft") updateLore(currentIndex - 1);
    });

    updateLore(currentIndex);
}