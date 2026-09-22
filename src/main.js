import './style.css';

const starterGigs = [
  { id: 1, title: 'A logo that feels like you', creator: 'Maya Chen', initials: 'MC', category: 'Design', rate: 85, description: 'A thoughtful visual identity for your next bright idea. Includes logo suite, color story, and a mini brand guide.', color: 'peach', tags: ['Brand identity', '3 day delivery'], rating: 4.9, jobs: 24 },
  { id: 2, title: 'Scroll-stopping product videos', creator: 'Theo James', initials: 'TJ', category: 'Video', rate: 120, description: 'Short-form product video made to earn the second look. Shot, edited, and ready for your socials.', color: 'blue', tags: ['Reels & TikTok', '5 day delivery'], rating: 5.0, jobs: 18 },
  { id: 3, title: 'Words with personality', creator: 'Aisha Noor', initials: 'AN', category: 'Writing', rate: 65, description: 'Homepage copy with a clear voice and zero filler. For small brands with a big point of view.', color: 'yellow', tags: ['Website copy', '2 day delivery'], rating: 4.8, jobs: 31 },
  { id: 4, title: 'An original soundtrack', creator: 'Leo Park', initials: 'LP', category: 'Music', rate: 150, description: 'A memorable 30-60 second score for your film, podcast intro, or brand moment.', color: 'lavender', tags: ['Custom music', '7 day delivery'], rating: 4.9, jobs: 12 },
  { id: 5, title: 'Socials that sound human', creator: 'Nina Alvarez', initials: 'NA', category: 'Marketing', rate: 75, description: 'A month of playful, strategic social copy with content angles your community will want to share.', color: 'mint', tags: ['Content strategy', '4 day delivery'], rating: 4.9, jobs: 42 },
  { id: 6, title: 'A tiny website with big charm', creator: 'Owen Reed', initials: 'OR', category: 'Development', rate: 180, description: 'A responsive, delightful landing page for your launch, portfolio, or passion project.', color: 'coral', tags: ['Landing page', '6 day delivery'], rating: 5.0, jobs: 16 }
];

const categories = ['All', 'Design', 'Video', 'Writing', 'Music', 'Marketing', 'Development'];
const state = {
  gigs: JSON.parse(localStorage.getItem('skillswap-gigs') || 'null') || starterGigs,
  bookings: JSON.parse(localStorage.getItem('skillswap-bookings') || 'null') || [],
  view: 'home',
  query: '',
  category: 'All',
  activeGig: null,
  modal: null,
  toast: '',
  menuOpen: false,
  theme: localStorage.getItem('skillswap-theme') || 'light',
  language: localStorage.getItem('skillswap-language') || 'en'
};

const hi = {
  'Explore': 'खोजें',
  'Become a creator': 'क्रिएटर बनें',
  'My bookings': 'मेरी बुकिंग्स',
  'Menu': 'मेनू',
  'Post a gig': 'गिग पोस्ट करें',
  'The creative side of work': 'रचनात्मक काम की दुनिया',
  'Make good things': 'अच्छी चीज़ें बनाएं',
  'with good people.': 'अच्छे लोगों के साथ।',
  'Find the talented humans who can turn your next idea into something real.': 'उन प्रतिभाशाली लोगों को खोजें जो आपके अगले विचार को सच बना सकते हैं।',
  'Find a creator': 'क्रिएटर खोजें',
  'Popular:': 'लोकप्रिय:',
  'Branding': 'ब्रांडिंग',
  'Video editing': 'वीडियो एडिटिंग',
  'Copywriting': 'कॉपीराइटिंग',
  'Fresh talent, excellent work': 'नया टैलेंट, शानदार काम',
  'Meet your next collaborator.': 'अपने अगले सहयोगी से मिलें।',
  'See all creators': 'सभी क्रिएटर्स देखें',
  'Simple as that': 'बस इतना आसान',
  'Big ideas need a': 'बड़े विचारों को चाहिए',
  'little momentum.': 'थोड़ी रफ़्तार।',
  'Find your person': 'अपना सही व्यक्ति खोजें',
  'Send the brief': 'ब्रीफ भेजें',
  'Make it happen': 'इसे साकार करें',
  'Browse by': 'श्रेणी',
  'All': 'सभी',
  'Design': 'डिज़ाइन',
  'Video': 'वीडियो',
  'Writing': 'लेखन',
  'Music': 'संगीत',
  'Marketing': 'मार्केटिंग',
  'Development': 'डेवलपमेंट',
  'Share what you do': 'अपना काम साझा करें',
  'Put your talent': 'अपना टैलेंट',
  'out there.': 'दुनिया के सामने रखें।',
  'Gig title': 'गिग का शीर्षक',
  'Category': 'श्रेणी',
  'Starting price (USD)': 'शुरुआती कीमत (USD)',
  'Describe what you offer': 'अपने ऑफर का विवरण दें',
  'Your display name': 'आपका डिस्प्ले नाम',
  'Publish my gig': 'मेरी गिग प्रकाशित करें',
  'Creator dashboard': 'क्रिएटर डैशबोर्ड',
  'Incoming requests': 'आने वाले अनुरोध',
  'My gigs': 'मेरी गिग्स',
  'Back to explore': 'खोज पर वापस जाएं',
  'About this gig': 'इस गिग के बारे में',
  'Book this gig': 'यह गिग बुक करें',
  'Your name': 'आपका नाम',
  'Project brief': 'प्रोजेक्ट ब्रीफ',
  'Send booking request': 'बुकिंग अनुरोध भेजें',
  'Made with good people': 'अच्छे लोगों के साथ बना',
  'Small teams,': 'छोटी टीमें,',
  'big love.': 'बड़ा प्यार।',
  'Good work finds good people.': 'अच्छा काम अच्छे लोगों को खोजता है।'
};

