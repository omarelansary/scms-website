import React from "react";

export const OrderItem = (props) => {
  const { data, quantity } = props;

  return (
    <tr>
      <td className="py-3  text-left">{quantity}</td>
      <td className="py-3  text-left">{data.name}</td>
      <td className="py-3  text-left">{data.price}</td>
    </tr>
  );
};
