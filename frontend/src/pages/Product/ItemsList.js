import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "../Role/skeleton";
import { fetchList } from "../../slices/categorySlice";
import { fetchLists } from "../../slices/itemSlice";
import { useNavigate } from "react-router-dom";
import ItemAddEditModel from "../../Models/ItemAddEditModel";
import DeletModel from "../../Models/DeletModel";

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, fetchStatus } = useSelector((store) => store.item);
  const [actionType, setactionType] = useState();
  const { list: itemCat } = useSelector((store) => store.itemCategory);

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
      <ItemAddEditModel
        initialState={initialState}
        actionType={actionType}
        setinitialState={setinitialState}
        filter={filter}
        title={"Item"}
        isFrom="item"
        setactionType={setactionType}
        itemCat={itemCat?.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
      />
      <DeletModel
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
              Items List
              <button
                className="dt-button create-new btn btn-primary"
                tabindex="0"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#editItem"
                onClick={() => setactionType("")}
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
                    <th>ITEM CODE</th>
                    {/* <th>SHOP TIME(MINUTES)</th>
                    <th>INSTALLATION TIME(MINUTES)</th> */}
                    <th>Status</th>
                    <th>CREATED AT</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {list?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="text-capitalize">
                          {item.category?.name || "-"}
                        </td>
                        <td>
                          <span className="fw-medium">{item.item_code}</span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-label-${
                              item.status == true ? "success" : "danger"
                            } me-1`}
                          >
                            {item.status == true ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td>{moment(item.createdAt).format("ll")}</td>

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
                                data-bs-target="#editItem"
                              >
                                <i className="bx bx-edit-alt me-1" /> Edit
                              </a>
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                                data-bs-target="#deleteModel"
                                data-bs-toggle="modal"
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
              {list?.length < 1 && (
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
