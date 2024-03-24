// import sgMail, { MailService as SendGridMailService } from "@sendgrid/mail";
import { EmailRequest, EmailService, EmailTypes } from "./emailService"
const nodemailer = require("nodemailer")

const templateNameIDMap: Record<string, string[]> = {
  [EmailTypes.VerifyEmail]: ["65ae786b0256477dbad152f06aca857d", "hello@propally.co"],
  [EmailTypes.Contact]: ["65ae786b0256477dbad152f06aca857w", "hello@propally.co"],
  [EmailTypes.Welcome]: ["65ae786b0256477dbad152f06aca857d", "hello@propally.co"], // New user registration
  [EmailTypes.PasswordReset]: ["2e0b2ba472d94c1798e9b92a08ff6386", "hello@propally.co"], // Password Reset
  [EmailTypes.SubscriptionCreated]: ["1e5e30e9768b40abb9a5e0ba71e9969c", "hello@propally.co"], // New Subscription
  [EmailTypes.BeneficiaryVerified]: ["fc7a69b51f8a42c4ba3333b9b21b3d28", "hello@propally.co"], // Beneficiary Verified
  [EmailTypes.VerifyBeneficiaryEmail]: ["0ae49765f3e04dbf900f4def68e8ba8b", "hello@propally.co"], // Verify Beneficiary Email
  [EmailTypes.BulkTransactionsUpload]: ["0f8d4c0cab3e4b15a7c44c692508e327", "hello@propally.co"], // Bulk Transactions Upload
  [EmailTypes.NotificationEmail]: ["0f8d4c0cab3e4b15a7c44c692508e345", "hello@propally.co"], //Notification Email
  [EmailTypes.ActivityEmail]: ["0f8d4c0bnb3e4b15a7c44c692508e345", "hello@propally.co"], //Activity Email
  [EmailTypes.PropertyInvestmentNotificationEmail]: ["0t8d4c0cab3e4b15a7c44c692508e345", "hello@propally.co"], //Notification Email
}