const save = () => {
  localStorage.setItem('skillswap-gigs', JSON.stringify(state.gigs));
  localStorage.setItem('skillswap-bookings', JSON.stringify(state.bookings));
};
const money = n => `$${n}`;
const t = text => state.language === 'hi' && hi[text] ? hi[text] : text;

function nav() {
  const isDark = state.theme === 'dark';
  return `<header class="site-header">
    <a class="logo" href="#home" data-nav="home"><span>skill</span><i>swap</i><b>*</b></a>
    <div class="toolbar glass-bar ${state.menuOpen ? 'menu-open' : ''}">
      <nav>
        <a href="#browse" data-nav="browse">${t('Explore')}</a>
        <a href="#post" data-nav="post">${t('Become a creator')}</a>
        <a href="#bookings" data-nav="bookings">${t('My bookings')}</a>
      </nav>
      <span class="toolbar-divider"></span>
      <button class="menu-toggle" data-menu aria-expanded="${state.menuOpen}" aria-label="${t('Menu')}" title="${t('Menu')}"><span></span><span></span><span></span></button>
      <button class="language-toggle" data-language title="${state.language === 'en' ? 'हिंदी में देखें' : 'View in English (India)'}">${state.language === 'en' ? 'हि' : 'EN'}</button>
      <button class="theme-toggle" data-theme title="Switch theme">${isDark ? '☀' : '☾'}</button>
      <button class="nav-cta" data-nav="post">${t('Post a gig')} <span>→</span></button>
      <div class="mobile-menu">
        <button data-nav="browse">${t('Explore')}</button>
        <button data-nav="post">${t('Become a creator')}</button>
        <button data-nav="bookings">${t('My bookings')}</button>
      </div>
    </div>
  </header>`;
}

function gigCard(g) {
  return `<article class="gig-card" data-gig="${g.id}">
    <div class="gig-art ${g.color}"><span class="art-shape shape-one"></span><span class="art-shape shape-two"></span><span class="gig-initials">${g.initials}</span><button class="heart" aria-label="Save gig">♡</button></div>
    <div class="gig-info">
      <div class="creator"><span class="mini-avatar ${g.color}">${g.initials}</span><span>${g.creator}</span><span class="dot">·</span><span>${t(g.category)}</span></div>
      <h3>${g.title}</h3>
      <div class="card-bottom"><span class="rating">★ ${g.rating} <em>(${g.jobs})</em></span><strong><small>from</small> ${money(g.rate)}</strong></div>
    </div>
  </article>`;
}

