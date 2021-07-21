import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
import React, { useEffect, useState } from 'react';
import { TextField, Grid, AppBar, Toolbar, Container, Accordion, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


import { useForm } from 'react-hook-form'

/* API */
import ListAPI from './components/List';
import withListLoading from './components/withListLoading';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const listofskills = ["a", "b", "c"]


function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Controlled');
  const [selectedIndex, setSelectedIndex] = React.useState(1);


  /*List buttons */
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  /*Dark Mode */
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  /*Show/Hide Results */
    const Match = () => {
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const onClick2 = () => setShowResults(false)
    return (
      <div>
        <input type="submit" value="Match" onClick={onClick} />
        <input type="submit" value="Hide" onClick={onClick2} />
        { showResults ? <Results /> : null }
      </div>
      
    )
  }
  const skills = ['Html',
  'Javascript',
  'Algorithms',
  'Api',
  'Apis',
  'Aws',
  'Automation',
  'Pandas','Electrical','Customer experience','Json','Design','Hive','Spark','R','Spacy','Flex', 'Warehouse', 'Flask']
    
  const Results = () => (

    <div id="results" className="search-results">
      {skills.map(((item) => (
        <div key={item}>
          <p>{item}</p>
        </div>
      )))}
    </div>
  )
  
  /* Upload File */
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("file", data.resume[0])
    console.log(data.resume[0])
    const res = await fetch("http://localhost:5000/file-upload", {
      method: "POST",
      body: formData
    }).then(res => res.json())
    alert(JSON.stringify(res))
  }
  
  /* LIST API */
  const ListLoading = withListLoading(ListAPI);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/vineetkachhawaha/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);


  /*Flask API */
  const [currentTime, setCurrentTime] = React.useState(0);
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  },[]);

  /* React-Flask API Fetch */
  class SkillList extends React.Component {
    state = {
        skills: []
    }

    componentDidMount() {
      fetch('127.0.0.1/5000/api/time')
      .then((response) => response.json())
      .then(skillList => {
          this.setState({ skills: skillList });
      });
    }
  }

  class ProductList extends React.Component {
    componentDidMount() {
        // make fetch request
    }
    
    componentWillUnmount() {
        // make fetch request
    }
    
    render() {
        return (
            <ul>
                <li />
            </ul>
        )
    }
}




  return (
    
    <div className="App">
      <ThemeProvider theme={theme}> 
      <AppBar>
        <Toolbar>  
          <Typography variant="h6">
            Intelligent Application
          </Typography>
          </Toolbar>
      </AppBar>
        <CssBaseline/>
        
        <header className="App-header">
          <Grid container justify="center" spacing={8}>
            <Grid item xs = {12} sm={6}>
                
              <TextField
                id="outlined-multiline-static"
                label=""
                style={{ margin: 8, width: '100%' }}
                placeholder="Paste your resume here. No Personal information"
                multiline
                fullWidth
                rows={10}
                maxRows={10}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
              <Match />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register('resume')} type="file" />                 
                  <button>Submit</button>
                </form>
            </Grid>


            <Grid item>
              <p>The current time is: {currentTime}</p>
              <p>CHOOSE YOUR ROLE WISELY</p> 
              <List component="nav" aria-label="main mailbox folders">
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="SWE" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  <ListItemText primary="DS" />
                </ListItem>
              </List>
              <Divider />
              <List component="nav" aria-label="secondary mailbox folder">
                <ListItem
                  button
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="UXD" />
                </ListItem>
                <ListItem
                  button
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemText primary="BSA" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <ListLoading isLoading={appState.loading} repos={appState.repos} />
          <img src={logo} className="App-logo" alt="logo" style={{width: '20%'}}/>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
