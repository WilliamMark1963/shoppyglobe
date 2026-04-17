# 🌎 ShoppyGlobe

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-State_Management-purple?logo=redux)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-Bundler-yellow?logo=vite)

ShoppyGlobe is a modern, high-performance **E-commerce application** built with **React, Redux Toolkit, and Tailwind CSS**. It delivers a seamless shopping experience — from browsing products to a fully validated checkout process.

---

## ✨ Features

### 🔍 Dynamic Product Discovery

* Browse a wide range of products
* Real-time global search filtering

### 🛒 Advanced Cart Logic

* FIFO Addition (latest items on top)
* Quantity control (Min: 1, Max: 10)
* Global cart item tracking in header

### ⚡ Performance Optimizations

* Route-based lazy loading (`React.lazy`)
* Image lazy loading with blur-in effect

### 🔐 Secure Checkout

* Regex-based form validation (Email & Phone)
* Responsive order summary
* Success modal with auto redirect

---

## 📸 Screenshots

> 📌 Replace the image links below with your actual screenshots (upload them to your repo → `/assets` folder recommended)

### 🏠 Home Page

![Home](./src/assets/HomePage.png)

### 🔎 Product Details

![Products](./src/assets/ProductDetails.png)


### 💳 Checkout Page

![Checkout](./src/assets/CheckOutPage.png)

### ⁉️ NotFound Page

![Checkout](./src/assets/NotFoundPage.png)

---

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite)
* **State Management**: Redux Toolkit
* **Styling**: Tailwind CSS
* **Routing**: React Router v6
* **Icons**: Lucide React
* **API**: DummyJSON

---

## 📂 Project Structure

```
src/
├── Components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductItem.jsx
│   ├── ProductDetail.jsx
│   ├── CheckOut.jsx
│   └── NotFound.jsx
├── Utilities/
│   ├── cartSlice.js
│   ├── searchSlice.js
│   ├── appStore.js
│   └── useFetch.js
└── main.jsx
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/WilliamMark1963/shoppyglobe.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

---

## 🧠 Key Implementations

### 🖼️ Image Lazy Loading

```jsx
<img
  loading="lazy"
  onLoad={() => setImgLoaded(true)}
  className={imgLoaded ? 'blur-0' : 'blur-2xl'}
/>
```

### 🛒 Cart Logic (Redux Toolkit)

```js
addItems: (state, action) => {
  const existingItem = state.items.find(item => item.id === action.payload.id);
  if (existingItem) {
    if (existingItem.quantity < 10) existingItem.quantity += 1;
  } else {
    state.items.unshift({ ...action.payload, quantity: 1 });
  }
}
```

---

## 🚀 Future Improvements

* 🔐 User Authentication (Login/Signup)
* 💳 Payment Gateway Integration
* ❤️ Wishlist Feature
* 🌐 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **=William Developer**.

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub — it really helps!
