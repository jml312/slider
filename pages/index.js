import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FaPlay, FaPause, FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const [rotationCount, setRotationCount] = useState(0);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const [playing, setPlaying] = useState(false);

  const disableInterval = 350;

  const handlePrevious = () => {
    setPlaying(false);
    if (!disablePrev) {
      setRotationCount((rotationCount + 4) % 5);
      setDisablePrev(true);
    }
    setTimeout(() => {
      setDisablePrev(false);
    }, disableInterval);
  };

  const handleNext = () => {
    setPlaying(false);
    if (!disableNext) {
      setRotationCount((rotationCount + 1) % 5);
      setDisableNext(true);
    }
    setTimeout(() => {
      setDisableNext(false);
    }, disableInterval);
  };

  const animations = [
    {
      opacity: 0.6,
      zIndex: 10,
      scale: 0.4,
      translateX: "-75%",
      transition: {
        duration: 0.25,
        // duration: 0.35,
        // ease: "easeInOut",
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
    {
      opacity: 0.9,
      zIndex: 20,
      scale: 0.6,
      translateX: "-45%",
      transition: {
        duration: 0.35,
        ease: "easeInOut",
        // duration: 0.45,
        // ease: "linear",
        // type: "spring",
        // bounce: 0.2,
      },
    },
    {
      opacity: 1,
      zIndex: 30,
      scale: 1,
      translateX: "0%",
      transition: {
        duration: 0.25,
        // duration: 0.35,
        // ease: "easeInOut",
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
    {
      opacity: 0.9,
      zIndex: 20,
      scale: 0.6,
      translateX: "45%",
      transition: {
        duration: 0.25,
        // duration: 0.35,
        // ease: "easeInOut",
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
    {
      opacity: 0.6,
      zIndex: 10,
      scale: 0.4,
      translateX: "75%",
      transition: {
        duration: 0.25,
        // duration: 0.35,
        // ease: "easeInOut",
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  ];

  const handleDragEnd = (_, info) => {
    setPlaying(false);
    if (info.offset.x > 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  const data = [
    { title: "Slide 3", slide: 2, backgroundColor: "bg-green-900" },
    { title: "Slide 2", slide: 1, backgroundColor: "bg-yellow-900" },
    { title: "Slide 1", slide: 0, backgroundColor: "bg-pink-900" },
    { title: "Slide 5", slide: 4, backgroundColor: "bg-purple-900" },
    { title: "Slide 4", slide: 3, backgroundColor: "bg-blue-900" },
  ];

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setRotationCount((rotationCount + 1) % 5);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [rotationCount, playing]);

  return (
    <div
      className={
        "flex justify-center items-center bg-gray-900 text-white h-screen w-screen relative"
      }
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={disablePrev}
        onClick={handlePrevious}
        className={"text-5xl absolute left-[15%] top-1/2"}
      >
        <AiOutlineLeft />
      </motion.button>

      <FaMoon id="moon" />
      <FaSun id="sun" />

      {data.map(({ title, backgroundColor, slide }, idx) => {
        const isActive = (rotationCount + idx) % 5 === 2;
        return (
          <motion.div
            key={title}
            animate={animations[(rotationCount + idx) % 5]}
            className={`absolute flex justify-center items-center w-[350px] h-[500px] rounded-lg text-2xl font-bold border border-white ${backgroundColor}`}
            data-slide={slide}
            whileHover={{
              cursor: isActive ? "grab" : "",
              translateY: "-1%",
            }}
            whileDrag={{
              cursor: isActive ? "grabbing" : "",
            }}
            onClick={(e) => setRotationCount(parseInt(e.target.dataset.slide))}
            drag={isActive ? "x" : ""}
            dragConstraints={{ left: 0, right: 0 }}
            dragMomentum={false}
            dragElastic={false}
            onDragEnd={handleDragEnd}
          >
            {title}
          </motion.div>
        );
      })}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={disableNext}
        onClick={handleNext}
        className={"text-5xl absolute right-[15%] top-1/2"}
      >
        <AiOutlineRight />
      </motion.button>

      <div className={"flex gap-4 absolute bottom-[8%]"}>
        {[...Array(animations.length).keys()].map((i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-slide={i}
            onClick={(e) => {
              setPlaying(false);
              setRotationCount(parseInt(e.target.dataset.slide));
            }}
            className={`w-fit h-3 flex justify-center items-center px-2 py-3 rounded-full cursor-pointer text-black ${
              i == rotationCount ? "bg-white" : "bg-gray-600"
            }`}
          >
            Slide {i + 1}
          </motion.span>
        ))}
      </div>

      <div className={"absolute bottom-5 right-5 text-3xl"}>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}
