import React from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaRegLightbulb, FaHeart, FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const dailyReflectionsData = [
  {
    title: "Patience is a Superpower",
    desc: "Sometimes, the best growth happens in stillness and waiting.",
    color: "bg-primary/20",
    icon: <FaRegSmileBeam className="text-4xl mb-4" />,
    image: "https://i.ibb.co/JjYLXKgB/p.jpg",
  },
  {
    title: "Embrace Failure",
    desc: "Every setback is a setup for a stronger comeback.",
    color: "bg-secondary/30",
    icon: <FaRegLightbulb className="text-4xl mb-4" />,
    image: "https://i.ibb.co/WpDh99DT/failure.webp",
  },
  {
    title: "Kindness Matters",
    desc: "Small acts of kindness ripple out in ways you’ll never know.",
    color: "bg-primary/40",
    icon: <FaHeart className="text-4xl mb-4" />,
    image: "https://i.ibb.co/LDts64rC/kind3.jpg",
  },
  {
    title: "Stay Curious",
    desc: "Ask questions, explore often, and never stop learning about life.",
    color: "bg-secondary/50",
    icon: <FaSearch className="text-4xl mb-4" />,
    image: "https://i.ibb.co/3yrTvfQL/stay.jpg",
  },
];

const DailyReflections = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto mb-24"
    >
      <h2 className="text-3xl font-bold text-center mb-12">Daily Reflections</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        style={{ paddingBottom: "1rem" }}
      >
        {dailyReflectionsData.map(({ title, desc, color, icon, image }, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className={`rounded-xl p-6 shadow-lg text-white cursor-pointer hover:scale-105 transition-transform duration-300 ${color} h-full flex flex-col`}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
              <img
                src={image}
                alt={title}
                className="w-full h-32 object-cover rounded-md mb-4 border-2 border-white/50 flex-shrink-0"
                loading="lazy"
              />
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-sm leading-relaxed flex-grow">{desc}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  );
};

export default DailyReflections;
