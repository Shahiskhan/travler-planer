import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Using new, reliable source URLs (Pexels/Unsplash directly via source.unsplash.com is deprecated/unreliable, using direct Unsplash IDs or Pexels)
// Actually, let's use some reliable solid placeholders if specific IDs fail, but let's try some known good Ones.
const images = [
    { url: "https://images.unsplash.com/photo-1569426330456-11f80df2438c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", name: "hero-bg.jpg" }, // Add query params explicitly
    { url: "https://images.unsplash.com/photo-1548115684-297c65ec7262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "hunza.jpg" },
    { url: "https://images.unsplash.com/photo-1627814886673-9366ebf67463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "swat.jpg" },
    { url: "https://images.unsplash.com/photo-1616894089761-125037d40379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "skardu.jpg" },
    { url: "https://images.unsplash.com/photo-1589802829985-817e51171b92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", name: "fairy-meadows.jpg" },
    { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", name: "hunza-small.jpg" }
];

const targetDir = path.join(__dirname, 'Frontend', 'src', 'landingPageImages');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                // Try a fallback if specific Unsplash fails - use Placehold.co for safety so app doesn't crash
                console.log(`Failed ${url}, using placeholder for ${path.basename(dest)}`);
                const placeholderUrl = `https://placehold.co/${url.includes('hero') ? '1920x1080' : '800x600'}/2563eb/FFF?text=${path.basename(dest, '.jpg')}`;
                https.get(placeholderUrl, (res) => {
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).on('error', (err) => {
                    fs.unlink(dest, () => { });
                    reject(err);
                });
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

async function downloadAll() {
    for (const img of images) {
        try {
            console.log(`Downloading ${img.name}...`);
            await download(img.url, path.join(targetDir, img.name));
            console.log(`Downloaded ${img.name}`);
        } catch (error) {
            console.error(`Error downloading ${img.name}:`, error.message);
        }
    }
}

downloadAll();
