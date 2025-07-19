// Utility for managing itineraries in localStorage for guest users

const LOCAL_KEY = 'nycTourItineraries';

export interface Itinerary {
  id: string;
  createdAt: number;
  data: any; // Replace 'any' with your itinerary data structure
}

export function getGuestItineraries(): Itinerary[] {
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveGuestItinerary(itinerary: Itinerary) {
  const itineraries = getGuestItineraries();
  itineraries.push(itinerary);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(itineraries));
}

export function clearGuestItineraries() {
  localStorage.removeItem(LOCAL_KEY);
} 