# Proyecto de Esteganografía con Cifrado y Descifrado de Texto

Este es un proyecto de esteganografía que incluye funcionalidades de cifrado y descifrado de texto, implementado con HTML, CSS y JavaScript. La esteganografía se utiliza para ocultar información dentro de imágenes, mientras que el cifrado asegura que los mensajes ocultos estén protegidos en la foto y que no sean legibles facilmente.

## Descripción

El proyecto permite al usuario cargar una imagen e ingresar un mensaje de texto, aplicar un cifrado para proteger ese mensaje, y luego ocultarlo dentro de una imagen seleccionada. También ofrece la capacidad de extraer y descifrar mensajes ocultos previamente almacenados en imágenes.

## Funcionalidades

- **Cifrado de mensaje:** Utiliza un algoritmo de cifrado (Cesar) para proteger el mensaje antes de ocultarlo.
- **Ocultar mensaje cifrado:** Inserta el mensaje cifrado dentro de una imagen seleccionada.
- **Extraer mensaje oculto:** Recupera y descifra un mensaje previamente oculto en una imagen y lo muestra por una alerta.

## Tecnologías Utilizadas

- HTML5: Estructura básica de la interfaz web.
- CSS3: Estilos para mejorar la presentación y usabilidad.
- JavaScript: Lógica de programación para la esteganografía, cifrado y descifrado.
- SweetAlert2: (https://sweetalert2.github.io/) biblioteca JavaScript que nos servira para las alertas y tambien para mostrar el mensaje extraido.

## Cómo Funciona

### Ocultar un Mensaje

1. *Cargar una Imagen:* Selecciona un archivo de imagen usando el input de archivo.
2. *Ingresar un Mensaje:* Escribe el mensaje que deseas ocultar en el campo de texto.
3. *Encriptar y Ocultar:* El mensaje se encripta usando un cifrado César con un desplazamiento de 3 y luego se oculta en la imagen modificando los bits menos significativos de los datos de los píxeles de la imagen.
4. *Descargar Imagen:* La imagen modificada se puede descargar, conteniendo el mensaje oculto.

### Extraer un Mensaje

1. *Cargar una Imagen:* Selecciona un archivo de imagen que contenga un mensaje oculto.
2. *Extraer Mensaje:* El mensaje oculto se extrae de los datos de los píxeles de la imagen y se desencripta usando un cifrado César con un desplazamiento de -3.
3. *Ver Mensaje:* El mensaje extraído se muestra en una alerta.

## Autores
- Jimena Patricia Turpo Uruño
- Rocio Wendy Vargas Tacuña
- Maribel Chura Aquino
- Claudia Tapia
