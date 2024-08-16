var { check } = require("express-validator");
const { Router } = require("express");
const router = Router();
const { sendMessage, sendMessageToGroup, sendFile, sendFileToGroup } = require("../controllers/clientControllers");
const { validarCampos } = require("../middlewares/validar-campos");



router.post("/send", [
  check("phoneNumber", "El numero es obligatorio").not().isEmpty(),
  check("phoneNumber", "El numero debe ser un numero").isNumeric(),
  check("message", "El mensaje es obligatorio").not().isEmpty(),
  check("message", "El mensaje debe ser un string").isString(),
  validarCampos,
], sendMessage);

router.post("/send/group", [
  check("phoneNumber", "El numero es obligatorio").not().isEmpty(),
  check("phoneNumber", "El numero debe ser un numero").isNumeric(),
  check("message", "El mensaje es obligatorio").not().isEmpty(),
  check("message", "El mensaje debe ser un string").isString(),
  validarCampos,
], sendMessageToGroup);

router.post('/send/file',[
  check("chatId", "El grupo es obligatorio").not().isEmpty(),
],sendFile);

router.post('/send/file/group',[
  check("chatId", "El grupo es obligatorio").not().isEmpty(),
],sendFileToGroup);


module.exports = router;
