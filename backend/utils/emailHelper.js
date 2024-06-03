const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendVerificationEmailForRegisteredUser = (user, token) => {
  const htmlContent = `
    <div class="container" style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007bff;">Email Verification</h2>
        <p>Hello ${user.name},</p>
        <p>Welcome to our platform! To complete your registration, please click the button below to verify your email address:</p>
        <a href="${process.env.BACK_END_PORT}/api/verify/${token}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">Verify Email</a>
        <p>If you did not sign up for an account, you can ignore this email.</p>
        <p>Thank you,</p>
        <p>The Team</p>
    </div>`;

  transporter.sendMail({
    from: { name: "EcoMEAN", address: process.env.SMTP_USERNAME },
    to: user.email,
    subject: "Account Verification",
    html: htmlContent,
  });
};

const sendForgotPasswordMail = (user, token) => {
  const htmlContent = `
    <div class="container" style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007bff;">Password reset link</h2>
        <p>Hello ${user.name},</p>
        <p>We heard that you lost your password. Sorry about that!. But don’t worry! You can use the following button to reset your password:</p>
        <a href="${process.env.FRONT_END_PORT}/password_reset?token=${token}" style="display: inline-block; background-color: #65B741; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">Verify Email</a>
        <p>If you don’t use this link within 30 mintues, it will expire. To get a new password reset link,
        <a href="${process.env.FRONT_END_PORT}/forgotpassword" style="display: inline-block; background-color: #65B741; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;margin-top:10px;">Click here</a>
        </p>
        <p>Thank you,</p>
        <p>The Team</p>
    </div>`;
  transporter.sendMail({
    from: { name: "EcoMEAN", address: process.env.SMTP_USERNAME },
    to: user.email,
    subject: "Forgot Password",
    html: htmlContent,
  });
};

module.exports = {
  sendVerificationEmailForRegisteredUser,
  sendForgotPasswordMail,
};
