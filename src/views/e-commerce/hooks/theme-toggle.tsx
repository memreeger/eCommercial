import { Sun, Moon } from "lucide-react";
import { useTheme } from "./useTheme";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
        >
            {theme === "dark" ? (
                <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
                <Moon className="w-6 h-6 text-gray-400" />
            )}
        </button>
    );
};

export default ThemeToggle;
