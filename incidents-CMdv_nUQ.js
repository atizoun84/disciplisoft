import{c as e,d as t,f as n,h as r,m as i,n as a,p as o,r as s,s as c,u as l,y as u}from"./index-Tfr_jfLG.js";var d=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),f=e=>(e||``).toString().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``),p=e=>{let t=new Date(e);return t.toLocaleDateString(`fr-FR`,{day:`2-digit`,month:`short`,year:`numeric`})+` · `+t.toLocaleTimeString(`fr-FR`,{hour:`2-digit`,minute:`2-digit`})},m=e=>e===`Grave`?`tag-rouge`:e===`Moyenne`?`tag-orange`:`tag-gris`;function h(){let e=location.hash,t=e.indexOf(`?`);return t===-1?new URLSearchParams:new URLSearchParams(e.slice(t+1))}async function g(_){let v=h(),y=v.get(`eleve`)?Number(v.get(`eleve`)):null,b=await n();if(b.length===0){_.innerHTML=`
      <div class="vide">
        <strong>Aucune classe enregistrée</strong>
        Créez une classe et au moins un élève avant de signaler un incident.
        <div style="margin-top:14px;"><a class="btn" href="#/classes">Créer une classe</a></div>
      </div>`;return}let x=b.map(e=>`<option value="${e.id}">${d(e.nom)}</option>`).join(``),S=s.map(e=>`<option value="${e}">${e}</option>`).join(``),C=a.map(e=>`<option value="${e}" ${e===`Moyenne`?`selected`:``}>${e}</option>`).join(``),w=null,T=[];if(y){if(w=await t(y),w)T=await i(y);else{_.innerHTML=`<div class="vide"><strong>Élève introuvable</strong></div>`;return}}else T=await r(30);let E=await Promise.all(T.map(async e=>{let n=await t(e.eleveId);return{...e,eleve:n?`${n.prenom} ${n.nom}`:`Élève supprimé`}})),D=E.length===0?`<div class="vide"><strong>Aucun incident</strong>Rien à signaler.</div>`:E.map(e=>{let t=l(e.sanction);return`
        <div class="carte">
          <div class="ligne">
            <span class="titre">${d(w?e.type:e.eleve)}</span>
            <span class="tag ${m(e.gravite)}">${d(e.gravite)}</span>
          </div>
          <div class="ligne sous-titre">
            <span>${w?``:d(e.type)+` · `}${p(e.date)}</span>
          </div>
          ${e.description?`<div class="ligne sous-titre" style="font-style:italic;">« ${d(e.description)} »</div>`:``}
          ${e.sanction?`<div class="ligne"><span class="tag tag-orange">Sanction : ${d(e.sanction)}${t>0?` (${t} h)`:``}</span></div>`:``}
          <div class="ligne">
            ${e.statut===`ouvert`?`<button class="btn btn-petit btn-secondaire" data-cloture="${e.id}">Clôturer</button>`:`<span class="tag tag-vert">Clos</span>`}
          </div>
        </div>`}).join(``),O=w?`Historique de ${d(w.prenom)} ${d(w.nom)} (${E.length})`:`Incidents récents (${E.length})`,k=w?`
    <div class="carte" style="background:var(--vert);color:var(--blanc);">
      <div class="ligne">
        <strong>${d(w.prenom)} ${d(w.nom)}</strong>
        <a href="#/incidents" style="color:white;font-size:13px;text-decoration:underline;">Voir tous</a>
      </div>
    </div>`:``,A=!1;if(_.innerHTML=`
    ${k}
    <h2 class="titre-section">Signaler un incident</h2>
    <form id="form-incident" class="carte">
      <div class="champ">
        <label>Classe</label>
        <select id="f-classe" required>${x}</select>
      </div>
      <div class="champ">
        <label>Élève (tapez pour rechercher)</label>
        <input type="search" id="f-rech-eleve" placeholder="Tapez le nom, prénom ou matricule…" autocomplete="off" autocapitalize="off" spellcheck="false" />
        <input type="hidden" id="f-eleve" />
        <div id="f-rech-resultats"></div>
      </div>
      <div class="champ">
        <label>Type d'incident</label>
        <select id="f-type" required>${S}</select>
      </div>
      <div class="champ">
        <label>Gravité</label>
        <select id="f-gravite">${C}</select>
      </div>
      <div class="champ">
        <label>Description (optionnel)</label>
        <textarea id="f-description" rows="2" placeholder="Détails, circonstances…"></textarea>
      </div>
      <div class="champ">
        <label>Sanction immédiate (optionnel)</label>
        <input id="f-sanction" type="text" placeholder="Ex : 2h de retenue, TIG…" />
      </div>
      <button type="submit" class="btn btn-bloc btn-danger">Enregistrer l'incident</button>
    </form>

    <h2 class="titre-section" style="display: flex; justify-content: space-between; align-items: center;">
      ${O}
      <button type="button" id="toggle-hist-incidents" class="btn btn-petit btn-secondaire">
        ${A?`👁️ Masquer`:`👁️ Afficher`}
      </button>
    </h2>
    <div id="bloc-historique-incidents" style="display: ${A?`block`:`none`};">
      ${D}
    </div>
  `,!document.getElementById(`incidents-rech-styles`)){let e=document.createElement(`style`);e.id=`incidents-rech-styles`,e.textContent=`
      .slot-container-inc { perspective: 1000px; margin-bottom: 6px; }
      .slot-card-inc {
        display: flex; align-items: center; gap: 10px; background: #fff; padding: 10px 12px; border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,.08); border-left: 4px solid #198754;
        transition: transform 0.1s; cursor: pointer;
      }
      .slot-card-inc:active { transform: scale(0.98); }
      .slot-card-inc.spinning {
        animation: slotSpinInc 0.08s linear infinite alternate;
        filter: blur(0.5px);
        border-left-color: #6c757d;
        background: #f8f9fa;
      }
      .slot-avatar-inc { width: 36px; height: 36px; border-radius: 50%; background: #d1e7dd; color: #0f5132; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;}
      .slot-info-inc { flex: 1; }
      .slot-nom-inc { font-weight: 600; font-size: 13px; color: #212529; }
      .slot-meta-inc { font-size: 11px; color: #6c757d; margin-top: 2px; }
      .slot-selected {
        background: #d1e7dd; border-left-color: #0f5132;
        padding: 10px 12px; border-radius: 10px;
        display: flex; align-items: center; gap: 10px; margin-top: 6px;
        font-size: 13px; font-weight: 600; color: #0f5132;
      }
      .slot-selected button {
        margin-left: auto; background: transparent; border: none; color: #0f5132;
        font-size: 18px; cursor: pointer; padding: 0 4px;
      }
      @keyframes slotSpinInc { 0% { transform: translateY(0); } 100% { transform: translateY(-2px); } }
      .rech-vide-inc { text-align: center; padding: 12px; color: #6c757d; font-size: 12px; }
    `,document.head.appendChild(e)}let j=_.querySelector(`#f-classe`),M=_.querySelector(`#f-rech-eleve`),N=_.querySelector(`#f-eleve`),P=_.querySelector(`#f-rech-resultats`),F=[],I=null,L=null,R=null,z=[],B=0;async function V(e,t=null){if(F=await o(Number(e)),F=F.map(e=>({...e,_nom:f(e.nom),_prenom:f(e.prenom),_matricule:f(e.matricule)})),M.value=``,N.value=``,I=null,P.innerHTML=``,t){let e=F.find(e=>e.id===t);e&&W(e)}}function H(){R&&clearInterval(R),R=null}function U(e,t){let n=((e.prenom[0]||``)+(e.nom[0]||``)).toUpperCase();P.innerHTML=`
      <div class="slot-container-inc">
        <div class="slot-card-inc ${t?`spinning`:``}" data-id="${e.id}">
          <div class="slot-avatar-inc">
            ${e.photo?`<img src="${e.photo}" style="width:100%;height:100%;object-fit:cover;">`:d(n)}
          </div>
          <div class="slot-info-inc">
            <div class="slot-nom-inc">${d(e.prenom)} ${d(e.nom)}</div>
            <div class="slot-meta-inc">${e.sexe?e.sexe:``} ${e.matricule?`· `+d(e.matricule):``}</div>
          </div>
        </div>
      </div>
    `,t||P.querySelector(`.slot-card-inc`).addEventListener(`click`,()=>W(e))}async function W(e){H(),I=e,N.value=e.id,M.value=``;let t=await u(e.id);P.innerHTML=`
      <div class="slot-selected" style="flex-direction: column; align-items: flex-start; gap: 4px;">
        <div style="display: flex; align-items: center; width: 100%;">
          <span>✓ ${d(e.prenom)} ${d(e.nom)}</span>
          <button type="button" id="deselect-eleve" aria-label="Changer">×</button>
        </div>
        <div style="font-size: 20px; font-weight: 800; color: #b02a37;">
          ${t>0?t+` h de retenue`:`Aucune retenue`}
        </div>
      </div>
    `,P.querySelector(`#deselect-eleve`).addEventListener(`click`,()=>{I=null,N.value=``,P.innerHTML=``,M.focus()})}function G(e){let t=f(e.trim());if(!t){P.innerHTML=``,H();return}if(z=F.filter(e=>e._nom.includes(t)||e._prenom.includes(t)||e._matricule.includes(t)),z.length===0){H(),P.innerHTML=`<div class="rech-vide-inc">Aucun élève trouvé.</div>`;return}if(z.length===1){H(),U(z[0],!1);return}H(),B=0;function n(){U(z[B%z.length],!0),B++}n(),R=setInterval(n,50)}M.addEventListener(`input`,e=>{I||(G(e.target.value),clearTimeout(L),L=setTimeout(()=>{H(),z.length>0&&!I&&U(z[0],!1)},800))}),j.addEventListener(`change`,async e=>{await V(e.target.value)}),w?(j.value=String(w.classeId),await V(w.classeId,w.id)):await V(j.value),_.querySelector(`#form-incident`).addEventListener(`submit`,async e=>{if(e.preventDefault(),!I){alert(`Veuillez sélectionner un élève.`);return}let t={eleveId:I.id,type:_.querySelector(`#f-type`).value,gravite:_.querySelector(`#f-gravite`).value,description:_.querySelector(`#f-description`).value,sanction:_.querySelector(`#f-sanction`).value};try{await c(t),g(_)}catch(e){alert(`Erreur : `+e.message)}});let K=_.querySelector(`#toggle-hist-incidents`);K&&K.addEventListener(`click`,()=>{A=!A;let e=_.querySelector(`#bloc-historique-incidents`);e.style.display=A?`block`:`none`,K.textContent=A?`👁️ Masquer`:`👁️ Afficher`}),_.querySelectorAll(`button[data-cloture]`).forEach(t=>{t.addEventListener(`click`,async()=>{try{await e(Number(t.dataset.cloture)),g(_)}catch(e){alert(`Erreur : `+e.message)}})})}export{g as render};