import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function sendEmail({ to, subject, html }) {
  return transporter.sendMail({
    from: `Orderly Services <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

function sendActivationEmail(to, token, locale) {
  try {
    const href = `${process.env.CLIENT_ORIGIN}${locale}/activation/${token}`;
    const html = `
    <h1>Activate account</h1>
    <p>Please click the link below to activate your account</p>
    <a href="${href}">${href}</a>
  `;

    return sendEmail({
      to,
      subject: 'Orderly - Activate account',
      html,
    });
  } catch (error) {
    console.log(error);
  }
}

export default {
  sendEmail,
  sendActivationEmail,
};
