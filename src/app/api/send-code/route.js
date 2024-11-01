// app/api/send-code/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
    const { email } = await request.json(); // Get email from request body
    const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit code

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "mg6646771@gmail.com", // Your email address
            pass: "ynvnfsmsrcibdepj", // Your email password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: "mg6646771@gmail.com",
        to: email,
        subject: "Your Verification Code",
        text: `Your verification code is: ${randomCode}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        // Create a cookie with the random code
        const cookie = `auth_token=${randomCode}; Path=/; HttpOnly; SameSite=Strict`; // Adjust the cookie attributes as needed

        // Return response with the cookie
        return new Response(
            JSON.stringify({ message: "Code sent successfully!" }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': cookie, // Set the cookie in the response
                    'Content-Type': 'application/json', // Ensure content type is set
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to send email." }), { status: 500 });
    }
}
