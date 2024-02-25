import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import {
  uploadImage,
  createItem,
  updateItem,
  fetchLists,
  //material
  mfetchLists,
  mcreateItem,
  mupdateItem,
} from "../slices/itemSlice";
import { toast } from "react-hot-toast";
import Select from "react-select";

export default function ItemAddEditModel(props) {
  const {
    initialState,
    actionType,
    filter,
    title,
    isFrom,
    setactionType,
    itemCat,
    setinitialState,
  } = props;
  // Create a ref to store the Formik instance
  const formikRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const dispatch = useDispatch();
  const { uploadStatus, loading } = useSelector((state) => state?.item);
  const [isOpen, setisOpen] = useState(true);
  const [selectedCat, setselectedCat] = useState();
  const style = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? `1px solid #F89c1c` : `1px solid #d9dee3`,
      color: state.isFocused ? "#697a8d" : "#697a8d",
      backgroundColor: "#fff",
      boxShadow: state.isFocused
        ? "0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1)"
        : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#a6a6a6" : "#F89c1c",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff", // Disabling background color for dropdown items
      color: "#697a8d",
    }),
    option: (base, state) => ({
      ...base,
      color: "#697a8d",
      backgroundColor: state.isFocused ? "#e9ecef" : "#fff",
      // "&:hover": {
      //   backgroundColor: "#e9ecef",
      // },
    }),
  };

  const editSchema = Yup.object({
    item_code: Yup.string().required("Required"),
  });
  useEffect(() => {
    if (actionType == "edit") {
      let selectedItem = itemCat?.find(
        (item) => item?.value == initialState?.category?._id
      );
      if (!!initialState?.imgUrl) {
        setPreviewURL(initialState.imgUrl);
        setSelectedFile(true);
      } else {
        setPreviewURL("");
        setSelectedFile("");
      }
      setselectedCat(selectedItem);
      formikRef.current.setValues({
        status: initialState.status,
        item_code: initialState.item_code,
        shop_hr: initialState.shop_hr,
        shop_mm: initialState.shop_mm,
        description: initialState.description,
        install_hr: initialState.install_hr,
        install_mm: initialState.install_mm,
        fixed_price: initialState.fixed_price,
        glass_sqft: initialState.glass_sqft,
        alumunium_pond: initialState.alumunium_pond,
      });
    } else {
      // formikRef.current.setValues({
      //   item_code: "",
      //   shop_hr: "",
      //   shop_mm: "",
      //   status: true,
      //   description: "",
      //   install_hr: "",
      //   install_mm: "",
      //   fixed_price: "",
      //   glass_sqft: "",
      //   alumunium_pond: "",
      // });
      // setselectedCat();
      // handleFileDelete();
    }
  }, [actionType, initialState, itemCat]);

  const callback = () => {
    let ele = document.getElementById("item_d");
    ele?.click();
    handleFileDelete();
    switch (isFrom) {
      case "item":
        setinitialState({});
        dispatch(fetchLists(filter));
        break;
      case "material":
        setinitialState({});
        dispatch(mfetchLists(filter));
        break;
      default:
        break;
    }
  };

  const [editData] = useState({
    item_code: "",
    shop_hr: "",
    shop_mm: "",
    status: true,
    description: "",
    install_hr: "",
    install_mm: "",
    fixed_price: "",
    glass_sqft: "",
    alumunium_pond: "",
  });

  const handleFileChange = (e) => {
    handleFileDelete();
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    // Check if a file is selected
    if (file) {
      // Check file size
      if (file.size > maxSize) {
        // File size exceeds the maximum allowed size
        toast.error("File size exceeds the maximum limit of 5MB.");
        return;
      }
    }
    setSelectedFile(file);
    let fromData = new FormData();
    fromData.append("image", file);
    dispatch(uploadImage(fromData))
      .then((response) => {
        // Handle success response
        if (response.payload.status == 200) {
          setPreviewURL(response.payload.imageUrl);
        } else {
          toast.error("Please try again");
          handleFileDelete();
        }
        // Perform any further actions here
      })
      .catch((error) => {
        // Handle error response
        toast.error("Please try again");
      });

    // Clear the file input field
    e.target.value = "";
  };

  const handleFileDelete = () => {
    // Clear both selected file and preview URL
    setisOpen(true);
    setSelectedFile("");
    setPreviewURL("");
  };

  // Define Yup schema
  const validationSchema = Yup.object({
    item_code: Yup.string().required("Required"),
  });

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
    data.imgUrl = previewURL || "";
    data.category = selectedCat?.value || itemCat[0]?._id;

    switch (isFrom) {
      case "item":
        if (actionType == "edit") {
          dispatch(updateItem({ ...data, roleId: initialState._id })).finally(
            callback
          );
        } else {
          dispatch(createItem(data)).finally(callback);
        }
        break;
      case "material":
        if (actionType == "edit") {
          dispatch(mupdateItem({ ...data, roleId: initialState._id })).finally(
            callback
          );
        } else {
          dispatch(mcreateItem(data))
            .then((response) => {
              // Handle success response
              if (response.payload.status == 201) {
                callback();
              }
              // Perform any further actions here
            })
            .catch((error) => {
              // Handle error response
            });
        }
        break;
      default:
        break;
    }
  };

  // Function to detect outside clicks
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Reset Formik form if click is outside the modal
        if (isOpen) {
          setisOpen(false);
        }
        if (actionType !== "edit" && !isOpen) {
          handleFileDelete();
          setselectedCat("");
          formikRef.current.resetForm();
        }
      } else {
        setisOpen(false);
      }
    }
    // Add when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef, actionType, isOpen]); // Empty dependency array means it runs once on mount

  return (
    <>
      <div
        className="modal fade"
        id="editItem"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-md modal-simple modal-edit-user "
          id="editItem2"
          ref={modalRef}
        >
          <div className="modal-content">
            <div className="modal-body">
              <h1>{title}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="item_d"
                aria-label="Close"
              />
              {/* <div className="text-left mb-4">
                <h3>{actionType == "edit" ? "Edit" : "Add New"} User</h3>
                <p>{actionType == "edit" ? "Updating" : "Add"} user details.</p>
              </div> */}
              <Formik
                initialValues={editData}
                onSubmit={submitHandler}
                validationSchema={
                  actionType == "edit" ? editSchema : validationSchema
                }
                innerRef={formikRef} // Store Formik instance in the ref
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                    setValues,
                  } = props;

                  return (
                    <form
                      // id="editUserForm"
                      className="row g-3 "
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12 col-md-6">
                        <TextInput
                          label={
                            isFrom == "material"
                              ? "Material Name"
                              : "item code *"
                          }
                          id="item_code"
                          type="text"
                          placeholder={
                            isFrom == "material"
                              ? "Enter material name"
                              : "Enter item code"
                          }
                          value={values.item_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.item_code && errors.item_code}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label class="form-label" for="modalEditUserLanguage">
                          Status
                        </label>
                        <br />
                        <label class="switch">
                          <input
                            type="checkbox"
                            id="status"
                            checked={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="switch-input"
                          />
                          <span class="switch-toggle-slider">
                            <span class="switch-on"></span>
                            <span class="switch-off"></span>
                          </span>
                          <span class="switch-label">
                            {values.status ? "Active" : "Disabled"}
                          </span>
                        </label>
                      </div>

                      <div class="col-md-12 col-12 position-relative custom-select">
                        <span className="selection__arrow" role="presentation">
                          <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                        </span>
                        {/* {actionType == "edit" && (
                          <Typeahead
                            id="category"
                            placeholder="Select category"
                            onChange={(select) => {
                              // Access the first selected value from the array
                              const firstSelected =
                                select.length > 0 ? select[0] : null;
                              setselectedCat(firstSelected);
                              setisOpen(true);
                            }}
                            options={itemCat}
                          />
                        )} */}

                        <Select
                          // id="category"
                          placeholder="Select category"
                          value={selectedCat}
                          classNamePrefix="premissions"
                          onChange={(val) => {
                            setselectedCat(val);
                            setisOpen(true);
                          }}
                          options={itemCat}
                          styles={style}
                        />
                      </div>

                      <div className="col-12 col-md-12">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="description">
                            Description
                          </label>
                          <div className="form-group">
                            <textarea
                              id="description"
                              className="form-control"
                              placeholder="Enter item description"
                              value={values.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.description && errors.description && (
                              <div className="invalid-feedback">
                                {errors.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <TextInput
                          label="SHOP hours"
                          id="shop_hr"
                          type="number"
                          placeholder="Shop hours"
                          value={values.shop_hr}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.shop_hr && errors.shop_hr}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <TextInput
                          label="SHOP minute"
                          id="shop_mm"
                          type="number"
                          placeholder="Shop minute"
                          value={values.shop_mm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.shop_mm && errors.shop_mm}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <TextInput
                          label="INSTALLATION Hours"
                          id="install_hr"
                          type="number"
                          placeholder="Enter Installation hours"
                          value={values.install_hr}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.install_hr && errors.install_hr}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <TextInput
                          label="INSTALLATION Minute"
                          id="install_mm"
                          type="number"
                          placeholder="Enter Installation minute"
                          value={values.install_mm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.install_mm && errors.install_mm}
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <TextInput
                          label="FIXED PRICE($)"
                          id="fixed_price"
                          type="number"
                          placeholder="Enter fixed price"
                          value={values.fixed_price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.fixed_price && errors.fixed_price}
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <TextInput
                          label="Glass(SQFT)"
                          id="glass_sqft"
                          type="number"
                          placeholder="Enter Glass sqft"
                          value={values.glass_sqft}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.glass_sqft && errors.glass_sqft}
                        />
                      </div>
                      <div className="col-12 col-md-4">
                        <TextInput
                          label="Alumnimum (POND)"
                          id="alumunium_pond"
                          type="number"
                          placeholder="Enter alumnimum pond"
                          value={values.alumunium_pond}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.alumunium_pond && errors.alumunium_pond
                          }
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="file-upload">
                            FILE UPLOAD
                          </label>
                          <div className="file-upload-wrapper text-right">
                            <input
                              type="file"
                              id="file-upload"
                              className="file-up d-none "
                              onChange={handleFileChange}
                              aria-label="File Upload"
                              accept=".jpg, .jpeg, .png, .pdf"
                            />
                            <label
                              htmlFor="file-upload"
                              className="btn btn-primary"
                            >
                              <i className="bx bx-cloud-upload"></i>
                              Upload file
                              {/* <p className="">Choose File</p> */}
                            </label>
                            {selectedFile && (
                              <div className="file-preview">
                                {previewURL ? (
                                  <img
                                    src={previewURL}
                                    alt="Preview"
                                    className="file_upload_preview"
                                  />
                                ) : (
                                  <span className="file-name">
                                    Uploading...
                                  </span>
                                )}
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm ms-2 remove_img"
                                  onClick={handleFileDelete}
                                >
                                  <i className="bx bx-trash"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 " style={{ textAlign: "right" }}>
                        <button
                          type="submit"
                          className="btn btn-primary "
                          disabled={uploadStatus == "loading"}
                        >
                          {loading == "loading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                          )}
                          {actionType == "edit" ? "Update" : "Submit"}
                        </button>
                        {/* <button
                          type="reset"
                          className="btn btn-label-secondary"
                          data-bs-dismiss="modal"
                          id="event_close"
                          aria-label="Close"
                        >
                          Cancel
                        </button> */}
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
