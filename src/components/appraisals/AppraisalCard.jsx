import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const AppraisalCard = ({ appraisal }) => {
  if (!appraisal) {
    return null;
  }

  const displayAppraisalId = (id) => {
    if (typeof id === 'string' && id.startsWith('A-')) {
      return id;
    }
    return `A-${id}`;
  };

  return (
    <Link to={`/appraisals/${appraisal.appraisal_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card style={{ marginBottom: '1rem' }}>
        <Card.Body>
          <Card.Title>{displayAppraisalId(appraisal.appraisal_id)}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{appraisal.client_name}</Card.Subtitle>
          <Card.Text>
            <strong>Address:</strong> {appraisal.property_address}<br />
            <strong>Status:</strong> {appraisal.status}<br />
            <strong>Created:</strong> {appraisal.creation_date ? new Date(appraisal.creation_date).toLocaleDateString() : 'N/A'}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default AppraisalCard;