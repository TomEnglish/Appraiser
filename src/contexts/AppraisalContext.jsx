import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { appraisalService } from '../services/appraisalService'; 
import { locationService } from '../services/locationService';   
import { utilityService } from '../services/utilityService';    

const AppraisalContext = createContext();

export const AppraisalProvider = ({ children }) => {
  const [appraisals, setAppraisals] = useState([]);
  const [currentAppraisalDetail, setCurrentAppraisalDetail] = useState({ appraisal: null, location: null });
  const [utilityItems, setUtilityItems] = useState([]);
  const [isLoadingAppraisals, setIsLoadingAppraisals] = useState(false);
  const [isLoadingCurrentAppraisal, setIsLoadingCurrentAppraisal] = useState(false);
  const [isLoadingUtilityItems, setIsLoadingUtilityItems] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null);

  const fetchAllAppraisals = useCallback(async () => {
    setIsLoadingAppraisals(true);
    setError(null);
    try {
      const data = await appraisalService.getAllAppraisals();
      setAppraisals(data);
    } catch (err) {
      console.error('Error in fetchAllAppraisals:', err);
      setError(err.message || 'Failed to fetch appraisals');
      setAppraisals([]); 
    } finally {
      setIsLoadingAppraisals(false);
    }
  }, []); 

  const fetchAppraisalWithLocation = useCallback(async (appraisalId) => {
    if (!appraisalId) {
        console.warn("fetchAppraisalWithLocation called with no appraisalId");
        setCurrentAppraisalDetail({ appraisal: null, location: null });
        setError("No Appraisal ID provided to fetch details.");
        setIsLoadingCurrentAppraisal(false); 
        return;
    }
    setIsLoadingCurrentAppraisal(true);
    setError(null);
    try {
      const appraisalData = await appraisalService.getAppraisalById(appraisalId);
      if (appraisalData) {
        let locationData = null;
        if (appraisalData.location_ref) {
          const locationRefParts = appraisalData.location_ref.split('/');
          const locationId = locationRefParts.length === 2 ? locationRefParts[1] : null;
          
          if (locationId) {
            locationData = await locationService.getLocationById(locationId);
          } else {
            console.warn("Invalid location_ref format or missing ID:", appraisalData.location_ref);
          }
        }
        setCurrentAppraisalDetail({ appraisal: appraisalData, location: locationData });
      } else {
        setCurrentAppraisalDetail({ appraisal: null, location: null });
        setError(`Appraisal with ID ${appraisalId} not found.`);
      }
    } catch (err) {
      console.error(`Error in fetchAppraisalWithLocation for ID ${appraisalId}:`, err);
      setError(err.message || `Failed to fetch appraisal details for ID ${appraisalId}`);
      setCurrentAppraisalDetail({ appraisal: null, location: null }); 
    } finally {
      setIsLoadingCurrentAppraisal(false);
    }
  }, []); 

  const fetchAllUtilityItems = useCallback(async () => {
    setIsLoadingUtilityItems(true);
    setError(null);
    try {
      const data = await utilityService.getAllUtilityItems();
      setUtilityItems(data);
    } catch (err) {
      console.error('Error in fetchAllUtilityItems:', err);
      setError(err.message || 'Failed to fetch utility items');
      setUtilityItems([]); 
    } finally {
      setIsLoadingUtilityItems(false);
    }
  }, []); 

  const createAppraisalWithLocation = useCallback(async (appraisalCoreData, locationData) => {
    setIsSubmitting(true);
    setError(null);
    let newLocationId = null; 
    try {
      newLocationId = await locationService.createLocation(locationData);
      if (!newLocationId) {
        throw new Error("Location creation failed or did not return an ID.");
      }
      console.log('Location created in context with ID:', newLocationId);

      const newAppraisalId = `A-${Date.now()}`; 
      const appraisalToCreate = {
        ...appraisalCoreData,
        appraisal_id: newAppraisalId,
        creation_date: appraisalCoreData.creation_date || new Date().toISOString(), 
        location_ref: `locations/${newLocationId}`,
      };

      const createdAppraisalId = await appraisalService.createAppraisal(appraisalToCreate);
      if (!createdAppraisalId) {
        if (newLocationId) { 
            try {
                await locationService.deleteLocation(newLocationId);
                console.warn(`Cleaned up location ${newLocationId} after failed appraisal creation.`);
            } catch (cleanupError) {
                console.error(`Failed to cleanup location ${newLocationId}:`, cleanupError);
            }
        }
        throw new Error("Appraisal creation failed or did not return an ID.");
      }

      await fetchAllAppraisals(); 
      return createdAppraisalId; 
    } catch (err) {
      console.error('Error in createAppraisalWithLocation:', err);
      setError(err.message || 'Failed to create appraisal and location.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchAllAppraisals]);

  const updateAppraisalWithLocation = useCallback(async (appraisalId, appraisalCoreData, locationId, locationData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let locationUpdateSuccess = true; 
      if (locationId && locationData && Object.keys(locationData).length > 0) { 
        locationUpdateSuccess = await locationService.updateLocation(locationId, locationData);
        if (!locationUpdateSuccess) { 
          throw new Error(`Failed to update location ${locationId}.`);
        }
        console.log('Location updated in context with ID:', locationId);
      } else if (locationData && Object.keys(locationData).length > 0 && !locationId) {
         console.warn("updateAppraisalWithLocation: locationData provided without locationId. Location will not be updated if it's meant to be an existing one.");
      }

      const appraisalUpdateSuccess = await appraisalService.updateAppraisal(appraisalId, appraisalCoreData);
      if (!appraisalUpdateSuccess) { 
        throw new Error(`Failed to update appraisal ${appraisalId}.`);
      }
      console.log('Appraisal updated in context with ID:', appraisalId);

      await fetchAppraisalWithLocation(appraisalId); 
      await fetchAllAppraisals(); 

      return true;
    } catch (err) {
      console.error('Error in updateAppraisalWithLocation:', err);
      setError(err.message || 'Failed to update appraisal and/or location.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchAppraisalWithLocation, fetchAllAppraisals]);

  const updateAppraisalReportSelections = useCallback(async (appraisalId, selectedUtilities) => {
    setIsSubmitting(true); 
    setError(null);
    try {
      const success = await appraisalService.updateAppraisal(appraisalId, { selected_for_report: selectedUtilities });
      if (!success) {
        throw new Error("Failed to update appraisal report selections via appraisalService.");
      }
      await fetchAppraisalWithLocation(appraisalId); // Refresh currentAppraisalDetail
      return true;
    } catch (err) {
      console.error('Error in updateAppraisalReportSelections:', err);
      setError(err.message || 'Failed to update report selections in context.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchAppraisalWithLocation]); // Dependency on fetchAppraisalWithLocation

  const contextValue = {
    appraisals,
    currentAppraisalDetail,
    utilityItems,
    isLoadingAppraisals,
    isLoadingCurrentAppraisal,
    isLoadingUtilityItems,
    isSubmitting, 
    error,
    fetchAllAppraisals,
    fetchAppraisalWithLocation,
    fetchAllUtilityItems,
    createAppraisalWithLocation,
    updateAppraisalWithLocation,
    updateAppraisalReportSelections,
    setError, 
  };

  return (
    <AppraisalContext.Provider value={contextValue}>
      {children}
    </AppraisalContext.Provider>
  );
};

export const useAppraisals = () => {
  const context = useContext(AppraisalContext);
  if (context === undefined) {
    throw new Error('useAppraisals must be used within an AppraisalProvider');
  }
  return context;
};