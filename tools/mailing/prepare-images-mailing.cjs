// ============================================================================
//  Rapatrie et compresse les images du mailing dans public/images/mailing/
//  ---------------------------------------------------------------------------
//  Pourquoi : l'envoi passe de Mailchimp a Brevo. Les 7 photos vivaient dans le
//  compte Mailchimp de Chris (mcusercontent.com) et les 3 icones sociales sur le
//  CDN d'icones de Mailchimp. Le jour ou ce compte ferme, le mail se retrouve
//  avec des images cassees chez tous ceux qui l'ont recu. On les heberge donc
//  sur bilenekite.com, qui est sous notre controle.
//
//  Au passage on compresse : les 2 photos de logement faisaient 436 et 498 Ko
//  pour un affichage a 596px de large.
//
//  Regle de dimensionnement : 2x la largeur d'affichage dans le mail (ecrans
//  haute densite), plafonnee a 1200px. JPEG qualite 80, progressif.
//
//  Usage : node tools/mailing/prepare-images-mailing.cjs
//  Puis : deployer public/images/mailing/ en FTP avant d'envoyer la campagne.
// ============================================================================

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// racine du depot, deduite de l'emplacement du script (tools/mailing/)
const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(ROOT, 'public/images/mailing');
const MC = 'https://mcusercontent.com/e59b8a1d22b970250c6f537a3/images/';
const MC_ICON = 'https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/';

// nom final -> { source, largeur cible, type }
const JOBS = {
  // logo : PNG obligatoire, il est detoure (fond navy derriere)
  'logo-bkc.png':   { url: MC + 'b4077db5-d443-eb23-4560-bbdad35ed6f2.png', w: 400, png: true },
  // affichees a 660px
  'hero-lagon.jpg': { url: MC + '78fc88bb-17dd-3492-a5cf-4d7e6d38ade0.jpg', w: 1200 },
  // affichees a 596px
  'spot-cours.jpg': { url: MC + 'dbfb44f7-ebb5-80ce-3377-a2868fad4789.jpeg', w: 1192 },
  'maison.jpg':     { file: 'public/images/11-Accomodation/Palm_view.jpg', w: 1192 },
  'tablee.jpg':     { file: 'public/images/11-Accomodation/DJI.jpg', w: 1192 },
  // affichee a 260px
  'equipe.jpg':     { url: MC + '7372ee0e-0c02-cb57-1eac-1ef59dfb3690.jpeg', w: 520 },
  // affichees a 190px
  'safari.jpg':     { url: MC + 'b5b14e23-de3c-702f-9804-d22a9429b313.jpg', w: 400 },
  'braai.jpg':      { url: MC + 'b0ebd701-3d8d-3c18-2240-80b77fbf92b2.jpg', w: 400 },
  'paddle.jpg':     { url: MC + '1d4c0f34-63a2-b8e2-e7c0-b79fd99ddb69.jpg', w: 400 },
  // icones sociales : blanches, sur fond navy. On les recopie telles quelles.
  'ic-facebook.png':  { url: MC_ICON + 'facebook-outline-light-40.png', copy: true },
  'ic-instagram.png': { url: MC_ICON + 'instagram-outline-light-40.png', copy: true },
  'ic-website.png':   { url: MC_ICON + 'website-outline-light-40.png', copy: true },
};

async function grab(job) {
  if (job.file) return fs.readFileSync(path.join(ROOT, job.file));
  const res = await fetch(job.url);
  if (!res.ok) throw new Error(job.url + ' -> HTTP ' + res.status);
  return Buffer.from(await res.arrayBuffer());
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let before = 0, after = 0;

  for (const [name, job] of Object.entries(JOBS)) {
    const src = await grab(job);
    before += src.length;

    let out;
    if (job.copy) {
      out = src;                                   // icones : deja minuscules
    } else if (job.png) {
      out = await sharp(src).resize({ width: job.w, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true }).toBuffer();
    } else {
      out = await sharp(src).resize({ width: job.w, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true }).toBuffer();
    }

    fs.writeFileSync(path.join(OUT_DIR, name), out);
    after += out.length;
    const meta = await sharp(out).metadata();
    console.log(
      name.padEnd(19) +
      String(Math.round(src.length / 1024) + ' Ko').padStart(8) + ' -> ' +
      String(Math.round(out.length / 1024) + ' Ko').padStart(7) +
      '   ' + meta.width + 'x' + meta.height
    );
  }

  console.log('-'.repeat(56));
  console.log('total : ' + Math.round(before / 1024) + ' Ko -> ' + Math.round(after / 1024) + ' Ko' +
    '  (-' + Math.round((1 - after / before) * 100) + ' %)');
  console.log('ecrit dans ' + OUT_DIR);
})().catch(e => { console.error('ECHEC : ' + e.message); process.exit(1); });
