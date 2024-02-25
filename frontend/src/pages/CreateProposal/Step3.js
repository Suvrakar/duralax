import React, { useCallback, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../slices/usreSlice";
import { fetchList as fetchitemCat } from "../../slices/categorySlice";
import { fetchLists as fetchitems, mfetchLists2 } from "../../slices/itemSlice";
import { mfetchList } from "../../slices/categorySlice";
import ProposalDetailsModel from "../../Models/ProposalDetailsModel";
import {
  calculateExtraExpense,
  calculateMaterialCost,
  calculatePayment,
  calculateItemTotalPrice,
  calculateSellingPrice,
  getAgentsPercentage,
  formatter
} from "../../constants/constants";



const style = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? `1px solid #F89c1c` : `1px solid #d9dee3`,
    color: state.isFocused ? "#697a8d" : "#697a8d",
    backgroundColor: "#fff",
    boxShadow: state.isFocused
      ? "0 0 0.25rem 0.05rem rgba(105, 108, 255, 0.1)"
      : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#a6a6a6" : "#F89c1c",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff", // Disabling background color for dropdown items
    color: "#697a8d",
    zIndex: 999,
  }),
  option: (base, state) => ({
    ...base,
    color: "#697a8d",
    backgroundColor: state.isFocused ? "#e9ecef" : "#fff",
    // "&:hover": {
    //   backgroundColor: "#e9ecef",
    // },
  }),
};

