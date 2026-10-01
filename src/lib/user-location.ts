/**
 * Get user city/area — reads from localStorage cache first,
 * falls back to live geolocation + reverse geocoding.
 * Returns within ~2s max. Never throws.
 */
export async function getUserLocation(): Promise<{ city: string; area: string }> {
  // 1. Try localStorage cache first (instant)
  const cachedCity = localStorage.getItem('jusrental_user_city');
  const cachedArea = localStorage.getItem('jusrental_user_area');
  if (cachedCity) return { city: cachedCity, area: cachedArea || '' };

  // 2. No cache — try live geolocation
  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 3000,
        maximumAge: 300000, // use cached position up to 5 min old
      });
    });

    const { latitude, longitude } = position.coords;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      { headers: { 'User-Agent': 'JusRental/1.0' } },
    );

    if (res.ok) {
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        '';
      const area =
        data.address?.suburb ||
        data.address?.neighbourhood ||
        data.address?.county ||
        '';

      // Cache for future submissions
      localStorage.setItem('jusrental_user_city', city);
      localStorage.setItem('jusrental_user_area', area);

      return { city, area };
    }
  } catch {
    // Geolocation denied or timed out — return empty
  }

  return { city: '', area: '' };
}
