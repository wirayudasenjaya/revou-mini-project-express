import express from 'express';
import { urlController } from './controllers/urlController';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3030;

app.post('/shorten', urlController.getShortId);
app.get('/shorten/:short_id', urlController.redirectToUrl);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
