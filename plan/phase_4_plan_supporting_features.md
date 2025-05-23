# Phase 4: Supporting Features Development - Detailed Plan

This document provides a granular breakdown of tasks, milestones, and testing for Phase 4, building upon the [firebase_react_build_plan.md](firebase_react_build_plan.md).

## 1. Appraisal Log Integration

**Goal:** Develop UI to display logs related to a specific appraisal for review purposes, enhancing transparency and auditability of data changes.

### 1.1. Sub-Tasks:

[ ] *   **1.1.1. Design `AppraisalLogList.jsx` Component:**
[ ]     *   Define props (e.g., `appraisalId`).
[ ]     *   Determine information to display for each log entry (e.g., timestamp, user, action, details from the `appraisal_logs` collection fields: `timestamp`, `user_id`, `action_description`, `details`).
[ ]     *   Consider UI for sorting (e.g., by timestamp descending) and potential basic filtering if necessary (though primary filtering is by `appraisalId`).
[ ] *   **1.1.2. Implement `AppraisalLogList.jsx` Data Fetching:**
[ ]     *   Utilize the existing `appraisalService.js` (expected from Phase 2) to fetch logs from the `appraisal_logs` collection, filtered by the provided `appraisalId`.
[ ]     *   Handle loading states (e.g., display a spinner) and error states (e.g., display an error message).
[ ] *   **1.1.3. Implement `AppraisalLogList.jsx` Rendering:**
[ ]     *   Render the list of log entries using the designed layout.
[ ]     *   Ensure clear and readable presentation of log data (e.g., format timestamps).
[ ] *   **1.1.4. Integrate `AppraisalLogList.jsx` into [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97):**
[ ]     *   As per the main plan ([`firebase_react_build_plan.md:101`](firebase_react_build_plan.md:101)), add a dedicated section or tab within [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) to host the [`AppraisalLogList.jsx`](firebase_react_build_plan.md:105) component.
[ ]     *   Pass the current `appraisalId` from [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) to [`AppraisalLogList.jsx`](firebase_react_build_plan.md:105).

### 1.2. Milestones:

[ ] *   **M1.2.1:** `AppraisalLogList.jsx` component designed, basic structure implemented, and props defined.
[ ] *   **M1.2.2:** Data fetching for appraisal logs by `appraisalId` is functional within `AppraisalLogList.jsx`, including loading and error handling.
[ ] *   **M1.2.3:** `AppraisalLogList.jsx` correctly renders fetched log entries in the specified format.
[ ] *   **M1.2.4:** `AppraisalLogList.jsx` successfully integrated into [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) and displays logs specifically for the currently viewed appraisal.

### 1.3. Suggested Tests/Verification:

[ ] *   **T1.3.1:** Verify that `AppraisalLogList.jsx` displays "loading" (or spinner) state while fetching and "no logs found" (or similar message) state correctly if an appraisal has no logs.
[ ] *   **T1.3.2:** Manually create sample log entries for a test appraisal in Firestore. Verify that these logs are fetched and displayed correctly (all relevant fields, correct sorting) in the [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) for that specific appraisal.
[ ] *   **T1.3.3:** Verify that logs for one appraisal do not inadvertently show up when viewing a different appraisal.
[ ] *   **T1.3.4:** Verify log entries are displayed in a user-friendly format (e.g., human-readable timestamps, clear action descriptions). Test with various log `action_description` and `details` content.

## 2. Location Data Integration

**Goal:** Enable users to enter, edit, and view location data directly associated with an appraisal within the existing appraisal forms and detail views. Standalone location management views are explicitly out of scope for this phase.

### 2.1. Sub-Tasks:

