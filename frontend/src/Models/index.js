import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import Select, { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { menuOptions } from "../utils";
import { createRole, fetchList, updateRole } from "../slices/roleSlice";

export function AddEditRoleModel(props) {
  const { initialState, actionType, filter } = props;
  // Create a ref to store the Formik instance
  const formikRef = React.useRef(null);

  const dispatch = useDispatch();
  const {
    roles: { lading },
    auth: { user_info },
  } = useSelector((state) => state);
  const [permissions, setpermissions] = useState([]);
  const [editData] = useState({
    name: "",
    status: true,
    description: "",
  });
  // Define Yup schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (actionType == "edit") {
      formikRef.current.setValues({
        name: initialState.name,
        status: initialState.status,
        description: initialState.description,
      });
      setpermissions(
        initialState.permissions?.map((item) => ({ label: item, value: item }))
      );
    } else {
      setpermissions([]);
      formikRef.current.setValues({
        name: "",
        status: true,
        description: "",
      });
    }
  }, [actionType, initialState]);

  const permissionsChange = (e) => {
    setpermissions(e);
  };

  const callback = () => {
    let ele = document.getElementById("event_close");
    ele?.click();
    dispatch(fetchList(filter));
  };

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
    data.modifiedByName = user_info?.name || " ";
    data.permissions = permissions.map((item) => item.value);
    if (actionType == "edit") {
      dispatch(updateRole({ ...data, roleId: initialState._id })).finally(
        callback
      );
    } else {
      dispatch(createRole(data)).finally(callback);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="editRole"
        tabIndex={-1}
        aria-hidden="true"
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
              <div className="text-left mb-4">
                <h3>{actionType == "edit" ? "Edit" : "Add New"} Role</h3>
                <p>{actionType == "edit" ? "Updating" : "Add"} role details.</p>
              </div>
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
                      id="editUserForm"
                      className="row g-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12 col-md-12 ">
                        <TextInput
                          label="Name *"
                          id="name"
                          type="text"
                          placeholder="Enter role name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                        />
                        <label className="form-label"></label>
                      </div>
                      <div class="col-12 col-md-12 mt-0 mb-2">
                        <label class="form-label">PERMISSION</label>

                        <Select
                          onChange={permissionsChange}
                          closeMenuOnSelect={true}
                          classNamePrefix="premissions"
                          value={permissions}
                          isMulti
                          options={menuOptions}
                        />
                      </div>
                      <div class="col-12 col-md-12  ">
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

                      <div className="col-12 col-md-12 mt-3 ">
                        <TextInput
                          label="Description"
                          type="text"
                          id="description"
                          placeholder="Optional"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.description && errors.description}
                        />
                        <label className="form-label"></label>
                      </div>

                      <div className="col-12 text-left" style={{ textAlign: "right" }}>
                        <button
                          type="submit"
                          className="btn btn-primary me-sm-3 me-1"
                        >
                          {lading == "lading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                          )}
                          {actionType == "edit" ? "Update" : "Submit"}
                        </button>
                        <button
                          type="reset"
                          className="btn btn-label-secondary"
                          data-bs-dismiss="modal"
                          id="event_close"
                          aria-label="Close"
                        >
                          Cancel
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
