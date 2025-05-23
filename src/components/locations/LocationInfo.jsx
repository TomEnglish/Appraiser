import React from 'react';
import PropTypes from 'prop-types';

const LocationInfo = ({ locationData }) => {
  if (!locationData) {
    return <p>No location data available.</p>;
  }

  return (
    <div>
      {locationData.property_name && <p><strong>Property Name:</strong> {locationData.property_name}</p>}
      {locationData.address_line1 && <p><strong>Address Line 1:</strong> {locationData.address_line1}</p>}
      {locationData.address_line2 && <p><strong>Address Line 2:</strong> {locationData.address_line2}</p>}
      {locationData.city && <p><strong>City:</strong> {locationData.city}</p>}
      {locationData.state && <p><strong>State:</strong> {locationData.state}</p>}
      {locationData.zip_code && <p><strong>Zip Code:</strong> {locationData.zip_code}</p>}
      {locationData.county && <p><strong>County:</strong> {locationData.county}</p>}
      {locationData.latitude && <p><strong>Latitude:</strong> {locationData.latitude}</p>}
      {locationData.longitude && <p><strong>Longitude:</strong> {locationData.longitude}</p>}
    </div>
  );
};

LocationInfo.propTypes = {
  locationData: PropTypes.shape({
    property_name: PropTypes.string,
    address_line1: PropTypes.string,
    address_line2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip_code: PropTypes.string,
    county: PropTypes.string,
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default LocationInfo;