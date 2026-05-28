/* ========================================
   FREE FIRE STORE - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderFFProducts('all');
    initCategoryFilter();
});

function renderFFProducts(category) {
    const container = document.getElementById('ffProducts');
    if (!container) return;

    let products = PRODUCTS.freefire;

    if (category === 'diamond') {
        products = products.filter(p => p.name.toLowerCase().includes('diamond'));
    } else if (category === 'wdp') {
        products = products.filter(p => p.name.toLowerCase().includes('wdp'));
    } else if (category === 'member') {
        products = products.filter(p => p.name.toLowerCase().includes('member'));
    }

    container.innerHTML = products.map(product => `
        <div class="product-card" onclick="buyProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.querySelector('.fallback-icon').style.display='flex'">
                <div class="fallback-icon" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:40px; color:var(--ff-primary);">
                    <i class="fas ${product.icon}"></i>
                </div>
                <span class="product-tag">${product.original > product.price ? 'DISKON' : 'MURAH'}</span>
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

function initCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFFProducts(btn.dataset.category);
        });
    });
}

function buyProduct(productId) {
    if (!AUTH.checkAuth()) {
        showToast('Silakan login untuk melanjutkan pembelian');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }, 1500);
        return;
    }

    const product = PRODUCTS.freefire.find(p => p.id === productId);
    if (product) {
        localStorage.setItem('nusa_selected_product', JSON.stringify(product));
        localStorage.setItem('nusa_selected_game', 'freefire');
        window.location.href = 'payment.html';
    }
}
