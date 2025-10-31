## Cấu trúc dự án

```
├── index.html                    # File HTML chính
├── main.js                       # Ứng dụng chính và khởi tạo OS
├── constants/
│   └── constants.js              # Các hằng số, cấu hình và định nghĩa ứng dụng
├── utils/
│   ├── core.js                  # Các hàm tiện ích cơ bản (createElement, etc.)
│   ├── interaction.js           # Hooks kéo thả và thay đổi kích thước
│   ├── toasts.js                # Hệ thống thông báo
│   └── welcome.js               # Thông báo chào mừng
├── os/
│   ├── os-state.js              # Quản lý state hệ điều hành (theme, user, wallpaper, settings)
│   ├── window-manager.js        # Quản lý tất cả cửa sổ ứng dụng
│   ├── app-factory.js           # Factory tạo nội dung cho các ứng dụng
│   ├── topbar.js                # Thanh trên cùng với thời gian và menu ứng dụng
│   ├── desktop/
│   │   ├── desktop-core.js      # Component desktop chính
│   │   ├── icon-manager.js      # Quản lý biểu tượng trên desktop
│   │   └── icon-interaction.js  # Xử lý tương tác với biểu tượng
│   ├── window/
│   │   ├── window-core.js       # Core logic của cửa sổ
│   │   ├── window-element.js    # Tạo và render element cửa sổ
│   │   ├── window-state.js     # Quản lý state cửa sổ
│   │   ├── window-interaction.js # Xử lý tương tác cửa sổ
│   │   ├── window-drag.js       # Chức năng kéo thả cửa sổ
│   │   └── window-resize.js     # Chức năng thay đổi kích thước cửa sổ
│   └── background/
│       ├── overlay.js           # Overlay nền động
│       ├── bg1.js               # Background animation 1
│       ├── bg2.js               # Background animation 2
│       ├── bg3.js               # Background animation 3
│       └── bg4.js               # Background animation 4
└── apps/
    ├── about.js                 # Ứng dụng Giới Thiệu
    ├── skills.js                # Ứng dụng Kỹ Năng
    ├── projects.js              # Ứng dụng Dự Án
    ├── education.js             # Ứng dụng Học Vấn
    ├── contact.js               # Ứng dụng Liên Hệ
    └── settings.js              # Ứng dụng Cài Đặt
```

## Tính năng

### Giao diện hệ điều hành
- **Desktop**: Màn hình nền với các biểu tượng ứng dụng có thể di chuyển tự do
- **Hệ thống cửa sổ**: Kéo thả, thay đổi kích thước, thu nhỏ, phóng to, đóng cửa sổ
- **TopBar**: Thanh trên cùng hiển thị thời gian, tên người dùng và danh sách ứng dụng đang mở
- **Background động**: Nhiều hiệu ứng nền với overlay động tương ứng

### Quản lý cửa sổ
- Mở nhiều cửa sổ cùng lúc với vị trí tự động sắp xếp
- Kéo thả để di chuyển cửa sổ
- Thay đổi kích thước bằng cách kéo góc
- Thu nhỏ/phục hồi cửa sổ
- Phóng to/khôi phục cửa sổ
- Xem trước cửa sổ đang thu nhỏ khi hover trên TopBar
- Quản lý z-index tự động khi focus cửa sổ


### Lưu trữ dữ liệu
- Tất cả cài đặt và dữ liệu được lưu trong localStorage
- Tự động lưu và khôi phục trạng thái khi tải lại trang


## Cách sử dụng

1. Mở file `index.html` trong trình duyệt web hiện đại
2. Nhấp đúp vào biểu tượng ứng dụng trên desktop để mở
3. Sử dụng TopBar để:
   - Xem thời gian và thông tin người dùng
   - Chuyển đổi giữa các ứng dụng đang mở
   - Xem trước cửa sổ đang thu nhỏ (hover)
4. Tương tác với cửa sổ:
   - Kéo thanh tiêu đề để di chuyển
   - Kéo góc để thay đổi kích thước
   - Nhấn nút thu nhỏ/phóng to/đóng
5. Tùy chỉnh giao diện qua ứng dụng Cài Đặt


## Tùy chỉnh và mở rộng

### Thêm ứng dụng mới
1. Tạo file trong thư mục `apps/` (ví dụ: `myapp.js`)
2. Định nghĩa class ứng dụng kế thừa pattern có sẵn
3. Thêm định nghĩa vào `APP_DEFS` trong `constants/constants.js`
4. Đăng ký trong `AppFactory.createAppContent()` tại `os/app-factory.js`

### Thay đổi hình nền
- Thêm gradient mới vào `DEFAULT_WALLPAPERS` trong `constants/constants.js`
- Hoặc thêm hình nền tùy chỉnh qua ứng dụng Cài Đặt

### Tùy chỉnh giao diện
- Chỉnh sửa màu sắc và style trong `index.html` (CSS variables)
- Tùy chỉnh component desktop trong `os/desktop/`
- Tùy chỉnh component TopBar trong `os/topbar.js`

### Thêm tính năng mới
- Thêm utility functions vào thư mục `utils/`
- Mở rộng `OSState` để quản lý state mới
- Tạo component UI chung trong thư mục `components/`

## Lưu ý

- Tất cả dữ liệu được lưu cục bộ trong trình duyệt (localStorage)
- Không cần kết nối internet sau khi tải lần đầu (trừ CDN TailwindCSS)
- Tương thích với tất cả trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- Responsive design hỗ trợ cả desktop và mobile
- Hoàn toàn không cần cài đặt framework hay môi trường phát triển
- Chạy trực tiếp từ file HTML, không cần build process

## Tác giả

Nghị Tuấn Lộc 
