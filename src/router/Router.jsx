import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Start from '../pages/Start/Start';
import Choose from '../pages/Choose/Choose';
import Name from '../pages/Name/Name';
import Plant from '../pages/Plant/Plant';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

const AnimatedLayout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div style={{ position: 'relative' }}>
        <motion.div
          key={location.key}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: '100%',
            willChange: 'transform, opacity',
          }}
        >
          <Outlet />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AnimatedLayout />,
        children: [
          { path: '/', element: <Start /> },
          { path: '/choose', element: <Choose /> },
          { path: '/name', element: <Name /> },
          { path: '/plant', element: <Plant /> },
        ],
      },
    ],
  },
]);

export default router;
