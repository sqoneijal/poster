import lozad from "lozad";
import React, { useLayoutEffect } from "react";

const Aside = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <div className="d-flex flex-lg-row-fluid">
         <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
            <img
               className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20 lozad"
               data-src="/bundle/assets/agency.png"
               alt="Login Illustration"
            />
            <img
               className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20 lozad"
               data-src="/bundle/assets/agency-dark.png"
               alt="Login Illustration"
            />
            <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">Fast, Efficient and Productive</h1>
            <div className="text-gray-600 fs-base text-center fw-semibold">
               In this kind of post,{" "}
               <a href="#" className="opacity-75-hover text-primary me-1">
                  the blogger
               </a>
               introduces a person they’ve interviewed <br /> and provides some background information about
               <a href="#" className="opacity-75-hover text-primary me-1">
                  the interviewee
               </a>
               and their <br /> work following this is a transcript of the interview.
            </div>
         </div>
      </div>
   );
};
export default Aside;
