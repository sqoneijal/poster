import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ setListContent }) => {
   const { module, init, filter } = useSelector((e) => e.redux);
   const { openForms, pageType, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   // string
   const [percentCompleted, setPercentCompleted] = useState(0);

   useLayoutEffect(() => {
      if (pageType === "update" && h.objLength(detailContent)) setInput({ ...detailContent });
      return () => {};
   }, [pageType, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
   };

   const handleClose = () => {
      setPercentCompleted(0);
      clearProps();
      dispatch(setModule({ ...module, openForms: false, pageType: "", detailContent: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { pageType, user_modified: h.parse("username", init) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      const config = {
         onUploadProgress(progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setPercentCompleted(percentCompleted);
         },
      };

      setIsSubmit(true);
      const fetch = h.post(`/submit`, formData, config);
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
         setPercentCompleted(0);
         clearProps();
         dispatch(setModule({ ...module, openForms: false, pageType: "", detailContent: {} }));
         setListContent((prev) => prev.concat(data.content));
      });
      fetch.finally(() => {
         setIsSubmit(false);
         setPercentCompleted(0);
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
                  {h.form_text(
                     `Judul`,
                     `judul`,
                     { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`judul`, input) },
                     true,
                     errors
                  )}
                  {h.form_upload(
                     `Video File`,
                     `video_file`,
                     {
                        onChange: (e) => {
                           const files = e.target.files;
                           if (files.length > 0) setInput((prev) => ({ ...prev, video_file: files[0].name, file: files[0] }));
                        },
                     },
                     true,
                     errors
                  )}
                  {percentCompleted > 0 && <ProgressBar now={percentCompleted} animated label={`${percentCompleted}%`} />}
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
