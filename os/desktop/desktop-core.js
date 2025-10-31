/**********************************************************************
|| Cloud Web OS – Desktop Component
**********************************************************************/

// Component desktop chính
class Desktop {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.element = null;
    this.iconsContainer = null;
    this.iconManager = new IconManager();
    this.interactions = [];
    this.icons = [APP_DEFS.about, APP_DEFS.skills, APP_DEFS.projects, APP_DEFS.education, APP_DEFS.contact, APP_DEFS.settings];
    
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.element = createElement('div', 'pt-10 w-full h-full relative select-none');
    this.element.style.zIndex = '1';
    
    // Container cho icons với layout tự do (absolute positioning)
    this.iconsContainer = createElement('div', 'absolute inset-0');
    
    this.icons.forEach((icon, index) => {
      this.renderIcon(icon, index);
    });

    this.element.appendChild(this.iconsContainer);
    this.container.appendChild(this.element);
  }

  renderIcon(icon, index) {
    // Tạo icon element
    const iconElement = this.iconManager.createIconElement(icon);

    // Thiết lập vị trí
    const pos = this.iconManager.getPosition(icon.id, index);
    this.iconManager.setIconPosition(iconElement, pos);

    // Setup interaction handlers
    const interaction = new IconInteraction(iconElement, icon.id, {
      iconManager: this.iconManager,
      onOpen: (iconId) => this.options.onOpen?.(iconId)
    });
    this.interactions.push(interaction);

    this.iconsContainer.appendChild(iconElement);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
    this.interactions.forEach(interaction => interaction.destroy());
  }
}
