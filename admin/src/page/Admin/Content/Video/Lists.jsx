import React, { useLayoutEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Lists = ({ totalData, getContent, listContent, setListContent }) => {
   const { filter, module } = useSelector((e) => e.redux);
   const { page } = filter;
   const observerTarget = useRef(null);
   const dispatch = useDispatch();

   // bool
   const [bottomOfPage, setBottomOfPage] = useState(false);

   useLayoutEffect(() => {
      if (bottomOfPage && totalData > listContent.length) getContent({ filter });
      return () => setBottomOfPage(false);
   }, [bottomOfPage, page, totalData, listContent, filter]);

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

   const handleEdit = (row) => {
      dispatch(setModule({ ...module, openModalEditOrigName: true, detailContent: row }));
   };

   const removeItemById = (arr, id) => {
      return arr.filter((item) => h.toInt(h.parse("id", item)) !== id);
   };

   const handleHapus = (row) => {
      h.confirmDelete({
         msg: `Apakah anda yakin ingin menghapus ${h.parse("judul", row)}`,
         url: "/hapus",
         id: h.parse("id", row),
         custom: {
            video_file: h.parse("video_file", row),
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

   return (
      <React.Fragment>
         <Each
            of={listContent}
            render={(row, index) => (
               <Col md={4} className={index > 2 ? "mt-6" : ""}>
                  <Card className="card-bordered shadow-sm">
                     <Card.Header>
                        <OverlayTrigger placement="top" overlay={<Tooltip>{h.parse("judul", row)}</Tooltip>}>
                           <h3 className="card-title">{h.parse("judul", row)}</h3>
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
                     <Card.Body>
                        <video className="w-100 h-100" controls>
                           <source src={`/video/${h.parse("video_file", row)}`} type={h.parse("video_type", row)} />
                           Your browser does not support the video tag.
                        </video>
                     </Card.Body>
                  </Card>
               </Col>
            )}
         />
         <div ref={observerTarget} />
      </React.Fragment>
   );
};
export default Lists;
