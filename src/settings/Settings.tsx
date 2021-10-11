import SettingsIcon from '@mui/icons-material/Settings';
import {ButtonGroup, IconButton, Theme} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {DarkMode, LightMode, SettingsBrightness} from '@mui/icons-material';
import ThemeSelector, {SelectedTheme} from './ThemeSelector';

interface SettingsProps {
  onChangeTheme: (newTheme: SelectedTheme) => void;
}

export default function Settings(props: SettingsProps) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setState(open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <SettingsIcon></SettingsIcon>
      </IconButton>
      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{width: 'auto'}}
          role="presentation"
        >
          <List>
            Theme
            <ThemeSelector onChangeTheme={props.onChangeTheme}/>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
