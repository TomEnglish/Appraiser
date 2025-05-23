// locationService.js
import { db } from '../firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Collection reference
const locationsCollectionRef = collection(db, 'locations');

export const locationService = {
  /**
   * Creates a new location document in Firestore.
   * @param {object} locationData - The data for the new location.
   * @returns {Promise<string|null>} The ID of the newly created document, or null if an error occurred.
   */
  createLocation: async (locationData) => {
    try {
      const docRef = await addDoc(locationsCollectionRef, locationData);
      console.log('Location created with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating location:', error);
      return null;
    }
  },

  /**
   * Fetches a specific location document by its ID.
   * @param {string} locationId - The ID of the location to fetch.
   * @returns {Promise<object|null>} The location data object, or null if not found or an error occurred.
   */
  getLocationById: async (locationId) => {
    try {
      const docRef = doc(db, 'locations', locationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such location found with ID:', locationId);
        return null;
      }
    } catch (error) {
      console.error('Error fetching location by ID:', error);
      return null;
    }
  },

  /**
   * Updates an existing location document in Firestore.
   * @param {string} locationId - The ID of the location to update.
   * @param {object} updateData - An object containing the fields to update.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  updateLocation: async (locationId, updateData) => {
    try {
      const docRef = doc(db, 'locations', locationId);
      await updateDoc(docRef, updateData);
      console.log('Location updated with ID:', locationId);
      return true;
    } catch (error) {
      console.error('Error updating location:', error);
      return false;
    }
  },

  /**
   * Deletes a specific location document from Firestore.
   * @param {string} locationId - The ID of the location to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  deleteLocation: async (locationId) => {
    try {
      const docRef = doc(db, 'locations', locationId);
      await deleteDoc(docRef);
      console.log('Location deleted with ID:', locationId);
      return true;
    } catch (error) {
      console.error('Error deleting location:', error);
      return false;
    }
  },

  /**
   * Fetches all documents from the 'locations' collection.
   * @returns {Promise<Array<object>>} An array of location objects, each including its ID. Returns an empty array if an error occurs or no locations are found.
   */
  getAllLocations: async () => {
    try {
      const querySnapshot = await getDocs(locationsCollectionRef);
      const locations = [];
      querySnapshot.forEach((doc) => {
        locations.push({ id: doc.id, ...doc.data() });
      });
      return locations;
    } catch (error) {
      console.error('Error fetching all locations:', error);
      return [];
    }
  }
};