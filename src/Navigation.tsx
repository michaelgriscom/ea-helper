import * as React from "react";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Grid, Tab, Tabs, Toolbar } from "@mui/material";
import Impact from "./impact/impact";
import ThemeSelector, {SelectedTheme} from "./settings/ThemeSelector";
import {Link, withRouter} from "react-router-dom";

const logo = require("./logo.svg");

export interface NavBarProps {
  onChangeTheme: (newTheme: SelectedTheme) => void;
}

function NavBar(props: NavBarProps) {
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
                <Link to="/">
                  <img width={20} src={logo} alt="" />
                  <span>Giving Toolbox</span>
                </Link>
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Tabs value={value} onChange={handleChange} aria-label="tabs">
                <Tab
                  label="My Impact"
                  component={Link}
                  to={{
                    pathname: "impact",
                  }}
                />
                <Tab
                  label="Donations"
                  component={Link}
                  to={{
                    pathname: "donations",
                  }}
                />
              </Tabs>
            </Grid>
          </Grid>
          <ThemeSelector onChangeTheme={onChangeTheme} />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default NavBar;
