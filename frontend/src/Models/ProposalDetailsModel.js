import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import { createItem, fetchLists, updateItem } from "../slices/customerSlice";
import SearchLocationInput from "../components/GooglePlcasesApi";
import toast from "react-hot-toast";

export default function ProposalDetailsModel(props) {
  const { initialState, actionType, filter } = props;
  // Create a ref to store the Formik instance
  const dispatch = useDispatch();
  const {
    customer: { loading },
    auth: { user_info },
  } = useSelector((state) => state);

  const submitHandler = async (values) => {
    let data = {
      ...values,
    };
  };

  return (
    <>
      <div
        className="modal  fade"
        id="proposal_details"
        tabIndex={-1}
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog  modal-fullscreen modal-simple modal-edit-user ">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <h4 className="text-center">Brooklyn Hub</h4>
              <hr class="my-4 mx-n4" />

              <div className="card mb-4 total_footer" >
                <div className="" style={{ fontSize: '1rem' }}>
                  Daily Hourly Rate : $125.00
                </div>
                <div className=" " style={{ fontSize: '1rem' }}>
                  Aluminium Cost : $3.30
                </div>
                <div className=" " style={{ fontSize: '1rem' }}>
                  Glass Cost : $15.00
                </div>
                <div className=" " style={{ fontSize: '1rem' }}>
                  Mark up Percent: 113
                </div>
                <div className=" " style={{ fontSize: '1rem' }}>
                  New Mark up Percent: 122
                </div>
              </div>
              <div className="card mb-4 total_footer2" >
                <div className="" >
                  Customer Name: <b>Eitan Lev</b>
                </div>
                <div className=" " >
                  Customer Billing Address: <b>3611 14th Avenue Suite 606, Brooklyn NY 11218</b>
                </div>
                <div className=" " >
                  Customer Job Site Address: <b>1271 60th St, Brooklyn, NY 11219, USA</b>
                </div>
              </div>

              <div className="card font_s">
                <h4 className="text-center mt-2">Custom Detail
                </h4>
                <div class="table-responsive text-nowrap">
                  <hr class="my-1 mx-n4" />
                  <table class="table table-striped mb-5">
                    {/* <caption class="ms-4 text-danger">
                      TOTAL COST: $900
                    </caption> */}
                    <thead>
                      <tr>
                        <th>Item Image</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Glass</th>
                        <th>Aluminium</th>
                        <th>Fixed Price</th>
                        <th>Shop Time</th>
                        <th>Installation Time</th>
                        <th>Total Time</th>
                        <th>Time Cost($)</th>
                        <th>Total Cost($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {/* <i className="fab fa-angular fa-lg text-danger me-3" /> */}
                          <img src="https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ" className="table_img" />
                        </td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5 className="text-center mt-2">Detail of Material Used
                  </h5>
                  <table class="table table-striped">
                    <caption className="ms-4  ">
                      <div className="tabl_bt">
                        <div>
                          ITEM PRICE:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          MATERIALS COST:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          EXTRA EXPENSES:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          SELLING PRICE:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          ADJUSTED SELLING PRICE:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          COST OF TIME:<br /> <b>$0.00</b>
                        </div>
                        <div>
                          ITEM COST:<br /> <b>$0.00</b>
                        </div>
                      </div>
                    </caption>
                    <thead>
                      <tr>
                        <th>MATERIAL IMAGE</th>
                        <th>MATERIAL Name</th>
                        <th>Description</th>
                        <th>QUANTITY</th>
                        <th>TOTAL QUANTITY</th>
                        <th>GLASS</th>
                        <th>ALUMINIUM</th>
                        <th>FIXED PRICE	</th>
                        <th>TIME COST</th>
                        <th>TOTAL COST</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {/* <i className="fab fa-angular fa-lg text-danger me-3" /> */}
                          <img src="https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ" className="table_img" />
                        </td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                        <td>Albert Cook</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card mb-4 mt-4" style={{ overflow: 'hidden', padding: '10px 0' }} >
                <h4 className="fin_te">FINAL RESULT
                </h4>
                <hr class="my-2 mx-n4" />
                <div className="final_result">
                  <div className="data_list">
                    <div>Total labor:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Cost of Labor:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Cost of Materials:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Overhead cost:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Misc Cost:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Equipment rental: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Commission for Mac Klein: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Commission for Barry Fulop:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Commission for issac Lebowitz:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Estimated cost:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Estimated Markup: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Estimated Total: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Adjusted Selling Price: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Total Price:	 </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Discount: </div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Total Price with discount:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                  <div className="data_list">
                    <div>Profit:	</div>
                    <div className="bold_text">8 hours 0 minutes</div>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2" style={{ textAlign: "right" }}>
                <button
                  type="reset"
                  className="btn btn-label-secondary me-3"
                  data-bs-dismiss="modal"
                  id="event_close2"
                  aria-label="Close"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary ">
                  {/* {loading == "loading" && (
                      <i class="fa fa-spinner fa-spin"></i>
                    )} */}
                  Save
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
