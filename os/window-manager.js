/**********************************************************************
|| Cloud Web OS – Window Manager
**********************************************************************/

// Quản lý tất cả cửa sổ và tương tác
class WindowManager {
  constructor(osInstance) {
    this.os = osInstance;
    this.windows = [];
    this.zTop = 10;
  }

  openApp(appId, opts = {}) {
    const existing = this.windows.find(w => w.appId === appId);
    if (existing) {
      existing.minimized = false; // Restore nếu đang minimized
      existing.window.updateMinimized(false);
      this.focusWindow(existing.id); // Đưa lên on top và cập nhật Dock
      return;
    }
      
    const def = APP_DEFS[appId];
    const windowId = `${appId}-${Date.now()}`;
    
    // Tính toán vị trí theo quy tắc: hàng ngang -> xếp chồng
    const index = this.windows.length;
    const baseX = 15;
    const baseY = 110;
    const windowWidth = 730;
    const gap = 10; // Khoảng cách giữa 2 cửa sổ ngang
    const headerHeight = 50; // Offset để không che tiêu đề
    const colOffset = 30; // Offset ngang cho các tầng
    
    let posX, posY;
    if (index === 0) {
      // Window đầu tiên
      posX = baseX;
      posY = baseY;
    } else if (index === 1) {
      // Window thứ 2: bên phải window 1, cách 10px
      posX = baseX + windowWidth + gap;
      posY = baseY;
    } else {
      // Window thứ 3 trở đi: xếp chồng lên các window phía dưới
      const col = index % 2; // 0 = cột trái, 1 = cột phải
      const layer = Math.floor(index / 2); // Tầng (layer)
      posX = baseX + (col === 1 ? windowWidth + gap : 0) + colOffset * layer;
      posY = baseY + headerHeight * layer;
    }
    
    const windowOptions = {
      id: windowId,
      appId,
      title: def?.name || "App",
      z: this.zTop + 1,
      pos: [posX, posY],
      size: [680, 520],
      minimized: false,
      maximized: false,
      onFocus: () => this.focusWindow(windowId),
      onClose: () => this.closeWindow(windowId),
      onMinToggle: () => this.toggleMinimize(windowId),
      onMaximize: () => this.toggleMaximize(windowId),
      onRestore: () => this.restoreWindow(windowId),
      onMove: (id, pos) => this.moveWindow(id, pos),
      onResize: (id, size) => this.resizeWindow(id, size)
    };

    const windowElement = createElement('div');
    const window = new Window(windowElement, windowOptions);
    
    // Tạo content cho ứng dụng
    const content = this.os.createAppContent(appId);
    window.setContent(content);

    this.os.container.appendChild(windowElement);

    this.windows.push({
      id: windowId,
      appId,
      window,
      ...windowOptions
    });

    this.os.updateDockActiveApp();
    this.os.updateDockMinimizedApps();
    this.os.hideWelcomeMessage();
  }

  focusWindow(id) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      this.zTop += 1;
      window.z = this.zTop; // Update z-index in tracking
      window.window.updateZIndex(this.zTop);
      this.os.updateDockActiveApp();
      this.os.updateDockMinimizedApps();
    }
  }

  closeWindow(id) {
    const windowIndex = this.windows.findIndex(w => w.id === id);
    if (windowIndex !== -1) {
      this.windows[windowIndex].window.destroy();
      this.windows.splice(windowIndex, 1);
      this.os.updateDockActiveApp();
      this.os.updateDockMinimizedApps();
      this.os.showWelcomeMessage();
    }
  }

  closeApp(appId) {
    // Đóng tất cả windows của app này
    const windows = this.windows.filter(w => w.appId === appId);
    windows.forEach(window => {
      window.window.destroy();
    });
    this.windows = this.windows.filter(w => w.appId !== appId);
    
    this.os.updateDockActiveApp();
    this.os.updateDockMinimizedApps();
    this.os.showWelcomeMessage();
  }

  toggleMinimize(id) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.minimized = !window.minimized;
      window.window.updateMinimized(window.minimized);
      
      // Cập nhật Dock
      this.os.updateDockMinimizedApps();
    }
  }

  toggleMinimizeByAppId(appId) {
    // Tìm tất cả window của app này
    const windows = this.windows.filter(w => w.appId === appId);
    
    if (windows.length === 0) {
      // Không có window nào, mở app mới
      this.openApp(appId);
      return;
    }

    // Nếu có window đang minimized, restore nó
    const minimizedWindow = windows.find(w => w.minimized);
    if (minimizedWindow) {
      minimizedWindow.minimized = false;
      minimizedWindow.window.updateMinimized(false);
      minimizedWindow.window.updateZIndex(this.zTop + 1);
    } else {
      // Nếu tất cả window đều không minimize, minimize window gần nhất
      const topWindow = windows.reduce((a, b) => (a.z > b.z ? a : b));
      topWindow.minimized = true;
      topWindow.window.updateMinimized(true);
    }
    
    // Cập nhật Dock
    this.os.updateDockMinimizedApps();
  }

  previewApp(appId, show) {
    // Tìm tất cả window của app này đang minimized
    const windows = this.windows.filter(w => w.appId === appId && w.minimized);
    
    windows.forEach(window => {
      if (show) {
        // Preview: hiển thị nhưng không thay đổi trạng thái minimized
        window.window.updateMinimized(false);
        window.window.updateZIndex(this.zTop + 10); // Z-index cao hơn nhưng không active
      } else {
        // Ẩn lại
        window.window.updateMinimized(true);
      }
    });
  }

  toggleMaximize(id) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      if (!window.maximized) {
        // Lưu position và size hiện tại trước khi maximize
        const currentPos = window.window.element.style.left 
          ? [parseInt(window.window.element.style.left), parseInt(window.window.element.style.top)]
          : window.pos;
        const currentSize = window.window.element.style.width 
          ? [parseInt(window.window.element.style.width), parseInt(window.window.element.style.height)]
          : window.size;
        
        window.pos = currentPos;
        window.size = currentSize;
      }
      
      window.maximized = !window.maximized;
      window.window.updateMaximized(window.maximized);
      
      if (!window.maximized) {
        window.window.updatePosition(window.pos);
        window.window.updateSize(window.size);
      }

      // Cập nhật Dock
      this.os.updateDockMinimizedApps();
    }
  }

  restoreWindow(id) {
    const window = this.windows.find(w => w.id === id);
    if (window && window.maximized) {
      window.maximized = false;
      window.window.updateMaximized(false);
      window.window.updatePosition(window.pos);
      window.window.updateSize(window.size);
      
      // Cập nhật Dock
      this.os.updateDockMinimizedApps();
    }
  }

  moveWindow(id, pos) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.pos = [pos.x, pos.y];
      window.window.updatePosition(window.pos);
    }
  }

  resizeWindow(id, size) {
    const window = this.windows.find(w => w.id === id);
    if (window) {
      window.size = size;
      window.window.updateSize(window.size);
    }
  }

  getActiveAppId() {
    if (this.windows.length === 0) return null;
    return this.windows.reduce((a, b) => (a.z > b.z ? a : b)).appId;
  }

  getMinimizedApps() {
    return this.windows
      .filter(w => w.minimized)
      .map(w => w.appId);
  }

  getAllOpenApps() {
    return this.windows.map(w => ({
      appId: w.appId,
      minimized: w.minimized,
      maximized: w.maximized,
      z: w.z
    })).sort((a, b) => b.z - a.z); // Sắp xếp theo z-index, app gần nhất trước
  }

  hasMaximizedWindow() {
    return this.windows.some(w => w.maximized);
  }
}

