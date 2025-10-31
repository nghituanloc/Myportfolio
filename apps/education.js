/**********************************************************************
|| Cloud Web OS – Education Application
**********************************************************************/

// Ứng dụng Education (Học Vấn)
class AppEducation {
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
    this.element = createElement('div', 'p-6 max-w-3xl mx-auto');
    
    // Title
    const title = createElement('h2', 'text-3xl font-bold mb-8', {}, ['Học Vấn']);
    
    // Education Card
    const eduCard = createElement('div', 'border border-white/10 rounded-xl p-6 bg-black/20');
    
    // Tên trường
    const schoolName = createElement('h3', 'text-2xl font-bold mb-2', {}, ['Đại học Trà Vinh']);
    
    // Chuyên ngành
    const major = createElement('p', 'text-lg opacity-90 mb-3', {}, ['Chuyên ngành: Công nghệ Thông tin']);
    
    // Niên khóa
    const years = createElement('p', 'opacity-80 mb-2', {}, ['Niên khóa: 2021 - 2025']);
    
    // GPA
    const gpa = createElement('p', 'opacity-80 mb-2', {}, ['GPA: 2.85/4.0']);
    
    // Ngoại ngữ
    const language = createElement('p', 'opacity-80', {}, ['Ngoại ngữ: Tiếng Anh (Đọc hiểu tài liệu kỹ thuật chuyên ngành)']);
    
    eduCard.appendChild(schoolName);
    eduCard.appendChild(major);
    eduCard.appendChild(years);
    eduCard.appendChild(gpa);
    eduCard.appendChild(language);
    
    this.element.appendChild(title);
    this.element.appendChild(eduCard);
    this.container.appendChild(this.element);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

