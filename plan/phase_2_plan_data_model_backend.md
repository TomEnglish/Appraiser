# Granular Plan: Phase 2 - Core Data Model Implementation & Backend Logic

**Estimated Duration:** 2-3 Weeks

This phase focuses on establishing the core data structures in Firestore, implementing any initial backend logic with Cloud Functions, and creating the service layer in the React application to interact with the database.

## 1. Finalize Firestore Schema & Initial Data Seeding

This section involves translating the defined data models into actual Firestore collections and populating them with initial sample data to facilitate development and testing in subsequent phases.

### 1.1. Create `locations` Collection
[ ] *   **Sub-Task 1.1.1:** Manually create the `locations` collection in the Firebase console.
[ ] *   **Sub-Task 1.1.2:** Define Firestore security rules for the `locations` collection (e.g., authenticated users can read, specific admin roles can write).
[ ]     *   *Initial Rule Example:* Allow read for authenticated users, write for admin users (placeholder for specific roles).
[ ] *   **Sub-Task 1.1.3:** Create 2-3 sample documents in the `locations` collection using the Firebase console, ensuring all fields defined in [`firebase_react_build_plan.md#L39`](firebase_react_build_plan.md:39) (e.g., `address_line1`, `city`, `state`, `zip_code`, `county`, `latitude`, `longitude`) are represented.
[ ]     *   *Example Document 1:* A commercial property.
[ ]     *   *Example Document 2:* A residential property.
[ ] *   **Milestone 1.1:** `locations` collection created in Firestore with appropriate security rules and populated with sample documents.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Verify collection and sample documents are visible in the Firebase console.
[ ]     *   Attempt to read/write data according to defined security rules using a test script or Firebase console (simulating different user roles if possible).

### 1.2. Create `appraisals` Collection
[ ] *   **Sub-Task 1.2.1:** Manually create the `appraisals` collection in the Firebase console.
[ ] *   **Sub-Task 1.2.2:** Define Firestore security rules for the `appraisals` collection (e.g., authenticated users can read their assigned appraisals, specific roles can create/update).
[ ]     *   *Initial Rule Example:* Allow users to read/write documents where `assigned_user_id` matches their UID. Admins can read/write all.
[ ] *   **Sub-Task 1.2.3:** Create 2-3 sample documents in the `appraisals` collection using `appraisal_id` as the document ID. Include core fields like `creation_date`, `client_name`, `property_address` (denormalized), `status`, and `location_ref` (linking to sample documents in `locations`). Refer to [`firebase_react_build_plan.md#L11`](firebase_react_build_plan.md:11).
[ ]     *   *Example Document 1:* Status "data_entry", linked to a sample location.
[ ]     *   *Example Document 2:* Status "review_pending", linked to another sample location.
[ ] *   **Sub-Task 1.2.4 (Optional but Recommended):** Create sample subcollections (e.g., `contacts`, `buildings`) for one of the sample appraisal documents if this pattern is confirmed.
[ ] *   **Milestone 1.2:** `appraisals` collection created with security rules, sample documents (including `location_ref` and optional subcollections).
[ ] *   **Suggested Test/Verification:**
[ ]     *   Verify collection, sample documents, and subcollections (if any) in Firebase console.
[ ]     *   Confirm `location_ref` correctly points to existing `locations` documents.
[ ]     *   Test security rules.

### 1.3. Create `appraisal_logs` Collection
[ ] *   **Sub-Task 1.3.1:** Manually create the `appraisal_logs` collection in the Firebase console.
[ ] *   **Sub-Task 1.3.2:** Define Firestore security rules for `appraisal_logs` (e.g., authenticated users can create logs related to appraisals they have access to, reads might be more restricted or admin-only for global logs).
[ ]     *   *Initial Rule Example:* Allow users to create logs if they can write to the corresponding `appraisals` document. Admins can read all logs.
[ ] *   **Sub-Task 1.3.3:** Create 2-3 sample log documents, ensuring `appraisal_id` links to existing sample appraisals, and fields like `timestamp`, `user_id`, and `action_description` are populated. Refer to [`firebase_react_build_plan.md#L29`](firebase_react_build_plan.md:29).
[ ]     *   *Example Log 1:* "Status changed to 'review_pending' for appraisal_X".
[ ]     *   *Example Log 2:* "Client_name updated for appraisal_Y".
[ ] *   **Milestone 1.3:** `appraisal_logs` collection created with security rules and sample log entries.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Verify collection and sample documents in Firebase console.
[ ]     *   Ensure `appraisal_id` in logs correctly references sample appraisals.
[ ]     *   Test security rules.

