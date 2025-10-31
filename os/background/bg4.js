(function () {
  window.CloudOSBackgroundTemplates = window.CloudOSBackgroundTemplates || {};
  window.CloudOSBackgroundTemplates.bg4 = function createBg4() {
    const t = document.createElement('template');
    t.innerHTML = `<div class="os-bg" data-os-bg style="position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <!-- lớp zoom: bản sao sóng phóng nhẹ tại vị trí chuột -->
  <div class="zoom">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
  <style>
    .os-bg { overflow:hidden; background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%); animation: osbg4-gradient 15s ease infinite; background-size: 400% 400%; }
    @keyframes osbg4-gradient { 0%{background-position:0% 0%;} 50%{background-position:100% 100%;} 100%{background-position:0% 0%;} }
    .os-bg .wave { background: rgb(255 255 255 / 25%); border-radius: 1000% 1000% 0 0; position: absolute; width: 200%; height: 12em; animation: osbg4-wave 10s -3s linear infinite; transform: translate3d(0,0,0); opacity: 0.8; bottom: 0; left: 0; z-index: -1; }
    .os-bg .wave:nth-of-type(2) { bottom:-1.25em; animation: osbg4-wave 18s linear reverse infinite; opacity: 0.8; }
    .os-bg .wave:nth-of-type(3) { bottom:-2.5em; animation: osbg4-wave 20s -1s reverse infinite; opacity: 0.9; }
    /* Hover: tăng tốc nhẹ gradient và sóng */
    body:hover .os-bg { animation: osbg4-gradient 10s ease infinite; }
    body:hover .os-bg .wave { animation-duration: 7s; }
    body:hover .os-bg .wave:nth-of-type(2) { animation-duration: 13s; }
    body:hover .os-bg .wave:nth-of-type(3) { animation-duration: 15s; }
    /* Zoom circle tại vị trí chuột */
    .os-bg .zoom { position:absolute; inset:0; pointer-events:none; clip-path: circle(5px at var(--cursor-x, 50%) var(--cursor-y, 50%)); transform-origin: var(--cursor-x, 50%) var(--cursor-y, 50%); transform: scale(1.08); }
    @keyframes osbg4-wave {
      2% { transform: translateX(1); }
      25% { transform: translateX(-25%); }
      50% { transform: translateX(-50%); }
      75% { transform: translateX(-25%); }
      100% { transform: translateX(1); }
    }
  </style>
</div>`;
    return t.content.firstElementChild.cloneNode(true);
  };
})();


