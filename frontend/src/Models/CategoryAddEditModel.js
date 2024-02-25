import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";

import {
  fetchList,
  createItemCategory,
  updateitemCategory,

  //material
  mfetchList,
  mcreateMaterialCategory,
  mupdatematerialCategory,
} from "../slices/categorySlice";

export default function ItemAddEditModel(props) {
  const { initialState, actionType, filter, isFrom } = props;
  // Create a ref to store the Formik instance

  const formikRef = React.useRef(null);

  const dispatch = useDispatch();
  const {
    itemCategory: { loading },
  } = useSelector((state) => state);

  const editSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (actionType == "edit") {
      formikRef.current.setValues({
        name: initialState.name,
      });
    } else {
      formikRef.current.setValues({
        name: "",
      });
    }
  }, [actionType, initialState]);

  const callback = () => {
    let ele = document.getElementById("event_close");
    ele?.click();
    switch (isFrom) {
      case "item":
        dispatch(fetchList(filter));
        break;

      case "material":
        dispatch(mfetchList(filter));
        break;

      default:
        break;
    }
  };

  const modalRef = React.useRef(null);
  const [editData, setEditdata] = useState({
    name: "",
  });

  // Define Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
    switch (isFrom) {
      case "item":
        if (actionType == "edit") {
          dispatch(
            updateitemCategory({ ...data, roleId: initialState._id })
          ).finally(callback);
        } else {
          dispatch(createItemCategory(data)).finally(callback);
        }
        break;
      case "material":
        if (actionType == "edit") {
          dispatch(
            mupdatematerialCategory({ ...data, roleId: initialState._id })
          ).finally(callback);
        } else {
          dispatch(mcreateMaterialCategory(data)).finally(callback);
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
        id="editCategory"
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
                id="event_close"
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
                      // id="editUserForm"
                      className="row g-3 "
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12 col-md-12">
                        <TextInput
                          label="CATEGORY NAME"
                          id="name"
                          type="text"
                          placeholder="Enter category name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                      </div>

                      <div className="col-12 " style={{ textAlign: "right" }}>
                        <button type="submit" className="btn btn-primary">
                          {loading == "loading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                          )}
                          {"actionType" == "edit" ? "Update" : "Submit"}
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
