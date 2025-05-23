import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppraisalCard from './AppraisalCard.jsx';
import { useAppraisals } from '../../contexts/AppraisalContext.jsx'; // Corrected extension

function AppraisalListView() {
  const { appraisals, isLoadingAppraisals: isLoading, error, fetchAllAppraisals } = useAppraisals();

  useEffect(() => {
    // fetchAllAppraisals is memoized by useCallback in context if dependencies are stable,
    // but if it's not, and to prevent potential re-fetches if the function reference changes
    // unnecessarily, ensure its dependencies in the context are stable or pass an empty array
    // if it truly should only run once. Given it's a fetch, once on mount is typical.
    // If fetchAllAppraisals itself is stable (e.g., defined outside render or via useCallback with empty deps),
    // then [fetchAllAppraisals] is fine. If not, an empty array [] might be safer to ensure it only runs once.
    // For now, assuming fetchAllAppraisals is stable from context.
    fetchAllAppraisals();
  }, [fetchAllAppraisals]); 

  if (isLoading) {
    return (
      <Container fluid className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading appraisals...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Appraisal List</h2>
        <Link to="/appraisals/new">
          <Button variant="primary">Create New Appraisal</Button>
        </Link>
      </div>
      {appraisals.length === 0 && !isLoading && !error ? (
        <Alert variant="info">No appraisals found.</Alert>
      ) : (
        <Row>
          {appraisals.map((appraisal) => (
            <Col key={appraisal.id || appraisal.appraisal_id} sm={12} md={6} lg={4} className="mb-3">
              <AppraisalCard appraisal={appraisal} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default AppraisalListView;