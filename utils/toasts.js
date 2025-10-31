/**********************************************************************
|| Cloud Web OS – Toast Notification System
**********************************************************************/

// Hệ thống thông báo toast cho Vanilla JavaScript
class ToastSystem {
  constructor() {
    this.toasts = [];
    this.container = null;
    this.init();
  }

  init() {
    // Tạo container cho toasts
    this.container = document.createElement('div');
    this.container.className = 'fixed top-12 right-4 space-y-2 z-[1000]';
    document.body.appendChild(this.container);
  }

  // Hiển thị thông báo
  notify(message) {
    const id = Date.now();
    const toast = document.createElement('div');
    toast.className = 'px-3 py-2 rounded bg-black/70 text-white shadow border border-white/10 text-sm';
    toast.setAttribute('data-toast-id', id);
    toast.textContent = message;
    
    this.container.appendChild(toast);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
      this.removeToast(id);
    }, 3000);
    
    return id;
  }

  // Xóa toast
  removeToast(id) {
    const toast = this.container.querySelector(`[data-toast-id="${id}"]`);
    if (toast) {
      toast.remove();
    }
  }

  // Xóa tất cả toasts
  clear() {
    this.container.innerHTML = '';
  }

  // Hủy hệ thống
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}

// Tạo instance global
const toastSystem = new ToastSystem();

// Hàm tiện ích để hiển thị thông báo
function notify(message) {
  return toastSystem.notify(message);
}