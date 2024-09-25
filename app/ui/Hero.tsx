"use client";

import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 1000 },
  });

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/hero-background.jpg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <animated.div
        ref={ref}
        style={animation}
        className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center"
      >
        <h1 className="text-6xl font-bold mb-4">Discover Ray-Ban</h1>
        <p className="text-2xl mb-8">Iconic styles for every personality</p>
        <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors">
          Shop Now
        </button>
      </animated.div>
    </section>
  );
}
