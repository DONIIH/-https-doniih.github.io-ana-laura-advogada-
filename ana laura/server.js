const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configurar o transportador de e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pilastri18@gmail.com', // substitua pelo seu e-mail
            pass: 'suasenha' // substitua pela sua senha
        }
    });

    const mailOptions = {
        from: email,
        to: 'pilastri18@gmail.com ', // substitua pelo e-mail da advogada
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.json({ message: 'Erro ao enviar a mensagem. Por favor, tente novamente.' });
        } else {
            console.log('Email enviado: ' + info.response);
            res.json({ message: 'Mensagem enviada com sucesso!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
