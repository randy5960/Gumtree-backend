import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";

const app = express();
const upload = multer();

app.post("/api/check", upload.none(), async (req, res) => {
    const formData = req.body;

    // Log to Render logs
    console.log("✅ Received form data:", formData);

    // Send to email
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: "New Gumtree Form Submission",
            text: JSON.stringify(formData, null, 2)
        });

        console.log("📧 Email sent successfully");
    } catch (err) {
        console.error("❌ Email sending failed:", err);
    }

    res.send("success");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
