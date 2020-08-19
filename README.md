![Packagist License](https://img.shields.io/github/license/josegustavoo/psycobot?color=3bb860)
![GitHub contributors](https://img.shields.io/github/contributors/josegustavoo/psycobot?color=3bb860)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FV6NL6FQT3KWG&source=url) 

<p align="center">
<img width="100" height="100" src="https://psycobot.vercel.app/img/icon.png">
</p>

# Psycobot

O **PsycoBot** é um projeto que consiste em um chatbot que tem como foco ajudar as pessoas, o foco dele é se parecer o maximo possivel a um psicólogo.


O **Psycobot** foi criado pôr apenas 1 pessoa, um programador adolescente de 15 anos, tudo foi criado em **celular** (não existe desculpa para começar a programar).

## Demo
[Site](https://psycobot.vercel.app)

[App](https://play.google.com/store/apps/details?id=com.psycobot.app)

## Tecnologias

- NodeJS (Back End)
- MongoDB (Banco de dados)
- Heroku (Hospedagem do backend)
- Vercel (Hospedagem do site)
- Expo (App)

## Principais bibliotecas

- Fastify
- Mongoose
- Node-NLP

## Criador

- [Instagram](https://instagram.com/jose_gustaavo)

- [Twitter](https://twitter.com/jose_gustaavo)

- [Rocketseat](https://app.rocketseat.com.br/me/josegustavo)

## Instruções de como colocar frases ao bot

- Crie um arquivo com o nome relacioando as frases (em inglês) na pasta src/dictionary e entre na pasta do idioma das frases (crie uma caso n tenha)

- Adicione esse codigo no arquivo

    ```
    const assunto = (manager) => {

    }

    module.exports = assunto;
    ```

- Para cada frase que o usuario possa dizer adicione um

    ```
    manager.addDocument();
    ```

- Para cada resposta do bot adicione um

    ```
    manager.addAnswer();
    ```

- Para entender um pouco mais consulte algum dos arquivos que ja tenha criado.

## Contribuir

Você pode contribuir de varias formas, a principal é ajudando a treinar o chatbot, adicionando mais frases.
Outas formas são dando um feedback no projeto, utilizar-lo, favoritar-lo.

E outra forma que pode me ajudar muito é doando alguma quantia, vai me ajudar a manter o projeto e crescer-lo ainda mais.

[![Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FV6NL6FQT3KWG&source=url)