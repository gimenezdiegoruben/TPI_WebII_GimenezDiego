exports.loginForm = (req, res) => {
  res.render('auth/login', {
    title: 'Iniciar sesión'
  });
};

exports.registerForm = (req, res) => {
  res.render('auth/register', {
    title: 'Registrarse'
  });
};

exports.registerSubmit = (req, res) => {
  res.render('auth/register', {
    title: 'Registrarse',
    successMessage: 'Formulario enviado correctamente. (Más adelante se conectará con la base de datos.)'
  });
};
