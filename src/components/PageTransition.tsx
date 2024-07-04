import { motion } from 'framer-motion';

const pageVariantsFadeLeftToRight = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageVariantsFade = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

const pageVariantsSlide = {
  initial: { opacity: 0, y: "100vh" },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "-100vh" }
};

const pageVariantsZoom = {
  initial: { opacity: 0, scale: 0.8 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.2 }
};

const pageVariantsRotate = {
  initial: { opacity: 0, rotate: -180 },
  in: { opacity: 1, rotate: 0 },
  out: { opacity: 0, rotate: 180 }
};

const pageTransitionSmoothDynamic = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const pageTransitionBouncy = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

const pageTransitionFade = {
  type: "tween",
  ease: "easeInOut",
  duration: 1
};

const pageTransitionSlide = {
  type: "tween",
  ease: "easeInOut",
  duration: 1
};

const pageTransitionElastic = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

const pageTransitionEase = {
  type: "tween",
  // custom cubic bezier curve, giving control of the animation's acceleartion and deceleration
  ease: [0.99, 0.02, -0.02, -0.99], 
  duration: 0.8
}

const PageTransitionDefault = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariantsFadeLeftToRight}
    transition={pageTransitionSmoothDynamic}
  >
    {children}
  </motion.div>
);


/* in the content section of the app */
/*
import PageTransition from './PageTransitionDefault';

function App() {
  return (
    <PageTransitionDefault>
      <YourComponent />
    </PageTransitionDefault>
  );
}

export default App;
*/