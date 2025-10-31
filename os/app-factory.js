/**********************************************************************
|| Cloud Web OS – App Factory
**********************************************************************/

// Factory tạo content cho các ứng dụng
class AppFactory {
  constructor(osInstance) {
    this.os = osInstance;
  }

  createAppContent(appId) {
    const contentContainer = createElement('div', 'h-full');
    
    switch(appId) {
      case 'about':
        new AppAbout(contentContainer);
        break;
      case 'skills':
        new AppSkills(contentContainer);
        break;
      case 'projects':
        new AppProjects(contentContainer);
        break;
      case 'education':
        new AppEducation(contentContainer);
        break;
      case 'contact':
        new AppContact(contentContainer);
        break;
      case 'notes':
        new AppNotes(contentContainer);
        break;
      case 'files':
        new AppFiles(contentContainer, {
          openViewer: (file) => this.os.openViewer(file),
          notify: (msg) => notify(msg)
        });
        break;
      case 'terminal':
        new AppTerminal(contentContainer, {
          api: this.os.getFilesAPI()
        });
        break;
      case 'settings':
        new AppSettings(contentContainer, {
          wallpaper: this.os.stateManager.getWallpaperIdx(),
          setWallpaper: (idx) => {
            this.os.stateManager.setWallpaperIdx(idx);
            // Cập nhật wallpaper ngay lập tức
            const wallpapers = getWallpapers(); // Lấy danh sách wallpaper mới nhất
            this.os.container.style.background = wallpapers[idx];
          },
          user: this.os.stateManager.getUser(),
          setUser: (fn) => {
            const newUser = fn(this.os.stateManager.getUser());
            this.os.stateManager.setUser(newUser);
            // Cập nhật TopBar ngay lập tức
            if (this.os.topBar) {
              this.os.topBar.updateUser(newUser);
            }
          },
          theme: this.os.stateManager.getTheme(),
          setTheme: (theme) => {
            this.os.stateManager.setTheme(theme);
            // Cập nhật theme ngay lập tức - Áp dụng màu nền sáng/tối cho toàn bộ hệ điều hành
            if (theme === 'light') {
              document.body.style.background = '#f0f0f0';
              document.body.style.color = '#000';
              this.os.container.style.color = '#000';
              // Áp dụng cho tất cả windows
              document.querySelectorAll('[data-window]').forEach(el => {
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                el.style.color = '#000';
              });
            } else {
              document.body.style.background = '#000';
              document.body.style.color = '#fff';
              this.os.container.style.color = '#fff';
              // Áp dụng cho tất cả windows
              document.querySelectorAll('[data-window]').forEach(el => {
                el.style.backgroundColor = 'rgba(230, 230, 250, 0.5)';
                el.style.color = '#fff';
              });
            }
          },
          fontSize: this.os.stateManager.getFontSize() || 'medium',
          setFontSize: (size) => {
            console.log('setFontSize called with:', size);
            this.os.stateManager.setFontSize(size);
            // Áp dụng font size cho toàn bộ hệ điều hành
            const fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
            console.log('Applying font size:', fontSize);
            document.documentElement.style.fontSize = fontSize;
            document.body.style.fontSize = fontSize;
            // Áp dụng cho tất cả windows
            document.querySelectorAll('[data-window]').forEach(el => {
              el.style.fontSize = fontSize;
            });
          },
          accentColor: this.os.stateManager.getAccentColor() || '#3b82f6',
          setAccentColor: (color) => {
            this.os.stateManager.setAccentColor(color);
            // Áp dụng accent color
            document.documentElement.style.setProperty('--accent-color', color);
          },
          windowOpacity: this.os.stateManager.getWindowOpacity() !== undefined ? this.os.stateManager.getWindowOpacity() : 70,
          setWindowOpacity: (opacity) => {
            this.os.stateManager.setWindowOpacity(opacity);
            // Áp dụng opacity cho tất cả windows và set CSS variable
            document.documentElement.style.setProperty('--window-opacity', opacity / 100);
            
            // Xác định theme hiện tại
            const isDark = document.body.style.backgroundColor === 'rgb(0, 0, 0)' || 
                          !document.body.style.backgroundColor || 
                          document.body.style.backgroundColor === '';
            
            // Áp dụng opacity cho tất cả windows với màu phù hợp theme
            document.querySelectorAll('[data-window]').forEach(el => {
              if (isDark) {
                el.style.backgroundColor = `rgba(24, 24, 27, ${opacity / 100})`;
              } else {
                el.style.backgroundColor = `rgba(255, 255, 255, ${opacity / 100})`;
              }
            });
          },
          blurEffect: this.os.stateManager.getBlurEffect() !== undefined ? this.os.stateManager.getBlurEffect() : true,
          setBlurEffect: (blur) => {
            this.os.stateManager.setBlurEffect(blur);
            // Áp dụng blur effect
            if (blur) {
              document.body.classList.add('blur-enabled');
            } else {
              document.body.classList.remove('blur-enabled');
            }
          }
        });
        break;
      case 'viewer':
        const viewer = new AppViewer(contentContainer);
        if (this.os.viewerFile) {
          viewer.setFile(this.os.viewerFile);
        }
        break;
    }

    return contentContainer;
  }
}

