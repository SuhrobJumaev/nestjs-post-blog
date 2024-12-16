import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}
  @Get()
  public getParams() {
    const ENV = process.env.NODE_ENV;
    const path = !ENV ? '.env' : `.env.${ENV}`;
    console.log(path);
    console.log('env', process.env.NODE_ENV);

    console.log('port:', this.configService.get<number>('DATABASE_PORT'));
    console.log('username:', this.configService.get('DATABASE_USER'));
    console.log('password:', this.configService.get('DATABASE_PASSWORD'));
    console.log('host:', this.configService.get('DATABASE_HOST'));
    console.log('database:', this.configService.get('DATABASE_NAME'));
  }
}
