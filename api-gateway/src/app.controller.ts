import { All, Controller, Get, Inject, Param, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { type Response, type Request } from 'express';
import { map } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('SERVICO_GESTAO') private readonly client: ClientProxy,
  ) {}

  @All('gestao/*path')
  proxyServicoGestao(@Req() req: Request, @Res() res: Response, @Param('path') path: string[]) {
    console.log(req.path, path);

    return this.client.send({cmd: path.join('/')}, {}).pipe(map((data) => {
      console.log(data);
      res.json(data);
      return data;
    }));
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