export class SendgridService implements EmailService {
  async sendMail({
    to,
    cc,
    bcc,
    subject,
    templateName,
    templateData,
    sendAt,
  }: // key,
  EmailRequest): Promise<void> {
    const logData = {
      to,
      templateName,
      templateData,
      sendAt,
    }
    try {
      console.log(templateData, "templateData")
      console.log(to, "to")
      console.log(templateName, "templateName")
      console.log(subject, "subject")
      const [tid, email] = templateNameIDMap[templateName]

      const msg = {
        to,
        from: {
          email: email || "no-reply@propally.ng",
          name: "Segun Oladipupo",
        },
        cc,
        bcc,
        subject,
        templateId: `d-${tid}`,
        // dynamic_template_data: templateData,
        // sendAt: dayjs(sendAt).unix(),
      }

      const smtpEmail = "oladipuposegun007@gmail.com"
      const smtpPassword = "dmdvnsikddhjkyvz"

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      })
      const mailOptions = {
        from: smtpEmail,
        to,
        subject,
        html:
          templateName == EmailTypes.PasswordReset
            ? this.resetPasswordTemplate(templateData.token)
            : templateName == EmailTypes.Contact
            ? this.contactTemplate(templateData)
            : templateName == EmailTypes.NotificationEmail
            ? this.notificationTemplate(templateData.title, templateData.message)
            : templateName == EmailTypes.ActivityEmail
            ? this.activityTemplate(templateData.title, templateData.message)
            : templateName == EmailTypes.PropertyInvestmentNotificationEmail
            ? this.propertyInvestmentNotificationTemplate(templateData.title, templateData.message)
            : this.bodyTemplate(templateData.token),
      }
      await transporter.sendMail(mailOptions).then((response: any) => console.log(response))
    } catch (error) {
      console.log(error, "ERROR")
    }
  }

  private contactTemplate(templateData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #f5f7f6;
          padding: 20px;
          text-align: left;
        }

        .header img {
      max-width: 130px !important;
    }

        .content {
          padding: 20px;
        }
        .content2{
          padding:20px;
        }

        .ii a[href] {
        color: #fff !important;
        }
        .im{
          color:#000000 !important;
        }

        .button {
          background-color: #006633;
          color: #fff !important;
          text-align: center;
          margin:33px 3px;
          padding: 20px 40px;
          text-decoration: none;
          display: inline-block;
          border-radius: 10px;
        }
        span{
          color:#EBB11D !important;
        }
        h1,h2,p{
          color:#000000!important;
        }
            </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h1>Contact US</h1>
                <h3>Email: ${templateData.email}</h3>
                <h3>Subject: ${templateData.subject}</h3>
                <h3>Content: ${templateData.content}</h3>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }
  private bodyTemplate(token) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #f5f7f6;
          padding: 20px;
          text-align: left;
        }

        .header img {
      max-width: 130px !important;
    }

        .content {
          padding: 20px;
        }
        .content2{
          padding:20px;
        }

        .ii a[href] {
        color: #fff !important;
        }
        .im{
          color:#000000 !important;
        }

        .button {
          background-color: #006633;
          color: #fff !important;
          text-align: center;
          margin:33px 3px;
          padding: 20px 40px;
          text-decoration: none;
          display: inline-block;
          border-radius: 10px;
        }
        span{
          color:#EBB11D !important;
        }
        h1,h2,p{
          color:#000000!important;
        }
            </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h1>Activate Your Account</h1>
                <h3>Token: ${token}</h3>
                <p>Dear Valued customer,</p>
                <p>Thank you for choosing Propally. We're excited to have you on board.</p>
                <p>By activating your account, you'll gain access to different properties and investment solutions that will make your experience with us efficient and stress-free.</p>
                <p>Welcome aboard!</p>
                <p>Best regards.</p>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }
  private resetPasswordTemplate(token) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #f5f7f6;
          padding: 20px;
          text-align: left;
        }

        .header img {
      max-width: 130px !important;
    }

        .content {
          padding: 20px;
        }
        .content2{
          padding:20px;
        }

        .ii a[href] {
        color: #fff !important;
        }
        .im{
          color:#000000 !important;
        }

        .button {
          background-color: #006633;
          color: #fff !important;
          text-align: center;
          margin:33px 3px;
          padding: 20px 40px;
          text-decoration: none;
          display: inline-block;
          border-radius: 10px;
        }
        span{
          color:#EBB11D !important;
        }
        h1,h2,p{
          color:#000000!important;
        }
            </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h1>Reset Your Account With this token</h1>
                <h3>Token: ${token}</h3>
                <p>Dear Valued customer,</p>
                <p>Thank you for choosing Propally. We're excited to have you on board.</p>
                <p>By activating your account, you'll gain access to different properties and investment solutions that will make your experience with us efficient and stress-free.</p>
                <p>Welcome aboard!</p>
                <p>Best regards.</p>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }

  private notificationTemplate(title, message) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #f5f7f6;
          padding: 20px;
          text-align: left;
        }

        .header img {
      max-width: 130px !important;
    }

        .content {
          padding: 20px;
        }
        .content2{
          padding:20px;
        }

        .ii a[href] {
        color: #fff !important;
        }
        .im{
          color:#000000 !important;
        }

        .button {
          background-color: #006633;
          color: #fff !important;
          text-align: center;
          margin:33px 3px;
          padding: 20px 40px;
          text-decoration: none;
          display: inline-block;
          border-radius: 10px;
        }
        span{
          color:#EBB11D !important;
        }
        h1,h2,p{
          color:#000000!important;
        }
            </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h2>${title}</h2>
                <h3>Message: ${message}</h3>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }
  private propertyInvestmentNotificationTemplate(title, message) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            body {
              font-family: Arial, sans-serif;
            }

            .header {
              background-color: #f5f7f6;
              padding: 20px;
              text-align: left;
            }

           .header img {
            max-width: 130px !important;
            }

            .content {
              padding: 20px;
            }
            .content2{
              padding:20px;
            }

            .ii a[href] {
            color: #fff !important;
            }
            .im{
              color:#000000 !important;
            }

            .button {
              background-color: #006633;
              color: #fff !important;
              text-align: center;
              margin:33px 3px;
              padding: 20px 40px;
              text-decoration: none;
              display: inline-block;
              border-radius: 10px;
            }
            span{
              color:#EBB11D !important;
            }
            h1,h2,p{
              color:#000000!important;
            }
        </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h2>${title}</h2>
                <h3>Message: ${message}</h3>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }
  private activityTemplate(title, message) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            body {
              font-family: Arial, sans-serif;
            }

            .header {
              background-color: #f5f7f6;
              padding: 20px;
              text-align: left;
            }

           .header img {
            max-width: 130px !important;
            }

            .content {
              padding: 20px;
            }
            .content2{
              padding:20px;
            }

            .ii a[href] {
            color: #fff !important;
            }
            .im{
              color:#000000 !important;
            }

            .button {
              background-color: #006633;
              color: #fff !important;
              text-align: center;
              margin:33px 3px;
              padding: 20px 40px;
              text-decoration: none;
              display: inline-block;
              border-radius: 10px;
            }
            span{
              color:#EBB11D !important;
            }
            h1,h2,p{
              color:#000000!important;
            }
        </style>
        </head>
        <body>
            <div class="header">
              <img width="200" height="87" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GZrXPCyW-Vwjo9Vx6kYBBKRST75C_a1sygEwa6xsXLApGXw7dRvc19SxANuyDLFvjVo&usqp=CAU" alt="Brand Image">
            </div>
            <div class="content">
                <h2>${title}</h2>
                <h3>Message: ${message}</h3>
                <p>Propally Teams</p>
            </div>
        </body>
        </html>
        `
  }
}
