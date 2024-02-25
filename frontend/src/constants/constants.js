import { useSelector } from "react-redux";

export const REACT_APP_GOOGLE_MAPS_KEY =
  "AIzaSyBDpz-TZyycpDLAvhg6yyykBtZDC2rBeWI";

export function calculatePayment(item, list) {
  // Function to calculate total payment based on minutes worked and rate per hour
  let hourlyRate = list[0]?.g_value || 125.0;
  let aluminium = list[1]?.g_value || 3.3;
  let galss_cost = list[2]?.g_value || 15.0;

  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  let fixed = Number(item?.fixed_price || 0);
  let aluminium_pon = Number(item.alumunium_pond || 0) * aluminium;
  let glass_sqft = Number(item.glass_sqft || 0) * galss_cost;
  let totalQty = Number(item?.qty || 0);

  // Convert shop and installation time to total minutes
  let totalMinutes = shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm);

  // Convert total minutes to total hours
  let totalHours = totalMinutes / 60;

  // Calculate the total payment
  let totalPayment = totalHours * hourlyRate;
  totalPayment += aluminium_pon + glass_sqft + fixed;
  totalPayment = totalPayment * totalQty;
  // Round off the total payment to the nearest whole number
  return totalPayment.toFixed(2) || 0;
}

export const calculateExtraExpense = (item, totalItems = 1, list) => {
  let eq_rent = Number(item.eq_rent || 0);
  let ov_rent = Number(item.ov_rent || 0);
  let ms_rent = Number(item.ms_rent || 0);
  // let ds_rent = Number(item.ds_rent || 0);
  let totalExp = eq_rent + ov_rent + ms_rent;


  // Check if there are any agents with type equal to "amount"
  let agentAmounts = item.agent?.filter((agent) => agent.type === "amount");

  // Calculate total extra expenses from agents with type "amount"
  let agentExpenses = agentAmounts?.reduce((acc, agent) => {
    return acc + Number(agent.commission || 0);
  }, 0);

  // Calculate average extra expenses per total items
  let result = (totalExp + agentExpenses) / totalItems?.length || 0;
  console.log((totalExp + agentExpenses), totalItems?.length, 'totalExp');

  return result || 0;
};

export const calculateMaterialCost = (item, list) => {
  // Function to calculate total payment based on minutes worked and rate per hour
  let hourlyRate = list[0]?.g_value || 125.0;
  let aluminium = list[1]?.g_value || 3.3;
  let galss_cost = list[2]?.g_value || 15.0;

  let fixed_price = Number(item?.fixed_price || 0);
  let alumunium_pond = Number(item?.alumunium_pond || 0) * aluminium;
  let glass_sqft = Number(item?.glass_sqft || 0) * galss_cost;
  let totalQty = Number(item?.totalQty || 0);
  let total = (fixed_price + alumunium_pond + glass_sqft) * totalQty;
  return total.toFixed(2) || "0.00";
};

export function calculateItemTotalPrice(item, topDeatils, mainState, list) {
  // Function to calculate total payment based on minutes worked and rate per hour
  let hourlyRate = list[0]?.g_value || 125.0;
  let aluminium = list[1]?.g_value || 3.3;
  let galss_cost = list[2]?.g_value || 15.0;

  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  let fixed = Number(item?.fixed_price || 0);
  let aluminium_pon = Number(item.alumunium_pond || 0) * aluminium;
  let glass_sqft = Number(item.glass_sqft || 0) * galss_cost;
  let totalQty = Number(item?.qty);


  // Convert shop and installation time to total minutes
  let totalMinutes = shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm);

  // Convert total minutes to total hours
  let totalHours = totalMinutes / 60;

  // Calculate the total payment
  let totalPayment = totalHours * hourlyRate;

  totalPayment += aluminium_pon + glass_sqft + fixed;
  totalPayment = totalPayment * totalQty;

  // Round off the total payment to the nearest whole number

  // let res = calculateExtraExpense(topDeatils, mainState, list);

  return totalPayment || 0;
}

export const calculateSellingPrice = (total, topDeatils, list) => {
  let markupPercentage = list[3]?.g_value || 113;

  // Check if there are any agents with type equal to "amount"
  let agentAmounts = topDeatils?.agent?.filter(
    (agent) => agent.type === "percent"
  );


  // Calculate total extra expenses from agents with type "amount"
  let agentsPercentage = agentAmounts.reduce((acc, agent) => {
    return acc + Number(agent.commission || 0);
  }, 0);

  let totalMarkupPercentage = markupPercentage + agentsPercentage;


  let cost = Number(total);
  let markup = (cost * totalMarkupPercentage) / 100;
  let selling_price = markup + cost;


  return selling_price?.toFixed(2) || 0;
};

export const getAgentsPercentage = (agents, defaultV) => {
  // Check if there are any agents with type equal to "amount"
  let agentAmounts = agents?.filter((agent) => agent.type === "percent");

  // Calculate total extra expenses from agents with type "amount"
  let agentsPercentage = agentAmounts.reduce((acc, agent) => {
    return acc + Number(agent.commission || 0);
  }, 0);

  return (defaultV + Number(agentsPercentage)) || defaultV
}


export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});




export const calculateTotalTimeCost = (item, list) => {

  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  // Convert shop and installation time to total minutes
  let totalMinutes = shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm);

  // Convert total minutes to total hours
  let totalHours = totalMinutes / 60;
  let hourlyRate = list[0]?.g_value || 125.0;
  // Calculate the total payment
  let totalPayment = totalHours * hourlyRate;
  return totalPayment
}
export const calculateTotalTime = (item, list) => {

  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  // Convert shop and installation time to total minutes
  let totalMinutes = shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm);


  return totalMinutes
}

