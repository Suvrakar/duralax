import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../slices/usreSlice";
import moment from "moment";
import UserAddEditModel from "../../Models/UserAddEditModel";
import Skeleton from "../Role/skeleton";
import { fetchList } from "../../slices/roleSlice";
import ChangePasswordModel from "../../Models/ChangePasswordModel";

function UserList() {
  const dispatch = useDispatch();
  const { list, fetchStatus } = useSelector((store) => store.user);
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

  const fetchRole = useCallback(() => {
    dispatch(fetchList({ page: 1, limit: 10 }));
  }, [actionType]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  if (fetchStatus == "loading") {
    return <Skeleton />;
  }
  return (
    <>
      <UserAddEditModel
        initialState={initialState}
        actionType={actionType}
        filter={filter}
      />

      <ChangePasswordModel
        isFrom="item"
        whatDelete="item"
        filter={filter}
        initialState={initialState}
      />
      <div className="content-wrapper">
        {/* Content */}
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header d-flex justify-content-between">
              Users List
              <button
                data-bs-toggle="modal"
                data-bs-target="#editUser"
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
                    <th>Color</th>
                    <th>mobile</th>
                    <th>commission(%)</th>
                    <th>Role</th>
                    <th>status</th>
                    <th>MODIFIED BY </th>
                    <th>MODIFIED on</th>
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
                        <td>
                          <span
                            className="badge"
                            style={{ background: item.bgColor }}
                          >
                            PREVIEW
                          </span>
                        </td>
                        <td>{item.mobile}</td>
                        <td>{item?.commission}</td>
                        <td>{item.roleName?.name}</td>
                        <td>
                          <span
                            className={`badge bg-label-${
                              item.status == true ? "success" : "danger"
                            } me-1`}
                          >
                            {item.status == true ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td className="text-capitalize">
                          {item.modifiedByName}
                        </td>
                        <td>{moment(item.modifiedOn).format("LLL")}</td>
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
                                data-bs-target="#editUser"
                              >
                                <i className="bx bx-edit-alt me-1" /> Edit
                              </a>
                              <a
                                onClick={() => getActionType("edit", item)}
                                className="dropdown-item"
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#changePassword"
                              >
                                <i className="bx bx-key me-1" /> Password
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

export default UserList;
