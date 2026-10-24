import{f as e,l as t}from"./index-BINZa3fd.js";import{ouvrirFicheModal as n}from"./fiche-BCJxw-F1.js";var r=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),i=e=>(e||``).toString().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``);function a(e){let t={total:e.length,garcons:0,filles:0,redoublants:0,nouveaux:0,transferes:0,orphelinsPere:0,orphelinsMere:0,orphelinsComplets:0,handicapes:0,malades:0};return e.forEach(e=>{e.sexe===`M`?t.garcons++:e.sexe===`F`&&t.filles++,e.statutScolaire===`Redoublant`?t.redoublants++:e.statutScolaire===`Nouveau`?t.nouveaux++:e.statutScolaire===`Transféré`&&t.transferes++,e.statutSpecial===`Orphelin père`?t.orphelinsPere++:e.statutSpecial===`Orphelin de mère`?t.orphelinsMere++:e.statutSpecial===`Orphelin complet`?t.orphelinsComplets++:e.statutSpecial===`Handicapé`?t.handicapes++:e.statutSpecial===`Malade`&&t.malades++}),t}async function o(s){let[c,l,u]=await Promise.all([e(),t.eleves.toArray(),t.incidents.orderBy(`date`).reverse().limit(5).toArray()]),d=Object.fromEntries(c.map(e=>[e.id,e.nom])),f=l.map(e=>({...e,_nom:i(e.nom),_prenom:i(e.prenom),_matricule:i(e.matricule),_classeNom:d[e.classeId]||``})),p=Object.fromEntries(l.map(e=>[e.id,e])),m=u.map(e=>({...e,eleveNom:p[e.eleveId]?`${p[e.eleveId].prenom} ${p[e.eleveId].nom}`:`Élève supprimé`}));if(s.innerHTML=`
    <div class="accueil-recherche">
      <div class="recherche-box">
        <span class="recherche-ico">🔍</span>
        <input id="accueil-rech" type="search" placeholder="Rechercher un élève (nom, prénom, matricule)…" autocomplete="off" autocapitalize="off" spellcheck="false" />
        <button id="accueil-rech-effacer" class="recherche-effacer" style="display:none;" aria-label="Effacer">×</button>
      </div>
      <div id="accueil-rech-resultats"></div>
    </div>

    <h2 class="titre-section">Statistiques des élèves</h2>
    <div class="carte" style="margin-bottom:12px;">
      <div class="champ" style="margin-bottom:0;">
        <label>Filtrer par classe</label>
        <select id="accueil-filtre-classe"><option value="">— Tout l'établissement —</option>${c.map(e=>`<option value="${e.id}">${r(e.nom)}</option>`).join(``)}</select>
      </div>
    </div>
    <div id="accueil-stats-container"></div>

    <h2 class="titre-section">Derniers incidents</h2>
    <div id="accueil-incidents-container">
      ${m.length===0?`<div class="vide"><strong>Aucun incident</strong>La vie scolaire est calme.</div>`:m.map(e=>`
        <div class="carte">
          <div class="ligne"><span class="titre">${r(e.eleveNom)}</span><span class="tag ${e.gravite===`Grave`?`tag-rouge`:e.gravite===`Moyenne`?`tag-orange`:`tag-gris`}">${r(e.gravite)}</span></div>
          <div class="ligne sous-titre"><span>${r(e.type)} · ${new Date(e.date).toLocaleDateString(`fr-FR`)}</span></div>
        </div>`).join(``)}
    </div>

    <h2 class="titre-section">Actions rapides</h2>
    <div class="carte"><a class="btn btn-bloc btn-danger" href="#/incidents">⚠️ Signaler un incident</a></div>
    <div class="carte"><a class="btn btn-bloc btn-secondaire" href="#/eleves">👥 Gérer les élèves</a></div>
  `,!document.getElementById(`accueil-styles`)){let e=document.createElement(`style`);e.id=`accueil-styles`,e.textContent=`
      .accueil-recherche { margin-bottom: 18px; }
      .recherche-box { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 14px; padding: 12px 14px; box-shadow: 0 2px 8px rgba(0,0,0,.08); border: 1px solid #eef1f3; }
      .recherche-box:focus-within { border-color: #198754; box-shadow: 0 0 0 3px rgba(25,135,84,.15); }
      .recherche-ico { font-size: 16px; opacity: .6; }
      .recherche-box input { flex: 1; border: none; outline: none; background: transparent; font-size: 15px; font-family: inherit; color: #212529; }
      .recherche-effacer { border: none; background: #eef1f3; color: #495057; width: 24px; height: 24px; border-radius: 50%; font-size: 16px; line-height: 1; cursor: pointer; padding: 0; }
      
      #accueil-rech-resultats:not(:empty) { margin-top: 10px; }
      
      /* Styles pour la machine à sous */
      .slot-container { perspective: 1000px; }
      .slot-card { 
        display: flex; align-items: center; gap: 14px; background: #fff; padding: 16px; border-radius: 14px; 
        box-shadow: 0 4px 12px rgba(0,0,0,.1); border-left: 5px solid #198754; 
        transition: transform 0.1s, box-shadow 0.1s; cursor: pointer;
      }
      .slot-card:active { transform: scale(0.98); }
      .slot-card.spinning { 
        animation: slotSpin 0.08s linear infinite alternate; 
        filter: blur(0.5px); 
        border-left-color: #6c757d; 
        background: #f8f9fa;
      }
      .slot-avatar { width: 50px; height: 50px; border-radius: 50%; background: #d1e7dd; color: #0f5132; font-weight: 700; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;}
      .slot-info { flex: 1; }
      .slot-nom { font-weight: 700; font-size: 16px; color: #212529; }
      .slot-meta { font-size: 12px; color: #6c757d; margin-top: 3px; }
      
      .rech-vide { text-align: center; padding: 20px; color: #6c757d; font-size: 13px; background: #fff; border-radius: 12px; }
      .stat-detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eef1f3; font-size: 14px; }
      .stat-detail-row:last-child { border-bottom: none; }
      .stat-detail-row span { color: #495057; }
      .stat-detail-row strong { color: #0f5132; font-size: 15px; }
      .stat-detail-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .4px; color: #6c757d; margin: 14px 0 4px; }
      .stat-detail-title:first-child { margin-top: 0; }
      @keyframes slotSpin { 
        0% { transform: translateY(0); } 
        100% { transform: translateY(-2px); } 
      }
    `,document.head.appendChild(e)}let h=s.querySelector(`#accueil-stats-container`),g=s.querySelector(`#accueil-filtre-classe`);function _(){let e=g.value,t=a(e?l.filter(t=>t.classeId===Number(e)):l);h.innerHTML=`
      <div class="stat-grille" style="margin-bottom:10px;">
        <div class="stat"><div class="valeur">${t.total}</div><div class="libelle">Total élèves</div></div>
        <div class="stat"><div class="valeur">${t.garcons}</div><div class="libelle">Garçons</div></div>
        <div class="stat"><div class="valeur">${t.filles}</div><div class="libelle">Filles</div></div>
        <div class="stat"><div class="valeur">${t.redoublants}</div><div class="libelle">Redoublants</div></div>
      </div>
      <div class="carte"><div class="stat-detail-title">Statut scolaire</div><div class="stat-detail-row"><span>Nouveaux</span><strong>${t.nouveaux}</strong></div><div class="stat-detail-row"><span>Transférés</span><strong>${t.transferes}</strong></div><div class="stat-detail-row"><span>Redoublants</span><strong>${t.redoublants}</strong></div></div>
      <div class="carte"><div class="stat-detail-title">Cas particuliers</div><div class="stat-detail-row"><span>Orphelins de père</span><strong>${t.orphelinsPere}</strong></div><div class="stat-detail-row"><span>Orphelins de mère</span><strong>${t.orphelinsMere}</strong></div><div class="stat-detail-row"><span>Orphelins (père et mère)</span><strong>${t.orphelinsComplets}</strong></div><div class="stat-detail-row"><span>Handicapés</span><strong>${t.handicapes}</strong></div><div class="stat-detail-row"><span>Malades</span><strong>${t.malades}</strong></div></div>
    `}g.addEventListener(`change`,_),_();let v=s.querySelector(`#accueil-rech`),y=s.querySelector(`#accueil-rech-effacer`),b=s.querySelector(`#accueil-rech-resultats`),x=null,S=null,C=[],w=0;function T(){S&&clearInterval(S),S=null}function E(e,t){let i=((e.prenom[0]||``)+(e.nom[0]||``)).toUpperCase();b.innerHTML=`
      <div class="slot-container">
        <div class="slot-card ${t?`spinning`:``}" data-id="${e.id}">
          <div class="slot-avatar">
            ${e.photo?`<img src="${e.photo}" style="width:100%;height:100%;object-fit:cover;">`:r(i)}
          </div>
          <div class="slot-info">
            <div class="slot-nom">${r(e.prenom)} ${r(e.nom)}</div>
            <div class="slot-meta">${r(e._classeNom)} ${e.sexe?`· `+e.sexe:``} ${e.matricule?`· `+r(e.matricule):``}</div>
          </div>
          <div style="font-size:20px;color:#198754;">➔</div>
        </div>
      </div>
    `,t||b.querySelector(`.slot-card`).addEventListener(`click`,()=>{n(Number(e.id),()=>o(s))})}function D(e){let t=i(e.trim());if(!t){b.innerHTML=``,y.style.display=`none`,T();return}if(y.style.display=`block`,C=f.filter(e=>e._nom.includes(t)||e._prenom.includes(t)||e._matricule.includes(t)),C.length===0){T(),b.innerHTML=`<div class="rech-vide">Aucun élève trouvé.</div>`;return}if(C.length===1){T(),E(C[0],!1);return}T(),w=0;function n(){E(C[w%C.length],!0),w++}n(),S=setInterval(n,50)}v.addEventListener(`input`,e=>{D(e.target.value),clearTimeout(x),x=setTimeout(()=>{T(),C.length>0&&E(C[0],!1)},800)}),y.addEventListener(`click`,()=>{v.value=``,D(``),v.focus()})}export{o as render};