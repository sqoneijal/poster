import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import * as h from "~/Helpers";

let currentIndex = 1;
let player;
let imageInterval;

const Context = ({ apiUrl }) => {
   const { module, socketServer } = useSelector((e) => e.redux);
   const { listContent, screenCode, screen } = module;
   const videoRef = useRef(null);

   const socket = new WebSocket(socketServer);

   // array
   const [prepareDataSlide, setPrepareDataSlide] = useState([]);

   // object
   const [dataSlide, setDataSlide] = useState({});

   useLayoutEffect(() => {
      const root = document.querySelector("#root");
      root.classList.add(screen.screen_animation);

      if (h.objLength(dataSlide)) {
         if (h.parse("caption", dataSlide) === "youtube") {
            handlePlayYoutube(dataSlide);
         }

         if (h.parse("caption", dataSlide) === "video") {
            handlePlayVideo(dataSlide);
         }

         if (h.parse("caption", dataSlide) === "images") {
            imageInterval = setInterval(() => {
               handlePlaySlide(prepareDataSlide, currentIndex++);
            }, 3000);
         }

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

         setTimeout(() => {
            root.classList.remove(screen.screen_animation);
         }, 3000);
      }
      return () => {};
   }, [dataSlide, screenCode, screen]);

   const handlePlayVideo = (data) => {
      const video = videoRef.current;

      video.play();

      video.addEventListener("play", () => {
         video.muted = false;
      });

      video.addEventListener("ended", () => {
         handlePlaySlide(prepareDataSlide, currentIndex++);
         video.pause();
         video.src = "";
         video.load();
      });
   };

   const handlePlayYoutube = (data) => {
      player = new YT.Player("youtube-player", {
         height: "100%",
         width: "100%",
         videoId: h.getYoutubeVideoId(h.parse("value", data)),
         playerVars: {
            mute: 1,
            controls: 0,
            autoPlay: 1,
         },
         events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
         },
      });
   };

   const onPlayerStateChange = (event) => {
      if (event.data == YT.PlayerState.PLAYING) {
         player.unMute();
      } else if (event.data === YT.PlayerState.ENDED) {
         player.stopVideo();
         player.destroy();
         player = null;
         handlePlaySlide(prepareDataSlide, currentIndex++);
      }
   };

   const onPlayerReady = () => {
      if (player) {
         player.playVideo();
      }
   };

   const handlePlaySlide = (lists, index) => {
      if (typeof lists[index] === "undefined") {
         window.location.reload();
      } else {
         setDataSlide(lists[index]);
      }
      clearInterval(imageInterval);
   };

   useLayoutEffect(() => {
      if (h.arrLength(listContent)) {
         const _slide = ["images", "video", "youtube"];

         const slideLists = [];
         listContent.forEach((row) => {
            if (_slide.includes(h.parse("caption", row))) {
               slideLists.push(row);
            }
         });

         if (h.arrLength(slideLists)) {
            setPrepareDataSlide(slideLists);
            setDataSlide(slideLists[0]);
         }
      }
      return () => {};
   }, [listContent]);

   return (
      <Switch condition={h.parse("caption", dataSlide)}>
         <Case value="youtube">
            <div
               id="youtube-player"
               style={{
                  height: window.innerHeight,
                  width: window.innerWidth,
                  transform: `translateX(calc(50vw - 50%)) translateY(calc(50vh - 50%)) rotate(${h.toInt(h.parse("screen_rotation", screen))}deg)`,
               }}
            />
         </Case>
         <Case value="video">
            <video
               ref={videoRef}
               src={`${apiUrl}/video/${h.parse("value", dataSlide)}`}
               muted
               style={{
                  height: window.innerHeight,
                  width: window.innerWidth,
                  transform: `translateX(calc(50vw - 50%)) translateY(calc(50vh - 50%)) rotate(${h.toInt(h.parse("screen_rotation", screen))}deg)`,
               }}
            />
         </Case>
         <Case value="images">
            <img
               src={`${apiUrl}/getfile/images/${h.parse("value", dataSlide)}`}
               alt={h.parse("value", dataSlide)}
               style={{
                  height: window.innerHeight,
                  width: window.innerWidth,
                  transform: `translateX(calc(50vw - 50%)) translateY(calc(50vh - 50%)) rotate(${h.toInt(h.parse("screen_rotation", screen))}deg)`,
               }}
            />
         </Case>
      </Switch>
   );
};
export default Context;
