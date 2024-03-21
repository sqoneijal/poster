import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const Filter = () => {
   return (
      <Row className="d-flex flex-stack flex-wrap mb-5">
         <Col md={3} xs={12} className="align-items-center position-relative">
            {h.form_text(`Cari ${document.title}`, "search", { onKeyDown: (e) => e.code === "Enter" && h.handleSearchDatatable(e.target.value) })}
         </Col>
      </Row>
   );
};
export default Filter;
