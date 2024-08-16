const Pusher = require('pusher');


// Iniciar puscher
const initPusher = async () => {
  pusher = await new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLOUSTER,
    useTLS: true
  });
  console.log("Pusher Conectado");
  return pusher;
}


// Emitir Evento en pusher
const emitEventPusher = (pusher,canal, event, data) => {
  pusher.trigger(canal, event, data);
}


module.exports = {
  initPusher,
  emitEventPusher
};
