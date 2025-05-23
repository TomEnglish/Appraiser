// logService.js
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

// Collection reference
const logsCollectionRef = collection(db, 'appraisal_logs');

export const logService = {
  /**
   * Creates a new log entry in Firestore.
   * @param {object} logData - The data for the log entry.
   * @param {string} logData.appraisal_id - The ID of the associated appraisal.
   * @param {string} logData.user_id - The ID of the user performing the action.
   * @param {string} logData.action_description - A description of the action.
   * @param {object} [logData.details] - Optional additional details for the log.
   * @returns {Promise<string|null>} The ID of the newly created log document, or null if an error occurred.
   */
  createLogEntry: async (logData) => {
    try {
      const logPayload = {
        ...logData,
        timestamp: serverTimestamp(),
      };
      const docRef = await addDoc(logsCollectionRef, logPayload);
      console.log('Log entry created with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating log entry: ', error);
      return null;
    }
  },

  /**
   * Fetches all log documents for a specific appraisalId, ordered by timestamp (descending).
   * @param {string} appraisalId - The ID of the appraisal to fetch logs for.
   * @returns {Promise<Array<object>>} An array of log objects, each including its ID. Returns an empty array if an error occurs or no logs are found.
   */
  getLogsByAppraisalId: async (appraisalId) => {
    try {
      const q = query(
        logsCollectionRef,
        where('appraisal_id', '==', appraisalId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      console.log(`Fetched ${logs.length} logs for appraisal ID: ${appraisalId}`);
      return logs;
    } catch (error) {
      console.error(`Error fetching logs for appraisal ID ${appraisalId}: `, error);
      return [];
    }
  },

  /**
   * Fetches all documents from the appraisal_logs collection, ordered by timestamp (descending).
   * @returns {Promise<Array<object>>} An array of log objects, each including its ID. Returns an empty array if an error occurs.
   */
  getAllLogs: async () => {
    try {
      const q = query(logsCollectionRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      console.log(`Fetched ${logs.length} total logs.`);
      return logs;
    } catch (error) {
      console.error('Error fetching all logs: ', error);
      return [];
    }
  },
};