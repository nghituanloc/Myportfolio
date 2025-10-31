/**********************************************************************
|| Cloud Web OS – Contact Application
**********************************************************************/

// Ứng dụng Contact (Liên Hệ)
class AppContact {
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
    this.element = createElement('div', 'p-4', { style: 'width:680px;height:520px;overflow:auto;' });
    
    // Title
    // const title = createElement('h2', 'text-3xl font-bold mb-6', {}, ['Liên Hệ Với Tôi']);
    
    // // Introduction
    // const intro = createElement('p', 'mb-8 opacity-90 leading-relaxed', {}, [
    //   'Tôi luôn sẵn sàng cho các cơ hội công việc và hợp tác. Vui lòng liên hệ với tôi qua các thông tin dưới đây.'
    // ]);
    
    // Contact Info Card
    const contactCard = createElement('div', 'mt-4 border border-white/10 rounded-xl p-4 bg-black/20');
    const contactHeading = createElement('h3', 'text-xl font-semibold mb-4', {}, ['Thông tin liên hệ']);
    contactCard.appendChild(contactHeading);
    
    // Email
    const emailRow = createElement('div');
    emailRow.appendChild(createElement('strong', 'mr-2', {}, ['Email:']));
    emailRow.appendChild(createElement('span', '', {}, ['nghituanloc@gmail.com']));
    contactCard.appendChild(emailRow);
    
    // Phone
    const phoneRow = createElement('div');
    phoneRow.appendChild(createElement('strong', 'mr-2', {}, ['Số điện thoại:']));
    phoneRow.appendChild(createElement('span', '', {}, ['0326209859']));
    contactCard.appendChild(phoneRow);
    
    // Address
    const addressRow = createElement('div');
    addressRow.appendChild(createElement('strong', 'mr-2', {}, ['Địa chỉ:']));
    addressRow.appendChild(createElement('span', '', {}, ['Vĩnh Long, Việt Nam']));
    contactCard.appendChild(addressRow);
    
    // GitHub Link
    const githubRow = createElement('div', 'mt-6');
    const githubLabel = createElement('strong', 'block mb-2', {}, ['Mạng xã hội:']);
    const socials = createElement('div', 'flex items-center gap-3');
    const ghBtn = createElement('a', 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20', { href: 'https://github.com/nghituanloc', target: '_blank', title: 'GitHub' });
    ghBtn.appendChild(createElement('img', 'w-5 h-5', { src: 'https://cdn.simpleicons.org/github/FFFFFF', alt: 'GitHub' }));
    const fbBtn = createElement('a', 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20', { href: 'https://facebook.com/', target: '_blank', title: 'Facebook' });
    fbBtn.appendChild(createElement('img', 'w-5 h-5', { src: 'https://cdn.simpleicons.org/facebook/FFFFFF', alt: 'Facebook' }));
    const ytBtn = createElement('a', 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20', { href: 'https://www.youtube.com/', target: '_blank', title: 'YouTube' });
    ytBtn.appendChild(createElement('img', 'w-5 h-5', { src: 'https://cdn.simpleicons.org/youtube/FFFFFF', alt: 'YouTube' }));
    const zlBtn = createElement('a', 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20', { href: 'https://zalo.me/@tuan_loc', target: '_blank', title: 'Zalo' });
    zlBtn.appendChild(createElement('img', 'w-5 h-5', { src: 'https://cdn.simpleicons.org/zalo/FFFFFF', alt: 'Zalo' }));
    socials.appendChild(ghBtn);
    socials.appendChild(fbBtn);
    socials.appendChild(ytBtn);
    socials.appendChild(zlBtn);

    githubRow.appendChild(githubLabel);
    githubRow.appendChild(socials);
    contactCard.appendChild(githubRow);
    
    // Contact Form (Formspree)
    const formCard = createElement('div', 'mt-4 border border-white/10 rounded-xl p-4 bg-black/20');
    const formHeading = createElement('h3', 'text-xl font-semibold mb-4', {}, ['Để lại tin nhắn cho tôi']);
    formCard.appendChild(formHeading);
    const form = createElement('form', 'space-y-4', {
      action: 'https://formspree.io/f/movpkzjk',
      method: 'POST'
    });
    
    // Email
    const emailField = createElement('div', 'space-y-2');
    emailField.appendChild(createElement('label', 'block text-sm font-medium opacity-80', { for: 'contact-email' }, ['Email']));
    emailField.appendChild(createElement('input', 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20', {
      type: 'email', id: 'contact-email', name: 'email', required: true, placeholder: 'Hãy để lại email của bạn ở đây'
    }));
    form.appendChild(emailField);
    
    // (Bỏ trường Tiêu đề theo yêu cầu)
    
    // Nội dung
    const messageField = createElement('div', 'space-y-2');
    messageField.appendChild(createElement('label', 'block text-sm font-medium opacity-80', { for: 'contact-message' }, ['Nội dung']));
    const messageTextarea = createElement('textarea', 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20', {
      id: 'contact-message', name: 'message', rows: 4, required: true, placeholder: 'Viết nội dung ở đây nhé...'
    });
    messageField.appendChild(messageTextarea);
    form.appendChild(messageField);
    
    // Nút gửi với đổi màu theo trạng thái hợp lệ
    const submitBtn = createElement('button', 'w-full px-3 py-2 rounded-lg font-medium text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20', { type: 'submit' }, ['Gửi']);
    form.appendChild(submitBtn);
    formCard.appendChild(form);
    
    // Tham chiếu input để kiểm tra hợp lệ
    const emailInput = emailField.querySelector ? emailField.querySelector('input') : null;
    
    const isValidEmail = (value) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(value || '').toLowerCase());
    };
    
