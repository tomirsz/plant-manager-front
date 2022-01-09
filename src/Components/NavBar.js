import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Plants from './Plants';
import Calendar from "./Calendar";
import History from "./History";
import Button from '@material-ui/core/Button';
import AuthService from "../Services/AuthService";



const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  logoutBtn: {
    position: "absolute",
    right: "30px",
    top: "15px"
  }
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const reloadWindow = () => {
  AuthService.logout();
  window.location.reload(false);
}

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Rośliny" {...a11yProps(0)}/>
        <Tab label="Kalendarz" {...a11yProps(1)}/>
        <Tab label="Historia" {...a11yProps(2)}/>
      </Tabs>
      <Button className={classes.logoutBtn} onClick={reloadWindow} color="inherit">Wyloguj</Button>
    </Paper>
    <TabPanel value={value} index={0}>
        <Plants />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Calendar />
      </TabPanel>
      <TabPanel value={value} index={2}>
       <History />
      </TabPanel>
      </div>
  );
}