import {IconButton, Tooltip} from "@mui/material";
import {useSettings} from "../../../hooks/use-settings";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


export const ThemeModeButton = () => {
    const { settings, saveSettings } = useSettings();

    const handleClick = () => {
        settings.theme === 'dark' ? saveSettings({
            ...settings,
            theme: 'light'
        }) : saveSettings({
            ...settings,
            theme: 'dark'
        })
    }

    return (
        <>
            {
                settings.theme === 'light' ? (
                    <Tooltip title="Dark Mode" placement={"top"}>
                        <IconButton color="primary" onClick={handleClick}>
                            <DarkModeIcon />
                        </IconButton >
                    </Tooltip>
                ) : (
                    <Tooltip title="Light Mode" placement={"top"}>
                        <IconButton color="primary" onClick={handleClick}>
                            <LightModeIcon />
                        </IconButton >
                    </Tooltip>
                )
            }
        </>
    )
}
