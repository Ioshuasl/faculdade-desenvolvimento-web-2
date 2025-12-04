import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes'; // (Vamos criar o index de rotas depois)

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
  }

  private routes(): void {
    // Por enquanto, vamos deixar um placeholder
    this.server.use('/api', routes);
  }
}

export default new App().server;