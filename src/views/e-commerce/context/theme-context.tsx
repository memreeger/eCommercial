import { createContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme: Theme = theme === "light" ? "dark" : "light";
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")

    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}


