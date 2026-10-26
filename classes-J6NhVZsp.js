import{S as e,a as t,p as n,u as r,v as i}from"./index-B9oiGjyz.js";async function a(){let[e,t,n,i]=await Promise.all([r.classes.toArray(),r.eleves.toArray(),r.incidents.toArray(),r.absences.toArray()]),a={application:`DiscipliSoft`,version:1,exporte_le:new Date().toISOString(),donnees:{classes:e,eleves:t,incidents:n,absences:i}},o=new Blob([JSON.stringify(a,null,2)],{type:`application/json`}),s=URL.createObjectURL(o),c=document.createElement(`a`),l=new Date().toISOString().slice(0,10);return c.href=s,c.download=`disciplisoft-sauvegarde-${l}.json`,document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(s),1e3),{classes:e.length,eleves:t.length,incidents:n.length,absences:i.length}}async function o(e){let t=await e.text(),n;try{n=JSON.parse(t)}catch{throw Error(`Fichier JSON invalide.`)}if(!n||n.application!==`DiscipliSoft`||!n.donnees)throw Error(`Ce fichier n’est pas une sauvegarde DiscipliSoft.`);let{classes:i=[],eleves:a=[],incidents:o=[],absences:s=[]}=n.donnees;return await r.transaction(`rw`,r.classes,r.eleves,r.incidents,r.absences,async()=>{await Promise.all([r.classes.clear(),r.eleves.clear(),r.incidents.clear(),r.absences.clear()]),i.length&&await r.classes.bulkAdd(i),a.length&&await r.eleves.bulkAdd(a),o.length&&await r.incidents.bulkAdd(o),s.length&&await r.absences.bulkAdd(s)}),{classes:i.length,eleves:a.length,incidents:o.length,absences:s.length}}var s=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),c=e=>e==null?`—`:e<1024?e+` o`:e<1048576?(e/1024).toFixed(1)+` Ko`:e<1073741824?(e/1048576).toFixed(1)+` Mo`:(e/1073741824).toFixed(2)+` Go`;async function l(e){return r.eleves.where(`classeId`).equals(e).count()}async function u(r){let d=await n(),f=await Promise.all(d.map(async e=>({...e,nbEleves:await l(e.id)}))),p=await e(),m=f.length===0?`<div class="vide"><strong>Aucune classe</strong>Ajoutez votre première classe pour commencer.</div>`:f.map(e=>`
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
       </div>`:``;r.innerHTML=`
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
  `,r.querySelector(`#form-classe`).addEventListener(`submit`,async e=>{e.preventDefault();let n=r.querySelector(`#nom-classe`).value.trim();if(n)try{await t(n),u(r)}catch(e){alert(`Erreur : `+e.message)}}),r.querySelectorAll(`button[data-suppr]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.suppr),n=e.closest(`.carte`).querySelector(`.titre`).textContent;if(confirm(`Supprimer la classe "${n}" et tous ses élèves ?\n\nCette action est irréversible.`))try{await i(t),u(r)}catch(e){alert(`Erreur : `+e.message)}})}),r.querySelector(`#btn-export`).addEventListener(`click`,async()=>{try{let e=await a();alert(`Sauvegarde créée :\n\n${e.classes} classes\n${e.eleves} élèves\n${e.incidents} incidents\n${e.absences} absences`)}catch(e){alert(`Erreur export : `+e.message)}});let g=r.querySelector(`#file-import`);r.querySelector(`#btn-import`).addEventListener(`click`,()=>g.click()),g.addEventListener(`change`,async()=>{let e=g.files[0];if(e){if(!confirm(`Cette action va remplacer TOUTES les données actuelles. Continuer ?`))g.value=``;else try{let t=await o(e);alert(`Restauration réussie :\n\n${t.classes} classes\n${t.eleves} élèves\n${t.incidents} incidents\n${t.absences} absences`),u(r)}catch(e){alert(`Erreur import : `+e.message)}finally{g.value=``}}})}export{u as render};