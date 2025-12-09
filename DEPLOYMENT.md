# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js portfolio to GitHub Pages.

## Prerequisites

- Node.js installed
- GitHub account
- Repository: `abrar-debug/abrar-portfolio`

## Deployment Steps

### 1. Install dependencies (if needed)

```bash
npm install
```

This will install `cross-env` which is needed for cross-platform environment variables.

### 2. Build the project for production

**Easy way (recommended):**
```bash
npm run build:prod
```

**Or manually:**
- Windows (PowerShell): `$env:NODE_ENV="production"; npm run build`
- Mac/Linux: `NODE_ENV=production npm run build`

### 3. Prepare deployment files

This will create the `.nojekyll` file needed for GitHub Pages:
```bash
npm run prepare-deploy
```

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the project in production mode
- Create `.nojekyll` file
- Deploy the `out` folder to the `gh-pages` branch

### 5. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **gh-pages** branch
5. Select **/ (root)** folder
6. Click **Save**

### 6. Access your site

Your site will be available at:
`https://abrar-debug.github.io/abrar-portfolio/`

## Troubleshooting

### Styles not loading?

1. Make sure `NODE_ENV=production` when building
2. Verify `basePath` and `assetPrefix` in `next.config.mjs` match your repository name
3. Check that `.nojekyll` file exists in the `out` directory
4. Clear browser cache and hard refresh (Ctrl+F5)

### Assets not loading?

- Ensure all paths use the base path `/abrar-portfolio/`
- Check browser console for 404 errors
- Verify `assetPrefix` is set correctly in `next.config.mjs`

## Quick Deploy Options

### Option 1: Single Command (Recommended)
```bash
npm run deploy:full
```

### Option 2: Use Deployment Scripts

**Windows PowerShell:**
```powershell
.\deploy.ps1
```

**Windows Command Prompt:**
```cmd
deploy.bat
```

### Option 3: Manual Steps
```bash
npm run build:prod
npm run prepare-deploy
npm run deploy
```

