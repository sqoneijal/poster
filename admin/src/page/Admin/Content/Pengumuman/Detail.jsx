import DOMPurify from "dompurify";
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Detail = () => {
   const { module } = useSelector((e) => e.redux);
   const { openDetail, detailContent } = module;
   const dispatch = useDispatch();

   const handleClose = () => {
      dispatch(setModule({ ...module, openDetail: false, detailContent: {} }));
   };

   return (
      <React.Fragment>
         {openDetail && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-end ${openDetail ? "drawer-on" : ""}`} style={{ width: window.innerWidth / 2 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Detail Pengumuman</span>
                     </div>
                  </div>
                  <div className="card-toolbar">
                     <button className="btn btn-sm btn-icon btn-active-light-primary" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-2">
                           <span className="path1" />
                           <span className="path2" />
                        </i>
                     </button>
                  </div>
               </Card.Header>
               <Card.Body className="hover-scroll-overlay-y">
                  {h.detail_label("Judul", h.parse("judul", detailContent))}
                  {h.detail_label("Content", <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(h.parse("content", detailContent)) }} />)}
               </Card.Body>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Detail;