function home() {
  return `<main class="home">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${t('The creative side of work')}</p>
        <h1>${t('Make good things')}<br><i>${t('with good people.')}</i></h1>
        <p class="hero-text">${t('Find the talented humans who can turn your next idea into something real.')}</p>
        <div class="hero-search"><span>⌕</span><input id="heroSearch" placeholder="What do you need help with?"><button data-search>${t('Find a creator')} <span>→</span></button></div>
        <div class="popular"><span>${t('Popular:')}</span><button data-category="Design">${t('Branding')}</button><button data-category="Video">${t('Video editing')}</button><button data-category="Writing">${t('Copywriting')}</button></div>
      </div>
      <div class="hero-art"><div class="orb orb-a"></div><div class="orb orb-b"></div><div class="paper">MAKE<br>SOMETHING<br><i>GOOD</i></div><div class="hero-sticker">✦<br><small>good work<br>lives here</small></div><div class="hero-face">◠</div><div class="squiggle">〰</div></div>
    </section>
    <section class="featured"><div class="section-title"><div><p class="eyebrow">${t('Fresh talent, excellent work')}</p><h2>${t('Meet your next collaborator.')}</h2></div><button class="text-link" data-nav="browse">${t('See all creators')} ↗</button></div><div class="gig-grid">${state.gigs.slice(0, 3).map(gigCard).join('')}</div></section>
    <section class="how"><p class="eyebrow">${t('Simple as that')}</p><h2>${t('Big ideas need a')}<br><i>${t('little momentum.')}</i></h2><div class="steps"><div><span>01</span><h3>${t('Find your person')}</h3><p>Browse a growing community of brilliant, independent creators.</p></div><div><span>02</span><h3>${t('Send the brief')}</h3><p>Tell them what you're dreaming up and when you need it.</p></div><div><span>03</span><h3>${t('Make it happen')}</h3><p>They get to work. You get something worth sharing.</p></div></div></section>
  </main>`;
}

function browse() {
  const filtered = state.gigs.filter(g => (state.category === 'All' || g.category === state.category) && `${g.title} ${g.creator} ${g.category} ${g.description}`.toLowerCase().includes(state.query.toLowerCase()));
  return `<main class="browse-page">
    <section class="browse-heading"><p class="eyebrow">Find the right fit</p><h1>Creative help,<br><i>on your terms.</i></h1><div class="browse-search"><span>⌕</span><input id="browseSearch" value="${state.query}" placeholder="Search skills, creators, or ideas..."></div></section>
    <div class="filter-bar"><span>${t('Browse by')}</span>${categories.map(c => `<button class="filter ${state.category === c ? 'active' : ''}" data-category="${c}">${t(c)}</button>`).join('')}<span class="result-count">${filtered.length} gigs</span></div>
    <section class="results"><div class="gig-grid">${filtered.map(gigCard).join('') || `<div class="empty"><span>✦</span><h2>No exact match yet.</h2><p>Try a different search or browse all creative categories.</p><button data-category="All">Show all gigs</button></div>`}</div></section>
  </main>`;
}

function post() {
  return `<main class="form-page"><section class="form-intro"><p class="eyebrow">${t('Share what you do')}</p><h1>${t('Put your talent')}<br><i>${t('out there.')}</i></h1><p>Create a gig in a few minutes. The good clients will find you.</p><div class="form-art">✦<br><span>YOUR<br>THING<br>IS GOOD</span></div></section><section class="form-panel"><div class="form-heading"><span class="step-pill">01 / 01</span><h2>Tell us about your gig.</h2><p>Be specific, be yourself. You can always edit it later.</p></div><form id="gigForm"><label>${t('Gig title')}<input name="title" required maxlength="70" placeholder="e.g. I will design a dreamy album cover"></label><div class="two-col"><label>${t('Category')}<select name="category" required>${categories.slice(1).map(c => `<option>${c}</option>`).join('')}</select></label><label>${t('Starting price (USD)')}<input name="rate" required type="number" min="5" placeholder="75"></label></div><label>${t('Describe what you offer')}<textarea name="description" required maxlength="280" placeholder="What will the client get?"></textarea></label><label>${t('Your display name')}<input name="creator" required maxlength="30" placeholder="e.g. Alex Rivera"></label><button class="primary wide" type="submit">${t('Publish my gig')} <span>→</span></button></form></section></main>`;
}

function bookings() {
  return `<main class="bookings-page"><section class="bookings-head"><p class="eyebrow">Keep track of good work</p><h1>My <i>bookings.</i></h1><p>Every project starts with a simple hello.</p></section>${state.bookings.length ? `<section class="booking-list">${state.bookings.map(b => `<article class="booking"><div class="booking-avatar ${b.gig.color}">${b.gig.initials}</div><div class="booking-main"><div class="booking-meta"><span>${b.gig.category}</span><span>•</span><span>Requested ${b.date}</span></div><h2>${b.gig.title}</h2><p>with ${b.gig.creator}</p></div><div class="booking-side"><span class="status ${b.status.toLowerCase()}">${b.status}</span><strong>${money(b.gig.rate)}</strong><button class="text-link" data-view-gig="${b.gig.id}">View gig ↗</button></div></article>`).join('')}</section>` : `<section class="empty bookings-empty"><span>☻</span><h2>Your next great project<br>is waiting.</h2><p>Find a talented creator and send them a booking request.</p><button class="primary" data-nav="browse">Explore gigs <span>→</span></button></section>`}</main>`;
}

