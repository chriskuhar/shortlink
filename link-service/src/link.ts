import axios from "axios";
import { Request, Response, NextFunction } from "express";


export default class Link {
  readonly app: any;

  constructor(app: any) {
    this.app = app;
  }

  shortUrl_GET = () => {
    this.app.get("/tinyurls", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await axios.get("http://localhost:3030/tinyurls");
        if (response.statusText === "OK") {
          res.send(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  shortUrl_POST = () => {
    this.app.post('/tinyurls', async (req: Request, res: Response, next: NextFunction) => {
      const url = req?.body?.url;
      const data = {
        url: url,
        tinyurl: '',
      }

      try {
        const resGet = await axios.get('http://localhost:3030/tinyurls');
          if(resGet.statusText === "OK") {
            const obj = resGet.data.find((elt: any) => elt.url === url);
            if(obj?.url) {
              res.status(409);
              res.send({'error': 'Duplicate entry'})
              return;
            }
          }
        const response = await axios.post('http://localhost:3030/tinyurls', data);
        if (response.status === 201) {
          const tinyurl = `http://localhost:5000/t/${response.data.id}`;
          const data = {
            url: response.data.url,
            tinyurl: tinyurl,
          }
          const resPut = await axios.put('http://localhost:3030/tinyurls/' + response.data.id, data);
          if(resPut.status === 200) {
            res.send('{status: "OK"}');
          }
        }
      } catch(error) {
        console.log(error);
      }
    });
  }

  shortUrl_DELETE = () => {
    this.app.delete('/tinyurls/:id', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;

      try {
        const response = await axios.delete('http://localhost:3030/tinyurls/' + id);
        if (response.statusText === "OK") {
          res.send(response.data);
        }
      } catch(error) {
          console.log(error);
      }
    });
  }

  redirectUrl_GET = () => {
    this.app.get('/t/:id', async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;

      try {
        const response = await axios.get('http://localhost:3030/tinyurls/' + id);
          if(response.statusText === "OK") {
            res.redirect(response.data.url);
          }
      } catch(error) {
        console.log(error);
      }
    });
  }
}
