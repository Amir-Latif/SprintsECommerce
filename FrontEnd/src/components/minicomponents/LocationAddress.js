import React from 'react';

import LocationOnOutLinedIcon from '@material-ui/icons/LocationOnOutlined';
const logedIn = 'true';
const address = 'hawamdya';

function LocationAddress() {
  const style = {
    color: 'white',
    display:"flex",
    
  };
  const headerOption = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
    marginRight: '10px',
    color: '#fff',
  };
  const headerOptionOne = {
    fontSize: "12px",
    fontWeight: "400",
    fontFamily: "Arial, sans-serif",

  }
  const headerOptionTwo = {
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Arial, sans-serif",

  }
  return (
    <div style={style}>
      <div style={{ color: 'white' }}>
        <LocationOnOutLinedIcon />
      </div>
      <div style={headerOption}>
        <span style={headerOptionOne}>Deliver to</span>
        {logedIn ? <span style={headerOptionTwo}>{address}</span> : <span style={headerOptionTwo}>Select Your Address</span>}
      </div>
    </div>
  );
}

export default LocationAddress;
