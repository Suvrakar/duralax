import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchList, mfetchList } from "../slices/categorySlice";
import toast from "react-hot-toast";
import { updateItem } from "../slices/customerSlice";

export default function UpdateAddressModal(props) {
  const modalRef = React.useRef(null);
  const { actionType, filter, isFrom } = props;

  const dispatch = useDispatch();
  const {
    itemCategory: { loading },
  } = useSelector((state) => state);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateItem({ address: props?.addressList, roleId: props?.roleID })
      );
      callback();
    } catch (error) {
      toast.error(error);
    }
  };

  const [selectedLocation, setSelectedLocation] = useState();
  const handleAddAddress = () => {
    if (!selectedLocation) return toast.error("Please select an address first");
    props?.setaddressList((prevAddressList) => [
      ...prevAddressList,
      selectedLocation,
    ]);
    setSelectedLocation("");
  };

  const handleDeleteAddress = (index) => {
    props?.setaddressList(props?.addressList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef, actionType]);

  useEffect(() => {
    const google = window.google;
    const autocomplete2 = new google.maps.places.Autocomplete(
      document.getElementById("address")
    );
    autocomplete2.addListener("place_changed", () => {
      const place = autocomplete2.getPlace();
      setSelectedLocation(place.formatted_address);
    });
    return () => {};
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="editCategory"
        tabIndex={1}
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

              <form className="row g-3 " onSubmit={submitHandler}>
                <div className="col-12 col-md-10">
                  <div className="form-group">
                    <label>Add work sites</label>
                    <input
                      type="text"
                      className={`form-control`}
                      id="address"
                      placeholder="Enter a location"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-2">
                  <label></label>
                  <p className="add_btn" onClick={handleAddAddress}>
                    Add
                  </p>
                </div>

                <div className="col-12 col-md-12">
                  <label style={{ marginBottom: "10px" }}>
                    <b>Work Address</b>
                  </label>

                  <div className="">
                    <div className="table-responsive text-nowrap">
                      <table className="table new_table table-hover">
                        <thead>
                          <tr></tr>
                        </thead>
                        <tbody className="table-border-bottom-0 custom_table">
                          {props?.addressList?.map((addr, index) => (
                            <tr
                              key={index}
                              className={`custom_td ${
                                index % 2 === 1 ? "table-active" : ""
                              }`}
                            >
                              <td
                                style={{
                                  fontSize: "13px",
                                  maxWidth: "300px",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                {addr}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <span
                                  style={{ color: "#F89c1c" }}
                                  className="btn btn-sm ms-2 del_ic"
                                  onClick={() => handleDeleteAddress(index)}
                                >
                                  <i className="bx bx-trash"></i>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12 " style={{ textAlign: "right" }}>
                  <button type="submit" className="btn btn-primary">
                    {loading == "loading" && (
                      <i class="fa fa-spinner fa-spin"></i>
                    )}
                    Update
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
