import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

let player;
let currentLeftIndex = 1;
let currentRightIndex = 1;

const Context2 = ({ apiUrl }) => {
   const { module, socketServer } = useSelector((e) => e.redux);
   const { listContent, screenCode } = module;
   const videoRef = useRef(null);
   const leftColumn = useRef(null);
   const imageRef = useRef(null);
   const socket = new WebSocket(socketServer);

   // object
   const [leftSlide, setLeftSlide] = useState({});

   // array
   const [videoSlide, setVideoSlide] = useState([]);
   const [imageSlide, setImageSlide] = useState([]);

   // string
   const [textRunning, setTextRunning] = useState("");

   useLayoutEffect(() => {
      socket.onopen = (e) => {
         if (e.target.readyState) {
            const data = {
               screen: {
                  reload: false,
                  status: "online",
                  screenCode,
               },
            };
            socket.send(JSON.stringify(data));
         }
      };
      return () => {};
   }, [screenCode]);

   useLayoutEffect(() => {
      if (h.objLength(leftSlide)) {
         if (h.parse("caption", leftSlide) === "youtube") {
            handlePlayYoutube(leftSlide);
         }
         if (h.parse("caption", leftSlide) === "video") {
            handlePlayVideo(leftSlide);
         }
      }
      return () => {};
   }, [leftSlide]);

   const handlePlayVideo = (data) => {
      const ref = videoRef.current;

      const video = document.createElement("video");
      video.src = `${apiUrl}/video/${h.parse("value", data)}`;
      video.muted = true;
      video.style.height = `${leftColumn.current.offsetHeight - 10}px`;
      video.style.width = `100%`;
      video.play();
      video.addEventListener("play", () => {
         video.muted = false;
      });
      ref.append(video);

      video.addEventListener("ended", () => {
         video.pause();
         video.src = "";
         video.load();
         handlePlayLeftSlide(videoSlide, currentLeftIndex++);
         video.remove();
      });
   };

   const handlePlayLeftSlide = (lists, index) => {
      if (typeof lists[index] === "undefined") {
         currentLeftIndex = 1;
         setLeftSlide(lists[0]);
      } else {
         setLeftSlide(lists[index]);
      }
   };

   const handlePlayYoutube = (data) => {
      if (videoRef.current) {
         player = new YT.Player(videoRef.current, {
            height: "100%",
            width: "100%",
            videoId: h.getYoutubeVideoId(h.parse("value", data)),
            playerVars: {
               mute: 1,
               controls: 1,
               autoPlay: 1,
            },
            events: {
               onReady: onPlayerReady,
               onStateChange: onPlayerStateChange,
            },
         });
      }
   };

   const onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
         player.unMute();
      } else if (event.data === YT.PlayerState.ENDED) {
         player.stopVideo();
         player.destroy();
         player = null;
         handlePlayLeftSlide(videoSlide, currentLeftIndex++);
      }
   };

   const onPlayerReady = () => {
      if (player) {
         player.playVideo();
      }
   };

   useLayoutEffect(() => {
      if (h.arrLength(videoSlide)) setLeftSlide(videoSlide[0]);
      return () => {};
   }, [videoSlide]);

   const createElement = (tagName, attributes = {}) => {
      const element = document.createElement(tagName);
      for (const key in attributes) {
         element.setAttribute(key, attributes[key]);
      }
      return element;
   };

   const appendAndRemoveAfterInterval = (parentElement, childElement, intervalTime) => {
      parentElement.appendChild(childElement);
      const interval = setInterval(() => {
         childElement.remove();
         handlePlayRightColumn(imageSlide, currentRightIndex++);
         clearInterval(interval);
      }, intervalTime);
   };

   const submitPlayRightColumn = (data) => {
      const element = imageRef.current;

      if (h.parse("caption", data) === "pengumuman") {
         const divElement = createElement("div");
         divElement.style.color = `white`;

         const headingElement = document.createElement("h1");
         const headingText = document.createTextNode(h.parse("judul", data));
         headingElement.appendChild(headingText);

         const paragraphElement = document.createElement("div");
         paragraphElement.style.fontSize = `20px`;
         paragraphElement.style.textAlign = "justify";
         paragraphElement.innerHTML = h.parse("value", data);

         divElement.appendChild(headingElement);
         divElement.appendChild(paragraphElement);
         appendAndRemoveAfterInterval(element, divElement, 60 * 1000);
      }

      if (h.parse("caption", data) === "images") {
         const image = createElement("img", {
            src: h.getFile(h.parse("value", data)),
            style: `width: 100%; height: auto; max-height: 100%;`,
         });
         appendAndRemoveAfterInterval(element, image, 60 * 1000);
      }
   };

   const handlePlayRightColumn = (lists, index) => {
      if (typeof lists[index] === "undefined") {
         currentRightIndex = 1;
         submitPlayRightColumn(lists[0]);
      } else {
         submitPlayRightColumn(lists[index]);
      }
   };

   useLayoutEffect(() => {
      if (h.arrLength(imageSlide)) handlePlayRightColumn(imageSlide, 0);
      return () => {};
   }, [imageSlide]);

   useLayoutEffect(() => {
      if (h.arrLength(listContent)) {
         const dataVideo = [];
         const dataImages = [];
         const runningText = [];

         listContent.map((row) => {
            if (h.parse("caption", row) === "video" || h.parse("caption", row) === "youtube") {
               dataVideo.push(row);
            }

            if (h.parse("caption", row) === "images" || h.parse("caption", row) === "pengumuman") {
               dataImages.push(row);
            }

            if (h.parse("caption", row) === "running_text") {
               runningText.push(h.parse("value", row));
            }
         });

         setVideoSlide(dataVideo);
         setImageSlide(dataImages);
         setTextRunning(runningText.join(" | "));
      }
      return () => {};
   }, [listContent]);

   return (
      <Container
         fluid
         style={{
            margin: 0,
            padding: 0,
            overflow: "hidden",
            background: "#039811",
            height: window.innerHeight,
            minHeight: "100vh",
            position: "relative",
         }}>
         <Row className="m-1 p-1">
            <Col md={2} className="text-center">
               <Image src="logo-uin-arraniry-1@2x.png" fluid style={{ width: 100, height: "auto" }} />
            </Col>
            <Col className="text-center text-white align-middle mt-3">
               <h3>UNIVERSITAS ISLAM NEGERI AR-RANIRY BANDA ACEH</h3>
               <h5>"KAMPUS ENERGI KEBANGSAAN, SINERGI MEMBANGUN NEGERI"</h5>
            </Col>
            <Col md={2} className="text-center">
               <Image src="logo-unggul-1@2x.png" fluid style={{ width: 100, height: "auto" }} />
            </Col>
         </Row>
         <Row className="m-2 p-2" style={{ height: `calc(100% - 180px)` }} ref={leftColumn}>
            {h.objLength(leftSlide) && <Col md={h.arrLength(imageSlide) ? 8 : 12} ref={videoRef} />}
            {h.arrLength(imageSlide) && <Col md={h.objLength(leftSlide) ? 4 : 12} ref={imageRef} />}
         </Row>
         {textRunning && (
            <Row className="m-2 p-2" style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 9999 }}>
               <Col className="text-white">
                  <marquee className="text-uppercase text-monospace fw-bold" scrollamount="12">
                     {textRunning}
                  </marquee>
               </Col>
            </Row>
         )}
      </Container>
   );
};
export default Context2;