[ ] *   **2.1.1. Design Location Input Fields for [`AppraisalForm.jsx`](firebase_react_build_plan.md:103):**
[ ]     *   Identify all necessary location fields based on the `locations` collection schema in [`firebase_react_build_plan.md`](firebase_react_build_plan.md:42-51) (e.g., `address_line1`, `address_line2`, `city`, `state`, `zip_code`, `county`, `latitude`, `longitude`).
[ ]     *   Design the layout of these fields within a dedicated "Location Information" section of the [`AppraisalForm.jsx`](firebase_react_build_plan.md:103).
[ ]     *   Include appropriate input types and validation messages.
[ ] *   **2.1.2. Implement Location Data Handling in [`AppraisalForm.jsx`](firebase_react_build_plan.md:103):**
[ ]     *   Manage location data state within the form, potentially as a nested object.
[ ]     *   On form submission (for new or existing appraisals):
[ ]         *   **New Appraisal:** If creating a new appraisal with new location data, the `appraisalService.js` should first create a new document in the `locations` collection, then store its Firestore reference (`location_ref`) in the new `appraisals` document.
[ ]         *   **Existing Appraisal:** If editing an appraisal with existing location data (linked via `location_ref`), the `appraisalService.js` should update the corresponding document in the `locations` collection.
[ ]     *   Implement client-side validation for location fields (e.g., required fields, zip code format).
[ ] *   **2.1.3. Develop/Refine [`LocationInfo.jsx`](firebase_react_build_plan.md:113) Display Component:**
[ ]     *   Ensure [`LocationInfo.jsx`](firebase_react_build_plan.md:113) can accept a `location_ref` (Firestore Reference object) or a pre-fetched `locationData` object as a prop.
[ ]     *   If `location_ref` is provided, the component should fetch the location data from Firestore using the `appraisalService.js` or a dedicated `locationService.js`.
[ ]     *   Display all relevant location information in a clear, read-only, well-formatted manner.
[ ]     *   Handle cases where location data might be missing or the reference is invalid.
[ ] *   **2.1.4. Integrate [`LocationInfo.jsx`](firebase_react_build_plan.md:113) into [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97):**
[ ]     *   As per [`firebase_react_build_plan.md:102`](firebase_react_build_plan.md:102), [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) should fetch the `location_ref` from the current appraisal document.
[ ]     *   Pass this `location_ref` to the [`LocationInfo.jsx`](firebase_react_build_plan.md:113) component for display.

### 2.2. Milestones:

[ ] *   **M2.2.1:** Location input fields, including validation, are designed and implemented within a dedicated section of [`AppraisalForm.jsx`](firebase_react_build_plan.md:103).
[ ] *   **M2.2.2:** [`AppraisalForm.jsx`](firebase_react_build_plan.md:103) can successfully create a new appraisal, simultaneously creating a new associated location document in the `locations` collection and linking it via `location_ref` in the `appraisals` document.
[ ] *   **M2.2.3:** [`AppraisalForm.jsx`](firebase_react_build_plan.md:103) can successfully load and update an existing appraisal's associated location data in the `locations` collection.
[ ] *   **M2.2.4:** [`LocationInfo.jsx`](firebase_react_build_plan.md:113) component is functional and can fetch (if needed) and display location data based on a `location_ref` or `locationData` prop.
[ ] *   **M2.2.5:** [`LocationInfo.jsx`](firebase_react_build_plan.md:113) is successfully integrated into [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) and correctly displays the location information associated with the viewed appraisal.

### 2.3. Suggested Tests/Verification:

[ ] *   **T2.3.1:** Create a new appraisal using [`AppraisalForm.jsx`](firebase_react_build_plan.md:103) with complete location details. Verify in Firestore that a new document is created in the `locations` collection with correct data, and the `appraisals` document contains the correct `location_ref`.
[ ] *   **T2.3.2:** Edit the location details (e.g., change city and zip code) of an existing appraisal using [`AppraisalForm.jsx`](firebase_react_build_plan.md:103). Verify in Firestore that the corresponding `locations` document is updated, and no new location document is created.
[ ] *   **T2.3.3:** Open an appraisal with associated location data in [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97). Verify its complete location data is correctly and clearly displayed via the integrated [`LocationInfo.jsx`](firebase_react_build_plan.md:113).
[ ] *   **T2.3.4:** Test client-side validation for location fields in [`AppraisalForm.jsx`](firebase_react_build_plan.md:103) (e.g., submitting with missing required fields, invalid formats).
[ ] *   **T2.3.5:** Test behavior in [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) when an appraisal has no `location_ref` (e.g., graceful display of "No location data").

## 3. Report Utility Item Selection Integration

**Goal:** Develop UI to allow users to browse and select items from the `report_utilities` collection and associate these selections with a specific appraisal for future report inclusion.

### 3.1. Sub-Tasks:

