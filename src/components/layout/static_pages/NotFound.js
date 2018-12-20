import React from 'react';

const NotFound = () => {
  const img = '../';
  return (
    <div>
      <h1 className="display-4">404 Page Not Found</h1>
      <img src={require('../../../misc/img/1.jfif')} alt="Not Found" />
      <p className="lead">Sorry that page does not exist</p>
    </div>
  );
};

export default NotFound;
