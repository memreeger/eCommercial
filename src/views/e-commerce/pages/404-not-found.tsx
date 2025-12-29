import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4 sm:px-6">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 animate-pulse text-red-500">404</h1>
            <p className="text-lg sm:text-xl mb-6 text-center">
                Oops! The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="bg-blue-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
