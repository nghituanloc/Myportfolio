/**********************************************************************
|| Cloud Web OS – OS State Management
**********************************************************************/

// Quản lý state của OS (theme, user, wallpaper)
class OSState {
  constructor() {
    this.theme = this.loadState('os.theme', 'dark');
    this.user = this.loadState('os.user', {name: 'Hello world!'});
    this.wallpaperIdx = this.loadState('os.wallpaper', 2);
    this.fontSize = this.loadState('os.fontSize', 'medium');
    this.accentColor = this.loadState('os.accentColor', '#3b82f6');
    this.windowOpacity = this.loadState('os.windowOpacity', 90);
    this.blurEffect = this.loadState('os.blurEffect', true);

    // Migration: đảm bảo mặc định mới là nền số 3 cho lần chạy đầu sau cập nhật
    try {
      const migrated = localStorage.getItem('os.wallpaper.migrated.v3');
      if (!migrated) {
        this.wallpaperIdx = 2;
        this.saveState('os.wallpaper', 2);
        localStorage.setItem('os.wallpaper.migrated.v3', '1');
      }
    } catch (e) {}
  }

  loadState(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.warn('Error loading state:', e);
      return defaultValue;
    }
  }

  saveState(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Error saving state:', e);
    }
  }

  getTheme() {
    return this.theme;
  }

  getUser() {
    return this.user;
  }

  getWallpaperIdx() {
    return this.wallpaperIdx;
  }

  setTheme(theme) {
    this.theme = theme;
    this.saveState('os.theme', theme);
  }

  setUser(user) {
    this.user = user;
    this.saveState('os.user', user);
  }

  setWallpaperIdx(idx) {
    this.wallpaperIdx = idx;
    this.saveState('os.wallpaper', idx);
  }

  setupTheme() {
    document.documentElement.classList.toggle("dark", this.theme === "dark");
  }

  // Font size
  getFontSize() {
    return this.fontSize;
  }

  setFontSize(size) {
    this.fontSize = size;
    this.saveState('os.fontSize', size);
  }

  // Accent color
  getAccentColor() {
    return this.accentColor;
  }

  setAccentColor(color) {
    this.accentColor = color;
    this.saveState('os.accentColor', color);
  }

  // Window opacity
  getWindowOpacity() {
    return this.windowOpacity;
  }

  setWindowOpacity(opacity) {
    this.windowOpacity = opacity;
    this.saveState('os.windowOpacity', opacity);
  }

  // Blur effect
  getBlurEffect() {
    return this.blurEffect;
  }

  setBlurEffect(blur) {
    this.blurEffect = blur;
    this.saveState('os.blurEffect', blur);
  }
}

