import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppraisals } from '../../contexts/AppraisalContext.jsx';

function AppraisalForm() {
  const { appraisalId } = useParams(); // For edit mode
  const isEditMode = !!appraisalId;
  const navigate = useNavigate();

  const {
    createAppraisalWithLocation,
    updateAppraisalWithLocation,
    fetchAppraisalWithLocation,
    currentAppraisalDetail,
    isLoadingCurrentAppraisal: pageLoading, // Aliased for clarity during page load
    isSubmitting: formSubmitting, // Aliased for clarity during form submission
    error: contextError,
    setError: setContextError,
  } = useAppraisals();

  const [formData, setFormData] = useState({
    client_name: '',
    property_address: '',
    status: '',
    report_type: '',
    location: {
      property_name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip_code: '',
      county: '',
      latitude: '',
      longitude: '',
      parcel_id: '',
      property_type: ''
    }
  });
  // This state is crucial for knowing the ID of the location document to update
  const [fetchedLocationId, setFetchedLocationId] = useState(null); 

  // Effect to fetch data in edit mode
  useEffect(() => {
    if (isEditMode && appraisalId) {
      setContextError(null); // Clear previous errors from context
      fetchAppraisalWithLocation(appraisalId);
    } else {
      // Reset form for create mode or if appraisalId is cleared
      setFormData({
        client_name: '', property_address: '', status: '', report_type: '',
        location: { property_name: '', address_line1: '', address_line2: '', city: '', state: '', zip_code: '', county: '', latitude: '', longitude: '', parcel_id: '', property_type: '' }
      });
      setFetchedLocationId(null);
      setContextError(null); // Clear any lingering errors
    }
  }, [appraisalId, isEditMode, fetchAppraisalWithLocation, setContextError]);

  // Effect to populate form when data is fetched from context in edit mode
  useEffect(() => {
    if (isEditMode && currentAppraisalDetail && currentAppraisalDetail.appraisal) {
      const { appraisal, location } = currentAppraisalDetail;
      setFormData({
        client_name: appraisal.client_name || '',
        property_address: appraisal.property_address || '',
        status: appraisal.status || '',
        report_type: appraisal.report_type || '',
        location: {
          property_name: location?.property_name || '',
          address_line1: location?.address_line1 || '',
          address_line2: location?.address_line2 || '',
          city: location?.city || '',
          state: location?.state || '',
          zip_code: location?.zip_code || '',
          county: location?.county || '',
          latitude: location?.latitude !== undefined && location?.latitude !== null ? String(location.latitude) : '',
          longitude: location?.longitude !== undefined && location?.longitude !== null ? String(location.longitude) : '',
          parcel_id: location?.parcel_id || '',
          property_type: location?.property_type || ''
        }
      });
      // Store the ID of the fetched location for updates
      if (location && location.id) {
        setFetchedLocationId(location.id);
      } else if (appraisal.location_ref) { 
        // Fallback if location object doesn't have id but ref exists
        const refParts = appraisal.location_ref.split('/');
        if (refParts.length === 2 && refParts[0] === 'locations') {
            setFetchedLocationId(refParts[1]);
        }
      } else {
        setFetchedLocationId(null);
      }
    }
  }, [currentAppraisalDetail, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContextError(null); // Clear previous errors

    const { client_name, property_address, status, report_type, location } = formData;

    const appraisalCoreData = {
      client_name,
      property_address,
      status,
      report_type,
    };

    const locationDataForSubmit = {
      ...location,
      latitude: location.latitude !== '' ? Number(location.latitude) : null,
      longitude: location.longitude !== '' ? Number(location.longitude) : null,
    };

    if (isEditMode) {
      const success = await updateAppraisalWithLocation(appraisalId, appraisalCoreData, fetchedLocationId, locationDataForSubmit);
      if (success) {
        navigate(`/appraisals/${appraisalId}`);
      }
      // Error handling is done within the context function, contextError will be set
    } else {
      // Create Mode
      const createdId = await createAppraisalWithLocation(appraisalCoreData, locationDataForSubmit);
      if (createdId) {
        navigate(`/appraisals/${createdId}`);
      }
      // Error handling is done within the context function
    }
  };

  if (pageLoading && isEditMode) { 
    return <Container className="mt-5 text-center"><Spinner animation="border" /> <p>Loading appraisal data...</p></Container>;
  }

  return (
    <Container>
      <h1 className="my-4">{isEditMode ? `Edit Appraisal ${appraisalId}` : 'Create New Appraisal'}</h1>
      {contextError && (
        <Alert variant="danger" onClose={() => setContextError(null)} dismissible>
          Error: {typeof contextError === 'string' ? contextError : contextError.message || 'An unexpected error occurred.'}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Client Name */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formClientName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter client name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        {/* Property Address (Legacy/Overall) */}
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPropertyAddress">
            <Form.Label>Property Address (Legacy/Overall)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter property address"
              name="property_address"
              value={formData.property_address}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        {/* Status and Report Type */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formReportType">
            <Form.Label>Report Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter report type"
              name="report_type"
              value={formData.report_type}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <hr />
        <h2 className="my-3">Location Details</h2>

        {/* Location Fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formLocationPropertyName">
            <Form.Label>Property Name (Location)</Form.Label>
            <Form.Control type="text" placeholder="Enter location property name" name="location.property_name" value={formData.location.property_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formLocationParcelId">
            <Form.Label>Parcel ID</Form.Label>
            <Form.Control type="text" placeholder="Enter parcel ID" name="location.parcel_id" value={formData.location.parcel_id} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLocationAddress1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control type="text" placeholder="Enter address line 1" name="location.address_line1" value={formData.location.address_line1} onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formLocationAddress2">
            <Form.Label>Address Line 2 (Optional)</Form.Label>
            <Form.Control type="text" placeholder="Enter address line 2" name="location.address_line2" value={formData.location.address_line2} onChange={handleChange} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formLocationCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" name="location.city" value={formData.location.city} onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="formLocationState">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state" name="location.state" value={formData.location.state} onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="formLocationZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="text" placeholder="Enter zip code" name="location.zip_code" value={formData.location.zip_code} onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formLocationCounty">
            <Form.Label>County</Form.Label>
            <Form.Control type="text" placeholder="Enter county" name="location.county" value={formData.location.county} onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formLocationPropertyType">
            <Form.Label>Property Type (Location)</Form.Label>
            <Form.Control type="text" placeholder="Enter location's property type" name="location.property_type" value={formData.location.property_type} onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="formLocationLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control type="text" placeholder="Enter latitude" name="location.latitude" value={formData.location.latitude} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formLocationLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control type="text" placeholder="Enter longitude" name="location.longitude" value={formData.location.longitude} onChange={handleChange} />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="mt-3" disabled={formSubmitting || pageLoading}>
          {formSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Appraisal' : 'Create Appraisal')}
        </Button>
      </Form>
    </Container>
  );
}

export default AppraisalForm;