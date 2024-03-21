import React, { useLayoutEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { buttonConfig, position, filter as setFilter } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));
const Filter = React.lazy(() => import("./Filter"));
const ModalEditOrigName = React.lazy(() => import("./ModalEditOrigName"));

let totalData = 0;

const Context = () => {
   const { filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // array
   const [listContent, setListContent] = useState([]);

   const getContent = (filter) => {
      const formData = {};
      Object.keys(filter).forEach((key) => (formData[key] = filter[key]));

      const fetch = h.post(`/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         totalData = data.totalData;
         if (formData.source === "filter") {
            setListContent(data.listContent);
         } else {
            setListContent((prev) => prev.concat(data.listContent));
         }
         dispatch(setFilter(formData));
      });
   };

   useLayoutEffect(() => {
      dispatch(position(["Content", document.title]));
      dispatch(
         buttonConfig({
            label: `Tambah ${document.title}`,
            type: "add",
            loading: "false",
         })
      );
      getContent({ page: 0 });
      return () => {};
   }, []);

   const props = { totalData, getContent, listContent, setListContent };

   return (
      h.objLength(filter) && (
         <Row>
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
               <ModalEditOrigName {...props} />
               <Filter {...props} />
               <Lists {...props} />
               <Forms {...props} />
            </React.Suspense>
         </Row>
      )
   );
};
export default Context;
