'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'jusrental_location_captured';

export function LocationPrompt() {
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    if (!navigator.geolocation) {
      localStorage.setItem(STORAGE_KEY, 'true');
      sendLocation({ denied: true, userAgent: navigator.userAgent });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        localStorage.setItem(STORAGE_KEY, 'true');
        const { latitude, longitude } = position.coords;

        let city = '';
        let area = '';
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'User-Agent': 'JusRental/1.0' } },
          );
          if (res.ok) {
            const data = await res.json();
            city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              '';
            area =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.county ||
              '';
          }
        } catch {
          // Reverse geocode failed — send coordinates without city/area
        }

        // Store in localStorage so forms can include user location
        if (city || area) {
          localStorage.setItem('jusrental_user_city', city);
          localStorage.setItem('jusrental_user_area', area);
        }

        sendLocation({ latitude, longitude, city, area, userAgent: navigator.userAgent });
      },
      () => {
        // User denied or error
        localStorage.setItem(STORAGE_KEY, 'true');
        sendLocation({ denied: true, userAgent: navigator.userAgent });
      },
    );
  }, []);

  return null;
}

async function sendLocation(data: {
  latitude?: number;
  longitude?: number;
  city?: string;
  area?: string;
  userAgent: string;
  denied?: boolean;
}) {
  try {
    await fetch('/api/visitor-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    // Silent failure — don't disrupt user experience
  }
}
