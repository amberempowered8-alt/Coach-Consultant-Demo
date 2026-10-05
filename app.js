// =========================================================================
// COACH & CONSULTANT BOOKING TEMPLATE — CONFIG
// Edit everything in the CONFIG object below. You don't need to touch
// index.html or style.css to customize the content.
//
// Your SERVICES and TESTIMONIALS are kept up to date automatically from
// Airtable — see SETUP-GUIDE.md for the one-time setup. You never paste
// any secret token into this file.
// =========================================================================

const CONFIG = {
    coachName: "Clear Harbor Coaching",

    heroHeadline: "Ready for your next career move? Let's make it on purpose.",
    heroSubtext: "Career transition coaching for mid-career professionals who know it's time for a change but aren't sure what's next. Straight talk, a real plan, and support while you take the leap.",

    // DEMO: the booking button points to the template's sales page
    bookingLink: "https://payhip.com/b/184kI",

    photoUrl: "",

    // Shown in the "This Week" ledger on the hero. Keep it short — 4-6 rows reads best.
    availability: [
        { day: "Mon", time: "9:30 AM", status: "Open" },
        { day: "Tue", time: "12:00 PM", status: "Booked" },
        { day: "Wed", time: "4:00 PM", status: "Open" },
        { day: "Thu", time: "10:00 AM", status: "Booked" },
        { day: "Fri", time: "1:30 PM", status: "Open" }
    ],

    credentials: [
        "12 Years in HR & Hiring",
        "300+ Career Changes Coached",
        "Certified Career Coach"
    ],

    aboutHeading: "Hi, I'm Marisol.",
    aboutBody: "I spent twelve years on the hiring side of the table, reading résumés and sitting in on the decisions. Then I made my own career change and saw how lonely and confusing it can feel. Now I help professionals figure out what they actually want next, tell their story with confidence, and land a role that fits the life they're building.",
    aboutFacts: [
        "Sessions held over video, so you can join from anywhere",
        "A written game plan after your first session",
        "No long-term contracts, ever"
    ],

    // Services and Testimonials are no longer edited here — they're synced
    // automatically from your Airtable base into data/services.json and
    // data/testimonials.json. See SETUP-GUIDE.md.
};

// =========================================================================
// Rendering — you shouldn't need to edit anything below this line.
// =========================================================================

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderText() {
    document.getElementById('brand-name').textContent = CONFIG.coachName;
    document.getElementById('footer-name').textContent = CONFIG.coachName;
    document.getElementById('hero-subtext').textContent = CONFIG.heroSubtext;
    document.getElementById('about-heading').textContent = CONFIG.aboutHeading;
    document.getElementById('about-body').textContent = CONFIG.aboutBody;

    const heroH1 = document.querySelector('.hero-copy h1');
    if (heroH1) heroH1.textContent = CONFIG.heroHeadline;

    const bookingLink = document.getElementById('booking-link');
    if (bookingLink) bookingLink.href = CONFIG.bookingLink;
}

function renderPhoto() {
    const container = document.getElementById('about-photo');
    if (!container) return;

    if (CONFIG.photoUrl && CONFIG.photoUrl.trim() !== '') {
        container.innerHTML = `<img src="${escapeHTML(CONFIG.photoUrl)}" alt="${escapeHTML(CONFIG.coachName)}">`;
        container.classList.add('has-photo');
    }
    // If photoUrl is blank, the placeholder box (in index.html) stays as-is.
}

function renderLedger() {
    const strip = document.getElementById('ledger-strip');
    if (!strip) return;
    strip.innerHTML = CONFIG.availability.map(slot => {
        const isOpen = slot.status.toLowerCase() === 'open';
        return `
            <div class="ledger-row ${isOpen ? 'is-open' : ''}">
                <span class="ledger-day">${escapeHTML(slot.day)}</span>
                <span class="ledger-time">${escapeHTML(slot.time)}</span>
                <span class="ledger-status">${escapeHTML(slot.status)}</span>
            </div>`;
    }).join('');
}

