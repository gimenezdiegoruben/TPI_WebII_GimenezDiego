document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const genderInput = document.getElementById("gender");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsInput = document.getElementById("terms");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const gender = genderInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsInput.checked;

    let isValid = true;

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length === 0) {
      showError("name", "El nombre de usuario no puede estar vacío.");
      isValid = false;
    } else if (!nameRegex.test(name)) {
      showError("name", "El nombre solo debe contener letras y espacios.");
      isValid = false;
    } else if (name.length < 3 || name.length > 30) {
      showError(
        "name",
        "El nombre de usuario debe tener entre 3 y 30 caracteres.",
      );
      isValid = false;
    }

    if (email.length === 0) {
      showError("email", "El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "El formato del correo electrónico no es válido.");
      isValid = false;
    }

    if (!gender) {
      showError("gender", "Debes seleccionar un género.");
      isValid = false;
    }

    if (password.length === 0) {
      showError("password", "La contraseña no puede estar vacía.");
      isValid = false;
    } else if (password.length < 8) {
      showError("password", "La contraseña debe tener al menos 8 caracteres.");
      isValid = false;
    }

    if (confirmPassword.length === 0) {
      showError("confirmPassword", "Debes confirmar la contraseña.");
      isValid = false;
    } else if (confirmPassword !== password) {
      showError("confirmPassword", "Las contraseñas no coinciden.");
      isValid = false;
    }

    if (!termsAccepted) {
      showError("terms", "Debes aceptar los términos y condiciones.");
      isValid = false;
    }

    if (isValid) {
      successMessage.innerHTML = `
    <div class="success-box">
          Usuario <strong>${name}</strong> registrado correctamente con el correo <strong>${email}</strong>.
          <p>Nota: Ya puedes iniciar sesión con tus credenciales. (Más tarde se conectará con la base de datos para almacenar esta información.)</p>
        </div>
      `;
      form.reset();
    }
  });

  function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const field = document.getElementById(fieldId);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (field) {
      field.classList.add("input-error");
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((element) => {
      element.textContent = "";
    });

    document.querySelectorAll(".input-error").forEach((field) => {
      field.classList.remove("input-error");
    });
  }
});
