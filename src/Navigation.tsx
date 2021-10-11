import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Tab, Tabs} from '@mui/material';
import Impact from './impact/impact';

interface TabPanelProps {
  children: React.ReactNode,
  index: number,
  value: number,
};

function TabPanel(props: TabPanelProps) {
  const {children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`navigationpanel-${index}`}
      aria-labelledby={`navigation-${index}`}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `navigation-${index}`,
    'aria-controls': `navigationpanel-${index}`,
  };
}

export default function Navigation() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Impact" {...a11yProps(0)} />
          <Tab label="Match My Morals" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Impact />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Match My Morals
      </TabPanel>
    </Box>
  );
}
