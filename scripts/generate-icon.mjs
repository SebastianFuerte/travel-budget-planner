import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assets = resolve(__dirname, '../assets');

// ── The V2 icon SVG (1024×1024) ──────────────────────────────────────────────
const iconSVG = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%"   stop-color="#312e81"/>
      <stop offset="50%"  stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="wingUp" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e0e7ff"/>
    </linearGradient>
    <linearGradient id="foldUp" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#a5b4fc"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="wingDn" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c7d2fe" stop-opacity="0.40"/>
    </linearGradient>
    <linearGradient id="foldDn" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="url(#bg)"/>

  <!-- Ambient glow -->
  <ellipse cx="490" cy="430" rx="380" ry="260" fill="#818cf8" opacity="0.10"/>

  <!-- Airplane (scaled 76%, centered) -->
  <g transform="translate(490,450) scale(0.76) translate(-490,-450)">
    <!-- Upper wing -->
    <path d="M840,280 L100,175 L290,480 Z" fill="url(#wingUp)"/>
    <!-- Upper inner fold -->
    <path d="M840,280 L435,225 L290,480 Z" fill="url(#foldUp)" opacity="0.92"/>
    <!-- Lower wing -->
    <path d="M840,280 L290,480 L340,836 Z" fill="url(#wingDn)"/>
    <!-- Lower inner fold -->
    <path d="M840,280 L290,480 L565,582 Z" fill="url(#foldDn)" opacity="0.70"/>
    <!-- Main spine -->
    <line x1="840" y1="280" x2="290" y2="480" stroke="white" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
    <!-- Upper crease -->
    <line x1="840" y1="280" x2="435" y2="225" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <!-- Lower crease -->
    <line x1="840" y1="280" x2="565" y2="582" stroke="#a5b4fc" stroke-width="5" stroke-linecap="round" opacity="0.4"/>
    <!-- Trailing edges -->
    <line x1="100" y1="175" x2="290" y2="480" stroke="white" stroke-width="3" opacity="0.20"/>
    <line x1="340" y1="836" x2="290" y2="480" stroke="#6366f1" stroke-width="3" opacity="0.30"/>
    <!-- Nose highlight -->
    <circle cx="840" cy="280" r="13" fill="white" opacity="0.95"/>
    <circle cx="840" cy="280" r="5"  fill="#c7d2fe"/>
  </g>

  <!-- Passport -->
  <g transform="translate(580,582)">
    <rect x="6" y="6" width="220" height="284" rx="22" fill="#000000" opacity="0.35"/>
    <rect x="0" y="0" width="220" height="284" rx="22" fill="#3730a3"/>
    <rect x="0" y="0" width="220" height="284" rx="22" fill="none" stroke="#818cf8" stroke-width="5" opacity="0.5"/>
    <rect x="0" y="0" width="32"  height="284" rx="16" fill="#4f46e5"/>
    <line x1="32" y1="0" x2="32" y2="284" stroke="#6366f1" stroke-width="2" opacity="0.6"/>
    <circle cx="126" cy="116" r="58" fill="none" stroke="#a5b4fc" stroke-width="6" opacity="0.85"/>
    <ellipse cx="126" cy="116" rx="22" ry="58" fill="none" stroke="#a5b4fc" stroke-width="4" opacity="0.5"/>
    <line x1="68"  y1="116" x2="184" y2="116" stroke="#a5b4fc" stroke-width="4" opacity="0.55"/>
    <line x1="80"  y1="84"  x2="172" y2="84"  stroke="#a5b4fc" stroke-width="2.5" opacity="0.3"/>
    <line x1="80"  y1="148" x2="172" y2="148" stroke="#a5b4fc" stroke-width="2.5" opacity="0.3"/>
    <text x="126" y="228" text-anchor="middle" font-size="60" font-weight="900"
          fill="#c7d2fe" font-family="Georgia,serif">P</text>
  </g>

  <!-- Dotted trail -->
  <path d="M225,468 Q 295,555 348,585 Q 400,613 412,665"
        fill="none" stroke="white" stroke-width="7"
        stroke-dasharray="12,17" stroke-linecap="round" opacity="0.22"/>
