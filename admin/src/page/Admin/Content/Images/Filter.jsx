import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { filter as setFilter } from "~/redux";

const Filter = ({ getContent }) => {
   const { filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   return (
      <Row className="d-flex flex-stack flex-wrap mb-5">
         <Col md={3} xs={12} className="align-items-center position-relative">
            {h.form_text(`Cari ${document.title}`, "search", {
               value: h.parse("search", filter),
               onChange: (e) => dispatch(setFilter({ ...filter, search: e.target.value })),
               onKeyDown: (e) => {
                  if (e.code === "Enter") {
                     dispatch(setFilter({ page: 0, search: e.target.value }));
                     getContent({ page: 0, search: e.target.value, source: "filter" });
                  }
               },
            })}
         </Col>
      </Row>
   );
};
export default Filter;
