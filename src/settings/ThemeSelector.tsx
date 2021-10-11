import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {LightMode, SettingsBrightness, DarkMode} from '@mui/icons-material';
import {ButtonGroup, createTheme, IconButton, Theme} from "@mui/material";

export type SelectedTheme = 'light' | 'dark' | 'system' | null;

interface ThemeSelectorProps {
  onChangeTheme: (newTheme: SelectedTheme) => void;
}

export default function ThemeSelector(props: ThemeSelectorProps) {
  const [theme, setTheme] = React.useState('system');
  const {onChangeTheme} = props;

  const handleTheme = (event: any, newTheme: SelectedTheme) => {
    if (newTheme === null) {
      return;
    }

    setTheme(newTheme);
    onChangeTheme(newTheme)
  };

  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      onChange={handleTheme}
      aria-label="theme"
    >
      <ToggleButton value="light" aria-label="light">
        <React.Fragment>
          Light
                  <LightMode />
        </React.Fragment>
      </ToggleButton>
      <ToggleButton value="system" aria-label="system">
        <React.Fragment>
          System
                  <SettingsBrightness />
        </React.Fragment>
      </ToggleButton>
      <ToggleButton value="dark" aria-label="dark">
        <React.Fragment>
          Dark
                  <DarkMode />
        </React.Fragment>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
