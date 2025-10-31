/**********************************************************************
|| Cloud Web OS – Window State Management
**********************************************************************/

// Quản lý state và update window (position, size, z-index, etc.)
class WindowState {
  constructor(windowInstance) {
    this.window = windowInstance;
  }

  updatePosition(pos) {
    const [x, y] = pos;
    this.window.element.style.left = x + 'px';
    this.window.element.style.top = y + 'px';
  }

  updateSize(size) {
    const [w, h] = size;
    
    // Ensure w and h are numbers, not strings or percentages
    const width = typeof w === 'number' ? w : parseInt(w);
    const height = typeof h === 'number' ? h : parseInt(h);
    
    this.window.element.style.width = width + 'px';
    this.window.element.style.height = height + 'px';
  }

  updateZIndex(z) {
    this.window.element.style.zIndex = z;
  }

  updateMinimized(minimized) {
    if (minimized) {
      this.window.element.classList.add('pointer-events-none', 'opacity-0');
    } else {
      this.window.element.classList.remove('pointer-events-none', 'opacity-0');
    }
  }

  updateMaximized(maximized) {
    if (maximized) {
      this.window.element.classList.add('maximized');
      this.window.element.style.top = '40px';
      this.window.element.style.left = '0';
      this.window.element.style.width = '100%';
      this.window.element.style.height = 'calc(100% - 40px)';
      this.window.element.style.borderRadius = '0';
      
      // Ẩn hoàn toàn resize handles khi maximize
      if (this.window.resizeContainer) {
        this.window.resizeContainer.style.display = 'none';
      }
    } else {
      this.window.element.classList.remove('maximized');
      this.window.element.style.borderRadius = '';
      
      // Hiện lại resize handles khi restore
      if (this.window.resizeContainer) {
        this.window.resizeContainer.style.display = '';
      }
    }
  }

  setContent(content) {
    const contentElement = this.window.contentElement;
    contentElement.innerHTML = '';
    
    if (content instanceof HTMLElement) {
      contentElement.appendChild(content);
    } else if (typeof content === 'string') {
      contentElement.innerHTML = content;
    }
  }
}

