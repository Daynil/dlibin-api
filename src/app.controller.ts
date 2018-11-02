import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('status')
  apiStatus() {
    return 'All systems green.';
  }
}
