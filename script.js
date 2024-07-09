document.addEventListener('DOMContentLoaded', function() {
    const textoEditable = document.querySelector('.p__left');
    const botonEncriptar = document.querySelector('.tamaño-b1');
    const botonDesencriptar = document.querySelector('.tamaño-b2');
    const botonCopiar = document.querySelector('.tamaño-b3');
    const mensajeDescriptado = document.querySelector('#right-section p');
    const imagenMuñeco = document.querySelector('.muñeco');
    const imagenFrame = document.querySelector('.frame');

    // Ocultar el botón de copiar al inicializar el navegador
    botonCopiar.classList.add('hidden');



    // Función para limpiar el editor y mostrar cursor parpadeante al hacer clic en <p>
    textoEditable.addEventListener('click', function() {
        // Limpiar el contenido
        textoEditable.innerText = '';

        // Activar contentEditable y enfocar el elemento
        textoEditable.contentEditable = true;
        textoEditable.focus();

        // Colocar el cursor al final del texto
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(textoEditable);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // Validar entrada de texto en la sección izquierda
    textoEditable.addEventListener('input', function() {
        const texto = textoEditable.innerText;

        if (!validarTexto(texto)) {
            alert("No se admiten mayúsculas y caracteres especiales.");
            textoEditable.innerText = limpiarTexto(texto);
        }
    });

    // Encriptar el texto al hacer clic en el botón "Encriptar"
    botonEncriptar.addEventListener('click', function() {
        const textoOriginal = textoEditable.innerText;
        const textoEncriptado = encriptarTexto(textoOriginal);
        mensajeDescriptado.innerText = textoEncriptado;

        // Ocultar la imagen "Muñeco.png"
        imagenMuñeco.style.display = 'none';
        imagenFrame.style.display = 'none';

        // Inhabilitar los botones "Encriptar" y "Desencriptar"
        botonEncriptar.disabled = true;
        botonDesencriptar.disabled = true;

        // Mostrar el botón de copiar
        botonCopiar.classList.remove('hidden');
    });

    // Desencriptar el texto al hacer clic en el botón "Desencriptar"
    botonDesencriptar.addEventListener('click', function() {
        const textoEncriptado = textoEditable.innerText;
        const textoDesencriptado = desencriptarTexto(textoEncriptado);
        mensajeDescriptado.innerText = textoDesencriptado;

        // Actualizar el editor de la sección izquierda
        textoEditable.innerText = "Ingresa otro mensaje para encriptar";

        // Habilitar el botón "Encriptar"
        botonEncriptar.disabled = false;

        // Habilitar el botón "Desencriptar"
        botonDesencriptar.disabled = false;
    });

    // Copiar el texto encriptado al editor de la izquierda
    botonCopiar.addEventListener('click', function() {
        const textoEncriptado = mensajeDescriptado.innerText;
        textoEditable.innerText = textoEncriptado;

        // habilitar el boton "Desencriptar"
        botonDesencriptar.disabled = false;
    });

    // Función para validar el texto ingresado
    function validarTexto(texto) {
        const regex = /^[a-z\s]*$/; // Acepta solo letras minúsculas y espacios
        return regex.test(texto);
    }

    // Función para limpiar el texto de caracteres no válidos
    function limpiarTexto(texto) {
        return texto.replace(/[^a-z\s]/g, ''); // Elimina caracteres no válidos
    }

    // Función para encriptar el texto
    function encriptarTexto(texto) {
        return texto
            .replace(/e/g, 'enter')
            .replace(/i/g, 'imes')
            .replace(/a/g, 'ai')
            .replace(/o/g, 'ober')
            .replace(/u/g, 'ufat');
    }

    // Función para desencriptar el texto
    function desencriptarTexto(texto) {
        return texto
            .replace(/ufat/g, 'u')
            .replace(/ober/g, 'o')
            .replace(/imes/g, 'i')
            .replace(/enter/g, 'e')
            .replace(/ai/g, 'a');
    }
});
