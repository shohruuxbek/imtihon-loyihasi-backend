#!/bin/bash

# O'quv Markazi Deploy Script
# Bu script VPS serverga deploy qilish uchun

echo "🚀 O'quv Markazi Deploy Boshlandi..."

# 1. Server yangilash
echo "📦 Server yangilanmoqda..."
sudo apt update -y
sudo apt upgrade -y

# 2. Node.js o'rnatish (agar yo'q bo'lsa)
echo "🟢 Node.js o'rnatilmoqda..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js allaqachon o'rnatilgan"
fi

# 3. PM2 o'rnatish
echo "🔵 PM2 o'rnatilmoqda..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
else
    echo "✅ PM2 allaqachon o'rnatilgan"
fi

# 4. Nginx o'rnatish
echo "🌐 Nginx o'rnatilmoqda..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
else
    echo "✅ Nginx allaqachon o'rnatilgan"
fi

# 5. Loyihani papkaga joylash
echo "📁 Loyiha papkasi yaratilmoqda..."
sudo mkdir -p /var/www/oquv-markazi
sudo chown -R $USER:$USER /var/www/oquv-markazi

# 6. Backend sozlash
echo "⚙️ Backend sozlanmoqda..."
cd backend
npm install --production
npm run build

# Production .env fayl
if [ ! -f .env.production ]; then
    cp .env.example .env.production
    echo "⚠️ .env.production faylini to'ldiring!"
fi

# 7. Frontend sozlash
echo "⚙️ Frontend sozlanmoqda..."
cd ../frontend
npm install --production
npm run build

# 8. PM2 bilan backend ishga tushirish
echo "🔥 PM2 bilan backend ishga tushirilmoqda..."
cd ..
pm2 delete oquv-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 9. Nginx konfiguratsiyasi
echo "🔧 Nginx konfiguratsiyasi..."
sudo cp nginx.conf /etc/nginx/sites-available/oquv-markazi
sudo ln -sf /etc/nginx/sites-available/oquv-markazi /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx test va restart
sudo nginx -t
sudo systemctl restart nginx

# 10. Firewall sozlash
echo "🔒 Firewall sozlanmoqda..."
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
echo "y" | sudo ufw enable

echo ""
echo "✅ Deploy muvaffaqiyatli yakunlandi!"
echo ""
echo "📊 Foydali buyruqlar:"
echo "   PM2 logs: pm2 logs"
echo "   PM2 status: pm2 status"
echo "   Nginx status: sudo systemctl status nginx"
echo "   Backend restart: pm2 restart oquv-backend"
echo ""
echo "🌐 Sayt manzili: http://server-ip-manzili"
echo ""
