import React, { useLayoutEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { position, filter as setFilter, setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Filter = React.lazy(() => import("./Filter"));

let totalData = 0;

const Context = ({ setToolbarFilter }) => {
   const { module, init, filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();
   const inputFile = useRef(null);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

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

         dispatch(setModule({ ...module, showToolbarFilter: true }));
         dispatch(setFilter(formData));
         if (formData.source === "filter") {
            setListContent(data.listContent);
         } else {
            setListContent((prev) => prev.concat(data.listContent));
         }
         totalData = data.totalListContent;
      });
   };

   useLayoutEffect(() => {
      dispatch(position(["Content", document.title]));
      getContent({ page: 0 });
      return () => {};
   }, []);

   useLayoutEffect(() => {
      setToolbarFilter(
         h.buttons(`Upload ${document.title}`, isSubmit, {
            onClick: () => inputFile.current.click(),
         })
      );
      return () => setIsSubmit(false);
   }, [isSubmit]);

   const handleUpload = (file) => {
      const formData = { user_modified: h.parse("username", init), file };

      setIsSubmit(true);
      const fetch = h.post(`/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;
         setListContent((prev) => prev.concat(data.content));
         totalData++;
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   const props = { getContent, totalData, listContent, setListContent };

   return (
      h.objLength(filter) && (
         <Row>
            <input
               multiple
               type="file"
               className="d-none"
               ref={inputFile}
               onChange={(e) => {
                  if (h.arrLength(e.target.files)) {
                     handleUpload(e.target.files[0]);
                  }
               }}
            />
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
            </React.Suspense>
         </Row>
      )
   );
};
export default Context;
