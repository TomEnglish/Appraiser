# Detailed Plan: Phase 5 - Routing & Navigation

**Estimated Duration:** 1 Week

This phase focuses on establishing a robust client-side routing system using `react-router-dom` and implementing intuitive navigation UI components to ensure seamless user experience across different views of the application (data entry, review, and selection).

## 1. Implement Client-Side Routing with `react-router-dom`

This section covers the setup and configuration of `react-router-dom` to manage navigation within the application.

### 1.1. Setup `react-router-dom`
[ ] *   **Sub-Task:** Install `react-router-dom` package.
[ ]     *   `npm install react-router-dom` or `yarn add react-router-dom`.
[ ] *   **Sub-Task:** Configure the main `Router` (e.g., `BrowserRouter`) in the application's entry point (likely [`App.jsx`](App.jsx) or [`main.jsx`](main.jsx)).
[ ]     *   Wrap the main application component with `<BrowserRouter>`.
[ ] *   **Milestone:** `react-router-dom` is installed and the basic router setup is in place.
[ ] *   **Verification:**
[ ]     *   The application loads without errors after installing and setting up the router.
[ ]     *   Basic navigation (even to a placeholder home page) can be manually tested by changing the URL.

### 1.2. Define Route Configurations
[ ] *   **Sub-Task:** Create a dedicated route configuration file (e.g., in `src/routes/index.js` or `src/routes/AppRoutes.jsx`).
[ ]     *   This file will define all application routes and map them to their respective view components.
[ ] *   **Sub-Task:** Implement routes for core application views as outlined in the main plan:
[ ]     *   `/` or `/dashboard`: Maps to a `DashboardView.jsx` (or similar, e.g., redirect to `/appraisals`).
[ ]     *   `/appraisals`: Maps to [`AppraisalListView.jsx`](AppraisalListView.jsx).
[ ]     *   `/appraisals/new`: Maps to [`AppraisalForm.jsx`](AppraisalForm.jsx:103) (in "create" mode).
[ ]     *   `/appraisals/:appraisalId`: Maps to [`AppraisalDetailView.jsx`](AppraisalDetailView.jsx:97).
[ ]     *   `/appraisals/:appraisalId/edit`: Maps to [`AppraisalForm.jsx`](AppraisalForm.jsx:103) (in "edit" mode, passing `appraisalId`).
[ ]     *   `/select-report-items/:appraisalId`: Maps to [`ReportUtilitySelectorView.jsx`](ReportUtilitySelectorView.jsx) (passing `appraisalId`).
[ ] *   **Sub-Task:** Implement handling for dynamic route parameters (e.g., `:appraisalId`).
[ ]     *   Ensure components like [`AppraisalDetailView.jsx`](AppraisalDetailView.jsx:97), [`AppraisalForm.jsx`](AppraisalForm.jsx:103) (edit mode), and [`ReportUtilitySelectorView.jsx`](ReportUtilitySelectorView.jsx) can correctly receive and use the `appraisalId` parameter (e.g., using the `useParams` hook).
[ ] *   **Sub-Task:** Implement a "Not Found" (404) route and corresponding component.
[ ] *   **Milestone:** All specified routes are defined and map to their correct view components. Dynamic route parameters are accessible within components.
[ ] *   **Verification:**
[ ]     *   Manually navigate to each defined route (e.g., `/appraisals`, `/appraisals/new`, `/appraisals/test-id`, `/appraisals/test-id/edit`, `/select-report-items/test-id`).
[ ]     *   Confirm that the correct view component loads for each route.
[ ]     *   Verify that components receiving dynamic parameters (like `:appraisalId`) can access and display/use the parameter value.
[ ]     *   Navigating to an undefined route displays the "Not Found" page.

### 1.3. Integrate Routes with Main Layout
[ ] *   **Sub-Task:** Integrate the route rendering mechanism (e.g., `<Routes>` and `<Route>` components from `react-router-dom`) within the [`MainLayout.jsx`](MainLayout.jsx) component.
[ ]     *   The [`MainLayout.jsx`](MainLayout.jsx) should render common UI elements (like [`Navbar.jsx`](Navbar.jsx:110), [`Sidebar.jsx`](Sidebar.jsx:110)) and a content area where the routed view components are displayed.
[ ] *   **Milestone:** Routed views are correctly rendered within the [`MainLayout.jsx`](MainLayout.jsx), preserving common UI elements.
[ ] *   **Verification:**
[ ]     *   Navigating between different routes shows the correct view component rendered within the consistent main layout structure (header, sidebar, etc., remain visible and functional).