function creator() {
  const myGigs = state.gigs.filter(g => g.isMine);
  const received = state.bookings.filter(b => myGigs.some(g => g.id === b.gig.id));
  return `<main class="creator-page"><section class="dashboard-head"><div><p class="eyebrow">${t('Creator dashboard')}</p><h1>Your creative<br><i>corner.</i></h1></div><button class="primary" data-nav="post">Post another gig <span>+</span></button></section><div class="dash-tabs"><button class="active">${t('Incoming requests')} <b>${received.filter(b => b.status === 'Pending').length}</b></button><button>${t('My gigs')} <b>${myGigs.length}</b></button></div><section class="requests">${received.length ? received.map(b => `<article class="request"><div class="booking-avatar ${b.gig.color}">${b.gig.initials}</div><div><p class="booking-meta">New request · ${b.date}</p><h2>${b.client} wants to book "${b.gig.title}"</h2><p class="brief">"${b.brief}"</p></div><div class="request-actions">${b.status === 'Pending' ? `<button class="decline" data-decline="${b.id}">Decline</button><button class="primary" data-accept="${b.id}">Accept request</button>` : `<span class="status ${b.status.toLowerCase()}">${b.status}</span>`}</div></article>`).join('') : `<div class="empty"><span>✦</span><h2>No incoming requests yet.</h2><p>Post a gig to let clients find your work.</p><button class="primary" data-nav="post">Post a gig <span>→</span></button></div>`}</section><p class="demo-note">Demo tip: Post a gig, then book it from Explore to see incoming requests here.</p></main>`;
}

function detail(g) {
  return `<main class="detail-page"><button class="back" data-nav="browse">← ${t('Back to explore')}</button><div class="detail-grid"><div><div class="detail-art ${g.color}"><span class="art-shape shape-one"></span><span class="art-shape shape-two"></span><span>${g.initials}</span></div><div class="detail-description"><p class="eyebrow">${t('About this gig')}</p><p>${g.description}</p><div class="tags">${g.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div></div><section class="detail-info"><div class="creator-line"><span class="mini-avatar ${g.color}">${g.initials}</span><span>Created by <strong>${g.creator}</strong></span></div><p class="eyebrow">${g.category} · ★ ${g.rating} (${g.jobs} reviews)</p><h1>${g.title}</h1><div class="price-row"><span>Starting at</span><strong>${money(g.rate)}</strong></div><button class="primary wide" data-book="${g.id}">${t('Book this gig')} <span>→</span></button><p class="fine-print">No payment today. Send a request and the creator will get back to you.</p></section></div></main>`;
}

function bookingModal(g) {
  return `<div class="modal-wrap"><div class="modal-backdrop" data-close></div><section class="modal"><button class="modal-close" data-close>×</button><p class="eyebrow">One small step</p><h2>Tell ${g.creator.split(' ')[0]} about your idea.</h2><p class="modal-sub">You are sending a request for <strong>${g.title}</strong>.</p><form id="bookingForm"><label>${t('Your name')}<input name="client" required placeholder="Your name"></label><label>${t('Project brief')}<textarea name="brief" required placeholder="What are you making? Include any useful details or timing."></textarea></label><button class="primary wide" type="submit">${t('Send booking request')} <span>→</span></button></form></section></div>`;
}

function feedback() {
  return `<section class="feedback"><div class="feedback-heading"><div><p class="eyebrow">${t('Made with good people')}</p><h2>${t('Small teams,')} <i>${t('big love.')}</i></h2></div><p>Thoughtful work deserves thoughtful collaborators.</p></div><div class="feedback-grid"><article class="feedback-card"><div class="quote-mark">"</div><p>We found a brand designer who understood our slightly unusual idea immediately.</p><div class="feedback-person"><span class="feedback-avatar ava-one">JR</span><div><strong>Jordan Reed</strong><small>Co-founder, Rare Form</small></div></div></article><article class="feedback-card featured-feedback"><div class="quote-mark">"</div><p>SkillSwap makes freelancing feel more human. I get briefs that are clear and exciting.</p><div class="feedback-person"><span class="feedback-avatar ava-two">SK</span><div><strong>Samira Khan</strong><small>Independent filmmaker</small></div></div></article><article class="feedback-card"><div class="quote-mark">"</div><p>We booked a copywriter on Monday and had a homepage we were proud to launch that same week.</p><div class="feedback-person"><span class="feedback-avatar ava-three">MB</span><div><strong>Micah Brooks</strong><small>Founder, Field Notes Co.</small></div></div></article></div></section>`;
}

