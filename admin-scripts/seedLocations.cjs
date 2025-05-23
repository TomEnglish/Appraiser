const admin = require('firebase-admin');

// Load the service account key
// The path is relative to the script's location in admin-scripts/
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
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

const commercialLocation = {
  property_name: "Downtown Office Tower",
  address_line1: "456 Main St",
  address_line2: "",
  city: "Metro City",
  state: "GA",
  zip_code: "30303",
  county: "Fulton County",
  parish: null,
  msa: "Metro City MSA",
  latitude: 33.7537,
  longitude: -84.3863,
  legal_description: "Unit 100, Metro City Towers Condominium",
  additional_location_info: "Class A office space",
  inside_city_limits: true,
  section_township_range: null,
  block: null,
  lot: "100",
  property_type: "Commercial Office",
  mls_id: null,
  former_id: "MCTOWER001",
  property_originator: "Urban Development Corp.",
  property_entry_date: "2022-05-20",
  parcel_id: "012-345-678"
};

const residentialLocation = {
  property_name: "Ocean View Condos",
  address_line1: "123 Seaside Ave",
  address_line2: "Unit 5B",
  city: "Beachville",
  state: "FL",
  zip_code: "33139",
  county: "Miami-Dade County",
  parish: "St. James Parish",
  msa: "Beachville Metro Area",
  latitude: 25.7907,
  longitude: -80.1300,
  legal_description: "Lot 1, Block A, Seaside Subdivision",
  additional_location_info: "Oceanfront building, Gated Community",
  inside_city_limits: true,
  section_township_range: "S15 T2S R42E",
  block: "A",
  lot: "1",
  property_type: "Residential Condominium",
  mls_id: "A1234567",
  former_id: null,
  property_originator: "Coastal Properties Inc.",
  property_entry_date: "2023-01-15",
  parcel_id: "987-654-321"
};

async function seedLocations() {
  try {
    const commercialDocRef = await locationsCollection.add(commercialLocation);
    console.log(`Successfully added commercial location with ID: ${commercialDocRef.id}`);

    const residentialDocRef = await locationsCollection.add(residentialLocation);
    console.log(`Successfully added residential location with ID: ${residentialDocRef.id}`);

    console.log("\nFinished seeding locations.");
  } catch (error) {
    console.error("Error seeding locations:", error);
  }
}

seedLocations();