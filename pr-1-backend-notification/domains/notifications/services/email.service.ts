import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendEmail(userId: string, notification: any) {
    // Get user email from database
    const user = await this.getUserEmail(userId);
    
    const mailOptions = {
      from: 'noreply@wikitrace.com',
      to: user.email,
      subject: 'Page Update Notification',
      html: `<p>The page ${notification.pageId} has been updated!</p>`
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async getUserEmail(userId: string) {
    // TODO: Implement this
    return { email: 'user@example.com' };
  }
}