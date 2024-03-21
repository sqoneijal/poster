import React from "react";
import { Col, Row } from "react-bootstrap";
import * as h from "~/Helpers";

const Filter = ({ filter, setFilter, getData }) => {
   return (
      <Row className="d-flex flex-stack flex-wrap mb-5">
         <Col md={12} xs={12} className="align-items-center position-relative">
            {h.form_text(`Cari`, "search", {
               value: h.parse("search", filter),
               onChange: (e) => setFilter({ ...filter, search: e.target.value }),
               onKeyDown: (e) => e.code === "Enter" && getData({ ...filter, page: 0, search: e.target.value, source: "filter" }),
            })}
         </Col>
      </Row>
   );
};
export default Filter;
