import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Heart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../slices/productsSlice'

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.products.wishlist)
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const isWishlisted = product ? wishlist.includes(product.id) : false

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then((d) => setProduct(d))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-2">
        <div className="h-6 w-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500">Loading details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No product found.</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-violet-650 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Product Image Frame */}
          <div className="md:col-span-5 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950/20 rounded-lg border border-slate-200/50 dark:border-slate-800/50">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-80 max-w-full object-contain" 
            />
          </div>

          {/* Details Content */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900 rounded-md">
                {product.category}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {product.title}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {product.rating?.rate ?? '0.0'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  ({product.rating?.count ?? 0} reviews)
                </span>
              </div>

              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                ${product.price.toFixed(2)}
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Description
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Actions Block */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setAdded(true)
                  setTimeout(() => setAdded(false), 1500)
                }}
                className={`flex-1 min-w-[200px] py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-violet-600 hover:bg-violet-700 text-white'
                }`}
              >
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>

              <button
                onClick={() => dispatch(toggleWishlist(product.id))}
                className={`px-4 py-2.5 rounded-lg border text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-800 dark:text-rose-400'
                    : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
