import LinkShortenerApp from './app';

const PORT = 5000;

const app = new LinkShortenerApp();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
