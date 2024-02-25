import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";

import { changePassword } from "../slices/usreSlice";

export default function ChangePasswordModel(props) {
  const { initialState, actionType, filter, isFrom } = props;
  // Create a ref to store the Formik instance

  const formikRef = React.useRef(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { crudStatus } = user;

  const callback = () => {
    let ele = document.getElementById("event_close3");
    ele?.click();
  };

  const modalRef = React.useRef(null);
  const [editData] = useState({
    newPassword: "",
  });

  // Define Yup schema
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
    data.userId = initialState?._id;
    try {
      let res = await dispatch(changePassword(data));
      if (!res?.error?.message) {
        callback();
      }
    } catch (error) {
      console.log(error, "888");
    }
  };

  // Function to detect outside clicks
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
        id="changePassword"
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
                id="event_close3"
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
                validationSchema={validationSchema}
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
                      <div className="col-12 col-md-12">
                        <TextInput
                          label="NEW PAASSWORD"
                          id="newPassword"
                          type="text"
                          placeholder="Enter new password"
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.newPassword && errors.newPassword}
                        />
                      </div>

                      <div className="col-12 " style={{ textAlign: "right" }}>
                        <button type="submit" className="btn btn-primary">
                          {crudStatus == "loading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                          )}
                          Submit
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
