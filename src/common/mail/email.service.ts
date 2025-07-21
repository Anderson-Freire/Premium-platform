import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get<string>("MAILTRAP_HOST"),
      port: config.get<number>("MAILTRAP_PORT"),
      auth: {
        user: config.get<string>("MAILTRAP_USER"),
        pass: config.get<string>("MAILTRAP_PASS"),
      },
    });
  }

  async sendConfirmEmail(
    user: { name: string; email: string },
    token: string
  ): Promise<void> {
    const confirmUrl = `http://localhost:3000/auth/confirm?token=${token}`;
    await this.transporter.sendMail({
      from: `"Seu app"  <${this.config.get("MAILTRAP_FROM")}>`,
      to: user.email,
      subject: "Confirme o seu E-mail",
      html: `
        <h2>Olá ${user.name}</h2>
        <p>Confirme seu e-mail clicando no link abaixo:</p>
        <a href="${confirmUrl}">Confirmar e-mail</a>
      `,
    });
  }
}
