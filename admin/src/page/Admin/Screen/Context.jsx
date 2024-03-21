import React, { useLayoutEffect } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { buttonConfig } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(
         buttonConfig({
            label: `Tambah ${document.title}`,
            type: "add",
            loading: "false",
         })
      );

      return () => {};
   }, []);

   const daftarRotasi = [
      { value: "-", label: "0 Derajat" },
      { value: "90", label: "90 Derajat" },
      { value: "180", label: "180 Derajat" },
      { value: "270", label: "270 Derajat" },
   ];

   const daftarAnimasi = [
      { value: "animate__bounce", label: "Bounce" },
      { value: "animate__flash", label: "Flash" },
      { value: "animate__pulse", label: "Pulse" },
      { value: "animate__rubberBand", label: "Rubber Band" },
      { value: "animate__shakeX", label: "Shake X" },
      { value: "animate__shakeY", label: "Shake Y" },
      { value: "animate__headShake", label: "Head Shake" },
      { value: "animate__swing", label: "Swing" },
      { value: "animate__tada", label: "Tada" },
      { value: "animate__wobble", label: "Wobble" },
      { value: "animate__jello", label: "Jello" },
      { value: "animate__heartBeat", label: "Heart Beat" },
      { value: "animate__backInDown", label: "Back In Down" },
      { value: "animate__backInLeft", label: "Back In Left" },
      { value: "animate__backInRight", label: "Back In Right" },
      { value: "animate__backInUp", label: "Back In Up" },
      { value: "animate__bounceIn", label: "Bounce In" },
      { value: "animate__bounceInDown", label: "Bounce In Down" },
      { value: "animate__bounceInLeft", label: "Bounce In Left" },
      { value: "animate__bounceInRight", label: "Bounce In Right" },
      { value: "animate__bounceInUp", label: "Bounce In Up" },
      { value: "animate__flip", label: "Flip" },
      { value: "animate__flipInX", label: "Flip X" },
      { value: "animate__flipInY", label: "Flip Y" },
      { value: "animate__lightSpeedInRight", label: "Light Speed In Right" },
      { value: "animate__lightSpeedInLeft", label: "Light Speed In Left" },
      { value: "animate__rotateIn", label: "Rotate In" },
      { value: "animate__rotateInDownLeft", label: "Rotate In Down Left" },
      { value: "animate__rotateInDownRight", label: "Rotate In Down Right" },
      { value: "animate__rotateInUpLeft", label: "Rotate In Up Left" },
      { value: "animate__rotateInUpRight", label: "Rotate In Up Right" },
      { value: "animate__zoomIn", label: "Zoom In" },
      { value: "animate__zoomInDown", label: "Zoom In Down" },
      { value: "animate__zoomInLeft", label: "Zoom In Left" },
      { value: "animate__zoomInRight", label: "Zoom In Right" },
      { value: "animate__zoomInUp", label: "Zoom In Up" },
   ];

   const props = { daftarRotasi, daftarAnimasi };

   return (
      <Card className="shadow-sm card-bordered">
         <Card.Body>
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
               <Lists {...props} />
               <Forms {...props} />
            </React.Suspense>
         </Card.Body>
      </Card>
   );
};
export default Context;
