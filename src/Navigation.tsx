import * as React from "react";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Grid, Link, Tab, Tabs, Toolbar } from "@mui/material";
import Impact from "./impact/impact";
import ThemeSelector, {SelectedTheme} from "./settings/ThemeSelector";

const logo = require("./logo.svg");

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`navigationpanel-${index}`}
      aria-labelledby={`navigation-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `navigation-${index}`,
    "aria-controls": `navigationpanel-${index}`,
  };
}
interface NavBarProps {
  onChangeTheme: (newTheme: SelectedTheme) => void;
}

export default function NavBar(props: NavBarProps) {
  const { onChangeTheme } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <AppBar color="default">
        <Toolbar>
          <Grid container alignItems="baseline">
            <Grid item xs={12}>
              <Typography variant="h6" color="inherit" noWrap>
                <img width={20} src={logo} alt="" />
                <span>Giving Toolbox</span>
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab label="My Impact" {...a11yProps(0)} />
                <Tab label="Charity Matcher" {...a11yProps(1)} />
              </Tabs>
            </Grid>
          </Grid>
          <ThemeSelector onChangeTheme={onChangeTheme} />
        </Toolbar>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Impact />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Charity Matcher
      </TabPanel>
    </Grid>
  );
}
