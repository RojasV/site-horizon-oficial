class MailSender {
    constructor() {
        this.mailEl = document.querySelector('.php-email-form')
        this.submitBtn = document.querySelector('mail-submit')
        this.sendMail()
    }

    sendMail() {
        this.mailEl.addEventListener('submit', e => {
            e.preventDefault()

            this.submitBtn.setAttribute("disabled", true)

            const formData = new FormData(this.mailEl)

            const templateParams = {
                from_name: formData.get("name"),
                message: formData.get("message"),
                email: formData.get("email")
            }

            emailjs.send('service_1wifwvv', "template_be4kr9d", templateParams, 'BTUi7VvgczDW8Pki2')
                .then(response => {
                    Swal.fire({
                        title: `Ficamos felizes pelo seu interesse ${formData.get("name")}!`,
                        text: 'Recebemos o seu email e te responderemos em no máximo 1 minutinho!',
                        icon: 'success',
                        confirmButtonText: "ok"
                    })
                        .then(() => {
                            this.submitBtn.removeAttribute("disabled")
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        })
    }


}

window.app = new MailSender()