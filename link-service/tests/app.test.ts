import LinkShortenerApp from '../src/app';
import fetch from 'node-fetch';

const TEST_PORT = 5001;

describe(`Link shortener application`, () => {
  let app: LinkShortenerApp;

  beforeEach(async () => {
    app = new LinkShortenerApp();
    app.listen(TEST_PORT);
  });

  afterEach(async () => {
    app.close();
  })

  describe('GET /hello-world', () => { 
    it(`returns a greeting to the world`, async () => {
      const result = await fetch(`http://localhost:${TEST_PORT}/tinyurls`);
      expect(result.status).toEqual(200);
      const response = await result.json();
      expect(response[0].id).toEqual(1);
    });
  });
});
