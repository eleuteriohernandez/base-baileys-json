const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowSencillo = addKeyword('No')
    .addAnswer('¿Si tu respuesta ha sido No, cuéntame brevemente qué problemas te han surgido para poder ayudarte en el futuro?', {capture:true}, (ctx) => {
        console.log('Info nombre: ', ctx.body)
    })

const flowPrincipal = addKeyword(['edix','bootcamp'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Soy Eleuterio Hernández y he creado una encuesta para superar el ejercicio de esta semana del Lab 01 de Investigación de Mercados con la suposición de que Netflix necesita información sobre sus usuarios',
            '👉 Te agradezco muchísimo tu participación, tu tiempo es oro. Solo te llevará 3 minutos, empecemos… ',
        ]
    )
    .addAnswer('¿Cual es tu nombre?', {capture:true}, (ctx) => {
        console.log('Info nombre: ', ctx.body)
    })
    .addAnswer('¿Cual es tu primer Apellido?', {capture:true}, (ctx) => {
        console.log('Info apellido: ', ctx.body)
    })
    .addAnswer('¿Desde que dispositivo ves Netflix con mayor frecuencia? Televisión, Portatil, Movil o Tablet', {capture:true}, (ctx) => {
        console.log('Info nombre: ', ctx.body)
    })
    .addAnswer('¿Cómo conociste la plataforma de Netflix?', {capture:true}, (ctx) => {
        console.log('Recomendado por : ', ctx.body)
    })
    .addAnswer('¿Tienes contratados otros servicios de streaming además de Netflix? Contesta si, no, o no sabe', {capture:true}, (ctx) => {
        console.log('Tiene otros servicios: ', ctx.body)
    }, null, flowSencillo)
    .addAnswer('¿Cuál es tu nivel de estudios?')
    .addAnswer('Ninguno, Secundaria, Formación Profesional, Grado universitario, Master o Doctorado', {capture:true}, (ctx) => {
        console.log('Nivel de estudios: ', ctx.body)
    })
    .addAnswer('Genial, ¿y por último cuál es tu edad?', {capture:true}, (ctx) => {
        console.log('Edad: ', ctx.body)
    })
    .addAnswer('Eh Voilà! ya hemos terminado, ¿Viste? Fue solo un momento y ahora gracias a tu colaboración miles de personas serán ayudadas con tus respuestas. 
            '👉 Muchas gracias por tu tiempo y por usar nuestro servicio'])

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
