import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { createItem, fetchLists, updateItem } from "../slices/customerSlice";
import toast from "react-hot-toast";

export default function CustomerAddEditModel(props) {
  const { initialState, actionType, filter } = props;
  // Create a ref to store the Formik instance
  const formikRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const dispatch = useDispatch();
  const {
    customer: { loading },
    auth: { user_info },
  } = useSelector((state) => state);

  const [address, setaddress] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [editData] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    billing_address: "",
    remark: "",
  });

  // Define Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.number().required("Required"),
    companyName: Yup.string().required("Required"),
  });

  const editSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.number().required("Required"),
    companyName: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (actionType == "edit") {
      setaddress(initialState.address || []);
      formikRef.current.setValues({
        name: initialState.name,
        billing_address: initialState.billing_address,
        remark: initialState.remark,
        companyName: initialState.companyName,
        email: initialState.email,
        mobile: initialState.mobile,
      });
    }
  }, [actionType, initialState]);

  const callback = () => {
    let ele = document.getElementById("event_close");
    ele?.click();
    dispatch(fetchLists(filter));
  };

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
    const place1 = document.getElementById("billing_address").value;
    data.address = address;
    data.billing_address = place1;

    if (actionType == "edit") {
      data.modifiedByName = user_info?.name || " ";
      dispatch(updateItem({ ...data, roleId: initialState._id })).finally(
        callback
      );
    } else {
      dispatch(createItem(data)).finally(callback);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Reset Formik form if click is outside the modal
        if (actionType !== "edit") {
          // formikRef.current.resetForm();
        }
      }
    }
    // Add when the component mounts
    document.addEventListener("click", handleClickOutside);
    // Cleanup event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef, actionType]); // Empty dependency array means it runs once on mount

  const handleAddAddress = () => {
    if (!selectedLocation) return toast.error("Please select address first");
    setaddress([...address, selectedLocation]); // Adds a new address to the list
    setSelectedLocation("");
  };

  const handleDeleteAddress = (index) => {
    setaddress(address.filter((_, i) => i !== index)); // Removes an address at a specific index
  };

  const clearState = () => {
    setaddress([]);
    if (formikRef) {
      formikRef.current.resetForm();
    }
  };

  useEffect(() => {
    const google = window.google;
    const autocomplete1 = new google.maps.places.Autocomplete(
      document.getElementById("billing_address")
    );
    const autocomplete2 = new google.maps.places.Autocomplete(
      document.getElementById("address")
    );
    autocomplete2.addListener("place_changed", () => {
      const place = autocomplete2.getPlace();
      setSelectedLocation(place.formatted_address);
      // Do whatever you need with the selected place
    });
    return () => {};
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="editUser2"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalRef}
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-md modal-simple modal-edit-user ">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={clearState}
              />

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
                      id="editUserForm"
                      className="row g-3 custom_input_height"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12 col-md-6">
                        <TextInput
                          label="CONTACT PERSON"
                          id="name"
                          type="text"
                          placeholder="Enter full name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <TextInput
                          label="CONTACT EMAIL"
                          id="email"
                          type="text"
                          placeholder="Enter contact email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                        />
                      </div>

                      <div className="col-12 col-md-6 ">
                        <TextInput
                          label="Company name"
                          id="companyName"
                          type="text"
                          placeholder="Enter company number"
                          value={values.companyName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.companyName && errors.companyName}
                        />
                      </div>
                      <div className="col-12 col-md-6 ">
                        <TextInput
                          label="Contact Number"
                          id="mobile"
                          type="number"
                          placeholder="Enter mobile number"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.mobile && errors.mobile}
                        />
                      </div>

                      <div className="col-12 col-md-12">
                        <div className="form-group">
                          <label className="form-label">Billing Address</label>
                          <input
                            type="text"
                            className={`form-control`}
                            id="billing_address"
                            placeholder="Enter a location"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-12">
                        <TextInput
                          label="Remarks"
                          id="remark"
                          type="text"
                          placeholder="Enter remarks"
                          value={values.remark}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.remark && errors.remark}
                        />
                      </div>

                      <div className="col-12 col-md-10 add_place_todo ">
                        <div className="col-12 col-md-12">
                          <div className="form-group">
                            <label>Add work sites</label>
                            <input
                              type="text"
                              className={`form-control`}
                              id="address"
                              placeholder="Enter a location"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-2">
                        <label></label>
                        <p className="add_btn" onClick={handleAddAddress}>
                          Add
                        </p>
                      </div>

                      {!!address?.length && (
                        <div className="col-12 col-md-12">
                          {/* Address list display */}
                          <label style={{ marginBottom: "10px" }}>
                            <b>Work Address</b>
                          </label>

                          <div className="">
                            <div className="table-responsive text-nowrap">
                              <table className="table new_table table-hover">
                                <thead>
                                  <tr></tr>
                                </thead>
                                <tbody className="table-border-bottom-0 custom_table">
                                  {address.map((addr, index) => (
                                    <tr
                                      className={`custom_td ${
                                        index % 2 ? "table-active" : ""
                                      }`}
                                    >
                                      <td
                                        style={{
                                          fontSize: "13px",
                                          maxWidth: "300px",
                                          textOverflow: "ellipsis",
                                          overflow: "hidden",
                                        }}
                                      >
                                        {addr}
                                      </td>
                                      <td style={{ textAlign: "right" }}>
                                        <span
                                          style={{ color: "#F89c1c" }}
                                          className="btn btn-sm ms-2 del_ic "
                                          onClick={() =>
                                            handleDeleteAddress(index)
                                          }
                                        >
                                          <i className="bx bx-trash"></i>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* <div className="address_list">
                            {address.map((addr, index) => (
                              <div key={index} className="items_lists">
                                <p>{addr}</p>
                                <p
                                  className="btn btn-danger btn-sm ms-2 del_ic "
                                  onClick={() => handleDeleteAddress(index)}
                                >
                                  <i className="bx bx-trash"></i>
                                </p>
                              </div>
                            ))}
                          </div> */}
                        </div>
                      )}

                      <div
                        className="col-12 text-left"
                        style={{ textAlign: "right" }}
                      >
                        <button
                          type="reset"
                          className="btn btn-label-secondary me-sm-3 me-1"
                          data-bs-dismiss="modal"
                          id="event_close"
                          aria-label="Close"
                          onClick={clearState}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary ">
                          {loading == "loading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                          )}
                          {actionType == "edit" ? "Update" : "Submit"}
                        </button>
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
