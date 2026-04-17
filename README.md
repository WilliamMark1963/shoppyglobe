# 🌎 ShoppyGlobe

ShoppyGlobe is a modern, high-performance **E-commerce application** built with **React, Redux Toolkit, and Tailwind CSS**. It delivers a seamless shopping experience — from browsing products via the DummyJSON API to a fully validated checkout process.

---

## 🚀 Live Features

### 🔍 Dynamic Product Discovery

* Browse a wide range of products
* Real-time global search filtering

### 🛒 Advanced Cart Logic

* **FIFO Addition**: New items appear at the top
* **Quantity Management**: Min 1, Max 10 per item
* **Total Tracking**: Header displays total item count

### ⚡ Optimized Performance

* **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense`
* **Image Optimization**: Native lazy loading with smooth blur-in effect

### 🔐 Secure Checkout

* Fully validated shipping form (Regex for Email & Phone)
* Responsive order summary
* Success modal with automatic homepage redirection

---

## 🛠️ Tech Stack

* **Framework**: React.js (Vite)
* **State Management**: Redux Toolkit
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Routing**: React Router v6
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

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/shoppyglobe.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

---

## 📝 Key Functionality

### 🖼️ Image Lazy Loading

```jsx
<img
  loading="lazy"
  onLoad={() => setImgLoaded(true)}
  className={imgLoaded ? 'blur-0' : 'blur-2xl'}
/>
```

---

### 🛒 Cart Quantity Logic

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

## 🤝 Contributing

Feel free to fork this project and submit pull requests.
For major changes, please open an issue first to discuss your ideas.

---

## 📄 License

This project is licensed under the **William Developer**.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
