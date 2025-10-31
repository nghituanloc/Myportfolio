/**********************************************************************
|| Cloud Web OS – State Management System
**********************************************************************/

// Hệ thống state management đơn giản
class StateManager {
  constructor() {
    this.state = {};
    this.listeners = {};
  }

  // Lấy giá trị state
  getState(key) {
    return this.state[key];
  }

  // Cập nhật state và thông báo cho listeners
  setState(key, value) {
    this.state[key] = value;
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(value));
    }
  }

  // Đăng ký listener cho state changes
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    
    // Trả về hàm unsubscribe
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }
}

// Tạo instance global
const stateManager = new StateManager();

// Hook localStorage đơn giản
function useLocalStorage(key, initialValue) {
  // Lấy giá trị từ localStorage hoặc dùng giá trị mặc định
  let value = initialValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      value = JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
  }

  // Cập nhật state
  stateManager.setState(key, value);

  // Hàm setter
  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      stateManager.setState(key, newValue);
    } catch (e) {
      console.warn('Error writing to localStorage:', e);
    }
  };

  return [value, setValue];
}

// Hàm tiện ích để tạo element với class và attributes
function createElement(tag, className = '', attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  if (className) {
    element.className = className;
  }
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });
  
  return element;
}

// Hàm tiện ích để kết hợp class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Hàm tiện ích để chuyển đổi bytes thành định dạng dễ đọc
function bytesToReadable(n) { 
  if (n < 1024) return n + " B";
  const kb = n / 1024;
  if (kb < 1024) return kb.toFixed(1) + " KB";
  const mb = kb / 1024;
  return mb.toFixed(2) + " MB";
}