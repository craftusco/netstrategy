var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(reqData) {
  const {formType, data} = reqData;
  const { name, surname, fullname, business_name, email } = data;
  var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,  
    },
  });
  let mailOptions = {
    // from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    from: `${business_name ?? (fullname ?? name + " " + surname)} <${process.env.MAIL_FROM_ADDRESS}>`,
    replyTo: email,
    to: ["massimo.p@netstrategy.it", "robbi@netstrategy.it"],
    subject: data,
    text: data
  };

  if(formType === "standard") {
    
    const {name, surname, business_name, email, phone_number, subject, message, checkbox_privacy_2, checkbox_newsletter } = data;
    mailOptions.subject = `NS sito | Nuovo contatto | ${name} ${surname} - ${business_name}`
    mailOptions.text = `
      ${name} ${surname} di ${business_name} ha inviato una richiesta dopo compilato il form sul sito web
      
      Dati di contatto
      Email: ${email}
      Telefono: ${phone_number}

      Servizio richiesto: ${subject}

      Messaggio cliente:
      ${message}

      Consensi
      ${checkbox_privacy_2 ? '✅' : '❌'} Privacy
      ${checkbox_newsletter ? '✅' : '❌'} Newsletter
    `
  } else if (formType === "work") {
    const {name, surname, email, phone_number, message, checkbox_privacy_2, checkbox_newsletter, jobPosition, fileName } = data;
    mailOptions.subject = `NS sito | Nuova candidatura | ${name} ${surname}`
    mailOptions.text = `
      ${name} ${surname} si è candidato per la posizione di ${jobPosition}
      
      Dati di contatto
      Email: ${email}
      Telefono: ${phone_number}

      Messaggio:
      ${message}

      Consensi
      ${checkbox_privacy_2 ? '✅' : '❌'} Privacy
      ${checkbox_newsletter ? '✅' : '❌'} Newsletter

      Cv: ${fileName}
    `
  } else if (formType === "event") {
    const {name, surname, business_name, email, phone_number, nome_evento, message, checkbox_privacy_2, checkbox_newsletter } = data;
    mailOptions.subject = `NS sito | Iscrizione Evento | ${nome_evento}`
    mailOptions.text = `
      ${name} ${surname} di ${business_name} si è iscritto all'evento ${nome_evento}
      
      Dati di contatto
      Email: ${email}
      Telefono: ${phone_number}

      Messaggio cliente:
      ${message}

      Consensi
      ${checkbox_privacy_2 ? '✅' : '❌'} Privacy
      ${checkbox_newsletter ? '✅' : '❌'} Newsletter
    `
  } else if (formType === "landing") {
    const {checkbox_newsletter ,checkbox_privacy_2 , business_name ,email, name, surname ,message ,phone_number, website} = data;
    mailOptions.subject = `NS sito | Nuovo Lead | ${name} ${surname} `
    mailOptions.text = `
      ${name} ${surname} di ${business_name} ha compilato il form nella landing della campagna ads
      
      Dati di contatto
      Email: ${email}
      Telefono: ${phone_number}

      Informazioni azienda
      Nome: ${business_name}
      Sito Web: ${website}

      Messaggio cliente:
      ${message}

      Consensi:
      ${checkbox_privacy_2 ? '✅' : '❌'} Privacy
      ${checkbox_newsletter ? '✅' : '❌'} Newsletter
    `
  } else if (formType === 'newsletter') {
    const { name, surname, email } = data;
    mailOptions.subject = `NS sito | Iscrizione Newsletter | ${name} ${surname}`
    mailOptions.text = `
      ${name} ${surname} si è iscritto alla newsletter

      dati: ${name} ${surname} ${email}
    `
    mailOptions.to = "massimo.p@netstrategy.it";
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      return true;
    }
  });
}

