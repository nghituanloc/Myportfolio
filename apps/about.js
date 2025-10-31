/**********************************************************************
|| Cloud Web OS – About Application
**********************************************************************/

// Ứng dụng About (Giới Thiệu)
class AppAbout {
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
    const title = createElement('h2', 'text-3xl font-bold mb-6', {}, ['Về Tôi']);
    
    // Content
    const content = createElement('div', 'space-y-4 text-base leading-relaxed opacity-90');
    
    const paragraphs = [
      'Tôi tên là Nghị Tuấn Lộc, vừa hoàn thành chương trình Kỹ sư Công nghệ Thông tin tại Đại học Trà Vinh. Quá trình học tại trường đã giúp tôi xây dựng được nền tảng kiến thức cơ bản về cả phần cứng, mạng máy tính và lập trình phần mềm.',
      'Tôi cũng đã có cơ hội vận dụng kiến thức vào thực tế qua việc tìm hiểu lắp ráp, chẩn đoán sự cố máy tính và làm quen với quản trị mạng cơ bản. Đặc biệt, quá trình thực hiện đồ án triển khai hệ thống lưu trữ mạng (NAS) đã giúp tôi hiểu rõ hơn về tầm quan trọng của việc quản lý và bảo mật dữ liệu tập trung.',
      'Trong các mảng đã học, tôi có niềm yêu thích đặc biệt với lập trình web. Tôi đã từng bước xây dựng một số dự án web full-stack (sử dụng các công nghệ như Node.js, React, Laravel và MySQL), từ các website cá nhân đơn giản đến hệ thống quản lý nghiệp vụ phục vụ cho đồ án tốt nghiệp.',
      'Là một sinh viên mới ra trường, tôi ý thức mình còn nhiều điều phải học. Tôi mang đến tinh thần trách nhiệm, khả năng tự học và mong muốn được làm việc trong một môi trường chuyên nghiệp, nơi tôi có thể áp dụng những gì đã học và đóng góp vào sự phát triển chung của tổ chức.'
    ];
    
    paragraphs.forEach(para => {
      const p = createElement('p', 'mb-4', {}, [para]);
      content.appendChild(p);
    });
    
    this.element.appendChild(title);
    this.element.appendChild(content);
    this.container.appendChild(this.element);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

