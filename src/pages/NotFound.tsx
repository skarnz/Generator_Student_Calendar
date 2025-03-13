
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="pattern-bg flex min-h-screen flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <h2 className="mb-8 text-2xl font-medium">Page Not Found</h2>
        <p className="mb-8 text-generator-gold">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-generator-gold px-6 py-3 text-base font-medium text-generator-darkGreen transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
