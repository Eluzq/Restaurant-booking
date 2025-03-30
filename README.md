# 🍽️ Restaurant Booking site Australia - Restaurant Booking Platform
※This repositly was made previous GitHub account.

**Restaurant Booking site Australia** is a sophisticated and user-friendly restaurant booking platform designed specifically for the Australian market. It helps users effortlessly discover, explore, and book tables at Australia's finest restaurants. Powered by the Google Places API, it delivers comprehensive restaurant details, authentic user reviews, and a seamless reservation experience.

Built using modern web technologies, this project demonstrates strong frontend architecture, robust API integrations, responsive UI/UX design, and secure data management practices.

---

## ✨ Features

### 🔍 Restaurant Discovery
- Advanced search by location, cuisine type, price range, and ratings
- Curated collections and featured restaurants
- Interactive, intuitive user interface

### 📅 Reservation Management
- Easy table reservations with intuitive date, time, and guest selection
- Instant booking confirmations and email notifications
- Simple reservation management (view, modify, cancel)

### 👨‍🍳 Detailed Restaurant Profiles
- Extensive information with high-quality images and menus
- Real-time customer reviews and ratings
- Location details with integrated maps and direct contact options

### 🌙 Enhanced User Experience
- Fully responsive design optimized for all devices
- Dark/light mode support for user comfort
- Personalized recommendations based on user preferences

### 🔐 Security & Authentication
- Secure user authentication via Firebase Auth
- Protected API endpoints
- Secure data handling with encryption

---

## 🛠️ Tech Stack

| Layer                 | Technologies Used                                  |
|-----------------------|----------------------------------------------------|
| **Frontend**          | Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend/API**       | Next.js API Routes, Server Components              |
| **Authentication**    | Firebase Authentication                            |
| **Database**          | Firebase Firestore                                 |
| **External API**      | Google Places API                                  |
| **UI/UX**             | Responsive Design, Dark Mode, Animations           |
| **Deployment**        | Vercel                                             |
| **CI/CD**             | GitHub Actions                                     |
| **Documentation**     | Storybook                                          |

---

## ⚙️ Environment Variables

Create a `.env.local` file at the project's root with the following:

```env
# Google Places API
GOOGLE_PLACES_API_KEY=

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Application URL
NEXT_PUBLIC_APP_URL=
```

---

## 🚀 Quick Start

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/tablecheck-australia.git
cd tablecheck-australia
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
tablecheck-australia/
├── app/                # Next.js App Router structure
│   ├── api/            # API routes (Google Places, auth, reservations)
│   ├── (routes)/       # Application pages and layout
├── components/         # UI components (common & custom)
├── lib/                # Utility functions and external integrations
│   ├── firebase.ts     # Firebase setup
│   ├── google-places-api.ts # Google Places API integration
├── public/             # Static assets
├── .github/            # GitHub Actions workflows
├── .storybook/         # Storybook configuration
├── next.config.mjs     # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS setup
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

---

## 🌟 Key Features in Detail

### 🔎 Robust Restaurant Search
Advanced search capabilities enable precise restaurant discovery by various criteria, enhancing user satisfaction and ease of exploration.

### 📖 Comprehensive Profiles
Each restaurant profile provides detailed visuals, accurate menus, operational details, and authentic user feedback, improving decision-making for diners.

### 📆 Efficient Reservations
A simplified booking process with real-time slot availability ensures users can reserve easily and reliably, enhancing the overall user experience.

### 📱 Responsive Design
A fully responsive UI guarantees seamless performance across devices, ensuring accessibility anytime, anywhere.

### 🔒 Secure User Management
Robust security measures protect user data, with Firebase Authentication ensuring trusted user management.

---

## 📊 Analytics for Restaurant Owners
Owners benefit from insightful dashboards displaying reservation trends, customer demographics, and comparative venue performance to optimize their business.

---

## 🔄 Continuous Development
Regularly updated based on user feedback, the platform evolves continually, offering new features, security enhancements, and performance improvements.

---

## 📬 Contributions & Feedback
Your feedback and contributions are valuable! Please open issues, submit pull requests, or contact us directly.
Eluzq
---

## 📞 Contact
- GitHub: [Eluzq](https://github.com/eluzq)
- Email: [yukimukohara09@gmail.com](mailto:yukimukohara09@gmail.com)

---


