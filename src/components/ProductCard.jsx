import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../slices/productsSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
  };

  const rating = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div className="p-4 flex-1 flex flex-col relative">
        {/* Wishlist Icon */}
        <button
          onClick={handleWishlist}
          className="absolute top-6 right-6 z-10 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted
                ? "fill-rose-500 stroke-rose-500"
                : "stroke-slate-400 dark:stroke-slate-500 hover:stroke-rose-500"
            }`}
          />
        </button>

        <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
          {/* Product Image Frame */}
          <div className="h-48 bg-slate-50 dark:bg-slate-950/40 rounded-lg flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-40 max-w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Text Details */}
          <div className="mt-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                {product.category}
              </span>
              <h3 className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                {product.title}
              </h3>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-1 text-xs text-amber-500">
                <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-slate-400 dark:text-slate-500">
                  ({count})
                </span>
              </div>

              <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-violet-650 dark:text-violet-400">
                  View Details →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
