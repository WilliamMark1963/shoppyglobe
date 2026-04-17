import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Regular import for the 'Body' or 'Home' to ensure the main page loads fast
import Body from './Components/Body.jsx';

// 2. Lazy imports for secondary routes
const ProductDetail = lazy(() => import('./Components/ProductDetail.jsx'));
const CheckOut = lazy(() => import('./Components/CheckOut.jsx'));
const NotFound = lazy(() => import('./Components/NotFound.jsx'));

// 3. Create a Loading Component (to show while the chunk is being downloaded)
const PageLoader = () => (
  <div className="min-h-screen flex justify-center items-center bg-sky-100">
    <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Wrap errorElement in Suspense if NotFound is lazy
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetail />
          </Suspense>
        )
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CheckOut />
          </Suspense>
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);