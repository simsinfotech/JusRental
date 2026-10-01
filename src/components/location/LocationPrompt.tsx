'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'jusrental_location_captured';

export function LocationPrompt() {
  useEffect(() => {
    const alreadyCaptured = localStorage.getItem(STORAGE_KEY);
    const hasCityStored = localStorage.getItem('jusrental_user_city');

    // Skip only if we already captured AND city is stored
    if (alreadyCaptured && hasCityStored) return;

    // Defer geolocation request — don't ask on page load
    // Wait for user to interact with the page first, or after 10s idle
    let fired = false;

    const requestLocation = () => {
      if (fired) return;
      fired = true;
      cleanup();
      captureGeolocation(alreadyCaptured);
    };

    const timer = setTimeout(requestLocation, 10000);

    const events = ['scroll', 'click', 'keydown'] as const;
    events.forEach((e) => document.addEventListener(e, requestLocation, { once: true, passive: true }));

    function cleanup() {
      clearTimeout(timer);
      events.forEach((e) => document.removeEventListener(e, requestLocation));
    }

    return cleanup;
  }, []);

  return null;
}

function captureGeolocation(alreadyCaptured: string | null) {
  if (!navigator.geolocation) {
    localStorage.setItem(STORAGE_KEY, 'true');
    if (!alreadyCaptured) sendLocation({ denied: true, userAgent: navigator.userAgent });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
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

      // Always store city/area so forms can include user location
      localStorage.setItem('jusrental_user_city', city);
      localStorage.setItem('jusrental_user_area', area);

      // Only send to API on first capture to avoid duplicates
      if (!alreadyCaptured) {
        localStorage.setItem(STORAGE_KEY, 'true');
        sendLocation({ latitude, longitude, city, area, userAgent: navigator.userAgent });
      }
    },
    () => {
      // User denied or error
      if (!alreadyCaptured) {
        localStorage.setItem(STORAGE_KEY, 'true');
        sendLocation({ denied: true, userAgent: navigator.userAgent });
      }
    },
  );
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
