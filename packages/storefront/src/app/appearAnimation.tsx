import { useEffect, useRef } from "react";

interface AppearAnimationProps {
  children: React.ReactNode;
  animation: string;
}

const AppearAnimation: React.FC<AppearAnimationProps> = ({ children, animation }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animation-play");
        }
      },
      { threshold: 0.2 } // Animation startet, wenn 20% sichtbar sind
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-animation={animation}>
      {children}
    </div>
  );
};

export default AppearAnimation;
