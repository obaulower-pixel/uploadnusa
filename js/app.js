/* ========================================
   NUSASTORE - MAIN APP JAVASCRIPT
   ======================================== */

// Global state
let currentBanner = 0;
let bannerInterval;

// Game icons & banners (bisa diganti dengan foto PNG/JPG)
const GAME_ASSETS = {
    roblox: {
        icon: 'roblox.jpg',
        banner: 'b1.jpg',
        fallbackIcon: 'fa-cube'
    },
    freefire: {
        icon: 'ff.jpg',
        banner: 'b2.jpg',
        fallbackIcon: 'fa-fire'
    },
    mobilelegends: {
        icon: 'ml.jpg',
        banner: 'b3.jpg',
        fallbackIcon: 'fa-chess-knight'
    }
};

// Home banners (bisa diganti dengan foto)
const HOME_BANNERS = [
    { image: 'b1.jpg', title: 'Top Up NusaStore', subtitle: 'Harga termurah se-Indonesia' },
    { image: 'b2.jpg', title: 'Diamond Murah', subtitle: 'Bonus 20% setiap pembelian' },
    { image: 'b3.jpg', title: 'WDP yang sangat murah', subtitle: 'Weekly Diamond Pass Murah' }
];

// Scrollable banners
const SCROLL_BANNERS = [
    { image: 'b4.png', title: 'Event Spesial', subtitle: 'Diskon hingga 50%' },
    { image: 'b5.png', title: 'Cashback', subtitle: 'Cashback 20% untuk member' },
    { image: 'b6.png', title: 'Gratis', subtitle: 'Tanpa biaya tambahan' }
];

