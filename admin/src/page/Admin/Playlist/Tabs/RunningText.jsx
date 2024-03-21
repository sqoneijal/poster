import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import Filter from "./Filter";

let totalData = 0;

const RunningText = ({ selectedRunningText, setSelectedRunningText }) => {
   const observerTarget = useRef(null);

   // bool
   const [bottomOfPage, setBottomOfPage] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   // object
   const [filter, setFilter] = useState({});

   // array
   const [listContent, setListContent] = useState([]);

   const handleSelected = (selected, data) => {
      if (h.arrLength(selected)) {
         if (selected.includes(h.toInt(h.parse("id", data)))) {
            const updateSelected = [];
            selected.forEach((id) => {
               if (id !== h.toInt(h.parse("id", data))) updateSelected.push(id);
            });
            setSelectedRunningText(updateSelected);
         } else {
            setSelectedRunningText([...selected, h.toInt(h.parse("id", data))]);
         }
      } else {
         setSelectedRunningText([...selected, h.toInt(h.parse("id", data))]);
      }
   };

   const getData = (filter) => {
      const fetch = h.get(`/getdaftarrunningtext?${h.serialize(filter)}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setFilter(filter);
         if (h.parse("source", filter) && h.parse("source", filter) === "filter") {
            setListContent(data.listContent);
         } else {
            setListContent((prev) => prev.concat(data.listContent));
         }
         totalData = data.totalData;
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData({ page: 0 });
      return () => {};
   }, []);

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
      if (bottomOfPage && totalData > listContent.length && !isLoading) getData({ ...filter, source: "", page: h.toInt(filter.page) + 1 });
      return () => setBottomOfPage(false);
   }, [bottomOfPage, totalData, listContent, filter, isLoading]);

   const props = { filter, setFilter, getData };

   return (
      <Row>
         <Filter {...props} />
         <Col>
            <Table responsive hover className="align-middle table-row-dashed fs-6" size="sm">
               <thead>
                  <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     <th style={{ width: "5%" }} className="text-center">
                        no
                     </th>
                     <th>text</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 fw-semibold">
                  <Each
                     of={listContent}
                     render={(row, index) => (
                        <tr
                           style={{ cursor: "pointer" }}
                           className={selectedRunningText.includes(h.toInt(h.parse("id", row))) ? "selected" : ""}
                           onClick={() => handleSelected(selectedRunningText, row)}>
                           <td className="text-center">{index + 1}</td>
                           <td>{h.parse("text", row)}</td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Col>
         <div ref={observerTarget} />
      </Row>
   );
};
export default RunningText;
