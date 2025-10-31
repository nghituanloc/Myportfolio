/**********************************************************************
|| Cloud Web OS – Window Interaction Handlers
**********************************************************************/

// Xử lý các tương tác với window (controls, drag, resize)
class WindowInteraction {
  constructor(windowInstance) {
    this.window = windowInstance;
    // Không gọi setupEventListeners ở đây vì element chưa được tạo
    // Sẽ được gọi sau khi render
  }

  setupEventListeners() {
    const header = this.window.headerElement;
    const element = this.window.element;

    // Minimize button
    const minimizeButton = header.querySelector('.bg-amber-400');
    if (minimizeButton) {
      minimizeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.window.options.onMinToggle?.();
      });
    }

    // Maximize button
    const maximizeButton = header.querySelector('.bg-green-500');
    if (maximizeButton) {
      maximizeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.window.options.onMaximize?.();
      });
    }

    // Close button
    const closeButton = header.querySelector('.bg-red-500');
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.window.options.onClose?.();
      });
    }

    // Double click header để maximize/restore
    header.addEventListener('dblclick', () => {
      this.window.options.onMaximize?.();
    });

    // Focus window khi click
    element.addEventListener('mousedown', () => {
      this.window.options.onFocus?.();
    });
  }

  setupDragAndResize() {
    // Track if maximized để restore khi drag
    let isMaximized = false;
    
    const checkMaximized = () => {
      return this.window.element.classList.contains('maximized');
    };
    
    // Drag system
    this.window.dragSystem = useDrag(this.window.headerElement, {
      onStart: () => {
        isMaximized = checkMaximized();
        
        if (isMaximized) {
          this.window.options.onMaximize?.();
          this.window.options.onRestore?.();
        }
        
        this.window.options.onFocus?.();
      },
      onDrag: (x, y) => this.window.options.onMove?.(this.window.options.id, { x, y }),
      onEnd: () => {}
    });

    // Resize system
    this.window.resizeSystem = useResize(this.window.element, {
      onResize: (w, h) => this.window.options.onResize?.(this.window.options.id, [w, h])
    });
  }

  updateMaximizeButtonIcon(maximized) {
    const maximizeButton = this.window.element.querySelector('.bg-green-500');
    
    if (maximizeButton) {
      if (maximized) {
        maximizeButton.innerHTML = '⟲';
        maximizeButton.title = 'Khôi phục';
      } else {
        maximizeButton.innerHTML = '□';
        maximizeButton.title = 'Phóng to / Thu nhỏ';
      }
    }
  }
}

