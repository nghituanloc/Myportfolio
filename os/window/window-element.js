/**********************************************************************
|| Cloud Web OS – Window Element Rendering
**********************************************************************/

// Màu sắc cho header mỗi app
const APP_HEADER_COLORS = {
  about: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4))',
  skills: 'linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(14, 165, 233, 0.4))',
  projects: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4))',
  education: 'linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(239, 68, 68, 0.4))',
  contact: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(251, 146, 60, 0.4))',
  settings: 'linear-gradient(135deg, rgba(107, 114, 128, 0.4), rgba(156, 163, 175, 0.4))',
  viewer: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4), rgba(59, 130, 246, 0.4))',
};

// Quản lý việc tạo và render window element
class WindowElement {
  constructor(options = {}) {
    this.options = options;
    this.element = null;
    this.headerElement = null;
    this.contentElement = null;
    this.resizeContainer = null;
  }

  render() {
    const { id, title, z, pos, size, minimized } = this.options;
    const [w, h] = size || [520, 380];
    const [x, y] = pos || [120, 120];

    // Tạo main window element
    const opacity = getComputedStyle(document.documentElement).getPropertyValue('--window-opacity') || '0.70';
    const isDark = document.body.style.backgroundColor === 'rgb(0, 0, 0)' || !document.body.style.backgroundColor || document.body.style.backgroundColor === '';
    
    this.element = createElement('div', 
      classNames(
        'fixed shadow-xl rounded-xl overflow-hidden border backdrop-blur',
        minimized ? 'pointer-events-none opacity-0' : '',
        isDark ? 'border-white/10 text-white' : 'border-black/20 text-black'
      ),
      {
        'data-window': 'true',
        style: {
          zIndex: z,
          width: w + 'px',
          height: h + 'px',
          left: x + 'px',
          top: y + 'px',
          backgroundColor: isDark ? `rgba(24, 24, 27, ${opacity})` : `rgba(255, 255, 255, ${opacity})`
        }
      }
    );

    // Render header
    this.headerElement = this.renderHeader(title);
    this.element.appendChild(this.headerElement);

    // Render content area
    this.contentElement = this.renderContent();
    this.element.appendChild(this.contentElement);

    // Render resize handles
    this.resizeContainer = this.renderResizeHandles();
    this.element.appendChild(this.resizeContainer);

    return this.element;
  }

  renderHeader(title) {
    const headerColor = APP_HEADER_COLORS[this.options.appId] || 'bg-white/10';
    const header = createElement('div', 
      'cursor-move h-10 flex items-center justify-between px-3 select-none relative z-10'
    );
    
    // Áp dụng màu cho header
    if (headerColor.includes('gradient')) {
      header.style.background = headerColor;
    } else {
      header.className += ' ' + headerColor;
    }

    const titleElement = createElement('div', 'font-medium text-sm truncate pr-4', {}, [title]);
    const controlsContainer = this.renderControls();
    
    header.appendChild(titleElement);
    header.appendChild(controlsContainer);

    return header;
  }

  renderControls() {
    const controlsContainer = createElement('div', 'flex items-center gap-2 relative z-20');
    
    const minimizeButton = createElement('button', 
      'w-3 h-3 rounded-full bg-amber-400 hover:brightness-110 flex items-center justify-center relative z-20',
      { title: 'Thu nhỏ' }
    );
    minimizeButton.innerHTML = '-';
    
    const maximizeButton = createElement('button', 
      'w-3 h-3 rounded-full bg-green-500 hover:brightness-110 flex items-center justify-center relative z-20',
      { title: 'Phóng to / Thu nhỏ' }
    );
    maximizeButton.innerHTML = '□';
    
    const closeButton = createElement('button', 
      'w-3 h-3 rounded-full bg-red-500 hover:brightness-110 flex items-center justify-center text-white relative z-20',
      { title: 'Đóng' }
    );
    closeButton.innerHTML = 'x';

    controlsContainer.appendChild(minimizeButton);
    controlsContainer.appendChild(maximizeButton);
    controlsContainer.appendChild(closeButton);

    return controlsContainer;
  }

  renderContent() {
    return createElement('div', 'p-3 h-[calc(100%-2.5rem)] overflow-auto relative');
  }

  renderResizeHandles() {
    const resizeContainer = createElement('div', 'absolute inset-0 pointer-events-none');
    
    // 4 edges - Bỏ phần trên ra khỏi top edge (40px = 10rem cho header)
    resizeContainer.appendChild(createElement('div', 'absolute top-10 left-2 right-2 h-2 cursor-ns-resize pointer-events-auto', { 'data-resize': 'n' }));
    resizeContainer.appendChild(createElement('div', 'absolute right-2 top-10 bottom-2 w-2 cursor-ew-resize pointer-events-auto', { 'data-resize': 'e' }));
    resizeContainer.appendChild(createElement('div', 'absolute bottom-0 left-2 right-2 h-2 cursor-ns-resize pointer-events-auto', { 'data-resize': 's' }));
    resizeContainer.appendChild(createElement('div', 'absolute left-2 top-10 bottom-2 w-2 cursor-ew-resize pointer-events-auto', { 'data-resize': 'w' }));
    
    // 4 corners - Bỏ phần trên ra, tránh góc trên phải nơi có nút X (right-2 thay vì right-0)
    resizeContainer.appendChild(createElement('div', 'absolute top-10 left-0 w-3 h-3 cursor-nwse-resize pointer-events-auto', { 'data-resize': 'nw' }));
    resizeContainer.appendChild(createElement('div', 'absolute top-10 right-2 w-3 h-3 cursor-nesw-resize pointer-events-auto', { 'data-resize': 'ne' }));
    resizeContainer.appendChild(createElement('div', 'absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize pointer-events-auto', { 'data-resize': 'se' }));
    resizeContainer.appendChild(createElement('div', 'absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize pointer-events-auto', { 'data-resize': 'sw' }));

    return resizeContainer;
  }

  getElement() {
    return this.element;
  }

  getHeaderElement() {
    return this.headerElement;
  }

  getContentElement() {
    return this.contentElement;
  }

  getResizeContainer() {
    return this.resizeContainer;
  }
}

