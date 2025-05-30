import { Controller, Get, Res } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { Response } from 'express';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) { }


  @Get()
  async checkHealth(@Res() res: Response) {
    try {
      const status = await this.healthCheckService.check();

      const html = this.healthCheckService.generateHtml('ok', status.timestamp);
      res.status(200).type('html').send(html);
    } catch (error) {
      const html = this.healthCheckService.generateHtml('fail', new Date().toISOString(), error.message);
      res.status(500).type('html').send(html);
    }
  }

}