// Product data with image paths
const PRODUCTS = {
    roblox: [
        { id: 'rbx-1', name: 'Robux 100', price: 15000, original: 18000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-2', name: 'Robux 400', price: 40000, original: 58000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-3', name: 'Robux 800', price: 80000, original: 115000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-4', name: 'Robux 1000', price: 105000, original: 155000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-5', name: 'Robux 2000', price: 200000, original: 300000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-6', name: 'Robux 5000', price: 437000, original: 1100000, icon: 'fa-cube', image: 'robux.png' },
        { id: 'rbx-7', name: 'Grow a Garden - 1000 Koin', price: 8000, original: 10000, icon: 'fa-leaf', image: 'gag.png' },
        { id: 'rbx-8', name: 'Grow a Garden - 2000 Koin', price: 15000, original: 20000, icon: 'fa-leaf', image: 'gag.png' },
        { id: 'rbx-9', name: 'grow a garden - 5000 coin', price: 40000, original: 50000, icon: 'fa-user-edit', image: 'gag.png' }
    ],
    freefire: [
        { id: 'ff-1', name: 'Diamond 50', price: 8000, original: 10000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-2', name: 'Diamond 100', price: 15000, original: 18000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-3', name: 'Diamond 310', price: 32000, original: 50000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-4', name: 'Diamond 520', price: 48000, original: 80000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-5', name: 'Diamond 1060', price: 870000, original: 150000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-6', name: 'Diamond 2180', price: 175000, original: 290000, icon: 'fa-gem', image: 'dmf.png' },
        { id: 'ff-7', name: 'WDP Weekly', price: 20000, original: 35000, icon: 'fa-calendar-week', image: 'wdpl.png' },
        { id: 'ff-8', name: 'Membership Bulanan', price: 65000, original: 100000, icon: 'fa-crown', image: 'wdpb.png' }
    ],
    mobilelegends: [
        { id: 'ml-1', name: 'Diamond 86', price: 20000, original: 25000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-2', name: 'Diamond 172', price: 32000, original: 48000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-3', name: 'Diamond 257', price: 52000, original: 70000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-4', name: 'Diamond 344', price: 65000, original: 92000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-5', name: 'Diamond 429', price: 100000, original: 115000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-6', name: 'Diamond 706', price: 160000, original: 185000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-7', name: 'Diamond 1043', price: 235000, original: 270000, icon: 'fa-gem', image: 'dml.png' },
        { id: 'ml-8', name: 'WDP Weekly', price: 20000, original: 32000, icon: 'fa-calendar-week', image: 'wdp.png' },
        { id: 'ml-9', name: 'Starlight Member', price: 20000, original: 55000, icon: 'fa-star', image: 'star.png' }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initBanner();
    initScrollBanner();
    renderPopularProducts();
    renderGameCards();
    initSearch();
});

// Render game cards with images
function renderGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    const games = ['roblox', 'freefire', 'mobilelegends'];

    gameCards.forEach((card, index) => {
        const game = games[index];
        const asset = GAME_ASSETS[game];
        const iconEl = card.querySelector('.game-icon');

        if (iconEl && asset) {
            // Try to load image, fallback to icon
            const img = new Image();
            img.onload = () => {
                iconEl.innerHTML = `<img src="${asset.icon}" alt="${game}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;
            };
            img.onerror = () => {
                // Keep default icon
            };
            img.src = asset.icon;
        }
    });
}

// Banner Functions
function initBanner() {
    // Render banner slides with images
    const slides = document.querySelectorAll('.banner-slide');
    slides.forEach((slide, index) => {
        const banner = HOME_BANNERS[index];
        if (banner) {
            const bg = slide.querySelector('.banner-bg');
            if (bg) {
                // Set background image if exists
                const img = new Image();
                img.onload = () => {
                    bg.style.backgroundImage = `url('${banner.image}')`;
                    bg.style.backgroundSize = 'cover';
                    bg.style.backgroundPosition = 'center';
                };
                img.onerror = () => {
                    // Keep gradient fallback
                };
                img.src = banner.image;
            }
        }
    });

    bannerInterval = setInterval(() => {
        currentBanner = (currentBanner + 1) % 3;
        setBanner(currentBanner);
    }, 4000);
}

function setBanner(index) {
    currentBanner = index;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Scrollable Banner
function initScrollBanner() {
    const container = document.querySelector('.scroll-banner-container');
    const dots = document.querySelectorAll('.scroll-dot');
    const track = document.getElementById('scrollBanner');

    // Render scroll banners with images
    if (track) {
        track.innerHTML = SCROLL_BANNERS.map((banner, index) => `
            <div class="scroll-banner-item">
                <div class="scroll-img" style="background-image: url('${banner.image}'); background-size: cover; background-position: center;">
                    <div class="scroll-overlay">
                        <h3>${banner.title}</h3>
                        <p>${banner.subtitle}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    if (container) {
        container.addEventListener('scroll', () => {
            const scrollLeft = container.scrollLeft;
            const itemWidth = 292;
            const index = Math.round(scrollLeft / itemWidth);

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        });
    }
}

// Render Popular Products with images
function renderPopularProducts() {
    const container = document.getElementById('popularProducts');
    if (!container) return;

    const allProducts = [...PRODUCTS.roblox, ...PRODUCTS.freefire, ...PRODUCTS.mobilelegends];
    const popular = allProducts.slice(0, 6);

    container.innerHTML = popular.map(product => `
        <div class="product-card" onclick="openProductModal('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas ${product.icon}\'></i><span class=\'product-tag\'>POPULER</span>'">
                <span class="product-tag">POPULER</span>
            </div>
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div>
                    <span class="product-price">Rp ${formatPrice(product.price)}</span>
                    <span class="product-original">Rp ${formatPrice(product.original)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Functions
function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    overlay.classList.add('active');
    document.getElementById('searchInput').focus();
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (query.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }

    const allProducts = [...PRODUCTS.roblox, ...PRODUCTS.freefire, ...PRODUCTS.mobilelegends];
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align:center; color:white; padding:40px;">
                <i class="fas fa-search" style="font-size:48px; opacity:0.3; margin-bottom:16px;"></i>
                <p>Produk tidak ditemukan</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = filtered.map(product => `
        <div class="search-result-item" onclick="goToProduct('${product.id}')">
            <img src="${product.image}" alt="${product.name}" style="width:48px;height:48px;border-radius:10px;object-fit:cover;" onerror="this.style.display='none'; this.parentElement.insertAdjacentHTML('afterbegin', '<i class=\'fas ${product.icon}\' style=\'font-size:24px;\'></i>');">
            <div>
                <div style="font-weight:600;">${product.name}</div>
                <div style="font-size:12px; opacity:0.7;">Rp ${formatPrice(product.price)}</div>
            </div>
        </div>
    `).join('');
}

// Menu Functions
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function showNotification() {
    goToPage('pages/notification.html');
}

// Navigation
function goToPage(url) {
    window.location.href = url;
}

// Product Modal
function openProductModal(productId) {
    const allProducts = [...PRODUCTS.roblox, ...PRODUCTS.freefire, ...PRODUCTS.mobilelegends];
    const product = allProducts.find(p => p.id === productId);

    if (!product) return;

    // Check if login required for purchase
    if (!AUTH.checkAuth()) {
        showToast('Silakan login untuk melanjutkan pembelian');
        setTimeout(() => {
            window.location.href = 'pages/login.html?redirect=' + encodeURIComponent(window.location.href);
        }, 1500);
        return;
    }

    // Store selected product and redirect to payment
    localStorage.setItem('nusa_selected_product', JSON.stringify(product));
    window.location.href = 'pages/payment.html';
}

// Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Format Price
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Transaction History
function addTransaction(transaction) {
    const history = JSON.parse(localStorage.getItem('nusa_history') || '[]');
    history.unshift({
        ...transaction,
        id: 'TRX-' + Date.now(),
        date: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('nusa_history', JSON.stringify(history));
}

function getHistory() {
    return JSON.parse(localStorage.getItem('nusa_history') || '[]');
}

function updateTransactionStatus(trxId, status) {
    const history = getHistory();
    const trx = history.find(t => t.id === trxId);
    if (trx) {
        trx.status = status;
        localStorage.setItem('nusa_history', JSON.stringify(history));
    }
}

// Owner verification
function verifyPayment(trxId) {
    if (!AUTH.isOwner()) {
        showToast('Hanya owner yang dapat memverifikasi');
        return false;
    }

    updateTransactionStatus(trxId, 'completed');
    showToast('Pembayaran telah diverifikasi');
    return true;
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */

const NOTIFICATIONS = {
    init() {
        this.renderBadge();
        this.startAutoCheck();
    },

    getNotifications() {
        return JSON.parse(localStorage.getItem('nusa_notifications') || '[]');
    },

    saveNotifications(notifs) {
        localStorage.setItem('nusa_notifications', JSON.stringify(notifs));
        this.renderBadge();
    },

    addNotification(data) {
        const notifs = this.getNotifications();
        const newNotif = {
            id: 'NOTIF-' + Date.now(),
            title: data.title || 'NusaStore',
            message: data.message || '',
            type: data.type || 'info',
            read: false,
            timestamp: new Date().toISOString(),
            link: data.link || null
        };
        notifs.unshift(newNotif);
        if (notifs.length > 50) notifs.pop();
        this.saveNotifications(notifs);
        return newNotif;
    },

    markAsRead(id) {
        const notifs = this.getNotifications();
        const notif = notifs.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this.saveNotifications(notifs);
        }
    },

    markAllAsRead() {
        const notifs = this.getNotifications();
        notifs.forEach(n => n.read = true);
        this.saveNotifications(notifs);
    },

    deleteNotification(id) {
        let notifs = this.getNotifications();
        notifs = notifs.filter(n => n.id !== id);
        this.saveNotifications(notifs);
    },

    clearAll() {
        localStorage.setItem('nusa_notifications', '[]');
        this.renderBadge();
    },

    getUnreadCount() {
        return this.getNotifications().filter(n => !n.read).length;
    },

    renderBadge() {
        const badges = document.querySelectorAll('.notif-btn .badge');
        const count = this.getUnreadCount();
        badges.forEach(badge => {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    startAutoCheck() {
        setInterval(() => {
            this.checkTransactionUpdates();
        }, 30000);
        this.checkTransactionUpdates();
    },

    checkTransactionUpdates() {
        const user = AUTH.getUser();
        if (!user) return;

        const history = getHistory();
        const notifs = this.getNotifications();
        const lastCheck = localStorage.getItem('nusa_last_notif_check') || '0';

        const userTransactions = history.filter(t => 
            t.email === user.email && 
            new Date(t.date).getTime() > parseInt(lastCheck)
        );

        userTransactions.forEach(trx => {
            if (trx.status === 'completed' && !notifs.find(n => n.link && n.link.includes(trx.id))) {
                this.addNotification({
                    title: 'Pembayaran Berhasil',
                    message: `Transaksi ${trx.product.name} telah diverifikasi! Produk akan segera dikirim.`,
                    type: 'success',
                    link: `pages/receipt.html#${trx.id}`
                });
            } else if (trx.status === 'rejected' && !notifs.find(n => n.link && n.link.includes(trx.id))) {
                this.addNotification({
                    title: 'Transaksi Ditolak',
                    message: `Transaksi ${trx.product.name} ditolak oleh owner. Silakan hubungi support.`,
                    type: 'danger',
                    link: `pages/history.html`
                });
            }
        });

        localStorage.setItem('nusa_last_notif_check', Date.now().toString());
    }
};

// Initialize notifications
document.addEventListener('DOMContentLoaded', () => {
    NOTIFICATIONS.init();
});
