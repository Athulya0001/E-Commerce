import React from "react";
import { HiOutlineXCircle } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../../redux/reducers/cartSlice";

const CartRow = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <tr className="align-middle border-b border-[#E4E7E9]">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <HiOutlineXCircle
            size={22}
            className="text-[#929FA5] hover:text-[#EE5858] cursor-pointer transition-colors"
            onClick={() => dispatch(removeFromCart(product.id))}
          />
          <img
            src={product.images?.[0] || "https://simpleeasydrawing.com/wp-content/uploads/2025/05/IMG_0587.jpg"}
            alt={product.title}
            className="w-16 h-16 object-cover rounded"
          />
          <span className="text-[#191C1F] font-medium w-44 line-clamp-2">
            {product.title}
          </span>
        </div>
      </td>

      <td className="py-4 px-6 text-[#475156] font-normal">
        ${product.price.toFixed(2)}
      </td>

      <td className="py-4 px-6">
        <div className="flex items-center border rounded px-3 py-1 w-max gap-4">
          <button
            className="text-lg"
            onClick={() => dispatch(decreaseQty(product.id))}
          >
            -
          </button>
          <span className="text-base text-[#475156]">{product.count}</span>
          <button
            className="text-lg"
            onClick={() => dispatch(increaseQty(product.id))}
            disabled={product.count >= product.stock}
          >
            +
          </button>
        </div>
      </td>

      <td className="py-4 px-6 text-[#475156] font-medium">
        ${(product.count * product.price).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartRow;

