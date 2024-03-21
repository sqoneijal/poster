import lozad from "lozad";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";
import YoutubeEmbed from "~/YoutubeEmbed";

const Lists = ({ totalData, listContent, setListContent, page, setPage }) => {
   const { module } = useSelector((e) => e.redux);
   const observerTarget = useRef(null);
   const dispatch = useDispatch();

   // bool
   const [bottomOfPage, setBottomOfPage] = useState(false);

   const getContent = (page) => {
      const formData = { page };

      const fetch = h.post(`/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setListContent((prev) => prev.concat(data.listContent));
      });
      fetch.finally(() => {
         setBottomOfPage(false);
         setPage((prev) => prev + 1);
      });
   };

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
      if (bottomOfPage && totalData > listContent.length) getContent(page + 1);
      return () => setBottomOfPage(false);
   }, [bottomOfPage, page, totalData, listContent]);

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
         if (!data.status) {
            return;
         }
         const newData = removeItemById(listContent, h.toInt(h.parse("id", row)));
         setListContent(newData);
         dispatch(setModule({ ...module, totalListContent: newData.length }));
         totalData = newData.length;
      });
   };

   const handleEdit = (row) => {
      dispatch(setModule({ ...module, openForms: true, pageType: "update", detailContent: row }));
   };

   const getYoutubeVideoId = (url) => {
      const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]{11}).*/;
      const match = url.match(regExp);
      return match?.[1] ? match[1] : null;
   };

   return (
      <Row>
         <Each
            of={listContent}
            render={(row, index) => (
               <Col md={4} className={index > 2 ? "mt-6" : ""}>
                  <Card className="card-bordered shadow-sm">
                     <Card.Header>
                        <OverlayTrigger overlay={<Tooltip>{h.parse("nama", row)}</Tooltip>}>
                           <h3 className="card-title">{h.parse("nama", row)}</h3>
                        </OverlayTrigger>
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
                     <Card.Body className="text-center px-4">
                        <YoutubeEmbed embedId={getYoutubeVideoId(h.parse("link", row))} />
                     </Card.Body>
                  </Card>
               </Col>
            )}
         />
         <div ref={observerTarget} />
      </Row>
   );
};
export default Lists;
