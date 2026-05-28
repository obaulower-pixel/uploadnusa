# NusaStore - Web App Top Up Game

## Deskripsi
NusaStore adalah web app top up game terlengkap dengan desain modern yang terinspirasi dari GoPay, Dana, dan Bank BRI. Mendukung top up untuk Roblox, Free Fire, dan Mobile Legends.

## Fitur Utama
- **3 Store Berbeda**: Roblox (Dana Purple), Free Fire (GoPay Blue), Mobile Legends (BRI Blue)
- **Login & Register Nyata**: Menggunakan LocalStorage (bukan simulasi)
- **QRIS Payment**: Dengan foto QRIS yang bisa diganti
- **Bukti Transaksi**: Desain keren yang bisa diunduh sebagai foto
- **Owner Panel**: Verifikasi pembayaran oleh owner
- **Riwayat Transaksi**: Lengkap dengan filter status
- **Responsive**: Optimized untuk Android, iOS, PC, dan Laptop

## Akun Owner
- **Email**: FATAH@OWNER.COM
- **Password**: FATAH377@

## Struktur File
```
nusastore/
├── index.html              # Halaman utama
├── css/
│   ├── style.css           # Stylesheet utama
│   ├── auth.css            # Login & Register styles
│   ├── payment.css         # Payment page styles
│   ├── qris.css            # QRIS page styles
│   ├── history.css         # History page styles
│   ├── receipt.css         # Receipt styles
│   ├── owner.css           # Owner panel styles
│   ├── roblox.css          # Roblox store theme (Dana)
│   ├── freefire.css        # Free Fire store theme (GoPay)
│   └── mobilelegends.css   # MLBB store theme (BRI)
├── js/
│   ├── app.js              # Main app logic
│   ├── auth.js             # Authentication system
│   ├── roblox.js           # Roblox store logic
│   ├── freefire.js         # Free Fire store logic
│   ├── mobilelegends.js    # MLBB store logic
│   ├── history.js          # History page logic
│   └── owner.js            # Owner panel logic
├── pages/
│   ├── login.html          # Login & Register
│   ├── payment.html        # Payment page
│   ├── qris.html           # QRIS payment
│   ├── history.html        # Transaction history
│   ├── receipt.html        # Downloadable receipt
│   ├── owner.html          # Owner panel
│   ├── roblox.html         # Roblox store
│   ├── freefire.html       # Free Fire store
│   └── mobilelegends.html  # MLBB store
└── assets/
    ├── qris/
    │   └── qris-payment.jpg # Ganti dengan QRIS Anda
    ├── images/              # Folder untuk foto produk
    └── icons/               # Folder untuk logo
```

## Cara Mengganti QRIS
1. Buka folder `assets/qris/`
2. Ganti file `qris-payment.jpg` dengan QRIS Anda
3. Pastikan nama file tetap sama atau ubah di `pages/qris.html`

## Cara Deploy
### GitHub + Netlify
1. Upload folder `nusastore` ke repository GitHub
2. Hubungkan repository ke Netlify
3. Deploy otomatis

### Local
1. Extract file ZIP
2. Buka `index.html` di browser
3. Untuk fitur login, gunakan server local (Live Server VS Code)

## Teknologi
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (ES6+, LocalStorage API)
- Font Awesome Icons (Pure Icons, No Emoji)
- Google Fonts (Inter)
- html2canvas (Receipt download)

## Catatan
- Semua data disimpan di LocalStorage browser
- Untuk production, gunakan backend database
- QRIS foto bisa diganti sesuai kebutuhan
- Owner panel hanya bisa diakses oleh FATAH@OWNER.COM

## Kontak
- Email: support@nusastore.id
- Website: www.nusastore.id
