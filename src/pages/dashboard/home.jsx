import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
  Tooltip,

} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,  
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { authorsTableData } from "@/data";
import {getOrdersFromLocalStorage} from "../../components/sales-statistics";
import {OrderItem} from "../../components/order-item";
import productsData from "../../data/products-data";
const changeOrderIDtoDate = (ordertimestamp) => {
  const timestampString = ordertimestamp.split("-")[0]; 
  const timestamp = parseInt(timestampString, 10);
  const dateToCheck = new Date(timestamp); 
  const shortDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateToCheck);
  return shortDate; 
};


export function Home() {
  const temp = getOrdersFromLocalStorage();
  const ordersList = temp.reverse();
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mt-12 mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Orders Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Order ID","Order Date", "Orderer Name", "Orderer Address", "Orderer Email", "Order Total LE", "Order Status", "Order Items"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-1 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order, key) => {
                const className = `py-3 px-1 ${
                  key === ordersList.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={order.orderID}>
                    <td className={className}>{order.orderID}</td>
                    <td className={className}>{changeOrderIDtoDate(order.orderID)}</td>
                    <td className={className}>{order.ordererName}</td>
                    <td className={className}>{order.ordererAddress}</td>
                    <td className={className}>{order.ordererEmail}</td>
                    <td className={className}>{order.orderTotalAmount}</td>
                    <td className={className}>
                      <Chip
                          variant="gradient"
                          color={order.orderStatus=="ordered" ? "green" : "blue-gray"}
                          value={order.orderStatus}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        /></td>
                    <td className={className}>
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="py-1 pr-2 text-left">Qtn</th>
                            <th className="py-1 text-left">Name</th>
                            <th className="py-1 text-left">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsData.map((product) => {
                            if (order.orderItems.cartItems[product.id] > 0) {
                              return (
                                <OrderItem
                                  key={product.id}
                                  data={product}
                                  quantity={order.orderItems.cartItems[product.id]}
                                />
                              );
                            }
                            return null;
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      </div>
    </div>
  );
}

export default Home;
