import { chartsConfig } from "@/configs";
import {eachProductSales,salesPerPeriod} from "../components/sales-statistics";
let { keysArray: itemsSOldNames, valuesArray: itemsSoldQtn } = eachProductSales();
let {dateSalesReversed:day,totalSalesReversed:daySales}= salesPerPeriod(7)
let {dateSalesReversed:month,totalSalesReversed:monthSales}= salesPerPeriod(19)
const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Sales",
      data: itemsSoldQtn,
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: itemsSOldNames,
    },
    yaxis: {
      ...chartsConfig.yaxis,
      min: 0,
      tickAmount: Math.max(...itemsSoldQtn),
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: daySales,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: day,
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: monthSales,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: month,
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Sales",
      data: monthSales,
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Sales By Product",
    description: "Quantity of each product sold",
    footer: "just updated",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "Weekly sales day by day",
    footer: "just updated",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "This Month Sales",
    description: "AUG 2024 Sales",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
