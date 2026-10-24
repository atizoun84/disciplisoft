import{_ as e,b as t,f as n,i as r,l as i}from"./index-Tfr_jfLG.js";async function a(){let[e,t,n,r]=await Promise.all([i.classes.toArray(),i.eleves.toArray(),i.incidents.toArray(),i.absences.toArray()]),a={application:`DiscipliSoft`,version:1,exporte_le:new Date().toISOString(),donnees:{classes:e,eleves:t,incidents:n,absences:r}},o=new Blob([JSON.stringify(a,null,2)],{type:`application/json`}),s=URL.createObjectURL(o),c=document.createElement(`a`),l=new Date().toISOString().slice(0,10);return c.href=s,c.download=`disciplisoft-sauvegarde-${l}.json`,document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3),{classes:e.length,eleves:t.length,incidents:n.length,absences:r.length}}async function o(e){let t=await e.text(),n;try{n=JSON.parse(t)}catch{throw Error(`Fichier JSON invalide.`)}if(!n||n.application!==`DiscipliSoft`||!n.donnees)throw Error(`Ce fichier n’est pas une sauvegarde DiscipliSoft.`);let{classes:r=[],eleves:a=[],incidents:o=[],absences:s=[]}=n.donnees;return await i.transaction(`rw`,i.classes,i.eleves,i.incidents,i.absences,async()=>{await Promise.all([i.classes.clear(),i.eleves.clear(),i.incidents.clear(),i.absences.clear()]),r.length&&await i.classes.bulkAdd(r),a.length&&await i.eleves.bulkAdd(a),o.length&&await i.incidents.bulkAdd(o),s.length&&await i.absences.bulkAdd(s)}),{classes:r.length,eleves:a.length,incidents:o.length,absences:s.length}}var s=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),c=e=>e==null?`—`:e<1024?e+` o`:e<1048576?(e/1024).toFixed(1)+` Ko`:e<1073741824?(e/1048576).toFixed(1)+` Mo`:(e/1073741824).toFixed(2)+` Go`;async function l(e){return i.eleves.where(`classeId`).equals(e).count()}async function u(i){let d=await n(),f=await Promise.all(d.map(async e=>({...e,nbEleves:await l(e.id)}))),p=await t(),m=f.length===0?`<div class="vide"><strong>Aucune classe</strong>Ajoutez votre première classe pour commencer.</div>`:f.map(e=>`
        <div class="carte">
          <div class="ligne">
            <span class="titre">${s(e.nom)}</span>
            <span class="tag tag-vert">${e.nbEleves} élève${e.nbEleves>1?`s`:``}</span>
          </div>
          <div class="ligne">
            <a class="btn btn-petit btn-secondaire" href="#/eleves?classe=${e.id}">Voir les élèves</a>
            <button class="btn btn-petit btn-danger" data-suppr="${e.id}">Supprimer</button>
          </div>
        </div>
      `).join(``),h=p?`<div class="sous-titre" style="margin-top:8px;">
         Espace utilisé : <strong>${c(p.usage)}</strong> sur ${c(p.quota)}
       </div>`:``;i.innerHTML=`
    <h2 class="titre-section">Ajouter une classe</h2>
    <form id="form-classe" class="carte">
      <div class="champ">
        <label for="nom-classe">Nom de la classe</label>
        <input id="nom-classe" type="text" placeholder="Ex : 6ème A, 5ème B…" required autocomplete="off" />
      </div>
      <button type="submit" class="btn btn-bloc">Ajouter la classe</button>
    </form>

    <h2 class="titre-section">Classes (${f.length})</h2>
    ${m}

    <h2 class="titre-section">Sauvegarde des données</h2>
    <div class="carte">
      <div class="ligne">
        <div class="titre" style="font-size:14px;">Exporter toutes les données</div>
      </div>
      <div class="sous-titre" style="margin-bottom:10px;">
        Crée un fichier <code>.json</code> téléchargeable à conserver sur ton téléphone, sur une carte SD ou à envoyer par mail.
      </div>
      <button id="btn-export" class="btn btn-bloc btn-secondaire">💾 Exporter maintenant</button>
      ${h}
    </div>

    <div class="carte">
      <div class="ligne">
        <div class="titre" style="font-size:14px;">Restaurer depuis un fichier</div>
      </div>
      <div class="sous-titre" style="margin-bottom:10px;">
        ⚠️ Écrase <strong>toutes</strong> les données actuelles par celles du fichier importé.
      </div>
      <input id="file-import" type="file" accept="application/json,.json" style="display:none" />
      <button id="btn-import" class="btn btn-bloc btn-danger">📂 Choisir un fichier de sauvegarde</button>
    </div>
  `,i.querySelector(`#form-classe`).addEventListener(`submit`,async e=>{e.preventDefault();let t=i.querySelector(`#nom-classe`).value.trim();if(t)try{await r(t),u(i)}catch(e){alert(`Erreur : `+e.message)}}),i.querySelectorAll(`button[data-suppr]`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=Number(t.dataset.suppr),r=t.closest(`.carte`).querySelector(`.titre`).textContent;if(confirm(`Supprimer la classe "${r}" et tous ses élèves ?\n\nCette action est irréversible.`))try{await e(n),u(i)}catch(e){alert(`Erreur : `+e.message)}})}),i.querySelector(`#btn-export`).addEventListener(`click`,async()=>{try{let e=await a();alert(`Sauvegarde créée :\n\n${e.classes} classes\n${e.eleves} élèves\n${e.incidents} incidents\n${e.absences} absences`)}catch(e){alert(`Erreur export : `+e.message)}});let g=i.querySelector(`#file-import`);i.querySelector(`#btn-import`).addEventListener(`click`,()=>g.click()),g.addEventListener(`change`,async()=>{let e=g.files[0];if(e){if(!confirm(`Cette action va remplacer TOUTES les données actuelles. Continuer ?`))g.value=``;else try{let t=await o(e);alert(`Restauration réussie :\n\n${t.classes} classes\n${t.eleves} élèves\n${t.incidents} incidents\n${t.absences} absences`),u(i)}catch(e){alert(`Erreur import : `+e.message)}finally{g.value=``}}})}export{u as render};