import React from "react";

function NotAccess() {
  return (
    <>
      <div className="content-wrapper">
        {/* Content */}
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">You Dont Have access of any page</h4>
          <p>
            Contact To Admin.
            <br />
            For more details...
          </p>
        </div>
        {/* / Content */}
        <div className="content-backdrop fade" />
      </div>
    </>
  );
}

export default NotAccess;
