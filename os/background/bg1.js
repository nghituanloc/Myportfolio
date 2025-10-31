(function () {
  window.CloudOSBackgroundTemplates = window.CloudOSBackgroundTemplates || {};
  window.CloudOSBackgroundTemplates.bg1 = function createBg1() {
    const t = document.createElement('template');
    t.innerHTML = `<div class="os-bg" data-os-bg style="position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden">
  <div class="background">
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
    <span class="ball"></span>
  </div>
  <!-- Lớp zoom copy nội dung để phóng tại vị trí chuột -->
  <div class="zoom">
    <div class="background">
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
      <span class="ball"></span>
    </div>
  </div>
  <style>
    @keyframes osbg1-move {
      100% { transform: translate3d(0, 0, 1px) rotate(360deg); }
    }
    .os-bg .background { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: #4CB8B6; overflow: hidden; }
    .os-bg .ball { position: absolute; width: 20vmin; height: 20vmin; border-radius: 50%; backface-visibility: hidden; animation: osbg1-move linear infinite; }
    .os-bg .ball:nth-child(odd) { color: #006D5B; }
    .os-bg .ball:nth-child(even) { color: #FF6F61; }
    .os-bg .ball:nth-child(1) { top: 77%; left: 88%; animation-duration: 32s; animation-delay: -3s; transform-origin: 16vw -2vh; box-shadow: 40vmin 0 5.7vmin currentColor; }
    .os-bg .ball:nth-child(2) { top: 42%; left: 2%; animation-duration: 42s; animation-delay: -29s; transform-origin: -19vw 21vh; box-shadow: -40vmin 0 5.18vmin currentColor; }
    .os-bg .ball:nth-child(3) { top: 28%; left: 18%; animation-duration: 39s; animation-delay: -8s; transform-origin: -22vw 3vh; box-shadow: 40vmin 0 5.25vmin currentColor; }
    .os-bg .ball:nth-child(4) { top: 50%; left: 79%; animation-duration: 21s; animation-delay: -21s; transform-origin: -17vw -6vh; box-shadow: 40vmin 0 5.28vmin currentColor; }
    .os-bg .ball:nth-child(5) { top: 46%; left: 15%; animation-duration: 29s; animation-delay: -40s; transform-origin: 4vw 0vh; box-shadow: -40vmin 0 5.96vmin currentColor; }
    .os-bg .ball:nth-child(6) { top: 77%; left: 16%; animation-duration: 25s; animation-delay: -10s; transform-origin: 18vw 4vh; box-shadow: 40vmin 0 5.18vmin currentColor; }
    .os-bg .ball:nth-child(7) { top: 22%; left: 17%; animation-duration: 44s; animation-delay: -6s; transform-origin: 1vw -23vh; box-shadow: -40vmin 0 5.70vmin currentColor; }
    .os-bg .ball:nth-child(8) { top: 41%; left: 47%; animation-duration: 34s; animation-delay: -28s; transform-origin: 25vw -3vh; box-shadow: 40vmin 0 5.20vmin currentColor; }
    /* Hover: tăng tốc chuyển động nhẹ khi rê chuột (dùng body:hover để không cần pointer-events) */
    body:hover .os-bg .ball:nth-child(1) { animation-duration: 26s; }
    body:hover .os-bg .ball:nth-child(2) { animation-duration: 34s; }
    body:hover .os-bg .ball:nth-child(3) { animation-duration: 31s; }
    body:hover .os-bg .ball:nth-child(4) { animation-duration: 17s; }
    body:hover .os-bg .ball:nth-child(5) { animation-duration: 22s; }
    body:hover .os-bg .ball:nth-child(6) { animation-duration: 20s; }
    body:hover .os-bg .ball:nth-child(7) { animation-duration: 35s; }
    body:hover .os-bg .ball:nth-child(8) { animation-duration: 26s; }

    /* Zoom circle tại vị trí chuột */
    .os-bg .zoom { position:absolute; inset:0; pointer-events:none; clip-path: circle(5px at var(--cursor-x, 50%) var(--cursor-y, 50%)); }
    .os-bg .zoom .background { position:absolute; inset:0; transform-origin: var(--cursor-x, 50%) var(--cursor-y, 50%); transform: scale(1.08); }
    /* Kế thừa các style và animation cho lớp zoom */
    .os-bg .zoom .ball { position: absolute; width: 20vmin; height: 20vmin; border-radius: 50%; backface-visibility: hidden; animation: osbg1-move linear infinite; }
    .os-bg .zoom .ball:nth-child(odd) { color: #006D5B; }
    .os-bg .zoom .ball:nth-child(even) { color: #FF6F61; }
    .os-bg .zoom .ball:nth-child(1) { top: 77%; left: 88%; animation-duration: 32s; animation-delay: -3s; transform-origin: 16vw -2vh; box-shadow: 40vmin 0 5.7vmin currentColor; }
    .os-bg .zoom .ball:nth-child(2) { top: 42%; left: 2%; animation-duration: 42s; animation-delay: -29s; transform-origin: -19vw 21vh; box-shadow: -40vmin 0 5.18vmin currentColor; }
    .os-bg .zoom .ball:nth-child(3) { top: 28%; left: 18%; animation-duration: 39s; animation-delay: -8s; transform-origin: -22vw 3vh; box-shadow: 40vmin 0 5.25vmin currentColor; }
    .os-bg .zoom .ball:nth-child(4) { top: 50%; left: 79%; animation-duration: 21s; animation-delay: -21s; transform-origin: -17vw -6vh; box-shadow: 40vmin 0 5.28vmin currentColor; }
    .os-bg .zoom .ball:nth-child(5) { top: 46%; left: 15%; animation-duration: 29s; animation-delay: -40s; transform-origin: 4vw 0vh; box-shadow: -40vmin 0 5.96vmin currentColor; }
    .os-bg .zoom .ball:nth-child(6) { top: 77%; left: 16%; animation-duration: 25s; animation-delay: -10s; transform-origin: 18vw 4vh; box-shadow: 40vmin 0 5.18vmin currentColor; }
    .os-bg .zoom .ball:nth-child(7) { top: 22%; left: 17%; animation-duration: 44s; animation-delay: -6s; transform-origin: 1vw -23vh; box-shadow: -40vmin 0 5.70vmin currentColor; }
    .os-bg .zoom .ball:nth-child(8) { top: 41%; left: 47%; animation-duration: 34s; animation-delay: -28s; transform-origin: 25vw -3vh; box-shadow: 40vmin 0 5.20vmin currentColor; }
  </style>
</div>`;
    return t.content.firstElementChild.cloneNode(true);
  };
})();


