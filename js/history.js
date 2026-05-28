/* ========================================
   HISTORY PAGE - JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderTransactions('all');
    updateStats();
    initFilter();
});

function renderTransactions(filter) {
    const container = document.getElementById('transactionList');
    const emptyState = document.getElementById('emptyState');
    if (!container) return;

    let transactions = getHistory();

    if (filter === 'pending') {
        transactions = transactions.filter(t => t.status === 'pending');
    } else if (filter === 'completed') {
        transactions = transactions.filter(t => t.status === 'completed');
    }

    if (transactions.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    container.innerHTML = transactions.map(trx => `
        <div class="transaction-card" onclick="viewReceipt('${trx.id}')">
            <div class="transaction-header">
                <span class="transaction-id">${trx.id}</span>
                <span class="transaction-status ${trx.status === 'completed' ? 'status-completed' : 'status-pending'}">
                    <i class="fas ${trx.status === 'completed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                    ${trx.status === 'completed' ? 'Selesai' : 'Pending'}
                </span>
            </div>
            <div class="transaction-product">
                <div style="width:44px; height:44px; border-radius:12px; overflow:hidden; flex-shrink:0;">
                    <img src="${trx.product.image || ''}" alt="${trx.product.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas ${trx.product.icon || 'fa-shopping-bag'}\' style=\'font-size:20px; color:var(--gopay-primary);\'></i>'">
                </div>
                <div class="transaction-product-info">
                    <h4>${trx.product.name}</h4>
                    <p>${trx.quantity || 1}x | ${trx.username || '-'}</p>
                </div>
            </div>
            <div class="transaction-footer">
                <span class="transaction-date">${formatDate(trx.date)}</span>
                <span class="transaction-amount">Rp ${formatPrice(trx.total)}</span>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const transactions = getHistory();
    const total = transactions.length;
    const completed = transactions.filter(t => t.status === 'completed').length;
    const pending = transactions.filter(t => t.status === 'pending').length;

    document.getElementById('totalOrders').textContent = total;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('pendingOrders').textContent = pending;
}

function initFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTransactions(btn.dataset.filter);
        });
    });
}

function viewReceipt(trxId) {
    const transactions = getHistory();
    const trx = transactions.find(t => t.id === trxId);
    if (!trx) return;

    localStorage.setItem('nusa_receipt_transaction', JSON.stringify(trx));
    window.location.href = 'receipt.html';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
