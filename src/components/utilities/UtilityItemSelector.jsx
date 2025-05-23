import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppraisals } from '../../contexts/AppraisalContext.jsx';
import { Button, Form, Card, Alert, Spinner } from 'react-bootstrap';

function UtilityItemSelector({ appraisalId, initialSelectedUtilities = {} }) {
  const {
    utilityItems,
    isLoadingUtilityItems,
    updateAppraisalReportSelections,
    error: contextError, // Renaming to avoid conflict if a local 'error' state is ever needed
    fetchAllUtilityItems,
  } = useAppraisals();

  const [currentSelections, setCurrentSelections] = useState(initialSelectedUtilities);
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch utility items if they are not already loaded in the context or if the list is empty
    // This check prevents re-fetching if another component already loaded them.
    if (!isLoadingUtilityItems && (!utilityItems || utilityItems.length === 0)) {
      fetchAllUtilityItems();
    }
  }, [fetchAllUtilityItems, utilityItems, isLoadingUtilityItems]);

  useEffect(() => {
    // This effect ensures that if the initialSelectedUtilities prop changes
    // (e.g., parent component re-fetches appraisal data), the local state updates.
    setCurrentSelections(initialSelectedUtilities || {});
  }, [initialSelectedUtilities]);

  const handleSelectionChange = (itemId) => {
    setCurrentSelections((prevSelections) => ({
      ...prevSelections,
      [itemId]: !prevSelections[itemId],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      // Filter out false values before saving, to only store true selections
      const selectionsToSave = Object.entries(currentSelections)
        .filter(([key, value]) => value === true)
        .reduce((obj, [key, value]) => {
          obj[key] = value; // Store the actual boolean true
          return obj;
        }, {});

      const success = await updateAppraisalReportSelections(appraisalId, selectionsToSave);
      if (success) {
        setSaveMessage('Report selections saved successfully!');
      } else {
        setSaveMessage(contextError?.message || 'Failed to save selections. Please try again.');
      }
    } catch (err) {
      console.error("Error in UtilityItemSelector handleSave:", err);
      setSaveMessage(`Failed to save selections: ${err.message || 'Unknown error'}`);
    }
    setIsSaving(false);
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h3">Report Item Selection</Card.Header>
      <Card.Body>
        {isLoadingUtilityItems && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading utility items...</span>
            </Spinner>
          </div>
        )}
        {contextError && !isLoadingUtilityItems && ( // Show context error if utility items failed to load
          <Alert variant="danger">
            Error loading utility items: {typeof contextError === 'string' ? contextError : contextError.message || 'An unexpected error occurred.'}
          </Alert>
        )}
        {!isLoadingUtilityItems && !contextError && utilityItems && utilityItems.length > 0 && (
          <Form>
            {utilityItems.map((item) => (
              <Form.Check
                key={item.id}
                type="checkbox"
                id={`utility-item-${item.id}`}
                label={item.utility_name || 'Unnamed Utility Item'}
                checked={!!currentSelections[item.id]}
                onChange={() => handleSelectionChange(item.id)}
                className="mb-2"
              />
            ))}
          </Form>
        )}
        {!isLoadingUtilityItems && !contextError && (!utilityItems || utilityItems.length === 0) && (
          <p>No utility items available.</p>
        )}
        {saveMessage && (
          <Alert variant={saveMessage.includes('Failed') || saveMessage.includes('Error:') ? 'danger' : 'success'} className="mt-3">
            {saveMessage}
          </Alert>
        )}
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="success" onClick={handleSave} disabled={isSaving || isLoadingUtilityItems}>
          {isSaving ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              &nbsp;Saving...
            </>
          ) : (
            'Save Report Selections'
          )}
        </Button>
      </Card.Footer>
    </Card>
  );
}

UtilityItemSelector.propTypes = {
  appraisalId: PropTypes.string.isRequired,
  initialSelectedUtilities: PropTypes.object,
};

export default UtilityItemSelector;