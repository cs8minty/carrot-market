import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import smtpTransport from '@libs/server/email';
import { error } from 'console';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { phone, email } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if (!user) return res.status(400).json({ ok: false });
    const payload = Math.floor(10000 + Math.random() * 900000) + '';
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: 'Anonymous',
                        ...user,
                    },
                },
            },
        },
    });
    if (phone) {
        /* const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            from: process.env.PROVIDER_PHONE,
            to: phone,
            body: `Your login token is ${payload}`,
        });
        console.log(message); */
    } else if (email) {
        /* const mailOptions = {
            from: process.env.MAIL_ID,
            to: email,
            subject: 'Your Carrot Market Verification Email',
            text: `Your token is ${payload}`,
        };
        const result = await smtpTransport.sendMail(
            mailOptions,
            (error, response) => {
                if (error) {
                    console.log(error);
                    return null;
                } else {
                    console.log(response);
                    return null;
                }
            }
        );
        smtpTransport.close();
        console.log(result); */
    }
    return res.json({
        ok: true,
    });
}

export default withHandler('POST', handler);
