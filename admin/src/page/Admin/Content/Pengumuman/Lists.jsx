import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const strip_tags = (html) => html.replace(/<[^>]*>?/gm, "");

   const word_limiter = (str, limit, end_char = "...") => {
      // Memecah string menjadi array kata
      const words = str.split(/\s+/);

      // Memastikan batas tidak lebih besar dari jumlah kata
      limit = Math.min(limit, words.length);

      // Menggabungkan kembali kata-kata sesuai batas
      const truncated_words = words.slice(0, limit);

      // Menggabungkan kembali kata-kata yang telah dipotong dengan karakter akhir
      let truncated_str = truncated_words.join(" ");

      // Menambahkan karakter akhir jika diperlukan
      if (words.length > limit) {
         truncated_str += end_char;
      }

      return truncated_str;
   };

   const datatable_url = `/getdata`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         {
            data: null,
            render: (data) => {
               return `<button id="judul">${h.parse("judul", data)}</button>`;
            },
         },
         {
            data: null,
            render: (data) => {
               return word_limiter(strip_tags(h.parse("content", data)), 30);
            },
         },
         { data: null },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const judul = row.querySelector("#judul");
         judul.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openDetail: true, detailContent: data }));
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
               <th>judul</th>
               <th>content</th>
               <th />
            </tr>
         </thead>
         <tbody className="text-gray-600 fw-semibold" />
      </Table>
   );
};
export default Lists;
