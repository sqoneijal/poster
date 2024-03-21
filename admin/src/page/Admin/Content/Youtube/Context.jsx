import React, { useLayoutEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { buttonConfig, position, filter as setFilter, setModule } from "~/redux";

const Forms = React.lazy(() => import("./Forms"));
const Lists = React.lazy(() => import("./Lists"));
const Filter = React.lazy(() => import("./Filter"));

let totalData = 0;

const Context = () => {
   const { module, filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // array
   const [listContent, setListContent] = useState([]);

   // string
   const [page, setPage] = useState(0);

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

         totalData = h.toInt(h.parse("totalData", data));
         if (formData.source === "filter") {
            setListContent(data.listContent);
         } else {
            setListContent((prev) => prev.concat(data.listContent));
         }
         dispatch(setModule({ ...module, showToolbarFilter: true }));
         dispatch(setFilter(formData));
      });
   };

   useLayoutEffect(() => {
      dispatch(position(["Content", document.title]));
      dispatch(
         buttonConfig({
            label: `Tambah Link ${document.title}`,
            type: "add",
            loading: "false",
         })
      );
      getContent({ page: 0 });
      return () => {};
   }, []);

   const props = { listContent, setListContent, page, setPage, getContent, totalData };

   return (
      h.objLength(filter) && (
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
            <Filter {...props} />
            <Lists {...props} />
            <Forms {...props} />
         </React.Suspense>
      )
   );
};
export default Context;
