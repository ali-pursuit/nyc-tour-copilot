import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { app } from '../firebase/config';
import type { Location } from '../data/nycLocations';

const db = getFirestore(app);

export const locationService = {
  // Get all locations
  async getAllLocations(): Promise<Location[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'locations'));
      return querySnapshot.docs.map(doc => doc.data() as Location);
    } catch (error) {
      console.error('Error fetching all locations:', error);
      return [];
    }
  },

  // Get locations by tag
  async getLocationsByTag(tag: string): Promise<Location[]> {
    try {
      const q = query(
        collection(db, 'locations'),
        where('tags', 'array-contains', tag)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Location);
    } catch (error) {
      console.error(`Error fetching locations with tag ${tag}:`, error);
      return [];
    }
  },

  // Get locations by category
  async getLocationsByCategory(category: string): Promise<Location[]> {
    try {
      const q = query(
        collection(db, 'locations'),
        where('category', 'array-contains', category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Location);
    } catch (error) {
      console.error(`Error fetching locations in category ${category}:`, error);
      return [];
    }
  },

  // Get trending locations
  async getTrendingLocations(limitCount: number = 6): Promise<Location[]> {
    try {
      const q = query(
        collection(db, 'locations'),
        where('tags', 'array-contains', 'trending'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Location);
    } catch (error) {
      console.error('Error fetching trending locations:', error);
      return [];
    }
  },

  // Get hidden gems (rotating)
  async getHiddenGems(limitCount: number = 3): Promise<Location[]> {
    try {
      const q = query(
        collection(db, 'locations'),
        where('tags', 'array-contains', 'hidden-gem'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Location);
    } catch (error) {
      console.error('Error fetching hidden gems:', error);
      return [];
    }
  },

  // Get featured experiences by collection
  async getFeaturedExperiences(collection: string): Promise<Location[]> {
    const tagMap: { [key: string]: string } = {
      'first-timer': 'first-timer',
      'local-only': 'local-only',
      'scenic': 'scenic',
      'budget-friendly': 'budget-friendly',
      'content-creator': 'content-creator'
    };

    const tag = tagMap[collection];
    if (!tag) {
      console.error(`Unknown collection: ${collection}`);
      return [];
    }

    return this.getLocationsByTag(tag);
  }
}; 