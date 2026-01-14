# 🌱 The Life Journal

**The Life Journal** is a digital life lessons platform where users can create, store, and share meaningful wisdom, reflections, and personal growth insights. It helps people preserve valuable life lessons, track learning progress, and explore wisdom shared by a growing community.

🔗 **Live Website:** https://the-life-journal-client.netlify.app/

## Admin Credentials

Use the following credentials to log in as an **Admin**:

* **Email:** `anamika@gmail.com`
* **Password:** `Anamika`

---

## 📌 Project Purpose

People often gain valuable lessons through experiences but forget them over time.  
**The Life Journal** provides a structured and mindful way to capture those lessons, reflect on personal growth, and learn from others in the community.

---

## 🚀 Key Features

- 🔐 **Authentication System**
  - Email & password login
  - Google authentication
  - Firebase authentication with protected routes

- 📝 **Life Lesson Management**
  - Create, update, delete life lessons
  - Public & private visibility control
  - Free & Premium access levels
  - Optional image upload for lessons

- ⭐ **Premium Subscription (Stripe Integration)**
  - One-time payment (৳1500 lifetime access)
  - Premium lessons creation & viewing
  - Stripe Checkout with success & cancel handling
  - Backend webhook to sync Premium status in MongoDB

- 🌍 **Public Lesson Browsing**
  - Search by keyword
  - Filter by category & emotional tone
  - Sort by newest or most saved
  - Pagination support
  - Premium lessons blurred for free users

- ❤️ **Engagement & Interaction**
  - Like & unlike lessons (real-time UI update)
  - Save lessons to Favorites
  - Comment system
  - Report inappropriate content
  - Social media sharing

---

## 🧑‍💻 User Dashboard

- Dashboard overview with analytics
- Add & manage personal lessons
- Update lesson visibility and access level
- Favorites management
- Profile management with Premium badge
- View all lessons created by the user

---

## 🛡️ Admin Dashboard

- Platform analytics overview
- User management (roles, activity)
- Lesson moderation
- Featured lesson control
- Reported lesson handling with action options
- Secure admin-only access

---

## 🧰 Technologies Used

### Frontend
- React
- React Router
- Tailwind CSS
- TanStack React Query
- Firebase Authentication
- Stripe Checkout
- Lottie React
- React Share

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- Stripe Webhooks
- JWT Token Verification

---

## 🔒 Security & Access Control

- Firebase Admin SDK token verification
- Role-based access (User / Admin)
- Only lesson owners or admins can edit/delete content
- MongoDB as the single source of truth for user plans

---

## 🎯 Additional Highlights

- Loading screen with animation
- Custom 404 page
- Responsive UI for all devices
- Clean and modern UI/UX
- Real-time UI updates without page reload

---

## 👩‍💻 Developer

**Sadia Ahmed Bushra**  

---

✨ *The Life Journal — Preserve Wisdom. Reflect. Grow.* ✨
