exports.loginForm = (req, res) => {
  res.render('auth/login', {
    title: 'Iniciar sesión',
    isLoggedIn: false
  });
};

exports.loginSubmit = (req, res) => {
  res.redirect('/?auth=ok');
};

exports.registerForm = (req, res) => {
  res.render('auth/register', {
    title: 'Registrarse',
    isLoggedIn: false
  });
};

exports.registerSubmit = (req, res) => {
  res.render('auth/register', {
    title: 'Registrarse',
    isLoggedIn: false,
    successMessage: 'Formulario enviado correctamente. (Más adelante se conectará con la base de datos.)'
  });
};

exports.logout = (req, res) => {
  res.redirect('/');
};