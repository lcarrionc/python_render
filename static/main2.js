// =====================================================
// administrar.html
// =====================================================

// Variables globales
let dniAEliminar = null;

// Función para confirmar eliminación
function confirmarEliminacion(dni, nombre) {
  dniAEliminar = dni;
  document.getElementById("personName").textContent = nombre;
  document.getElementById("personDni").textContent = dni;
  document.getElementById("deleteForm").action = `/eliminar/${dni}`;

  mostrarModal("confirmModal");
}

// Función para cerrar confirmación
function cerrarConfirmacion() {
  ocultarModal("confirmModal");
  dniAEliminar = null;
}

// Función para cerrar modal de éxito
function cerrarExito() {
  ocultarModal("successModal");
  // Recargar la página para actualizar la tabla
  window.location.reload();
}

// Función genérica para mostrar modal
function mostrarModal(modalId) {
  const modal = document.getElementById(modalId);
  const modalContent =
    modal.querySelector('[id$="-content"]') ||
    modal.querySelector(".transform");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Animación de entrada
  setTimeout(() => {
    modalContent.classList.remove("scale-95");
    modalContent.classList.add("scale-100");
  }, 10);
}

// Función genérica para ocultar modal
function ocultarModal(modalId) {
  const modal = document.getElementById(modalId);
  const modalContent =
    modal.querySelector('[id$="-content"]') ||
    modal.querySelector(".transform");

  // Animación de salida
  modalContent.classList.remove("scale-100");
  modalContent.classList.add("scale-95");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

// Cerrar modales al hacer clic fuera
document.addEventListener("click", function (e) {
  if (e.target.id === "confirmModal") {
    cerrarConfirmacion();
  } else if (e.target.id === "successModal") {
    cerrarExito();
  }
});

// Cerrar modales con ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!document.getElementById("confirmModal").classList.contains("hidden")) {
      cerrarConfirmacion();
    } else if (
      !document.getElementById("successModal").classList.contains("hidden")
    ) {
      cerrarExito();
    }
  }
});

// Interceptar el envío del formulario de eliminación
document.getElementById("deleteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  // Realizar la eliminación usando fetch
  fetch(this.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Cerrar modal de confirmación
        cerrarConfirmacion();

        // Mostrar modal de éxito
        setTimeout(() => {
          mostrarModal("successModal");
        }, 400);

        // Remover la fila de la tabla con animación
        const fila = document.querySelector(`tr[data-dni="${dniAEliminar}"]`);
        if (fila) {
          fila.style.transition = "all 0.3s ease-out";
          fila.style.opacity = "0";
          fila.style.transform = "translateX(-100%)";

          setTimeout(() => {
            fila.remove();
            // Actualizar contador
            actualizarContadores();
          }, 300);
        }
      } else {
        alert("Error al eliminar el registro. Por favor, inténtalo de nuevo.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error de conexión. Por favor, inténtalo de nuevo.");
    });
});

// Función para actualizar contadores
function actualizarContadores() {
  const totalRegistros = document.querySelectorAll("tbody tr").length;
  const contadores = document.querySelectorAll(
    ".text-2xl.font-bold.text-white"
  );

  contadores.forEach((contador) => {
    if (contador.textContent !== "PostgreSQL") {
      contador.textContent = totalRegistros;
    }
  });

  // Si no hay registros, mostrar mensaje
  if (totalRegistros === 0) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center py-12">
                            <div class="text-center">
                                <svg class="w-24 h-24 mx-auto text-gray-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <h3 class="text-xl font-medium text-gray-300 mb-2">No hay registros</h3>
                                <p class="text-gray-400 mb-6">Todos los registros han sido eliminados.</p>
                                <a href="/" class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg transition-all duration-300">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                                    </svg>
                                    Crear Nuevo Registro
                                </a>
                            </div>
                        </td>
                    </tr>
                `;
  }
}

// Efectos de hover mejorados para las filas
document.addEventListener("DOMContentLoaded", function () {
  const filas = document.querySelectorAll("tbody tr");
  filas.forEach((fila, index) => {
    // Animación de entrada escalonada
    fila.style.opacity = "0";
    fila.style.transform = "translateY(20px)";

    setTimeout(() => {
      fila.style.transition = "all 0.3s ease-out";
      fila.style.opacity = "1";
      fila.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Función para búsqueda en tiempo real (opcional)
function buscarRegistros() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const filtro = input.value.toLowerCase();
  const filas = document.querySelectorAll("tbody tr");

  filas.forEach((fila) => {
    const texto = fila.textContent.toLowerCase();
    if (texto.includes(filtro)) {
      fila.style.display = "";
    } else {
      fila.style.display = "none";
    }
  });
}

// Mensaje de éxito si viene de una eliminación exitosa
window.addEventListener("load", function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("deleted") === "true") {
    setTimeout(() => {
      mostrarModal("successModal");
    }, 500);
  }
});
