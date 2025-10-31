/**********************************************************************
|| Cloud Web OS – Window Core Component
**********************************************************************/

// Component cửa sổ chính - kết hợp các module
class Window {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.element = null;
    this.headerElement = null;
    this.contentElement = null;
    this.dragSystem = null;
    this.resizeSystem = null;
    
    // Tạo các manager modules
    this.elementManager = new WindowElement(options);
    this.stateManager = new WindowState(this);
    this.interactionManager = null; 
    
    this.init();
  }

  init() {
    this.render();
    this.setupInteractions();
  }

  render() {
    // Render window element
    this.element = this.elementManager.render();
    this.headerElement = this.elementManager.getHeaderElement();
    this.contentElement = this.elementManager.getContentElement();
    this.resizeContainer = this.elementManager.getResizeContainer();
    
    // Append to container
    this.container.appendChild(this.element);
  }

  setupInteractions() {
    // Tạo interaction manager sau khi có element
    this.interactionManager = new WindowInteraction(this);
    
    // Setup event listeners
    this.interactionManager.setupEventListeners();
    // Setup drag and resize
    this.interactionManager.setupDragAndResize();
  }

  // Delegate methods to state manager
  updatePosition(pos) {
    this.stateManager.updatePosition(pos);
  }

  updateSize(size) {
    this.stateManager.updateSize(size);
  }

  updateZIndex(z) {
    this.stateManager.updateZIndex(z);
  }

  updateMinimized(minimized) {
    this.stateManager.updateMinimized(minimized);
  }

  updateMaximized(maximized) {
    this.stateManager.updateMaximized(maximized);
    this.interactionManager.updateMaximizeButtonIcon(maximized);
  }

  setContent(content) {
    this.stateManager.setContent(content);
  }

  destroy() {
    if (this.dragSystem) {
      this.dragSystem.destroy();
    }
    if (this.resizeSystem) {
      this.resizeSystem.destroy();
    }
    if (this.element) {
      this.element.remove();
    }
  }
}

