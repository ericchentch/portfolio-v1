import {
  AppBar,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from '@material-ui/core';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import React, { useCallback } from 'react';
import data from '../data.json';
import About from '../src/About';
import Experience from '../src/Experience';
import Landing from '../src/Landing';
import Projects from '../src/Projects';
import Skills from '../src/Skills';
import { darkTheme, lightTheme } from '../src/theme';
const { name, projects } = data;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none',
  },
}));

export async function getStaticProps() {
  // const baseURI = projects.baseURI;
  // const repos = projects.repositories;
  // const reqInit = {
  //   headers: {
  //     Authorization: `token ${process.env.PAT}`,
  //   },
  // };
  // const fullRepoData = await Promise.allSettled(
  //   repos.map(async (name) => {
  //     const repo = await fetch(baseURI + name, reqInit).then((res) =>
  //       res.json(),
  //     );
  //     const langs = await fetch(baseURI + name + '/languages', reqInit).then(
  //       (res) => res.json(),
  //     );
  //     return {
  //       ...repo,
  //       languages: Object.getOwnPropertyNames(langs),
  //     };
  //   }),
  // );

  const result = [
    {
      value: {
        html_url: 'https://scmconnext.com/',
        name: 'SCM Connect',
        description: 'Ecommerce. Connect retailers and shop',
        languages: ['TypeScript,Next, Mui, Tailwind'],
        image: 'scm.png',
      },
    },
    {
      value: {
        html_url: 'https://zporter.co/',
        name: 'Zporter',
        description: 'Collect, grow and share your football skills',
        languages: ['TypeScript, React, Mui, Tailwind'],
        image: 'zporter.png',
      },
    },
  ];

  return {
    props: {
      projects: result,
    },
    revalidate: 60,
  };
}

export default function Index({ projects, setTheme }) {
  const classes = useStyles();

  const trigger = useScrollTrigger({ disableHysteresis: true });

  const theme = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme((theme) =>
      theme.palette.type === 'dark' ? lightTheme : darkTheme,
    );
  }, [setTheme]);

  return (
    <div className={classes.root}>
      <AppBar
        color={!trigger ? 'transparent' : 'inherit'}
        className={classes.appBar}
        position='fixed'
      >
        <Toolbar>
          <Typography variant='h6' className={classes.root}>
            {name}
          </Typography>
          <IconButton edge='end' color='inherit' onClick={toggleTheme}>
            {theme.palette.type === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
      <Container>
        <Landing />
        <Skills />
        <Projects data={projects} />
        <Experience />
        <About />
      </Container>
    </div>
  );
}
