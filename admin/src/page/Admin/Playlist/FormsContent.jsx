import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Images = React.lazy(() => import("./Tabs/Images"));
const Video = React.lazy(() => import("./Tabs/Video"));
const Youtube = React.lazy(() => import("./Tabs/Youtube"));
const RunningText = React.lazy(() => import("./Tabs/RunningText"));
const Pengumuman = React.lazy(() => import("./Tabs/Pengumuman"));

const FormsContent = () => {
   const { module, init, websocket } = useSelector((e) => e.redux);
   const { openFormsContent, detailContent } = module;
   const dispatch = useDispatch();

   const socket = new WebSocket(websocket);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [selectedImages, setSelectedImages] = useState([]);
   const [selectedVideo, setSelectedVideo] = useState([]);
   const [selectedYoutube, setSelectedYoutube] = useState([]);
   const [selectedRunningText, setSelectedRunningText] = useState([]);
   const [selectedPengumuman, setSelectedPengumuman] = useState([]);

   // string
   const [tabActive, setTabActive] = useState(1);

   useLayoutEffect(() => {
      if (openFormsContent && h.objLength(detailContent)) {
         setSelectedImages(detailContent.images);
         setSelectedVideo(detailContent.video);
         setSelectedYoutube(detailContent.youtube);
         setSelectedRunningText(detailContent.running_text);
         setSelectedPengumuman(detailContent.pengumuman);
      }
      return () => {};
   }, [openFormsContent, detailContent]);

   const clearProps = () => {
      setSelectedImages([]);
      setSelectedVideo([]);
      setSelectedYoutube([]);
      setSelectedRunningText([]);
      setSelectedPengumuman([]);
      setTabActive(1);
   };

   const handleClose = () => {
      clearProps();
      dispatch(setModule({ ...module, openFormsContent: false, detailContent: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         id: h.parse("id", detailContent),
         user_modified: h.parse("username", init),
         images: JSON.stringify(h.arrLength(selectedImages) ? selectedImages : []),
         video: JSON.stringify(h.arrLength(selectedVideo) ? selectedVideo : []),
         youtube: JSON.stringify(h.arrLength(selectedYoutube) ? selectedYoutube : []),
         running_text: JSON.stringify(h.arrLength(selectedRunningText) ? selectedRunningText : []),
         pengumuman: JSON.stringify(h.arrLength(selectedPengumuman) ? selectedPengumuman : []),
      };

      setIsSubmit(true);
      const fetch = h.post(`/submitcontent`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;
         clearProps();
         dispatch(setModule({ ...module, openFormsContent: false, detailContent: {} }));
         h.dtReload();

         const screenCode = [];
         detailContent.screen_active.map((row) => {
            screenCode.push(h.parse("kode", row));
         });

         const socketdata = {
            screen: {
               reload: true,
               status: "online",
               screenCode,
            },
         };

         socket.send(JSON.stringify(socketdata));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   const daftarTabs = [
      { value: 1, label: "Images" },
      { value: 2, label: "Video" },
      { value: 3, label: "Youtube" },
      { value: 4, label: "Running Text" },
      { value: 5, label: "Pengumuman" },
   ];

   const props = {
      selectedImages,
      setSelectedImages,
      selectedVideo,
      setSelectedVideo,
      selectedYoutube,
      setSelectedYoutube,
      selectedRunningText,
      setSelectedRunningText,
      selectedPengumuman,
      setSelectedPengumuman,
   };

   return (
      <React.Fragment>
         {openFormsContent && <div className="drawer-overlay" />}
         <div className={`bg-white drawer drawer-start ${openFormsContent ? "drawer-on" : ""}`} style={{ width: window.innerWidth / 2 }}>
            <Card className="rounded-0 w-100">
               <Card.Header className="pe-5">
                  <div className="card-title">
                     <div className="d-flex justify-content-center flex-column me-3">
                        <span className="fs-4 fw-bold text-gray-900 text-hover-primary me-1 lh-1">Daftar Content</span>
                     </div>
                  </div>
                  <div className="card-toolbar">
                     <button className="btn btn-sm btn-icon btn-active-light-primary" onClick={handleClose}>
                        <i className="ki-duotone ki-cross fs-2">
                           <span className="path1" />
                           <span className="path2" />
                        </i>
                     </button>
                  </div>
               </Card.Header>
               <Card.Body className="hover-scroll-overlay-y">
                  <ul className="nav nav-tabs nav-line-tabs mb-5 fs-6">
                     <Each
                        of={daftarTabs}
                        render={(row) => (
                           <li className="nav-item">
                              <a
                                 className={`nav-link ${tabActive === h.parse("value", row) ? "active" : ""}`}
                                 data-bs-toggle="tab"
                                 href="#"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    setTabActive(h.parse("value", row));
                                 }}>
                                 {h.parse("label", row)}
                              </a>
                           </li>
                        )}
                     />
                  </ul>
                  <div className="tab-content">
                     <div className="tab-pane fade show active" role="tabpanel">
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
                           <Switch condition={tabActive}>
                              <Case value={1}>
                                 <Images {...props} />
                              </Case>
                              <Case value={2}>
                                 <Video {...props} />
                              </Case>
                              <Case value={3}>
                                 <Youtube {...props} />
                              </Case>
                              <Case value={4}>
                                 <RunningText {...props} />
                              </Case>
                              <Case value={5}>
                                 <Pengumuman {...props} />
                              </Case>
                           </Switch>
                        </React.Suspense>
                     </div>
                  </div>
               </Card.Body>
               <Card.Footer className="text-end">
                  <ButtonGroup>
                     {h.buttons(`Simpan`, isSubmit, {
                        onClick: isSubmit ? null : submit,
                     })}
                     {h.buttons(`Batal`, false, {
                        variant: "danger",
                        onClick: () => handleClose(),
                     })}
                  </ButtonGroup>
               </Card.Footer>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default FormsContent;
