const fs = require('fs');
const path = require('path');

// Create .nojekyll file in out directory to prevent Jekyll processing
const outDir = path.join(process.cwd(), 'out');
const nojekyllPath = path.join(outDir, '.nojekyll');

if (fs.existsSync(outDir)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file in out directory');
} else {
  console.error('❌ out directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

