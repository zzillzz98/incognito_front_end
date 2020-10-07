import React, { useState } from "react";
import { Card, CardContent, Container, MenuItem, Typography, TextField as MUTextField, Button, Box, Stepper, Step, StepLabel, makeStyles, CircularProgress, Paper, Grid } from '@material-ui/core';
import { Form, Formik, Field, FieldArray } from "formik";
import { TextField as TF } from 'formik-material-ui';
import { object, mixed, number, string } from "yup";
import CreateProjectPic from './images/CreateProjectPic.png';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import history from './history';
import { render } from "@testing-library/react";





const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(2),
    },
    card: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#68C2E8",
    },
    typography: {
        marginBottom: theme.spacing(2),    
    }
}));

const visibility = [
    {
        value: "Public",
        label: "Public",
    },
    {
        value: "Private",
        label: "Private",
    },
];

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));



const CreateProject = () => {
    const [visible, setVisible] = React.useState('Public');
    const classes = useStyles();
    const user = useSelector(store => store.user);
    const token = localStorage.getItem("jwt");
    const [collabList, setCollabList] = React.useState([]);


    const handleChange = (event) => {
        setVisible(event.target.value)
    }

    const postProject = (values) => {
        axios
        .post('http://localhost:5000/api/project/create', values, {
            headers: {
              'Authorization': token
            }
        })
        .then((res) => {
            console.log("Project Created");
            history.push(`/${user.id}`);
        }) 
        .catch((err) => {
            console.log(err);
        })
    }

    const FriendList = () => (
        <div>
          <Typography className = {classes.typography} variant = "h6">Add the project's collaborators</Typography>
          <Formik
            initialValues={{ collabList }}
            onSubmit={values =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500)
            }
            render={({ values }) => (
              <Form>
                <FieldArray
                  name="collabList"
                  render={arrayHelpers => (
                    <div>
                      {values.collabList && values.collabList.length > 0 ? (
                        values.collabList.map((friend, index) => (
                          <div key={index}>
                            <Field component={TF} name={`collabList.${index}`} />
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </Button>
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                            >
                              +
                            </Button>
                          </div>
                        ))
                      ) : (
                        <Button type="button" onClick={() => arrayHelpers.push('')}>
                          {/* show this when user has removed all collaborators from the list */}
                          Add a Colloborator
                        </Button>
                      )}
                      {console.log(values)}
                      {setCollabList(values)}
                      
                    </div>
                  )}
                />
              </Form>
            )}
          />
        </div>
      );
    

    return (
        <>
            <Container maxWeidth="lg">
                <Container maxWeidth="lg" >
                    <Grid Container justify="center" alignItems="center">
                        <Box className = {classes.paper}>
                        <Typography variant = "h3">Lets Create a Project</Typography>  
                        </Box>
                    </Grid>
                </Container>

                <Card className={classes.card}>
                    <CardContent>
                        <FormikStepper
                            initialValues={{
                                name: '',
                                description: '',
                                visibility: 'Public',
                                collaborators: [],
                            }} onSubmit={async (values) => {
                                await sleep(3000);
                                console.log(collabList);
                                values.collaborators = Object.assign(values.collaborators, collabList);
                                console.log('values: ', values);
                                
                                postProject(values);
                            }}>

                            <FormikStep label="Project Name">
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="name" component={TF} label="Name Of Project" />
                                </Box>

                                <Box paddingBottom={2}>
                                    <MUTextField
                                        id="visibility"
                                        select
                                        fullWidth
                                        label="Visibility"
                                        value={visible}
                                        onChange={handleChange}
                                        helperText="Please Select whether you want this project to be public or private"
                                    >
                                        {visibility.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </MUTextField>
                                </Box>
                            </FormikStep>

                            <FormikStep label="Project Description"
                                validationSchema={object({
                                    description: string()
                                        .required("A description is Required"),
                                })}>
                                <Box paddingBottom={2}>
                                    <Field fullWidth name="description" component={TF} label="Project Description" />
                                </Box>
                            </FormikStep>


                            <FormikStep label="Project Colloborators">
                                <Box paddingBottom={2}>
                                    {FriendList()}
                                    
                                </Box>
                            </FormikStep>

                        </FormikStepper>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export function FormikStep({ children }) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const classes = useStyles();

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik {...props} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
            } else {
                setStep(s => s + 1);
            }
        }}>
            {({ isSubmitting }) => (


                <Form autoComplete="off">
                    <Stepper activeStep={step} alternativeLabel>
                        {childrenArray.map((child) => (
                            <Step key={child.props.label}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {currentChild}
                    {step > 0 ? <Button className={classes.button} disabled={isSubmitting} variant="outlined" onClick={() => setStep(s => s - 1)}>Back</Button> : null}
                    <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={isSubmitting} variant="outlined" type="submit">{isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}</Button>
                </Form>
            )}
        </Formik>
    )
}


export default CreateProject;