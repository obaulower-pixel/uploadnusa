/* ========================================
   OWNER PANEL - JAVASCRIPT UPGRADED
   Full verification, rejection, user management
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    checkOwnerAccess();
    updateDashboard();
    renderPendingTransactions();
    renderAllTransactions('all');
    renderUserList();
    initFilterTabs();
});

function checkOwnerAccess() {
    if (!AUTH.checkAuth()) {
        showToast('Akses ditolak! Silakan login');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }, 1500);
        return;
    }

    if (!AUTH.isOwner()) {
        showToast('Akses ditolak! Hanya owner yang dapat mengakses panel ini');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
        return;
    }
}

function updateDashboard() {
    const transactions = getHistory();
    const users = JSON.parse(localStorage.getItem('nusa_users') || '[]');

    const total = transactions.length;
    const revenue = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + (t.total || 0), 0);
    const pending = transactions.filter(t => t.status === 'pending').length;
    const completed = transactions.filter(t => t.status === 'completed').length;
    const rejected = transactions.filter(t => t.status === 'rejected').length;
    const totalUsers = users.length;

    document.getElementById('dashTotal').textContent = total;
    document.getElementById('dashRevenue').textContent = 'Rp ' + formatPrice(revenue);
    document.getElementById('dashPending').textContent = pending;
    document.getElementById('dashCompleted').textContent = completed;
    document.getElementById('dashRejected').textContent = rejected;
    document.getElementById('dashUsers').textContent = totalUsers;
    document.getElementById('pendingBadge').textContent = pending;
}

function renderPendingTransactions() {
    const container = document.getElementById('pendingList');
    const emptyState = document.getElementById('emptyPending');
    if (!container) return;

    const transactions = getHistory().filter(t => t.status === 'pending');

    if (transactions.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    container.innerHTML = transactions.map(trx => `
        <div class="pending-card" id="pending-${trx.id}">
            <div class="pending-header">
                <span class="pending-id"><i class="fas fa-hashtag"></i> ${trx.id}</span>
                <span class="pending-time"><i class="fas fa-clock"></i> ${formatDate(trx.date)}</span>
            </div>
            <div class="pending-product">
                <i class="fas ${trx.product.icon || 'fa-shopping-bag'}"></i>
                <div class="pending-product-info">
                    <h4>${trx.product.name}</h4>
                    <p>Rp ${formatPrice(trx.total)}</p>
                </div>
            </div>
            <div class="pending-details">
                <p><i class="fas fa-user"></i> <strong>Pembeli:</strong> ${trx.email || '-'}</p>
                <p><i class="fas fa-gamepad"></i> <strong>Username Game:</strong> ${trx.username || '-'}</p>
                <p><i class="fab fa-whatsapp"></i> <strong>WhatsApp:</strong> ${trx.phone || '-'}</p>
                <p><i class="fas fa-sort-numeric-up"></i> <strong>Jumlah:</strong> ${trx.quantity || 1}x</p>
                <p><i class="fas fa-credit-card"></i> <strong>Metode:</strong> ${(trx.paymentMethod || 'QRIS').toUpperCase()}</p>
            </div>
            <div class="pending-amount">
                <span class="pending-amount-label">Total Pembayaran</span>
                <span class="pending-amount-value">Rp ${formatPrice(trx.total)}</span>
            </div>
            <div class="pending-actions">
                <button class="verify-btn" onclick="verifyTransaction('${trx.id}')">
                    <i class="fas fa-check"></i> Verifikasi & Kirim
                </button>
                <button class="reject-btn" onclick="rejectTransaction('${trx.id}')">
                    <i class="fas fa-times"></i> Tolak Pesanan
                </button>
            </div>
        </div>
    `).join('');
}

function renderAllTransactions(filter) {
    const container = document.getElementById('allTransactionsList');
    const emptyState = document.getElementById('emptyAll');
    if (!container) return;

    let transactions = getHistory();

    if (filter !== 'all') {
        transactions = transactions.filter(t => t.status === filter);
    }

    if (transactions.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    container.innerHTML = transactions.map(trx => `
        <div class="transaction-card ${trx.status}" onclick="viewTransactionDetail('${trx.id}')">
            <div class="transaction-header">
                <span class="transaction-id">${trx.id}</span>
                <span class="transaction-status ${trx.status === 'completed' ? 'status-completed' : trx.status === 'rejected' ? 'status-rejected' : 'status-pending'}">
                    <i class="fas ${trx.status === 'completed' ? 'fa-check-circle' : trx.status === 'rejected' ? 'fa-times-circle' : 'fa-clock'}"></i>
                    ${trx.status === 'completed' ? 'Selesai' : trx.status === 'rejected' ? 'Ditolak' : 'Pending'}
                </span>
            </div>
            <div class="transaction-product">
                <i class="fas ${trx.product.icon || 'fa-shopping-bag'}"></i>
                <div class="transaction-product-info">
                    <h4>${trx.product.name}</h4>
                    <p>${trx.quantity || 1}x | ${trx.username || '-'} | ${trx.email || '-'}</p>
                </div>
            </div>
            <div class="transaction-footer">
                <span class="transaction-date"><i class="fas fa-calendar-alt"></i> ${formatDate(trx.date)}</span>
                <span class="transaction-amount">Rp ${formatPrice(trx.total)}</span>
            </div>
            ${trx.verifiedBy ? `<div style="margin-top:8px; font-size:11px; color:var(--success);"><i class="fas fa-user-check"></i> Diverifikasi oleh: ${trx.verifiedBy}</div>` : ''}
            ${trx.rejectedBy ? `<div style="margin-top:8px; font-size:11px; color:var(--danger);"><i class="fas fa-user-times"></i> Ditolak oleh: ${trx.rejectedBy}</div>` : ''}
        </div>
    `).join('');
}

function renderUserList() {
    const container = document.getElementById('userList');
    if (!container) return;

    const users = JSON.parse(localStorage.getItem('nusa_users') || '[]');
    const ownerData = { name: 'FATAH Owner', email: 'FATAH@OWNER.COM', role: 'owner', createdAt: new Date().toISOString() };
    const allUsers = [ownerData, ...users];

    container.innerHTML = allUsers.map((user, index) => `
        <div class="user-card">
            <div class="user-avatar-small"><i class="fas fa-user"></i></div>
            <div class="user-info">
                <h4>${user.name}</h4>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
            </div>
            <span class="user-role ${user.role || 'user'}">${user.role === 'owner' ? 'OWNER' : 'MEMBER'}</span>
        </div>
    `).join('');
}

function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAllTransactions(tab.dataset.filter);
        });
    });
}

function verifyTransaction(trxId) {
    if (!AUTH.isOwner()) {
        showToast('Hanya owner yang dapat memverifikasi!');
        return;
    }

    const user = AUTH.getUser();
    const history = getHistory();
    const trxIndex = history.findIndex(t => t.id === trxId);

    if (trxIndex === -1) {
        showToast('Transaksi tidak ditemukan!');
        return;
    }

    const trx = history[trxIndex];

    // Update transaction
    history[trxIndex].status = 'completed';
    history[trxIndex].verifiedBy = user.name;
    history[trxIndex].verifiedAt = new Date().toISOString();
    history[trxIndex].verifiedEmail = user.email;

    localStorage.setItem('nusa_history', JSON.stringify(history));

    // Send notification to user
    if (typeof NOTIFICATIONS !== 'undefined' && trx.email) {
        NOTIFICATIONS.addNotification({
            title: 'Pembayaran Berhasil',
            message: 'Transaksi ' + trx.product.name + ' telah diverifikasi oleh owner. Produk akan segera dikirim ke akun Anda.',
            type: 'success',
            link: 'pages/receipt.html'
        });
    }

    // Show success animation
    const card = document.getElementById('pending-' + trxId);
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'translateX(100%)';
        card.style.opacity = '0';
        setTimeout(() => {
            showToast('Transaksi ' + trxId + ' berhasil diverifikasi! Produk akan dikirim otomatis.');
            updateDashboard();
            renderPendingTransactions();
            renderAllTransactions('all');
        }, 500);
    } else {
        showToast('Transaksi berhasil diverifikasi!');
        updateDashboard();
        renderPendingTransactions();
        renderAllTransactions('all');
    }
}

function rejectTransaction(trxId) {
    if (!AUTH.isOwner()) {
        showToast('Hanya owner yang dapat menolak transaksi!');
        return;
    }

    const user = AUTH.getUser();
    const history = getHistory();
    const trxIndex = history.findIndex(t => t.id === trxId);

    if (trxIndex === -1) {
        showToast('Transaksi tidak ditemukan!');
        return;
    }

    const trx = history[trxIndex];

    // Update transaction
    history[trxIndex].status = 'rejected';
    history[trxIndex].rejectedBy = user.name;
    history[trxIndex].rejectedAt = new Date().toISOString();
    history[trxIndex].rejectedEmail = user.email;

    localStorage.setItem('nusa_history', JSON.stringify(history));

    // Send notification to user
    if (typeof NOTIFICATIONS !== 'undefined' && trx.email) {
        NOTIFICATIONS.addNotification({
            title: 'Transaksi Ditolak',
            message: 'Transaksi ' + trx.product.name + ' ditolak oleh owner. Silakan hubungi support@nusastore.id untuk informasi lebih lanjut.',
            type: 'danger',
            link: 'pages/history.html'
        });
    }

    // Show rejection animation
    const card = document.getElementById('pending-' + trxId);
    if (card) {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = '0';
        setTimeout(() => {
            showToast('Transaksi ' + trxId + ' telah ditolak.');
            updateDashboard();
            renderPendingTransactions();
            renderAllTransactions('all');
        }, 500);
    } else {
        showToast('Transaksi telah ditolak.');
        updateDashboard();
        renderPendingTransactions();
        renderAllTransactions('all');
    }
}

function viewTransactionDetail(trxId) {
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