function renderTrust() {
    const row = document.getElementById('trust-row');
    if (!row) return;
    row.innerHTML = CONFIG.credentials.map(c => `<span>${escapeHTML(c)}</span>`).join('');
}

function renderAboutFacts() {
    const list = document.getElementById('about-facts');
    if (!list) return;
    list.innerHTML = CONFIG.aboutFacts.map(f => `<li>${escapeHTML(f)}</li>`).join('');
}

/**
 * Loads your Services grid from data/services.json — a plain data file that
 * a scheduled GitHub Action keeps in sync with the "Services" table in your
 * Airtable base. This file never contains your Airtable token; it only
 * contains the published records themselves. See SETUP-GUIDE.md.
 */
async function renderServices() {
    const grid = document.getElementById('service-grid');
    if (!grid) return;

    try {
        const response = await fetch('data/services.json', { cache: 'no-store' });

        if (!response.ok) {
            grid.innerHTML = `<p class="loading">Your services will appear here once the automatic sync runs for the first time.</p>`;
            return;
        }

        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            grid.innerHTML = `<p class="loading">No published services yet. Set a row's Status to "Published" in your Services table to display it here.</p>`;
            return;
        }

        grid.innerHTML = data.records.map(record => {
            const fields = record.fields || {};
            const name = escapeHTML(fields['Service Name'] || 'Untitled Service');
            const price = escapeHTML(fields['Price'] || '');
            const desc = escapeHTML(fields['Description'] || '');
            const featured = !!fields['Featured'];

            return `
                <div class="service-card ${featured ? 'is-featured' : ''} reveal">
                    <p class="service-name">${name}</p>
                    <p class="service-price mono">${price}</p>
                    <p class="service-desc">${desc}</p>
                    <a href="#booking" class="btn btn-brass btn-small">Book This</a>
                </div>`;
        }).join('');

    } catch (error) {
        console.error('Services load error:', error);
        grid.innerHTML = `<p class="loading">Couldn't load services right now. Check the Actions tab in your GitHub repo for errors.</p>`;
    }
}

/**
 * Loads your Testimonials grid from data/testimonials.json — synced from
 * the "Testimonials" table in your Airtable base the same way Services is.
 */
async function renderTestimonials() {
    const grid = document.getElementById('testimonial-grid');
    if (!grid) return;

    try {
        const response = await fetch('data/testimonials.json', { cache: 'no-store' });

        if (!response.ok) {
            grid.innerHTML = `<p class="loading">Your testimonials will appear here once the automatic sync runs for the first time.</p>`;
            return;
        }

        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            grid.innerHTML = `<p class="loading">No published testimonials yet. Set a row's Status to "Published" in your Testimonials table to display it here.</p>`;
            return;
        }

        grid.innerHTML = data.records.map(record => {
            const fields = record.fields || {};
            const quote = escapeHTML(fields['Quote'] || '');
            const name = escapeHTML(fields['Client Name'] || 'A happy client');

            return `
                <div class="testimonial-card reveal">
                    <p class="testimonial-quote">"${quote}"</p>
                    <p class="testimonial-name">— ${name}</p>
                </div>`;
        }).join('');

    } catch (error) {
        console.error('Testimonials load error:', error);
        grid.innerHTML = `<p class="loading">Couldn't load testimonials right now. Check the Actions tab in your GitHub repo for errors.</p>`;
    }
}

function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || items.length === 0) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(el => observer.observe(el));
}

async function init() {
    renderText();
    renderPhoto();
    renderLedger();
    renderTrust();
    renderAboutFacts();
    // Wait for the Airtable-synced content so the .reveal scroll-in effect
    // (set up right after) also applies to the service and testimonial
    // cards, not just the static sections.
    await Promise.all([renderServices(), renderTestimonials()]);
    initScrollReveal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
