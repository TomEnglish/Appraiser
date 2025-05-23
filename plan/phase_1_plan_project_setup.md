# Granular Plan: Phase 1 - Project Setup & Foundation

This document provides a detailed breakdown of **Phase 1: Project Setup & Foundation** for the Firebase & React-Vite Application.

## 1. Firebase Project Creation

[ ] *   **Description**: Set up the necessary Firebase project and enable core services.
[ ] *   **High-Level Task**: Firebase Project Creation: Set up Firestore database, Authentication.

### Sub-Tasks:
[x ]     1.1. **Create Firebase Project**:
[ ]         *   Go to the Firebase console ([https://console.firebase.google.com/](https://console.firebase.google.com/)).
[x ]         *   Create a new Firebase project.
[x ]         *   Define a project name (e.g., "AppraisalDataApp").
[x ]         *   Configure project settings (e.g., region, analytics).
[x ]     1.2. **Enable Firestore Database**:
[ ]         *   Navigate to "Firestore Database" in the Firebase console.
[ ]         *   Create a new Firestore database.
[ ]         *   Choose "Start in production mode" (recommended for defining security rules upfront) or "Start in test mode" (if initial open access is preferred, to be secured later).
[ ]         *   Select a Cloud Firestore location (this cannot be changed later).
[x ]     1.3. **Enable Firebase Authentication**:
[ ]         *   Navigate to "Authentication" in the Firebase console.
[ ]         *   Click "Get started."
[ ]         *   Enable desired sign-in methods (e.g., Email/Password, Google). For initial setup, Email/Password is sufficient.

### Milestones:
[ ] *   **M1.1**: Firebase project created and accessible in the Firebase console.
[ ]     *   **Verification**: Log in to Firebase console and see the new project listed.
[ ] *   **M1.2**: Firestore database enabled and accessible.
[ ]     *   **Verification**: Firestore console shows the database is active. Able to manually add a test collection/document.
[ ] *   **M1.3**: Firebase Authentication enabled with at least one sign-in method configured.
[ ]     *   **Verification**: Authentication console shows the chosen sign-in provider(s) as enabled.

## 2. Firestore Security Rules

[x ] *   **Description**: Define initial security rules for the four core collections (`appraisals`, `appraisal_logs`, `locations`, `report_utilities`) to ensure data integrity and access control.
[x ] *   **High-Level Task**: Firestore Security Rules: Define initial security rules for the four core collections.

### Sub-Tasks:
[x ]     2.1. **Draft Initial Security Rules**:
[ ]         *   Define basic rules:
[ ]             *   `appraisals`: Allow authenticated users to read/write their own data or based on roles (if defined early). Initially, might be `allow read, write: if request.auth != null;` for development.
[ ]             *   `appraisal_logs`: Allow authenticated users to create. Read access might be restricted or open for authenticated users.
[ ]             *   `locations`: Allow authenticated users to read. Write access might be restricted initially.
[ ]             *   `report_utilities`: Allow authenticated users to read. Write access might be restricted to admin roles (if defined).
[ ]         *   Consider data validation rules (e.g., data types, required fields) if implementing more robust rules from the start.
[ ]     2.2. **Implement and Deploy Rules**:
[x ]         *   Write the rules in the Firebase console's Firestore "Rules" tab.
[0 ]         *   Use the Firebase Rules Playground to test the rules against various scenarios.
[x ]         *   Publish the rules.

### Milestones:
[ ] *   **M2.1**: Initial security rules for `appraisals`, `appraisal_logs`, `locations`, and `report_utilities` drafted.
[ ]     *   **Verification**: Security rules document (`firestore.rules`) created or rules drafted in a text file, outlining access controls for each collection.
[ ] *   **M2.2**: Security rules deployed to Firebase and basic tests pass.
[ ]     *   **Verification**: Rules are published in the Firebase console. Manual attempts to read/write data (violating and conforming to rules) using the Firestore data viewer or a simple script behave as expected. For example, an unauthenticated user cannot write if rules require authentication.

## 3. React-Vite Project Initialization

[ ] *   **Description**: Create the frontend React application using Vite for a fast development environment.
[ ] *   **High-Level Task**: React-Vite Project Initialization: Create the React project using Vite.

### Sub-Tasks:
[x ]     3.1. **Ensure Node.js and npm/yarn are installed**:
[ ]         *   Verify current versions.
[x ]     3.2. **Create React Project using Vite**:
[ ]         *   Run `npm create vite@latest appraisal-data-frontend -- --template react-ts` (for TypeScript) or `npm create vite@latest appraisal-data-frontend -- --template react` (for JavaScript).
[ ]         *   Navigate into the project directory: `cd appraisal-data-frontend`.
[x ]     3.3. **Install Dependencies**:
[ ]         *   Run `npm install` (or `yarn install`).
[x ]     3.4. **Initial Project Run**:
[ ]         *   Run `npm run dev` (or `yarn dev`) to start the development server.
[ ]         *   Verify the default Vite app loads in the browser.

### Milestones:
[x ] *   **M3.1**: React-Vite project structure created locally.
[ ]     *   **Verification**: Project directory `appraisal-data-frontend` exists with Vite's default file structure.
[x ] *   **M3.2**: Basic Vite application runs successfully locally.
[ ]     *   **Verification**: Running `npm run dev` starts the server, and the default React application is viewable and functional in a web browser (typically at `http://localhost:5173`).

## 4. Firebase SDK Integration

[ ] *   **Description**: Install and configure the Firebase SDK within the React application to enable communication with Firebase services.
[ ] *   **High-Level Task**: Firebase SDK Integration: Install and configure the Firebase SDK in the React app.

### Sub-Tasks:
[x ]     4.1. **Install Firebase SDK**:
[x ]         *   In the React project directory, run `npm install firebase` (or `yarn add firebase`).
[x ]     4.2. **Obtain Firebase Project Configuration**:
[x ]         *   In the Firebase console, go to "Project settings" -> "Your apps".
[x ]         *   Click the web icon (`</>`) to "Add an app" if not already done, or select an existing web app.
[x ]         *   Register the app and copy the Firebase SDK setup snippet (the `firebaseConfig` object).
[x ]     4.3. **Create Firebase Configuration File**:
[x ]         *   Create a file (e.g., `src/firebaseConfig.js` or `src/firebaseConfig.ts`).
[x ]         *   Initialize Firebase in this file using the `firebaseConfig` object.
[x ]         *   Export the Firebase app instance, Firestore instance, and Auth instance.
[ ]         *   Ensure API keys and other sensitive information are handled securely (e.g., using environment variables, though for initial local dev, direct inclusion is common before .env setup).
[x ]     4.4. **Test Basic Firebase Connection**:
[ ]         *   Attempt a simple Firestore read or write from a component (e.g., `App.jsx`) to verify the connection.

### Milestones:
[ ] *   **M4.1**: Firebase SDK installed in the React project.
[ ]     *   **Verification**: `firebase` package is listed in `package.json` and `node_modules`.
[ ] *   **M4.2**: Firebase configuration is set up in the React app.
[ ]     *   **Verification**: `firebaseConfig.js` (or `.ts`) file created with project credentials. Firebase app initialized.
[ ] *   **M4.3**: Basic Firebase service (e.g., Firestore) can be accessed from the React app.
[x ]     *   **Verification**: A test component can successfully connect to Firestore (e.g., fetch a test document or write one and confirm in Firebase console). No console errors related to Firebase initialization.

## 5. Basic UI Layout

[ ] *   **Description**: Implement the main layout components (e.g., Navbar, Sidebar, main content area) to provide a consistent structure for the application.
[ ] *   **High-Level Task**: Basic UI Layout: Implement main layout components (Navbar, Sidebar).

### Sub-Tasks:
[ ]     5.1. **Plan Layout Structure**:
[ ]         *   Sketch or wireframe the main application layout (Header/Navbar, optional Sidebar, main content area).
[ ]     5.2. **Create Layout Components**:
[ ]         *   Develop `MainLayout.jsx` component that orchestrates the overall page structure.
[ ]         *   Develop `Navbar.jsx` component with basic branding/title and placeholder navigation links.
[ ]         *   Develop `Sidebar.jsx` component (if applicable) with placeholder navigation links.
[ ]         *   Style these components minimally for structure.
[ ]     5.3. **Integrate Layout into App**:
[ ]         *   Modify `App.jsx` (or router setup if `react-router-dom` is introduced early) to use `MainLayout.jsx` for primary views.

### Milestones:
[ ] *   **M5.1**: Core layout components (`MainLayout`, `Navbar`, `Sidebar`) created.
[ ]     *   **Verification**: Component files exist in the `src/layouts/` or `src/components/` directory.
[ ] *   **M5.2**: Basic application structure with Navbar and content area is visible and functional.
[ ]     *   **Verification**: When the app runs, the Navbar is displayed consistently, and there's a designated area for page content. Placeholder links might be present.

## 6. Version Control

[ ] *   **Description**: Set up a Git repository for version control and collaboration.
[ ] *   **High-Level Task**: Version Control: Setup Git repository.

### Sub-Tasks:
[ ]     6.1. **Initialize Git Repository**:
[ ]         *   In the React project's root directory (`appraisal-data-frontend`), run `git init`.
[ ]     6.2. **Create `.gitignore` file**:
[ ]         *   Add common Node.js/React/Vite patterns to ignore (e.g., `node_modules/`, `.env`, `dist/`, build artifacts).
[ ]     6.3. **Initial Commit**:
[ ]         *   Stage all relevant project files: `git add .`
[ ]         *   Commit the initial project setup: `git commit -m "Initial project setup: Vite app, Firebase config, basic layout"`
[ ]     6.4. **Create Remote Repository (Optional but Recommended)**:
[ ]         *   Create a new repository on a hosting service (e.g., GitHub, GitLab, Bitbucket).
[ ]         *   Link the local repository to the remote: `git remote add origin <repository_url>`
[ ]         *   Push the initial commit: `git push -u origin main` (or `master`).

### Milestones:
[ ] *   **M6.1**: Local Git repository initialized for the frontend project.
[ ]     *   **Verification**: `.git` directory exists in the project root. `git status` shows a clean working tree after the initial commit.
[ ] *   **M6.2**: `.gitignore` file is configured.
[ ]     *   **Verification**: `.gitignore` file exists and correctly lists patterns like `node_modules/`. `git status` does not show `node_modules` as untracked files.
[ ] *   **M6.3**: Initial project files committed to the local repository.
[ ]     *   **Verification**: `git log` shows the initial commit.
[ ] *   **M6.4 (Optional)**: Project pushed to a remote repository.
[ ]     *   **Verification**: Code is visible on the remote repository hosting service. Able to clone the repository successfully to a new location.