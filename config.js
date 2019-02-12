

module.exports.mailFrom = "Aplikacja Example <system@example.pl>";
const contactFooter = `<br><br>
Pozdrawiamy,<br>
example.pl<br><br>

<a href="mailto:kontakt@example.pl">kontakt@example.pl</a><br>
<a href="https://example.pl">https://example.pl</a>
`;

module.exports.emailTemplates = {
	newAccount: {
		subject: "Utworzenie nowego konta w aplikacji Example",
		text: `
Dzień dobry,<br><br>

Konto z tym adresem email %email% zostało właśnie założone w systemie.<br>
Aby potwierdzić rejestrację, kliknij w link poniżej:<br><br>

<a href="${process.env.FRONTEND_URL}/security/activate/%activationLink%">${process.env.FRONTEND_URL}/security/activate/%activationLink%</a><br><br><br>

Jeżeli nie Ty zakładałeś konto, zignoruj tego maila.

${contactFooter}
		`
	}
};
