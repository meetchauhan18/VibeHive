import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/src/assets/Images/CarouselsImages/snap.jpg",
  "/src/assets/Images/CarouselsImages/VishwaMeet.jpg",
  "/Images/CarouselsImages/KunalMeet.jpg",
  "/src/assetshttps://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/30155951/pexels-photo-30155951/free-photo-of-serene-winter-landscape-with-snow-covered-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/30374049/pexels-photo-30374049/free-photo-of-man-walking-on-grassy-hill-under-clear-sky.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://images.pexels.com/photos/30387653/pexels-photo-30387653/free-photo-of-stack-of-homemade-chocolate-chip-muffins.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://images.pexels.com/photos/30434304/pexels-photo-30434304/free-photo-of-traditional-brazilian-drummers-playing-wooden-instruments.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://images.pexels.com/photos/30337825/pexels-photo-30337825/free-photo-of-elegant-young-woman-beside-glowing-chandelier-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/30358729/pexels-photo-30358729/free-photo-of-kayaking-at-sunset-on-calm-lake-ohrid.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://images.pexels.com/photos/30320386/pexels-photo-30320386/free-photo-of-vintage-bicycle-leaning-against-old-wall-in-turkiye.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  "https://picsum.photos/id/11/400/200",
  "https://picsum.photos/id/12/400/200",
  "https://picsum.photos/id/13/400/200",
  "https://picsum.photos/id/14/400/200",
  "https://picsum.photos/id/15/400/200",
  "https://picsum.photos/id/16/400/200",
  "https://picsum.photos/id/17/400/200",
  "https://picsum.photos/id/18/400/200",
];

const captions = [
  {
    title: "Welcome to VibeHive",
    description: "Your gateway to a vibrant community of like-minded individuals.",
  },
  {
    title: "Connect with Friends",
    description: "Stay in touch with your friends and family.",
  },
  {
    title: "Share Your Moments",
    description: "Post photos and updates to share your life.",
  },
  {
    title: "Discover New Interests",
    description: "Explore new hobbies and passions.",
  },
  {
    title: "Join Communities",
    description: "Find and join groups that match your interests.",
  },
  {
    title: "Real-time Chat",
    description: "Chat with friends and groups in real-time.",
  },
  {
    title: "Event Planning",
    description: "Organize and join events with ease.",
  },
  {
    title: "Privacy Control",
    description: "You control who sees your posts and profile.",
  },
  {
    title: "Customizable Profiles",
    description: "Personalize your profile to reflect who you are.",
  },
  {
    title: "Stay Updated",
    description: "Get the latest news and updates from your network.",
  },
  {
    title: "Safe and Secure",
    description: "Your data is protected with top-notch security.",
  },
  {
    title: "User-Friendly Interface",
    description: "Easy to use with a clean and intuitive design.",
  },
  {
    title: "24/7 Support",
    description: "We're here to help you anytime, anywhere.",
  },
  {
    title: "Ad-Free Experience",
    description: "Enjoy a seamless experience without interruptions.",
  },
  {
    title: "Innovative Features",
    description: "Experience the latest in social media technology.",
  }
];

export default function Carousel() {
  const [counter, setcounter] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setcounter((prev) => (prev + 1) % images.length);
    }, 10000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-200 h-170 overflow-hidden shadow-lg relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={counter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[counter]})`, backgroundSize: "fill" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
            className="absolute top-10 left-0 w-full p-4 bg-opacity-100 text-white text-left ml-10"
          >
             <h2 className="text-3xl font-bold mb-2">{captions[counter].title}</h2>
             <p className="text-xl font-semibold">{captions[counter].description}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}