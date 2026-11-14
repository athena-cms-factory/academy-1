const o=[["#1d4ed8","#06b6d4"],["#0f766e","#84cc16"],["#7c3aed","#ec4899"],["#b45309","#f59e0b"],["#0f172a","#334155"]];function w(i){let n=0;for(let a=0;a<i.length;a+=1)n=(n<<5)-n+i.charCodeAt(a)|0;return Math.abs(n)}function r(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function u(i,n="600/400"){const a=(i||"Academy-1").split(", ")[0].trim(),[t,e]=n.split("/").map(l=>Number.parseInt(l,10)||600),c=w(a),[h,f]=o[c%o.length],s=a.split(/\s+/).filter(Boolean).slice(0,2).map(l=>l[0]).join("").toUpperCase(),p=Math.min(t,e)<=300,d=r(a.length>44?`${a.slice(0,44)}…`:a),m=Math.max(14,Math.round(Math.min(t,e)/12)),g=Math.max(12,Math.round(Math.min(t,e)/18)),$=Math.max(48,Math.round(Math.min(t,e)*.32)),x=`<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}" viewBox="0 0 ${t} ${e}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${h}"/>
        <stop offset="1" stop-color="${f}"/>
      </linearGradient>
      <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <circle cx="${t*.8}" cy="${e*.2}" r="${Math.min(t,e)*.18}" fill="rgba(255,255,255,.14)"/>
    <circle cx="${t*.16}" cy="${e*.84}" r="${Math.min(t,e)*.24}" fill="rgba(0,0,0,.14)"/>
    ${p?`<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Inter, Arial, sans-serif" font-size="${$}" font-weight="700" opacity=".94">${r(s)}</text>`:`<text x="30" y="${e-30}" fill="white" font-family="Inter, Arial, sans-serif" font-size="${m}" font-weight="700" opacity=".94">${d}</text>
         <text x="${t-30}" y="44" text-anchor="end" fill="white" font-family="Inter, Arial, sans-serif" font-size="${g}" opacity=".62">${r(s)}</text>`}
  </svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`}export{u as p};
