/**********************************************************************
|| Cloud Web OS – Background Overlay Helpers
**********************************************************************/

(function () {
  const BackgroundAPI = {
    init() {
      const updateCursorVars = (e) => {
        const x = e.clientX + 'px';
        const y = e.clientY + 'px';
        document.documentElement.style.setProperty('--cursor-x', x);
        document.documentElement.style.setProperty('--cursor-y', y);
      };
      window.addEventListener('mousemove', updateCursorVars, { passive: true });
    },

    apply(index) {
      const root = document.getElementById('root');
      if (!root) return;
      const old = root.querySelector('[data-os-bg]');
      if (old) old.remove();
      const key = `bg${(index + 1)}`;
      const factory = (window.CloudOSBackgroundTemplates || {})[key];
      if (typeof factory !== 'function') return;
      const bgEl = factory();
      if (!bgEl) return;
      bgEl.style.zIndex = '0';
      root.prepend(bgEl);
    }
  };

  window.CloudOSBackground = BackgroundAPI;
})();


