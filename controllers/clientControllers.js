const { response } = require("express");
const { sendMessageUser, sendMessageGroup, sendFile, sendFileGroup } = require("../config/whatsappLocalAuth");


/**
 * Envía un mensaje basado en los datos de la solicitud y responde con el estado de la operación.
 * @param {object} req - La solicitud HTTP.
 * @param {object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
const sendMessage = async (req, res = response) => {
    try {
        const { phoneNumber, message } = req.body;

        // Envía el mensaje utilizando la función sendMessages
        await sendMessageUser(phoneNumber, message);

        // Responde con un estado exitoso
        res.status(200).json({
            ok: true,
            msg: 'Mensaje enviado',
        });
    } catch (error) {
        console.error(error);

        // Responde con un estado de error
        res.status(500).json({
            ok: false,
            msg: error.message || 'Error al enviar el mensaje',
        });
    }
};

/**
 * Controlador para enviar un archivo a un número de WhatsApp.
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 */
const sendFileUser = async (req, res) => {
    const { chatId, file, caption } = req.body;

    try {
        // Llama a la función sendFile para enviar el archivo
        const respuesta = await sendFile (chatId, file, caption);

        // Verifica la respuesta y envía el mensaje correspondiente
        if (respuesta) {
            res.send({ mensaje: 'Archivo Enviado' });
        } else {
            res.send({ mensaje: 'Archivo no Enviado' });
        }
    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        const errorController = `Error al enviar el Archivo a ${chatId}`;
        console.error(errorController, error);
        res.status(500).send({ mensaje: errorController });
    }
};


/**
 * Envía un mensaje a un grupo basado en los datos de la solicitud y responde con el estado de la operación.
 * @param {object} req - La solicitud HTTP.
 * @param {object} res - La respuesta HTTP.
 * @returns {Promise<void>}
 */
const sendMessageToGroup = async (req, res = response) => {
    try {
        const { clientId, groupId, message } = req.body;

        // Envía el mensaje al grupo utilizando la función sendSmsGroup
        await sendMessageGroup(groupId, message, clientId);

        // Responde con un estado exitoso
        res.status(200).json({
            ok: true,
            msg: 'Mensaje enviado',
        });
    } catch (error) {
        console.error(error);

        // Responde con un estado de error
        res.status(500).json({
            ok: false,
            msg: error.message || 'Error al enviar el mensaje',
        });
    }
};


/**
 * Controlador para enviar un archivo a un número de WhatsApp.
 * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} res - Objeto de respuesta (response).
 */
const sendFileToGroup = async (req, res) => {
    const { chatId, file, caption, grupo } = req.body;

    try {
        // Llama a la función sendFile para enviar el archivo
        const respuesta = await sendFileGroup (chatId, file, caption);

        // Verifica la respuesta y envía el mensaje correspondiente
        if (respuesta) {
            res.send({ mensaje: 'Archivo Enviado' });
        } else {
            res.send({ mensaje: 'Archivo no Enviado' });
        }
    } catch (error) {
        // Maneja y muestra cualquier error que ocurra
        const errorController = `Error al enviar el Archivo a ${chatId}`;
        console.error(errorController, error);
        res.status(500).send({ mensaje: errorController });
    }
};


module.exports = {
    sendMessage,
    sendMessageToGroup,
    sendFileUser,
    sendFileToGroup,
};
