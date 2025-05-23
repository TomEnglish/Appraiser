const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// IMPORTANT: Make sure the serviceAccountKey.json file is in the same directory as this script
// or update the path accordingly.
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const reportUtilitiesData = [
  {
    id: 'standard_disclaimer_01',
    utility_name: 'Standard Disclaimer 01',
    type: 'selectable_disclaimer',
    content: 'This is a standard disclaimer. All information provided is for general informational purposes only, and all information is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.',
    category: 'Legal Disclaimers',
    last_updated: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    id: 'market_condition_text_block_A',
    utility_name: 'Market Condition Text Block A',
    type: 'selectable_text_block',
    content: 'Market conditions are currently stable with moderate growth observed in the commercial sector. Residential property values have seen a slight increase over the past quarter.',
    category: 'Market Analysis',
    last_updated: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    id: 'property_inspection_scope_001',
    utility_name: 'Property Inspection Scope - Standard',
    type: 'selectable_text_block',
    content: 'The scope of the property inspection included a visual examination of the accessible interior and exterior areas of the subject property. This inspection was performed in accordance with generally accepted appraisal standards.',
    // No category for this one, to test optional field
    last_updated: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seedReportUtilities() {
  console.log('Starting to seed report_utilities collection...');

  for (const utility of reportUtilitiesData) {
    const { id, ...dataToSave } = utility; // Separate id from the rest of the data
    const docRef = db.collection('report_utilities').doc(id);

    try {
      await docRef.set(dataToSave);
      console.log(`Successfully added/updated document: ${id}`);
    } catch (error) {
      console.error(`Error adding/updating document ${id}:`, error);
    }
  }

  console.log('Finished seeding report_utilities collection.');
  // It's good practice to explicitly exit the script after async operations are done,
  // especially if there are open handlers like Firestore listeners (though not the case here for a simple set).
  process.exit(0);
}

seedReportUtilities().catch(error => {
  console.error('Unhandled error during seeding process:', error);
  process.exit(1);
});