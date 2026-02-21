const API_KEY = import.meta.env.VITE_OWM_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';

// Mumbai coordinates
const MUMBAI = { lat: 19.076, lon: 72.8777 };

// Ward/zone coordinates for rain data
const ZONE_COORDS = [
    { name: 'Andheri West', lat: 19.1365, lon: 72.8296 },
    { name: 'Dadar', lat: 19.0178, lon: 72.8478 },
    { name: 'Borivali', lat: 19.2307, lon: 72.8567 },
    { name: 'Kurla', lat: 19.0726, lon: 72.8845 },
    { name: 'Bandra East', lat: 19.0596, lon: 72.8505 },
    { name: 'Colaba', lat: 18.9067, lon: 72.8147 },
    { name: 'Sion', lat: 19.0436, lon: 72.8620 },
    { name: 'Malad', lat: 19.1874, lon: 72.8484 },
];

/**
 * Get current weather for Mumbai
 */
export async function fetchCurrentWeather() {
    try {
        const timeline = localStorage.getItem('SIMULATION_TIMELINE');

        if (timeline === 'critical') {
            return {
                temp: 26, feelsLike: 26, humidity: 95, wind: 55,
                description: 'extremely heavy rain', icon: 'Rain',
                rain1h: 120, rain3h: 350, clouds: 100, visibility: 2,
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }),
                isRaining: true,
            };
        } else if (timeline === 'escalating') {
            return {
                temp: 28, feelsLike: 30, humidity: 85, wind: 35,
                description: 'moderate rain', icon: 'Rain',
                rain1h: 15, rain3h: 40, clouds: 90, visibility: 5,
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }),
                isRaining: true,
            };
        }

        const res = await fetch(
            `${BASE}/weather?lat=${MUMBAI.lat}&lon=${MUMBAI.lon}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        return {
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6), // m/s → km/h
            description: data.weather[0]?.description || '',
            icon: data.weather[0]?.main || 'Clear',
            rain1h: data.rain?.['1h'] || 0,
            rain3h: data.rain?.['3h'] || 0,
            clouds: data.clouds?.all || 0,
            visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
            timestamp: new Date(data.dt * 1000).toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
            }),
            isRaining: !!(data.rain?.['1h'] > 0 || data.rain?.['3h'] > 0),
        };
    } catch (err) {
        console.error('Weather fetch failed:', err);
        return null;
    }
}

/**
 * Get 5-day / 3-hour forecast, grouped by day
 */
export async function fetchForecast() {
    try {
        const timeline = localStorage.getItem('SIMULATION_TIMELINE');

        if (timeline === 'critical') {
            return [
                { day: 'Today', date: 'Now', temp: 26, rainfall: 150, humidity: 95, wind: 55, icon: 'heavy', risk: 'HIGH' },
                { day: 'Tomorrow', date: 'Next', temp: 27, rainfall: 80, humidity: 90, wind: 35, icon: 'heavy', risk: 'HIGH' },
                { day: 'Day 3', date: 'Later', temp: 28, rainfall: 40, humidity: 85, wind: 20, icon: 'cloudy', risk: 'MEDIUM' },
                { day: 'Day 4', date: 'Later', temp: 29, rainfall: 10, humidity: 80, wind: 15, icon: 'cloudy', risk: 'LOW' },
                { day: 'Day 5', date: 'Later', temp: 30, rainfall: 0, humidity: 75, wind: 10, icon: 'sunny', risk: 'LOW' },
            ];
        } else if (timeline === 'escalating') {
            return [
                { day: 'Today', date: 'Now', temp: 28, rainfall: 45, humidity: 85, wind: 25, icon: 'heavy', risk: 'MEDIUM' },
                { day: 'Tomorrow', date: 'Next', temp: 27, rainfall: 90, humidity: 90, wind: 35, icon: 'heavy', risk: 'HIGH' },
                { day: 'Day 3', date: 'Later', temp: 26, rainfall: 120, humidity: 95, wind: 40, icon: 'heavy', risk: 'HIGH' },
                { day: 'Day 4', date: 'Later', temp: 28, rainfall: 50, humidity: 85, wind: 20, icon: 'heavy', risk: 'MEDIUM' },
                { day: 'Day 5', date: 'Later', temp: 29, rainfall: 10, humidity: 80, wind: 15, icon: 'cloudy', risk: 'LOW' },
            ];
        }

        const res = await fetch(
            `${BASE}/forecast?lat=${MUMBAI.lat}&lon=${MUMBAI.lon}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = await res.json();

        // Group by day
        const days = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const key = date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
            const dayKey = date.toISOString().split('T')[0];

            if (!days[dayKey]) {
                days[dayKey] = {
                    day: date.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' }),
                    date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }),
                    temps: [],
                    rainfall: 0,
                    humidity: [],
                    wind: [],
                    icons: [],
                };
            }

            days[dayKey].temps.push(item.main.temp);
            days[dayKey].rainfall += (item.rain?.['3h'] || 0);
            days[dayKey].humidity.push(item.main.humidity);
            days[dayKey].wind.push(item.wind.speed);
            days[dayKey].icons.push(item.weather[0]?.main || 'Clear');
        });

        // Convert to array of daily summaries
        return Object.values(days).slice(0, 5).map(d => {
            const avgTemp = Math.round(d.temps.reduce((a, b) => a + b, 0) / d.temps.length);
            const totalRain = Math.round(d.rainfall * 10) / 10;
            const avgHumidity = Math.round(d.humidity.reduce((a, b) => a + b, 0) / d.humidity.length);
            const maxWind = Math.round(Math.max(...d.wind) * 3.6);

            // Determine dominant weather icon
            const iconCounts = {};
            d.icons.forEach(i => { iconCounts[i] = (iconCounts[i] || 0) + 1; });
            const dominantIcon = Object.entries(iconCounts).sort((a, b) => b[1] - a[1])[0][0];

            // Map to our icon types
            let icon = 'sunny';
            if (['Thunderstorm'].includes(dominantIcon)) icon = 'thunder';
            else if (['Rain', 'Drizzle'].includes(dominantIcon)) icon = 'heavy';
            else if (['Clouds', 'Mist', 'Haze', 'Fog', 'Smoke'].includes(dominantIcon)) icon = 'cloudy';

            // Risk level based on rainfall
            let risk = 'LOW';
            if (totalRain >= 65) risk = 'HIGH';
            else if (totalRain >= 15) risk = 'MEDIUM';

            return {
                day: d.day,
                date: d.date,
                temp: avgTemp,
                rainfall: totalRain,
                humidity: avgHumidity,
                wind: maxWind,
                icon,
                risk,
            };
        });
    } catch (err) {
        console.error('Forecast fetch failed:', err);
        return null;
    }
}

