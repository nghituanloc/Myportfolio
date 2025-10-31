(function () {
  window.CloudOSBackgroundTemplates = window.CloudOSBackgroundTemplates || {};
  window.CloudOSBackgroundTemplates.bg2 = function createBg2() {
    const t = document.createElement('template');
    t.innerHTML = `<div class="os-bg" data-os-bg style="position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden">
  <style>
    @property --a{ syntax: '<angle>'; inherits: true; initial-value: 0deg; }
    @property --p{ syntax: '<percentage>'; inherits: true; initial-value: 0%; }
    @property --c1{ syntax: '<color>'; inherits: true; initial-value: #3B8183; }
    @property --c2{ syntax: '<color>'; inherits: true; initial-value: #FAD089; }
    .os-bg { --s: 160px; --a: 135deg; --p: 25%; --c1: #3B8183; --c2: #FAD089; }
    .os-bg { background:
      conic-gradient(from calc(-45deg  - var(--a)/2) at top    var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc(-45deg  - var(--a)/2) at top    var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc( 45deg  - var(--a)/2) at top    var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc( 45deg  - var(--a)/2) at top    var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc(-135deg - var(--a)/2) at bottom var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc(-135deg - var(--a)/2) at bottom var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc( 135deg - var(--a)/2) at bottom var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
      conic-gradient(from calc( 135deg - var(--a)/2) at bottom var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)) var(--c2);
      background-size: calc(2*var(--s)) calc(2*var(--s));
      animation: osbg2-m 10s infinite alternate linear;
    }
    /* Hover: tăng tốc nhẹ khi rê chuột */
    body:hover .os-bg {
      animation: osbg2-m 6s infinite alternate linear;
    }
    @keyframes osbg2-m {
      0%,15% { --a: 135deg; --p: 20%; --c1: #3B8183; --c2: #FAD089; background-position: 0 0, var(--s) var(--s); }
      45%,50% { --a: 90deg; --p: 25%; --c1: #3B8183; --c2: #FAD089; background-position: 0 0, var(--s) var(--s); }
      50.01%,55% { --a: 90deg; --p: 25%; --c2: #3B8183; --c1: #FAD089; background-position: var(--s) 0, 0 var(--s); }
      85%,100% { --a: 135deg; --p: 20%; --c2: #3B8183; --c1: #FAD089; background-position: var(--s) 0, 0 var(--s); }
    }
    /* Zoom circle tại vị trí chuột */
    .os-bg .zoom { position:absolute; inset:0; pointer-events:none; clip-path: circle(5px at var(--cursor-x, 50%) var(--cursor-y, 50%)); }
    .os-bg .zoom::before { content:""; position:absolute; inset:0; transform-origin: var(--cursor-x, 50%) var(--cursor-y, 50%); transform: scale(1.08);
      background:
        conic-gradient(from calc(-45deg  - var(--a)/2) at top    var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc(-45deg  - var(--a)/2) at top    var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc( 45deg  - var(--a)/2) at top    var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc( 45deg  - var(--a)/2) at top    var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc(-135deg - var(--a)/2) at bottom var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc(-135deg - var(--a)/2) at bottom var(--p) left  var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc( 135deg - var(--a)/2) at bottom var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)),
        conic-gradient(from calc( 135deg - var(--a)/2) at bottom var(--p) right var(--p), #0000, var(--c1) 2deg calc(var(--a) - 2deg), #0000 var(--a)) var(--c2);
      background-size: calc(2*var(--s)) calc(2*var(--s));
      animation: osbg2-m 10s infinite alternate linear;
    }
  </style>
  <div class="zoom"></div>
</div>`;
    return t.content.firstElementChild.cloneNode(true);
  };
})();


