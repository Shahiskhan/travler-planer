import React from 'react';
import Hotels from '../../pages/Hotels';

const HotelsManagement = ({ miniAdmin = false }) => {
    // This component wraps the existing Hotels page
    // The Hotels page already has all the functionality we need
    return <Hotels />;
};

export default HotelsManagement;
