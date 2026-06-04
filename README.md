# React Product Catalog App

A clean, responsive, and modern product listing and detail application built using **React (Functional Components & Hooks)**, **Redux Toolkit**, and **Tailwind CSS v4.0**. The application retrieves products dynamically from the public FakeStore API.

---

## 📋 Project Specifications & Features

This application meets all requirements outlined in the project guidelines:

### Screen 1 – Product Listing
- **Product Cards**: Displays the product image, title, price, category, and average rating badge.
- **Search**: Instant client-side search filtering by product title.
- **Category Filter**: Navigable tab buttons based on the categories retrieved from the API.
- **Price Sort**: Sort products by price in ascending (Low to High) or descending (High to Low) order.
- **Pagination**: Splitted lists displaying exactly **10 records per page** with responsive page navigators.

### Screen 2 – Product Detail
- **Dynamic Route**: Opening a product opens a detailed page showing all product information (title, full description, category, price, image, and rating statistics).
- **Back Navigation**: Quick back-link button returning directly to the catalog listing.

### Additional Features
- **Dark Mode**: Manual theme toggler toggling a `.dark` class on the root element. Settings are persisted inside `localStorage`.
- **Wishlist**: Users can flag favorites directly from the listing cards or detail views. The wishlist stores product IDs in `localStorage` and renders a live badge counter in the header.

---

## 🛠️ Tech Stack

- **React 18** (Functional Components, Hooks)
- **Redux Toolkit** (Global state container for items, request status, and wishlist array)
- **React Router DOM v6** (Multi-page configuration)
- **Tailwind CSS v4.0** (Vite CSS-first integration, class-based dark mode)
- **Vitest & React Testing Library** (Unit tests)

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── ProductCard.jsx       # Card displaying product info, rating, and wishlist trigger
│   └── ProductCard.test.jsx  # Tests for ProductCard rendering inside Redux/Router wrappers
├── pages/
│   ├── ProductListPage.jsx   # Catalog listing view with search, filter tabs, sort, and pagination
│   └── ProductDetailPage.jsx # Individual detailed view displaying all product details
├── slices/
│   ├── productsSlice.js      # Redux slice managing fetch status and wishlist triggers
│   └── productsSlice.test.js # Redux reducer and initial state unit tests
├── index.css                 # Imports Tailwind v4 and declares the class dark variant
├── main.jsx                  # Application bootstrapper
├── store.js                  # Global Redux Store configurator
└── App.jsx                   # Theme provider, navigation bar, and router routes
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended).

### 1. Install Dependencies
Run the install command in the project root folder:
```bash
npm install
```

### 2. Run Local Development Server
Start the Vite developer environment:
```bash
npm run dev
```
Open your browser and navigate to the address displayed (usually `http://localhost:5173`).

### 3. Run Unit Tests
Execute the unit tests using Vitest:
```bash
npm run test
```

### 4. Build for Production
To build a optimized production bundle of the application:
```bash
npm run build
```
This compiles assets to the `/dist` directory.

---

## 💡 Dark Mode Implementation (Tailwind v4)
In Tailwind CSS v4, the class-based dark mode variant is configured directly in the CSS file. In `src/index.css`, we declare the custom variant:
```css
@variant dark (&:where(.dark, .dark *));
```
We toggle dark mode in JavaScript by adding or removing the `dark` class on the root HTML element:
```javascript
document.documentElement.classList.add('dark');
```
All elements prefixed with `dark:` (e.g. `dark:bg-slate-950`, `dark:text-white`) will automatically apply their styling when the `.dark` class is present.
