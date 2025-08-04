import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly public_path?: string;

  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.public_path = public_path;
  }

  async start() {
    //* Middlewares

    //* Public Folder
    this.app.use(express.static(this.public_path!));

    //* Routes
    this.app.get("/api/todos", (req, res) => {
      return res.json([
        {
          id: 1,
          title: "Todo 1",
          description: "Description 1",
          completed: true,
        },
        {
          id: 2,
          title: "Todo 2",
          description: "Description 2",
          completed: false,
        },
      ]);
    });

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
