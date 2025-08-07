Here's your README content rewritten in **simple and clear everyday language**, while still keeping all technical accuracy and professionalism:

---

# Weather Trends – MindWebs Dashboard

This is a web-based dashboard built using **React (Next.js)** and **Leaflet**. It helps visualize hourly weather data—especially temperature—for a 30-day range (15 days before and after today's date). You can draw custom areas on the map using polygons, and the dashboard will fetch weather data for those areas using the **Open-Meteo API**.

---

##  What’s This Project About?

This project was built as part of my internship at **Mind Webs Ventures**. It includes:

* A **timeline slider** to pick any hour across 30 days.
* An interactive **map** where you can draw polygons to select areas.
* Fetching and showing **weather data** for drawn areas.
* Showing temperature info using **metric cards and charts**.
* Using the **Open-Meteo Archive API** to get past weather data.
* A smooth and **responsive interface** that works well on all devices.

---

##  How It Looks

> *You can add screenshots here: map view, slider, cards, graphs, etc.*

---

##  Key Features

###  Timeline Slider

* Lets you select time by the hour.
* Covers ±15 days around today's date.
* Easy drag and smooth transitions.

###  Map with Polygon Drawing

* Built using **Leaflet** and **react-leaflet**.
* Lets you draw custom areas (3–12 points).
* Keeps polygons even when you zoom or pan.

### Metric Cards & Charts

* Cards show temperature, rain, and more.
* Graphs change based on area and time selected.

###  Weather API Integration

* Uses the `https://archive-api.open-meteo.com`.
* Gets temperature at 2 meters above ground.
* Data based on the center point of drawn area.

---

##  Tech Used

| Technology              | What It's Used For                |
| ----------------------- | --------------------------------- |
| React + Next.js         | Building the web interface        |
| Leaflet + react-leaflet | Interactive map and drawing tools |
| Tailwind CSS            | Styling the UI                    |
| Chart.js / ApexCharts   | Showing data visually             |
| Open-Meteo API          | Getting weather data              |
| TypeScript              | Safer and cleaner code            |

---

##  How to Run This Project

### 1. Clone the Project

```bash
git clone https://github.com/vaishnavisandineni/mindwebs-weather-dashboard.git
cd mindwebs-weather-dashboard
```

### 2. Install Required Packages

```bash
npm install
```

> If you get errors related to `react-leaflet-draw`, try this:

```bash
npm install --legacy-peer-deps
```

### 3. Start the App Locally

```bash
npm run dev
```

> The app will be running at: `http://localhost:3000`

---

##  How to Deploy on Vercel

1. Push your code to GitHub.
2. Go to [https://vercel.com](https://vercel.com).
3. Click **“Import Project”** and connect your GitHub repo.
4. Set the framework as **Next.js**.
5. Click **Deploy**.
6. You’ll get a live link to your dashboard.

---

## 📁 Project Structure

```
/mindwebs-weather-dashboard
│
├── components/
│   ├── TimelineSlider.tsx
│   ├── WeatherMap.tsx
│   ├── PolygonDrawer.tsx
│   ├── MetricCards.tsx
│   └── Charts.tsx
│
├── pages/
│   └── index.tsx
│
├── public/
│   └── icons, images, etc.
│
├── styles/
│   └── globals.css
│
├── utils/
│   └── api.ts  ← handles API calls
│
├── .env         ← optional for config
└── README.md
```

---

##  Assignment Checklist

| Requirement                        | Status |
| ---------------------------------- | ------ |
| Timeline slider (±15 days, hourly) |  Done |
| Interactive map with Leaflet       |  Done |
| Polygon drawing (3–12 points)      |  Done |
| Weather data integration           |  Done |
| Metric cards & visualizations      |  Done |
| Time slider animation              |  Done |
| GitHub + Vercel Deployment         |  Done |

---

## 👩🏻 About Me

**Vaishnavi Sandineni**
B.Tech – Computer Science & Engineering
GitHub: [@vaishnavisandineni](https://github.com/vaishnavisandineni 

Email: vaishnavisandineni@gmail.com)

---

## 📄 License

This project is created only for learning and internship assignment purposes.

---
