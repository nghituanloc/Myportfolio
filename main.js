/**********************************************************************
|| Cloud Web OS – Main Application
**********************************************************************/

// Ứng dụng chính Cloud Web OS
class CloudWebOS {
  constructor() {
    this.container = document.getElementById('root');
    this.viewerFile = null;
    
    // State management
    this.stateManager = new OSState();
    
    // Window management
    this.windowManager = new WindowManager(this);
    
    // App factory
    this.appFactory = new AppFactory(this);
    
    // Components
    this.topBar = null;
    this.desktop = null;
    
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupAllSettings();
    this.render();
    this.setupEventListeners();
    // Khởi tạo theo dõi chuột cho hiệu ứng nền
    window.CloudOSBackground?.init();
  }

  // Thêm lớp nền động theo chỉ số wallpaper hiện tại
  applyBackgroundOverlay(index) {
    window.CloudOSBackground?.apply(index);
  }

  setupTheme() {
    const theme = this.stateManager.getTheme();
    // Áp dụng theme ngay khi khởi tạo
    if (theme === 'light') {
      document.body.style.background = '#f0f0f0';
      document.body.style.color = '#000';
      this.container.style.color = '#000';
    } else {
      document.body.style.background = '#000';
      document.body.style.color = '#fff';
      this.container.style.color = '#fff';
    }
  }

  setupAllSettings() {
    // Áp dụng font size
    const fontSize = this.stateManager.getFontSize();
    const fontSizeValue = fontSize === 'small' ? '14px' : fontSize === 'large' ? '22  px' : '17px';
    document.documentElement.style.fontSize = fontSizeValue;
    document.body.style.fontSize = fontSizeValue;

    // Áp dụng accent color
    const accentColor = this.stateManager.getAccentColor();
    document.documentElement.style.setProperty('--accent-color', accentColor);

    // Áp dụng window opacity cho windows hiện tại
    const windowOpacity = this.stateManager.getWindowOpacity();
    document.documentElement.style.setProperty('--window-opacity', windowOpacity / 100);
    setTimeout(() => {
      document.querySelectorAll('[data-window]').forEach(el => {
        const isDark = document.body.style.backgroundColor === 'rgb(0, 0, 0)' || 
                      !document.body.style.backgroundColor || 
                      document.body.style.backgroundColor === '';
        
        if (isDark) {
          el.style.backgroundColor = `rgba(24, 24, 27, ${windowOpacity / 100})`;
        } else {
          el.style.backgroundColor = `rgba(255, 255, 255, ${windowOpacity / 100})`;
        }
      });
    }, 100);
  }

  render() {
    // Container chính
    this.container.className = 'w-full h-screen overflow-hidden';
    const wallpapers = getWallpapers(); // Lấy danh sách wallpaper
    const idx = this.stateManager.getWallpaperIdx();
    this.container.style.background = wallpapers[idx];
    // Bổ sung overlay nền động tương ứng
    this.applyBackgroundOverlay(idx);

    // TopBar
    this.topBar = new TopBar(this.container, {
      onOpen: (appId) => this.windowManager.openApp(appId),
      onToggleMinimize: (appId) => this.windowManager.toggleMinimizeByAppId(appId),
      onClose: (appId) => this.windowManager.closeApp(appId),
      onPreview: (appId, show) => this.windowManager.previewApp(appId, show),
      user: this.stateManager.getUser()
    });

    // Desktop
    this.desktop = new Desktop(this.container, {
      onOpen: (appId) => this.windowManager.openApp(appId)
    });

    // Tự động mở 2 app khi khởi động
    setTimeout(() => {
      this.windowManager.openApp('about');
      this.windowManager.openApp('contact');
    }, 100);
  }

  setupEventListeners() {
    // Lắng nghe thay đổi theme
    stateManager.subscribe('os.theme', (theme) => {
      this.stateManager.setTheme(theme);
      this.setupTheme();
      // Đồng bộ lại độ trong suốt nền cửa sổ theo theme mới
      this.setupAllSettings();
    });

    // Lắng nghe thay đổi user
    stateManager.subscribe('os.user', (user) => {
      this.stateManager.setUser(user);
      if (this.topBar) {
        this.topBar.updateUser(user);
      }
    });

    // Lắng nghe thay đổi wallpaper
    stateManager.subscribe('os.wallpaper', (wallpaperIdx) => {
      this.stateManager.setWallpaperIdx(wallpaperIdx);
      const wallpapers = getWallpapers(); // Lấy danh sách wallpaper mới nhất
      this.container.style.background = wallpapers[wallpaperIdx];
      // Áp dụng overlay nền động tương ứng
      this.applyBackgroundOverlay(wallpaperIdx);
    });
  }

  createAppContent(appId) {
    return this.appFactory.createAppContent(appId);
  }

  updateDockActiveApp() {
    const activeAppId = this.windowManager.getActiveAppId();
    
    // Update topbar
    if (this.topBar) {
      this.topBar.updateActiveApp(activeAppId);
    }
  }

  updateDockMinimizedApps() {
    const allOpenApps = this.windowManager.getAllOpenApps();
    
    // Update topbar
    if (this.topBar) {
      this.topBar.updateOpenApps(allOpenApps);
    }
  }

  openViewer(file) {
    this.viewerFile = file;
    this.windowManager.openApp('viewer', {title: `Viewer - ${file.name}`});
  }

  getFilesAPI() {
    return {
      files: () => {
        try {
          return JSON.parse(localStorage.getItem("os.files") || "[]");
        } catch (e) {
          return [];
        }
      },
      cat: name => {
        try {
          const files = JSON.parse(localStorage.getItem("os.files") || "[]");
          const file = files.find(f => f.name === name);
          return file ? file.content : "không tìm thấy";
        } catch (e) {
          return "không tìm thấy";
        }
      }
    };
  }

  showWelcomeMessage() {
    if (this.windowManager && this.windowManager.windows.length === 0) {
      window.OSWelcome?.show(this.container);
    }
  }

  hideWelcomeMessage() {
    window.OSWelcome?.hide(this.container);
  }

  destroy() {
    if (this.windowManager) {
      this.windowManager.windows.forEach(w => w.window.destroy());
    }
    if (this.topBar) this.topBar.destroy();
    if (this.desktop) this.desktop.destroy();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CloudWebOS();
});
