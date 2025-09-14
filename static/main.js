// Validación del formulario en tiempo real
document.addEventListener("DOMContentLoaded", function () {
  const dniInput = document.getElementById("dni");
  const telefonoInput = document.getElementById("telefono");

  // Validación DNI - solo números
  dniInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 8);
  });

  // Validación teléfono - solo números
  telefonoInput.addEventListener("input", function (e) {
    e.target.value = e.target.value.replace(/\D/g, "").substring(0, 9);
  });

  // animación input+svg
  const wrappers = document.querySelectorAll(".group");
  wrappers.forEach((wrapper, index) => {
    const input = wrapper.querySelector("input");
    const svg = wrapper.querySelector("svg");

    const delay = `${index * 0.1}s`;

    // Animación para el input
    if (input) {
      input.style.animationDelay = delay;
      input.classList.add("animate-slide-up");
    }

    // Animación para el SVG
    if (svg) {
      svg.style.animationDelay = delay;
      svg.classList.add("animate-slide-up");
    }
  });
});

function handleSubmit(event) {
  // Aquí puedes agregar validaciones adicionales si es necesario
  // El modal se mostrará después del submit exitoso
  setTimeout(() => {
    mostrarMensaje();
  }, 100);
}

function mostrarMensaje() {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Animación de entrada
  setTimeout(() => {
    modalContent.classList.remove("scale-95");
    modalContent.classList.add("scale-100");
  }, 10);
}

function cerrarMensaje() {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  // Animación de salida
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 500);
}

function nuevoRegistro() {
  cerrarMensaje();
  // Limpiar formulario
  setTimeout(() => {
    document.querySelector("form").reset();
    document.getElementById("dni").focus();
  }, 400);
}

// Cerrar modal al hacer clic fuera
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    cerrarMensaje();
  }
});

// Cerrar modal con ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cerrarMensaje();
  }
});