### 1.4. Create `report_utilities` Collection
[ ] *   **Sub-Task 1.4.1:** Manually create the `report_utilities` collection in the Firebase console.
[ ] *   **Sub-Task 1.4.2:** Define Firestore security rules for `report_utilities` (e.g., authenticated users can read, specific admin roles can write/update).
[ ]     *   *Initial Rule Example:* Allow read for authenticated users, write for admin users.
[ ] *   **Sub-Task 1.4.3:** Create 2-3 sample documents using descriptive IDs. Populate fields like `utility_name`, `type`, and `content`. Refer to [`firebase_react_build_plan.md#L53`](firebase_react_build_plan.md:53).
[ ]     *   *Example Document 1:* ID `standard_disclaimer_01`, type `selectable_disclaimer`, content "This is a standard disclaimer...".
[ ]     *   *Example Document 2:* ID `market_condition_text_block_A`, type `selectable_text_block`, content "Market conditions are currently stable...".
[ ] *   **Milestone 1.4:** `report_utilities` collection created with security rules and sample utility items.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Verify collection and sample documents in Firebase console.
[ ]     *   Test security rules.

## 2. Firebase Functions (Optional Backend Logic)

Develop Cloud Functions for any backend logic identified as necessary, such as data validation triggers or simple denormalization tasks. This section is optional based on immediate needs.

### 2.1. Setup Firebase Functions Environment
[ ] *   **Sub-Task 2.1.1:** Initialize Firebase Functions in the project: `firebase init functions` (select TypeScript/JavaScript).
[ ] *   **Sub-Task 2.1.2:** Configure basic deployment settings and install any necessary dependencies (e.g., `firebase-admin`, `firebase-functions`).
[ ] *   **Milestone 2.1:** Firebase Functions environment initialized and configured.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Deploy a simple "hello world" HTTP function to confirm the setup.
[ ]     *   Verify successful deployment and invocation via its URL.

### 2.2. Develop Example Data Validation Trigger (Optional)
[ ] *   **Sub-Task 2.2.1:** Identify a simple validation rule (e.g., ensure `status` field in `appraisals` is one of predefined values).
[ ] *   **Sub-Task 2.2.2:** Write a Firestore trigger function (e.g., `onWrite` or `onCreate` for the `appraisals` collection) to implement this validation. If validation fails, the function could write to `appraisal_logs` or prevent the write (though direct prevention can be complex and might be better handled by security rules or client-side validation initially).
[ ] *   **Sub-Task 2.2.3:** Deploy the validation function.
[ ] *   **Milestone 2.2:** Example data validation Cloud Function developed and deployed.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Trigger the function by creating/updating an `appraisals` document that violates the rule and one that adheres to it.
[ ]     *   Check Firestore logs or `appraisal_logs` for function execution and validation outcome.

### 2.3. Develop Example Denormalization Function (Optional)
[ ] *   **Sub-Task 2.3.1:** Identify a simple denormalization task (e.g., when a `locations` document is updated, update the `property_address` string in all linked `appraisals` documents).
[ ] *   **Sub-Task 2.3.2:** Write a Firestore trigger function (e.g., `onUpdate` for the `locations` collection) to perform this denormalization.
[ ] *   **Sub-Task 2.3.3:** Deploy the denormalization function.
[ ] *   **Milestone 2.3:** Example denormalization Cloud Function developed and deployed.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Update a sample `locations` document.
[ ]     *   Verify that the `property_address` field in linked `appraisals` documents is updated accordingly.
[ ]     *   Check function logs.

