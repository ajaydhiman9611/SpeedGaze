import { createContext, useState } from "react";

const ThemeContext = createContext();
const { Provider } = ThemeContext;

const ThemeProvider = ({ children }) => {

    const [themeState, setThemeState] = useState("darker");

    const setTheme = theme => {
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