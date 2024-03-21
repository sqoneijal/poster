import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalEditOrigName = ({ setListContent, listContent }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { openModalEditOrigName, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      if (openModalEditOrigName && h.objLength(detailContent)) setInput({ ...detailContent });
      return () => {};
   }, [openModalEditOrigName, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, openModalEditOrigName: false, detailContent: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { user_modified: h.parse("username", init) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/updateorigname`, formData);
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

         const newData = [];
         listContent.map((row) => {
            if (h.toInt(h.parse("id", row)) === h.toInt(formData.id)) {
               newData.push({ ...row, origname: h.parse("origname", input) });
            } else {
               newData.push(row);
            }
         });
         setListContent(newData);

         clearProps();
         dispatch(setModule({ ...module, openModalEditOrigName: false, detailContent: {} }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Modal show={openModalEditOrigName} onHide={clearProps} backdrop="static">
         <Modal.Header>
            <Modal.Title>Perbaharui Nama File</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {h.form_text(
               `Nama File`,
               `origname`,
               { onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })), value: h.parse(`origname`, input) },
               true,
               errors
            )}
         </Modal.Body>
         <Modal.Footer>
            <ButtonGroup>
               {h.buttons(`Simpan`, isSubmit, {
                  onClick: isSubmit ? null : submit,
               })}
               {h.buttons(`Batal`, false, {
                  variant: "danger",
                  onClick: () => handleClose(),
               })}
            </ButtonGroup>
         </Modal.Footer>
      </Modal>
   );
};
export default ModalEditOrigName;
