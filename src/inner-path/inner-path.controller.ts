import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UseFilters
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { MailData, MailgunService, Site } from 'shared/mailgun.service';

@Controller('inner-path')
export class InnerPathController {
  private site: Site = 'innerpath';

  constructor(private mgService: MailgunService) {}

  @Get('document/:name')
  downloadDocument(@Param('name') docName, @Res() res: Response) {
    return res.download(
      join(__dirname, '..', '..', 'assets', 'inner-path', `${docName}.pdf`),
      docName,
      e => {
        if (e)
          throw new InternalServerErrorException('File download error', e + '');
      }
    );
  }

  @Post('email')
  @UseFilters()
  async sendEmail(@Body() mailData: MailData) {
    return this.mgService.sendEmail(this.site, mailData);
  }
}
