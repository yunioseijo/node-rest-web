import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly public_path?: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.public_path = public_path;
    this.routes = routes;
  }

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.public_path!));

    //* Routes
    this.app.use(this.routes);

    //SPA routes
    this.app.get(/.*/, (req, res) => {
      const indexPth = path.join(
        process.cwd(),
        `${this.public_path}`,
        "index.html"
      );
      res.sendFile(indexPth);
    });
    // this.app.use((req, res) => {
    //   res.sendFile(path.join(process.cwd(), "public", "index.html"));
    // });

    this.app.listen(this.port);
    console.log(`Server running on port ${this.port}`);
  }
}
