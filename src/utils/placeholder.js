const palettes = [
  ['#1d4ed8', '#06b6d4'],
  ['#0f766e', '#84cc16'],
  ['#7c3aed', '#ec4899'],
  ['#b45309', '#f59e0b'],
  ['#0f172a', '#334155'],
];

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function placeholderImage(prompt, size = '600/400') {
  const label = (prompt || 'Academy-1').split(', ')[0].trim();
  const [width, height] = size.split('/').map((value) => Number.parseInt(value, 10) || 600);
  const seed = hashString(label);
  const [from, to] = palettes[seed % palettes.length];
  const initials = label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  const isAvatar = Math.min(width, height) <= 300;
  const safeLabel = escapeXml(label.length > 44 ? `${label.slice(0, 44)}…` : label);
  const titleSize = Math.max(14, Math.round(Math.min(width, height) / 12));
  const metaSize = Math.max(12, Math.round(Math.min(width, height) / 18));
  const avatarSize = Math.max(48, Math.round(Math.min(width, height) * 0.32));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${from}"/>
        <stop offset="1" stop-color="${to}"/>
      </linearGradient>
      <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#grid)"/>
    <circle cx="${width * 0.8}" cy="${height * 0.2}" r="${Math.min(width, height) * 0.18}" fill="rgba(255,255,255,.14)"/>
    <circle cx="${width * 0.16}" cy="${height * 0.84}" r="${Math.min(width, height) * 0.24}" fill="rgba(0,0,0,.14)"/>
    ${isAvatar
      ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Inter, Arial, sans-serif" font-size="${avatarSize}" font-weight="700" opacity=".94">${escapeXml(initials)}</text>`
      : `<text x="30" y="${height - 30}" fill="white" font-family="Inter, Arial, sans-serif" font-size="${titleSize}" font-weight="700" opacity=".94">${safeLabel}</text>
         <text x="${width - 30}" y="44" text-anchor="end" fill="white" font-family="Inter, Arial, sans-serif" font-size="${metaSize}" opacity=".62">${escapeXml(initials)}</text>`}
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
