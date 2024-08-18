import React , { useContext }  from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, productsData, projectsData } from "@/data";
import { ShopContext } from "../../context/shop-context";
export function Shop() {
  const { addToCart, cartItems } = useContext(ShopContext);
  return (<div className="px-4 pb-4">
  <Typography variant="h6" color="blue-gray" className="mb-2">
    Projects
  </Typography>
  <Typography
    variant="small"
    className="font-normal text-blue-gray-500"
  >
    Architects design houses
  </Typography>
  <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
    {productsData.map(
      ({ id,url, name, price, category}) => (
        <Card key={name} color="transparent" shadow={false}>
          <CardHeader
            floated={false}
            color="gray"
            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
          >
            <img
              src={url}
              alt={name}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="py-0 px-1">
            <Typography
                variant="small"
                className=" font-normal text-blue-gray-500"
                >
                {category}
            </Typography>
            <Typography
              variant="h5"
              color="blue-gray"
              className="flex justify-center mt-1 mb-2"
            >
              {name}
            </Typography>
            <Typography
                        variant="paragraph"
                        className="flex justify-center font-normal text-blue-gray-500"
                      >
                        {price} LE
                      </Typography>
          </CardBody>
          <CardFooter className="mt-6 flex justify-center items-center py-0 px-1">
            <Button variant="outlined" size="sm" onClick={() => addToCart(id)}>
                  Add To Cart {cartItems[id] > 0 && <> ({cartItems[id]})</>}
            </Button>
          </CardFooter>
        </Card>
      )
    )}
  </div>
</div>);
}

export default Shop;
