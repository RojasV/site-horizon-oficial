class MailSender {
    constructor() {
        this.mailEl = document.querySelector('.php-email-form')
        this.submitBtn = document.querySelector('.mail-submit')
        this.sendMail()

    }

    async sendMail() {
        this.mailEl.addEventListener('submit', e => {
            e.preventDefault()

            this.submitBtn.setAttribute("disabled", true)

            const formData = new FormData(this.mailEl)

            let celphoneHandledToStringNumber = "55" + formData.get("celphone").replace("(", "").replace(")", "").replace(" ", "").replace("-", "")

            const templateParams = {
                from_name: formData.get("name"),
                message: formData.get("message"),
                email: formData.get("email"),
                celphone: celphoneHandledToStringNumber
            }

            emailjs.send('service_1wifwvv', "template_be4kr9d", templateParams, 'BTUi7VvgczDW8Pki2')
                .then(() => {
                    this.whatsAppRequest(templateParams.celphone, templateParams.from_name)
                    this.successAlertHandler(templateParams.from_name)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    whatsAppRequest(phone, user) {
        fetch("https://api.z-api.io/instances/3B90684BCEEEE0C694327E7DD60563F4/token/A6DB97576B449FD54F01C267/send-messages", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(
                {
                    "phone": `${phone}`,
                    "message": `Olá ${user}! Eu sou o Vlad, muito prazer! Sou diretor comercial da Horizon, vi que você entrou em contato com a gente há pouco certo?! Então ${user}, tô aqui pessoalmente pra saber do que você precisa exatamente! Vamos dar o nosso melhor pra poder trazer pra realidade a idéia que você tiver! Aguardo sua resposta...`
                }
            )
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }

    successAlertHandler(user) {
        Swal.fire({
            title: `Ficamos felizes pelo seu interesse ${user}!`,
            text: 'Recebemos o seu email e te responderemos em no máximo 1 minutinho!',
            icon: 'success',
            confirmButtonText: "ok"
        })
            .then(() => {
                this.submitBtn.removeAttribute("disabled")
            })
            .catch(err => {
                console.log(err)
            })
    }


}

window.app = new MailSender()