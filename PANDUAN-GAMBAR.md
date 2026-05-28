# Panduan Mengganti Gambar di NusaStore

## Struktur Folder Gambar

```
assets/
├── images/
│   ├── games/           # Icon dan banner game
│   │   ├── roblox-icon.png
│   │   ├── roblox-banner.jpg
│   │   ├── freefire-icon.png
│   │   ├── freefire-banner.jpg
│   │   ├── mobilelegends-icon.png
│   │   └── mobilelegends-banner.jpg
│   ├── products/        # Foto produk
│   │   ├── robux-80.png
│   │   ├── robux-400.png
│   │   ├── ff-diamond-50.png
│   │   ├── ml-diamond-86.png
│   │   └── ...
│   ├── banners/         # Banner home page
│   │   ├── banner-1.jpg
│   │   ├── banner-2.jpg
│   │   ├── banner-3.jpg
│   │   ├── scroll-1.jpg
│   │   ├── scroll-2.jpg
│   │   └── scroll-3.jpg
│   └── icons/           # Icon lainnya
│       └── logo.svg
└── qris/
    └── qris-payment.jpg
```

## Cara Mengganti Gambar

### 1. Icon Game (Home Page)
Ganti file di `assets/images/games/`:
- `roblox-icon.png` - Icon Roblox (56x56px)
- `freefire-icon.png` - Icon Free Fire (56x56px)
- `mobilelegends-icon.png` - Icon Mobile Legends (56x56px)

### 2. Banner Game (Halaman Store)
Ganti file di `assets/images/games/`:
- `roblox-banner.jpg` - Banner Roblox Store (recommended 768x280px)
- `freefire-banner.jpg` - Banner Free Fire Store (recommended 768x280px)
- `mobilelegends-banner.jpg` - Banner MLBB Store (recommended 768x280px)

### 3. Foto Produk
Ganti file di `assets/images/products/`:
- Format nama: `[game]-[nama-produk].png`
- Ukuran recommended: 300x200px
- Contoh: `robux-80.png`, `ff-diamond-100.png`, `ml-diamond-86.png`

### 4. Banner Home Page
Ganti file di `assets/images/banners/`:
- `banner-1.jpg` - Banner slide 1 (recommended 768x200px)
- `banner-2.jpg` - Banner slide 2
- `banner-3.jpg` - Banner slide 3
- `scroll-1.jpg` - Banner scrollable 1 (recommended 560x140px)
- `scroll-2.jpg` - Banner scrollable 2
- `scroll-3.jpg` - Banner scrollable 3

### 5. QRIS Payment
Ganti file di `assets/qris/`:
- `qris-payment.jpg` - QRIS Anda (recommended 400x400px)

### 6. Logo Store
Ganti file di `assets/icons/`:
- `logo.svg` - Logo NusaStore

## Catatan Penting

1. **Format File**: Gunakan PNG untuk transparan, JPG untuk foto
2. **Fallback**: Jika gambar tidak ditemukan, akan otomatis menggunakan icon Font Awesome
3. **Ukuran**: Semua gambar akan otomatis `object-fit: cover` agar pas
4. **Cache**: Setelah ganti gambar, refresh browser (Ctrl+F5) untuk clear cache

## Daftar Lengkap Produk yang Bisa Diganti

### Roblox
- `robux-80.png`
- `robux-400.png`
- `robux-800.png`
- `robux-1700.png`
- `robux-4500.png`
- `robux-10000.png`
- `gag-1000.png` (Grow a Garden)
- `gag-5000.png` (Grow a Garden)
- `usn-change.png` (USN Change)

### Free Fire
- `ff-diamond-50.png`
- `ff-diamond-100.png`
- `ff-diamond-310.png`
- `ff-diamond-520.png`
- `ff-diamond-1060.png`
- `ff-diamond-2180.png`
- `ff-wdp.png` (Weekly Diamond Pass)
- `ff-member.png` (Membership)

### Mobile Legends
- `ml-diamond-86.png`
- `ml-diamond-172.png`
- `ml-diamond-257.png`
- `ml-diamond-344.png`
- `ml-diamond-429.png`
- `ml-diamond-706.png`
- `ml-diamond-1043.png`
- `ml-wdp.png` (Weekly Diamond Pass)
- `ml-starlight.png` (Starlight Member)
