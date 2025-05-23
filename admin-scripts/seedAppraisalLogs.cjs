const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const appraisalLogsData = [
  {
    appraisal_id: "APP-001",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    user_id: "user_admin_01",
    action_description: "Appraisal APP-001 status changed from 'data_entry' to 'review_pending'.",
    details: {
      old_status: "data_entry",
      new_status: "review_pending"
    }
  },
  {
    appraisal_id: "APP-002",
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    user_id: "user_appraiser_02",
    action_description: "Client name updated for APP-002."
  }
];

async function seedAppraisalLogs() {
  const appraisalLogsCollection = db.collection('appraisal_logs');

  for (const logData of appraisalLogsData) {
    try {
      const docRef = await appraisalLogsCollection.add(logData);
      console.log(`Successfully added appraisal log for appraisal_id ${logData.appraisal_id} with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding appraisal log for appraisal_id ${logData.appraisal_id}: `, error);
    }
  }
}

seedAppraisalLogs().then(() => {
  console.log("Appraisal logs seeding process completed.");
  // It's good practice to exit the script explicitly if it's a one-off task
  // process.exit(0); // Uncomment if you want the script to exit automatically
}).catch(error => {
  console.error("Error during appraisal logs seeding process: ", error);
  // process.exit(1); // Uncomment if you want the script to exit automatically on error
});