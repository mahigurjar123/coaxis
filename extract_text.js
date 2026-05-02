const fs = require('fs');
const path = require('path');

const slidesDir = path.join(__dirname, 'scratch_pptx', 'ppt', 'slides');
const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.xml'));

let allText = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(slidesDir, file), 'utf8');
    const matches = content.match(/(?<=<a:t>).*?(?=<\/a:t>)/g);
    if (matches) {
        allText.push(`--- ${file} ---`);
        allText.push(...matches);
    }
});

fs.writeFileSync(path.join(__dirname, 'extracted_pitch_deck.txt'), allText.join('\n'));
console.log('Extraction complete. Check extracted_pitch_deck.txt');
