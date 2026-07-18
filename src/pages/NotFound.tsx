// src/pages/NotFound.tsx
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-8xl font-bold text-white/20 mb-4">404</div>
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-xl text-white/80 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)} // go back
            className="border border-white/30 text-white px-4 py-2 rounded hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4 inline" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")} // go home
            className="bg-secondary hover:bg-secondary-light text-secondary-foreground px-4 py-2 rounded"
          >
            <Home className="mr-2 h-4 w-4 inline" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
