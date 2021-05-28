import * as express from 'express';
import { Server } from 'http';
import Link from './link'
var cors = require("cors");
const bodyParser = require("body-parser");

export default class LinkShortenerApplication {
  private app: express.Express;
  private server: Server;
  private link: Link;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.link = new Link(this.app);
    this.link.shortUrl_GET();
    this.link.shortUrl_POST();
    this.link.shortUrl_DELETE();
    this.link.redirectUrl_GET();
  }

  listen(port: number, callback?: (...args: Array<any>) => void) {
    this.server = this.app.listen(port, callback);
  }

  close() {
    this.server.close();
  }
}
