let apiUrl = "http://192.168.176.193:8002";
if (process.env.NODE_ENV === "development") {
   new EventSource("http://localhost:8081/esbuild").addEventListener("change", () => location.reload());
   apiUrl = "http://localhost:8080";
}

import "../node_modules/animate.css/animate.css";
import "../node_modules/toastr/build/toastr.css";
import "./custom.css";

import { configureStore } from "@reduxjs/toolkit";
import React, { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";
import redux from "./redux";

const store = configureStore({
   reducer: { redux },
});

const Context2 = React.lazy(() => import("./Context2"));

const App = () => {
   const { socketServer } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = (slug) => {
      const fetch = h.get(`${apiUrl}/api/playlist/${slug}`, {}, true);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...data, screenCode: slug }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   const getURLParameter = (parameter) => {
      const url = window.location.search.substring(1);
      const urlParameters = url.split("&");

      for (const urlParameter of urlParameters) {
         const parameterName = urlParameter.split("=");
         if (parameterName[0] === parameter) {
            return parameterName[1] === undefined ? true : decodeURIComponent(parameterName[1]);
         }
      }
   };

   useLayoutEffect(() => {
      initPage(getURLParameter("screen"));

      const socket = new WebSocket(socketServer);
      socket.onopen = (e) => {
         if (e.target.readyState) {
            const data = {
               screen: {
                  reload: false,
                  status: "online",
                  screenCode: getURLParameter("screen"),
               },
            };
            socket.send(JSON.stringify(data));
         }
      };

      socket.onmessage = (e) => {
         const data = e.data;
         try {
            const content = JSON.parse(data);
            const screen = content.screen;
            if (screen.reload && screen.screenCode.includes(getURLParameter("screen"))) {
               window.location.reload();
            }
         } catch (e) {
            console.log(e);
         }
      };

      return () => {};
   }, []);

   const props = { apiUrl };

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
            <Context2 {...props} />
         </React.Suspense>
      )
   );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
