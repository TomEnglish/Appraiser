import React, { useEffect } from 'react'; // Removed useState as it's no longer directly used for selections here
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap'; // Removed Form
import { useAppraisals } from '../../contexts/AppraisalContext.jsx'; 
import AppraisalLogList from '../logs/AppraisalLogList.jsx'; 
import LocationInfo from '../locations/LocationInfo.jsx'; 
import UtilityItemSelector from '../utilities/UtilityItemSelector.jsx'; // Import UtilityItemSelector

function AppraisalDetailView() {
  const { appraisalId } = useParams();
  // Removed local state for selectedUtilities and saveMessage, now handled by UtilityItemSelector

  const {
    currentAppraisalDetail,
    // utilityItems, // No longer directly used here, UtilityItemSelector will get it from context
    isLoadingCurrentAppraisal,
    // isLoadingUtilityItems, // Handled by UtilityItemSelector
    error: contextError, 
    fetchAppraisalWithLocation,
    fetchAllUtilityItems, // Still call this to ensure context is populated for UtilityItemSelector
    // updateAppraisalReportSelections, // This function is now called by UtilityItemSelector from context
  } = useAppraisals();

  // isLoadingUtilityItems is now handled within UtilityItemSelector
  const loading = isLoadingCurrentAppraisal; 

  useEffect(() => {
    if (appraisalId) {
      fetchAppraisalWithLocation(appraisalId);
      // Ensure utility items are fetched once for the context,
      // UtilityItemSelector will use them from there.
      fetchAllUtilityItems(); 
    }
  }, [appraisalId, fetchAppraisalWithLocation, fetchAllUtilityItems]);

  // useEffect for selectedUtilities removed, handled by UtilityItemSelector's prop
  // handleUtilitySelectionChange removed
  // handleSaveReportSelections removed

  if (loading) { // This now only reflects isLoadingCurrentAppraisal
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading appraisal details...</span>
        </Spinner>
      </Container>
    );
  }

  // If there's a context error AND the appraisal data itself hasn't loaded, show full page error.
  // UtilityItemSelector will handle its own errors for utility item loading.
  if (contextError && !currentAppraisalDetail?.appraisal) { 
    return (
      <Container className="mt-5">
        <Alert variant="danger">{contextError.message || JSON.stringify(contextError)}</Alert>
      </Container>
    );
  }

  if (!currentAppraisalDetail || !currentAppraisalDetail.appraisal) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Appraisal not found for ID: {appraisalId}</Alert>
      </Container>
    );
  }

  const { appraisal, location } = currentAppraisalDetail; 

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    if (dateValue.seconds && typeof dateValue.seconds === 'number') {
      return new Date(dateValue.seconds * 1000).toLocaleDateString();
    }
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        const parts = dateValue.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) -1; 
            const day = parseInt(parts[2], 10);
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                 return new Date(year, month, day).toLocaleDateString();
            }
        }
        return date.toLocaleDateString();
      }
    }
    return 'Invalid Date';
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header as="h2">Appraisal Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Title>Appraisal Information</Card.Title>
                  <p><strong>Appraisal ID:</strong> {appraisal.appraisal_id}</p>
                  <p><strong>Client Name:</strong> {appraisal.client_name}</p>
                  <p><strong>Status:</strong> {appraisal.status}</p>
                  <p><strong>Report Type:</strong> {appraisal.report_type}</p>
                  <p><strong>Creation Date:</strong> {formatDate(appraisal.creation_date)}</p>
                  <p><strong>Property Address (from Appraisal):</strong> {appraisal.property_address}</p>
                </Col>
                <Col md={6}>
                  <Card.Title>Location Information</Card.Title>
                  {location ? (
                    <LocationInfo locationData={location} />
                  ) : (
                    <p>No location data linked or found.</p>
                  )}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button as={Link} to={`/appraisals/edit/${appraisalId}`} variant="primary" className="me-2">
                Edit Appraisal
              </Button>
              <Button as={Link} to="/appraisals" variant="secondary">
                Back to List
              </Button>
            </Card.Footer>
          </Card>

          {/* Utility Item Selector Integration */}
          {appraisalId && appraisal && ( // Ensure appraisal data is loaded before rendering selector
            <UtilityItemSelector
              appraisalId={appraisalId}
              initialSelectedUtilities={appraisal.selected_for_report || {}}
            />
          )}
          
          {/* Appraisal Log List Integration */}
          {appraisalId && <AppraisalLogList appraisalId={appraisalId} />}

        </Col>
      </Row>
    </Container>
  );
}

export default AppraisalDetailView;