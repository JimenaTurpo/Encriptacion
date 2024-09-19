document.getElementById('hide-message-btn').addEventListener('click', hideMessage);
document.getElementById('extract-message-btn').addEventListener('click', extractMessage);
document.getElementById('image-input').addEventListener('change', handleImageUpload);

const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
let imageData;

function handleImageUpload(event) {
    console.log("cambio")
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const image = new Image();
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

// Encriptar el mensaje y ocultarlo en la imagen
function hideMessage() {
    let message = document.getElementById('message-input').value;

    if (!imageData || !message) {
        console.log("imageData: ", imageData)
        console.log("message: ", message)
        // sweet alert
        Swal.fire({
            title: '¡¡Altooo, no te apresures🤗!!',
            text: 'Debes cargar la imagen y escribir el texto a encriptar.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return; // salir de la funcion si no hay imagen o texto
    }
    message = caesarCipher(message, 3);//encripta el mensaje
    const binaryMessage = stringToBinary(message + '\0');
    if (binaryMessage.length > (imageData.data.length / 4) * 3) {
        Swal.fire({
            title: 'Warning',
            text: 'El mensaje es demasiado largo para esta imagen.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    for (let i = 0; i < binaryMessage.length; i++) {
        const bit = binaryMessage[i];
        const pixelIndex = Math.floor(i / 3) * 4;
        const colorIndex = i % 3;
        const colorValue = imageData.data[pixelIndex + colorIndex];
        imageData.data[pixelIndex + colorIndex] = (colorValue & 0xFE) | bit;
    }
    ctx.putImageData(imageData, 0, 0);
    const imageURL = canvas.toDataURL();
    downloadImage(imageURL, 'mensaje-oculto.png');

    // Recargar la página después de un retraso de 500 milisegundos
    setTimeout(function() {
        location.reload();
    }, 500);
}


// Desencriptar el mensaje y extraer el mensaje de la foto 
function extractMessage() {
    if (!imageData) {
        // sweet alert
        Swal.fire({
            title: '¡¡ESPERA 😰!!',
            text: 'Primero debes cargar la imagen.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return; // salir de la funcion si no hay imagn cargada
    }
    let binaryMessage = '';
    for (let i = 0; i < imageData.data.length; i = i + 4) {
        for (let j = 0; j < 3; j++) {
            const bit = imageData.data[i + j] & 1;
            binaryMessage = binaryMessage + bit;
        }
    }
    let message = binaryToString(binaryMessage);
    message = caesarCipher(message, -3);

    Swal.fire({
        title: '¡Éxito. Mensaje Extraido!',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK'
    });

}

// Funcion de cifrado
function caesarCipher(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            // Aqui
            return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
        }
        return char;
    }).join('');
}

// Revisado
function stringToBinary(str) {
    return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

function binaryToString(binary) {
    let chars = [];
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.substr(i, 8);
        if (byte === '00000000') break;
        chars.push(String.fromCharCode(parseInt(byte, 2)));
    }
    return chars.join('');
}

function downloadImage(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

