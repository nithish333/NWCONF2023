const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

const sendWelcomeEmail = (email, name) => {
    console.log(email,name);
  sgMail.send({
    from: "chandrakanth.chinthakuntla@gmail.com",
    to: email,
    subject: "Thanks for registering to northwest conference app",
    text: `Welcome ${name} to the northwest conference`,
    dynamicTemplateData:{
        "template_id":"d-fa7b2593996c4f328177604936e6b2c7"
    }
  });
};


const paymentConfirmationMail = (email, name,amount,phone,status,id) => {
  // console.log(email,name);
sgMail.send({
  from: "chandrakanth.chinthakuntla@gmail.com",
  to: email,
  subject: "Thanks for completing your payment and registering for northwest conference",
  content:[
    
  ],
  text: `Welcome ${name} to the northwest conference
  Payment Summary
  Payment id : ${id}
  Name : ${name} 
  Amount : ${amount} 
  Status : ${status} 
  Phone number : ${phone}  `,
  
});
};
module.exports = {
  sendWelcomeEmail,paymentConfirmationMail
};