import{c as e,d as t,f as n,g as r,l as i,m as a,n as o,r as s,s as c,u as l}from"./index-Tfr_jfLG.js";var u=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),d=e=>{let t=new Date(e);return t.toLocaleDateString(`fr-FR`,{day:`2-digit`,month:`short`,year:`numeric`})+` · `+t.toLocaleTimeString(`fr-FR`,{hour:`2-digit`,minute:`2-digit`})},f=e=>e===`Grave`?`tag-rouge`:e===`Moyenne`?`tag-orange`:`tag-gris`;function p(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})}async function m(m,h){let g=await t(Number(m));if(!g){alert(`Élève introuvable.`);return}let[_,v,y,b]=await Promise.all([n(),a(g.id),i.absences.where(`eleveId`).equals(g.id).reverse().sortBy(`date`),i.params.toArray()]),x=_.find(e=>e.id===g.classeId),S=b.find(e=>e.cle===`etablissement`)?.valeur||``,C=b.find(e=>e.cle===`surveillant`)?.valeur||``,w=b.find(e=>e.cle===`annee`)?.valeur||``,T=v.reduce((e,t)=>e+l(t.sanction),0);if(!document.getElementById(`fiche-modale-styles`)){let e=document.createElement(`style`);e.id=`fiche-modale-styles`,e.textContent=`
      @keyframes fmFade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes fmSlide { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .fiche-overlay { position: fixed; inset: 0; background: rgba(12,20,16,.62); backdrop-filter: blur(4px); z-index: 110; display: flex; align-items: center; justify-content: center; padding: 16px; animation: fmFade .2s ease; }
      .fiche-contenu { background: #fff; width: 100%; max-width: 620px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,.4); animation: fmSlide .28s cubic-bezier(.2,.7,.3,1); }
      .fiche-entete { background: linear-gradient(135deg, #0f5132 0%, #198754 100%); color: #fff; padding: 22px 20px; position: relative; flex-shrink: 0; display: flex; align-items: center; gap: 12px; }
      .fiche-entete::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: linear-gradient(90deg, #fcd116, #e8112d); }
      .fiche-avatar { width: 90px; height: 90px; border-radius: 50%; background: rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0; overflow: hidden; border: 2px solid rgba(255,255,255,0.4); }
      .fiche-titre-bloc { flex: 1; min-width: 0; }
      .fiche-etab { font-size: 11px; opacity: .85; letter-spacing: .3px; }
      .fiche-nom { font-size: 18px; font-weight: 700; margin-top: 2px; line-height: 1.2; }
      .fiche-classe { font-size: 12px; opacity: .9; margin-top: 3px; }
      .fiche-fermer { background: rgba(255,255,255,.15); border: none; color: #fff; font-size: 22px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; line-height: 1; padding: 0; }
      .fiche-corps { flex: 1; overflow-y: auto; padding: 16px 18px; background: #f8f9fa; }
      .fiche-section-titre { font-size: 12px; font-weight: 700; color: #0f5132; text-transform: uppercase; letter-spacing: .4px; margin: 18px 0 8px; display: flex; justify-content: space-between; align-items: center;}
      .fiche-section-titre:first-child { margin-top: 0; }
      .fiche-bloc { background: #fff; border-radius: 10px; padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,.06); margin-bottom: 8px; }
      .fiche-infos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
      .fiche-infos > div { display: flex; flex-direction: column; }
      .fiche-infos span { font-size: 10px; color: #6c757d; text-transform: uppercase; letter-spacing: .3px; }
      .fiche-infos strong { font-size: 13px; color: #212529; margin-top: 1px; }
      .fiche-badge-ouvert { display: inline-block; padding: 2px 8px; border-radius: 20px; background: #f8d7da; color: #b02a37; font-size: 11px; font-weight: 700; margin-left: 6px; }
      .fiche-incident { background: #fff; border-radius: 10px; padding: 12px; margin-bottom: 8px; border-left: 3px solid #dee2e6; }
      .fiche-incident.grave { border-left-color: #b02a37; }
      .fiche-incident.moyenne { border-left-color: #cc7a00; }
      .fiche-incident.faible { border-left-color: #6c757d; }
      .fiche-incident-tete { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
      .fiche-incident-titre { font-weight: 600; font-size: 13px; color: #212529; }
      .fiche-incident-date { font-size: 11px; color: #6c757d; margin-top: 2px; }
      .fiche-incident-desc { font-size: 12px; color: #495057; margin-top: 6px; font-style: italic; }
      .fiche-incident-sanction { font-size: 12px; color: #cc7a00; margin-top: 6px; font-weight: 600; }
      .fiche-pied { padding: 12px 18px; border-top: 1px solid #eef1f3; background: #fff; flex-shrink: 0; display: flex; gap: 8px; }
      .fiche-pied .btn { flex: 1; }
      
      .btn-toggle-hist { background: #eef1f3; border: none; color: #495057; padding: 4px 8px; border-radius: 6px; font-size: 11px; cursor: pointer; text-transform: none; letter-spacing: 0;}

      @media print {
        @page { margin: 1cm; size: auto; }
        body { background: #fff !important; }
        .fiche-overlay { position: static !important; background: #fff !important; padding: 0 !important; backdrop-filter: none !important; display: block !important; }
        .fiche-contenu { max-width: none !important; max-height: none !important; box-shadow: none !important; border-radius: 0 !important; display: block !important; }
        .fiche-entete { background: #fff !important; color: #000 !important; padding: 0 0 10px 0 !important; border-bottom: 2px solid #0f5132 !important; display: flex; align-items: center; gap: 15px; }
        .fiche-entete::after { display: none !important; }
        .fiche-avatar { border: 1px solid #ccc !important; width: 80px; height: 80px; color: #000; }
        .fiche-etab { color: #333 !important; font-weight: bold; font-size: 14px;}
        .fiche-nom { color: #0f5132 !important; font-size: 22px; }
        .fiche-classe { color: #333 !important; font-size: 14px; }
        .fiche-fermer, .fiche-pied, .fiche-incident-actions, .btn-toggle-hist, form, .no-print, #btn-edit-infos { display: none !important; }
        .fiche-corps { padding: 0 !important; background: #fff !important; overflow: visible !important; }
        .fiche-bloc, .fiche-incident { box-shadow: none !important; border: 1px solid #dee2e6 !important; page-break-inside: avoid; margin-bottom: 6px; padding: 8px; }
        .fiche-section-titre { margin: 12px 0 6px; border-bottom: 1px solid #0f5132; padding-bottom: 2px; color: #0f5132 !important; }
        .fiche-infos span { color: #555 !important; }
      }
    `,document.head.appendChild(e)}let E=document.createElement(`div`);E.id=`fiche-modale`,E.className=`fiche-overlay`;let D=!1,O=!1;function k(){let t=v.length===0?`<div class="fiche-bloc" style="text-align:center;color:#6c757d;padding:20px;">Aucun incident enregistré.</div>`:v.map(e=>`
            <div class="fiche-incident ${e.gravite===`Grave`?`grave`:e.gravite===`Moyenne`?`moyenne`:`faible`}">
              <div class="fiche-incident-tete">
                <div>
                  <div class="fiche-incident-titre">${u(e.type)}</div>
                  <div class="fiche-incident-date">${d(e.date)}</div>
                </div>
                <span class="tag ${f(e.gravite)}">${u(e.gravite)}</span>
              </div>
              ${e.description?`<div class="fiche-incident-desc">« ${u(e.description)} »</div>`:``}
              ${e.sanction?`<div class="fiche-incident-sanction">Sanction : ${u(e.sanction)}${l(e.sanction)>0?` <span class="tag tag-rouge" style="font-size:10px;padding:1px 6px;">${l(e.sanction)} h</span>`:``}</div>`:``}
              <div class="fiche-incident-actions no-print">
                ${e.statut===`ouvert`?`<button class="btn btn-petit btn-secondaire" data-cloture="${e.id}">Clôturer</button>`:`<span class="tag tag-vert">Clos</span>`}
              </div>
            </div>`).join(``),n=y.length===0?`<div class="fiche-bloc" style="text-align:center;color:#6c757d;padding:16px;">Aucune absence.</div>`:`<div class="fiche-bloc">`+y.slice(0,10).map(e=>`
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eef1f3;font-size:13px;">
            <span>${u(e.date)}</span>
            <span class="tag ${e.type===`retard`?`tag-orange`:`tag-rouge`}">${u(e.type)}</span>
          </div>`).join(``)+`</div>`,i=``;g.statutScolaire&&g.statutScolaire!==`Normal`&&(i+=`<span class="tag tag-orange" style="margin-right:5px;">${u(g.statutScolaire)}</span>`),g.statutSpecial&&g.statutSpecial!==`Aucun`&&(i+=`<span class="tag tag-rouge">${u(g.statutSpecial)}</span>`),((g.prenom[0]||``)+(g.nom[0]||``)).toUpperCase();let m=``;m=O?`
        <form id="form-edit-eleve" class="fiche-bloc">
          <div class="champ" style="margin-bottom:8px;"><label>Prénom(s)</label><input type="text" id="edit-prenom" value="${u(g.prenom)}" required></div>
          <div class="champ" style="margin-bottom:8px;"><label>Nom</label><input type="text" id="edit-nom" value="${u(g.nom)}" required></div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Sexe</label>
              <select id="edit-sexe"><option value="">—</option><option value="M" ${g.sexe===`M`?`selected`:``}>M</option><option value="F" ${g.sexe===`F`?`selected`:``}>F</option></select>
            </div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Matricule</label><input type="text" id="edit-matricule" value="${u(g.matricule)}"></div>
          </div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Date Naiss.</label><input type="text" id="edit-naissance" value="${u(g.dateNaissance)}"></div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Lieu Naiss.</label><input type="text" id="edit-lieu" value="${u(g.lieuNaissance)}"></div>
          </div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Statut Scolaire</label>
              <select id="edit-statut-scolaire">
                <option value="Normal" ${g.statutScolaire===`Normal`?`selected`:``}>Normal</option>
                <option value="Redoublant" ${g.statutScolaire===`Redoublant`?`selected`:``}>Redoublant</option>
                <option value="Nouveau" ${g.statutScolaire===`Nouveau`?`selected`:``}>Nouveau</option>
                <option value="Transféré" ${g.statutScolaire===`Transféré`?`selected`:``}>Transféré</option>
              </select>
            </div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Cas Particulier</label>
              <select id="edit-statut-special">
                <option value="Aucun" ${g.statutSpecial===`Aucun`?`selected`:``}>Aucun</option>
                <option value="Orphelin père" ${g.statutSpecial===`Orphelin père`?`selected`:``}>Orphelin de père</option>
                <option value="Orphelin mère" ${g.statutSpecial===`Orphelin mère`?`selected`:``}>Orphelin de mère</option>
                <option value="Orphelin complet" ${g.statutSpecial===`Orphelin complet`?`selected`:``}>Orphelin complet</option>
                <option value="Handicapé" ${g.statutSpecial===`Handicapé`?`selected`:``}>Handicapé</option>
                <option value="Malade" ${g.statutSpecial===`Malade`?`selected`:``}>Malade</option>
              </select>
            </div>
          </div>
          <div class="champ" style="margin-bottom:8px;"><label>Photo (optionnel)</label><input type="file" id="edit-photo" accept="image/*"></div>
          <div class="ligne" style="gap:8px;">
            <button type="button" class="btn btn-secondaire btn-petit" id="btn-annuler-edit" style="flex:1;">Annuler</button>
            <button type="submit" class="btn btn-petit" style="flex:1;">Enregistrer</button>
          </div>
        </form>
      `:`
        <div class="fiche-bloc">
          ${i?`<div style="margin-bottom:10px;">${i}</div>`:``}
          <div class="fiche-infos">
            <div><span>Matricule</span><strong>${u(g.matricule)||`—`}</strong></div>
            <div><span>Sexe</span><strong>${u(g.sexe)||`—`}</strong></div>
            <div><span>Date de naissance</span><strong>${u(g.dateNaissance)||`—`}</strong></div>
            <div><span>Lieu de naissance</span><strong>${u(g.lieuNaissance)||`—`}</strong></div>
            <div style="grid-column: span 2; text-align: center; padding: 8px 0;"><span style="display:block; font-size: 12px;">Total heures de retenue</span><strong style="color: #b02a37; font-size: 26px; font-weight: 800; display: block; margin-top: 4px;">${T>0?T+` h`:`0 h`}</strong></div>
            <div><span>Incidents</span><strong>${v.length}</strong></div>
          </div>
        </div>
      `,E.innerHTML=`
      <div class="fiche-contenu">
        <div class="fiche-entete">
          <div class="fiche-avatar">
             ${g.photo?`<img src="${g.photo}" style="width:100%;height:100%;object-fit:cover;">`:`<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;padding:8px;color:rgba(255,255,255,0.6);"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}
          </div>
          <div class="fiche-titre-bloc">
            <div class="fiche-etab">${u(S)||`Établissement non configuré`}${w?` · `+u(w):``}</div>
            <div class="fiche-nom">${u(g.prenom)} ${u(g.nom)}</div>
            <div class="fiche-classe">${u(x?.nom||`—`)}</div>
          </div>
          <button class="fiche-fermer no-print" aria-label="Fermer">×</button>
        </div>

        <div class="fiche-corps">
          <h3 class="fiche-section-titre">
            Identité & Statuts
            ${O?``:`<button type="button" class="btn-toggle-hist no-print" id="btn-edit-infos">✏️ Modifier</button>`}
          </h3>
          ${m}

          <div class="no-print">
            <h3 class="fiche-section-titre">Nouvelle sanction / incident</h3>
            <form id="fiche-form" class="fiche-bloc">
              <div style="display:flex;gap:8px;">
                <div class="champ" style="flex:1;margin-bottom:8px;"><label>Type</label><select id="fiche-type">${s.map(e=>`<option value="${e}">${e}</option>`).join(``)}</select></div>
                <div class="champ" style="flex:1;margin-bottom:8px;"><label>Gravité</label><select id="fiche-gravite">${o.map(e=>`<option value="${e}" ${e===`Moyenne`?`selected`:``}>${e}</option>`).join(``)}</select></div>
              </div>
              <div class="champ" style="margin-bottom:8px;"><label>Description</label><textarea id="fiche-desc" rows="2" placeholder="Circonstances…"></textarea></div>
              <div class="champ" style="margin-bottom:8px;"><label>Sanction appliquée</label><input id="fiche-sanction" type="text" placeholder="Ex : 2h de retenue, TIG…" /></div>
              <button type="submit" class="btn btn-bloc btn-danger btn-petit">Enregistrer</button>
            </form>
          </div>

          <h3 class="fiche-section-titre">
            Historique des sanctions (${v.length})
            <button type="button" class="btn-toggle-hist no-print" id="toggle-hist">${D?`👁️ Masquer`:`👁 Afficher`}</button>
          </h3>
          <div id="bloc-historique" style="display: ${D?`block`:`none`};">${t}</div>

          <h3 class="fiche-section-titre">Absences récentes (${y.length})</h3>
          ${n}

          <div style="margin-top:24px;text-align:right;font-size:12px;color:#495057;line-height:1.8;">
            <div>Fait à ____________, le ${new Date().toLocaleDateString(`fr-FR`)}</div>
            <div style="margin-top:10px;">Le Surveillant Général</div>
            <div style="margin-top:34px;">${u(C)||`____________________`}</div>
          </div>
        </div>

        <div class="fiche-pied no-print">
          <button class="btn btn-secondaire" id="fiche-imprimer">🖨️ Imprimer</button>
          <button class="btn" id="fiche-fermer-bas">Fermer</button>
        </div>
      </div>
    `,E.querySelector(`.fiche-fermer`).addEventListener(`click`,A),E.querySelector(`#fiche-fermer-bas`).addEventListener(`click`,A),E.addEventListener(`click`,e=>{e.target===E&&A()}),E.querySelector(`#fiche-imprimer`).addEventListener(`click`,()=>{window.print()}),E.querySelector(`#toggle-hist`).addEventListener(`click`,()=>{D=!D,k()}),O?(E.querySelector(`#btn-annuler-edit`).addEventListener(`click`,()=>{O=!1,k()}),E.querySelector(`#form-edit-eleve`).addEventListener(`submit`,async e=>{e.preventDefault();try{let e={prenom:E.querySelector(`#edit-prenom`).value,nom:E.querySelector(`#edit-nom`).value,sexe:E.querySelector(`#edit-sexe`).value,matricule:E.querySelector(`#edit-matricule`).value,dateNaissance:E.querySelector(`#edit-naissance`).value,lieuNaissance:E.querySelector(`#edit-lieu`).value,statutScolaire:E.querySelector(`#edit-statut-scolaire`).value,statutSpecial:E.querySelector(`#edit-statut-special`).value},t=E.querySelector(`#edit-photo`);t.files.length>0&&(e.photo=await p(t.files[0])),await r(g.id,e),g={...g,...e},O=!1,k(),h&&h()}catch(e){alert(`Erreur : `+e.message)}})):E.querySelector(`#btn-edit-infos`).addEventListener(`click`,()=>{O=!0,k()}),E.querySelector(`#fiche-form`).addEventListener(`submit`,async e=>{e.preventDefault();try{await c({eleveId:g.id,type:E.querySelector(`#fiche-type`).value,gravite:E.querySelector(`#fiche-gravite`).value,description:E.querySelector(`#fiche-desc`).value,sanction:E.querySelector(`#fiche-sanction`).value});let e=await a(g.id);v.length=0,e.forEach(e=>v.push(e)),k(),h&&h()}catch(e){alert(`Erreur : `+e.message)}}),E.querySelectorAll(`[data-cloture]`).forEach(t=>{t.addEventListener(`click`,async()=>{try{await e(Number(t.dataset.cloture));let n=await a(g.id);v.length=0,n.forEach(e=>v.push(e)),k(),h&&h()}catch(e){alert(`Erreur : `+e.message)}})})}function A(){E.remove(),document.getElementById(`fiche-modale`)?.remove()}document.getElementById(`fiche-modale`)?.remove(),document.body.appendChild(E),k()}async function h(e){let t=location.hash,n=t.indexOf(`?`),r=n===-1?null:Number(new URLSearchParams(t.slice(n+1)).get(`eleve`));e.innerHTML=`<p class="vide">Chargement…</p>`,r?(await m(r),location.hash=`#/recherche`):e.innerHTML=`<div class="vide"><strong>Aucun élève sélectionné</strong><div style="margin-top:12px;"><a class="btn" href="#/recherche">Rechercher un élève</a></div></div>`}export{m as ouvrirFicheModal,h as render};