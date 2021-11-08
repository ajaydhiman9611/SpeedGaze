import { createContext, useState } from "react";

const ThemeContext = createContext();
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {

    const [themeState, setThemeState] = useState(localStorage.getItem("sg-theme") || "darker");

    const setTheme = theme => {
        localStorage.setItem("sg-theme", theme);
        console.log("Called!", theme);
        setThemeState(theme);
    }

    return (
        <Provider
            value={{
                themeState,
                setThemeState: themeInfo => setTheme(themeInfo),
            }}>
            {children}
        </Provider>
    )
}

export { ThemeContext, ThemeProvider }