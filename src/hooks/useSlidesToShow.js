import { useEffect, useState } from "react";

// react-slick 0.31's `responsive` option only reacts to resizes, not the
// initial width, so phones would load with 3 cramped slides. Pick the count
// from the viewport ourselves instead: 1 on phones, 2 on tablets, else `max`.
const getSlides = (max) => {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return Math.min(2, max);
  return max;
};

const useSlidesToShow = (max = 3) => {
  const [slides, setSlides] = useState(() => getSlides(max));

  useEffect(() => {
    const onResize = () => setSlides(getSlides(max));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [max]);

  return slides;
};

export default useSlidesToShow;
