import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field as={TextField} name="fullName" label="Full Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Field as={TextField} name="password" label="Password" fullWidth variant="outlined" type="password" />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
