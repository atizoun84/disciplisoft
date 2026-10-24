import{f as e,l as t}from"./index-Tfr_jfLG.js";import{ouvrirFicheModal as n}from"./fiche-CZVIoYQW.js";var r=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),i=e=>(e||``).toString().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``);async function a(o){let[s,c]=await Promise.all([e(),t.eleves.toArray()]),l=Object.fromEntries(s.map(e=>[e.id,e.nom])),u=c.map(e=>({...e,_nom:i(e.nom),_prenom:i(e.prenom),_matricule:i(e.matricule),_classeNom:l[e.classeId]||``}));if(o.innerHTML=`
    <h2 class="titre-section">Rechercher un élève</h2>
    <div class="carte">
      <div class="champ" style="margin-bottom:0;">
        <label>Nom, prénom ou n° matricule</label>
        <input id="rech-input" type="search" placeholder="Ex : ADAM, Koffi, 2050101…"
               autocomplete="off" autofocus />
      </div>
    </div>

    <div id="rech-resultats">
      <div class="vide">
        <strong>Commencez à taper</strong>
        Les résultats s'afficheront automatiquement.
      </div>
    </div>
  `,!document.getElementById(`recherche-page-styles`)){let e=document.createElement(`style`);e.id=`recherche-page-styles`,e.textContent=`
      .slot-container-page { perspective: 1000px; margin-bottom: 10px; }
      .slot-card-page {
        display: flex; align-items: center; gap: 14px; background: #fff; padding: 16px; border-radius: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,.1); border-left: 5px solid #198754;
        transition: transform 0.1s, box-shadow 0.1s; cursor: pointer;
      }
      .slot-card-page:active { transform: scale(0.98); }
      .slot-card-page.spinning {
        animation: slotSpinPage 0.08s linear infinite alternate;
        filter: blur(0.5px);
        border-left-color: #6c757d;
        background: #f8f9fa;
      }
      .slot-avatar-page { width: 50px; height: 50px; border-radius: 50%; background: #d1e7dd; color: #0f5132; font-weight: 700; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;}
      .slot-info-page { flex: 1; }
      .slot-nom-page { font-weight: 700; font-size: 16px; color: #212529; }
      .slot-meta-page { font-size: 12px; color: #6c757d; margin-top: 3px; }
      @keyframes slotSpinPage { 0% { transform: translateY(0); } 100% { transform: translateY(-2px); } }
      .rech-vide { text-align: center; padding: 20px; color: #6c757d; font-size: 13px; background: #fff; border-radius: 12px; }
    `,document.head.appendChild(e)}let d=o.querySelector(`#rech-input`),f=o.querySelector(`#rech-resultats`),p=null,m=null,h=[],g=0;function _(){m&&clearInterval(m),m=null}function v(e,t){let i=((e.prenom[0]||``)+(e.nom[0]||``)).toUpperCase();f.innerHTML=`
      <div class="slot-container-page">
        <div class="slot-card-page ${t?`spinning`:``}" data-id="${e.id}">
          <div class="slot-avatar-page">
            ${e.photo?`<img src="${e.photo}" style="width:100%;height:100%;object-fit:cover;">`:r(i)}
          </div>
          <div class="slot-info-page">
            <div class="slot-nom-page">${r(e.prenom)} ${r(e.nom)}</div>
            <div class="slot-meta-page">${r(e._classeNom)||`—`} ${e.sexe?` · `+e.sexe:``} ${e.matricule?` · `+r(e.matricule):``}</div>
          </div>
          <div style="font-size:20px;color:#198754;">➔</div>
        </div>
      </div>
    `,t||f.querySelector(`.slot-card-page`).addEventListener(`click`,()=>{n(Number(e.id),()=>a(o))})}function y(e){let t=i(e.trim());if(!t){f.innerHTML=`<div class="vide"><strong>Commencez à taper</strong>Les résultats s'afficheront automatiquement.</div>`,_();return}if(h=u.filter(e=>e._nom.includes(t)||e._prenom.includes(t)||e._matricule.includes(t)),h.length===0){_(),f.innerHTML=`<div class="rech-vide">Aucun élève trouvé. Essayez avec une autre orthographe ou un numéro de matricule.</div>`;return}if(h.length===1){_(),v(h[0],!1);return}_(),g=0;function n(){v(h[g%h.length],!0),g++}n(),m=setInterval(n,50)}d.addEventListener(`input`,e=>{y(e.target.value),clearTimeout(p),p=setTimeout(()=>{_(),h.length>0&&v(h[0],!1)},800)}),d.focus()}export{a as render};