/**
 * Generate AI-style summary from real weather data
 */
export function generateAISummary(current, forecast) {
    if (!current || !forecast) return 'Waiting for weather data...';

    const highRiskDays = forecast.filter(d => d.risk === 'HIGH').length;
    const medRiskDays = forecast.filter(d => d.risk === 'MEDIUM').length;
    const maxRain = Math.max(...forecast.map(d => d.rainfall));
    const isRaining = current.isRaining;

    if (highRiskDays > 0) {
        return `⚠️ Heavy rainfall expected (${maxRain}mm peak) — elevated flood risk in ${highRiskDays + 1} wards. Pre-position rescue boats.`;
    } else if (medRiskDays > 0) {
        return `Moderate rainfall expected over ${medRiskDays} days. Monitor river levels in Kurla & Sion. No immediate action needed.`;
    } else if (isRaining) {
        return `Light rainfall ongoing (${current.rain1h || current.rain3h}mm/h). Normal conditions — no flood risk anticipated.`;
    } else {
        return `Clear weather — ${current.temp}°C, ${current.humidity}% humidity. No adverse conditions expected. All systems normal.`;
    }
}

/**
 * Generate realistic IMD-style alerts based on actual weather
 */
export function generateAlerts(current, forecast) {
    const alerts = [];
    const maxRainDay = forecast?.reduce((a, b) => (a.rainfall > b.rainfall ? a : b), { rainfall: 0 });

    if (maxRainDay && maxRainDay.rainfall >= 65) {
        alerts.push({
            id: 1, level: 'red',
            title: 'IMD: Heavy Rainfall Warning',
            summary: `Extremely heavy rainfall expected — ${maxRainDay.rainfall}mm on ${maxRainDay.day} ${maxRainDay.date}`,
            time: current?.timestamp || '', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
        });
    }

    if (current?.wind > 40) {
        alerts.push({
            id: 2, level: 'orange',
            title: 'IMD: High Wind Advisory',
            summary: `Gusty winds at ${current.wind} km/h. Secure loose structures.`,
            time: current?.timestamp || '', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
        });
    }

    if (maxRainDay && maxRainDay.rainfall >= 15 && maxRainDay.rainfall < 65) {
        alerts.push({
            id: 3, level: 'yellow',
            title: 'IMD: Moderate Rainfall Alert',
            summary: `Moderate rainfall of ${maxRainDay.rainfall}mm expected on ${maxRainDay.day}. Stay alert.`,
            time: current?.timestamp || '', color: '#ca8a04', bg: '#fefce8', border: '#fde68a',
        });
    }

    if (alerts.length === 0 || (maxRainDay && maxRainDay.rainfall < 15)) {
        alerts.push({
            id: 4, level: 'green',
            title: 'IMD: Normal Conditions',
            summary: `${current?.description || 'Clear'} — ${current?.temp || '--'}°C. No adverse weather expected.`,
            time: current?.timestamp || '', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
        });
    }

    return alerts;
}

