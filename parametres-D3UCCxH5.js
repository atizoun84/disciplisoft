import{f as e,i as t,l as n,o as r,t as i}from"./index-BINZa3fd.js";var a=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function o(e){return e.includes(`	`)?`	`:e.includes(`;`)?`;`:(e.match(/,/g)||[]).length>=4?`,`:null}var s=e=>(e||``).replace(/^["'\s]+|["'\s]+$/g,``).trim();function c(e){let t=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean);if(t.length===0)return{eleves:[],erreurs:[]};let n=0;t[0].toLowerCase().includes(`matricule`)&&(n=1);let r=o(t[n]||`,`),i=[],a=[];for(let e=n;e<t.length;e++){let n=t[e];if(!n)continue;let o=n.split(r).map(s);o.length<8||!o[1]||!o[7]?a.push(`Ligne ${e+1} ignorée (format incomplet).`):i.push({matricule:o[0],nom:o[1],prenom:o[2],sexe:(o[3]||``).toUpperCase().slice(0,1),dateNaissance:o[4],lieuNaissance:o[5],classeNom:o[7]})}return{eleves:i,erreurs:a}}function l(n){document.getElementById(`modal-import-global`)?.remove();let i=document.createElement(`div`);i.id=`modal-import-global`,i.innerHTML=`
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
  `,document.body.appendChild(i);let o=document.createElement(`style`);o.textContent=`
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.55); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
    .modal-contenu { background: #fff; width: 100%; max-width: 720px; max-height: 92vh; display: flex; flex-direction: column; border-radius: 14px 14px 0 0; overflow: hidden; }
    .modal-entete { color: #fff; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
    .modal-fermer { background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; }
    .modal-corps { padding: 16px; overflow-y: auto; }
    .apercu-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .apercu-table th, .apercu-table td { border: 1px solid #dee2e6; padding: 4px 6px; text-align: left; }
    .apercu-table th { background: #f1f3f5; font-weight: 700; }
  `,i.appendChild(o);let s=()=>i.remove();i.querySelector(`.modal-fermer`).addEventListener(`click`,s),i.querySelector(`.modal-overlay`).addEventListener(`click`,e=>{e.target.classList.contains(`modal-overlay`)&&s()});let l=i.querySelector(`#ig-resultat`),u=[];i.querySelector(`#ig-analyser`).addEventListener(`click`,async()=>{let o=i.querySelector(`#ig-fichier`).files[0];if(!o){alert(`Veuillez choisir un fichier.`);return}if(u=c(await o.text()).eleves,u.length===0){l.innerHTML=`<div class="vide">Aucun élève valide trouvé dans le fichier.</div>`;return}let d=new Set(u.map(e=>e.classeNom)),f=u.slice(0,10).map(e=>`
      <tr>
        <td>${a(e.matricule)}</td>
        <td>${a(e.nom)}</td>
        <td>${a(e.prenom)}</td>
        <td>${a(e.classeNom)}</td>
      </tr>
    `).join(``);l.innerHTML=`
      <div class="sous-titre" style="margin-bottom:6px;">
        <strong>${u.length}</strong> élèves détectés dans <strong>${d.size}</strong> classes.
      </div>
      <div style="overflow-x:auto;">
        <table class="apercu-table">
          <thead><tr><th>Matricule</th><th>Nom</th><th>Prénom</th><th>Classe</th></tr></thead>
          <tbody>${f}</tbody>
        </table>
      </div>
      <button id="ig-valider" class="btn btn-bloc btn-danger" style="margin-top:12px;">
        Lancer l'importation globale
      </button>
    `,i.querySelector(`#ig-valider`).addEventListener(`click`,async()=>{let a=i.querySelector(`#ig-valider`);a.disabled=!0,a.textContent=`Importation en cours…`;try{let i=await e(),a={};i.forEach(e=>a[e.nom.toLowerCase()]=e.id);for(let e of d){let n=e.toLowerCase();a[n]||(a[n]=await t(e))}let o={};u.forEach(e=>{let t=a[e.classeNom.toLowerCase()];o[t]||(o[t]=[]),o[t].push(e)});for(let[e,t]of Object.entries(o))await r(t,Number(e));s(),alert(`Importation réussie : ${u.length} élèves répartis dans ${d.size} classes.`),n&&n()}catch(e){alert(`Erreur : `+e.message),a.disabled=!1,a.textContent=`Réessayer`}})})}var u=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);async function d(e){let t=await n.params.get(e);return t?t.valeur:``}async function f(e,t){return n.params.put({cle:e,valeur:(t||``).trim()})}async function p(e){let[t,n,r]=await Promise.all([d(`etablissement`),d(`surveillant`),d(`annee`)]);e.innerHTML=`
    <h2 class="titre-section">Identité de l'établissement</h2>
    <form id="form-param" class="carte">
      <div class="champ">
        <label for="f-etab">Nom du CEG / collège</label>
        <input id="f-etab" type="text" value="${u(t)}"
               placeholder="Ex : CEG GAMIA" autocomplete="off" />
      </div>
      <div class="champ">
        <label for="f-sg">Nom du surveillant général</label>
        <input id="f-sg" type="text" value="${u(n)}"
               placeholder="Ex : M. Kossi AGOSSOU" autocomplete="off" />
      </div>
      <div class="champ">
        <label for="f-annee">Année scolaire</label>
        <input id="f-annee" type="text" value="${u(r)}"
               placeholder="Ex : 2026-2027" autocomplete="off" />
      </div>
      <button type="submit" class="btn btn-bloc">Enregistrer les paramètres</button>
    </form>

    <h2 class="titre-section">Importation Globale</h2>
    <div class="carte" style="border-left: 4px solid #b02a37;">
      <div class="sous-titre" style="margin-bottom:10px;">
        Importer la liste complète de tous les élèves de l'établissement en une seule fois depuis un fichier CSV.
        <strong>Les classes seront créées automatiquement.</strong>
      </div>
      <button id="btn-import-global" class="btn btn-bloc btn-danger">📥 Importer tous les élèves</button>
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
  `,e.querySelector(`#form-param`).addEventListener(`submit`,async t=>{t.preventDefault();try{await Promise.all([f(`etablissement`,e.querySelector(`#f-etab`).value),f(`surveillant`,e.querySelector(`#f-sg`).value),f(`annee`,e.querySelector(`#f-annee`).value)]),await i(),alert(`Paramètres enregistrés.`)}catch(e){alert(`Erreur : `+e.message)}}),e.querySelector(`#btn-import-global`).addEventListener(`click`,()=>{l(()=>p(e))})}export{p as render};