/**********************************************************************
|| Cloud Web OS – TopBar Component
**********************************************************************/

// Component thanh trên cùng
class TopBar {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.element = null;
    this.timeElement = null;
    this.timeInterval = null;
    this.openApps = new Map(); // Track các app đang mở {appId: {button, minimized}}
    
    this.init();
  }

  init() {
    this.render();
    this.startTimeUpdate();
  }

  render() {
    this.element = createElement('div', 
      'fixed top-0 left-0 right-0 h-10 bg-black/40 text-white/90 backdrop-blur flex items-center justify-between px-3 select-none z-[999]'
    );

    // Phần bên trái - Logo
    const leftSection = createElement('div', 'flex items-center gap-2 text-sm');
    leftSection.appendChild(createElement('span', 'font-semibold', {}, ['Nghị Tuấn Lộc']));
    // leftSection.appendChild(createElement('span', 'opacity-70 hidden sm:inline', {}, ['Enhanced']));

    // Phần giữa - Apps đang mở (mặc định rỗng)
    const centerSection = createElement('div', 'hidden md:flex items-center gap-1 flex-1 justify-center max-w-[600px] overflow-x-auto px-2');
    centerSection.id = 'topbar-apps';

    // Phần bên phải - Thông tin người dùng và thời gian
    const rightSection = createElement('div', 'text-xs tabular-nums flex items-center gap-2');
    rightSection.appendChild(createElement('span', 'opacity-80 hidden sm:inline', {}, [this.options.user?.name || "Guest"]));
    
    this.timeElement = createElement('span', '', {}, [this.getFormattedDateTime()]);
    rightSection.appendChild(this.timeElement);

    this.element.appendChild(leftSection);
    this.element.appendChild(centerSection);
    this.element.appendChild(rightSection);

    this.container.appendChild(this.element);
  }

  startTimeUpdate() {
    this.timeInterval = setInterval(() => {
      if (this.timeElement) {
        this.timeElement.textContent = this.getFormattedDateTime();
      }
    }, 1000);
  }

  getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  updateUser(user) {
    this.options.user = user;
    // Cập nhật tên người dùng trong UI
    const userElement = this.element.querySelector('.opacity-80');
    if (userElement) {
      userElement.textContent = user?.name || "Guest";
    }
  }

  updateOpenApps(apps) {
    // Xóa tất cả buttons cũ
    const appsContainer = this.element.querySelector('#topbar-apps');
    if (!appsContainer) return;
    
    appsContainer.innerHTML = '';
    this.openApps.clear();

    // Thêm các app đang mở
    apps.forEach(app => {
      const appDef = APP_DEFS[app.appId];
      if (!appDef) return;

      // Container cho button và close button
      const buttonContainer = createElement('div', 'flex items-center gap-1 group');
      
      const button = createElement('button', 
        classNames(
          'flex items-center gap-1 text-xs px-2 py-1 rounded transition-all',
          app.minimized ? 'opacity-40 hover:opacity-70' : 'opacity-100 hover:bg-white/10'
        ),
        { title: appDef.name }
      );

      button.appendChild(createElement('span', 'text-base', {}, [appDef.emoji]));
      button.appendChild(createElement('span', '', {}, [appDef.name]));
      
      // Preview khi hover
      button.addEventListener('mouseenter', () => {
        if (app.minimized) {
          // Restore tạm thời
          this.options.onPreview?.(app.appId, true);
        }
      });

      button.addEventListener('mouseleave', () => {
        if (app.minimized) {
          // Minimize lại
          this.options.onPreview?.(app.appId, false);
        }
      });

      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.options.onToggleMinimize?.(app.appId);
      });

      // Nút đóng (hiện khi hover, nằm kế bên icon)
      const closeButton = createElement('button',
        'w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 flex-shrink-0',
        { title: 'Đóng app' }
      );
      closeButton.innerHTML = '×';
      
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.options.onClose?.(app.appId);
      });

      buttonContainer.appendChild(button);
      buttonContainer.appendChild(closeButton);

      appsContainer.appendChild(buttonContainer);
      this.openApps.set(app.appId, { button, minimized: app.minimized, isActive: !app.minimized });
    });
  }

  updateActiveApp(activeAppId) {
    // Cập nhật visual state cho các buttons
    this.openApps.forEach((data, appId) => {
      if (!data.button) return;
      
      const isActive = activeAppId === appId && !data.minimized;
      
      if (isActive) {
        data.button.className = 'flex items-center gap-1 text-xs px-2 py-1 rounded opacity-100 transition-all hover:bg-white/10';
        data.button.style.fontWeight = '600';
      } else if (data.minimized) {
        data.button.className = 'flex items-center gap-1 text-xs px-2 py-1 rounded transition-all opacity-40 hover:opacity-70';
        data.button.style.fontWeight = 'normal';
      } else {
        data.button.className = 'flex items-center gap-1 text-xs px-2 py-1 rounded transition-all opacity-100 hover:bg-white/10';
        data.button.style.fontWeight = 'normal';
      }
    });
  }

  destroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    if (this.element) {
      this.element.remove();
    }
  }
}