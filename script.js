// Hero Database Dataset
const heroesData = [
    { name: "Tigreal", role: "Tank", specialty: "Crowd Control / Init", winRate: "52.1%", difficulty: "Medium" },
    { name: "Fanny", role: "Assassin", specialty: "Chase / Reap", winRate: "49.8%", difficulty: "Hard" },
    { name: "Gusion", role: "Assassin", specialty: "Burst / Magic Damage", winRate: "50.3%", difficulty: "Hard" },
    { name: "Layla", role: "Marksman", specialty: "Damage / Push", winRate: "48.5%", difficulty: "Easy" },
    { name: "Miya", role: "Marksman", specialty: "Reap / Conceal", winRate: "49.2%", difficulty: "Easy" },
    { name: "Valentina", role: "Mage", specialty: "Burst / Control", winRate: "51.7%", difficulty: "Hard" },
    { name: "Pharsa", role: "Mage", specialty: "Poke / Burst", winRate: "52.4%", difficulty: "Medium" },
    { name: "Chou", role: "Fighter", specialty: "Initiator / Control", winRate: "50.9%", difficulty: "Hard" },
    { name: "X.Borg", role: "Fighter", specialty: "Regen / AoE", winRate: "53.0%", difficulty: "Easy" },
    { name: "Minotaur", role: "Tank", specialty: "Support / Crowd Control", winRate: "53.8%", difficulty: "Easy" },
    { name: "Mathilda", role: "Support", specialty: "Guard / Initiate", winRate: "51.2%", difficulty: "Medium" },
    { name: "Claude", role: "Marksman", specialty: "Burst / Chase", winRate: "51.5%", difficulty: "Medium" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const navButtons = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update active states for buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active states for tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });

            // Close mobile menu if open
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Hero Database Rendering & Filtering
    const heroGrid = document.getElementById('hero-grid');
    const heroSearchInput = document.getElementById('hero-search');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';
    let searchQuery = '';

    function renderHeroes() {
        heroGrid.innerHTML = '';

        const filtered = heroesData.filter(hero => {
            const matchesRole = currentFilter === 'all' || hero.role.toLowerCase() === currentFilter.toLowerCase();
            const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  hero.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  hero.specialty.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesRole && matchesSearch;
        });

        if (filtered.length === 0) {
            heroGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No heroes found matching your search.</p>`;
            return;
        }

        filtered.forEach(hero => {
            const card = document.createElement('div');
            card.className = 'hero-card';
            card.innerHTML = `
                <div class="hero-header">
                    <span class="hero-name">${hero.name}</span>
                    <span class="hero-role">${hero.role}</span>
                </div>
                <div class="hero-details">
                    <p><strong>Specialty:</strong> ${hero.specialty}</p>
                </div>
                <div class="hero-stats-mini">
                    <span>Win Rate: <strong>${hero.winRate}</strong></span>
                    <span>Diff: <strong>${hero.difficulty}</strong></span>
                </div>
            `;
            heroGrid.appendChild(card);
        });
    }

    // Search Input Listener
    if (heroSearchInput) {
        heroSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderHeroes();
        });
    }

    // Role Filter Buttons Listener
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderHeroes();
        });
    });

    // Initial render
    renderHeroes();
});