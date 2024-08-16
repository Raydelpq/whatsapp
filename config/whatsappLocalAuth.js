const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
//const { initPusher, emitEventPusher } = require("../controllers/pusherController");
let client = null;

/**
 * Inicializa el cliente de WhatsApp y configura los eventos necesarios.
 * @returns {Promise<boolean>} - Indica si la inicialización fue exitosa.
 */
const initWhatsapp = async () => {
    //const pusher = await initPusher();

    client = new Client({
        authStrategy: new LocalAuth(),
        webVersionCache: {
            type: "remote",
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        },
        puppeteer: {
            executablePath: '/usr/bin/google-chrome-stable',
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        },
    });

    // Evento cuando la sesión remota se guarda
    client.on("remote_session_saved", () => {
        console.log("remote_session_saved");
    });

    // Evento cuando se genera un código QR
    client.on("qr", (qr) => {
        console.log(`QR: ${qr}`);

        // Enviar Qr a un canal por pusher
        const data = { message_qr: qr };
        //emitEventPusher(pusher, 'public', process.env.CANAL, data);

        // Mostrar Qr en consola
        qrcode.generate(qr, {small: true});

    });

    // Evento cuando el cliente se autentica
    client.on("authenticated", () => {
        console.log(`Cliente: Autenticado!`);
    });

    // Evento cuando falla la autenticación
    client.on("auth_failure", (msg) => {
        console.error("Error de autenticación", msg);
    });

    // Evento durante la carga del cliente
    client.on("loading_screen", (porcentaje, mensaje) => {
        console.log(`Cargando Cliente: ${porcentaje} - ${mensaje}`);
    });

    // Evento cuando el cliente está listo
    client.on("ready", async () => {
        console.log("Client is ready!");

    });


    // Evento cuando se recibe un mensaje
    client.on("message", (message) => {
        // Puedes agregar lógica para manejar mensajes aquí

    });

    console.log("Iniciando WhatsApp");
    await client.initialize();
    return true;
};



/**
 * Envía un mensaje a un número de teléfono específico.
 * @param {string} phoneNumber - El número de teléfono del destinatario.
 * @param {string} message - El mensaje a enviar.
 */
const sendMessageUser = async (phoneNumber, message) => {
    const numero = phoneNumber.endsWith('@c.us') ? phoneNumber : `${phoneNumber}@c.us`; // Formatea el número de teléfono

    try {
        // Envía el mensaje utilizando el cliente de WhatsApp
        await client.sendMessage(numero, message);
        console.log(`Mensaje Enviado a: ${phoneNumber}`);
    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        console.error(`Error al enviar mensaje a ${numero}`, error);
    }
};


/**
 * Envía un mensaje a un grupo  específico.
 * @param {string} groupID - El grupo de destinatario.
 * @param {string} message - El mensaje a enviar.
 */
const sendMessageGroup = async (groupID, message) => {
    const grupo = groupID.endsWith('@g.us') ? groupID : `${groupID}@g.us`; // Formatea el número de teléfono

    try {
        // Envía el mensaje utilizando el cliente de WhatsApp
        await client.sendMessage(grupo, message);
        console.log(`Mensaje Enviado a: ${grupo}`);
    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        console.error(`Error al enviar mensaje a ${grupo}`, error);
    }
};


/**
 * Envía un archivo a un número de WhatsApp con una descripción opcional.
 * @param {string} chatId - El número o grupo de WhatsApp al que se enviará el archivo.
 * @param {string} file - La ruta del archivo que se enviará.
 * @param {string} caption - La descripción opcional que acompañará al archivo.
 * @throws {Error} - Lanza un error si el envío falla.
 */
const sendFile = async (chatId, file, caption) => {
    try {

        chatId += chatId.endsWith('@c.us') ? chatId : `${chatId}@c.us`;;
        // Crea un objeto de media desde la ruta del archivo
        const media = MessageMedia.fromFilePath(file);

        // Envía el archivo al chat de WhatsApp con la descripción
        await client.sendMessage(chatId, media, { caption: caption });

    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        const mensajeError = error.message;
        console.error('Error al enviar archivo:', mensajeError);
        throw new Error(mensajeError);
    }
};


/**
 * Envía un archivo a un número de WhatsApp con una descripción opcional.
 * @param {string} chatId - El número o grupo de WhatsApp al que se enviará el archivo.
 * @param {string} file - La ruta del archivo que se enviará.
 * @param {string} caption - La descripción opcional que acompañará al archivo.
 * @throws {Error} - Lanza un error si el envío falla.
 */
const sendFileGroup = async (chatId, file, caption) => {
    try {

        chatId = chatId.endsWith('@g.us') ? chatId : `${chatId}@g.us`;

        // Crea un objeto de media desde la ruta del archivo
        const media = MessageMedia.fromFilePath(file);

        // Envía el archivo al chat de WhatsApp con la descripción
        await client.sendMessage(chatId, media, { caption: caption });

    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        const mensajeError = error.message;
        console.error('Error al enviar archivo:', mensajeError);
        throw new Error(mensajeError);
    }
};




module.exports = {
    initWhatsapp,
    sendMessageUser,
    sendMessageGroup,
    sendFile,
    sendFileGroup
};
