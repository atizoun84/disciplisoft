import{f as e,l as t}from"./index-Tfr_jfLG.js";var n=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function r(e){let t=new Date;if(e===`jour`){let e=new Date(t);return e.setHours(0,0,0,0),e.getTime()}if(e===`semaine`){let e=new Date(t),n=(e.getDay()+6)%7;return e.setDate(e.getDate()-n),e.setHours(0,0,0,0),e.getTime()}return e===`mois`?new Date(t.getFullYear(),t.getMonth(),1).getTime():e===`annee`?new Date(t.getFullYear(),0,1).getTime():0}async function i(n){let i=r(n),[a,o,s,c]=await Promise.all([t.incidents.toArray(),t.absences.toArray(),t.eleves.toArray(),e()]),l=a.filter(e=>new Date(e.date).getTime()>=i),u=o.filter(e=>new Date(e.date+`T00:00:00`).getTime()>=i),d={Faible:0,Moyenne:0,Grave:0};l.forEach(e=>{d[e.gravite]!=null&&d[e.gravite]++});let f={};l.forEach(e=>{f[e.type]=(f[e.type]||0)+1});let p=Object.entries(f).sort((e,t)=>t[1]-e[1]).slice(0,5),m={};l.forEach(e=>{m[e.eleveId]=(m[e.eleveId]||0)+1});let h=Object.fromEntries(s.map(e=>[e.id,e])),g=Object.entries(m).sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e,t])=>{let n=h[e];return{id:Number(e),nb:t,nom:n?`${n.prenom} ${n.nom}`:`Élève supprimé`}}),_=Object.fromEntries(c.map(e=>[e.id,e.nom])),v=Object.fromEntries(s.map(e=>[e.id,e.classeId])),y={};u.forEach(e=>{let t=v[e.eleveId];t!=null&&(y[t]=(y[t]||0)+1)});let b=Object.entries(y).sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e,t])=>({nom:_[e]||`?`,nb:t}));return{totalIncidents:l.length,totalAbsences:u.length,incidentsOuverts:l.filter(e=>e.statut===`ouvert`).length,parGravite:d,topTypes:p,topEleves:g,topClassesAbsences:b}}async function a(e){let t=new URLSearchParams(location.hash.split(`?`)[1]||``).get(`p`)||`mois`,r=await i(t),a=`
    <div class="carte">
      <div class="champ" style="margin-bottom:0;">
        <label>Période</label>
        <select id="sel-periode">
          <option value="jour"    ${t===`jour`?`selected`:``}>Aujourd'hui</option>
          <option value="semaine" ${t===`semaine`?`selected`:``}>Cette semaine</option>
          <option value="mois"    ${t===`mois`?`selected`:``}>Ce mois</option>
          <option value="annee"   ${t===`annee`?`selected`:``}>Cette année</option>
          <option value="tout"    ${t===`tout`?`selected`:``}>Tout l'historique</option>
        </select>
      </div>
    </div>`,o=r.topTypes.length===0?`<div class="vide" style="padding:14px;">Aucun incident sur cette période.</div>`:r.topTypes.map(([e,t])=>`
        <div class="ligne" style="justify-content:space-between;">
          <span>${n(e)}</span><strong>${t}</strong>
        </div>`).join(``),s=r.topEleves.length===0?`<div class="vide" style="padding:14px;">Aucun élève signalé.</div>`:r.topEleves.map(e=>`
        <div class="ligne" style="justify-content:space-between;">
          <a href="#/incidents?eleve=${e.id}" style="color:var(--vert);text-decoration:none;">${n(e.nom)}</a>
          <strong>${e.nb}</strong>
        </div>`).join(``),c=r.topClassesAbsences.length===0?`<div class="vide" style="padding:14px;">Aucune absence enregistrée.</div>`:r.topClassesAbsences.map(e=>`
        <div class="ligne" style="justify-content:space-between;">
          <span>${n(e.nom)}</span><strong>${e.nb}</strong>
        </div>`).join(``);e.innerHTML=`
    ${a}

    <h2 class="titre-section">Vue d'ensemble</h2>
    <div class="stat-grille">
      <div class="stat"><div class="valeur">${r.totalIncidents}</div><div class="libelle">Incidents</div></div>
      <div class="stat"><div class="valeur">${r.incidentsOuverts}</div><div class="libelle">Encore ouverts</div></div>
      <div class="stat"><div class="valeur">${r.totalAbsences}</div><div class="libelle">Absences</div></div>
      <div class="stat"><div class="valeur">${r.parGravite.Grave}</div><div class="libelle">Graves</div></div>
    </div>

    <h2 class="titre-section">Répartition par gravité</h2>
    <div class="carte">
      <div class="ligne" style="justify-content:space-between;"><span>Faible</span><span class="tag tag-gris">${r.parGravite.Faible}</span></div>
      <div class="ligne" style="justify-content:space-between;"><span>Moyenne</span><span class="tag tag-orange">${r.parGravite.Moyenne}</span></div>
      <div class="ligne" style="justify-content:space-between;"><span>Grave</span><span class="tag tag-rouge">${r.parGravite.Grave}</span></div>
    </div>

    <h2 class="titre-section">Types d'incidents les plus fréquents</h2>
    <div class="carte">${o}</div>

    <h2 class="titre-section">Élèves les plus signalés</h2>
    <div class="carte">${s}</div>

    <h2 class="titre-section">Classes avec le plus d'absences</h2>
    <div class="carte">${c}</div>
  `,e.querySelector(`#sel-periode`).addEventListener(`change`,e=>{location.hash=`#/stats?p=`+e.target.value})}export{a as render};