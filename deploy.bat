@echo off
echo 🚀 Starting deployment process...

set NODE_ENV=production

echo 📦 Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    exit /b 1
)

echo 📝 Preparing deployment files...
call npm run prepare-deploy
if errorlevel 1 (
    echo ❌ Prepare deploy failed!
    exit /b 1
)

echo 🌐 Deploying to GitHub Pages...
call npm run deploy
if errorlevel 1 (
    echo ❌ Deployment failed!
    exit /b 1
)

echo ✅ Deployment complete!
echo Your site should be live at: https://abrar-debug.github.io/abrar-portfolio/
pause