export const getUniqe = (total) => {
  return formatter.format(total)
}




export const finalItemPrice = (item, list) => {

  let aluminium = list[1]?.g_value || 3.3;
  let galss_cost = list[2]?.g_value || 15.0;


  let fixed = Number(item?.fixed_price || 0);
  let aluminium_pon = Number(item.alumunium_pond || 0) * aluminium;
  let glass_sqft = Number(item.glass_sqft || 0) * galss_cost;
  let totalQty = Number(item?.qty || 1);

  let totalPayment = aluminium_pon + glass_sqft + fixed;
  totalPayment = totalPayment * totalQty;
  return getUniqe(totalPayment)
}


export const finalcalculateMaterialCost = (item, list) => {
  // Function to calculate total payment based on minutes worked and rate per hour
  let total = item?.reduce((acc, it) => acc + Number(it?.material_cost), 0)

  return Number(total);
};

// export const finalcalculateExtraExpense = (item, list) => {
//   // Function to calculate total payment based on minutes worked and rate per hour
//   let total = item?.reduce((acc, it) => acc + it?.material_cost, 0)
//   return Number(total).toFixed(2) || "0.00";
// };


export const costOfTotalTime = (item, list) => {

  // Function to calculate total payment based on minutes worked and rate per hour
  let hourlyRate = list[0]?.g_value || 125.0;

  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  // Convert shop and installation time to total minutes
  let totalQty = Number(item?.qty);


  // Convert shop and installation time to total minutes
  let totalMinutes = shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm);

  // Convert total minutes to total hours
  let totalHours = totalMinutes / 60;

  // Calculate the total payment
  let totalPayment = totalHours * hourlyRate;

  totalPayment = totalPayment * totalQty;

  return totalPayment
}


// Function to calculate the total time for all items in mainState
export const totalLabour = (mainState) => {
  // Reduce the array to calculate the total time
  const totalMinutes = mainState.reduce((total, item) => {
    let shop_hr = Number(item?.shop_hr || 0);
    let shop_mm = Number(item?.shop_mm || 0);
    let install_hr = Number(item?.install_hr || 0);
    let install_mm = Number(item?.install_mm || 0);
    let totalQty = Number(item?.qty || 1);

    // Convert shop and installation time to total minutes
    return total + (shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm)) * totalQty;
  }, 0);

  // Convert total minutes to total hours and minutes
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Return the total time formatted as hours and minutes
  return `${totalHours} hours ${remainingMinutes} minutes`;
};


// Function to calculate the total time for a single item
const calculateTotalTimeForItem = (item) => {
  let shop_hr = Number(item?.shop_hr || 0);
  let shop_mm = Number(item?.shop_mm || 0);
  let install_hr = Number(item?.install_hr || 0);
  let install_mm = Number(item?.install_mm || 0);
  let totalQty = Number(item?.qty || 1);

  // Convert shop and installation time to total minutes
  const totalMinutes = (shop_hr * 60 + shop_mm + (install_hr * 60 + install_mm)) * totalQty;

  // Convert total minutes to total hours and minutes
  const totalHours = totalMinutes / 60;

  return totalHours;
};

// Function to calculate the total hourly cost for all items
export const calculateHourlyTotalCost = (mainState, list) => {
  let hourlyRate = list[0]?.g_value || 125.0;

  // Calculate the total time for each item and accumulate the hourly total
  const totalHours = mainState.reduce((total, item) => {
    const totalTimeForItem = calculateTotalTimeForItem(item);
    return total + totalTimeForItem;
  }, 0);

  // Calculate the total cost based on the hourly rate
  const totalCost = totalHours * hourlyRate;

  return totalCost;
};



export const calculateTotalMaterialCost = (mainState) => {
  // Iterate through each item in the mainState array
  const totalMaterialCost = mainState.reduce((total, item) => {
    // Iterate through the material array of the current item
    const itemMaterialCost = item.material.reduce((itemTotal, materialItem) => {
      // Add the cost of each material item to the itemTotal      
      return itemTotal + Number(materialItem.material_cost || 0);
    }, 0);

    // Add the material cost of the current item to the total
    return total + itemMaterialCost;
  }, 0);

  return totalMaterialCost;
};

export const estimatedCost = (state) => {
  let total = state.totalHourlyCost +
    state.totalMaterialCost +
    Number(state.ov_rent) +
    Number(state.ms_rent) +
    Number(state.eq_rent)

  return total

}

export const estimatedMarkup = (state, newMarkup) => {
  let total = state.totalHourlyCost +
    state.totalMaterialCost +
    Number(state.ov_rent) +
    Number(state.ms_rent) +
    Number(state.eq_rent);

  return total * newMarkup / 100

}


export const getAdjustSelling = (mainState) => {
  // Iterate through each item in the mainState array
  const totalMaterialCost = mainState.reduce((total, item) => {

    // Add the material cost of the current item to the total
    return total + item.adjustSelling
  }, 0);

  return totalMaterialCost;
};


export const getAgentsPercentageCommisson = (mainState, totalPriceWithDiscount) => {
  // Iterate through each item in the mainState array
  const totalCommission = mainState.map((item,) => {
    if (item.type === "percent") {
      const percent = Number(item?.commission);
      const earn = Number(totalPriceWithDiscount) * percent / 100;
      item.earn = earn;
    } else {
      item.earn = Number(item.commission);
    }

    return item;
  });

  return totalCommission;
};


export const getTheTotalDiscount = (item, totalPrice) => {
  console.log(item, '09909090');
  if (item?.type == 'amount') {
    return item.ds_rent
  } else {
    console.log(Number(totalPrice) * Number(item.ds_rent) / 100, 'totalPrice');
    return Number(totalPrice) * Number(item.ds_rent) / 100
  }
}