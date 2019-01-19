import { Body, Controller, Post } from '@nestjs/common';
import { MailDataRelay, MailService, Site } from '../shared/mail.service';

@Controller('dlibinnet')
export class DlibinnetController {
  private site: Site = 'dlibinnet';

  constructor(private mgService: MailService) {}

  @Post('email')
  async sendEmail(@Body() mailData: MailDataRelay) {
    return this.mgService.sendEmail(this.site, mailData);
  }
}
