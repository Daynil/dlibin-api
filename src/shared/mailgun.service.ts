import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';

export class MailData {
  email: string;
  subject?: string;
  first: string;
  last: string;
  body: string;
}

export type Site = 'innerpath' | 'dlibinnet';

@Injectable()
export class MailgunService {
  private mailgunInnerpath: Mailgun.Mailgun;
  private mailgunDlibinnet: Mailgun.Mailgun;
  constructor() {
    this.mailgunInnerpath = new Mailgun({
      apiKey: process.env.MAILGUN_API_KEY_INNER_PATH,
      domain: 'innerpathllc.com'
    });
    // this.mailgunInnerpath = new Mailgun({
    //   apiKey: process.env.MAILGUN_API_KEY_DLIBINNET,
    //   domain: 'dlibin.net'
    // });
  }

  async sendEmail(site: Site, mailData: MailData) {
    if (!mailData.subject) mailData.subject = 'Footer contact';

    let subjectLine: string;
    let ourEmail: string;
    let mg: Mailgun.Mailgun;

    if (site === 'innerpath') {
      subjectLine = 'Inner Path website form - ';
      ourEmail = 'innerpath.inquiries@gmail.com';
      mg = this.mailgunInnerpath;
    } else {
      subjectLine = 'Dlibin.net website form - ';
      ourEmail = 'dlibinrx@gmail.com';
      mg = this.mailgunDlibinnet;
    }

    subjectLine = `${subjectLine} ${mailData.subject}`;
    const mail: Mailgun.messages.SendData = {
      from: mailData.email,
      to: ourEmail,
      subject: subjectLine,
      html: `
      <div><b>Name:</b> ${mailData.first} ${mailData.last}</div>
      <div><b>Message:</b></div>
      <div>${mailData.body}</div>
    `
    };

    try {
      return await mg.messages().send(mail);
    } catch (e) {
      throw new InternalServerErrorException(`Mailgun error (${site})`, e + '');
    }
  }
}
