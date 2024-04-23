import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import TokenContextProvider, { TokenContext } from "./Context/Token";
import { useEffect, useContext } from "react";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Details from "./Components/Details/Details";
import Checkout from "./Components/Checkout/Checkout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import FavouriteItem from "./Components/FavouriteItem/FavouriteItem";
import NewPassword from "./Components/NewPassword/NewPassword";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoutes>
              <Details />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },

        {
          path: "favouriteitem",
          element: (
            <ProtectedRoutes>
              <FavouriteItem />
            </ProtectedRoutes>
          ),
        },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "newpassword", element: <NewPassword /> },

        { path: "resetpassword", element: <ResetPassword /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let { setToken } = useContext(TokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
