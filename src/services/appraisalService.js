import { db } from '../firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

const appraisalsCollectionRef = collection(db, 'appraisals');

const appraisalService = {
  /**
   * Creates a new appraisal document in Firestore.
   * @param {object} appraisalData - The data for the new appraisal. Must include an appraisal_id.
   * @returns {Promise<string|null>} The appraisal_id on success, or null on failure.
   */
  createAppraisal: async (appraisalData) => {
    if (!appraisalData || !appraisalData.appraisal_id) {
      console.error(
        'Error creating appraisal: appraisalData and appraisal_id are required.'
      );
      return null;
    }
    try {
      const appraisalRef = doc(db, 'appraisals', appraisalData.appraisal_id);
      await setDoc(appraisalRef, appraisalData);
      console.log('Appraisal created successfully with ID:', appraisalData.appraisal_id);
      return appraisalData.appraisal_id;
    } catch (error) {
      console.error('Error creating appraisal:', error);
      return null;
    }
  },

  /**
   * Fetches a specific appraisal document by its ID.
   * @param {string} appraisalId - The ID of the appraisal to fetch.
   * @returns {Promise<object|null>} The appraisal data if found, otherwise null.
   */
  getAppraisalById: async (appraisalId) => {
    if (!appraisalId) {
      console.error('Error fetching appraisal: appraisalId is required.');
      return null;
    }
    try {
      const appraisalRef = doc(db, 'appraisals', appraisalId);
      const docSnap = await getDoc(appraisalRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such appraisal found with ID:', appraisalId);
        return null;
      }
    } catch (error) {
      console.error('Error fetching appraisal by ID:', error);
      return null;
    }
  },

  /**
   * Updates an existing appraisal document.
   * @param {string} appraisalId - The ID of the appraisal to update.
   * @param {object} updateData - An object containing the fields to update.
   * @returns {Promise<boolean>} True if update was successful, false otherwise.
   */
  updateAppraisal: async (appraisalId, updateData) => {
    if (!appraisalId || !updateData) {
      console.error(
        'Error updating appraisal: appraisalId and updateData are required.'
      );
      return false;
    }
    try {
      const appraisalRef = doc(db, 'appraisals', appraisalId);
      await updateDoc(appraisalRef, updateData);
      console.log('Appraisal updated successfully for ID:', appraisalId);
      return true;
    } catch (error) {
      console.error('Error updating appraisal:', error);
      return false;
    }
  },

  /**
   * Deletes a specific appraisal document.
   * @param {string} appraisalId - The ID of the appraisal to delete.
   * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
   */
  deleteAppraisal: async (appraisalId) => {
    if (!appraisalId) {
      console.error('Error deleting appraisal: appraisalId is required.');
      return false;
    }
    try {
      const appraisalRef = doc(db, 'appraisals', appraisalId);
      await deleteDoc(appraisalRef);
      console.log('Appraisal deleted successfully for ID:', appraisalId);
      return true;
    } catch (error) {
      console.error('Error deleting appraisal:', error);
      return false;
    }
  },

  /**
   * Fetches all documents from the appraisals collection.
   * @returns {Promise<Array<object>>} An array of appraisal objects, each including its ID.
   */
  getAllAppraisals: async () => {
    try {
      const querySnapshot = await getDocs(appraisalsCollectionRef);
      const appraisals = [];
      querySnapshot.forEach((doc) => {
        appraisals.push({ id: doc.id, ...doc.data() });
      });
      return appraisals;
    } catch (error) {
      console.error('Error fetching all appraisals:', error);
      return [];
    }
  },
};

export default appraisalService;