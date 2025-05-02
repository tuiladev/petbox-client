import React from 'react';

const TabHeading = ({ title = '' }) => {
    return (
        <h2 className="title-xl capitalize text-primary mb-6 font-semibold">{title}</h2>
    );
};

export default TabHeading;
