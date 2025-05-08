import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2).max(50).required('Name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .required('Password required.')
    .min(8, 'Too short')
    .matches(/[a-zA-Z]/, 'Latin letters only.')
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={() => {}} validationSchema={SignupSchema}>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
        as={TextField}
        name="fullName"
        label="Full Name"
        fullWidth
        variant="outlined"
        error={touched.fullName && !!errors.fullName}
        helperText={touched.fullName && errors.fullName}
      />
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
