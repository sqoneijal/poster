import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = () => {
   const { module, websocket } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/getdata`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         { data: "kode" },
         { data: "nama" },
         { data: "screen_rotation" },
         { data: "screen_animation" },
         {
            data: null,
            render: (data) => {
               return `<span id="status-${h.parse("kode", data)}" class="text-danger fw-bold fs-4">Offline</span>`;
            },
         },
         { data: null, width: "10%" },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
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

         const viewScreen = row.querySelector("#view-screen");
         viewScreen.onclick = (e) => {
            e.preventDefault();
            window.open(`http://192.168.176.193:8001/?screen=${h.parse("kode", data)}`, "_blank");
         };
      },
      custom_button: `<a href="#" id="view-screen" class="btn btn-active-icon-primary btn-active-text-primary btn-sm p-0 m-0"><i class="ki-outline ki-monitor-mobile fs-1"></i></a>`,
   });

   useLayoutEffect(() => {
      datatable.init();

      const conn = new WebSocket(websocket);
      conn.onmessage = (e) => {
         try {
            const data = JSON.parse(e.data);
            const screen = data.screen;

            const el = document.querySelector(`#status-${screen.screenCode}`);
            if (!el) return;

            el.classList.remove("text-danger");
            el.classList.add("text-primary");
            el.innerHTML = "Online";
         } catch (error) {
            console.log(error);
         }
      };
      return () => {};
   }, []);

   return (
      <Table responsive hover id="datatable" className="align-middle table-row-dashed fs-6" size="sm">
         <thead>
            <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
               <th>kode</th>
               <th>nama</th>
               <th>rotasi</th>
               <th>animasi</th>
               <th>status</th>
               <th />
            </tr>
         </thead>
         <tbody className="text-gray-600 fw-semibold" />
      </Table>
   );
};
export default Lists;