    const updateSubmitStyles = () => {
      const emailOk = isValidEmail(emailInput ? emailInput.value : '');
      const messageOk = (messageTextarea && messageTextarea.value.trim().length > 0);
      const valid = emailOk && messageOk;
      if (valid) {
        submitBtn.className = 'w-full px-4 py-3 rounded-lg font-medium transition-colors bg-green-600/80 hover:bg-green-600';
      } else {
        submitBtn.className = 'w-full px-4 py-3 rounded-lg font-medium transition-colors bg-red-600/80 hover:bg-red-600';
      }
    };
    
    // Sự kiện cập nhật theo thời gian thực
    if (emailInput && emailInput.addEventListener) {
      emailInput.addEventListener('input', updateSubmitStyles);
      emailInput.addEventListener('blur', updateSubmitStyles);
    }
    if (messageTextarea && messageTextarea.addEventListener) {
      messageTextarea.addEventListener('input', updateSubmitStyles);
      messageTextarea.addEventListener('blur', updateSubmitStyles);
    }
    
    // Khởi tạo trạng thái ban đầu
    updateSubmitStyles();
    
    // Xử lý submit form bằng JavaScript để tránh chuyển hướng
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Kiểm tra validation
      const emailValue = emailInput ? emailInput.value : '';
      const messageValue = messageTextarea ? messageTextarea.value.trim() : '';
      
      if (!isValidEmail(emailValue) || messageValue.length === 0) {
        if (typeof notify !== 'undefined') {
          notify('Vui lòng điền đầy đủ thông tin hợp lệ');
        }
        return;
      }
      
      // Vô hiệu hóa nút gửi trong lúc xử lý
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang gửi...';
      
      try {
        // Gửi form đến Formspree bằng fetch
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Thành công - hiển thị thông báo
          if (typeof notify !== 'undefined') {
            notify('Tin nhắn đã được gửi thành công! Cảm ơn bạn đã liên hệ.');
          }
          // Reset form
          form.reset();
          updateSubmitStyles();
        } else {
          // Lỗi từ server
          try {
            const data = await response.json();
            if (data.error && typeof notify !== 'undefined') {
              notify('Có lỗi xảy ra: ' + (data.error || 'Vui lòng thử lại sau'));
            } else if (typeof notify !== 'undefined') {
              notify('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
            }
          } catch (parseError) {
            if (typeof notify !== 'undefined') {
              notify('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
            }
          }
        }
      } catch (error) {
        // Lỗi mạng hoặc lỗi khác
        if (typeof notify !== 'undefined') {
          notify('Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet và thử lại.');
        }
      } finally {
        // Khôi phục nút gửi
        submitBtn.disabled = false;
        submitBtn.textContent = 'Gửi';
      }
    });
    
    // this.element.appendChild(title);
    // this.element.appendChild(intro);
    this.element.appendChild(formCard);
    this.element.appendChild(contactCard);
    this.container.appendChild(this.element);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

