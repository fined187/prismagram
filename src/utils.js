import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import Transport from "nodemailer-smtp-transport";
import jsonwebtoken from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  };
  const client = nodemailer.createTransport(Transport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = id => 
jsonwebtoken.sign({ id }, process.env.JWT_SECRET);
