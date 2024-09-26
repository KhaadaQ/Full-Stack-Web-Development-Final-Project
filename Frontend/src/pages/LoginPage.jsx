import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useNavigate } from 'react-router-dom'; 
function LoginPage() {
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo inválido').required('Requerido'),
      password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), 
        });

        const data = await response.json();

        if (response.ok && data.token) { 
          localStorage.setItem('token', data.token); 
          console.log('Login exitoso:', data);
          navigate('/dungeons'); 
        } else {
          alert('Login fallido: ' + data.message);
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error en la solicitud. Intenta nuevamente.');
      }
    },
  });

  return (
    <div>
      <h1>Página de Inicio de Sesión</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;
