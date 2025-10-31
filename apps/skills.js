/**********************************************************************
|| Cloud Web OS – Skills Application
**********************************************************************/

// Ứng dụng Skills (Kỹ Năng)
class AppSkills {
  constructor(container, options = {}) {
    this.container = container;
    this.options = options;
    this.element = null;
    
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.element = createElement('div', 'p-6 max-w-4xl mx-auto');
    
    // Title
    const title = createElement('h2', 'text-3xl font-bold mb-6', {}, ['Các Kỹ Năng Nổi Bật']);
    
    // Skills Grid
    const skillsContainer = createElement('div', 'space-y-6');
    
    // Phát triển Web
    const webDevSection = createElement('div');
    webDevSection.appendChild(createElement('h3', 'text-xl font-semibold mb-3', {}, ['Phát triển Web']));
    
    const webDevSkills = createElement('div', 'space-y-2 opacity-90');
    webDevSkills.appendChild(createElement('p', '', {}, ['Backend: Node.js (Express.js), PHP, Laravel']));
    webDevSkills.appendChild(createElement('p', '', {}, ['Frontend: React, HTML5, CSS3, JavaScript (ES6+)']));
    webDevSkills.appendChild(createElement('p', '', {}, ['Database: MySQL']));
    
    webDevSection.appendChild(webDevSkills);
    
    // Hạ tầng & Mạng
    const infraSection = createElement('div');
    infraSection.appendChild(createElement('h3', 'text-xl font-semibold mb-3', {}, ['Hạ tầng & Mạng']));
    
    const infraSkills = createElement('div', 'space-y-2 opacity-90');
    infraSkills.appendChild(createElement('p', '', {}, ['Lắp ráp & Xử lý sự cố PC']));
    infraSkills.appendChild(createElement('p', '', {}, ['Quản trị mạng (LAN, TCP/IP)']));
    infraSkills.appendChild(createElement('p', '', {}, ['Hệ thống NAS (Synology, VMWare)']));
    infraSkills.appendChild(createElement('p', '', {}, ['Ảo hóa (VMWare Workstation)']));
    
    infraSection.appendChild(infraSkills);
    
    // Phần mềm & Kỹ năng khác
    const otherSection = createElement('div');
    otherSection.appendChild(createElement('h3', 'text-xl font-semibold mb-3', {}, ['Phần mềm & Kỹ năng khác']));
    
    const otherSkills = createElement('div', 'space-y-2 opacity-90');
    otherSkills.appendChild(createElement('p', '', {}, ['Hệ điều hành Windows']));
    otherSkills.appendChild(createElement('p', '', {}, ['Microsoft Office (Word, Excel)']));
    otherSkills.appendChild(createElement('p', '', {}, ['Phân tích & Giải quyết vấn đề']));
    otherSkills.appendChild(createElement('p', '', {}, ['Hỗ trợ người dùng (User Support)']));
    
    otherSection.appendChild(otherSkills);
    
    skillsContainer.appendChild(webDevSection);
    skillsContainer.appendChild(infraSection);
    skillsContainer.appendChild(otherSection);
    
    this.element.appendChild(title);
    this.element.appendChild(skillsContainer);
    this.container.appendChild(this.element);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

