# korestili-backend

SEON AKADEMIY - O'quv markazi boshqaruv tizimi (Backend)

## 🚀 Texnologiyalar

- NestJS
- TypeORM
- SQLite (Development) / PostgreSQL (Production)
- Node.js

## 📦 O'rnatish

```bash
npm install
```

## 🏃‍♂️ Ishga tushirish

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Endpoints

- `POST /auth/login` - Login
- `POST /auth/register` - Registration
- `GET /students` - Talabalar ro'yxati
- `GET /teachers` - O'qituvchilar ro'yxati
- `GET /courses` - Kurslar ro'yxati
- `GET /payments` - To'lovlar ro'yxati
- `GET /attendance` - Davomat ro'yxati

## 👤 Demo Foydalanuvchilar

- Admin: `admin` / `admin123`
- Teacher: `teacher1` / `teacher123`
- Student: `student1` / `student123`

## 🔐 Rol asosida ruxsatlar

- **Admin**: Barcha amallar (Create, Read, Update, Delete)
- **Teacher**: Create, Read, Update (Delete yo'q)
- **Student**: Faqat Read (ko'rish)

## 📝 Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=sqlite://./oquv_markazi.db
```

## 🌐 Production Deploy

Render.com yoki Railway.app orqali deploy qilish mumkin.

---

**Muallif:** SEON AKADEMIY Team