## 2. Implement Navigation UI

This section focuses on creating user-friendly navigation elements that correspond to the defined routes.

### 2.1. Develop Navigation Links in `Navbar.jsx` and/or `Sidebar.jsx`
[ ] *   **Sub-Task:** Implement navigation links (e.g., using `<Link>` or `<NavLink>` from `react-router-dom`) in [`Navbar.jsx`](Navbar.jsx:110) and/or [`Sidebar.jsx`](Sidebar.jsx:110) for primary navigation paths.
[ ]     *   Examples: "Dashboard", "Appraisals List".
[ ] *   **Sub-Task:** Ensure navigation links correctly point to the defined routes.
[ ] *   **Milestone:** Core navigation links are present in [`Navbar.jsx`](Navbar.jsx:110)/[`Sidebar.jsx`](Sidebar.jsx:110) and navigate to the correct views.
[ ] *   **Verification:**
[ ]     *   Clicking on navigation links in the Navbar/Sidebar successfully navigates to the corresponding routes and loads the correct views.

### 2.2. Implement Active Link Styling
[ ] *   **Sub-Task:** Implement visual feedback for active navigation links (e.g., using `<NavLink>`'s `activeClassName` or `style` prop).
[ ]     *   The currently active route's link in the Navbar/Sidebar should be visually distinct (e.g., different background color, bold text).
[ ] *   **Milestone:** Active navigation links are clearly indicated in the UI.
[ ] *   **Verification:**
[ ]     *   As the user navigates to different sections, the corresponding link in the Navbar/Sidebar updates its style to indicate it's active.

### 2.3. Ensure Logical Flow and Contextual Navigation
[ ] *   **Sub-Task:** Implement contextual navigation elements where appropriate.
[ ]     *   Example: A "Create New Appraisal" button on the [`AppraisalListView.jsx`](AppraisalListView.jsx) that navigates to `/appraisals/new`.
[ ]     *   Example: "Edit" and "Select Report Items" buttons/links on the [`AppraisalDetailView.jsx`](AppraisalDetailView.jsx:97) that navigate to `/appraisals/:appraisalId/edit` and `/select-report-items/:appraisalId` respectively.
[ ] *   **Sub-Task:** Ensure a logical and intuitive navigation flow between data entry, review, and selection views.
[ ]     *   For instance, after creating a new appraisal, the user might be redirected to the detail view for that appraisal or back to the list view.
[ ] *   **Milestone:** Navigation is intuitive, and contextual links facilitate efficient workflows between related views.
[ ] *   **Verification:**
[ ]     *   Contextual navigation elements (e.g., "Create New", "Edit" buttons) navigate to the correct routes, passing necessary parameters like `appraisalId`.
[ ]     *   The overall navigation flow feels logical and supports common user tasks (e.g., viewing a list, opening an item, editing it, selecting related items).

## Summary of Milestones & Verification for Phase 5:

[ ] *   **M1: `react-router-dom` Setup Complete:**
[ ]     *   **Verify:** Application loads, basic URL changes work.
[ ] *   **M2: All Routes Defined & Mapping Correctly:**
[ ]     *   **Verify:** Each route loads the correct component, dynamic params are passed, 404 page works.
[ ] *   **M3: Routes Integrated with `MainLayout.jsx`:**
[ ]     *   **Verify:** Views render within the consistent layout.
[ ] *   **M4: Core Navigation Links Functional:**
[ ]     *   **Verify:** Navbar/Sidebar links navigate correctly.
[ ] *   **M5: Active Link Styling Implemented:**
[ ]     *   **Verify:** Active links are visually distinct.
[ ] *   **M6: Contextual Navigation & Logical Flow Established:**
[ ]     *   **Verify:** Contextual links work, overall navigation is intuitive.

This detailed plan should provide a clear roadmap for implementing routing and navigation in Phase 5.