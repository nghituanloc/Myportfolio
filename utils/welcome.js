/**********************************************************************
|| Cloud Web OS – Welcome Helpers
**********************************************************************/

(function () {
  function show(container) {
    if (!container) return;
    if (container.querySelector('[data-welcome-message]')) return;

    const welcome = createElement('div', 'absolute inset-0 flex items-center justify-center pointer-events-none z-10');
    welcome.setAttribute('data-welcome-message', 'true');

    const content = createElement('div', 'px-6 py-4 rounded-xl bg-black/50 backdrop-blur text-white shadow-lg text-center');
    const title = createElement('p', 'text-lg font-semibold mb-2', {}, ['Cảm ơn bạn đã ghé thăm trang cá nhân của mình !!']);
    const sub = createElement('p', 'text-sm opacity-90', {}, ['']);

    content.appendChild(title);
    content.appendChild(sub);
    welcome.appendChild(content);
    container.appendChild(welcome);
  }

  function hide(container) {
    if (!container) return;
    const el = container.querySelector('[data-welcome-message]');
    if (el) el.remove();
  }

  window.OSWelcome = { show, hide };
})();


