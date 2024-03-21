import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ daftarRotasi, daftarAnimasi }) => {
   const { module, init, websocket } = useSelector((e) => e.redux);
   const { openForms, pageType, detailContent } = module;
   const dispatch = useDispatch();
   const socket = new WebSocket(websocket);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      if (pageType === "update" && h.objLength(detailContent)) setInput({ ...detailContent, old_kode: h.parse("kode", detailContent) });
      return () => {};
   }, [pageType, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, pageType: "", detailContent: {}, openForms: false }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { pageType, user_modified: h.parse("username", init) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setErrors(data.errors);
         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         clearProps();
         dispatch(setModule({ ...module, pageType: "", detailContent: {}, openForms: false }));
         h.dtReload();

         socket.onopen = (e) => {
            if (e.target.readyState) {
               const socketdata = {
                  screen: {
                     reload: true,
                     status: "online",
                     screenCode: [h.parse("kode", input)],
                  },
               };

               socket.send(JSON.stringify(socketdata));
            }
         };
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <React.Fragment>
         {openForms && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-start ${openForms ? "drawer-on" : ""}`} style={{ width: window.innerWidth / 2 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">
                           {h.pageType(pageType)} {document.title}
                        </span>
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
                  <Row>
                     <Col md={3} sm={12}>
                        {h.form_text(
                           `Kode`,
                           `kode`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`kode`, input) },
                           true,
                           errors
                        )}
                     </Col>
                     <Col>
                        {h.form_text(
                           `Nama`,
                           `nama`,
                           { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`nama`, input) },
                           true,
                           errors
                        )}
                     </Col>
                  </Row>
                  <Row>
                     <Col md={3} sm={12}>
                        {h.form_select(
                           `Rotasi Layar`,
                           `screen_rotation`,
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse(`screen_rotation`, input),
                           },
                           daftarRotasi
                        )}
                     </Col>
                     <Col md={5} sm={12}>
                        {h.form_select(
                           "Animasi Layar",
                           "screen_animation",
                           {
                              onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                              value: h.parse("screen_animation", input),
                           },
                           daftarAnimasi
                        )}
                     </Col>
                  </Row>
               </Card.Body>
               <Card.Footer className="text-end">
                  <ButtonGroup>
                     {h.buttons(`Simpan ${document.title}`, isSubmit, {
                        onClick: isSubmit ? null : submit,
                     })}
                     {h.buttons(`Batal`, false, {
                        variant: "danger",
                        onClick: () => handleClose(),
                     })}
                  </ButtonGroup>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Forms;
