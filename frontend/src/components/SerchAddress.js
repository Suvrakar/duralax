import React, { useEffect, useRef, useState } from "react";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchAddressInput = ({ setgetAddress, placeholder }) => {
  const [addressQuery, setAddressQuery] = useState("");
  const autoCompleteAddressRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteAddressRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteAddressRef.current,
      {
        componentRestrictions: { country: ["us", "ca"] },
      }
    );
    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    const query = addressObject?.formatted_address;
    updateQuery(query);
    setgetAddress(query);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad(setAddressQuery, autoCompleteAddressRef)
    );
  }, []);


  return (
    <div className="search-location-input">
      <label>Billing Address</label>
      <input
        ref={autoCompleteAddressRef}
        className="form-control"
        onChange={(event) => setAddressQuery(event.target.value)}
        placeholder={placeholder || "Search Address ..."}
        value={addressQuery}
      />
    </div>
  );
};

export default SearchAddressInput;
