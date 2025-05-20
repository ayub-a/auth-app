import { resend } from "../../config/resend";
import { EMAIL_SENDER, NODE_ENV } from "../../constants/env";

import { passwordResetTemplate } from "./templates/passwordReset";
import { verifyEmailTemplate } from "./templates/verifyEmail";


interface IEmailParams {
    to: string
    subject: string
    text: string 
    html: string
}


export class EmailUtils {

    static getPasswordResetTemplate(url: string) {
        return {
            subject: "Password Reset Request",
            text: `You requested a password reset. Click on the link to reset your password: ${url}`,
            html: passwordResetTemplate(url)        }
    }


    static getVerifyEmailTemplate(url: string) {
        return {
            subject: "Verify Email Address",
            text: `Click on the link to verify your email address: ${url}`,
            html: verifyEmailTemplate(url)
        }
    }


    private static get isProduction() {
        return NODE_ENV === 'production'
    }


    private static get getFromEmail() {
        return EmailUtils.isProduction ? 'onboarding@resend.dev' : EMAIL_SENDER
    }


    private static getToEmail(to: string) {
        return EmailUtils.isProduction ? 'delivered@resend.dev' : to
    }


    async sendEmail({to, subject, text, html}: IEmailParams) {
        return await resend.emails.send({
            from: EmailUtils.getFromEmail,
            to: EmailUtils.getToEmail(to),
            subject,
            text,
            html,
        })
    } 

}


export const emailUtils = new EmailUtils()
