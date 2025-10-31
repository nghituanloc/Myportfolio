/**********************************************************************
|| Cloud Web OS – Constants & Configuration
**********************************************************************/

// Các hình nền mặc định (4 lựa chọn)
const DEFAULT_WALLPAPERS = [
  "linear-gradient(120deg, #0ea5e9, #22c55e)",
  "linear-gradient(135deg, #a78bfa, #ec4899)",
  "linear-gradient(100deg, #f43f5e, #f59e0b)",
  "linear-gradient(160deg, #0ea5e9, #1e3a8a)",
];

// Hàm lấy danh sách wallpaper (gồm mặc định + tùy chỉnh từ localStorage)
function getWallpapers() {
  try {
    const customWallpapers = JSON.parse(localStorage.getItem('os.customWallpapers') || '[]');
    return [...DEFAULT_WALLPAPERS, ...customWallpapers];
  } catch (e) {
    return DEFAULT_WALLPAPERS;
  }
}

// Hàm thêm wallpaper tùy chỉnh
function addCustomWallpaper(gradient) {
  try {
    const customWallpapers = JSON.parse(localStorage.getItem('os.customWallpapers') || '[]');
    if (!customWallpapers.includes(gradient)) {
      customWallpapers.push(gradient);
      localStorage.setItem('os.customWallpapers', JSON.stringify(customWallpapers));
    }
    return true;
  } catch (e) {
    return false;
  }
}

// Hàm xóa wallpaper tùy chỉnh
function removeCustomWallpaper(index) {
  try {
    const customWallpapers = JSON.parse(localStorage.getItem('os.customWallpapers') || '[]');
    if (index >= 0 && index < customWallpapers.length) {
      customWallpapers.splice(index, 1);
      localStorage.setItem('os.customWallpapers', JSON.stringify(customWallpapers));
    }
    return true;
  } catch (e) {
    return false;
  }
}

// Lấy mảng wallpaper để sử dụng trong app
const WALLPAPERS = getWallpapers();

// Định nghĩa các ứng dụng
const APP_DEFS = {
  about: { id: "about", name: "Giới Thiệu", emoji: "👤" },
  skills: { id: "skills", name: "Kỹ Năng", emoji: "⚡" },
  projects: { id: "projects", name: "Dự Án", emoji: "💼" },
  education: { id: "education", name: "Học Vấn", emoji: "🎓" },
  contact: { id: "contact", name: "Liên Hệ", emoji: "📧" },
  settings: { id: "settings", name: "Cài đặt", emoji: "⚙️" },
  viewer: { id: "viewer", name: "Viewer", emoji: "👁️" },
};

// File mặc định
const DEFAULT_FILES = [
  { 
    id: 1, 
    name: "Readme.txt", 
    size: 47, 
    type: "text/plain", 
    content: `Chào mừng đến với Cloud Web OS!\nSử dụng lệnh 'help' trong Terminal.` 
  },
  { 
    id: 2, 
    name: "Demo.json", 
    size: 18, 
    type: "application/json", 
    content: `{\n  "ok": true\n}` 
  },
];
