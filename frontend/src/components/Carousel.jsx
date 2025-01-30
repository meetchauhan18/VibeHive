import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "src/assets/Images/CarouselsImages/KunalMeet.jpg",
  "https://img.freepik.com/premium-photo/authentic-scenes-plus-size-males-playing-basketball_23-2150961227.jpg",
  "https://img.freepik.com/free-photo/male-swimmer-swimming-butterfly-stroke_171337-7613.jpg?t=st=1738215566~exp=1738219166~hmac=0f71208c6aeb21506cf7f8e579456bce531ebdbac94b3caecc9d06dc8fa9a3e9&w=1480",
  "https://img.freepik.com/free-photo/image-man-with-longboard-going-road_158595-1956.jpg?ga=GA1.1.157565952.1712560775&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/young-blonde-female-paddleboard-sea_273609-15043.jpg?ga=GA1.1.157565952.1712560775&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/surfer-blue-wave_72229-1353.jpg?ga=GA1.1.157565952.1712560775&semt=ais_hybrid",
  "https://img.freepik.com/free-photo/modern-sport-composition-with-ping-pong-elements_23-2148000289.jpg?ga=GA1.1.157565952.1712560775&semt=ais_hybrid",
  "https://img.freepik.com/premium-photo/woman-standing-by-potted-plants_1048944-16402036.jpg",
  "https://img.freepik.com/premium-photo/woman-decorating-her-home-with-orchids_23-2150960657.jpg",
  "https://img.freepik.com/free-photo/long-shot-woman-sportswear-enjoying-sunset-with-copy-space_23-2148698962.jpg?ga=GA1.1.157565952.1712560775&semt=ais_hybrid",
  "https://picsum.photos/id/10/400/200",
  "https://picsum.photos/id/11/400/200",
  "https://picsum.photos/id/12/400/200",
  "https://picsum.photos/id/13/400/200",
  "https://picsum.photos/id/14/400/200",
  "https://picsum.photos/id/15/400/200",
  "https://picsum.photos/id/16/400/200",
  "https://picsum.photos/id/17/400/200",
  "https://picsum.photos/id/18/400/200",
];

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-200 h-170 overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0,  }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        ></motion.div>
      </AnimatePresence>
      
    </div>
  );
}

