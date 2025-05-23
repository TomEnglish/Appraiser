const admin = require('firebase-admin');

// Load the service account key
// The path is relative to the script's location in admin-scripts/
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    console.log('Firebase app already initialized.');
  } else {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1); // Exit if initialization fails for other reasons
  }
}

const db = admin.firestore();
const locationsCollection = db.collection('locations');
const appraisalsCollection = db.collection('appraisals');

async function fetchLocationIdByPropertyName(propertyName) {
  try {
    const snapshot = await locationsCollection.where('property_name', '==', propertyName).limit(1).get();
    if (snapshot.empty) {
      console.log(`No location found with property name: ${propertyName}`);
      return null;
    }
    // Assuming property_name is unique enough for this seeding script
    return snapshot.docs[0].id;
  } catch (error) {
    console.error(`Error fetching location ID for ${propertyName}:`, error);
    throw error; // Re-throw to be caught by the main seeding function
  }
}

async function seedAppraisals() {
  try {
    console.log("Fetching location IDs...");
    const commercialLocationId = await fetchLocationIdByPropertyName("Downtown Office Tower");
    const residentialLocationId = await fetchLocationIdByPropertyName("Ocean View Condos");

    if (!commercialLocationId || !residentialLocationId) {
      console.error("Could not fetch one or both location IDs. Aborting seed operation.");
      return;
    }

    console.log(`Fetched commercial location ID: ${commercialLocationId}`);
    console.log(`Fetched residential location ID: ${residentialLocationId}`);

    const appraisalsData = [
      {
        appraisal_id: "APP-001",
        creation_date: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
        client_name: "Global Corp Inc.",
        property_address: "456 Main St", // Denormalized from commercial location
        status: "data_entry",
        location_ref: `locations/${commercialLocationId}`,
        assigned_user_id: "user_admin_01",
        report_type: "Full Appraisal"
      },
      {
        appraisal_id: "APP-002",
        creation_date: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
        client_name: "Jane Doe",
        property_address: "123 Seaside Ave, Unit 5B", // Denormalized from residential location
        status: "review_pending",
        location_ref: `locations/${residentialLocationId}`,
        assigned_user_id: "user_appraiser_02",
        report_type: "Desktop Appraisal"
      }
    ];

    console.log("\nStarting to seed appraisals...");

    for (const appraisal of appraisalsData) {
      try {
        await appraisalsCollection.doc(appraisal.appraisal_id).set(appraisal);
        console.log(`Successfully added appraisal with ID: ${appraisal.appraisal_id}`);
      } catch (error) {
        console.error(`Error adding appraisal ${appraisal.appraisal_id}:`, error);
      }
    }

    console.log("\nFinished seeding appraisals.");

  } catch (error) {
    console.error("Error seeding appraisals:", error);
  } finally {
    // Optional: Close the Firebase app if this script is meant to be run standalone and then exit.
    // admin.app().delete().then(() => {
    //   console.log('Firebase app closed.');
    //   process.exit(0);
    // }).catch(err => {
    //   console.error('Error closing Firebase app:', err);
    //   process.exit(1);
    // });
  }
}

seedAppraisals();