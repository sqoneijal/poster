import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = () => {
   const { filter, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/getdata?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         { data: "nama" },
         {
            data: null,
            render: (data) => {
               let html = `<a href="#" id="add-screen" class="btn btn-active-icon-primary btn-active-text-primary btn-sm p-0 m-0"><i class="ki-outline ki-pencil fs-2"></i></a>`;
               data.screen_active.forEach((row) => {
                  html += `<span class="badge badge-sm badge-primary me-2">${h.parse("nama", row)}</span>`;
               });

               return html;
            },
         },
         {
            data: null,
            render: (data) => {
               let html = `<a href="#" id="add-content" class="btn btn-active-icon-primary btn-active-text-primary btn-sm p-0 m-0"><i class="ki-outline ki-pencil fs-2"></i></a>`;
               if (h.arrLength(data.images)) {
                  html += `<span class="badge badge-sm badge-primary me-2">Images</span>`;
               }
               if (h.arrLength(data.video)) {
                  html += `<span class="badge badge-sm badge-primary me-2">Video</span>`;
               }
               if (h.arrLength(data.youtube)) {
                  html += `<span class="badge badge-sm badge-primary me-2">Youtube</span>`;
               }
               if (h.arrLength(data.running_text)) {
                  html += `<span class="badge badge-sm badge-primary me-2">Running Text</span>`;
               }
               if (h.arrLength(data.pengumuman)) {
                  html += `<span class="badge badge-sm badge-primary me-2">Pengumuman</span>`;
               }
               return html;
            },
         },
         { data: null, width: "10%" },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const addContent = row.querySelector("#add-content");
         addContent.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openFormsContent: true, detailContent: data }));
         };

         const addScreen = row.querySelector("#add-screen");
         addScreen.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openModalScreen: true, detailContent: data }));
         };

         const _edit = row.querySelector("#edit");
         if (_edit) {
            _edit.onclick = (e) => {
               e.preventDefault();
               dispatch(setModule({ ...module, openForms: true, pageType: "update", detailContent: data }));
            };
         }

         const _delete = row.querySelector("#delete");
         if (_delete) {
            _delete.onclick = (e) => {
               e.preventDefault();
               h.confirmDelete({
                  url: "/hapus",
                  id: data.id,
               }).then((res) => {
                  if (typeof res === "undefined") return;
                  const { data } = res;
                  h.notification(data.status, data.msg_response);
                  data.status && datatable.reload();
               });
            };
         }
      },
   });

   useLayoutEffect(() => {
      datatable.init();
      return () => {};
   }, []);

   return (
      <Table responsive hover id="datatable" className="align-middle table-row-dashed fs-6" size="sm">
         <thead>
            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
               <th>nama</th>
               <th>screen</th>
               <th>content</th>
               <th />
            </tr>
         </thead>
         <tbody className="text-gray-600 fw-semibold" />
      </Table>
   );
};
export default Lists;
