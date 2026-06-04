import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Heart, Moon, Sun, ShoppingBag } from 'lucide-react'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import { useSelector } from 'react-redux'

export default function App() {
  const wishlist = useSelector((state) => state.products.wishlist)
  const location = useLocation()
  
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Header Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              CatalogStore
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'text-violet-605 dark:text-violet-400' 
                  : 'text-slate-600 dark:text-slate-405 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Shop
            </Link>

            <span className="h-4 w-px bg-slate-200 dark:bg-slate-850"></span>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>

            {/* Wishlist Status */}
            <div className="relative p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              <Heart className={`h-4 w-4 ${wishlist.length > 0 ? 'fill-rose-500 stroke-rose-500' : 'stroke-slate-450'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-rose-500 text-[9px] font-black text-white flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

          </nav>
        </div>
      </header>

      {/* Main Pages Content */}
      <main className="flex-1 mx-auto w-full max-w-6xl py-6 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
        <div className="mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <p>© 2026 CatalogStore. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-605 dark:hover:text-slate-400 cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-slate-605 dark:hover:text-slate-400 cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
