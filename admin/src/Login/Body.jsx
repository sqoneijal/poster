import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as h from "~/Helpers";

const Body = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   const submit = () => {
      const formData = {};
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/submit`, formData, {}, true);
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

         window.location.reload();
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
         <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
            <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
               <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
                  <Form className="form w-100">
                     <div className="text-center mb-11">
                        <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
                        <div className="text-gray-500 fw-semibold fs-6">Your Social Campaigns</div>
                     </div>
                     {h.form_text(
                        `Username/Email`,
                        `username`,
                        {
                           onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                           value: h.parse(`username`, input),
                           autoFocus: true,
                        },
                        true,
                        errors
                     )}
                     {h.form_password(
                        `Password`,
                        `password`,
                        {
                           onChange: (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value })),
                           defaultValue: h.parse(`password`, input),
                        },
                        true,
                        errors
                     )}
                     <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                        <div />
                        <a href="#" className="link-primary">
                           Forgot Password ?
                        </a>
                     </div>
                     <div className="d-grid mb-10">
                        {h.buttons(`Sign In`, isSubmit, {
                           size: "lg",
                           onClick: isSubmit ? null : submit,
                        })}
                     </div>
                  </Form>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Body;
