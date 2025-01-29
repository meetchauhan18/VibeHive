import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://picsum.photos/id/1/700/200",
  "https://picsum.photos/id/2/400/200",
  "https://picsum.photos/id/3/400/200",
  "https://picsum.photos/id/4/400/200",
  "https://picsum.photos/id/5/400/200",
  "https://picsum.photos/id/6/400/200",
  "https://picsum.photos/id/7/400/200",
  "https://picsum.photos/id/8/400/200",
  "https://picsum.photos/id/9/400/200",
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

