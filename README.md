# 🚀 ToDoGemini - AI-Powered Task Management Application

## 📋 Proje Özeti

Modern web teknolojileri ve yapay zeka entegrasyonu ile geliştirilmiş, kullanıcı dostu bir görev yönetim uygulaması.  
Google Gemini AI ile görev açıklamalarını otomatik olarak zenginleştiren, güvenli kimlik doğrulama sistemi ve responsive tasarıma sahip full-stack web uygulaması.

---

## 🛠 Teknoloji Stack

### 🔙 Backend

- **FastAPI** - Modern, hızlı web framework  
- **SQLAlchemy** - ORM ve veritabanı yönetimi  
- **SQLite** - Hafif ve etkili veritabanı  
- **Pydantic** - Veri doğrulama ve serialization  
- **JWT Authentication** - Güvenli kimlik doğrulama  
- **Google Gemini 2.0 Flash** - AI entegrasyonu  
- **LangChain** - AI model yönetimi

### 🎨 Frontend

- **Jinja2 Templates** - Server-side rendering  
- **Bootstrap 5** - Responsive UI framework  
- **Vanilla JavaScript (ES6+)**  
- **CSS3** - Custom animations & glassmorphism effects  
- **Google Fonts** - Typography

### ⚙️ DevOps & Tools

- **Uvicorn** - ASGI server  
- **Python Virtual Environment** - Bağımlılık yönetimi  
- **Git** - Versiyon kontrolü  

---

## ✨ Özellikler

### 🔐 Kimlik Doğrulama Sistemi

- Kullanıcı kayıt ve giriş sistemi  
- JWT tabanlı güvenlik  
- Cookie tabanlı session yönetimi  
- Otomatik oturum kapatma & token yenileme  

### 📝 Akıllı Görev Yönetimi

- CRUD işlemleri (Create, Read, Update, Delete)  
- Öncelik seviyesi belirleme (1-5)  
- Tamamlanma durumu takibi  
- **AI Destekli**: Google Gemini ile görev açıklamalarının otomatik zenginleştirilmesi  

### 🎨 Modern UI/UX Tasarım

- **Glassmorphism** tasarım dili  
- Gradient arka planlar ve blur efektleri  
- Responsive design (Mobile-first approach)  
- Akıcı animasyonlar ve hover efektleri  
- Gerçek zamanlı kullanıcı geri bildirimi ve yüklenme durumları  

### 🤖 AI Entegrasyonu

- **Google Gemini 2.0 Flash** ile Türkçe açıklama geliştirme  
- Kısa görev başlıklarını kapsamlı açıklamalara çevirme  
- Markdown → Plain text dönüştürme  
- 800 karakter sınırlı, optimize edilmiş AI cevapları  

---

## 🔧 API Endpoints

### 🔐 Authentication

```http
POST   /auth/create/user       - User registration  
POST   /auth/token             - Login & token generation  
GET    /auth/logout            - Secure logout  
GET    /todo/                  - List all user todos  
POST   /todo/todo              - Create new todo (with AI enhancement)  
GET    /todo/todo/{id}         - Get specific todo  
PUT    /todo/todo/{id}         - Update todo  
DELETE /todo/todo/{id}         - Delete todo  
GET    /todo/todo-page              - Main dashboard  
GET    /todo/add-todo-page          - Add todo form  
GET    /todo/edit-todo-page/{id}    - Edit todo form  
```
