import "~/assets/css/datatables.bundle.css";

import React from "react";
import { Container } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard/Context"));
const ContentImages = React.lazy(() => import("./Content/Images/Context"));
const ContentYoutube = React.lazy(() => import("./Content/Youtube/Context"));
const ContentRunningText = React.lazy(() => import("./Content/RunningText/Context"));
const ContentPengumuman = React.lazy(() => import("./Content/Pengumuman/Context"));
const ContentVideo = React.lazy(() => import("./Content/Video/Context"));
const Screen = React.lazy(() => import("./Screen/Context"));
const Playlist = React.lazy(() => import("./Playlist/Context"));

const Context = ({ toolbarFilter, setToolbarFilter }) => {
   const props = { toolbarFilter, setToolbarFilter };

   return (
      <React.Suspense
         fallback={
            <Bars
               visible={true}
               color="#4fa94d"
               radius="9"
               wrapperStyle={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
               }}
               wrapperClass="page-loader flex-column bg-dark bg-opacity-25"
            />
         }>
         <div id="kt_app_content" className="app-content flex-column-fluid">
            <Container fluid id="kt_app_content_container" className="app-container">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="screen" element={<Screen />} />
                  <Route path="playlist" element={<Playlist />} />
                  <Route path="content">
                     <Route path="images" element={<ContentImages {...props} />} />
                     <Route path="youtube" element={<ContentYoutube {...props} />} />
                     <Route path="runningtext" element={<ContentRunningText {...props} />} />
                     <Route path="pengumuman" element={<ContentPengumuman {...props} />} />
                     <Route path="video" element={<ContentVideo {...props} />} />
                  </Route>
               </Routes>
            </Container>
         </div>
      </React.Suspense>
   );
};
export default Context;
