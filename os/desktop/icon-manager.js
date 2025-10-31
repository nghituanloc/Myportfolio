/**********************************************************************
|| Cloud Web OS – Desktop Icon Manager
**********************************************************************/

// Quản lý vị trí và rendering icon
class IconManager {
  constructor() {
    this.iconPositions = this.loadIconPositions();
  }

  loadIconPositions() {
    try {
      const stored = localStorage.getItem('os.iconPositions');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.warn('Error loading icon positions:', e);
      return {};
    }
  }

  saveIconPositions(positions) {
    try {
      localStorage.setItem('os.iconPositions', JSON.stringify(positions));
    } catch (e) {
      console.warn('Error saving icon positions:', e);
    }
  }

  getPosition(iconId, index) {
    return this.iconPositions[iconId] || this.getDefaultPosition(index);
  }

  updatePosition(iconId, position) {
    this.iconPositions[iconId] = position;
    this.saveIconPositions(this.iconPositions);
  }

  getDefaultPosition(index) {
    const gap = 28; // Khoảng cách giữa các icon
    const iconWidth = 88;
    const iconHeight = 75;
    
    // Tất cả icons nằm trên cùng 1 hàng ngang
    const x = index * (iconWidth + gap) + 20;
    const y = 40; // Cùng độ cao cho tất cả
    
    return { x, y };
  }

  setIconPosition(element, pos) {
    element.style.left = pos.x + 'px';
    element.style.top = pos.y + 'px';
  }

  createIconElement(icon) {
    const iconElement = createElement('button', 
      classNames(
        'absolute flex flex-col items-center text-white/90 hover:text-white transition-all duration-100'
      )
    );

    const iconEmoji = createElement('div', 'text-4xl select-none', {}, [icon.emoji]);
    const iconLabel = createElement('div', 'text-sm mt-1 select-none', {}, [icon.name]);

    iconElement.appendChild(iconEmoji);
    iconElement.appendChild(iconLabel);

    iconElement.iconId = icon.id;
    iconElement.dataset.iconId = icon.id;

    return iconElement;
  }

  getPositions() {
    return this.iconPositions;
  }
}
