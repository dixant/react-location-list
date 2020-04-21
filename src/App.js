import React from 'react';
import './style/App.scss';
import Location from './components/Location';
import LocationBlank from './components/LocationBlank';

function App() {
  return (
    <div>
      <Location></Location>
      <LocationBlank
        heading="Kindly Add Your Location First"
        subHeading="There is no location added right now">
      </LocationBlank>

    </div>
  );
}

export default App;
