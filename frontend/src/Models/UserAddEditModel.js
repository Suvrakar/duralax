import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { CirclePicker } from "react-color";
import { createUser, fetchLists, updateUser } from "../slices/usreSlice";

// Additional colors you want to include
const additionalColors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#808080", // Gray
];

// Combine the default colors with additional colors
const allColors = [...CirclePicker.defaultProps.colors, ...additionalColors];

export default function AddEditRoleModel(props) {
  const { initialState, actionType, filter } = props;
  // Create a ref to store the Formik instance
  const formikRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const dispatch = useDispatch();
  const {
    roles: { list },
    user: { crudStatus },
    auth: { user_info },
  } = useSelector((state) => state);

  const [roleName, setroleName] = useState();
  const [bgColor, setbgColor] = useState("#FF0000");
  const [editData] = useState({
    name: "",
    status: true,
    mobile: "",
    email: "",
    commission: "",
  });

  // Define Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.number().required("Required"),
    commission: Yup.number().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const editSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.number().required("Required"),
  });

  useEffect(() => {
    if (actionType == "edit") {
      setbgColor(initialState.bgColor);
      setroleName(initialState.roleName);
      formikRef.current.setValues({
        name: initialState.name,
        status: initialState.status,
        email: initialState.email,
        mobile: initialState.mobile,
        commission: initialState.commission,
      });
    }
    // else {
    //   formikRef.current.setValues({
    //     name: "",
    //     status: true,
    //     mobile: "",
    //     email: "",
    //   });
    //   setbgColor("#FF0000");
    //   setroleName("");
    // }
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
    data.bgColor = bgColor;
    if (!roleName) {
      data.roleName = list[0]?._id;
    } else {
      data.roleName = roleName;
    }

    if (actionType == "edit") {
      data.modifiedByName = user_info?.name || " ";
      dispatch(updateUser({ ...data, roleId: initialState._id })).finally(
        callback
      );
    } else {
      dispatch(createUser(data)).finally(callback);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Reset Formik form if click is outside the modal
        if (actionType !== "edit") {
          formikRef.current.resetForm();
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
  return (
    <>
      <div
        className="modal fade"
        id="editUser"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-md modal-simple modal-edit-user ">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
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
                      id="editUserForm"
                      className="row g-3 custom_input_height"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12 col-md-12 ">
                        <TextInput
                          label="FULL NAME *"
                          id="name"
                          type="text"
                          placeholder="Enter full name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      </div>
                      {actionType !== "edit" && (
                        <div className="col-12 col-md-6">
                          <TextInput
                            label="PASSWORD *"
                            id="password"
                            type="text"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && errors.password}
                          />
                        </div>
                      )}
                      <div className="col-12 col-md-6">
                        <TextInput
                          label="EMAIL *"
                          id="email"
                          type="text"
                          placeholder="Enter email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && errors.email}
                        />
                      </div>
                      <div className="col-12 col-md-6 ">
                        <TextInput
                          label="MOBILE *"
                          id="mobile"
                          type="number"
                          placeholder="Enter mobile number"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.mobile && errors.mobile}
                        />
                      </div>
                      <div className="col-12 col-md-6 ">
                        <TextInput
                          label="Commission"
                          id="commission"
                          type="number"
                          placeholder="Enter commission %"
                          value={values.commission}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.commission && errors.commission}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label className="form-label">Role *</label>
                          <select
                            class="form-select"
                            id="roleName"
                            onChange={(e) => setroleName(e.target.value)}
                            value={roleName}
                            onBlur={handleBlur}
                            aria-label="Example select with button addon"
                          >
                            {list?.map((item, idx) => (
                              <option value={item._id} key={idx}>
                                {item?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div class="col-12 col-md-12 ">
                        <label class="form-label" for="modalEditUserLanguage">
                          LOGIN STATUS
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

                      <div className="col-12 mt-0 mb-2">
                        <label
                          className="form-label"
                          htmlFor="modalEditUserLanguage"
                        >
                          Background Color *{" "}
                          <span
                            className={"badge"}
                            style={{ background: bgColor }}
                          >
                            Preview
                          </span>
                        </label>
                        <CirclePicker
                          colors={allColors}
                          width="100"
                          styles={{ marg: "10px" }}
                          onChange={(e) => setbgColor(e.hex)}
                        />
                      </div>

                      <div
                        className="col-12 text-left"
                        style={{ textAlign: "right" }}
                      >
                        <button
                          type="reset"
                          className="btn btn-label-secondary me-sm-3  me-1"
                          data-bs-dismiss="modal"
                          id="event_close"
                          aria-label="Close"
                        >
                          Cancel
                        </button>

                        <button type="submit" className="btn btn-primary ">
                          {crudStatus == "loading" && (
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