[ ] *   **3.1.1. Design `ReportUtilitySelectorView.jsx` (or Integrated Component):**
[ ]     *   Determine the UI for browsing utility items (e.g., a list with checkboxes, a grid of `UtilityItemCard.jsx` components, or a modal `UtilityItemPicker.jsx`).
[ ]     *   Consider grouping/filtering options if `report_utilities` are numerous (e.g., by `type` or `category` fields from the schema in [`firebase_react_build_plan.md:58-60`](firebase_react_build_plan.md:58)).
[ ]     *   Design how selected items are visually indicated.
[ ]     *   Plan how selections will be saved: this will involve updating the `selected_for_report` map in the specific `appraisals` document (as per [`firebase_react_build_plan.md:22`](firebase_react_build_plan.md:22)), likely storing an array of selected utility item IDs or a map of `utility_id: true`.
[ ] *   **3.1.2. Implement Data Fetching for `report_utilities`:**
[ ]     *   Utilize `firebaseService.js` or create a new `reportUtilityService.js` to fetch all items from the `report_utilities` collection.
[ ]     *   Implement any designed filtering/categorization logic.
[ ] *   **3.1.3. Implement Selection Logic in the UI:**
[ ]     *   Manage the state of selected utility items for the current appraisal (e.g., load existing selections when the view/component mounts).
[ ]     *   Allow users to toggle selections.
[ ]     *   Implement a "Save Selections" or similar action that triggers an update to the `appraisals` document with the current set of selected utility item IDs/references.
[ ] *   **3.1.4. Integrate `ReportUtilitySelectorView.jsx` into the Application Flow:**
[ ]     *   If a standalone view (as suggested by [`ReportUtilitySelectorView.jsx`](firebase_react_build_plan.md:107) and route [`/select-report-items/:appraisalId`](firebase_react_build_plan.md:124)), ensure it's accessible (e.g., via a button/link from [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97)) and correctly receives the `appraisalId`.
[ ]     *   Alternatively, if integrated directly into [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97), embed the selection UI within a relevant section/tab.
[ ] *   **3.1.5. Display Currently Selected Utilities (Enhancement):**
[ ]     *   Within [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97), provide a read-only summary or list of utility items currently selected for the appraisal. This might involve fetching details of selected utilities if only IDs are stored.

### 3.2. Milestones:

[ ] *   **M3.2.1:** `ReportUtilitySelectorView.jsx` (or equivalent UI for selection) designed, and basic structure implemented, including any sub-components like `UtilityItemCard.jsx`.
[ ] *   **M3.2.2:** Data fetching for `report_utilities` is functional, and items are displayed in the selector UI, with any filtering/categorization applied.
[ ] *   **M3.2.3:** Users can select and deselect utility items within the UI, and these selections are visually reflected and managed in local state.
[ ] *   **M3.2.4:** Selected utility items are successfully saved to (and retrieved from) the `selected_for_report` field of the correct `appraisals` document in Firestore.
[ ] *   **M3.2.5:** Users can easily navigate to/access the utility selector for a specific appraisal, and upon re-entry, previously saved selections are correctly loaded.

### 3.3. Suggested Tests/Verification:

[ ] *   **T3.3.1:** Verify all `report_utilities` from Firestore are fetched and displayed correctly in the selector UI. Test any filtering/categorization.
[ ] *   **T3.3.2:** For a specific appraisal, select several utility items, save the selections. Close and re-open the selector (or navigate away and back); verify the previous selections are correctly loaded and displayed.
[ ] *   **T3.3.3:** Inspect the Firestore `appraisals` document for that appraisal; confirm that its `selected_for_report` field is updated accurately with the IDs/references of the selected utilities.
[ ] *   **T3.3.4:** Test deselecting some/all items and saving; verify the `appraisals` document is updated accordingly (items removed from `selected_for_report`).
[ ] *   **T3.3.5:** If the enhancement (M3.1.5) is implemented, verify that [`AppraisalDetailView.jsx`](firebase_react_build_plan.md:97) correctly displays a summary of selected utilities.

## 4. User Authentication

**Goal:** Implement basic user authentication (login/logout) using Firebase Authentication to secure the application and enable user-specific actions or data tracking.

### 4.1. Sub-Tasks:

