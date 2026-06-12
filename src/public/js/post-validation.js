document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');

  if (!form) return;

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const imageInput = document.getElementById('image');
  const tagsInput = document.getElementById('tags');
  const successMessage = document.getElementById('post-success-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const image = imageInput.value.trim();
    const tags = tagsInput.value.trim();

    let isValid = true;

    if (title.length === 0) {
      showError('title', 'El título es obligatorio.');
      isValid = false;
    } else if (title.length < 5 || title.length > 60) {
      showError('title', 'El título debe tener entre 5 y 60 caracteres.');
      isValid = false;
    }

    if (description.length === 0) {
      showError('description', 'La descripción es obligatoria.');
      isValid = false;
    } else if (description.length < 10 || description.length > 300) {
      showError('description', 'La descripción debe tener entre 10 y 300 caracteres.');
      isValid = false;
    }

    if (image.length === 0) {
      showError('image', 'Debes ingresar una imagen.');
      isValid = false;
    }

    if (tags.length === 0) {
      showError('tags', 'Debes ingresar al menos una etiqueta.');
      isValid = false;
    }

    if (isValid) {
      form.submit();
    }
  });

   //Cuando el usuario empieza a corregir, se borra el error del campo, y el mensaje de exito si existe
  [titleInput, descriptionInput, imageInput, tagsInput].forEach((field) => {
    field.addEventListener('input', () => {
      field.classList.remove('input-error');

      const errorElement = document.getElementById(`error-${field.id}`);
      if (errorElement) {
        errorElement.textContent = '';
      }

      if (successMessage) {
        successMessage.innerHTML = '';
      }
    });
  });

  function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const field = document.getElementById(fieldId);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (field) {
      field.classList.add('input-error');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach((element) => {
      element.textContent = '';
    });

    document.querySelectorAll('.input-error').forEach((field) => {
      field.classList.remove('input-error');
    });

    if (successMessage) {
      successMessage.innerHTML = '';
    }
  }
});