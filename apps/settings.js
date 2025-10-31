/**********************************************************************
|| Cloud Web OS – Settings Application
**********************************************************************/

// Ứng dụng Settings
class AppSettings {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.element = null;
    this.tempWallpaper = null;
    this.tempTheme = null;
    this.tempUserName = null;
    this.tempFontSize = null;
    this.tempAccentColor = null;
    this.tempWindowOpacity = null;
    this.tempBlurEffect = null;
    
    this.init();
  }

  init() {
    // Khởi tạo temp values với giá trị hiện tại
    this.tempWallpaper = this.options.wallpaper;
    this.tempTheme = this.options.theme;
    this.tempUserName = this.options.user?.name || '';
    this.tempFontSize = this.options.fontSize || 'medium';
    this.tempAccentColor = this.options.accentColor || '#3b82f6';
    this.tempWindowOpacity = this.options.windowOpacity !== undefined ? this.options.windowOpacity : 70;
    this.tempBlurEffect = this.options.blurEffect !== undefined ? this.options.blurEffect : true;
    
    this.render();
  }

  // Tải và áp dụng lớp nền động (không ảnh hưởng file khác)
  applyBackground(index) {
    if (window.CloudOSBackground && typeof window.CloudOSBackground.apply === 'function') {
      window.CloudOSBackground.apply(index);
    }
  }

  render() {
    this.element = createElement('div', 'space-y-6');

    // Section Giao diện
    const interfaceSection = createElement('section');
    interfaceSection.appendChild(createElement('div', 'text-sm mb-2', {}, ['Màu nền']));

    // Hiển thị đúng 4 lựa chọn nền hệ thống
    const wallpapersGrid = createElement('div', 'grid grid-cols-2 md:grid-cols-4 gap-3 mb-4');
    const labels = ['Nền 1', 'Nền 2', 'Nền 3', 'Nền 4'];
    const previews = [
      // Demo nền 1 (các bóng chuyển động) – dùng gradient đại diện
      'linear-gradient(135deg, #4CB8B6 0%, #006D5B 50%, #FF6F61 100%)',
      // Demo nền 2 (conic gradient)
      'conic-gradient(from 45deg, #3B8183, #FAD089, #3B8183)',
      // Demo nền 3 (blob svg trên nền vàng)
      '#fee440',
      // Demo nền 4 (wave gradient)
      'linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%)'
    ];
    for (let i = 0; i < 4; i++) {
      const buttonContainer = createElement('div', 'relative');
      const button = createElement('button', 
        'w-full h-16 rounded-xl border border-white/10 transition-transform hover:scale-105 overflow-hidden',
        { style: { background: previews[i], backgroundSize: 'cover', backgroundPosition: 'center' } }
      );
      const label = createElement('div', 'absolute bottom-1 left-1 bg-black/40 text-white text-[10px] px-1 py-[2px] rounded', {}, [labels[i]]);
      button.appendChild(label);
      button.addEventListener('click', () => {
        this.tempWallpaper = i;
        this.options.setWallpaper?.(i); // Áp dụng vào state/background mặc định
        this.applyBackground(i);        // Thêm lớp nền động cho desktop
      });
      buttonContainer.appendChild(button);
      wallpapersGrid.appendChild(buttonContainer);
    }
    interfaceSection.appendChild(wallpapersGrid);

    // Theme selector
    const themeContainer = createElement('div', 'mt-3 flex items-center gap-3');
    themeContainer.appendChild(createElement('label', 'text-sm', {}, ['Chủ đề']));
    
    const themeRadios = createElement('div', 'flex items-center gap-4');
    [
      { value: 'dark', label: 'Tối' },
      { value: 'light', label: 'Sáng' }
    ].forEach(opt => {
      const id = `theme-${opt.value}`;
      const input = createElement('input', '', { type: 'radio', name: 'theme', value: opt.value, id });
      input.checked = (this.options.theme || 'dark') === opt.value;
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.tempTheme = opt.value;
          this.options.setTheme?.(opt.value); // Áp dụng ngay lập tức
        }
      });
      const label = createElement('label', 'text-sm cursor-pointer', { htmlFor: id }, [opt.label]);
      themeRadios.appendChild(input);
      themeRadios.appendChild(label);
    });
    themeContainer.appendChild(themeRadios);
    interfaceSection.appendChild(themeContainer);

    // Section Hồ sơ
    const profileSection = createElement('section');
    profileSection.appendChild(createElement('div', 'text-sm mb-2', {}, ['Hồ sơ']));

    const profileContainer = createElement('div', 'flex items-center gap-2');
    
    const nameInput = createElement('input', 
      'bg-zinc-950/60 border border-white/10 rounded px-2 py-1',
      { placeholder: 'Tên của bạn' }
    );
    nameInput.value = this.options.user?.name || '';
    nameInput.addEventListener('input', (e) => {
      this.tempUserName = e.target.value;
      // Áp dụng ngay lập tức
      this.options.setUser?.(u => ({...u, name: e.target.value}));
    });
    
    profileContainer.appendChild(nameInput);
    profileContainer.appendChild(createElement('span', 'text-xs opacity-70', {}, ['']))
    
    profileSection.appendChild(profileContainer);

    // Section Cài đặt nâng cao
    const advancedSection = createElement('section');

    // Font size
    const fontSizeContainer = createElement('div', 'mt-3 flex items-center gap-3');
    fontSizeContainer.appendChild(createElement('label', 'text-sm', {}, ['Kích thước chữ']));
    
    const fontSizeRadios = createElement('div', 'flex items-center gap-4');
    const sizeOptions = ['small', 'medium', 'large'];
    const labelMap = { small: 'Nhỏ', medium: 'Vừa', large: 'Lớn' };
    sizeOptions.forEach(size => {
      const id = `font-${size}`;
      const input = createElement('input', '', { type: 'radio', name: 'font-size', value: size, id });
      input.checked = (this.tempFontSize || 'medium') === size;
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.tempFontSize = size;
          this.options.setFontSize?.(size); // Áp dụng ngay lập tức
        }
      });
      const label = createElement('label', 'text-sm cursor-pointer', { htmlFor: id }, [labelMap[size] || size]);
      fontSizeRadios.appendChild(input);
      fontSizeRadios.appendChild(label);
    });
    
    fontSizeContainer.appendChild(fontSizeRadios);
    advancedSection.appendChild(fontSizeContainer);

    // Accent color (đã ẩn theo yêu cầu)

    // Window opacity
    const opacityContainer = createElement('div', 'mt-3 flex flex-col gap-2');
    opacityContainer.appendChild(createElement('label', 'text-sm', {}, [`Độ trong suốt cửa sổ: ${this.tempWindowOpacity}%`]));
    
    const opacitySlider = createElement('input', 
      'w-full h-2 bg-zinc-950/60 rounded-lg appearance-none cursor-pointer',
      { 
        type: 'range',
        min: '10',
        max: '100',
        value: this.tempWindowOpacity
      }
    );
    opacitySlider.addEventListener('input', (e) => {
      this.tempWindowOpacity = parseInt(e.target.value);
      opacityContainer.querySelector('.text-sm').textContent = `Độ trong suốt cửa sổ: ${this.tempWindowOpacity}%`;
      this.options.setWindowOpacity?.(this.tempWindowOpacity); // Áp dụng ngay lập tức
    });
    
    opacityContainer.appendChild(opacitySlider);
    advancedSection.appendChild(opacityContainer);

    // Blur effect
    const blurContainer = createElement('div', 'mt-3 flex items-center gap-3');
    const blurCheckbox = createElement('input', 
      'w-4 h-4 accent-blue-600',
      { type: 'checkbox' }
    );
    blurCheckbox.checked = this.tempBlurEffect;
    blurCheckbox.addEventListener('change', (e) => {
      this.tempBlurEffect = e.target.checked;
    });
    
    // blurContainer.appendChild(blurCheckbox);
    // blurContainer.appendChild(createElement('label', 'text-sm', {}, ['Hiệu ứng mờ nền (Blur)']))
    advancedSection.appendChild(blurContainer);

    this.element.appendChild(interfaceSection);
    this.element.appendChild(profileSection);
    this.element.appendChild(advancedSection);
    this.container.appendChild(this.element);
  }


  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}