import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../slices/itemSlice";
import { fetchLists } from "../../slices/customerSlice";
import FilelUpload from "./FilelUpload";
import { fetchList } from "../../slices/globalSlice";
import Preview from "./Preview";

import TextInput from "../../components/TextInput";
import Select from "react-select";
import Step3 from "./Step3";
import { toast } from "react-hot-toast";
import {
  calculateExtraExpense,
  calculateMaterialCost,
  calculatePayment,
  calculateItemTotalPrice,
  calculateSellingPrice,
  getAgentsPercentage,
} from "../../constants/constants";

import { fetchLists as fetchLists2 } from "../../slices/usreSlice";
import { createProposals } from "../../slices/proposalSlice";
import { fetchList as fetchitemCat } from "../../slices/categorySlice";
import { fetchLists as fetchitems, mfetchLists2 } from "../../slices/itemSlice";
import { mfetchList } from "../../slices/categorySlice";
import UpdateAddressModal from "../../Models/updateAddress";

function CreateProposal() {
  const [activeStepe, setactiveStepe] = useState("step1");
  const formikRef = React.useRef(null);
  const [selectedCat, setselectedCat] = useState();
  const dispatch = useDispatch();
  const { crudStatus } = useSelector((state) => state?.proposal);
  const { list } = useSelector((store) => store.global);
  const { list2 } = useSelector((state) => state?.customer);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [contactPerOption, setcontactPerOption] = useState([]);

  const [agentData, setagentData] = useState({});
  const [step3Data, setstep3Data] = useState({
    jobname: "",
    agents: [],
  });

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    companyName: "",
    billing_address: "",
    work_site: ''
  });

  const [getRoleId, setgetRoleId] = useState(null);
  const [addressList, setaddressList] = useState([]);
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    const updatedOptionsData = addressList.map((address) => ({
      label: address,
      value: address,
    }));
    setOptionsData(updatedOptionsData);
  }, [addressList]);

  const [filter, setfilter] = useState({
    page: 1,
    limit: 1000,
  });

  useEffect(() => {
    dispatch(fetchList(filter));
  }, []);

  useEffect(() => {
    dispatch(fetchLists(filter))
      .then((res) => {
        if (res.payload?.items?.length > 0) {
          setcontactPerOption(
            res.payload?.items?.map((it) => ({
              ...it,
              label: it.name,
              value: it._id,
            }))
          );
        }
      })
      .catch((erro) => console.log(erro));
  }, []);

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

  const updateContact = (value, idx) => {
    if (value) {
      setFormData((prev) => ({ ...prev, ...value }));
      setgetRoleId((prev) => ({ ...prev, ...value }));
      setaddressList((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return [...prevArray, ...value?.address];
      });
    } else {
      setFormData({
        email: "",
        mobile: "",
        companyName: "",
        billing_address: "",
      });
      setaddressList([]);
    }
  };


  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const {
    list: itemsList,
    fetchStatus,
    listForProposal,
  } = useSelector((store) => store.item);

  const [agentsOption, setagentsOption] = useState([]);
  const [itemsCatOption, setitemsCatOption] = useState([]);
  const [itemsCodeOption, setitemsCodeOption] = useState([]);
  const [files, setFiles] = useState({});

  const [materialCatOption, setmaterialCatOption] = useState([]);
  const [materialNameOption, setmaterialNameOption] = useState([]);

  const agentChange = (value, idx, type) => {
    if (type === "select") {
      // If type is 'select', update agent index userId with value._id and commission with value.commission
      settopDeatils((prev) => ({
        ...prev,
        agent: prev.agent.map((agent, index) => {
          if (index === idx) {
            return {
              ...agent,
              userId: value._id,
              ...value,
              commission: value.commission,
            };
          }
          return agent;
        }),
      }));
    } else if (type == "type") {
      settopDeatils((prev) => ({
        ...prev,
        agent: prev.agent.map((agent, index) => {
          if (index === idx) {
            return {
              ...agent,
              type: value,
            };
          }
          return agent;
        }),
      }));
    } else {
      // If type is not 'select', only update the commission of agent index
      settopDeatils((prev) => ({
        ...prev,
        agent: prev.agent.map((agent, index) => {
          if (index === idx) {
            return {
              ...agent,
              commission: value,
            };
          }
          return agent;
        }),
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchitems(filter));
    dispatch(mfetchLists2(filter));
    dispatch(fetchitemCat(filter))
      .then((res) => {
        if (res.payload?.categories?.length > 0) {
          setitemsCatOption(
            res.payload?.categories?.map((it) => ({
              ...it,
              label: it.name,
              value: it._id,
            }))
          );
        }
      })
      .catch((err) => console.log(err, "error"));
    dispatch(mfetchList(filter))
      .then((res) => {
        if (res.payload?.categories?.length > 0) {
          setmaterialCatOption(
            res.payload?.categories?.map((it) => ({
              ...it,
              label: it.name,
              value: it._id,
            }))
          );
        }
      })
      .catch((err) => console.log(err, "error"));

    dispatch(fetchLists2(filter))
      .then((res) => {
        if (res.payload?.users?.length > 0) {
          setagentsOption(
            res.payload?.users?.map((it) => ({
              ...it,
              label: it.name,
              value: it._id,
            }))
          );
        }
      })
      .catch((err) => console.log(err, "erro"));
  }, []);

  const [materialState, setmaterialState] = useState({
    catId: "",
    item_code: {},
    glass_sqft: "",
    alumunium_pond: "",
    qty: 1,
    totalQty: 1,
    fixed_price: null,
    description: "",
    material_cost: null,
  });

  const [topDeatils, settopDeatils] = useState({
    name: "",
    eq_rent: null,
    eq_des: "",
    ov_rent: null,
    ov_des: "",
    ms_rent: null,
    ms_des: "",
    ds_rent: null,
    ds_des: "",
    newMarkup: null,
    ds_type: null,
    agent: [],
    type: 'amount'
  });

  const [itemStte, setitemStte] = useState({
    catId: "",
    item_code: {},
    qty: 1,
    fixed_price: null,
    location: "",
    shop_hr: null,
    shop_mm: null,
    install_hr: null,
    install_mm: null,
    glass_sqft: "",
    selling_price: null,
    item_total: null,
    extra_expense: null,
    alumunium_pond: "",
    description: "",
    adjustSelling: null,
    material: [],
  });

  const [mainState, setmainState] = useState([
    {
      catId: "",
      item_code: {},
      qty: 1,
      fixed_price: null,
      location: "",
      shop_hr: null,
      shop_mm: null,
      install_hr: null,
      install_mm: null,
      glass_sqft: "",
      selling_price: null,
      item_total: null,
      extra_expense: null,
      alumunium_pond: "",
      description: "",
      material: [],
      adjustSelling: null
    },
  ]);

  const [finalState, setfinalState] = useState({
    totalLabour: 0,
    totalHourlyCost: 0,
    totalPriceWithDiscount: 0,
    discount: 0,
    adjustSelling: 0,
    totalPrice: 0,
    totalMaterialCost: 0,
    ov_rent: 0,
    ms_rent: 0,
    eq_rent: 0,
  })
  const [finalState2, setfinalState2] = useState({})
  // Function to add a new agent
  const addAgent = (newAgent) => {
    let data = {
      userId: "",
      commission: "",
    };
    settopDeatils((prevState) => ({
      ...prevState,
      agent: [...prevState.agent, data],
    }));
  };

  // Function to delete an agent by index
  const deleteAgent = (index) => {
    settopDeatils((prevState) => ({
      ...prevState,
      agent: prevState.agent.filter((_, idx) => idx !== index),
    }));
  };

  const updateCategoryId = (value, idx) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        if (index === idx) {
          if (value?._id) {
            setitemsCodeOption(() => {
              let ars = itemsList?.filter(
                (i) => i?.category?._id == value?._id
              );
              return ars?.map((it) => ({
                ...it,
                label: it?.item_code,
                value: it._id,
                item_code: {},
              }));
            });
          }
          return {
            ...item,
            catId: value?._id || "", // Update the catId with value._id
          };
        }
        return item;
      });
    });
  };

  const updateMCategoryId = (value, parentIdx, materialIdx) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        if (index === parentIdx) {
          const updatedMaterial = item.material.map((data, index2) => {
            if (index2 === materialIdx) {
              if (value?._id) {
                setmaterialNameOption(() => {
                  let ars = listForProposal?.filter(
                    (i) => i?.category?._id == value?._id
                  );
                  return ars?.map((it) => ({
                    ...it,
                    label: it?.item_code,
                    value: it._id,
                    item_code: {},
                  }));
                });
              }
              return {
                ...data,
                catId: value?._id || "",
              };
            }
            return data;
          });
          return {
            ...item,
            material: updatedMaterial,
          };
        }
        return item;
      });
    });
  };

  const updateMaterialName = (value, parentIdx, materialIdx) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        if (index === parentIdx) {
          const updatedMaterial = item.material.map((data, index2) => {
            if (index2 === materialIdx) {
              if (!value?._id) {
                return {
                  ...data,
                  item_code: {},
                  glass_sqft: "",
                  alumunium_pond: "",
                  qty: 1,
                  fixed_price: null,
                  description: "",
                  item_code: {}, // Update the catId with value._id
                };
              }
              value.qty = 1;
              return {
                ...data,
                ...value,
                alumunium_pond: value?.alumunium_pond || "",
                glass_sqft: value?.glass_sqft || "",
                fixed_price: value?.fixed_price || "",
                totalQty: Number(value.qty * item?.qty),
                material_cost: calculateMaterialCost(
                  { ...value, totalQty: Number(value.qty * item?.qty) },
                  list
                ),
                item_code: value || {}, // Update the catId with value._id
              };
            }
            return data;
          });
          let allTotal =
            Number(item?.item_total) +
            Number(
              updatedMaterial?.reduce(
                (acc, id) => acc + Number(id?.material_cost),
                0
              )
            ) +
            Number(item?.extra_expense);
          return {
            ...item,
            material: updatedMaterial,
            selling_price: calculateSellingPrice(allTotal, topDeatils, list),
            adjustSelling: calculateSellingPrice(allTotal, topDeatils, list),
          };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    if (mainState?.length > 0) {
      setmainState(
        mainState?.map((item) => {
          let obj = { ...item };
          let extra_expense = calculateExtraExpense(
            topDeatils,
            mainState,
            list
          );
          let item_total = calculateItemTotalPrice(
            { ...item },
            topDeatils,
            mainState,
            list
          );
          let actualtotal =
            Number(item_total) +
            item?.material?.reduce(
              (acc, id) => acc + Number(id?.material_cost),
              0
            ) +
            Number(extra_expense);
          obj.selling_price = calculateSellingPrice(
            actualtotal,
            topDeatils,
            list
          );
          obj.adjustSelling = calculateSellingPrice(actualtotal, topDeatils, list);
          obj.item_total = item_total;
          obj.extra_expense = extra_expense;
          return obj;
        })
      );
    }
  }, [topDeatils]);

  const updateItemId = (value, idx) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        let extra_expense = value
          ? calculateExtraExpense(topDeatils, mainState, list)
          : "";
        let item_total = value
          ? calculateItemTotalPrice({ ...value, qty: item?.qty }, topDeatils, mainState, list)
          : "";
        let actualtotal =
          Number(item_total) +
          Number(
            item?.material?.reduce(
              (acc, id) => acc + Number(id?.material_cost),
              0
            )
          ) +
          Number(extra_expense);

        if (index === idx) {
          return {
            ...item,
            ...value,
            item_code: value || {}, // Update the catId with value._id
            selling_price: value
              ? calculateSellingPrice(actualtotal, topDeatils, list)
              : "",
            adjustSelling: calculateSellingPrice(actualtotal, topDeatils, list),
            extra_expense,
            item_total,
          };
        }
        return {
          ...item,
          extra_expense: value
            ? calculateExtraExpense(topDeatils, mainState, list)
            : "",
        };
      });
    });
  };

  const changeHandler1 = (e) => {
    const { name, value } = e.target;
    settopDeatils((prev) => ({ ...prev, [name]: value }));
  };
  const addNewMaterial = (itemIndex) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            material: [
              ...item.material,
              {
                ...materialState,
                totalQty: Number(item.qty) * materialState.qty,
              },
            ],
          };
        }
        return item;
      });
    });
  };

  const addNewItem = () => {
    // setmainState(mainState?.map(item => ({ ...item, extra_expense: calculateExtraExpense(topDeatils, mainState) })))
    setmainState((prev) => {
      let data = [...prev, itemStte];

      data.map((item) => {
        let item_total = calculateItemTotalPrice(
          { ...item },
          topDeatils,
          data,
          list
        );

        let extra_expense = calculateExtraExpense(topDeatils, data, list);
        item.selling_price = calculateSellingPrice(
          Number(item_total) + Number(extra_expense),
          topDeatils,
          list
        );

        item.adjustSelling = calculateSellingPrice(
          Number(item_total) + Number(extra_expense),
          topDeatils,
          list
        );

        item.extra_expense = extra_expense;
        item.item_total = item_total;
        return {
          ...item,
        };
      });
      return data;
    });
  };

  const deleteItem = (index) => {
    setmainState((prev) => {
      // Filter out the item at the specified index
      const updatedMainState = prev.filter((_, i) => i !== index);

      return updatedMainState?.map((item) => ({
        ...item,
        extra_expense: calculateExtraExpense(
          topDeatils,
          updatedMainState,
          list
        ),
      }));
    });
  };

  const deleteMaterial = (itemIndex, materialIndex) => {
    setmainState((prev) => {
      return prev.map((item, index) => {
        if (index === itemIndex) {
          const updatedMaterial = item.material.filter(
            (_, i) => i !== materialIndex
          );
          let selling_price = calculateSellingPrice(
            Number(item?.item_total) +
            Number(
              updatedMaterial?.reduce(
                (acc, id) => acc + Number(id?.material_cost),
                0
              )
            ) +
            Number(item?.extra_expense),
            topDeatils,
            list
          );
          return {
            ...item,
            material: updatedMaterial,
            selling_price,
            adjustSelling: selling_price
          };
        }
        return item;
      });
    });
  };

  const duplicateItem = (index) => {
    setmainState((prev) => {
      // Find the item to duplicate
      const itemToDuplicate = prev[index];
      // Create a copy of the item
      const duplicatedItem = { ...itemToDuplicate };
      // Add the duplicated item to the mainState array
      return [...prev, duplicatedItem]?.map((ite) => ({
        ...ite,
        extra_expense: calculateExtraExpense(
          topDeatils,
          [...mainState, duplicatedItem],
          list
        ),
        item_total: calculateItemTotalPrice(
          { ...ite },
          topDeatils,
          mainState,
          list
        ),
      }));
    });
  };

  const changeHandler = (itemIdx, matIdx, field, value) => {
    setmainState((prev) => {
      return prev.map((item, i) => {
        if (i === itemIdx) {
          let itemQty = item.qty;
          if (matIdx === null || matIdx === undefined) {
            if (field == "qty") {
              item.material = item.material?.map((mt) => ({
                ...mt,
                totalQty: Number(mt.qty) * Number(value),
                material_cost: calculateMaterialCost(
                  { ...mt, totalQty: Number(mt.qty) * Number(value) },
                  list
                ),
              }));
            }
            let item_total = value
              ? calculateItemTotalPrice(
                { ...item, [field]: value },
                topDeatils,
                mainState,
                list
              )
              : "";
            let extra_expense = value
              ? calculateExtraExpense(topDeatils, mainState, list)
              : "";

            // If matIdx is not provided, update item data
            return {
              ...item,
              selling_price: value
                ? calculateSellingPrice(
                  Number(item_total) + Number(extra_expense),
                  topDeatils,
                  list
                )
                : "",
              item_total,
              adjustSelling: calculateSellingPrice(
                Number(item_total) + Number(extra_expense),
                topDeatils,
                list
              ),
              extra_expense,
              [field]: value,
            };
          } else {
            // If matIdx is provided, update material data
            let material = item.material.map((mat, j) => {

              if (j === matIdx) {
                if (field == 'qty') {
                  mat.totalQty = Number(value) * itemQty
                }
                let obj = {
                  ...mat,
                  [field]: value,
                  material_cost: calculateMaterialCost(
                    { ...mat, [field]: value },
                    list
                  ),
                };
                return obj;
              }
              return mat;
            });
            let selling_price = calculateSellingPrice(
              Number(item?.item_total) +
              material?.reduce(
                (acc, id) => acc + Number(id?.material_cost),
                0
              ) +
              Number(item?.extra_expense),
              topDeatils,
              list
            );


            // console.log(material,'material');
            return {
              ...item,
              selling_price,
              material,
            };
          }
        }
        return item;
      });
    });
  };


  // Edit Selected Address
  const [toggleEditAddress, settoggleEditAddress] = useState(false);

  const submit = () => {
    let data = {
      files,
      finalState,
      finalState2,
      mainState,
      topDeatils,
      formData
    }
    dispatch(createProposals(data)).then((res) => {
      

    }).catch(err => console.log(err, 'error'))
  }

  return (
    <>
      <UpdateAddressModal
        roleID={getRoleId?._id}
        addressList={addressList}
        setaddressList={setaddressList}
      />

      <div
        className="col-lg-8  align-self-end "
        style={{ marginRight: 25, marginTop: 20 }}
      >
        {/* <h1>Calculate</h1> */}
      </div>

      <>
        <div
          className="bs-stepper wizard-numbered mt-2 hide_header_bg "
          style={{ margin: "0 25px" }}
        >
          <div className="bs-stepper-header">
            <div
              className={`step ${activeStepe == "step1" && "active"}`}
              onClick={() => setactiveStepe("step1")}
              data-target="#account-details"
            >
              <button type="button" className="step-trigger">
                <span className="bs-stepper-circle">
                  <i className="bx bx-user" />
                </span>
                <span className="bs-stepper-label mt-1">
                  <span className="bs-stepper-title">Customer Info</span>
                  <span className="bs-stepper-subtitle">
                    Setup Account Details
                  </span>
                </span>
              </button>
            </div>
            <div className="line">
              <i className="bx bx-chevron-right" />
            </div>
            <div
              data-target="#personal-info"
              className={`step ${activeStepe == "step2" && "active"}`}
              onClick={() => setactiveStepe("step2")}
            >
              <button type="button" className="step-trigger">
                <span className="bs-stepper-circle">
                  <i className="fa-solid fa-image" />
                </span>
                <span className="bs-stepper-label mt-1">
                  <span className="bs-stepper-title">
                    Upload Proposal Image
                  </span>
                  <span className="bs-stepper-subtitle">Add personal info</span>
                </span>
              </button>
            </div>
            <div className="line">
              <i className="bx bx-chevron-right" />
            </div>
            <div
              data-target="#social-links"
              className={`step ${activeStepe == "step3" && "active"}`}
              onClick={() => setactiveStepe("step3")}
            >
              <button type="button" className="step-trigger">
                <span className="bs-stepper-circle">
                  <i className="fa-regular fa-clipboard" />
                </span>
                <span className="bs-stepper-label mt-1">
                  <span className="bs-stepper-title">Calculate</span>
                  <span className="bs-stepper-subtitle">Add social links</span>
                </span>
              </button>
            </div>
            <div className="line">
              <i className="bx bx-chevron-right" />
            </div>
            <div
              data-target="#social-links"
              className={`step ${activeStepe == "step4" && "active"}`}
              onClick={() => setactiveStepe("step4")}
            >
              <button type="button" className="step-trigger">
                <span className="bs-stepper-circle">
                  <i className="fa-solid fa-magnifying-glass" />
                </span>
                <span className="bs-stepper-label mt-1">
                  <span className="bs-stepper-title">Preview</span>
                  <span className="bs-stepper-subtitle">
                    Prview of proposal
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </>

      {activeStepe == "step3" ? (
        <div class="container-xxl">
          <div className="row" style={{ padding: "0 20px", marginTop: "20px" }}>
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-widget-separator-wrapper">
                  <div className="card-body card-widget-separator">
                    <div className="row gy-4 gy-sm-1">
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                          <div>
                            <h3 className="mb-2">
                              $ {list[0]?.g_value || 125}
                            </h3>
                            <p className="mb-0">Daily Hourly Rate</p>
                          </div>
                          <div className="me-3" />
                        </div>
                        <hr className="d-none d-sm-block d-lg-none me-4" />
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0">
                          <div>
                            <h3 className="mb-2">
                              $ {list[1]?.g_value || 125}
                            </h3>
                            <p className="mb-0">Aluminium Cost</p>
                          </div>
                          <div className="me-3">
                            <small className="text-success fw-medium">
                              <i className="bx bx-up-arrow-alt" /> +0.02%
                            </small>
                          </div>
                        </div>
                        <hr className="d-none d-sm-block d-lg-none" />
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0">
                          <div>
                            <h3 className="mb-2">
                              $ {list[2]?.g_value || 125}
                            </h3>
                            <p className="mb-0">Glass Cost</p>
                          </div>
                          <div className="me-3">
                            <small className="text-success fw-medium">
                              <i className="bx bx-up-arrow-alt" /> +28.42%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h3 className="mb-2">
                              {list[3]?.g_value || 125} %
                            </h3>
                            <p className="mb-0">Markup Percentage</p>
                          </div>
                          <div className="me-3">
                            <small className="text-danger fw-medium">
                              <i className="bx bx-down-arrow-alt" /> -14.82%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : ""}

      <div class="container-xxl flex-grow-1" style={{ paddingTop: 0 }}>
        <div class="row">
          <div className="col-12 mb-4">
            {/* <small className="text-light fw-medium">Basic</small> */}
            <div
              className="bs-stepper wizard-numbered mt-2"
              style={{ background: "none", boxShadow: "none" }}
            >
              <div className="bs-stepper-content ">
                <div id="account-details" className="conten">
                  {/* <div className="content-header mb-3">
                    <h6 className="mb-0">{meta[activeStepe].title}</h6>
                    <small>{meta[activeStepe].subtitle}</small>
                  </div> */}
                  {activeStepe == "step1" ? (
                    <form
                      id="editUserForm"
                      className="row g-3 custom_input_height custom_bgs "
                    >
                      <div className="row g-3">
                        <div className="col-12 col-sm-6 position-relative custom-select">
                          <label className="form-label">CONTACT PERSON</label>
                          <Select
                            placeholder="Select item category"
                            // classNamePrefix="premissions"
                            // value={itemsCatOption[
                            //   itemsCatOption.findIndex(idd => idd._id == item.catId) == -1 ? null : itemsCatOption.findIndex(idd => idd._id == item.catId)
                            // ]}
                            onChange={(val) => updateContact(val)}
                            isClearable
                            options={contactPerOption}
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <TextInput
                            label="CONTACT EMAIL"
                            id="email"
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <TextInput
                            label="CUSTOMER BILLING ADDRESS"
                            id="billing_address"
                            type="text"
                            placeholder="Enter billing address"
                            name="billing_address"
                            value={formData.billing_address}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <TextInput
                            label="COMPANY NAME"
                            id="companyName"
                            type="text"
                            placeholder="Enter company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="col-12 col-sm-6">
                          <TextInput
                            label="CONTACT NUMBER"
                            id="shop_hr"
                            type="number"
                            placeholder="Enter number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={onChangeHandler}
                          />
                        </div>

                        <div
                          className="col-12 col-sm-5 position-relative custom-select"
                          style={{ paddingRight: 0 }}
                        >
                          <span
                            className="selection__arrow2"
                            role="presentation"
                          >
                            <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(67, 89, 113, 0.6)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>" />
                          </span>
                          <label className="form-label">work site</label>
                          <Select
                            // id="category"
                            placeholder="Select category"
                            // value={selectedCat}
                            classNamePrefix="premissions"
                            onChange={(val) => {
                              setselectedCat(val);
                              setFormData(prev => ({ ...prev, work_site: val.label }))
                            }}
                            options={optionsData}
                            styles={style}
                            isClearable
                          />
                        </div>

                        <div
                          className="col-12 col-md-1 pl-0 "
                          style={{ margin: "22px 0 0 0", paddingLeft: 0 }}
                        >
                          <label></label>
                          <p
                            data-bs-toggle="modal"
                            data-bs-target="#editCategory"
                            className="add_btn add_btn_bg"
                            style={{ margin: "0", border: "4px 4px 4px 0px" }}
                            onClick={() => settoggleEditAddress(true)}
                          // onClick={handleAddAddress}
                          >
                            Add
                          </p>
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-between"></div>
                    </form>
                  ) : activeStepe == "step2" ? (
                    <>
                      <FilelUpload
                        files={files} setFiles={setFiles}
                      />
                    </>
                  ) : activeStepe == 'step3' ? (
                    <Step3
                      updateMCategoryId={updateMCategoryId}
                      mainState={mainState}
                      itemStte={itemStte}
                      topDeatils={topDeatils}
                      addAgent={addAgent}
                      materialState={materialState}
                      deleteAgent={deleteAgent}
                      updateCategoryId={updateCategoryId}
                      updateMaterialName={updateMaterialName}
                      updateItemId={updateItemId}
                      changeHandler1={changeHandler1}
                      addNewMaterial={addNewMaterial}
                      addNewItem={addNewItem}
                      deleteItem={deleteItem}
                      deleteMaterial={deleteMaterial}
                      duplicateItem={duplicateItem}
                      changeHandler={changeHandler}
                      agentChange={agentChange}
                      list={list}
                      calculateMaterialCost={calculateMaterialCost}
                      agentsOption={agentsOption}
                      materialCatOption={materialCatOption}
                      itemsCodeOption={itemsCodeOption}
                      itemsCatOption={itemsCatOption}
                      materialNameOption={materialNameOption}
                      calculateSellingPrice={calculateSellingPrice}
                    />
                  ) :
                    <Preview
                      mainState={mainState}
                      itemStte={itemStte}
                      topDeatils={topDeatils}
                      addAgent={addAgent}
                      materialState={materialState}
                      deleteAgent={deleteAgent}
                      updateCategoryId={updateCategoryId}
                      updateMaterialName={updateMaterialName}
                      updateItemId={updateItemId}
                      changeHandler1={changeHandler1}
                      addNewMaterial={addNewMaterial}
                      addNewItem={addNewItem}
                      deleteItem={deleteItem}
                      deleteMaterial={deleteMaterial}
                      duplicateItem={duplicateItem}
                      changeHandler={changeHandler}
                      formData={formData}
                      agentChange={agentChange}
                      finalState={finalState}
                      setfinalState={setfinalState}
                      finalState2={finalState2}
                      setfinalState2={setfinalState2}
                      submit={submit}
                      list={list}
                      crudStatus={crudStatus}
                      calculateMaterialCost={calculateMaterialCost}
                      agentsOption={agentsOption}
                      materialCatOption={materialCatOption}
                      itemsCodeOption={itemsCodeOption}
                      setactiveStepe={setactiveStepe}
                      itemsCatOption={itemsCatOption}
                      selectedCat={selectedCat}
                      materialNameOption={materialNameOption}
                      calculateSellingPrice={calculateSellingPrice}
                    />
                  }
                  <div className="col-12 d-flex justify-content-between">
                    <button
                      className={
                        activeStepe !== "step1"
                          ? "btn btn-primary "
                          : "btn btn-label-secondary btn-prev"
                      }
                      disabled={activeStepe == "step1"}
                      onClick={(e) => {
                        // e.preventDefault();
                        setactiveStepe(() => {
                          if (activeStepe == "step2") {
                            return "step1";
                          } else if (activeStepe == "step3") {
                            return "step2";
                          }
                          else if (activeStepe == "step4") {
                            return "step3";
                          }
                          else {
                            return "";
                          }
                        });
                      }}
                    >
                      <i className="bx bx-chevron-left bx-sm ms-sm-n2" />
                      <span className="align-middle d-sm-inline-block d-none">
                        Previous
                      </span>
                    </button>
                    {activeStepe !== "step4" ? (
                      <button
                        className="btn btn-primary "
                        tabindex="0"
                        type="button"
                        onClick={(e) => {
                          // e.preventDefault();
                          setactiveStepe(() => {
                            if (activeStepe == "step1") {
                              return "step2";
                            } else if (activeStepe == "step2") {
                              return "step3";
                            } else if (activeStepe == "step3") {
                              return 'step4'
                            }
                            else {
                              return "";
                            }
                          });
                        }}
                      >
                        <span className="align-middle d-sm-inline-block d-none me-sm-1">
                          Next
                        </span>
                        <i className="bx bx-chevron-right bx-sm me-sm-n2" />
                      </button>
                    ) : activeStepe !== "step4" && (
                      <button
                        className="btn btn-primary "
                        tabindex="0"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#proposal_details"
                      >
                        <span className="align-middle d-sm-inline-block d-none me-sm-1">
                          Calculate
                        </span>
                        <i className="bx bx-chevron-right bx-sm me-sm-n2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProposal;
