import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotFound from './notFound';
import { generate } from 'shortid';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    '& .profileImage': {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
  tabs: {
    margin: '0 auto',
  },
  indicator: {
    backgroundColor: '#FFA500',
    height: '10px',
    top: '45px',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  bodyText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('xs')]: {
    name: {
      textAlign: 'center',
    },
  },
  headers: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  profileBase: {
    display: 'flex',
    // color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(4),
    backgroundColor: '#8BB0E6',
  },
  profileContent: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3),
      paddingTop: 0,
    },
  },
  aboutContent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

function a11yProps(index) {
  return {
    id: index,
  };
}

const AboutTab = (props) => {
  const { about, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div id={index} hidden={value !== index} {...other}>
      {value === index && (
        <Container>
          <Grid container spacing={3} className={classes.root}>
            <Box clone order={{ xs: 3, sm: 3 }}>
              <Grid item xs={12}>
                <div className={classes.aboutContent}>
                  <Typography className={classes.headers} variant='h5'>
                    Bio
                  </Typography>

                  {about.bio ? (
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography variant='body1'>{about.bio}</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}

                  <Typography className={classes.headers} variant='h5'>
                    Experience
                  </Typography>

                  {about.experience ? (
                    Object.values(about.experience)
                      .filter((x) => x !== 'null')
                      .map((exp) => {
                        return (
                          <Card key={generate()} className={classes.card}>
                            <CardContent className={classes.cardContent}>
                              <div className='cardTop'>
                                <Typography variant='h6'>
                                  {exp.title}
                                </Typography>
                                <Typography
                                  variant='subtitle2'
                                  color='textSecondary'
                                >
                                  {exp.start_date} to {exp.end_date}
                                </Typography>
                                <Typography variant='body1'>
                                  {exp.description}
                                </Typography>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}

                  <Typography className={classes.headers} variant='h5'>
                    Education
                  </Typography>

                  {about.education ? (
                    Object.values(about.education)
                      .filter((x) => x !== 'null')
                      .map((edu) => {
                        return (
                          <Card key={generate()} className={classes.card}>
                            <CardContent className={classes.cardContent}>
                              <div className='cardTop'>
                                <Typography variant='h6'>
                                  {edu.title}
                                </Typography>
                                <Typography
                                  variant='subtitle2'
                                  color='textSecondary'
                                >
                                  {edu.start_date} to {edu.end_date}
                                </Typography>
                                <Typography variant='body1'>
                                  {edu.description}
                                </Typography>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}

                  <Typography className={classes.headers} variant='h5'>
                    Achievements
                  </Typography>

                  {about.achievements ? (
                    Object.values(about.achievements)
                      .filter((x) => x !== 'null')
                      .map((achv) => {
                        return (
                          <Card key={generate()} className={classes.card}>
                            <CardContent className={classes.cardContent}>
                              <div className='cardTop'>
                                <Typography variant='h6'>
                                  {achv.title}
                                </Typography>
                                <Typography variant='body1'>
                                  {achv.description}
                                </Typography>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <Typography className={classes.bodyText} variant='body1'>
                      This section is empty.
                    </Typography>
                  )}
                </div>
              </Grid>
            </Box>
          </Grid>
        </Container>
      )}
    </div>
  );
};

// const ProjectsTab = (props) => {
//   const { user, value, index, ...other } = props;
//   const classes = useStyles();
//   return (
//     <div id={index} hidden={value !== index} {...other}>
//       {value === index && project ? (
//         <>
//           <Link
//             to={`/${project.owner}/${project.id}`} // need to add owner id
//             style={{ textDecoration: 'none' }}
//           >
//             <Card className={classes.card}>
//               <CardActionArea disableRipple className={classes.cardActionArea}>
//                 <CardContent className={classes.projectCardContent}>
//                   <div className='cardTop'>
//                     <Typography className={classes.typoLink} variant='h6'>
//                       {project.name}
//                     </Typography>
//                     <Typography className={classes.typoLink}>
//                       View project
//                     </Typography>
//                   </div>
//                   <Typography variant='body2' color='textSecondary'>
//                     {project.description}
//                   </Typography>
//                   <div className='date'>
//                     <ScheduleIcon className='icon' fontSize='small' />
//                     <Typography variant='caption' color='textSecondary'>
//                       Created on {project.creationDate}
//                     </Typography>
//                   </div>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Link>
//           <Divider />
//         </>
//       ) : (
//         <Typography className={classes.noResults}>
//           No results were found. Try searching something else.
//         </Typography>
//       )}
//     </div>
//   );
// };

const ViewProfile = (props) => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState(null);
  // const [projects, setProjects] = useState([]);
  const [found, setFound] = useState(true);
  const userId = props.id;

  useEffect(() => {
    axios
      .post('http://localhost:5000/about/viewUser', { userId: userId })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        setFound(false);
      });
  }, [userId]);

  // useEffect(() => {
  //   axios
  //     .post('http://localhost:5000/about/getProjects', { userId: userId })
  //     .then((res) => {
  //       setProjects(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     })
  // }, [userId])

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    <>
      {profile === null ? (
        <>{found ? <Typography>Loading...</Typography> : <NotFound />}</>
      ) : (
        <>
          <Container>
            <Paper className={classes.profileBase}>
              <Grid container>
                <Box clone order={{ xs: 2, sm: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.profileContent}>
                      <Typography className={classes.name} variant='h3'>
                        {profile.name}
                      </Typography>
                      <List>
                        <ListItem>
                          <EmailOutlinedIcon className={classes.icon} />
                          <Typography variant='subtitle1'>
                            {profile.email}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          {profile.phone ? (
                            <>
                              <PhoneOutlinedIcon className={classes.icon} />
                              <Typography variant='subtitle1'>
                                {profile.phone}
                              </Typography>
                            </>
                          ) : (
                            <PhoneOutlinedIcon className={classes.icon} />
                          )}
                        </ListItem>
                        <ListItem>
                          {/* {profile.cv ? (
                                <>
                                  <DescriptionOutlinedIcon
                                className={classes.icon}
                              />
                                  {profile.phone}
                                </>
                              ) : (
                                <>
                                  <<DescriptionOutlinedIcon
                                className={classes.icon}
                              />
                                  <AddButton
                                    add={}
                                    section={'cv'}
                                  />
                                </>
                              )} */}
                          <DescriptionOutlinedIcon className={classes.icon} />
                          <Typography variant='subtitle1'>
                            Resume / CV (WIP)
                          </Typography>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Box>
                <Box clone order={{ xs: 1, sm: 2 }}>
                  <Grid className={classes.avatar} item xs={12} sm={6}>
                    <Avatar
                      className='profileImage'
                      alt={profile.name}
                      src={profile.pic}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Paper>
            <Tabs
              classes={{ indicator: classes.indicator }}
              className={classes.tabs}
              // centered
              onChange={handleChange}
              value={value}
              // variant='fullWidth'
            >
              <Tab label='About' {...a11yProps(0)} />
              <Tab label='Projects' {...a11yProps(1)} />
            </Tabs>
            <Divider className={classes.divider} />
          </Container>

          <AboutTab value={value} index={0} about={profile}></AboutTab>
          {/* {userResults.length > 0 ? (
            userResults.map((user, i) => (
              <PeopleTab
                value={value}
                index={0}
                key={i}
                user={user}
              ></PeopleTab>
            ))
          ) : (
            <PeopleTab value={value} index={0} user={null}></PeopleTab>
          )} */}

          {/* {projectResults.length > 0 ? (
            projectResults.map((project, i) => (
              <ProjectTab
                value={value}
                index={1}
                key={i}
                project={project}
              ></ProjectTab>
            ))
          ) : (
            <ProjectTab value={value} index={1} project={null}></ProjectTab>
          )} */}
        </>
      )}
    </>
  );
};

export default ViewProfile;