export default function Step3({ mainState, updateMCategoryId, itemStte,
  topDeatils,
  addAgent,
  materialState,
  deleteAgent,
  updateCategoryId,
  updateMaterialName,
  updateItemId, materialCatOption, materialNameOption,
  changeHandler1, agentsOption,
  addNewMaterial, itemsCatOption,
  addNewItem,
  deleteItem, agentChange, itemsCodeOption,
  deleteMaterial,
  duplicateItem,
  changeHandler,
  list
}) {


  const calculateTotalItemPrice = () => {
    let totalItem = 0;
    mainState.map(item => {
      totalItem += Number(item?.item_total) + Number(item?.material?.reduce((acc, id) => acc + Number(id?.material_cost), 0)) + Number(item?.extra_expense)
    })
    return totalItem || 0
  }
  return (
    <>
      <ProposalDetailsModel />
      <div className="content-wrapper">
        <div className="flex-grow-1">
          <div className="row">
            <div className="col-xl">
              <div className="card  mb-4">
                <div className="card-body">
                  <div className="infor_df">
                    <p className="text-danger">Mark up Percent: {list[3]?.g_value || 113}</p>
                    <p className="text-success">Mark up Percent:  {getAgentsPercentage(topDeatils?.agent, list[3]?.g_value) || 113} </p>
                  </div>
                  <>
                    <div></div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="basic-default-fullname"
                      >
                        Job Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="basic-default-fullname"
                        value={topDeatils.name}
                        name="name"
                        onChange={changeHandler1}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={addAgent}
                      >
                        Add Agents
                      </button>
                    </div>
                    <div className="row mt-3">
                      {topDeatils?.agent?.map((item, idx) => {
                        return (
                          <>
                            <div
                              className="col-12 col-sm-6 position-relative custom-select mb-3"
                              key={idx}
                            >
                              <span
                                className="selection__arrow2 selection__arrow3"
                                role="presentation"
                              >
                                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                              </span>
                              <label className="form-label">Agent Name</label>

                              <Select
                                // id="category"
                                placeholder="Select category"
                                value={item}
                                classNamePrefix="premissions"
                                onChange={(item) =>
                                  agentChange(item, idx, "select")
                                }
                                options={agentsOption}
                                styles={style}
                              />
                            </div>
                            <div
                              className="col-12 col-sm-3 add_dele icon__ "
                              style={{ paddingLeft: 0 }}
                            >
                              <TextInput
                                label={`COMMISSION (${item.type == "percent" ? "%" : "$"
                                  } )`}
                                id="email"
                                type="number"
                                placeholder="commission"
                                name="commission"
                                value={item?.commission}
                                style={{
                                  borderRight: "none",
                                  borderRadius: "4px 0px 0px 4px",
                                }}
                                onChange={(e) =>
                                  agentChange(e.target.value, idx, "commission")
                                }
                              />

                            </div>
                            <div className="col-12 col-sm-2 role_cls add_dele icon__">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  style={{ visibility: "hidden" }}
                                >
                                  {" "}
                                  a
                                </label>
                                <select
                                  class="form-select"
                                  id="roleName"
                                  style={{
                                    borderLeft: "none",
                                    borderRadius: "0 4px 4px 0",
                                  }}
                                  name="type"
                                  onChange={(e) =>
                                    agentChange(e.target.value, idx, "type")
                                  }
                                  // value={roleName}
                                  // onBlur={handleBlur}
                                  aria-label="Example select with button addon"
                                >
                                  <option value="amount">$</option>
                                  <option value="percent">%</option>
                                </select>
                              </div>
                              <span
                                style={{ color: "#F89c1c" }}
                                className="btn btn-sm ms-2 del_ic22 "
                                onClick={() => deleteAgent(idx)}
                              >
                                <i className="bx bx-trash"></i>
                              </span>
                            </div>
                          </>
                        );
                      })}

                      {/* <div className="col-12 col-sm-2" style={{ paddingLeft: 0 }}>

                                        </div> */}
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className="col-xl ">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row rental_dive ">
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="EQUIPMENT RENTAL"
                        id="eq_rent"
                        type="number"
                        placeholder="Enter rental"
                        name="eq_rent"
                        value={topDeatils.eq_rent}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="col-12 col-sm-6" style={{ paddingLeft: 0 }}>
                      <TextInput
                        label="EQUIPMENT RENTAL NOTE"
                        id="email"
                        type="text"
                        placeholder="Enter rental note"
                        name="eq_des"
                        value={topDeatils.eq_des}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="overhead cost"
                        id="email"
                        type="number"
                        placeholder="Enter overhead cost"
                        name="ov_rent"
                        value={topDeatils.ov_rent}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="col-12 col-sm-6" style={{ paddingLeft: 0 }}>
                      <TextInput
                        label="overhead cost note"
                        id="email"
                        type="text"
                        placeholder="Enter cost not"
                        name="ov_des"
                        value={topDeatils.ov_des}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="MISC"
                        id="email"
                        type="number"
                        placeholder="Enter misc"
                        name="ms_rent"
                        value={topDeatils.ms_rent}
                        onChange={changeHandler1}
                      />
                    </div>
                    <div className="col-12 col-sm-6" style={{ paddingLeft: 0 }}>
                      <TextInput
                        label="MISC NOTE"
                        id="email"
                        type="text"
                        placeholder="Enter misc note"
                        name="ms_des"
                        value={topDeatils.ms_des}
                        onChange={changeHandler1}
                      />
                    </div>


                    <div
                      className="col-12 col-sm-3"
                      style={{ paddingRight: 0 }}
                    >
                      <TextInput
                        label="dicsount"
                        id="email"
                        type="number"
                        placeholder="Enter discount"
                        name="ds_rent"
                        value={topDeatils.ds_rent}
                        onChange={changeHandler1}
                      />

                    </div>
                    <div className="col-12 col-sm-2 role_cls "
                      style={{ paddingLeft: 0, marginLeft: 0 }}
                    >
                      <div className="form-group">
                        <label
                          className="form-label"
                          style={{ visibility: "hidden" }}
                        >
                          {" "}
                          a
                        </label>
                        <select
                          class="form-select"
                          id="roleName"
                          style={{
                            borderLeft: "none",
                            borderRadius: "0 4px 4px 0",
                          }}
                          name="type"
                          onChange={changeHandler1}
                          aria-label="Example select with button addon"
                        >
                          <option value="amount">$</option>
                          <option value="percent">%</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-12 col-sm-1"></div>
                    <div className="col-12 col-sm-6" style={{ paddingLeft: 0 }}>
                      <TextInput
                        label="discount NOTE"
                        id="email"
                        type="text"
                        placeholder="Enter description"
                        name="ds_des"
                        value={topDeatils.ds_des}
                        onChange={changeHandler1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-4 " />
          <div className="d-flex item_add mb-4">
            <h5 className="card-header">Item Details</h5>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={addNewItem}
            >
              Add New item
            </button>
          </div>

          {mainState?.map((item, idx) => {
            return (
              <>
                <div className="card mb-4 static_bg" key={idx}>
                  <div className="d-flex item_ad2">
                    <button
                      type="button"
                      onClick={() => duplicateItem(idx)}
                      className="btn btn-sm dubplicate"
                    >
                      <i className="bx bx-copy"></i>
                    </button>

                    <div className="d-flex item_add item_add2">
                      <button
                        type="button"
                        onClick={() => deleteItem(idx)}
                        className="btn btn-sm "
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                  <form className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <h5 className="">Item No {idx + 1} Details</h5>
                        <div className="row g-2">
                          <div className="col-12 col-md-6 position-relative custom-select">
                            {/* <span
                                                    className="selection__arrow2"
                                                    role="presentation"
                                                >
                                                    <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                                                </span> */}
                            <label className="form-label">Item category</label>
                            <Select
                              placeholder="Select item category"
                              // classNamePrefix="premissions"
                              value={
                                itemsCatOption[
                                itemsCatOption.findIndex(
                                  (idd) => idd._id == item.catId
                                ) == -1
                                  ? null
                                  : itemsCatOption.findIndex(
                                    (idd) => idd._id == item.catId
                                  )
                                ]
                              }
                              onChange={(val) => updateCategoryId(val, idx)}
                              isClearable
                              options={itemsCatOption}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  cursor: !!item?.item_code?._id
                                    ? "not-allowed"
                                    : "pointer", // Set cursor style based on isDisabled state
                                }),
                              }}
                              isDisabled={!!item?.item_code?._id} // Disable the select component based on item.catId
                            />
                          </div>
                          <div className="col-12 col-md-6 position-relative custom-select">
                            <span
                              className="selection__arrow2"
                              role="presentation"
                            >
                              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                            </span>
                            <label className="form-label">Item code</label>
                            <Select
                              placeholder="Select item category"
                              value={itemsCodeOption.find(
                                (idd) => idd._id === item.item_code?._id
                              )} // Assuming item.catId is the ID of the selected option
                              onChange={(val) => updateItemId(val, idx)}
                              isClearable
                              options={itemsCodeOption}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  cursor:
                                    item.catId === ""
                                      ? "not-allowed"
                                      : "pointer", // Set cursor style based on isDisabled state
                                }),
                              }}
                              isDisabled={item.catId === ""} // Disable the select component based on item.catId
                            />
                          </div>

                          <div className="col-md-6">
                            <TextInput
                              label="quantity"
                              id="qty"
                              type="text"
                              placeholder="Enter quantity"
                              value={item.qty}
                              onChange={(e) =>
                                changeHandler(idx, null, "qty", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="fixed price"
                              id="email"
                              type="number"
                              placeholder="Enter fixed price"
                              value={item.fixed_price}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "fixed_price",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <TextInput
                              label="Location"
                              id="email"
                              type="text"
                              placeholder="Enter location"
                              value={item.location}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "location",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5 className="">
                          Item Cost:{" "}
                          {item?.item_code?._id
                            ? formatter.format(calculatePayment(item, list))
                            : "$0.00"}{" "}
                        </h5>
                        <div className="row g-2">
                          <div className="col-md-3">
                            <TextInput
                              label="SHOP hours"
                              id="shop_hr"
                              type="number"
                              placeholder="hours"
                              value={item.shop_hr}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "shop_hr",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <TextInput
                              label="SHOP minute"
                              id="shop_mm"
                              type="number"
                              placeholder="minute"
                              value={item.shop_mm}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "shop_mm",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <TextInput
                              label="INSTALL Hours"
                              id="install_hr"
                              type="number"
                              placeholder="hours"
                              value={item.install_hr}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "install_hr",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <TextInput
                              label="INSTALL Minute"
                              id="install_mm"
                              type="number"
                              placeholder="minute"
                              value={item.install_mm}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "install_mm",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Alumnimum"
                              id="alumunium_pond"
                              type="number"
                              placeholder="Enter alumnimum pond"
                              value={item.alumunium_pond}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "alumunium_pond",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <TextInput
                              label="Glass"
                              id="glass_sqft"
                              type="number"
                              placeholder="Enter Glass sqft"
                              value={item.glass_sqft}
                              onChange={(e) =>
                                changeHandler(
                                  idx,
                                  null,
                                  "glass_sqft",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="description"
                              >
                                Description
                              </label>
                              <div className="form-group">
                                <textarea
                                  id="description"
                                  className="form-control"
                                  placeholder="Enter item description"
                                  value={item.description}
                                  onChange={(e) =>
                                    changeHandler(
                                      idx,
                                      null,
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="d-flex item_add">
                    <h5 className="card-header">Material Details</h5>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => addNewMaterial(idx)}
                    >
                      Add New Material
                    </button>
                  </div>

                  {item?.material?.map((data, idx2) => {
                    return (
                      <>
                        <div className="card material_card mb-4" key={idx2}>
                          <div className="card-body">
                            <div className="row g-3 ">
                              <div className="col-md-6">
                                <h5 className="">
                                  Material No {idx2 + 1} Details
                                </h5>
                                <div className="row g-2 mt-2">
                                  <div className="col-12 col-sm-6 position-relative custom-select">
                                    <span
                                      className="selection__arrow2"
                                      role="presentation"
                                    >
                                      <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                                    </span>
                                    <label className="form-label">
                                      Material category
                                    </label>
                                    <Select
                                      placeholder="Select material category"
                                      // classNamePrefix="premissions"
                                      value={
                                        materialCatOption[
                                        materialCatOption.findIndex(
                                          (idd) => idd._id == data.catId
                                        ) == -1
                                          ? null
                                          : materialCatOption.findIndex(
                                            (idd) => idd._id == data.catId
                                          )
                                        ]
                                      }
                                      onChange={(val) =>
                                        updateMCategoryId(val, idx, idx2)
                                      }
                                      isClearable
                                      options={materialCatOption}
                                      styles={{
                                        control: (provided) => ({
                                          ...provided,
                                          cursor: !!data?.item_code?._id
                                            ? "not-allowed"
                                            : "pointer", // Set cursor style based on isDisabled state
                                        }),
                                      }}
                                      isDisabled={!!data?.item_code?._id} // Disable the select component based on item.catId
                                    />
                                  </div>
                                  <div className="col-12 col-sm-6 position-relative custom-select">
                                    <span
                                      className="selection__arrow2"
                                      role="presentation"
                                    >
                                      <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                                    </span>
                                    <label className="form-label">
                                      Material Name
                                    </label>
                                    <Select
                                      placeholder="Select material name"
                                      value={materialNameOption.find(
                                        (idd) => idd._id === data.item_code?._id
                                      )} // Assuming item.catId is the ID of the selected option
                                      onChange={(val) =>
                                        updateMaterialName(val, idx, idx2)
                                      }
                                      isClearable
                                      options={materialNameOption}
                                      styles={{
                                        control: (provided) => ({
                                          ...provided,
                                          cursor:
                                            data.catId === ""
                                              ? "not-allowed"
                                              : "pointer", // Set cursor style based on isDisabled state
                                        }),
                                      }}
                                      isDisabled={data.catId === ""} // Disable the select component based on item.catId
                                    />
                                  </div>

                                  <div className="col-sm-6">
                                    <TextInput
                                      label="aluminium"
                                      type="text"
                                      placeholder="Enter email"
                                      readOnly
                                      disabled
                                      value={data.alumunium_pond}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <TextInput
                                      label="glass"
                                      id="email"
                                      type="number"
                                      disabled
                                      readOnly
                                      placeholder="Enter email"
                                      value={data.glass_sqft}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex item_add item_add2">
                                  <h5 className="">Material Cost: {formatter.format(data?.material_cost) || '0.00'} </h5>
                                  <button
                                    type="button"
                                    onClick={() => deleteMaterial(idx, idx2)}
                                    className="btn btn-sm "
                                  >
                                    <i className="bx bx-trash"></i>
                                  </button>
                                </div>
                                <div className="row g-2 ">
                                  <div className="col-md-6">
                                    <TextInput
                                      label="quantity"
                                      id="email"
                                      type="text"
                                      placeholder="Enter quantity"
                                      value={data.qty}
                                      onChange={(e) =>
                                        changeHandler(
                                          idx,
                                          idx2,
                                          "qty",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="col-sm-6">
                                    <TextInput
                                      label="fixed price"
                                      id="email"
                                      type="number"
                                      placeholder="Enter price"
                                      value={data.fixed_price}
                                      onChange={(e) =>
                                        changeHandler(
                                          idx,
                                          idx2,
                                          "fixed_price",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <TextInput
                                      label="total quantity"
                                      id="totalQty"
                                      type="text"
                                      placeholder="Total quantity"
                                      name="totalQty"
                                      value={data.totalQty}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="description"
                                      >
                                        Description
                                      </label>
                                      <div className="form-group">
                                        <textarea
                                          id="description"
                                          className="form-control"
                                          placeholder="Enter item description"
                                          value={data.description}
                                          onChange={(e) =>
                                            changeHandler(
                                              idx,
                                              idx2,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="d-flex item_add mb-2 new_c">
                    <div className="set_btn_p">

                      <label className="card-header text-danger ex_title rm_padding ">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => addNewMaterial(idx)}
                        >
                          Add New Material
                        </button>
                      </label>
                      <label className="card-header text-danger ex_title rm_padding_left">
                        <div className="d-flex item_ad2">
                          <button
                            type="button"
                            onClick={() => duplicateItem(idx)}
                            className="btn btn-sm dubplicate"
                          >
                            <i className="bx bx-copy"></i>
                          </button>
                        </div>
                      </label>
                    </div>
                    <div>

                      <label className="card-header text-danger ex_title">
                        {" "}
                        Extra Expenses:{" "}
                        {formatter.format(item?.extra_expense) || '0.00'}
                      </label>
                      <label className="card-header text-danger ex_title">
                        {" "}
                        Total: {formatter.format(Number(item?.item_total) + Number(item?.material?.reduce((acc, id) => acc + Number(id?.material_cost), 0)) + Number(item?.extra_expense)) || '0.00'}
                      </label>
                    </div>

                    <div className="col-md-2 text-left">
                      <div className="form-group">
                        <label
                          className="form-label text-success"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Seeling Price
                        </label>
                        <input
                          className={`form-control`}
                          type="number"
                          placeholder="Enter selling price"
                          value={item.selling_price}
                          readOnly
                        // onChange={(e) =>
                        //   changeHandler(
                        //     idx,
                        //     null,
                        //     "selling_price",
                        //     e.target.value
                        //   )
                        // }
                        />
                      </div>
                    </div>
                    <div className="col-md-2 text-left">
                      <div className="form-group">
                        <label
                          className="form-label text-success"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Adjust Seeling Price
                        </label>
                        <input
                          className={`form-control`}
                          type="number"
                          placeholder="Enter selling price"
                          value={item.adjustSelling}
                          onChange={(e) =>
                            changeHandler(
                              idx,
                              null,
                              "adjustSelling",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </>
            );
          })}
          <div className="card mb-4 total_footer">
            <div className="" style={{ fontSize: "1.2rem" }}>
              Total Extra Price: {formatter.format(mainState?.reduce((acc, item) => acc + Number(item?.extra_expense), 0)) || '0.00'}
            </div>
            <div className=" " style={{ fontSize: "1.2rem" }}>
              Total Items Price: {formatter.format(calculateTotalItemPrice()) || '0.00'}
            </div>
            <div className=" " style={{ fontSize: "1.2rem" }}>
              Total Selling Price: {formatter.format(mainState?.reduce((acc, item) => acc + Number(item?.selling_price), 0)) || '0.00'}
            </div>
          </div>
        </div>
        {/* <div className="content-backdrop fade" /> */}
      </div>
    </>
  );
}


export const Dropzone = () => {

}