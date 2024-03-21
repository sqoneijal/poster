import React, { useLayoutEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalScreen = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { openModalScreen, daftarScreen, detailContent } = module;
   const dispatch = useDispatch();

   // array
   const [screenActive, setScreenActive] = useState([]);

   useLayoutEffect(() => {
      if (openModalScreen && h.objLength(detailContent)) {
         const updateScreenActive = [];
         detailContent.screen_active.forEach((row) => {
            updateScreenActive.push(h.toInt(h.parse("id_screen", row)));
         });
         setScreenActive(updateScreenActive);
      }
      return () => {};
   }, [openModalScreen, detailContent]);

   const clearProps = () => {
      dispatch(setModule({ ...module, openModalScreen: false, detailContent: {} }));
   };

   const submit = (row) => {
      const formData = {
         id_playlist: h.parse("id", detailContent),
         id_screen: h.parse("id", row),
         pageType: h.parse("pageType", row),
         user_modified: h.parse("username", init),
      };

      const fetch = h.post(`/handlesetscreen`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         h.dtReload();

         if (h.parse("pageType", row) === "delete") {
            const updateScreenActive = [];
            screenActive.forEach((id) => {
               if (id !== h.parse("id", row)) updateScreenActive.push(id);
            });
            setScreenActive(updateScreenActive);
            return;
         }
         setScreenActive((prev) => prev.concat(h.toInt(h.parse("id", row))));
      });
   };

   return (
      <Modal show={openModalScreen} onHide={clearProps} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>Daftar Screen</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Table responsive hover className="align-middle table-row-dashed fs-6" size="sm">
               <thead>
                  <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     <th className="text-center" style={{ width: "5%" }} />
                     <th>kode</th>
                     <th>nama</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 fw-semibold">
                  <Each
                     of={daftarScreen}
                     render={(row) => (
                        <tr
                           style={{ cursor: "pointer" }}
                           onClick={() => submit({ ...row, pageType: screenActive.includes(h.toInt(h.parse("id", row))) ? "delete" : "insert" })}>
                           <td className="text-center">
                              <input
                                 className="form-check-input"
                                 type="checkbox"
                                 disabled={true}
                                 checked={screenActive.includes(h.toInt(h.parse("id", row)))}
                              />
                           </td>
                           <td>{h.parse("kode", row)}</td>
                           <td>{h.parse("nama", row)}</td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Modal.Body>
      </Modal>
   );
};
export default ModalScreen;
