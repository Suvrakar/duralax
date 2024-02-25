import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import {
  uploadImage,
} from "../../slices/itemSlice";
import { useDispatch, useSelector } from "react-redux";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileUpload(props) {
  const { files, setFiles } = props

  const dispatch = useDispatch();
  const { uploadStatus, loading } = useSelector((state) => state?.item);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        let fromData = new FormData();
        fromData.append("image", file);
        dispatch(uploadImage(fromData))
          .then((response) => {
            // Handle success response
            if (response.payload.status == 200) {
              setFiles({ preview: response.payload.imageUrl });
            }
            // Perform any further actions here
          })
          .catch((error) => {
            // Handle error response
            toast.error("Please try again");
          });

        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const deleteFile = () => {
    setFiles({});
  };

  const filePreviews = () => (
    <div className="col-12 col-md-4" >
      <div className="file-upload-wrapper text-right">
        <div className="file-preview">
          {files.preview ? (
            <img
              src={files.preview}
              alt="Preview"
              className="file_upload_preview"
            />
          ) : uploadStatus == 'loading' && (
            <span className="file-name">Uploading...</span>
          )}
          <button
            type="button"
            className="btn btn-danger btn-sm ms-2 remove_img"
            onClick={() => deleteFile()}
          >
            <i className="bx bx-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="col-12">
      <div className="card mb-4">
        <div className="card-body" style={{ padding: '10px' }}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>

            <div className="file-upload-wrapper text-right">
              <label htmlFor="file-upload" className="btn btn-primary">
                <i className="bx bx-cloud-upload"></i>
                Upload file
              </label>
            </div>
          </div >
          <div className="">{filePreviews()}</div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
