import { Button, Grid, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action.jsx';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: "",
  password: ""
};

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string()
      .required('Password required.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleOnSubmit = (values) => {
      dispatch(loginUser({ userData: values, navigate }));
    };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit} validationSchema={LoginSchema}>
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
                  error={touched.email && !!errors.email}
                  helperText={<ErrorMessage name="email" />}
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
                  error={touched.password && !!errors.password}
                  helperText={<ErrorMessage name="password" />}
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
