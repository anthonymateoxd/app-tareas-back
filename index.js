import app from './app.js';
import { connectBD } from './db.js';

connectBD();
app.listen(4000);
console.log('Esucuchando en el puerto: ', 4000);
