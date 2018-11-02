import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { MailData, MailgunService, Site } from 'shared/mailgun.service';

@Controller('inner-path')
export class InnerPathController {
  private site: Site = 'innerpath';

  constructor(private mgService: MailgunService) {}

  private dlPromise(res: Response, docName: string) {
    return new Promise((resolve, reject) => {
      res.download(
        join(__dirname, '..', '..', 'assets', 'inner-path', `${docName}.pdf`),
        docName,
        e => {
          if (e) reject(e);
          else resolve();
        }
      );
    });
  }

  @Get('document/:name')
  async downloadDocument(@Param('name') docName, @Res() res: Response) {
    try {
      return await this.dlPromise(res, docName);
    } catch (e) {
      throw new InternalServerErrorException('File download error', e + '');
    }
  }

  @Post('email')
  async sendEmail(@Body() mailData: MailData) {
    return this.mgService.sendEmail(this.site, mailData);
  }
}
