import lozad from "lozad";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalEditOrigName = React.lazy(() => import("./ModalEditOrigName"));

const Lists = ({ totalData, listContent, getContent, setListContent }) => {
   const { module, filter } = useSelector((e) => e.redux);
   const observerTarget = useRef(null);
   const dispatch = useDispatch();

   // bool
   const [bottomOfPage, setBottomOfPage] = useState(false);

   useLayoutEffect(() => {
      h.arrLength(listContent) &&
         lozad(".lozad", {
            enableAutoReload: true,
         }).observe();
      return () => {};
   }, [listContent]);

   useLayoutEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               setBottomOfPage(true);
            }
         },
         { threshold: 1 }
      );

      if (observerTarget.current) {
         observer.observe(observerTarget.current);
      }
      return () => {
         if (observerTarget.current) {
            observer.unobserve(observerTarget.current);
         }
      };
   }, [observerTarget, listContent]);

   useLayoutEffect(() => {
      if (bottomOfPage && totalData > listContent.length) getContent({ ...filter, page: h.toInt(filter.page) + 1 });
      return () => setBottomOfPage(false);
   }, [bottomOfPage, totalData, listContent, filter]);

   const removeItemById = (arr, id) => {
      return arr.filter((item) => h.toInt(h.parse("id", item)) !== id);
   };

   const handleHapus = (row) => {
      h.confirmDelete({
         msg: `Apakah anda yakin ingin menghapus ${h.parse("origname", row)}`,
         url: "/hapus",
         id: h.parse("id", row),
         custom: {
            filename: h.parse("filename", row),
         },
      }).then((res) => {
         const { data } = res;
         h.notification(data.status, data.msg_response);
         if (!data.status) return;

         const newData = removeItemById(listContent, h.toInt(h.parse("id", row)));
         setListContent(newData);
         totalData = newData.length;
      });
   };

   const handleEdit = (row) => {
      dispatch(setModule({ ...module, openModalEditOrigName: true, detailContent: row }));
   };

   const props = { setListContent, listContent };

   return (
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
         <Each
            of={listContent}
            render={(row, index) => (
               <Col md={4} className={index > 2 ? "mt-6" : ""}>
                  <Card className="card-bordered shadow-sm">
                     <Card.Header>
                        <h3 className="card-title">{h.parse("origname", row)}</h3>
                        <div className="card-toolbar">
                           <Dropdown>
                              <Dropdown.Toggle variant="light" className="btn btn-sm">
                                 Aksi
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                 <Dropdown.Item onClick={() => handleEdit(row)}>Edit</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleHapus(row)}>Hapus</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="text-center px-4">
                           <img
                              className="mw-100 mh-300px card-rounded-bottom"
                              alt={h.parse("origname", row)}
                              src={`/getfile/images/${h.parse("filename", row)}`}
                           />
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            )}
         />
         <div ref={observerTarget} />
      </React.Suspense>
   );
};
export default Lists;
