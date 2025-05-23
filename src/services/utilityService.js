import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
// Assuming logService might eventually export a generic logError function.
// For now, this import might not resolve if logService doesn't export logError.
// We'll proceed with the structure, and can refine error logging later.
// import { logError } from './logService'; 

const UTILITIES_COLLECTION = 'report_utilities';

export const utilityService = { // Changed from 'export default'
  /**
   * Creates a new utility item in the report_utilities collection.
   * @param {string} utilityId - The ID for the new utility document.
   * @param {object} utilityData - Data for the new utility item.
   *                               Should include utility_name, type, content.
   *                               Category is optional.
   * @returns {Promise<boolean>} - True if successful, false otherwise.
   */
  createUtilityItem: async (utilityId, utilityData) => {
    try {
      const utilityRef = doc(db, UTILITIES_COLLECTION, utilityId);
      await setDoc(utilityRef, {
        ...utilityData,
        last_updated: serverTimestamp(),
      });
      console.log(`Utility item created with ID: ${utilityId}`);
      return true;
    } catch (error) {
      console.error('Error creating utility item:', error);
      // logError('createUtilityItem', error.message, { utilityId, utilityData }); // Uncomment if logError is implemented
      return false;
    }
  },

  /**
   * Fetches a specific utility document by its ID.
   * @param {string} utilityId - The ID of the utility item to fetch.
   * @returns {Promise<object|null>} - The document data or null if not found.
   */
  getUtilityItemById: async (utilityId) => {
    try {
      const utilityRef = doc(db, UTILITIES_COLLECTION, utilityId);
      const docSnap = await getDoc(utilityRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log(`No utility item found with ID: ${utilityId}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching utility item by ID:', error);
      // logError('getUtilityItemById', error.message, { utilityId }); // Uncomment if logError is implemented
      return null;
    }
  },

  /**
   * Updates an existing utility document.
   * @param {string} utilityId - The ID of the utility item to update.
   * @param {object} updateData - An object containing the fields to update.
   *                              last_updated will be automatically set.
   * @returns {Promise<boolean>} - True if successful, false otherwise.
   */
  updateUtilityItem: async (utilityId, updateData) => {
    try {
      const utilityRef = doc(db, UTILITIES_COLLECTION, utilityId);
      await updateDoc(utilityRef, {
        ...updateData,
        last_updated: serverTimestamp(),
      });
      console.log(`Utility item updated with ID: ${utilityId}`);
      return true;
    } catch (error) {
      console.error('Error updating utility item:', error);
      // logError('updateUtilityItem', error.message, { utilityId, updateData }); // Uncomment if logError is implemented
      return false;
    }
  },

  /**
   * Deletes a specific utility document.
   * @param {string} utilityId - The ID of the utility item to delete.
   * @returns {Promise<boolean>} - True if successful, false otherwise.
   */
  deleteUtilityItem: async (utilityId) => {
    try {
      const utilityRef = doc(db, UTILITIES_COLLECTION, utilityId);
      await deleteDoc(utilityRef);
      console.log(`Utility item deleted with ID: ${utilityId}`);
      return true;
    } catch (error) {
      console.error('Error deleting utility item:', error);
      // logError('deleteUtilityItem', error.message, { utilityId }); // Uncomment if logError is implemented
      return false;
    }
  },

  /**
   * Fetches all documents from the report_utilities collection.
   * @returns {Promise<Array<object>>} - An array of utility objects, each including its ID.
   */
  getAllUtilityItems: async () => {
    try {
      const utilitiesCollectionRef = collection(db, UTILITIES_COLLECTION);
      const querySnapshot = await getDocs(utilitiesCollectionRef);
      const utilities = [];
      querySnapshot.forEach((docSnap) => {
        utilities.push({ id: docSnap.id, ...docSnap.data() });
      });
      return utilities;
    } catch (error) {
      console.error('Error fetching all utility items:', error);
      // logError('getAllUtilityItems', error.message); // Uncomment if logError is implemented
      return [];
    }
  },

  /**
   * Fetches utility items filtered by the type field.
   * @param {string} itemType - The type to filter by.
   * @returns {Promise<Array<object>>} - An array of utility objects matching the type.
   */
  getUtilityItemsByType: async (itemType) => {
    try {
      const utilitiesCollectionRef = collection(db, UTILITIES_COLLECTION);
      const q = query(utilitiesCollectionRef, where('type', '==', itemType));
      const querySnapshot = await getDocs(q);
      const utilities = [];
      querySnapshot.forEach((docSnap) => {
        utilities.push({ id: docSnap.id, ...docSnap.data() });
      });
      return utilities;
    } catch (error) {
      console.error(`Error fetching utility items by type "${itemType}":`, error);
      // logError('getUtilityItemsByType', error.message, { itemType }); // Uncomment if logError is implemented
      return [];
    }
  },

  /**
   * Fetches utility items filtered by the category field.
   * @param {string} categoryName - The category to filter by.
   * @returns {Promise<Array<object>>} - An array of utility objects matching the category.
   */
  getUtilityItemsByCategory: async (categoryName) => {
    try {
      const utilitiesCollectionRef = collection(db, UTILITIES_COLLECTION);
      const q = query(utilitiesCollectionRef, where('category', '==', categoryName));
      const querySnapshot = await getDocs(q);
      const utilities = [];
      querySnapshot.forEach((docSnap) => {
        utilities.push({ id: docSnap.id, ...docSnap.data() });
      });
      return utilities;
    } catch (error) {
      console.error(`Error fetching utility items by category "${categoryName}":`, error);
      // logError('getUtilityItemsByCategory', error.message, { categoryName }); // Uncomment if logError is implemented
      return [];
    }
  },
};
