/**********************************************************************
|| Cloud Web OS – Window Resize System
**********************************************************************/

// Hệ thống thay đổi kích thước cho Vanilla JavaScript
class ResizeSystem {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.isResizing = false;
    this.startX = 0;
    this.startY = 0;
    this.startWidth = 0;
    this.startHeight = 0;
    this.startLeft = 0;
    this.startTop = 0;
    this.edge = "";
    
    this.init();
  }

  init() {
    const handles = this.element.querySelectorAll('[data-resize]');
    handles.forEach(handle => {
      handle.addEventListener('mousedown', (e) => this.start(e, handle.getAttribute('data-resize')));
    });
  }

  start(e, edgeType) {
    if (e.button !== 0) return;
    
    e.stopPropagation();
    e.preventDefault();
    
    this.isResizing = true;
    this.edge = edgeType;
    this.startX = e.clientX;
    this.startY = e.clientY;
    
    // this.element IS the window element (passed from useResize)
    const rect = this.element.getBoundingClientRect();
    
    this.startWidth = rect.width;
    this.startHeight = rect.height;
    this.startLeft = rect.left;
    this.startTop = rect.top;
    
    document.addEventListener('mousemove', this.move.bind(this));
    document.addEventListener('mouseup', this.end.bind(this));
  }

  move(e) {
    if (!this.isResizing) return;
    
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    
    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    let newLeft = this.startLeft;
    let newTop = this.startTop;
    
    // Handle all 8 directions
    if (this.edge === 'e') {
      // Right edge
      newWidth = this.startWidth + deltaX;
    } else if (this.edge === 'w') {
      // Left edge
      newWidth = this.startWidth - deltaX;
      newLeft = this.startLeft + deltaX;
    } else if (this.edge === 's') {
      // Bottom edge
      newHeight = this.startHeight + deltaY;
    } else if (this.edge === 'n') {
      // Top edge
      newHeight = this.startHeight - deltaY;
      newTop = this.startTop + deltaY;
    } else if (this.edge === 'se') {
      // Bottom-right corner
      newWidth = this.startWidth + deltaX;
      newHeight = this.startHeight + deltaY;
    } else if (this.edge === 'sw') {
      // Bottom-left corner
      newWidth = this.startWidth - deltaX;
      newHeight = this.startHeight + deltaY;
      newLeft = this.startLeft + deltaX;
    } else if (this.edge === 'ne') {
      // Top-right corner
      newWidth = this.startWidth + deltaX;
      newHeight = this.startHeight - deltaY;
      newTop = this.startTop + deltaY;
    } else if (this.edge === 'nw') {
      // Top-left corner
      newWidth = this.startWidth - deltaX;
      newHeight = this.startHeight - deltaY;
      newLeft = this.startLeft + deltaX;
      newTop = this.startTop + deltaY;
    }
    
    // Minimum size constraints
    newWidth = Math.max(320, newWidth);
    newHeight = Math.max(220, newHeight);
    
    // Update position for top or left resize
    if (this.edge.includes('n')) {
      this.element.style.top = newTop + 'px';
    }
    if (this.edge.includes('w')) {
      this.element.style.left = newLeft + 'px';
    }
    
    this.options.onResize?.(newWidth, newHeight, this.edge);
  }

  end() {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.move.bind(this));
    document.removeEventListener('mouseup', this.end.bind(this));
  }

  destroy() {
    const handles = this.element.querySelectorAll('[data-resize]');
    handles.forEach(handle => {
      handle.removeEventListener('mousedown', this.start.bind(this));
    });
    document.removeEventListener('mousemove', this.move.bind(this));
    document.removeEventListener('mouseup', this.end.bind(this));
  }
}

