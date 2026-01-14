import { BookHeart, Brain, Compass, Sparkles } from "lucide-react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const benefits = [
  {
    icon: Brain,
    title: "Build Emotional Intelligence",
    description:
      "Learning from life experiences helps you understand emotions, empathy, and make thoughtful decisions in real-world situations.",
  },
  {
    icon: Compass,
    title: "Gain Real-World Wisdom",
    description:
      "Life lessons offer insights no textbook can teach — shaping perspective, resilience, and personal growth over time.",
  },
  {
    icon: BookHeart,
    title: "Learn Through Stories",
    description:
      "Stories from lived experiences make learning relatable, memorable, and deeply impactful across different stages of life.",
  },
  {
    icon: Sparkles,
    title: "Inspire Positive Change",
    description:
      "Reflecting on life lessons encourages self-improvement, purpose-driven action, and meaningful transformation.",
  },
];

const LearningMatters = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-base-100 playfair-display-font">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1681487732859-c2a780022063?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nJTIwYm9va3MlMjB2ZWN0b3IlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D')",
        }}
      />

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/15 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <span className="text-secondary uppercase tracking-widest text-sm font-semibold">
            Life • Growth • Wisdom
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Why Learning From Life <br />
            <span className="text-primary">Truly Matters</span>
          </h2>

          <p className="text-black/50 leading-relaxed text-base">
            Beyond classrooms and textbooks, life itself becomes our most
            powerful teacher — shaping perspective, character, and purpose
            through lived experience.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          speed={900}
          spaceBetween={32}
          slidesPerView={1}  
          breakpoints={{
            768: { slidesPerView: 2 },  
            1280: { slidesPerView: 3 }, 
          }}
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <SwiperSlide key={index}>
                <div
                  className="group relative h-full 
                  bg-[#FAFAF7] 
                  rounded-[28px] 
                  p-8 pt-12 
                  border border-base-200 
                  shadow-soft 
                  transition-all duration-500 
                  hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute -top-7 left-6 z-10">
                    <div
                      className="w-14 h-14 rounded-2xl 
                      bg-primary/20
                      ring-4 ring-[#FAFAF7]
                      flex items-center justify-center 
                      shadow-xl 
                      group-hover:scale-110 transition"
                    >
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                  </div>

                  <div className="mt-10 mb-6 h-[2px] w-12 bg-secondary/60 group-hover:w-20 transition-all duration-500" />

                  <h3 className="text-2xl font-semibold text-secondary mb-4">
                    {item.title}
                  </h3>

                  <p className="text-black/50 leading-relaxed text-base">
                    {item.description}
                  </p>

                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default LearningMatters;
