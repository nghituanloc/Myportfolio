/**********************************************************************
|| Cloud Web OS – Desktop Icon Interaction Handler
**********************************************************************/

// Xử lý tương tác kéo thả và click cho icon
class IconInteraction {
  constructor(iconElement, iconId, options = {}) {
    this.iconElement = iconElement;
    this.iconId = iconId;
    this.options = options;
    this.iconManager = options.iconManager;
    
    this.isDragging = false;
    this.hasMoved = false;
    this.startX = 0;
    this.startY = 0;
    this.lastClickTime = 0;
    this.clickCount = 0;
    this.tooltip = null;
    this.tooltipTimeout = null;
    
    this.init();
  }

  init() {
    this.iconElement.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    
    // Thêm tooltip khi hover
    this.iconElement.addEventListener('mouseenter', (e) => this.showTooltip(e));
    this.iconElement.addEventListener('mouseleave', () => this.hideTooltip());
    this.iconElement.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
  }

  showTooltip(e) {
    // Clear timeout nếu có
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    
    // Delay một chút trước khi hiển thị
    this.tooltipTimeout = setTimeout(() => {
      if (!this.tooltip) {
        this.tooltip = createElement('div',
          'fixed pointer-events-none text-sm bg-black/80 text-white px-3 py-1 rounded-lg shadow-lg z-[10000] whitespace-nowrap'
        );
        this.tooltip.textContent = 'Nhấp đúp để mở';
        document.body.appendChild(this.tooltip);
      }
      this.updateTooltipPosition(e);
    }, 300); // Delay 300ms
  }

  updateTooltipPosition(e) {
    if (this.tooltip) {
      this.tooltip.style.left = (e.clientX + 10) + 'px';
      this.tooltip.style.top = (e.clientY - 30) + 'px';
    }
  }

  hideTooltip() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
    
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  handleMouseDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    
    this.isDragging = true;
    this.hasMoved = false;
    
    const currentTime = Date.now();
    
    // Kiểm tra double click
    if (currentTime - this.lastClickTime < 500 && !this.hasMoved) {
      this.clickCount++;
    } else {
      this.clickCount = 1;
    }
    
    this.lastClickTime = currentTime;
    
    const rect = this.iconElement.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    
    // Tạo ghost element
    const ghost = this.iconElement.cloneNode(true);
    ghost.style.position = 'fixed';
    ghost.style.pointerEvents = 'none';
    ghost.style.opacity = '0.6';
    ghost.style.zIndex = '10000';
    ghost.style.cursor = 'grabbing';
    document.body.appendChild(ghost);
    
    this.iconElement.style.opacity = '0.5';
    this.iconElement.style.transform = 'scale(1.1)';
    this.iconElement.style.cursor = 'grabbing';

    let lastMouseX = e.clientX;
    let lastMouseY = e.clientY;

    const handleMouseMove = (e) => {
      if (!this.isDragging) return;
      
      // Tính khoảng cách di chuyển thực tế
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Đánh dấu đã di chuyển nếu chuột di chuyển > 5px
      if (moveDistance > 5) {
        this.hasMoved = true;
      }
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      
      if (this.hasMoved) {
        // Cập nhật ghost position
        ghost.style.left = (e.clientX - this.startX) + 'px';
        ghost.style.top = (e.clientY - this.startY) + 'px';
        
        // Cập nhật icon position
        const iconRect = this.iconElement.parentElement.getBoundingClientRect();
        const newX = e.clientX - iconRect.left - this.startX;
        const newY = e.clientY - iconRect.top - this.startY;
        
        // Snapping to grid
        const gridSize = 20;
        const snappedX = Math.max(0, Math.round(newX / gridSize) * gridSize);
        const snappedY = Math.max(40, Math.round(newY / gridSize) * gridSize);
        
        this.iconElement.style.left = snappedX + 'px';
        this.iconElement.style.top = snappedY + 'px';
      }
    };

    const handleMouseUp = (e) => {
      this.isDragging = false;
      
      // Xóa ghost
      if (ghost.parentNode) {
        ghost.remove();
      }
      
      // Khôi phục style
      this.iconElement.style.opacity = '1';
      this.iconElement.style.transform = 'scale(1)';
      this.iconElement.style.cursor = '';
      
      // Chỉ lưu nếu có di chuyển (drag)
      if (this.hasMoved) {
        const newPos = {
          x: parseInt(this.iconElement.style.left),
          y: parseInt(this.iconElement.style.top)
        };
        
        this.iconManager.updatePosition(this.iconId, newPos);
      } else {
        // Double click để mở ứng dụng
        if (this.clickCount >= 2) {
          this.options.onOpen?.(this.iconId);
          this.clickCount = 0;
        }
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  destroy() {
    this.hideTooltip();
    if (this.tooltip) {
      this.tooltip.remove();
    }
  }
}
