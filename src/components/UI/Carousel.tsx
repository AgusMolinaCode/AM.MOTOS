// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="mySwiper rounded-2xl shadow-md border border-blue-400"
      >
        <SwiperSlide className="flex">
          <div
            style={{
              backgroundImage: "url('/slider4.jpg')",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "multiply",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-formula text-white">
                IMPORTAMOS TU REPUESTO DIRECTO DE USA
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex">
          <div
            style={{
              backgroundImage: "url('/slider7.jpg')",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "multiply",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-formula text-white">
                MARCAR ORIGINALES Y ALTERNATIVAS DE CALIDAD
              </h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex">
          <div
            style={{
              backgroundImage: "url('/slider6.jpg')",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backgroundBlendMode: "multiply",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="p-3 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-formula text-white">
                LOS MEJORES PRECIOS DEL MERCADO
              </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
