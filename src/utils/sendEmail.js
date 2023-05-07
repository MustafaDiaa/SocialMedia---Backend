import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail({
  to = [],
  cc,
  bcc,
  subject,
  text,
  html,
  attachments = [],
} = {}) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Mustafa Diaa" <${process.env.EMAIL}>`, // sender address
    to, // list of receivers
    cc,
    bcc,
    subject, // Subject line
    text, // plain text body
    html, // html body
    attachments,
  });

  return info.rejected.length ? false : true;
}

export default sendEmail;
