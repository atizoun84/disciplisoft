import{a as e,b as t,p as n,s as r,t as i,u as a}from"./index-B9oiGjyz.js";import{n as o,r as s,t as c}from"./toast-CyWqmPLT.js";var l=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function u(e){return e.includes(`	`)?`	`:e.includes(`;`)?`;`:(e.match(/,/g)||[]).length>=4?`,`:null}var d=e=>(e||``).replace(/^\uFEFF/,``).replace(/^["'\s]+|["'\s]+$/g,``).trim();function f(e,t){let n=e.split(t).map(e=>d(e).toLowerCase()),r={};return n.forEach((e,t)=>{e.includes(`matricule`)?r.matricule=t:e===`nom`||e.startsWith(`nom`)?r.nom=t:e.includes(`prenom`)||e.includes(`prénom`)?r.prenom=t:e===`sexe`?r.sexe=t:e.includes(`date`)&&e.includes(`naissance`)?r.dateNaissance=t:e.includes(`lieu`)&&e.includes(`naissance`)?r.lieuNaissance=t:e.includes(`classe`)?r.classe=t:(e.includes(`etablissement`)||e.includes(`établissement`))&&(r.etablissement=t)}),{map:r,cols:n}}function p(e){e=e.replace(/^\uFEFF/,``);let t=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(t.length<2)return{eleves:[],erreurs:[`Fichier vide.`]};let n=u(t[0]);if(!n)return{eleves:[],erreurs:[`Séparateur non détecté.`]};let{map:r,cols:i}=f(t[0],n),a=[];if(r.classe===void 0)return{eleves:[],erreurs:[`Colonne "classe" introuvable dans l'en-tête du fichier.`]};if(r.nom===void 0||r.prenom===void 0)return{eleves:[],erreurs:[`Colonnes "nom" ou "prenom" introuvables.`]};let o=[];for(let e=1;e<t.length;e++){let i=t[e].split(n).map(d),s=i[r.nom],c=i[r.prenom],l=i[r.classe];if(!s&&!c){a.push(`Ligne ${e+1} ignorée (nom vide).`);continue}if(!l||!l.trim()){a.push(`Ligne ${e+1} ignorée (classe vide).`);continue}let u=l.replace(/\s+/g,` `).trim();/^\d+(ère|nde|e|er)$/i.test(u)&&(u+=` M1`),o.push({matricule:i[r.matricule]||``,nom:s,prenom:c,sexe:(i[r.sexe]||``).toUpperCase().slice(0,1),dateNaissance:i[r.dateNaissance]||``,lieuNaissance:i[r.lieuNaissance]||``,classeNom:u})}return{eleves:o,erreurs:a,debug:{sep:n,map:r,enteteCols:i,nbLignes:t.length}}}function m(t){document.getElementById(`modal-import-global`)?.remove();let i=document.createElement(`div`);i.id=`modal-import-global`,i.innerHTML=`
    <div class="modal-overlay">
      <div class="modal-contenu">
        <div class="modal-entete" style="background: #b02a37;">
          <strong>Importation Globale (Tout l'établissement)</strong>
          <button class="modal-fermer" aria-label="Fermer">×</button>
        </div>
        <div class="modal-corps">
          <div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 8px; font-size: 13px; margin-bottom: 12px;">
            ⚠️ <strong>Attention :</strong> Cette action va créer toutes les classes manquantes et ajouter les élèves. Ne l'utilisez qu'une seule fois par année scolaire pour éviter les doublons.
          </div>
          <div class="champ">
            <label>Fichier CSV EducMaster (contenant la colonne "classe")</label>
            <input id="ig-fichier" type="file" accept=".csv,.txt" />
          </div>
          <button id="ig-analyser" class="btn btn-bloc btn-danger">Analyser le fichier</button>
          <div id="ig-resultat" style="margin-top:12px;"></div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(i);let a=document.createElement(`style`);a.textContent=`
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
    .modal-contenu { background: #fff; width: 100%; max-width: 720px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 14px 14px 0 0; overflow: hidden; }
    .modal-entete { color: #fff; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .modal-fermer { background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; }
    .modal-corps { padding: 16px; overflow-y: auto; }
    .apercu-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .apercu-table th, .apercu-table td { border: 1px solid #dee2e6; padding: 4px 6px; text-align: left; }
    .apercu-table th { background: #f1f3f5; font-weight: 700; }
  `,i.appendChild(a);let o=()=>i.remove();i.querySelector(`.modal-fermer`).addEventListener(`click`,o),i.querySelector(`.modal-overlay`).addEventListener(`click`,e=>{e.target.classList.contains(`modal-overlay`)&&o()});let s=i.querySelector(`#ig-resultat`),c=[];i.querySelector(`#ig-analyser`).addEventListener(`click`,async()=>{let a=i.querySelector(`#ig-fichier`).files[0];if(!a){alert(`Veuillez choisir un fichier.`);return}let u=p(await a.text());if(u.eleves.length===0){s.innerHTML=`<div class="vide">Aucun élève valide trouvé.<br><small>${u.erreurs.slice(0,3).join(`<br>`)}</small></div>`;return}c=u.eleves;let d=new Set(c.map(e=>e.classeNom));c.filter(e=>!e.classeNom||e.classeNom.trim()===``).length;let f=``;u.debug&&(f=`
        <div style="background: #fff3cd; border-radius: 8px; padding: 10px; margin-bottom: 10px; font-size: 11px; font-family: monospace;">
          <div><strong>🔍 Diagnostic :</strong></div>
          <div>Séparateur : <strong>${u.debug.sep===`	`?`TABULATION`:u.debug.sep}</strong></div>
          <div>Colonnes détectées : ${u.debug.enteteCols.length}</div>
          <div>→ matricule = index ${u.debug.map.matricule??`?`}</div>
          <div>→ nom = index ${u.debug.map.nom??`?`}</div>
          <div>→ prenom = index ${u.debug.map.prenom??`?`}</div>
          <div>→ classe = index <strong style="color:red;">${u.debug.map.classe??`?`}</strong></div>
        </div>
      `);let m={};c.forEach(e=>{m[e.classeNom]=(m[e.classeNom]||0)+1});let h=Object.entries(m).sort().map(([e,t])=>`<div style="display:flex; justify-content:space-between; padding: 2px 0; font-size: 12px;"><span>${l(e)}</span><strong>${t}</strong></div>`).join(``),g=c.slice(0,10).map(e=>`
      <tr>
        <td>${l(e.matricule)}</td>
        <td>${l(e.nom)}</td>
        <td>${l(e.prenom)}</td>
        <td style="${!e.classeNom||e.classeNom.trim()===``?`color: #b02a37; font-weight: bold;`:``}">${l(e.classeNom)||`(vide)`}</td>
      </tr>
    `).join(``);s.innerHTML=`
      ${f}
      <div class="sous-titre" style="margin-bottom:6px;">
        <strong>${c.length}</strong> élèves dans <strong>${d.size}</strong> classes.
      </div>
      <div style="background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 10px; max-height: 160px; overflow-y: auto;">
        <div style="font-weight: 700; margin-bottom: 6px; font-size: 12px;">Répartition par classe :</div>
        ${h}
      </div>
      <div style="overflow-x:auto;">
        <table class="apercu-table">
          <thead><tr><th>Matricule</th><th>Nom</th><th>Prénom</th><th>Classe</th></tr></thead>
          <tbody>${g}</tbody>
        </table>
      </div>
      <button id="ig-valider" class="btn btn-bloc btn-danger" style="margin-top:12px;">
        Lancer l'importation globale
      </button>
    `,i.querySelector(`#ig-valider`).addEventListener(`click`,async()=>{let a=i.querySelector(`#ig-valider`);a.disabled=!0,a.textContent=`Importation en cours…`;try{let i=await n(),s={};i.forEach(e=>s[e.nom.toLowerCase().trim()]=e.id);for(let t of d){let n=t.toLowerCase().trim();s[n]||(s[n]=await e(t))}let l={},u=0;if(c.forEach(e=>{if(!e.classeNom||e.classeNom.trim()===``){u++;return}let t=s[e.classeNom.toLowerCase().trim()];t?(l[t]||(l[t]=[]),l[t].push(e)):u++}),u>0&&!confirm(`${u} élève(s) sans classe valide seront ignorés. Continuer ?`)){a.disabled=!1,a.textContent=`Lancer l'importation globale`;return}for(let[e,t]of Object.entries(l))await r(t,Number(e));o(),alert(`Importation réussie : ${c.length} élèves dans ${d.size} classes.`),t&&t()}catch(e){alert(`Erreur : `+e.message),a.disabled=!1,a.textContent=`Réessayer`}})})}var h=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);async function g(e){let t=await a.params.get(e);return t?t.valeur:``}async function _(e,t){return a.params.put({cle:e,valeur:(t||``).trim()})}async function v(e){let[n,r,a,l]=await Promise.all([g(`etablissement`),g(`surveillant`),g(`annee`),g(`identiteVerrouillee`)]),u=l===`true`;e.innerHTML=`
    <h2 class="titre-section">Identité de l'établissement</h2>
    <form id="form-param" class="carte">
      <div class="champ">
        <label for="f-etab">Nom du CEG / collège</label>
        <input id="f-etab" type="text" value="${h(n)}"
               placeholder="Ex : CEG GAMIA" autocomplete="off"
               ${u?`readonly`:``}
               style="${u?`font-weight: 700; color: #001f5c; background: #f8f9fa;`:``}" />
      </div>
      <div class="champ">
        <label for="f-sg">Nom du surveillant général</label>
        <input id="f-sg" type="text" value="${h(r)}"
               placeholder="Ex : M. Kossi AGOSSOU" autocomplete="off"
               ${u?`readonly`:``}
               style="${u?`font-weight: 700; color: #001f5c; background: #f8f9fa;`:``}" />
      </div>
      <div class="champ">
        <label for="f-annee">Année scolaire</label>
        <input id="f-annee" type="text" value="${h(a)}"
               placeholder="Ex : 2026-2027" autocomplete="off"
               ${u?`readonly`:``}
               style="${u?`font-weight: 700; color: #001f5c; background: #f8f9fa;`:``}" />
      </div>
      <button type="submit" id="btn-action-param" class="btn btn-bloc ${u?`btn-danger`:``}">
        ${u?`🔒 Déverrouiller`:`Enregistrer les paramètres`}
      </button>
      ${u?`<div style="margin-top: 8px; font-size: 12px; color: #6c757d; text-align: center;">Les paramètres sont verrouillés. Cliquez sur « Déverrouiller » pour les modifier.</div>`:``}
    </form>

    <h2 class="titre-section">Importation Globale</h2>
    <div class="carte" style="border-left: 4px solid #b02a37;">
      <div class="sous-titre" style="margin-bottom:10px;">
        Importer la liste complète de tous les élèves de l'établissement en une seule fois depuis un fichier CSV.
        <strong>Les classes seront créées automatiquement.</strong>
      </div>
      <button id="btn-import-global" class="btn btn-bloc btn-danger">📥 Importer tous les élèves</button>
    </div>

    <h2 class="titre-section">Zone de danger</h2>
    <div class="carte" style="border: 2px solid #b02a37; background: #fff5f5;">
      <div class="ligne">
        <strong class="titre" style="color: #b02a37;">⚠️ Supprimer toutes les données</strong>
      </div>
      <div class="sous-titre" style="margin: 8px 0 12px; font-size: 13px; color: #6c757d;">
        Supprime <strong>définitivement</strong> toutes les classes, élèves, incidents, absences et heures de retenue.<br>
        Les paramètres (nom de l'établissement, année scolaire) sont conservés.<br>
        <em>Cette action est irréversible. Pensez à exporter avant !</em>
      </div>
      <button id="btn-tout-supprimer" class="btn btn-bloc btn-danger">🗑️ Tout supprimer</button>
    </div>

    <h2 class="titre-section">À propos</h2>
    <div class="carte">
      <div class="ligne"><strong class="titre">DiscipliSoft</strong><span class="tag tag-vert">v0.5</span></div>
      <div class="sous-titre" style="margin-top:6px;">
        Application de gestion de la vie scolaire pour surveillant général.<br>
        Fonctionne hors connexion. Les données restent sur votre appareil.
      </div>
    </div>
    <div class="carte">
      <div class="ligne"><span class="titre">Conception</span></div>
      <div class="sous-titre">
        Atizoun Plateny AMOUSSOU<br>
        ✉️ <a href="mailto:atizoun@gmail.com">atizoun@gmail.com</a><br>
        📞 <a href="tel:+2290197744035">01 97 74 40 35</a>
      </div>
    </div>
  `,e.querySelector(`#form-param`).addEventListener(`submit`,async t=>{t.preventDefault();try{if(u){await _(`identiteVerrouillee`,`false`),v(e);return}await Promise.all([_(`etablissement`,e.querySelector(`#f-etab`).value),_(`surveillant`,e.querySelector(`#f-sg`).value),_(`annee`,e.querySelector(`#f-annee`).value),_(`identiteVerrouillee`,`true`)]),await i(),s(`Paramètres enregistrés et verrouillés.`,{titre:`Paramètres enregistrés`}),v(e)}catch(e){c(`Erreur : `+e.message)}}),e.querySelector(`#btn-import-global`).addEventListener(`click`,()=>{m(()=>v(e))}),e.querySelector(`#btn-tout-supprimer`).addEventListener(`click`,async()=>{if(confirm(`⚠️ ATTENTION ⚠️

Vous êtes sur le point de SUPPRIMER TOUTES LES DONNÉES :
• Toutes les classes
• Tous les élèves
• Tous les incidents
• Toutes les heures de retenue

Cette action est IRRÉVERSIBLE.

Voulez-vous continuer ?`)){if(prompt(`Pour confirmer définitivement, tapez le mot : SUPPRIMER`)!==`SUPPRIMER`)o(`Suppression annulée.`,{duree:1500});else try{await t(),s(`Toutes les données ont été supprimées.
Vous pouvez maintenant réimporter proprement.`,{titre:`Suppression réussie`,duree:3e3}),v(e)}catch(e){c(`Erreur : `+e.message)}}})}export{v as render};