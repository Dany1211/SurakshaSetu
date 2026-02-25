# 🛡️ SurakshaSetu
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

> **Empowering Resilience, Ensuring Safety.**  
> A state-of-the-art Command & Control interface for Mumbai's disaster mitigation and emergency response.

SurakshaSetu is a high-performance, real-time disaster management platform designed to help municipal authorities and emergency services monitor, plan, and respond to urban crises like floods, cyclones, and wildfires. Specifically tailored for the Mumbai geography, it leverages AI and GIS to save lives through data-driven decision-making.

---

## 🚀 Key Features

### 🛡️ Real-Time Risk Monitoring
Visualize ward-level vulnerability with live rainfall and river level tracking. Systems automatically escalate to "RED ALERT" during critical flood thresholds, triggering auditory and visual warnings across the command center.

### 🤖 AI-Powered Evacuation Planning
Utilizes **Gemini 2.5 Flash** to ingest real-time telemetry (rainfall, tide timing, resource availability) and generate strategic, operationally executable evacuation plans in English, Hindi, and Marathi.

### 🚒 Dynamic Resource Allocation
Live management of response fleets. Track the status and deployment of:
- **Buses** (Evacuation transport)
- **Boats** (Water rescue)
- **Ambulances** (Medical emergency)

### 🚨 Emergency Dispatch (SOS)
A centralized hub for handling SOS tickets. Operators can manage incoming requests, assign rescuers, and update ticket status in real-time, ensuring no call for help goes unanswered.

### 🗺️ GIS-Integrated Mapping
Interactive spatial visualization powered by **Leaflet**. Maps display flood zones, risky wards, and active evacuation routes, providing a comprehensive common operating picture (COP).

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [React 19](https://react.dev/) | Component-based UI architecture |
| **Build Tool** | [Vite](https://vitejs.dev/) | Blazing fast development and bundling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Modern, utility-first design system |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Cinematic UI transitions and interactions |
| **Backend/DB** | [Firebase](https://firebase.google.com/) | Real-time database (Firestore) & Authentication |
| **Intelligence** | [Google Gemini AI](https://ai.google.dev/) | Strategic plan generation via Gemini 2.5 Flash |
| **Mapping** | [Leaflet](https://leafletjs.com/) | Interactive GIS visualizations |

---

## 🏗️ Project Structure

```text
src/
├── components/      # Reusable UI elements (Navbar, Sidebar, Maps)
├── pages/           # Feature-specific views (Dashboard, Monitoring, Alerts)
├── services/        # API integrations (Firebase, Gemini AI)
├── utils/           # Helpers (Weather service, Translations)
├── hooks/           # Custom React hooks for data sync
└── context/         # Global state management (Language, Theme)
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Firebase project
- A Google AI Studio API Key (for Gemini)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/surkshasetu.git
   cd SurakshaSetu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_id
   VITE_GEMINI_API_KEY=your_gemini_key
   VITE_OWM_API_KEY=your_openweathermap_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

---

