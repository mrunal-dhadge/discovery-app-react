import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./navigations/root";
import ErrorPage from "./pages/error-page";
import { Provider } from "react-redux";
import { store } from "./store";
import ContactPage from "./pages/ContactPage";
import AddContact from "./components/addContact";
import Charts from "./pages/Charts";
import Map from "./pages/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/contacts/",
        element: <ContactPage />,
      },
      {
        path: "/add-contact/",
        element: <AddContact />,
      },
      {
        path: "/chart/",
        element: <Charts />,
      },
      {
        path: "/map/",
        element: <Map />,
      },
    ],
  },
  // {
  //   path: "/maps/",
  //   element: <Charts />,
  // },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
