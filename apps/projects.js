/**********************************************************************
|| Cloud Web OS – Projects Application
**********************************************************************/

// Ứng dụng Projects (Dự Án)
class AppProjects {
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
    this.element = createElement('div', 'p-6 max-w-5xl mx-auto');
    
    // Title
    const title = createElement('h2', 'text-3xl font-bold mb-8', {}, ['Các Dự Án Đã Thực Hiện']);
    
    // Projects Container
    const projectsContainer = createElement('div', 'space-y-8');
    
    // Project 1
    const project1 = this.createProjectCard(
      'Hệ thống Quản lý Học bổng',
      'Website Quản lý và Xét duyệt Học bổng',
      'Đồ án Tốt nghiệp',
      'Full-Stack Developer (Lên kế hoạch, thiết kế CSDL, phát triển Backend & Frontend)',
      [
        'Phân quyền: Phân quyền cho 2 đối tượng: Sinh viên, Quản trị viên.',
        'Quản lý Nghiệp vụ: Quản lý thông tin học bổng, nhà tài trợ, và hồ sơ sinh viên.',
        'Quy trình Xét duyệt: Cho phép Admin thiết lập tiêu chí, lọc và duyệt hồ sơ hàng loạt theo lớp, khoa, ngành.',
        'Thông báo & Báo cáo: Gửi email thông báo tự động. Thống kê và xuất báo cáo (Excel, PDF).',
        'Quản lý Sự kiện: Đăng tin, hình ảnh các buổi lễ trao học bổng.'
      ],
      'Node.js (Express.js), React, MySQL',
      'https://github.com/nghituanloc'
    );
    
    // Project 2
    const project2 = this.createProjectCard(
      'Tìm hiểu và triển khai hệ thống NAS',
      'Nghiên cứu và Triển khai hệ thống NAS (Network Attached Storage)',
      'Đồ án Cơ sở ngành',
      'Nghiên cứu, Cài đặt, Cấu hình',
      [
        'Cài đặt và cấu hình phần mềm NAS Synology trên máy ảo VMWare Workstation.',
        'Thiết lập các thư mục lưu trữ (Shared Folders).',
        'Cấu hình và phân quyền truy cập chi tiết cho từng người dùng/nhóm người dùng.',
        'Kiểm tra tính năng chia sẻ dữ liệu.'
      ],
      'VMWare Workstation, Synology NAS (Ảo hóa), Mạng TCP/IP',
      null
    );
    
    // Project 3
    const project3 = this.createProjectCard(
      'Website Portfolio Cá nhân',
      'Website Hồ sơ năng lực (Portfolio)',
      'Đồ án Chuyên ngành',
      'Full-Stack Developer',
      [
        'Trang giới thiệu cá nhân, kỹ năng, kinh nghiệm.',
        'Trưng bày danh sách các dự án.',
        'Form liên hệ.'
      ],
      'HTML, CSS, JavaScript, PHP, MySQL',
      'https://github.com/nghituanloc'
    );
    
    projectsContainer.appendChild(project1);
    projectsContainer.appendChild(project2);
    projectsContainer.appendChild(project3);
    
    this.element.appendChild(title);
    this.element.appendChild(projectsContainer);
    this.container.appendChild(this.element);
  }

  createProjectCard(title, subtitle, type, role, features, technologies, githubLink) {
    const card = createElement('div', 'border border-white/10 rounded-xl p-6 bg-black/20 hover:bg-black/30 transition-colors');
    
    // Title and Type
    const titleRow = createElement('div', 'mb-4');
    titleRow.appendChild(createElement('h3', 'text-2xl font-bold mb-1', {}, [title]));
    titleRow.appendChild(createElement('h4', 'text-lg opacity-90 mb-2', {}, [subtitle]));
    
    const typeBadge = createElement('span', 'px-3 py-1 bg-blue-600 rounded-full text-sm', {}, [type]);
    titleRow.appendChild(typeBadge);
    
    // Role
    const roleText = createElement('p', 'mb-4 opacity-80 italic', {}, [`Vai trò: ${role}`]);
    
    // Features
    const featuresTitle = createElement('p', 'font-semibold mb-2', {}, ['Tính năng chính:']);
    const featuresList = createElement('ul', 'space-y-2 mb-4');
    features.forEach(feature => {
      const li = createElement('li', 'opacity-90', {}, [`• ${feature}`]);
      featuresList.appendChild(li);
    });
    
    // Technologies
    const techText = createElement('p', 'text-sm opacity-70', {}, [`Công nghệ: ${technologies}`]);
    
    // GitHub Link
    if (githubLink) {
      const githubBtn = createElement('a', 
        'inline-block mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium',
        { href: githubLink, target: '_blank' },
        ['Xem GitHub']
      );
      techText.appendChild(createElement('br'));
      techText.appendChild(githubBtn);
    }
    
    card.appendChild(titleRow);
    card.appendChild(roleText);
    card.appendChild(featuresTitle);
    card.appendChild(featuresList);
    card.appendChild(techText);
    
    return card;
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