function footer() {
  return `<footer><a class="logo" data-nav="home"><span>skill</span><i>swap</i><b>*</b></a><p>${t('Good work finds good people.')}</p><button data-nav="creator">${t('Creator dashboard')} →</button></footer>`;
}

function render() {
  document.body.classList.toggle('dark', state.theme === 'dark');
  document.documentElement.lang = state.language === 'hi' ? 'hi' : 'en-IN';
  const page = state.view === 'home' ? home() : state.view === 'browse' ? browse() : state.view === 'post' ? post() : state.view === 'bookings' ? bookings() : state.view === 'creator' ? creator() : detail(state.activeGig);
  document.querySelector('#app').innerHTML = nav() + page + (state.view === 'home' ? feedback() : '') + footer() + (state.modal ? bookingModal(state.modal) : '') + (state.toast ? `<div class="toast">${state.toast}</div>` : '');
  bind();
}

function go(view) {
  state.view = view;
  state.modal = null;
  state.menuOpen = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function toast(message) {
  state.toast = message;
  render();
  setTimeout(() => {
    state.toast = '';
    render();
  }, 3000);
}

function bind() {
  document.querySelectorAll('[data-nav]').forEach(el => el.onclick = () => go(el.dataset.nav));
  document.querySelector('[data-menu]')?.addEventListener('click', event => {
    event.stopPropagation();
    state.menuOpen = !state.menuOpen;
    render();
  });
  document.querySelector('[data-language]')?.addEventListener('click', () => {
    state.menuOpen = false;
    state.language = state.language === 'en' ? 'hi' : 'en';
    localStorage.setItem('skillswap-language', state.language);
    render();
  });
  document.querySelector('[data-theme]')?.addEventListener('click', () => {
    state.menuOpen = false;
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('skillswap-theme', state.theme);
    render();
  });
  document.querySelectorAll('[data-category]').forEach(el => el.onclick = () => {
    state.category = el.dataset.category;
    state.query = '';
    go('browse');
  });
  document.querySelectorAll('[data-gig]').forEach(el => el.onclick = event => {
    if (event.target.closest('.heart')) {
      event.target.closest('.heart').classList.toggle('saved');
      return;
    }
    state.activeGig = state.gigs.find(g => g.id === Number(el.dataset.gig));
    go('detail');
  });
  document.querySelector('[data-search]')?.addEventListener('click', () => {
    state.query = document.querySelector('#heroSearch').value;
    go('browse');
  });
  document.querySelector('#heroSearch')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      state.query = event.target.value;
      go('browse');
    }
  });
  document.querySelector('#browseSearch')?.addEventListener('input', event => {
    state.query = event.target.value;
    render();
    document.querySelector('#browseSearch').focus();
  });
  document.querySelector('#gigForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const initials = data.creator.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
    state.gigs.unshift({ id: Date.now(), ...data, rate: Number(data.rate), initials, color: ['peach', 'blue', 'yellow', 'lavender', 'mint', 'coral'][state.gigs.length % 6], tags: ['New this week', 'Flexible delivery'], rating: 'New', jobs: 0, isMine: true });
    save();
    go('creator');
    toast('Your gig is live - nice work!');
  });
  document.querySelectorAll('[data-book]').forEach(el => el.onclick = () => {
    state.modal = state.gigs.find(g => g.id === Number(el.dataset.book));
    render();
  });
  document.querySelectorAll('[data-close]').forEach(el => el.onclick = () => {
    state.modal = null;
    render();
  });
  document.querySelector('#bookingForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    state.bookings.unshift({ id: Date.now(), gig: state.modal, client: data.client, brief: data.brief, status: 'Pending', date: 'just now' });
    save();
    state.modal = null;
    go('bookings');
    toast('Booking request sent!');
  });
  document.querySelectorAll('[data-view-gig]').forEach(el => el.onclick = () => {
    state.activeGig = state.gigs.find(g => g.id === Number(el.dataset.viewGig));
    go('detail');
  });
  document.querySelectorAll('[data-accept]').forEach(el => el.onclick = () => {
    const booking = state.bookings.find(b => b.id === Number(el.dataset.accept));
    booking.status = 'Accepted';
    save();
    render();
    toast('Request accepted - it is a match!');
  });
  document.querySelectorAll('[data-decline]').forEach(el => el.onclick = () => {
    const booking = state.bookings.find(b => b.id === Number(el.dataset.decline));
    booking.status = 'Declined';
    save();
    render();
    toast('Request declined. The client can still browse other creators.');
  });
}

render();
