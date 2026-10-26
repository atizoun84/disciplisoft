const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["html2pdf-D1mj2fJu.js","rolldown-runtime-WkwZ5CU-.js","html2canvas-CiexIujh.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{_ as t,c as n,d as r,f as i,h as a,i as o,l as s,n as c,p as l,r as u,u as d}from"./index-B9oiGjyz.js";import{r as f}from"./toast-CyWqmPLT.js";var p=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),m=e=>{if(!e)return`—`;if(/^\d{2}\/\d{2}\/\d{4}$/.test(e)){let[t,n,r]=e.split(`/`);return`${t} / ${n} / ${r}`}try{let t=new Date(e);if(!isNaN(t.getTime()))return`${String(t.getDate()).padStart(2,`0`)} / ${String(t.getMonth()+1).padStart(2,`0`)} / ${t.getFullYear()}`}catch{}return e},h=e=>{if(!e)return`—`;try{return new Date(e).toLocaleDateString(`fr-FR`,{day:`2-digit`,month:`2-digit`,year:`numeric`})}catch{return e}},g=e=>e===`F`?`Féminin (F)`:e===`M`?`Masculin (M)`:`—`;async function _({eleve:t,classe:n,incidents:i=[],absences:a=[],etab:o,sg:s,annee:l}){if(!t){alert(`Aucun élève sélectionné.`);return}let u=i.reduce((e,t)=>e+r(t.sanction),0),d=i.filter(e=>e.sanction&&e.sanction.trim()).length,f=a.length,_=new Date().toLocaleDateString(`fr-FR`,{day:`2-digit`,month:`2-digit`,year:`numeric`}),v=`${t.prenom} ${t.nom}`,y=o||`Établissement`,b=`Aucun manquement à la discipline n'a été signalé à ce jour.`;i.length>0&&(b=i.filter(e=>e.gravite===`Grave`).length>0?`Attention : L'élève a fait l'objet de sanctions graves. Un suivi disciplinaire est nécessaire.`:`L'élève a fait l'objet de ${i.length} incident(s). Un dialogue avec l'élève et ses parents est recommandé.`);let x=i.length===0?`<tr><td colspan="4" class="vide">Aucune sanction enregistrée pour cet élève.</td></tr>`:i.map(e=>`
        <tr>
          <td>${h(e.date)}</td>
          <td>${p(e.type)}</td>
          <td>${e.sanction?p(e.sanction):`—`}</td>
          <td><span class="badge ${e.statut===`ouvert`?`ouvert`:`clos`}">${e.statut===`ouvert`?`Ouvert`:`Clos`}</span></td>
        </tr>`).join(``),S=a.length===0?`<tr><td colspan="4" class="vide">Aucune absence ou retard récent.</td></tr>`:a.slice(0,15).map(e=>`
        <tr>
          <td>${h(e.date)}</td>
          <td>Journée</td>
          <td>${e.type===`retard`?`Retard`:`Non justifié`}</td>
          <td>Non</td>
        </tr>`).join(``),C=`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>État de Discipline — ${p(v)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; font-size: 13px; line-height: 1.4; background: #f5f5f5; padding: 20px; }
  .barre { max-width: 800px; margin: 0 auto 16px; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }
  .barre button, .barre a { padding: 12px 20px; font-size: 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; }
  .btn-print { background: #0f5132; color: #fff; }
  .btn-pdf { background: #b02a37; color: #fff; }
  .doc { max-width: 800px; margin: 0 auto; background: #fff; padding: 30px; box-shadow: 0 2px 12px rgba(0,0,0,.1); }
  .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 15px; border-bottom: 2px solid #e0e0e0; margin-bottom: 20px; }
  .etab { font-size: 26px; font-weight: 800; color: #0a2540; margin-bottom: 4px; line-height: 1; }
  .sous-titre { font-size: 13px; color: #555; margin-bottom: 4px; }
  .contact { font-size: 12px; color: #555; }
  .header-droite { text-align: right; }
  .badge-titre { background: #0a2540; color: #fff; font-size: 14px; font-weight: 700; padding: 8px 16px; border-radius: 4px; letter-spacing: 1px; display: inline-block; }
  .annee { font-size: 12px; color: #0056b3; font-weight: 700; margin-top: 8px; }
  .identite { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 15px; padding: 16px 20px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px; }
  .champ { display: flex; flex-direction: column; }
  .champ.full { grid-column: span 3; margin-bottom: 5px; }
  .label { font-size: 10px; color: #6c757d; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 2px; font-weight: 600; }
  .valeur { font-size: 14px; color: #212529; font-weight: 500; }
  .nom-eleve { font-size: 22px; font-weight: 800; color: #0a2540; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }
  .stat { border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; }
  .stat-valeur { font-size: 30px; font-weight: 800; color: #111; line-height: 1; margin-bottom: 6px; }
  .stat-label { font-size: 10px; color: #6c757d; text-transform: uppercase; font-weight: 700; letter-spacing: .5px; }
  .section { margin-bottom: 25px; page-break-inside: avoid; }
  .section h2 { font-size: 15px; font-weight: 800; color: #111; text-transform: uppercase; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 2px solid #0056b3; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; border: 1px solid #e0e0e0; }
  th { background: #f0f4f8; color: #111; padding: 10px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; border: 1px solid #e0e0e0; }
  td { padding: 10px; border: 1px solid #e0e0e0; vertical-align: middle; }
  .vide { text-align: center; font-style: italic; color: #6c757d; padding: 16px; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 10px; font-weight: 700; }
  .badge.ouvert { background: #f8d7da; color: #b02a37; }
  .badge.clos { background: #d1e7dd; color: #0f5132; }
  .observation { display: flex; justify-content: space-between; gap: 30px; margin-top: 30px; page-break-inside: avoid; }
  .observation-gauche { flex: 1; }
  .label-bold { font-size: 11px; font-weight: 800; color: #555; text-transform: uppercase; margin-bottom: 8px; }
  .obs-texte { font-size: 13px; font-style: italic; color: #333; line-height: 1.5; }
  .observation-droite { text-align: right; min-width: 220px; }
  .lieu-date { font-size: 13px; margin-bottom: 12px; }
  .signature-titre { font-size: 13px; font-weight: 800; margin-bottom: 50px; }
  .signature-nom { font-size: 13px; font-weight: 700; color: #0056b3; }
  .footer { display: flex; justify-content: space-between; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 10px; color: #999; margin-top: 30px; }
  @media print {
    body { background: #fff; padding: 0; }
    .barre { display: none !important; }
    .doc { box-shadow: none; padding: 0; max-width: none; }
    @page { size: A4; margin: 12mm; }
  }
</style>
</head>
<body>
  <div class="barre">
    <button class="btn-print" onclick="window.print()">🖨️ Imprimer</button>
    <button class="btn-pdf" onclick="window.print()">📄 Enregistrer en PDF</button>
  </div>

  <div class="doc">
    <div class="header">
      <div>
        <div class="etab">${p(y)}</div>
        <div class="sous-titre">Vie Scolaire & Discipline des Élèves</div>
      </div>
      <div class="header-droite">
        <div class="badge-titre">ÉTAT DE DISCIPLINE</div>
        <div class="annee">ANNÉE SCOLAIRE ${p(l)||`2026-2027`}</div>
      </div>
    </div>

    <div class="identite">
      <div class="champ full">
        <span class="label">Nom & Prénom de l'élève</span>
        <span class="valeur nom-eleve">${p(v)}</span>
      </div>
      <div class="champ"><span class="label">Classe</span><span class="valeur">${p(n?.nom||`—`)}</span></div>
      <div class="champ"><span class="label">Sexe</span><span class="valeur">${g(t.sexe)}</span></div>
      <div class="champ"><span class="label">Matricule</span><span class="valeur">${p(t.matricule)||`—`}</span></div>
      <div class="champ"><span class="label">Date de naissance</span><span class="valeur">${m(t.dateNaissance)}</span></div>
      <div class="champ"><span class="label">Lieu de naissance</span><span class="valeur">${p(t.lieuNaissance)||`—`}</span></div>
    </div>

    <div class="stats">
      <div class="stat"><div class="stat-valeur">${i.length}</div><div class="stat-label">Incidents signalés</div></div>
      <div class="stat"><div class="stat-valeur">${u>0?u+` h`:`0 h`}</div><div class="stat-label">Total heures de retenue</div></div>
      <div class="stat"><div class="stat-valeur">${d}</div><div class="stat-label">Sanctions prononcées</div></div>
    </div>

    <div class="section">
      <h2>Historique des sanctions (${i.length})</h2>
      <table>
        <thead><tr><th style="width:15%">Date</th><th style="width:30%">Motif / Incident</th><th style="width:35%">Sanction retenue</th><th style="width:20%">Statut</th></tr></thead>
        <tbody>${x}</tbody>
      </table>
    </div>

    <div class="section">
      <h2>Absences & retards récents (${f})</h2>
      <table>
        <thead><tr><th style="width:20%">Date</th><th style="width:20%">Créneau</th><th style="width:40%">Motif déclaré</th><th style="width:20%">Justifiée</th></tr></thead>
        <tbody>${S}</tbody>
      </table>
    </div>

    <div class="observation">
      <div class="observation-gauche">
        <div class="label-bold">Observation globale du comportement</div>
        <div class="obs-texte">${b}</div>
      </div>
      <div class="observation-droite">
        <div class="lieu-date">Fait à ${p(y.replace(/CEG\s+/i,``))}, le <strong>${_}</strong></div>
        <div class="signature-titre">Le Surveillant Général</div>
        <div class="signature-nom">${p(s)||`____________________`}</div>
      </div>
    </div>

    <div class="footer">
      <div>DiscipliSoft — Gestion de la Vie Scolaire</div>
      <div>${p(y)} — Fiche de Discipline</div>
      <div>Page 1 / 1</div>
    </div>
  </div>
</body>
</html>`,w=null,T=null;try{w=document.createElement(`div`),w.style.cssText=`position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;`,w.textContent=`Génération du PDF…`,document.body.appendChild(w);let n=new DOMParser().parseFromString(C,`text/html`),r=n.querySelector(`style`).textContent;r=r.replace(/@media print\s*\{[\s\S]*?\}\s*\}/,``),r=r.replace(/(^|\})\s*([^{}]+)\{/g,(e,t,n)=>t+`
`+n.split(`,`).map(e=>(e=e.trim(),e===`body`?`#pdf-racine`:e===`*`?`#pdf-racine *`:`#pdf-racine `+e)).join(`, `)+` {`),r+=`
#pdf-racine .doc { box-shadow: none; padding: 0; max-width: none; width: 100%; }`;let i=document.createElement(`div`);i.style.cssText=`position:fixed;left:-10000px;top:0;`;let a=document.createElement(`div`);a.id=`pdf-racine`,a.style.cssText=`width:740px;padding:0;box-sizing:border-box;background:#fff;`,a.innerHTML=`<style>`+r+`</style>`+n.querySelector(`.doc`).outerHTML,i.appendChild(a),document.body.appendChild(i),T=i;let o=a,s=`fiche-${t.nom}-${t.prenom}-${new Date().toISOString().slice(0,10)}.pdf`.replace(/[\\/:*?"<>|]/g,``),{default:l}=await c(async()=>{let{default:t}=await import(`./html2pdf-D1mj2fJu.js`).then(t=>e(t.default,1));return{default:t}},__vite__mapDeps([0,1,2])),{default:u}=await c(async()=>{let{default:t}=await import(`./html2canvas-CiexIujh.js`).then(t=>e(t.default,1));return{default:t}},__vite__mapDeps([2,1])),d=await u(o,{scale:2,useCORS:!0,backgroundColor:`#ffffff`,width:740,windowWidth:740,scrollX:0,scrollY:0,onclone:e=>{let t=e.getElementById(`pdf-racine`)?.parentElement;t&&(t.style.cssText=`position:absolute;left:0;top:0;`)}});await l().set({margin:10,filename:s,image:{type:`jpeg`,quality:.98},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}}).from(d,`canvas`).save(),document.getElementById(`print-success-msg`)?.remove();let f=document.createElement(`div`);f.id=`print-success-msg`,f.innerHTML=`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,.75); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
        <div style="background: #fff; border-radius: 18px; padding: 28px 20px; width: 100%; max-width: 340px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.4); margin: auto;">
          <div style="font-size: 48px; margin-bottom: 12px; line-height: 1;">✅</div>
          <div style="font-size: 18px; font-weight: 800; color: #0f5132; margin-bottom: 8px;">Fiche prête !</div>
          <div style="font-size: 13px; color: #495057; line-height: 1.5; margin-bottom: 16px;">
            Le fichier <strong>${s}</strong> a été téléchargé.<br><br>
            Ouvrez-le depuis vos téléchargements pour l'imprimer ou l'enregistrer en PDF.
          </div>
          <button onclick="document.getElementById('print-success-msg').remove()" style="background: #0f5132; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; width: 100%;">Compris</button>
        </div>
      </div>
    `,document.body.appendChild(f)}catch(e){alert(`Erreur PDF : `+e.message)}finally{T&&T.remove(),w&&w.remove()}}var v=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),y=e=>{let t=new Date(e);return t.toLocaleDateString(`fr-FR`,{day:`2-digit`,month:`short`,year:`numeric`})+` · `+t.toLocaleTimeString(`fr-FR`,{hour:`2-digit`,minute:`2-digit`})},b=e=>e===`Grave`?`tag-rouge`:e===`Moyenne`?`tag-orange`:`tag-gris`;function x(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=e=>n(e),r.readAsDataURL(e)})}async function S(e,c){let p=await i(Number(e));if(!p){alert(`Élève introuvable.`);return}let[m,h,g,S]=await Promise.all([l(),a(p.id),d.absences.where(`eleveId`).equals(p.id).reverse().sortBy(`date`),d.params.toArray()]),C=m.find(e=>e.id===p.classeId),w=S.find(e=>e.cle===`etablissement`)?.valeur||``,T=S.find(e=>e.cle===`surveillant`)?.valeur||``,E=S.find(e=>e.cle===`annee`)?.valeur||``,D=h.reduce((e,t)=>e+r(t.sanction),0);if(!document.getElementById(`fiche-modale-styles`)){let e=document.createElement(`style`);e.id=`fiche-modale-styles`,e.textContent=`
      @keyframes fmFade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes fmSlide { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .fiche-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(12,20,16,.75); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 12px; box-sizing: border-box; animation: fmFade .2s ease; }
      .fiche-contenu { background: #fff; width: 100%; max-width: 620px; max-height: 95vh; display: flex; flex-direction: column; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,.4); animation: fmSlide .28s cubic-bezier(.2,.7,.3,1); margin: 0; position: relative; }
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

      /* Ancien CSS d'impression neutralisé — remplacé par printFiche.js */
      @media print { .fiche-overlay { display: none !important; } }
    `,document.head.appendChild(e)}let O=document.createElement(`div`);O.id=`fiche-modale`,O.className=`fiche-overlay`;let k=!1,A=!1;function j(){let e=h.length===0?`<div class="fiche-bloc" style="text-align:center;color:#6c757d;padding:20px;">Aucun incident enregistré.</div>`:h.map(e=>`
            <div class="fiche-incident ${e.gravite===`Grave`?`grave`:e.gravite===`Moyenne`?`moyenne`:`faible`}">
              <div class="fiche-incident-tete">
                <div>
                  <div class="fiche-incident-titre">${v(e.type)}</div>
                  <div class="fiche-incident-date">${y(e.date)}</div>
                </div>
                <span class="tag ${b(e.gravite)}">${v(e.gravite)}</span>
              </div>
              ${e.description?`<div class="fiche-incident-desc">« ${v(e.description)} »</div>`:``}
              ${e.sanction?`<div class="fiche-incident-sanction">Sanction : ${v(e.sanction)}${r(e.sanction)>0?` <span class="tag tag-rouge" style="font-size:10px;padding:1px 6px;">${r(e.sanction)} h</span>`:``}</div>`:``}
              <div class="fiche-incident-actions no-print">
                ${e.statut===`ouvert`?`<button class="btn btn-petit btn-secondaire" data-cloture="${e.id}">Clôturer</button>`:`<span class="tag tag-vert">Clos</span>`}
              </div>
            </div>`).join(``),i=g.length===0?`<div class="fiche-bloc" style="text-align:center;color:#6c757d;padding:16px;">Aucune absence.</div>`:`<div class="fiche-bloc">`+g.slice(0,10).map(e=>`
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eef1f3;font-size:13px;">
            <span>${v(e.date)}</span>
            <span class="tag ${e.type===`retard`?`tag-orange`:`tag-rouge`}">${v(e.type)}</span>
          </div>`).join(``)+`</div>`,l=``;p.statutScolaire&&p.statutScolaire!==`Normal`&&(l+=`<span class="tag tag-orange" style="margin-right:5px;">${v(p.statutScolaire)}</span>`),p.statutSpecial&&p.statutSpecial!==`Aucun`&&(l+=`<span class="tag tag-rouge">${v(p.statutSpecial)}</span>`),((p.prenom[0]||``)+(p.nom[0]||``)).toUpperCase();let d=``;d=A?`
        <form id="form-edit-eleve" class="fiche-bloc">
          <div class="champ" style="margin-bottom:8px;"><label>Prénom(s)</label><input type="text" id="edit-prenom" value="${v(p.prenom)}" required></div>
          <div class="champ" style="margin-bottom:8px;"><label>Nom</label><input type="text" id="edit-nom" value="${v(p.nom)}" required></div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Sexe</label>
              <select id="edit-sexe"><option value="">—</option><option value="M" ${p.sexe===`M`?`selected`:``}>M</option><option value="F" ${p.sexe===`F`?`selected`:``}>F</option></select>
            </div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Matricule</label><input type="text" id="edit-matricule" value="${v(p.matricule)}"></div>
          </div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Date Naiss.</label><input type="text" id="edit-naissance" value="${v(p.dateNaissance)}"></div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Lieu Naiss.</label><input type="text" id="edit-lieu" value="${v(p.lieuNaissance)}"></div>
          </div>
          <div class="ligne" style="gap:8px;">
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Statut Scolaire</label>
              <select id="edit-statut-scolaire">
                <option value="Normal" ${p.statutScolaire===`Normal`?`selected`:``}>Normal</option>
                <option value="Redoublant" ${p.statutScolaire===`Redoublant`?`selected`:``}>Redoublant</option>
                <option value="Nouveau" ${p.statutScolaire===`Nouveau`?`selected`:``}>Nouveau</option>
                <option value="Transféré" ${p.statutScolaire===`Transféré`?`selected`:``}>Transféré</option>
              </select>
            </div>
            <div class="champ" style="flex:1;margin-bottom:8px;"><label>Cas Particulier</label>
              <select id="edit-statut-special">
                <option value="Aucun" ${p.statutSpecial===`Aucun`?`selected`:``}>Aucun</option>
                <option value="Orphelin père" ${p.statutSpecial===`Orphelin père`?`selected`:``}>Orphelin de père</option>
                <option value="Orphelin mère" ${p.statutSpecial===`Orphelin mère`?`selected`:``}>Orphelin de mère</option>
                <option value="Orphelin complet" ${p.statutSpecial===`Orphelin complet`?`selected`:``}>Orphelin complet</option>
                <option value="Handicapé" ${p.statutSpecial===`Handicapé`?`selected`:``}>Handicapé</option>
                <option value="Malade" ${p.statutSpecial===`Malade`?`selected`:``}>Malade</option>
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
          ${l?`<div style="margin-bottom:10px;">${l}</div>`:``}
          <div class="fiche-infos">
            <div><span>Matricule</span><strong>${v(p.matricule)||`—`}</strong></div>
            <div><span>Sexe</span><strong>${v(p.sexe)||`—`}</strong></div>
            <div><span>Date de naissance</span><strong>${v(p.dateNaissance)||`—`}</strong></div>
            <div><span>Lieu de naissance</span><strong>${v(p.lieuNaissance)||`—`}</strong></div>
            <div style="grid-column: span 2; text-align: center; padding: 8px 0;"><span style="display:block; font-size: 12px;">Total heures de retenue</span><strong style="color: #b02a37; font-size: 26px; font-weight: 800; display: block; margin-top: 4px;">${D>0?D+` h`:`0 h`}</strong></div>
            <div><span>Incidents</span><strong>${h.length}</strong></div>
          </div>
        </div>
      `,O.innerHTML=`
      <div class="fiche-contenu">
        <div class="fiche-entete">
          <div class="fiche-avatar">
             ${p.photo?`<img src="${p.photo}" style="width:100%;height:100%;object-fit:cover;">`:`<svg viewBox="0 0 24 24" fill="currentColor" style="width:100%;height:100%;padding:8px;color:rgba(255,255,255,0.6);"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`}
          </div>
          <div class="fiche-titre-bloc">
            <div class="fiche-etab">${v(w)||`Établissement non configuré`}${E?` · `+v(E):``}</div>
            <div class="fiche-nom">${v(p.prenom)} ${v(p.nom)}</div>
            <div class="fiche-classe">${v(C?.nom||`—`)}</div>
          </div>
          <button class="fiche-fermer no-print" aria-label="Fermer">×</button>
        </div>

        <div class="fiche-corps">
          <h3 class="fiche-section-titre">
            Identité & Statuts
            ${A?``:`<button type="button" class="btn-toggle-hist no-print" id="btn-edit-infos">✏️ Modifier</button>`}
          </h3>
          ${d}

          <div class="no-print">
            <h3 class="fiche-section-titre">Nouvelle sanction / incident</h3>
            <form id="fiche-form" class="fiche-bloc">
              <div style="display:flex;gap:8px;">
                <div class="champ" style="flex:1;margin-bottom:8px;"><label>Type</label><select id="fiche-type">${o.map(e=>`<option value="${e}">${e}</option>`).join(``)}</select></div>
                <div class="champ" style="flex:1;margin-bottom:8px;"><label>Gravité</label><select id="fiche-gravite">${u.map(e=>`<option value="${e}" ${e===`Moyenne`?`selected`:``}>${e}</option>`).join(``)}</select></div>
              </div>
              <div class="champ" style="margin-bottom:8px;"><label>Description</label><textarea id="fiche-desc" rows="2" placeholder="Circonstances…"></textarea></div>
              <div class="champ" style="margin-bottom:8px;"><label>Sanction appliquée</label><input id="fiche-sanction" type="text" placeholder="Ex : 2h de retenue, TIG…" /></div>
              <button type="submit" class="btn btn-bloc btn-danger btn-petit">Enregistrer</button>
            </form>
          </div>

          <h3 class="fiche-section-titre">
            Historique des sanctions (${h.length})
            <button type="button" class="btn-toggle-hist no-print" id="toggle-hist">${k?`👁️ Masquer`:`👁 Afficher`}</button>
          </h3>
          <div id="bloc-historique" style="display: ${k?`block`:`none`};">${e}</div>

          <h3 class="fiche-section-titre">Absences récentes (${g.length})</h3>
          ${i}

          <div style="margin-top:24px;text-align:right;font-size:12px;color:#495057;line-height:1.8;">
            <div>Fait à ____________, le ${new Date().toLocaleDateString(`fr-FR`)}</div>
            <div style="margin-top:10px;">Le Surveillant Général</div>
            <div style="margin-top:34px;">${v(T)||`____________________`}</div>
          </div>
        </div>
      <div class="fiche-pied no-print">
          <button class="btn btn-secondaire" id="fiche-imprimer">🖨️ Imprimer</button>
          <button class="btn" id="fiche-fermer-bas">Fermer</button>
        </div>
      </div>
    `,O.querySelector(`.fiche-fermer`)?.addEventListener(`click`,M),O.querySelector(`#fiche-fermer-bas`)?.addEventListener(`click`,M),O.querySelector(`#fiche-imprimer`)?.addEventListener(`click`,()=>{try{_({eleve:p,classe:C,incidents:h,absences:g,etab:w,sg:T,annee:E})}catch(e){alert(`Erreur impression : `+e.message)}}),O.addEventListener(`click`,e=>{e.target===O&&M()}),O.querySelector(`#toggle-hist`).addEventListener(`click`,()=>{k=!k,j()}),A?(O.querySelector(`#btn-annuler-edit`).addEventListener(`click`,()=>{A=!1,j()}),O.querySelector(`#form-edit-eleve`).addEventListener(`submit`,async e=>{e.preventDefault();try{let e={prenom:O.querySelector(`#edit-prenom`).value,nom:O.querySelector(`#edit-nom`).value,sexe:O.querySelector(`#edit-sexe`).value,matricule:O.querySelector(`#edit-matricule`).value,dateNaissance:O.querySelector(`#edit-naissance`).value,lieuNaissance:O.querySelector(`#edit-lieu`).value,statutScolaire:O.querySelector(`#edit-statut-scolaire`).value,statutSpecial:O.querySelector(`#edit-statut-special`).value},n=O.querySelector(`#edit-photo`);n.files.length>0&&(e.photo=await x(n.files[0])),await t(p.id,e),p={...p,...e},A=!1,j(),c&&c()}catch(e){alert(`Erreur : `+e.message)}})):O.querySelector(`#btn-edit-infos`).addEventListener(`click`,()=>{A=!0,j()}),O.querySelector(`#fiche-form`).addEventListener(`submit`,async e=>{e.preventDefault();try{await n({eleveId:p.id,type:O.querySelector(`#fiche-type`).value,gravite:O.querySelector(`#fiche-gravite`).value,description:O.querySelector(`#fiche-desc`).value,sanction:O.querySelector(`#fiche-sanction`).value});let e=await a(p.id);h.length=0,e.forEach(e=>h.push(e)),j(),f(`Incident et sanction enregistrés.`,{titre:`Enregistré`,duree:2e3}),c&&c()}catch(e){alert(`Erreur : `+e.message)}}),O.querySelectorAll(`[data-cloture]`).forEach(e=>{e.addEventListener(`click`,async()=>{try{await s(Number(e.dataset.cloture));let t=await a(p.id);h.length=0,t.forEach(e=>h.push(e)),j(),c&&c()}catch(e){alert(`Erreur : `+e.message)}})})}function M(){O.remove(),document.getElementById(`fiche-modale`)?.remove()}document.getElementById(`fiche-modale`)?.remove(),document.body.appendChild(O),j()}async function C(e){let t=location.hash,n=t.indexOf(`?`),r=n===-1?null:Number(new URLSearchParams(t.slice(n+1)).get(`eleve`));e.innerHTML=`<p class="vide">Chargement…</p>`,r?(await S(r),location.hash=`#/recherche`):e.innerHTML=`<div class="vide"><strong>Aucun élève sélectionné</strong><div style="margin-top:12px;"><a class="btn" href="#/recherche">Rechercher un élève</a></div></div>`}export{S as ouvrirFicheModal,C as render};