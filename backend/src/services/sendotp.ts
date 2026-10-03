import {client} from "../index"
import { Resend } from "resend";
import "dotenv/config";
const key = process.env.RESEND_API_KEY;
const resend = new Resend(key);

export async function sendotp(email:string)
{
    // generating the otp
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    console.log(otp);

    // saving in the redis database

    await client.set(
        `email:${email}`,
        otp.toString(),
        {
            EX: 300
        }
    );

    // calling the resend service to send the otp on the client mail
    // Send OTP email
    async function testEmail() {
    try {
        const { data, error } = await resend.emails.send({
        from: 'Sort_MY_STAY <noreply@bhavit.xyz>',
        to: `${email}`,
        subject: 'OTP for onboarding',
        html: `<p>Your otp is : ${otp}</p>`,
        });

        console.log("RESEND DATA:", data);
        console.log("RESEND ERROR:", error);
    } catch (err) {
        console.error("EXCEPTION:", err);
    }
    }

    testEmail();

}