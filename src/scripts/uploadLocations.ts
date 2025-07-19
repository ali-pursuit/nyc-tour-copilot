import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../firebase/config';
import { nycLocations } from '../data/nycLocations';

const db = getFirestore(app);

export const uploadLocationsToFirebase = async () => {
  try {
    console.log('Starting upload of NYC locations to Firebase...');
    
    const locationsRef = collection(db, 'locations');
    
    for (const location of nycLocations) {
      const locationWithTimestamps = {
        ...location,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(doc(locationsRef, location.id), locationWithTimestamps);
      console.log(`✅ Uploaded: ${location.name}`);
    }
    
    console.log('🎉 All locations uploaded successfully!');
  } catch (error) {
    console.error('❌ Error uploading locations:', error);
  }
};

// Run the upload if this script is executed directly
if (typeof window === 'undefined') {
  uploadLocationsToFirebase();
} 