import React, { useEffect, useMemo, useState } from 'react'
import { Search, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../slices/productsSlice'
import ProductCard from '../components/ProductCard'

const PAGE_SIZE = 10

export default function ProductListPage() {
  const dispatch = useDispatch()
  const { items, status, wishlist } = useSelector((s) => s.products)
  
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('none')
  const [showWishlistOnly, setShowWishlistOnly] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (status === 'idle' && items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, status, items.length])

  const categories = useMemo(() => {
    const unique = new Set(items.map((i) => i.category))
    return ['All', ...Array.from(unique)]
  }, [items])

  const filtered = useMemo(() => {
    let list = items
    if (query) {
      list = list.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    }
    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    if (showWishlistOnly) {
      list = list.filter((p) => wishlist.includes(p.id))
    }
    if (sort === 'asc') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sort === 'desc') {
      list = [...list].sort((a, b) => b.price - a.price)
    }
    return list
  }, [items, query, category, sort, showWishlistOnly, wishlist])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [query, category, sort, showWishlistOnly])

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Product Catalog</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse through our curated collection of quality items.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-550" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-9 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-violet-500 focus:border-violet-500 text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Wishlist Button */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                showWishlistOnly
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-800 dark:text-rose-400'
                  : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${showWishlistOnly ? 'fill-rose-500 stroke-rose-500' : 'stroke-slate-450 dark:stroke-slate-500'}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            {/* Sort price dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-violet-500 cursor-pointer"
            >
              <option value="none">Sort: Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = category === c
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {c === 'All' ? 'All Categories' : c}
              </button>
            )
          })}
        </div>
      </div>

      {/* Loading Skeletons */}
      {status === 'loading' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4 animate-pulse">
              <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Failed state */}
      {status === 'failed' && (
        <div className="text-center py-12 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-rose-500 font-semibold">Failed to fetch products</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-750 text-white text-xs font-bold rounded-lg"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {status === 'succeeded' && filtered.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400 text-sm">No products found matching filters.</p>
          <button
            onClick={() => {
              setQuery('')
              setCategory('All')
              setShowWishlistOnly(false)
              setSort('none')
            }}
            className="mt-4 px-4 py-2 bg-slate-850 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Grid (10 items max per page) */}
      {status === 'succeeded' && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pageItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {status === 'succeeded' && filtered.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing <b>{(page - 1) * PAGE_SIZE + 1}</b> - <b>{Math.min(page * PAGE_SIZE, filtered.length)}</b> of <b>{filtered.length}</b> products
          </p>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <span className="text-xs text-slate-600 dark:text-slate-400 px-2 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
