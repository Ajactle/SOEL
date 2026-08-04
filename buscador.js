// Este código vivirá solo en buscador.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Nuestra Base de Datos centralizada
    const baseDeDatos = [
        { 
            titulo: "Soluciones MRO", 
            enlace: "soluciones.html", 
            palabrasClave: ["mro", "soluciones", "mantenimiento", "industria", "proveedor", "herramientas"] 
        },
        { 
            titulo: "Contacto y Ubicación", 
            enlace: "contacto.html", 
            palabrasClave: ["contacto", "telefono", "correo", "ubicacion", "mapa", "mensaje", "orizaba", "cordoba", "cotizar", "cotizacion"] 
        },
        { 
            titulo: "Importaciones", 
            enlace: "Importaciones.html", 
            palabrasClave: ["importaciones", "extranjero", "marcas internacionales", "aduanas", "traer"] 
        },
        { 
            titulo: "Sobre Nosotros", 
            enlace: "Nosotros.html", 
            palabrasClave: ["nosotros", "quienes somos", "empresa", "historia"] 
        },
        { 
            titulo: "¿Cómo lo hacemos?", 
            enlace: "Como_lo_hacemos.html", 
            palabrasClave: ["proceso", "metodo", "logistica", "como lo hacemos"] 
        }
    ];

    // 2. Conectamos con el HTML
    const inputBuscador = document.getElementById('buscadorWeb');
    const cajaResultados = document.getElementById('resultadosBusqueda');
    const btnBuscar = document.getElementById('btnBuscar');

    // Seguridad: Si en alguna página no está el buscador, no hacemos nada para evitar errores
    if (!inputBuscador || !cajaResultados) return;

    // 3. Función principal de búsqueda
    function ejecutarBusqueda() {
        const textoEscrito = inputBuscador.value.toLowerCase().trim();
        cajaResultados.innerHTML = ''; 
        
        if (textoEscrito.length < 2) {
            cajaResultados.classList.add('hidden');
            return;
        }

        const resultados = baseDeDatos.filter(item => 
            item.titulo.toLowerCase().includes(textoEscrito) || 
            item.palabrasClave.some(palabra => palabra.includes(textoEscrito))
        );

        if (resultados.length > 0) {
            resultados.forEach(match => {
                const enlace = document.createElement('a');
                enlace.href = match.enlace; 
                enlace.className = "block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-[#2e7d32] border-b border-gray-50 last:border-none transition-colors cursor-pointer";
                enlace.innerHTML = `<strong>${match.titulo}</strong>`;
                
                enlace.onclick = () => { 
                    cajaResultados.classList.add('hidden'); 
                    inputBuscador.value = ''; 
                };
                
                cajaResultados.appendChild(enlace);
            });
            cajaResultados.classList.remove('hidden');
        } else {
            cajaResultados.innerHTML = '<div class="px-4 py-3 text-sm text-gray-500 italic">No se encontraron resultados</div>';
            cajaResultados.classList.remove('hidden');
        }
    }

    // 4. Eventos
    inputBuscador.addEventListener('input', ejecutarBusqueda);
    if(btnBuscar) btnBuscar.addEventListener('click', ejecutarBusqueda);
    
    inputBuscador.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            ejecutarBusqueda();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#buscadorWeb') && !e.target.closest('#resultadosBusqueda') && !e.target.closest('#btnBuscar')) {
            cajaResultados.classList.add('hidden');
        }
    });
});