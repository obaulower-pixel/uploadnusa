/* ========================================
   NUSASTORE - AUTHENTICATION SYSTEM
   Real Login/Register with LocalStorage
   Owner: FATAH@OWNER.COM / FATAH377@
   ======================================== */

const AUTH = {
    OWNER_EMAIL: 'FATAH@OWNER.COM',
    OWNER_PASSWORD: 'FATAH377@',

    init() {
        this.checkAuth();
        this.updateUI();
        this.handleOwnerRedirect();
    },

    checkAuth() {
        const user = localStorage.getItem('nusa_user');
        const isLoggedIn = localStorage.getItem('nusa_logged_in');

        if (user && isLoggedIn === 'true') {
            window.currentUser = JSON.parse(user);
            return true;
        }
        return false;
    },

    isOwner() {
        const user = this.getUser();
        return user && user.email === this.OWNER_EMAIL;
    },

    getUser() {
        const user = localStorage.getItem('nusa_user');
        return user ? JSON.parse(user) : null;
    },

    login(email, password) {
        // Normalize email
        const normalizedEmail = email.toUpperCase().trim();
        const normalizedPassword = password.trim();

        // Check owner account
        if (normalizedEmail === this.OWNER_EMAIL && normalizedPassword === this.OWNER_PASSWORD) {
            const ownerData = {
                email: this.OWNER_EMAIL,
                name: 'FATAH Owner',
                role: 'owner',
                avatar: null,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('nusa_user', JSON.stringify(ownerData));
            localStorage.setItem('nusa_logged_in', 'true');
            window.currentUser = ownerData;
            return { success: true, user: ownerData, isOwner: true };
        }

        // Check registered users (case insensitive)
        const users = JSON.parse(localStorage.getItem('nusa_users') || '[]');
        const user = users.find(u => u.email.toUpperCase() === normalizedEmail && u.password === normalizedPassword);

        if (user) {
            const userData = {
                email: user.email,
                name: user.name,
                role: 'user',
                avatar: user.avatar,
                phone: user.phone,
                createdAt: user.createdAt
            };
            localStorage.setItem('nusa_user', JSON.stringify(userData));
            localStorage.setItem('nusa_logged_in', 'true');
            window.currentUser = userData;
            return { success: true, user: userData, isOwner: false };
        }

        return { success: false, message: 'Email atau password salah!' };
    },

    register(name, email, password, phone = '') {
        const users = JSON.parse(localStorage.getItem('nusa_users') || '[]');

        if (users.find(u => u.email.toUpperCase() === email.toUpperCase())) {
            return { success: false, message: 'Email sudah terdaftar!' };
        }

        const newUser = {
            name,
            email,
            password,
            phone,
            avatar: null,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('nusa_users', JSON.stringify(users));

        // Auto login after register
        return this.login(email, password);
    },

    logout() {
        localStorage.removeItem('nusa_user');
        localStorage.removeItem('nusa_logged_in');
        window.currentUser = null;
        window.location.href = 'index.html';
    },

    updateUI() {
        const user = this.getUser();
        const menuUserInfo = document.getElementById('menuUserInfo');
        const menuLogin = document.getElementById('menuLogin');
        const menuLogout = document.getElementById('menuLogout');
        const ownerItems = document.querySelectorAll('.owner-only');
        const menuNotifBadge = document.getElementById('menuNotifBadge');

        if (menuUserInfo && user) {
            menuUserInfo.querySelector('.user-name').textContent = user.name;
            menuUserInfo.querySelector('.user-status').textContent = user.role === 'owner' ? 'Owner' : 'Member';
        }

        if (menuLogin && menuLogout) {
            if (user) {
                menuLogin.style.display = 'none';
                menuLogout.style.display = 'flex';
            } else {
                menuLogin.style.display = 'flex';
                menuLogout.style.display = 'none';
            }
        }

        // Update notification badge in menu
        if (menuNotifBadge && typeof NOTIFICATIONS !== 'undefined') {
            const count = NOTIFICATIONS.getUnreadCount();
            menuNotifBadge.textContent = count > 99 ? '99+' : count;
            menuNotifBadge.style.display = count > 0 ? 'inline-flex' : 'none';
        }

        // Show owner menu items
        if (this.isOwner()) {
            ownerItems.forEach(item => item.style.display = 'flex');
        }
    },

    handleOwnerRedirect() {
        // If on owner page and not owner, redirect
        const currentPage = window.location.pathname;
        if (currentPage.includes('owner.html') && !this.isOwner()) {
            showToast('Akses ditolak! Hanya owner yang dapat mengakses.');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }
    },

    requireLogin() {
        if (!this.checkAuth()) {
            showToast('Silakan login terlebih dahulu');
            setTimeout(() => {
                window.location.href = 'pages/login.html?redirect=' + encodeURIComponent(window.location.href);
            }, 1500);
            return false;
        }
        return true;
    }
};

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    AUTH.init();
});

function logout() {
    AUTH.logout();
}
