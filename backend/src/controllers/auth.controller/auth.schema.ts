import { z } from "zod"


export class AuthSchema {

    static readonly emailSchema = z.string().email().min(8).max(255)
    static readonly passwordSchema = z.string().min(6).max(255)


    static readonly loginSchema = z.object(
        {
            email: AuthSchema.emailSchema,
            password: AuthSchema.passwordSchema,
            userAgent: z.string().optional()
        }
    )
 

    static readonly registerSchema = AuthSchema.loginSchema.extend(
        { 
            confirmPassword: z.string().min(6).max(255),
        }
    ).refine((data) => data.password === data.confirmPassword, 
        {
            message: 'Password do not match.',
            path: ['confirmPassword']
        }
    )


    static readonly verifyEmailCodeShema = z.string().min(1).max(24)


    static readonly resetPasswordSchema = z.object(
        {
            password: AuthSchema.passwordSchema,
            verificationCode:  AuthSchema.verifyEmailCodeShema, 
        }
    )

}
