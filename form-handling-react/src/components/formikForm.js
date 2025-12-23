import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Too short').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function FormikForm() {
  return (
    <div>
      <h2>Registration (Formik)</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log('Submitted values:', values);
            alert('Registration successful:\n' + JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" placeholder="Your name" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" placeholder="you@example.com" />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