</svg>`;

// ── Splash SVG (2048×2048 — icon centered, colored background) ───────────────
const splashSVG = `<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sbg" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%"   stop-color="#312e81"/>
      <stop offset="50%"  stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="2048" height="2048" fill="url(#sbg)"/>
  <!-- Icon centered at 512×512 -->
  <g transform="translate(768, 768)">
    <svg width="512" height="512" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="wU2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e0e7ff"/>
        </linearGradient>
        <linearGradient id="fU2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="#a5b4fc"/>
          <stop offset="100%" stop-color="#6366f1"/>
        </linearGradient>
      </defs>
      <ellipse cx="490" cy="430" rx="380" ry="260" fill="#818cf8" opacity="0.10"/>
      <g transform="translate(490,450) scale(0.76) translate(-490,-450)">
        <path d="M840,280 L100,175 L290,480 Z" fill="url(#wU2)"/>
        <path d="M840,280 L435,225 L290,480 Z" fill="url(#fU2)" opacity="0.92"/>
        <path d="M840,280 L290,480 L340,836 Z" fill="white" opacity="0.52"/>
        <path d="M840,280 L290,480 L565,582 Z" fill="#818cf8" opacity="0.65"/>
        <line x1="840" y1="280" x2="290" y2="480" stroke="white" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
        <circle cx="840" cy="280" r="13" fill="white" opacity="0.95"/>
      </g>
      <g transform="translate(580,582)">
        <rect x="0" y="0" width="220" height="284" rx="22" fill="#3730a3"/>
        <rect x="0" y="0" width="32" height="284" rx="16" fill="#4f46e5"/>
        <circle cx="126" cy="116" r="58" fill="none" stroke="#a5b4fc" stroke-width="6" opacity="0.85"/>
        <text x="126" y="228" text-anchor="middle" font-size="60" font-weight="900" fill="#c7d2fe" font-family="Georgia,serif">P</text>
      </g>
    </svg>
  </g>
</svg>`;

// ── Favicon SVG (48×48) ──────────────────────────────────────────────────────
const faviconSVG = `<svg width="48" height="48" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#312e81"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="fwU" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e0e7ff"/>
    </linearGradient>
    <linearGradient id="ffU" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#a5b4fc"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#fbg)"/>
  <g transform="translate(490,450) scale(0.76) translate(-490,-450)">
    <path d="M840,280 L100,175 L290,480 Z" fill="url(#fwU)"/>
    <path d="M840,280 L435,225 L290,480 Z" fill="url(#ffU)" opacity="0.92"/>
    <path d="M840,280 L290,480 L340,836 Z" fill="white" opacity="0.52"/>
    <line x1="840" y1="280" x2="290" y2="480" stroke="white" stroke-width="16" stroke-linecap="round" opacity="0.9"/>
    <circle cx="840" cy="280" r="15" fill="white"/>
  </g>
</svg>`;

async function generate() {
  console.log('Generating icons...');

  // icon.png — 1024×1024
  await sharp(Buffer.from(iconSVG))
    .resize(1024, 1024)
    .png()
    .toFile(`${assets}/icon.png`);
  console.log('✓ icon.png (1024×1024)');

  // adaptive-icon.png — 1024×1024 (Android)
  await sharp(Buffer.from(iconSVG))
    .resize(1024, 1024)
    .png()
    .toFile(`${assets}/adaptive-icon.png`);
  console.log('✓ adaptive-icon.png (1024×1024)');

  // splash.png — 2048×2048
  await sharp(Buffer.from(splashSVG))
    .resize(2048, 2048)
    .png()
    .toFile(`${assets}/splash.png`);
  console.log('✓ splash.png (2048×2048)');

  // favicon.png — 48×48
  await sharp(Buffer.from(faviconSVG))
    .resize(48, 48)
    .png()
    .toFile(`${assets}/favicon.png`);
  console.log('✓ favicon.png (48×48)');

  console.log('\nAll icons generated successfully!');
}

generate().catch(console.error);
