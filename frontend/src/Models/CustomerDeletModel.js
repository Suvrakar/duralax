import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteItem, fetchLists } from "../slices/customerSlice";

export default function CustomerDeletModel(props) {
  const { isFrom, filter, initialState, getActionType } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.itemCategory.loading);

  const callback = () => {
    let ele = document.getElementById("event_close2");
    ele?.click();
    getActionType("");
    dispatch(fetchLists(filter));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(deleteItem({ roleId: initialState._id })).finally(callback);
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
