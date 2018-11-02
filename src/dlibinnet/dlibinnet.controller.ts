import { Body, Controller, Post } from '@nestjs/common';
import { MailData, MailgunService, Site } from 'shared/mailgun.service';

@Controller('dlibinnet')
export class DlibinnetController {
  private site: Site = 'dlibinnet';

  constructor(private mgService: MailgunService) {}

  @Post('email')
  async sendEmail(@Body() mailData: MailData) {
    return this.mgService.sendEmail(this.site, mailData);
  }
}
