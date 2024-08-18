import React, { useContext,useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { productsData} from "@/data";
import {
Card,
CardBody,
CardHeader,
CardFooter,
Input,
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
export const Cart = () => {
const { addToCart,cartItems, getTotalCartAmount, checkout,updateCartItemCount,removeFromCart } = useContext(ShopContext);
const totalAmount = getTotalCartAmount();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const handleCheckout = (e) => {
e.preventDefault();
checkout(name,email,address); 
};
return (
<div className="cart">
   <Typography
      variant="h3"
      className="flex justify-center font-normal text-balck-gray-500"
      >
      Your Cart Items
   </Typography>
   <div className="cart">
      {productsData.map((product) => {
      if (cartItems[product.id] !== 0) {
      return   (    
      <Card key={product.name} color="transparent" shadow={false}>
         <CardHeader
            floated={false}
            color="gray"
            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
            >
            <img
               src={product.url}
               alt={product.name}
               className="h-full w-full object-cover"
               />
         </CardHeader>
         <CardBody className="py-0 px-1">
            <Typography
               variant="small"
               className=" font-normal text-blue-gray-500"
               >
               {product.category}
            </Typography>
            <Typography
               variant="h5"
               color="blue-gray"
               className="flex justify-center mt-1 mb-2"
               >
               {product.name}
            </Typography>
            <Typography
               variant="paragraph"
               className="flex justify-center font-normal text-blue-gray-500"
               >
               {product.price} LE
            </Typography>
         </CardBody>
         <CardFooter className="mt-6 flex justify-center items-center py-2 px-2">
            <div className="flex items-center space-x-4">
               <button 
                  onClick={() => removeFromCart(product.id)} 
               className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
               >
               -
               </button>
               <input
                  value={cartItems[product.id]}
                  onChange={(e) => updateCartItemCount(Number(e.target.value), product.id)}
               className="text-center w-12 border border-gray-300 rounded-md p-1"
               />
               <button 
                  onClick={() => addToCart(product.id)} 
               className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600"
               >
               +
               </button>
            </div>
         </CardFooter>
      </Card>
      );
      }
      })}
   </div>
   {totalAmount > 0 ? (
   <div className="checkout p-6 bg-white shadow-md rounded-lg">
      <p className="flex justify-center text-lg font-semibold mt-8 mb-12">Subtotal: ${totalAmount}</p>
      <div>
      <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleCheckout}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h4"  className="mb-2 font-medium">Add Billing Information</Typography>
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Name</Typography>
            <Input
              size="lg"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Email</Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Address</Typography>
            <Input
              size="lg"
              placeholder="123 Main St"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="px-4 py-2 rounded-md"
            >
              Order Now
            </Button>
          </div>
        </form>

      </div>
   </div>
   ) : (
   <Typography
      variant="h6"
      className="mt-6 flex justify-center font-normal text-black"
      >
      Your Shopping Cart is Empty
   </Typography>
   )}
</div>
);
};