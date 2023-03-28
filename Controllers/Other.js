import { asyncErrorMiddleWare } from "../Middleware/ErrorHandler.js";
import ErrorHandlerUtils from "../Utils/ErrorHandlerUtils.js";
import { sendEmail } from "../Utils/sendEmail.js";

export const Contactus = asyncErrorMiddleWare(async (req, res, next) => {
    const { name, email, message } = req.body;
    // if (!name || !email || !message) return next(new ErrorHandlerUtils("please add all fileds", 400));

    const to = process.env.MY_MAIL;
    const subject = "Contact from Foodcorner";
    const text = `I am ${name} and my Email is ${email} \n ${message}`;

    await sendEmail(to, subject, text);

    res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!Thank you for contact... ",
    });

})