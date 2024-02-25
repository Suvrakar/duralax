import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryAddEditModel from "../../Models/CategoryAddEditModel";
import Skeleton from "../Role/skeleton";
import { fetchList } from "../../slices/categorySlice";
import moment from "moment";
import DeletModel from "../../Models/DeletModel";

function UserList() {
  const dispatch = useDispatch();
  const { list, fetchStatus } = useSelector((store) => store.itemCategory);
  const [actionType, setactionType] = useState();
  const [initialState, setinitialState] = useState({});
  const [filter, setfilter] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchList(filter));
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
  }, []);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  if (fetchStatus == "loading") {
    return <Skeleton />;
  }
  return (
    <>
      <CategoryAddEditModel
        initialState={initialState}
        actionType={actionType}
        filter={filter}
        isFrom="item"
      />

      <DeletModel
        isFrom="item"
        filter={filter}
        initialState={initialState}
        whatDelete="category"
      />
      <div className="content-wrapper">
        {/* Contents */}
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header d-flex justify-content-between">
              Item Category List
              <button
                data-bs-toggle="modal"
                data-bs-target="#editCategory"
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
                    <th>Category</th>
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
                                data-bs-target="#editCategory"
                              >
                                <i className="bx bx-edit-alt me-1" /> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModel"
                                onClick={() => getActionType("edit", item)}
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
              {list.length < 1 && (
                <span className="text-center w-100 d-block ">
                  No data found :(
                </span>
              )}
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
