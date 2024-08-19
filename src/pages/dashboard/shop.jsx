import React, { useContext, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { productsData } from "@/data";
import { ShopContext } from "../../context/shop-context";

export function Shop() {
  const { addToCart, cartItems } = useContext(ShopContext);

  // State for pagination, sorting, filtering, and search
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search query
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.price - b.price;
    } else if (sortOrder === 'high-to-low') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="px-4 pb-4">
      <Typography variant="h6" color="blue-gray" className="mb-4">
        Products
      </Typography>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <select
          className="p-2 border border-gray-300 rounded-md"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
          <option value="Cameras">Cameras</option>
          <option value="Decor">Decor</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
        {currentProducts.map(({ id, url, name, price, category }) => (
          <Card key={id} color="transparent" shadow={false} className="border border-gray-200 rounded-lg">
            <CardHeader
              floated={false}
              color="gray"
              className="mx-0 mt-0 mb-4 h-64 xl:h-40 overflow-hidden"
            >
              <img
                src={url}
                alt={name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className="py-0 px-1">
              <Typography variant="small" className="font-normal text-blue-gray-500">
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 border border-gray-300 rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 border border-gray-300 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Shop;
