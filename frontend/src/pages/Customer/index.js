import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../slices/customerSlice";
import moment from "moment";
import CustomerAddEditModel from "../../Models/CustomerAddEditModel";
import Skeleton from "../Role/skeleton";
import CustomerDeletModel from "../../Models/CustomerDeletModel";

function Customer() {
  const dispatch = useDispatch();
  const { list, fetchStatus } = useSelector((store) => store.customer);
  const [actionType, setactionType] = useState();
  const [initialState, setinitialState] = useState({});
  const [filter, setfilter] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchLists(filter));
  }, []);

  const getActionType = (type, item) => {
    switch (type) {
      case "add":
        setactionType("add");
        setinitialState({});
        break;
      case "edit":
        setactionType("edit");
        setinitialState(item);
        break;

      default:
        setactionType("");
        setinitialState({});
        break;
    }
  };

  if (fetchStatus == "loading") {
    return <Skeleton />;
  }
  return (
    <>
      <CustomerDeletModel
        isFrom="item"
        whatDelete="item"
        filter={filter}
        getActionType={getActionType}
        initialState={initialState}
      />
      {/* <SearchLocationInput setSelectedLocation={setSelectedLocation} /> */}

      <div className="content-wrapper ">
        <CustomerAddEditModel
          initialState={initialState}
          actionType={actionType}
          filter={filter}
        />
        {/* Content */}
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header d-flex justify-content-between">
              Customer List
              <button
                data-bs-toggle="modal"
                data-bs-target="#editUser2"
                className="dt-button create-new btn btn-primary"
                tabindex="0"
                type="button"
                onClick={() => getActionType("add")}
              >
                <span>
                  <i class="bx bx-plus me-sm-1"></i>{" "}
                  <span class="d-none d-sm-inline-block">Add New</span>
                </span>
              </button>
            </h5>

            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>EMAIL</th>
                    <th>Billing Address</th>
                    <th>Mobile</th>
                    <th>Company Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {list?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="text-capitalize">{item.name}</td>
                        <td>
                          <span className="fw-medium">{item.email}</span>
                        </td>
                        <td>{item.billing_address}</td>
                        <td>{item.mobile}</td>
                        <td>{item.companyName}</td>
                        <td>{moment(item.createdAt).format("LLL")}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn p-0 dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                            >
                              <i className="bx bx-dots-vertical-rounded" />
                            </button>
                            <div className="dropdown-menu">
                              <a
                                onClick={() => getActionType("edit", item)}
                                className="dropdown-item"
                                href="javascript:void(0);"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#editUser2"
                              >
                                <i className="bx bx-edit-alt me-1" /> Edit
                              </a>
                              <a
                                onClick={() => getActionType("edit", item)}
                                className="dropdown-item"
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModel"
                              >
                                <i className="bx bx-trash me-1" /> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* <!--/ Basic Bootstrap Table --> */}
        </div>
        {/* / Content */}
        <div className="content-backdrop fade" />
      </div>
    </>
  );
}

export default Customer;
