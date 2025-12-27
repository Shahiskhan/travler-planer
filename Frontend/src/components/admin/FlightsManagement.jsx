import React from 'react';
import Flights from '../../pages/Flights';

const FlightsManagement = ({ miniAdmin = false }) => {
    // This component wraps the existing Flights page
    return <Flights />;
};

export default FlightsManagement;
