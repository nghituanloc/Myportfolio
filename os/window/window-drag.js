/**********************************************************************
|| Cloud Web OS – Window Drag System
**********************************************************************/

// Hệ thống kéo thả cho Vanilla JavaScript
class DragSystem {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.init();
  }

  init() {
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
  }

  handleMouseDown(e) {
    if (e.button !== 0) return;
    
    // Không cho drag nếu click vào controls (buttons)
    if (e.target.closest('button')) {
      return;
    }
    
    // Không cho drag nếu click vào header controls
    if (e.target.closest('.bg-red-500, .bg-green-500, .bg-amber-400')) {
      return;
    }
    
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    
    const rect = this.element.parentElement.getBoundingClientRect();
    this.offsetX = rect.left;
    this.offsetY = rect.top;
    
    this.options.onStart?.();
    
    e.preventDefault();
    
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseMove(e) {
    if (!this.isDragging) return;
    
    const newX = this.offsetX + (e.clientX - this.startX);
    const newY = this.offsetY + (e.clientY - this.startY);
    
    this.options.onDrag?.(newX, newY);
  }

  handleMouseUp() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.options.onEnd?.();
    
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  destroy() {
    this.element.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }
}

