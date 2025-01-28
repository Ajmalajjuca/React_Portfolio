import Profile from '../Model/Profile.js';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator'
import otpModel from '../Model/otp.js';
import jwt from 'jsonwebtoken';

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.find();
        res.status(200).json({ message: "Profile fetched successfully", profile });
    } catch (error) {
        console.log('getProfile error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const postProfile = async (req, res) => {
    console.log('req.body>>',req.body)
    if (req.body.socialLinks) {
        req.body.socialLinks = JSON.parse(req.body.socialLinks);
      }
      if (req.body.contributions) {
        req.body.contributions = JSON.parse(req.body.contributions);
      }

  
      // Log the parsed body
      console.log('Parsed request body:', req.body);
      console.log('File:', req.file);
    const { 
        name, 
        title, 
        bio, 
        journey, 
        email, 
        phone, 
        socialLinks = {}, 
        contributions = {},
    } = req.body;

    const file = req.file;
    let avatarPath = null;

    // Optional file upload
    if (file) {
        avatarPath = '/uploads/' + file.filename;
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    try {
        const newProfile = new Profile({ 
            name, 
            title, 
            bio, 
            journey, 
            email, 
            phone, 
            socialLinks,
            contributions,
            avatar: avatarPath
        });

        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        console.error('postProfile error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Parse JSON strings if they exist
        if (req.body.socialLinks) {
            req.body.socialLinks = JSON.parse(req.body.socialLinks);
        }
        if (req.body.contributions) {
            req.body.contributions = JSON.parse(req.body.contributions);
        }


        console.log('Update Profile - Parsed request body:', req.body);
        console.log('Update Profile - File:', req.file);

        const { 
            name, 
            title, 
            bio, 
            journey, 
            email, 
            phone, 
            socialLinks = {}, 
            contributions = {},
        } = req.body;

        const file = req.file;
        const updateData = { 
            name, 
            title, 
            bio, 
            journey, 
            email, 
            phone, 
            socialLinks,
            contributions,
            
            
        };

        // Optional file upload
        if (file) {
            updateData.avatar = '/uploads/' + file.filename;
        }

        // Remove undefined fields
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const updatedProfile = await Profile.findByIdAndUpdate(
            id, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ 
            message: "Profile updated successfully", 
            profile: updatedProfile 
        });
    } catch (error) {
        console.error('updateProfile error:', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const generateToken = (user) => {
    return jwt.sign(
      { name: 'admin' }, // Payload
      process.env.JWT_SECRET,                         // Secret key
      { expiresIn: '1h' }                 // Token expiration
    );
  };

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    console.log('otp>>>>', otp);
    const otpDetails = await otpModel.findOne({ otp });
    if (!otpDetails) {
        return res.status(400).json({ message: "OTP not found" });
    }
    if (otpDetails.expiry < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }
    const token = generateToken(otpDetails.name);
    console.log('token>>>>', token);


    res.status(200).json({ message: "OTP verified successfully", token });
}

const generatorotp = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });
    console.log("OTP generated: ", otp);
    return otp;
};


export const sendOtp = async (req, res) => {
    console.log('init:');
    try {
        const otp = generatorotp();
        const currTime = Date.now();
        const expTime = currTime + 60 * 1000;

        await otpModel.updateOne({name: 'admin'},{$set: {otp, expiry: new Date(expTime) }}, { upsert: true });
        await sendEmail(otp);
        console.log('otp>>>>', otp);

        res.status(200).json({ message: "OTP sent successfully", otp });
    } catch (error) {
        console.log('Error generating OTP:', error);
        res.status(500).json({ message: "Error generating OTP", error: error.message });
    }
}




const sendEmail = async (otp,) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // your SMTP username
                pass: process.env.SMTP_PASS, // your SMTP password
            },
        });
        transporter.verify(function (error, success) {
            if (error) {
                console.error(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        let mailOptions = {
            from: "avocado.ajmal@gmail.com",
            to: 'ajmalajju313786@gmail.com',
            subject: "E-mail Verification",
            html: `<p>Dear admin,</p>
  <p>Thank you for signing up with <strong color: #ff0000;>Avocado!</strong> To complete your registration, please use the following OTP:</p>
  <p style="font-size: 1.5em; font-weight: bold; color: #ff0000;">${otp}</p>
  <p>Enter this OTP on our website to verify your email address and access your account.</p>
  <p>If you did not sign up for <strong color: #ff0000;>Avocado!</strong>, please disregard this email.</p>
  <p>Welcome Avocado!</p>
  <p>Best regards,<br/>Ajmal C A</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (err) {
        console.error(err);
    }
};