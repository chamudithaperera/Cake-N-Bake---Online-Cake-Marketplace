import { Button, Grid, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const handleOnSubmit = (values) => {
    console.log("Login attempt:", values);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} className='flex justify-center text-2xl font-semibold'>
                Login
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary'>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
