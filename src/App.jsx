import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import AppraisalListView from './components/appraisals/AppraisalListView';
import AppraisalForm from './components/appraisals/AppraisalForm';
import AppraisalDetailView from './components/appraisals/AppraisalDetailView'; // Imported new component

function App() {
  // Placeholder component for /appraisals/:appraisalId is no longer needed here
  // as AppraisalDetailView will handle fetching and displaying.

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<div>Welcome to the Appraisal App!</div>} />
        <Route path="/appraisals">
          <Route index element={<AppraisalListView />} />
          <Route path="new" element={<AppraisalForm />} />
          <Route path=":appraisalId" element={<AppraisalDetailView />} /> 
          <Route path="edit/:appraisalId" element={<AppraisalForm />} /> {/* Added edit route */}
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
