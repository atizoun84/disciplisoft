import{a as e,f as t,i as n,o as r,p as i,v as a}from"./index-BINZa3fd.js";var o=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function s(e){return e.includes(`	`)?`	`:e.includes(`;`)?`;`:e.includes(`|`)?`|`:(e.match(/,/g)||[]).length>=4?`,`:null}var c=e=>(e||``).replace(/^["'\s]+|["'\s]+$/g,``).trim();function l(e){e=e.trim();for(let t=1;t<e.length-1;t++){let n=e.charCodeAt(t-1),r=e.charCodeAt(t),i=e.charCodeAt(t+1);if((n>=65&&n<=90||n>=192&&n<=222)&&(r>=65&&r<=90||r>=192&&r<=222)&&(i>=97&&i<=122||i>=224&&i<=255))return{nom:e.slice(0,t).trim(),prenom:e.slice(t).trim()}}return{nom:e,prenom:``}}function u(e){let t=e.match(/^(\d+)?\s*(\d{10,15})\s*([A-Z\u00C0-\u00DE][A-Z\u00C0-\u00DE\sa-z\u00E0-\u00FF\-'.]*?)\s*([MF])\s*(\d{2}\/\d{2}\/\d{4})\s*(.+)$/);if(!t)return null;let{nom:n,prenom:r}=l(t[3]);return{matricule:t[2].trim(),nom:n,prenom:r,sexe:t[4].toUpperCase(),dateNaissance:t[5].trim(),lieuNaissance:c(t[6])}}function d(e){let t=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(t.length===0)return{eleves:[],erreurs:[`Aucune ligne.`],nomClasseDetecte:null};let n=null;for(let e=0;e<Math.min(t.length,5);e++){let r=t[e].match(/liste\s+des\s+élèves\s*[-–—:]\s*(.+)/i);if(r){n=r[1].replace(/\*/g,``).trim();break}}let r=0,i=t[0].toLowerCase();(i.includes(`matricule`)||i.includes(`nom`))&&(r=1);let a=s(t[r]||``),o=[],l=[];for(let e=r;e<t.length;e++){let n=t[e];if(!n||n.toLowerCase().includes(`liste des élèves`))continue;let r=null;if(a){let t=n.split(a).map(c),i=0;/^\d{1,3}$/.test(t[0])&&(i=1);let[o,s,u,d,f,p]=t.slice(i);if(!s){l.push(`Ligne ${e+1} : nom manquant.`);continue}r={matricule:o||``,nom:s||``,prenom:u||``,sexe:(d||``).toUpperCase().slice(0,1),dateNaissance:f||``,lieuNaissance:p||``}}else if(r=u(n),!r){l.push(`Ligne ${e+1} : format non reconnu.`);continue}r&&(r.nom||r.prenom)&&o.push(r)}return{eleves:o,erreurs:l,nomClasseDetecte:n}}function f(e,t,i){document.getElementById(`modal-import`)?.remove();let a=e.map(e=>`<option value="${e.id}" ${String(e.id)===String(t)?`selected`:``}>${o(e.nom)}</option>`).join(``),s=document.createElement(`div`);s.id=`modal-import`,s.innerHTML=`
    <div class="modal-overlay">
      <div class="modal-contenu">
        <div class="modal-entete">
          <strong>Importer des élèves</strong>
          <button class="modal-fermer" aria-label="Fermer">×</button>
        </div>
        <div class="modal-corps">
          <div class="champ">
            <label>Choisir une classe existante</label>
            <select id="import-classe"><option value="">— Nouvelle classe —</option>${a}</select>
          </div>
          <div class="champ">
            <label>Ou créer une nouvelle classe</label>
            <input id="import-nouvelle-classe" type="text" placeholder="Détecté automatiquement…" autocomplete="off" />
          </div>
          <div class="champ">
            <label>Coller le tableau (une ligne par élève)</label>
            <textarea id="import-texte" rows="6" placeholder="Séparez par tabulation, point-virgule ou virgule."></textarea>
          </div>
          <div class="champ">
            <label>Ou choisir un fichier CSV / TSV</label>
            <input id="import-fichier" type="file" accept=".csv,.tsv,.txt,text/plain" />
          </div>
          <button id="import-analyser" class="btn btn-bloc btn-secondaire">Analyser</button>
          <div id="import-resultat" style="margin-top:12px;"></div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(s);let c=document.createElement(`style`);c.textContent=`
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
    .modal-contenu { background: #fff; width: 100%; max-width: 720px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 14px 14px 0 0; overflow: hidden; }
    .modal-entete { background: #0f5132; color: #fff; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .modal-fermer { background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; }
    .modal-corps { padding: 16px; overflow-y: auto; }
    .apercu-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .apercu-table th, .apercu-table td { border: 1px solid #dee2e6; padding: 4px 6px; text-align: left; }
    .apercu-table th { background: #f1f3f5; font-weight: 700; }
  `,s.appendChild(c);let l=()=>s.remove();s.querySelector(`.modal-fermer`).addEventListener(`click`,l),s.querySelector(`.modal-overlay`).addEventListener(`click`,e=>{e.target.classList.contains(`modal-overlay`)&&l()});let u=s.querySelector(`#import-resultat`),f=s.querySelector(`#import-nouvelle-classe`),p=[];function m(t,a,c){p=t,c&&(f.value=c,s.querySelector(`#import-classe`).value=``);let d=t.slice(0,15).map(e=>`
      <tr>
        <td>${o(e.matricule)}</td>
        <td>${o(e.nom)}</td>
        <td>${o(e.prenom)}</td>
        <td>${o(e.sexe)}</td>
        <td>${o(e.dateNaissance)}</td>
        <td>${o(e.lieuNaissance)}</td>
      </tr>
    `).join(``),m=a.length?`<div style="color:var(--rouge);font-size:12px;margin-top:8px;">${a.length} ligne(s) ignorée(s).</div>`:``;u.innerHTML=`
      <div class="sous-titre" style="margin-bottom:6px;">
        <strong>${t.length}</strong> élève(s) détecté(s). Aperçu (max 15) :
        ${c?`<br><span style="color:var(--vert); font-weight:bold;">Classe détectée : ${o(c)}</span>`:``}
      </div>
      <div style="overflow-x:auto;">
        <table class="apercu-table">
          <thead><tr><th>Matricule</th><th>Nom</th><th>Prénom(s)</th><th>Sexe</th><th>Naissance</th><th>Lieu</th></tr></thead>
          <tbody>${d}</tbody>
        </table>
      </div>
      ${m}
      <button id="import-valider" class="btn btn-bloc" style="margin-top:12px;" ${t.length===0?`disabled`:``}>
        Importer ${t.length} élève(s)
      </button>
    `,s.querySelector(`#import-valider`)?.addEventListener(`click`,async()=>{let t=s.querySelector(`#import-classe`).value,a=f.value.trim();try{if(a){let r=e.find(e=>e.nom.toLowerCase()===a.toLowerCase());t=r?r.id:await n(a)}if(!t){alert(`Veuillez sélectionner une classe ou saisir un nom.`);return}await r(p,t),l(),alert(`Import terminé : ${p.length} élève(s) ajouté(s).`),i&&i()}catch(e){alert(`Erreur import : `+e.message)}})}s.querySelector(`#import-analyser`).addEventListener(`click`,()=>{let e=s.querySelector(`#import-texte`).value||``,t=d(e);t.eleves.length===0&&!e.trim()?u.innerHTML=`<div class="vide">Collez du texte ou choisissez un fichier.</div>`:m(t.eleves,t.erreurs,t.nomClasseDetecte)}),s.querySelector(`#import-fichier`).addEventListener(`change`,async e=>{let t=e.target.files[0];if(!t)return;let n=d(await t.text());m(n.eleves,n.erreurs,n.nomClasseDetecte)})}var p=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function m(){let e=location.hash,t=e.indexOf(`?`);return t===-1?``:new URLSearchParams(e.slice(t+1)).get(`classe`)||``}async function h(e,t){let n=t.find(t=>Number(t.id)===Number(e));if(!n)return;let r=await i(Number(e));document.getElementById(`modal-classe`)?.remove();let o=document.createElement(`div`);o.id=`modal-classe`;let s=r.length===0?`<div class="vide" style="padding:40px 20px;background:#fff;">
         <strong>Aucun élève</strong>Cette classe ne contient encore aucun élève.
       </div>`:r.map(e=>{let t=[e.matricule?`Matricule ${p(e.matricule)}`:null,e.sexe?e.sexe:null,e.dateNaissance?`Né(e) le ${p(e.dateNaissance)}`:null,e.lieuNaissance?`à ${p(e.lieuNaissance)}`:null].filter(Boolean).join(` · `);return`
          <div class="modal-eleve-item">
            <div class="modal-eleve-avatar">${p((e.prenom[0]||``)+(e.nom[0]||``)).toUpperCase()}</div>
            <div class="modal-eleve-info">
              <div class="modal-eleve-nom">${p(e.prenom)} ${p(e.nom)}</div>
              <div class="modal-eleve-details">${t||`—`}</div>
            </div>
            <button class="modal-eleve-suppr" data-suppr="${e.id}" aria-label="Supprimer">🗑</button>
          </div>`}).join(``);if(o.innerHTML=`
    <div class="modal-classe-overlay">
      <div class="modal-classe-contenu">
        <div class="modal-classe-entete">
          <div>
            <div class="modal-classe-titre">${p(n.nom)}</div>
            <div class="modal-classe-sous-titre">
              ${r.length} élève${r.length>1?`s`:``} inscrit${r.length>1?`s`:``}
            </div>
          </div>
          <button class="modal-classe-fermer" aria-label="Fermer">×</button>
        </div>
        <div class="modal-classe-corps">${s}</div>
        <div class="modal-classe-pied">
          <button class="btn btn-bloc" id="modal-classe-fermer-btn">Fermer</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(o),!document.getElementById(`modal-classe-styles`)){let e=document.createElement(`style`);e.id=`modal-classe-styles`,e.textContent=`
      @keyframes mcFade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes mcSlide { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .modal-classe-overlay {
        position: fixed; inset: 0;
        background: rgba(12, 20, 16, .62);
        backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        z-index: 100; display: flex; align-items: center; justify-content: center;
        padding: 16px; animation: mcFade .2s ease;
      }
      .modal-classe-contenu {
        background: #fff; width: 100%; max-width: 540px;
        max-height: 88vh; display: flex; flex-direction: column;
        border-radius: 18px; overflow: hidden;
        box-shadow: 0 24px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05);
        animation: mcSlide .28s cubic-bezier(.2,.7,.3,1);
      }
      .modal-classe-entete {
        background: linear-gradient(135deg, #0f5132 0%, #198754 100%);
        color: #fff; padding: 18px 20px;
        display: flex; align-items: center; justify-content: space-between;
        flex-shrink: 0;
        position: relative;
      }
      .modal-classe-entete::after {
        content: ''; position: absolute; left: 0; right: 0; bottom: 0;
        height: 3px; background: linear-gradient(90deg, #fcd116, #e8112d);
      }
      .modal-classe-titre { font-size: 18px; font-weight: 700; letter-spacing: .3px; }
      .modal-classe-sous-titre { font-size: 12px; opacity: .88; margin-top: 2px; }
      .modal-classe-fermer {
        background: rgba(255,255,255,.15); border: none; color: #fff;
        font-size: 22px; width: 36px; height: 36px; border-radius: 50%;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: background .15s, transform .1s;
        line-height: 1; padding: 0;
      }
      .modal-classe-fermer:active { background: rgba(255,255,255,.3); transform: scale(.95); }
      .modal-classe-corps { flex: 1; overflow-y: auto; background: #f8f9fa; }
      .modal-eleve-item {
        display: flex; align-items: center; gap: 12px;
        padding: 12px 18px; background: #fff;
        border-bottom: 1px solid #eef1f3;
        transition: background .12s;
      }
      .modal-eleve-item:active { background: #f1f3f5; }
      .modal-eleve-item:last-child { border-bottom: none; }
      .modal-eleve-avatar {
        width: 40px; height: 40px; border-radius: 50%;
        background: linear-gradient(135deg, #d1e7dd, #a3cfbb);
        color: #0f5132; font-weight: 700; font-size: 14px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .modal-eleve-info { flex: 1; min-width: 0; }
      .modal-eleve-nom { font-weight: 600; font-size: 14px; color: #212529; }
      .modal-eleve-details { font-size: 12px; color: #6c757d; margin-top: 2px; }
      .modal-eleve-suppr {
        background: transparent; border: 1px solid #f8d7da;
        color: #b02a37; padding: 7px 10px; border-radius: 8px;
        cursor: pointer; font-size: 14px; flex-shrink: 0;
        transition: background .12s;
      }
      .modal-eleve-suppr:active { background: #f8d7da; }
      .modal-classe-pied {
        padding: 12px 16px; border-top: 1px solid #eef1f3;
        background: #fff; flex-shrink: 0;
      }
    `,document.head.appendChild(e)}let c=()=>o.remove();o.querySelector(`.modal-classe-fermer`).addEventListener(`click`,c),o.querySelector(`#modal-classe-fermer-btn`).addEventListener(`click`,c),o.querySelector(`.modal-classe-overlay`).addEventListener(`click`,e=>{e.target.classList.contains(`modal-classe-overlay`)&&c()}),o.querySelectorAll(`.modal-eleve-suppr`).forEach(n=>{n.addEventListener(`click`,async()=>{let r=Number(n.dataset.suppr),i=n.closest(`.modal-eleve-item`).querySelector(`.modal-eleve-nom`).textContent;if(confirm(`Supprimer ${i} et tout son historique ?`))try{await a(r),c(),h(e,t)}catch(e){alert(`Erreur : `+e.message)}})})}async function g(n){let r=await t(),i=m();r.length===0?n.innerHTML=`
      <div class="vide">
        <strong>Aucune classe enregistrée</strong>
        Commencez par créer au moins une classe.
        <div style="margin-top:14px;">
          <a class="btn" href="#/classes">Créer une classe</a>
        </div>
      </div>`:(n.innerHTML=`
    <h2 class="titre-section">Ajouter un élève (manuel)</h2>
    <form id="form-eleve" class="carte">
      <div class="champ">
        <label>Classe</label>
        <select id="f-classe" required>${r.map(e=>`<option value="${e.id}">${p(e.nom)}</option>`).join(``)}</select>
      </div>
      <div class="champ">
        <label>Prénom(s)</label>
        <input id="f-prenom" type="text" required autocomplete="off" />
      </div>
      <div class="champ">
        <label>Nom</label>
        <input id="f-nom" type="text" required autocomplete="off" />
      </div>
      <div class="ligne" style="gap:8px;">
        <div class="champ" style="flex:1;">
          <label>Sexe</label>
          <select id="f-sexe">
            <option value="">—</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </div>
        <div class="champ" style="flex:1;">
          <label>Matricule</label>
          <input id="f-matricule" type="text" autocomplete="off" />
        </div>
      </div>
      <div class="champ">
        <label>Date de naissance (JJ/MM/AAAA)</label>
        <input id="f-naissance" type="text" placeholder="Ex : 11/07/2009" autocomplete="off" />
      </div>
      <div class="champ">
        <label>Lieu de naissance</label>
        <input id="f-lieu" type="text" autocomplete="off" />
      </div>
      <button type="submit" class="btn btn-bloc">Ajouter l'élève</button>
    </form>

    <h2 class="titre-section">Importer une liste d'élèves</h2>
    <div class="carte">
      <div class="sous-titre" style="margin-bottom:10px;">
        Importez un fichier <strong>CSV / TSV</strong> ou collez directement les lignes du tableau
        (une ligne par élève, séparateurs : tabulation, point-virgule ou virgule).<br>
        Colonnes reconnues : <em>Matricule, Nom, Prénom(s), Sexe, Date de naissance, Lieu de naissance</em>.
      </div>
      <button id="btn-import-eleves" class="btn btn-bloc btn-secondaire">📥 Importer depuis un fichier / texte</button>
    </div>

    <h2 class="titre-section">Voir les élèves d'une classe</h2>
    <div class="carte">
      <div class="champ" style="margin-bottom:0;">
        <label>Choisir une classe pour afficher la liste</label>
        <select id="sel-voir-classe">
          <option value="">— Sélectionner une classe —</option>
          ${r.map(e=>`<option value="${e.id}">${p(e.nom)}</option>`).join(``)}
        </select>
      </div>
    </div>
  `,n.querySelector(`#form-eleve`).addEventListener(`submit`,async t=>{t.preventDefault();let r={classeId:n.querySelector(`#f-classe`).value,prenom:n.querySelector(`#f-prenom`).value,nom:n.querySelector(`#f-nom`).value,matricule:n.querySelector(`#f-matricule`).value,sexe:n.querySelector(`#f-sexe`).value,dateNaissance:n.querySelector(`#f-naissance`).value,lieuNaissance:n.querySelector(`#f-lieu`).value};if(r.prenom.trim()&&r.nom.trim())try{await e(r),n.querySelector(`#f-prenom`).value=``,n.querySelector(`#f-nom`).value=``,n.querySelector(`#f-matricule`).value=``,n.querySelector(`#f-sexe`).value=``,n.querySelector(`#f-naissance`).value=``,n.querySelector(`#f-lieu`).value=``,alert(`Élève ajouté.`)}catch(e){alert(`Erreur : `+e.message)}}),n.querySelector(`#btn-import-eleves`).addEventListener(`click`,()=>{f(r,n.querySelector(`#f-classe`).value,()=>g(n))}),n.querySelector(`#sel-voir-classe`).addEventListener(`change`,e=>{let t=e.target.value;t&&(h(Number(t),r),e.target.value=``)}),i&&setTimeout(()=>h(Number(i),r),120))}export{g as render};