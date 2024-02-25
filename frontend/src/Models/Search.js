import React, { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const PlacesSearch = ({ onPlaceSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoadAutocomplete = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelect({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error("Place contains no geometry");
      }
    } else {
      console.error("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDu5ZzIn1udbz1GBy7X6ofhuHKJqt6Sq-o"
      libraries={["places"]}
      onLoad={() => console.log("Google Maps API loaded successfully")}
    >
      <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter a location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default PlacesSearch;
