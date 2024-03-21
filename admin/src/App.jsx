if (process.env.NODE_ENV === "development") {
   new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
}

import "~/assets/css/custom.css";
import "~/assets/css/plugins.bundle.css";
import "~/assets/css/style.bundle.css";

import { configureStore } from "@reduxjs/toolkit";
import React, { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import redux, { setInit } from "./redux";

const store = configureStore({
   reducer: { redux },
});

const Login = React.lazy(() => import("./Login/Context"));
const Admin = React.lazy(() => import("./page/Context"));

const App = () => {
   const { init } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = () => {
      const fetch = h.get(`/initpage`, {}, true);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setInit({ ...data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      initPage();
      return () => {};
   }, []);

   return (
      !isLoading && (
         <React.Suspense
            fallback={
               <Bars
                  visible={true}
                  color="#4fa94d"
                  radius="9"
                  wrapperStyle={{
                     alignItems: "center",
                     display: "flex",
                     justifyContent: "center",
                  }}
                  wrapperClass="page-loader flex-column bg-dark bg-opacity-25"
               />
            }>
            {h.objLength(init) ? <Admin /> : <Login />}
         </React.Suspense>
      )
   );
};
const container = document.getElementById("kt_app_root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
