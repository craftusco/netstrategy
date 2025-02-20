import { sendMail } from "@/service/emailService";
import * as fs from 'fs';

const handler = async (req, res) => {
  return
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        const parsedReqBody = JSON.parse(req.body)
        const data = parsedReqBody.data;
        if(data.file) {
          const fileName = `cv-${data.name.toLowerCase()}-${data.surname.toLowerCase()}-${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}.txt`
          fs.writeFileSync(`./cv/${fileName}`, data.file);
          parsedReqBody.data.fileName = fileName;
        }
        await sendMail(parsedReqBody);
        res.status(200).send({message: "messaggio inviato con successo", success: true});
        break;
      }
      case "GET": {
        res.status(200).send("this looks like a very empty page");
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;