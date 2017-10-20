import React from 'react';

import PrivateHeader from './PrivateHeader';
import Notes from './Notes';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <Notes/>
      </div>
    </div>
  );
};
