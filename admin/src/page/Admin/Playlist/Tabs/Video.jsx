import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import Filter from "./Filter";

let totalData = 0;

const Video = ({ selectedVideo, setSelectedVideo }) => {
   const observerTarget = useRef(null);

   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [bottomOfPage, setBottomOfPage] = useState(false);

   // array
   const [listContent, setListContent] = useState([]);

   // object
   const [filter, setFilter] = useState({});

   const handleSelected = (selected, data) => {
      if (h.arrLength(selected)) {
         if (selected.includes(h.toInt(h.parse("id", data)))) {
            const updateSelected = [];
            selected.forEach((id) => {
               if (id !== h.toInt(h.parse("id", data))) updateSelected.push(id);
            });
            setSelectedVideo(updateSelected);
         } else {
            setSelectedVideo([...selected, h.toInt(h.parse("id", data))]);
         }
      } else {
         setSelectedVideo([...selected, h.toInt(h.parse("id", data))]);
      }
   };

   const getData = (filter) => {
      const fetch = h.get(`/getdaftarvideo?${h.serialize(filter)}`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         if (h.parse("source", filter) && h.parse("source", filter) === "filter") {
            setListContent(data.listContent);
         } else {
            setListContent((prev) => prev.concat(data.listContent));
         }
         totalData = data.totalData;
         setFilter({ ...filter, source: "" });
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
         <Each
            of={listContent}
            render={(row, index) => (
               <Col
                  md={4}
                  xs={12}
                  className={`${index > 2 ? "mt-5" : ""} col-hover ${
                     selectedVideo.includes(h.toInt(h.parse("id", row))) ? "col-hover-selected" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelected(selectedVideo, row)}>
                  <Card.Body className="p-2">
                     <h5 className="card-title">{h.parse("judul", row)}</h5>
                     <video className="w-100 h-100" controls>
                        <source src={`/video/${h.parse("video_file", row)}`} type={h.parse("video_type", row)} />
                        Your browser does not support the video tag.
                     </video>
                  </Card.Body>
               </Col>
            )}
         />
         <div ref={observerTarget} />
      </Row>
   );
};
export default Video;
