import React from "react";

function PdfNote() {
  return (
    <>
      <div className="content-wrapper">
        {/* Content */}
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">PDf note</h4>
          <p>
            Sample page.
            <br />
            For more layout options use
            <a
              href="https://tools.themeselection.com/generator/sneat/html"
              target="_blank"
              className="fw-medium"
            >
              HTML starter template generator
            </a>
            and refer
            <a
              href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation//layouts.html"
              target="_blank"
              className="fw-medium"
            >
              Layout docs
            </a>
            .
          </p>
        </div>
        {/* / Content */}
        <div className="content-backdrop fade" />
      </div>
    </>
  );
}

export default PdfNote;
