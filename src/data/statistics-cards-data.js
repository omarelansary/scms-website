import {
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {TodaySales} from "../components/sales-statistics";
let [revenue,prev] =TodaySales();
export const statisticsCardsData = [
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Sales LE",
    value: [revenue],
    footer: {
      color: "text-green-500",
      value: [prev],
      label: "% than yesterday",
    },
  },
];

export default statisticsCardsData;
