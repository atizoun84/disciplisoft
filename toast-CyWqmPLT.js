var e=null;function t(){if(document.getElementById(`toast-styles`))return;let e=document.createElement(`style`);e.id=`toast-styles`,e.textContent=`
    @keyframes toastFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes toastFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes toastPop {
      0% { transform: scale(0.7); opacity: 0; }
      60% { transform: scale(1.08); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes toastCheckDraw {
      from { stroke-dashoffset: 100; }
      to { stroke-dashoffset: 0; }
    }
    .toast-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      animation: toastFadeIn 0.2s ease;
      cursor: pointer;
    }
    .toast-overlay.sortie {
      animation: toastFadeOut 0.3s ease forwards;
    }
    .toast-carte {
      background: #fff;
      border-radius: 22px;
      padding: 32px 28px;
      max-width: 320px;
      width: 88%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
      animation: toastPop 0.4s cubic-bezier(.2, .7, .3, 1);
    }
    .toast-carte.succes { border-top: 4px solid #198754; }
    .toast-carte.erreur { border-top: 4px solid #b02a37; }
    .toast-carte.info   { border-top: 4px solid #0d6efd; }

    .toast-icone {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 38px;
    }
    .toast-icone.succes { background: #d1e7dd; color: #0f5132; }
    .toast-icone.erreur { background: #f8d7da; color: #b02a37; }
    .toast-icone.info   { background: #cfe2ff; color: #084298; }

    .toast-icone svg {
      width: 44px;
      height: 44px;
    }
    .toast-icone svg path {
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: toastCheckDraw 0.5s ease 0.15s forwards;
    }

    .toast-titre {
      font-size: 17px;
      font-weight: 700;
      color: #212529;
      margin-bottom: 6px;
      font-family: system-ui, sans-serif;
    }
    .toast-message {
      font-size: 13px;
      color: #6c757d;
      line-height: 1.5;
      font-family: system-ui, sans-serif;
      white-space: pre-line;
    }
    .toast-hint {
      margin-top: 14px;
      font-size: 11px;
      color: #adb5bd;
      font-family: system-ui, sans-serif;
    }
  `,document.head.appendChild(e)}var n={succes:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7" /></svg>`,erreur:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>`,info:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v.01M12 12v4" /></svg>`},r={succes:`Succès`,erreur:`Erreur`,info:`Information`};function i(t){t&&t.parentNode&&(t.classList.add(`sortie`),setTimeout(()=>{t.remove(),e===t&&(e=null)},300))}function a(a,o,s={}){t(),e&&i(e);let c=s.duree??(a===`erreur`?4e3:2200),l=s.titre||r[a]||`Info`,u=document.createElement(`div`);return u.className=`toast-overlay`,u.innerHTML=`
    <div class="toast-carte ${a}">
      <div class="toast-icone ${a}">${n[a]}</div>
      <div class="toast-titre">${l}</div>
      <div class="toast-message">${o.replace(/</g,`&lt;`)}</div>
      <div class="toast-hint">Toucher pour fermer</div>
    </div>
  `,document.body.appendChild(u),e=u,u.addEventListener(`click`,()=>i(u)),c>0&&setTimeout(()=>i(u),c),{fermer:()=>i(u)}}var o=(e,t)=>a(`succes`,e,t),s=(e,t)=>a(`erreur`,e,t),c=(e,t)=>a(`info`,e,t);export{c as n,o as r,s as t};