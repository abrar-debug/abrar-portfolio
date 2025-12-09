# GitHub Pages Deployment Script for Windows PowerShell

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Set production environment for GitHub Pages
$env:NODE_ENV = "production"

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Prepare deployment files
Write-Host "📝 Preparing deployment files..." -ForegroundColor Yellow
npm run prepare-deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prepare deploy failed!" -ForegroundColor Red
    exit 1
}

# Deploy to GitHub Pages
Write-Host "🌐 Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "Your site should be live at: https://abrar-debug.github.io/abrar-portfolio/" -ForegroundColor Cyan