## 3. Service Layer in React Application

Create JavaScript/TypeScript services within the React application to encapsulate all interactions with Firestore. This promotes a clean separation of concerns.

### 3.1. Setup Service Directory Structure
[ ] *   **Sub-Task 3.1.1:** Create the `src/services/` directory in the React-Vite project if it doesn't exist.
[ ] *   **Sub-Task 3.1.2:** Create initial service files (e.g., `firebaseService.js` or `firebase.js` for Firebase app initialization and core SDK exports, `appraisalService.js`, `locationService.js`, `logService.js`, `utilityService.js`).
[ ] *   **Milestone 3.1:** Service directory and initial service files created.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Ensure Firebase app is initialized correctly in `firebaseService.js` and can be imported by other services.

### 3.2. Implement CRUD Services for `locations`
[ ] *   **Sub-Task 3.2.1:** In `locationService.js`, implement functions for:
[ ]     *   `createLocation(locationData)`
[ ]     *   `getLocationById(locationId)`
[ ]     *   `updateLocation(locationId, updateData)`
[ ]     *   `deleteLocation(locationId)` (consider soft delete if needed)
[ ]     *   `getAllLocations()` (with potential for pagination/filtering later)
[ ] *   **Milestone 3.2:** CRUD functions for the `locations` collection implemented in `locationService.js`.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Write simple unit tests for each service function (e.g., using Jest/Vitest with Firestore emulators or mocks).
[ ]     *   Alternatively, test by calling these functions from a temporary test component in the UI and verifying data changes in the Firebase console.

### 3.3. Implement CRUD Services for `appraisals`
[ ] *   **Sub-Task 3.3.1:** In `appraisalService.js`, implement functions for:
[ ]     *   `createAppraisal(appraisalData)` (using `appraisal_id` as document ID)
[ ]     *   `getAppraisalById(appraisalId)`
[ ]     *   `updateAppraisal(appraisalId, updateData)`
[ ]     *   `deleteAppraisal(appraisalId)`
[ ]     *   `getAllAppraisals()`
[ ]     *   (If subcollections are used, add functions like `addContactToAppraisal(appraisalId, contactData)`, `getAppraisalContacts(appraisalId)`)
[ ] *   **Milestone 3.3:** CRUD functions for the `appraisals` collection (and its subcollections, if applicable) implemented in `appraisalService.js`.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Unit tests or temporary UI component testing, verifying interactions with sample `appraisals` data.

### 3.4. Implement Services for `appraisal_logs`
[ ] *   **Sub-Task 3.4.1:** In `logService.js`, implement functions for:
[ ]     *   `createLogEntry(logData)`
[ ]     *   `getLogsByAppraisalId(appraisalId)` (with ordering by timestamp)
[ ]     *   `getAllLogs()` (potentially with filters for admin use)
[ ] *   **Milestone 3.4:** Service functions for `appraisal_logs` implemented in `logService.js`.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Unit tests or temporary UI component testing. Verify logs are created and retrieved correctly for sample appraisals.

### 3.5. Implement Services for `report_utilities`
[ ] *   **Sub-Task 3.5.1:** In `utilityService.js`, implement functions for:
[ ]     *   `createUtilityItem(utilityData)`
[ ]     *   `getUtilityItemById(utilityId)`
[ ]     *   `updateUtilityItem(utilityId, updateData)`
[ ]     *   `deleteUtilityItem(utilityId)`
[ ]     *   `getAllUtilityItems()` (potentially filterable by `type` or `category`)
[ ] *   **Milestone 3.5:** CRUD functions for `report_utilities` implemented in `utilityService.js`.
[ ] *   **Suggested Test/Verification:**
[ ]     *   Unit tests or temporary UI component testing.

---

This granular plan for Phase 2 aims to establish a solid backend foundation and data interaction layer, preparing for the UI development in subsequent phases.