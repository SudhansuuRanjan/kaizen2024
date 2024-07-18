import React from 'react'
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = ({ cartLength }) => {
  return (
    <div className='relative'>
      <span className='absolute px-1 text-xs rounded-full bg-red-600 right-[-35%] top-[-25%]'>{cartLength}</span>
      <FaShoppingCart size={22} />
    </div>
  )
}

export default CartIcon