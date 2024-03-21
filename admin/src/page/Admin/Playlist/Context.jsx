import React, { useLayoutEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { buttonConfig, setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));
const ModalScreen = React.lazy(() => import("./ModalScreen"));
const Filter = React.lazy(() => import("./Filter"));
const FormsContent = React.lazy(() => import("./FormsContent"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const initPage = () => {
      const fetch = h.get(`/initpage`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      dispatch(
         buttonConfig({
            label: `Tambah ${document.title}`,
            type: "add",
            loading: "false",
         })
      );
      initPage();
      return () => {};
   }, []);

   return (
      !isLoading && (
         <Card className="shadow-sm card-bordered">
            <Card.Body>
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
                  <Filter />
                  <Lists />
                  <Forms />
                  <ModalScreen />
                  <FormsContent />
               </React.Suspense>
            </Card.Body>
         </Card>
      )
   );
};
export default Context;
