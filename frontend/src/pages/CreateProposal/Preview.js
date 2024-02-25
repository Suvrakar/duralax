import React, { useEffect } from 'react'

import {
    calculateExtraExpense,
    calculateMaterialCost,
    calculatePayment,
    calculateItemTotalPrice,
    calculateSellingPrice,
    getAgentsPercentage,
    formatter,
    calculateTotalTimeCost,
    calculateTotalTime,
    getUniqe,
    finalItemPrice,
    finalcalculateMaterialCost,
    costOfTotalTime,
    totalLabour, estimatedMarkup,
    calculateHourlyTotalCost,
    estimatedCost,
    calculateTotalMaterialCost,
    getAdjustSelling, getAgentsPercentageCommisson, getTheTotalDiscount
} from "../../constants/constants";

export default function Preview({
    mainState,
    topDeatils,
    selectedCat,
    finalState,
    setfinalState,
    setactiveStepe,
    finalState2,
    setfinalState2,
    submit,
    list,
    formData,
    crudStatus
}) {

    const calculateTotalItemPrice = () => {
        let totalItem = 0;
        mainState.map(item => {
            totalItem += Number(item?.item_total) + Number(item?.material?.reduce((acc, id) => acc + Number(id?.material_cost), 0)) + Number(item?.extra_expense)
        })
        return totalItem || 0
    }

    useEffect(() => {
        setfinalState(prev => ({
            ...prev,
            totalLabour: totalLabour(mainState),
            totalHourlyCost: calculateHourlyTotalCost(mainState, list),
            totalMaterialCost: calculateTotalMaterialCost(mainState),
            ov_rent: topDeatils?.ov_rent,
            ms_rent: topDeatils?.ms_rent,
            eq_rent: topDeatils?.eq_rent,
            adjustSelling: getAdjustSelling(mainState),
            totalPrice: getAdjustSelling(mainState),
            totalPriceWithDiscount: getAdjustSelling(mainState),

        }))

    }, [mainState, list, topDeatils])

    useEffect(() => {
        let esTkp = estimatedMarkup(finalState, getAgentsPercentage(topDeatils?.agent, list[3]?.g_value) || 113);
        let estC = estimatedCost(finalState, getAgentsPercentage(topDeatils?.agent, list[3]?.g_value) || 113);
        setfinalState2(prev => ({
            ...prev,
            estimatedMarkup: Number(esTkp),
            estimatedCost: Number(estC),
            discountType: topDeatils?.type,
            discountPr: topDeatils?.ds_rent,
            discount: getTheTotalDiscount(topDeatils, finalState?.totalPrice),
            agent: getAgentsPercentageCommisson(topDeatils?.agent, finalState?.totalPriceWithDiscount),
            estimatedTotal: Number(esTkp) + Number(estC),
            profit: Number(finalState?.totalPriceWithDiscount) - Number(estC),
            newMarkup: getAgentsPercentage(topDeatils?.agent, list[3]?.g_value)

        }))
    }, [finalState])


    return (
        <>
            <div className="modal-edit-user2 ">
                <h4 className="text-center">{topDeatils?.name || '--'}</h4>
                <hr class="my-4 mx-n4" />

                <div className="card mb-4 total_footer" >
                    <div className="" style={{ fontSize: '1rem' }}>
                        Daily Hourly Rate : ${list[0]?.g_value || 125}
                    </div>
                    <div className=" " style={{ fontSize: '1rem' }}>
                        Aluminium Cost : ${list[1]?.g_value || 125}
                    </div>
                    <div className=" " style={{ fontSize: '1rem' }}>
                        Glass Cost : ${list[2]?.g_value || 125}
                    </div>
                    <div className=" " style={{ fontSize: '1rem' }}>
                        Mark up Percent: {list[3]?.g_value || 113}%
                    </div>
                    <div className=" " style={{ fontSize: '1rem' }}>
                        New Mark up Percent: {getAgentsPercentage(topDeatils?.agent, list[3]?.g_value) || 113}%
                    </div>
                </div>
                <div className="card mb-4 total_footer2" >
                    <div className="" >
                        Customer Name: <b>{formData?.name}</b>
                    </div>
                    <div className=" " >
                        Customer Billing Address: <b>{formData?.billing_address}</b>
                    </div>
                    <div className=" " >
                        Customer Job Site Address: <b>{selectedCat?.label}</b>
                    </div>
                </div>

                {mainState?.map((item, idx) => {
                    return <>
                        <div className="card font_s" key={idx}>
                            <h4 className="text-center mt-2" style={{ textTransform: 'capitalize' }}>{item.item_code?.label} Detail
                            </h4>
                            <div class="table-responsive text-nowrap">
                                <hr class="my-1 mx-n4" />
                                <table class="table table-striped mb-5 hide_righ">
                                    <thead>
                                        <tr>
                                            <th style={{ paddingRight: '0' }}>Item Image</th>
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
                                                <img src={item?.item_code?.imgUrl || "https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ"} className="table_img" />
                                            </td>
                                            <td>{item?.qty}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.location}</td>
                                            <td>{item?.glass_sqft}</td>
                                            <td>{item?.alumunium_pond}</td>
                                            <td>{item?.fixed_price}</td>
                                            <td>{item?.shop_hr + "hours" + item.shop_mm + "minutes"}</td>
                                            <td>{item?.install_hr + "hours" + item.install_mm + "minutes"}</td>
                                            <td>{calculateTotalTime(item, list)}</td>
                                            <td>{getUniqe(calculateTotalTimeCost(item, list))}</td>
                                            <td>{getUniqe(calculateItemTotalPrice(item, '', '', list))}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <>
                                    <h5 className="text-center mt-2">Detail of Material Used
                                    </h5>

                                    <table class="table table-striped" >
                                        <caption className="ms-4  ">
                                            <div className="tabl_bt">
                                                <div>
                                                    ITEM PRICE:<br /> <b>{finalItemPrice(item, list)}</b>
                                                </div>
                                                <div>
                                                    MATERIALS COST:<br /> <b>{getUniqe(finalcalculateMaterialCost(item.material, list))}</b>
                                                </div>
                                                <div>
                                                    EXTRA EXPENSES:<br /> <b>{getUniqe(calculateExtraExpense(topDeatils, mainState, list))}</b>
                                                </div>
                                                <div>
                                                    SELLING PRICE:<br /> <b>{getUniqe(item?.selling_price)}</b>
                                                </div>
                                                <div>
                                                    ADJUSTED SELLING PRICE:<br /> <b>{getUniqe(item?.adjustSelling)}</b>
                                                </div>
                                                <div>
                                                    COST OF TIME:<br /> <b>{getUniqe(costOfTotalTime(item, list))}</b>
                                                </div>
                                                <div>
                                                    ITEM COST:<br /> <b>{getUniqe(calculateTotalItemPrice())}</b>
                                                </div>
                                            </div>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th>IMAGE</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>QUANTITY</th>
                                                <th>TOTAL QUANTITY</th>
                                                <th>GLASS</th>
                                                <th>ALUMINIUM</th>
                                                <th>FIXED PRICE	</th>
                                                {/* <th>TIME COST</th> */}
                                                <th>TOTAL COST</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item?.material.map((item2, idx2) => {
                                                return <>
                                                    <tr key={idx2}>
                                                        <td>
                                                            {/* <i className="fab fa-angular fa-lg text-danger me-3" /> */}
                                                            <img src="https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ" className="table_img" />
                                                        </td>
                                                        <td>{item2?.item_code?.label}</td>
                                                        <td>{item2?.description}</td>
                                                        <td>{item2?.qty}</td>
                                                        <td>{item2?.totalQty}</td>
                                                        <td>{item2?.glass_sqft}</td>
                                                        <td>{item2?.alumunium_pond}</td>
                                                        <td>{item2?.fixed_price}</td>
                                                        <td>{calculateMaterialCost(item2, list)}</td>

                                                    </tr>
                                                </>

                                            })}

                                        </tbody>
                                    </table>
                                </>
                            </div>
                        </div>
                        <br />
                    </>
                })}


                <div className="card mb-4 mt-4" style={{ overflow: 'hidden', padding: '10px 0' }} >
                    <h4 className="fin_te">FINAL RESULT
                    </h4>
                    <hr class="my-2 mx-n4" />
                    <div className="final_result">
                        <div className="data_list">
                            <div>Total labor:	</div>
                            <div className="bold_text">{finalState?.totalLabour}</div>
                        </div>
                        <div className="data_list">
                            <div>Cost of Labor:	</div>
                            <div className="bold_text">{getUniqe(finalState?.totalHourlyCost)}</div>
                        </div>
                        <div className="data_list">
                            <div>Cost of Materials:	</div>
                            <div className="bold_text">{getUniqe(finalState?.totalMaterialCost)}</div>
                        </div>
                        <div className="data_list">
                            <div>Item cost:	</div>
                            <div className="bold_text">{getUniqe(finalState?.totalMaterialCost)}</div>
                        </div>
                        <div className="data_list">
                            <div>Overhead cost:	</div>
                            <div className="bold_text">{getUniqe(finalState?.ov_rent)}</div>
                        </div>
                        <div className="data_list">
                            <div>Misc Cost:	</div>
                            <div className="bold_text">{getUniqe(finalState?.ms_rent)}</div>
                        </div>
                        <div className="data_list">
                            <div>Equipment rental: </div>
                            <div className="bold_text">{getUniqe(finalState?.eq_rent)}</div>
                        </div>

                        {finalState2?.agent?.length > 0 &&
                            <>
                                {finalState2?.agent?.map((item, idx) => (
                                    <div className="data_list" key={idx}>
                                        <div>{item?.name}: </div>
                                        <div className="bold_text"> {getUniqe(item?.earn)}  {item?.type == 'percent' && `(${item?.commission}%)`}</div>
                                    </div>
                                ))}
                            </>
                        }

                        <div className="data_list">
                            <div>Estimated cost:	</div>
                            <div className="bold_text">{getUniqe(finalState2?.estimatedCost)}</div>
                        </div>
                        <div className="data_list">
                            <div>Estimated Markup: </div>
                            <div className="bold_text">{getUniqe(finalState2?.estimatedMarkup)} ({finalState2?.newMarkup}%)</div>
                        </div>
                        <div className="data_list">
                            <div>Estimated Total: </div>
                            <div className="bold_text">{getUniqe(finalState2?.estimatedTotal)}</div>
                        </div>
                        <div className="data_list">
                            <div>Adjusted Selling Price: </div>
                            <div className="bold_text">{getUniqe(finalState.adjustSelling)}</div>
                        </div>
                        <div className="data_list">
                            <div>Total Price:	 </div>
                            <div className="bold_text">{getUniqe(finalState?.totalPrice)}</div>
                        </div>
                        <div className="data_list">
                            <div>Discount: </div>
                            <div className="bold_text">{getUniqe(finalState2?.discount)} {finalState?.discountType !== 'amount' && `(${finalState2?.discountPr}%)`}</div>
                        </div>
                        <div className="data_list">
                            <div>Total Price with discount:	</div>
                            <div className="bold_text">{getUniqe(finalState?.totalPriceWithDiscount)}</div>
                        </div>
                        <div className="data_list">
                            <div>Profit:	</div>
                            <div className="bold_text">{getUniqe(finalState2?.profit)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-2" style={{ textAlign: "right" }}>
                    <button
                        type="reset"
                        className="btn btn-label-secondary me-3"
                        onClick={() => setactiveStepe('step3')}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="btn btn-primary " onClick={submit}>
                        {crudStatus == "loading" && (
                            <i class="fa fa-spinner fa-spin"></i>
                        )}
                        Save
                    </button>

                </div>
            </div>
        </>
    )
}