[ ] *   **4.1.1. Configure Firebase Authentication in Firebase Console:**
[ ]     *   Verify/Enable desired sign-in methods (e.g., Email/Password, Google Sign-In) as per initial setup in Phase 1 ([`firebase_react_build_plan.md:131`](firebase_react_build_plan.md:131)).
[ ] *   **4.1.2. Develop Login/Signup UI Components:**
[ ]     *   Create `LoginView.jsx` and `SignupView.jsx` (if email/password signup is enabled).
[ ]     *   These components will contain forms for user input (email, password).
[ ]     *   Alternatively, integrate FirebaseUI for a pre-built authentication flow if a quicker solution is preferred over custom UI.
[ ] *   **4.1.3. Implement Authentication Logic (Auth Service/Context):**
[ ]     *   Create an authentication service (`authService.js`) or use React Context (`AuthContext.js`) to manage:
[ ]         *   User sign-up, sign-in, and sign-out using Firebase SDK methods (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signInWithPopup` for Google, `signOut`).
[ ]         *   Listening to authentication state changes (`onAuthStateChanged`) to update the global user state.
[ ] *   **4.1.4. Implement Logout Functionality:**
[ ]     *   Provide a "Logout" button/link (e.g., in `Navbar.jsx`) that calls the sign-out method from the auth service/context.
[ ] *   **4.1.5. Implement Protected Routes:**
[ ]     *   Create a `ProtectedRoute.jsx` higher-order component or use `react-router-dom` features (e.g., `loader` functions or `Outlet` context) to check authentication status.
[ ]     *   Wrap all application routes (except login/signup) with this protection.
[ ]     *   Redirect unauthenticated users attempting to access protected routes to the `LoginView.jsx`.
[ ] *   **4.1.6. Display User Information (Optional Enhancement):**
[ ]     *   In `Navbar.jsx` or a user profile section, display basic information about the logged-in user (e.g., email or display name).
[ ] *   **4.1.7. Update Firestore Security Rules for Authenticated Access:**
[ ]     *   Review and refine Firestore security rules (initially defined in [`firebase_react_build_plan.md:132`](firebase_react_build_plan.md:132)) to incorporate `request.auth.uid`.
[ ]     *   Example rules:
[ ]         *   Allow users to read appraisals they are assigned to (`resource.data.assigned_user_id == request.auth.uid`).
[ ]         *   Allow users to create appraisal logs where `log.user_id == request.auth.uid`.
[ ]         *   Restrict write access to certain fields or collections based on user roles (if roles are introduced later).

### 4.2. Milestones:

[ ] *   **M4.2.1:** Firebase Authentication is confirmed configured with chosen sign-in provider(s).
[ ] *   **M4.2.2:** Login UI component(s) (`LoginView.jsx`, potentially `SignupView.jsx` or FirebaseUI) developed and functional; users can successfully sign in using at least one configured method.
[ ] *   **M4.2.3:** Logout functionality is implemented and accessible; users can successfully sign out.
[ ] *   **M4.2.4:** Global application state (e.g., via `AuthContext`) correctly reflects the user's authentication status (logged in/out, current user object).
[ ] *   **M4.2.5:** Protected routes are implemented and effectively prevent unauthenticated users from accessing them, redirecting to the login page.
[ ] *   **M4.2.6:** Authenticated users can seamlessly access protected routes after logging in.
[ ] *   **M4.2.7:** Firestore security rules are updated and tested to enforce data access based on `request.auth.uid`.

### 4.3. Suggested Tests/Verification:

[ ] *   **T4.3.1:** Test user sign-up (if custom email/password signup is implemented) and login with valid credentials for each enabled provider.
[ ] *   **T4.3.2:** Test login attempts with invalid credentials (wrong password, non-existent user); verify appropriate error messages are displayed to the user.
[ ] *   **T4.3.3:** Verify user can log out successfully, and the application state updates accordingly (e.g., user redirected to login, protected content inaccessible).
[ ] *   **T4.3.4:** Attempt to directly navigate to a protected route URL while logged out; verify redirection to the login page.
[ ] *   **T4.3.5:** After logging in, navigate to various protected routes; verify access is granted.
[ ] *   **T4.3.6:** If user information display (M4.1.6) is implemented, verify it shows correct details for the logged-in user.
[ ] *   **T4.3.7:** Test Firestore security rules by attempting actions that should be allowed/disallowed:
[ ]     *   As an unauthenticated user, try to read/write data that requires authentication.
[ ]     *   As an authenticated user, try to perform actions according to their permissions (e.g., create a log entry, ensuring `user_id` is correctly populated and validated by rules).
[ ]     *   If rules restrict access based on `assigned_user_id`, test that users can only see/edit appraisals assigned to them.

## 5. Future Considerations

### 5.1. Revisit Firebase Cloud Functions

**Reminder for Phase 4 (or later):**

[ ] We have decided to temporarily skip the implementation of Firebase Cloud Functions (originally planned for Phase 2, Section 2). This section serves as a reminder to re-evaluate and potentially integrate them.

**Potential Use Cases for Cloud Functions:**

[ ] *   **Advanced Server-Side Data Validation:** Implement complex validation logic that cannot or should not be handled purely on the client-side.
[ ] *   **Complex Data Denormalization/Aggregation:** Trigger functions based on Firestore events (e.g., `onCreate`, `onUpdate`, `onDelete`) to perform:
[ ]     *   Denormalization of data across collections for optimized querying.
[ ]     *   Aggregation of data (e.g., calculating averages, sums, counts) and storing results.
[ ] *   **Automated Tasks or Notifications:**
[ ]     *   Send email or push notifications based on specific data changes or scheduled intervals.
[ ]     *   Perform routine cleanup tasks.
[ ]     *   Integrate with third-party services.
[ ] *   **Other Backend Logic:**
[ ]     *   Any business logic that requires elevated privileges or should not be exposed on the client-side for security reasons.
[ ]     *   Computationally intensive tasks that could degrade client-side performance.