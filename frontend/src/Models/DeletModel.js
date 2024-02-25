import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";

import {
  fetchList as FetchitemCat,
  deleteitemCategory,

  //material
  mdeletematerialCategory,
  mfetchList,
} from "../slices/categorySlice";
import {
  deleteItem,
  mdeleteItem,
  mfetchLists,
  fetchLists,
} from "../slices/itemSlice";

export default function DeletModel(props) {
  const { isFrom, filter, initialState, whatDelete } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.itemCategory.loading);

  const callback = () => {
    let ele = document.getElementById("event_close2");
    ele?.click();
    switch (whatDelete) {
      case "item":
        if (isFrom == "item") {
          dispatch(fetchLists(filter));
        } else if (isFrom == "material") {
          dispatch(mfetchLists(filter));
        }
        break;
      case "category":
        if (isFrom == "item") {
          dispatch(FetchitemCat(filter));
        } else if (isFrom == "material") {
          dispatch(mfetchList(filter));
        }
        break;
      default:
        break;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    switch (whatDelete) {
      case "item":
        if (isFrom == "item") {
          dispatch(deleteItem({ roleId: initialState._id })).finally(callback);
        } else if (isFrom == "material") {
          dispatch(mdeleteItem({ roleId: initialState._id })).finally(callback);
        }
        break;
      case "category":
        if (isFrom == "item") {
          dispatch(deleteitemCategory({ roleId: initialState._id })).finally(
            callback
          );
        } else if (isFrom == "material") {
          dispatch(
            mdeletematerialCategory({ roleId: initialState._id })
          ).finally(callback);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="deleteModel"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-simple modal-edit-user ">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                id="event_close2"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              {/* <div className="text-left mb-4">
                <h3>{actionType == "edit" ? "Edit" : "Add New"} User</h3>
                <p>{actionType == "edit" ? "Updating" : "Add"} user details.</p>
              </div> */}

              <form
                // id="editUserForm"
                className="row g-3 "
                onSubmit={submitHandler}
              >
                <div className="col-12 col-md-12">
                  <div class="text-left ">
                    <h3 class="mb-4">
                      Are you sure to delete{" "}
                      <span className="text-primary">
                        {initialState?.name || initialState?.item_code}
                      </span>
                    </h3>
                  </div>
                  <p>
                    Click on `Confirm`` button to delete this or you can click
                    on `Cancel`
                  </p>
                </div>

                <div className="col-12 " style={{ textAlign: "right" }}>
                  <button type="submit" className="btn btn-primary me-3">
                    {loading == "loading" && (
                      <i class="fa fa-spinner fa-spin"></i>
                    )}
                    Confirm
                  </button>
                  <button
                    type="reset"
                    className="btn btn-label-secondary"
                    data-bs-dismiss="modal"
                    id="event_close2"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