/**
 * Get current weather for all configured wards/zones
 */
export async function fetchWardsData() {
    try {
        const promises = ZONE_COORDS.map(async (zone, index) => {
            const timeline = localStorage.getItem('SIMULATION_TIMELINE');
            let rain1h = 0;
            let rain3h = 0;

            if (timeline === 'critical' || timeline === 'escalating') {
                if (timeline === 'critical') {
                    if (['Kurla', 'Andheri West', 'Sion'].includes(zone.name)) {
                        rain1h = 145 + Math.random() * 30;
                    } else if (['Dadar', 'Bandra East', 'Malad'].includes(zone.name)) {
                        rain1h = 75 + Math.random() * 20;
                    } else {
                        rain1h = 20 + Math.random() * 10;
                    }
                } else if (timeline === 'escalating') {
                    if (['Kurla', 'Andheri West', 'Sion'].includes(zone.name)) {
                        rain1h = 60 + Math.random() * 20;
                    } else if (['Dadar', 'Bandra East', 'Malad'].includes(zone.name)) {
                        rain1h = 30 + Math.random() * 15;
                    } else {
                        rain1h = 5 + Math.random() * 5;
                    }
                }
            } else {
                const res = await fetch(
                    `${BASE}/weather?lat=${zone.lat}&lon=${zone.lon}&appid=${API_KEY}&units=metric`
                );
                if (!res.ok) throw new Error(`API ${res.status}`);
                const data = await res.json();
                rain1h = data.rain?.['1h'] || 0;
                rain3h = data.rain?.['3h'] || 0;
            }

            const totalRain = rain1h + rain3h;

            // Basic risk logic for mapping
            let riskLevel = 'LOW';
            if (totalRain > 20) riskLevel = 'HIGH';
            else if (totalRain > 5) riskLevel = 'MEDIUM';
            else if (['Kurla', 'Sion'].includes(zone.name) && totalRain > 0) riskLevel = 'MEDIUM'; // High vulnerability areas

            // Simulated river level response based on rain
            const baseRiverLevel = ['Kurla', 'Sion'].includes(zone.name) ? 2.5 : 1.2;
            const riverLevel = (baseRiverLevel + (totalRain * 0.15)).toFixed(1);

            return {
                id: index + 1,
                name: zone.name,
                rainfall: Math.round(totalRain * 10) / 10,
                riverLevel: parseFloat(riverLevel),
                riskLevel
            };
        });

        const results = await Promise.all(promises);

        // Let's sort them so HIGH risk is on top
        const riskWeights = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        return results.sort((a, b) => riskWeights[b.riskLevel] - riskWeights[a.riskLevel]);

    } catch (err) {
        console.error('Wards fetch failed:', err);
        return [];
    }
}
