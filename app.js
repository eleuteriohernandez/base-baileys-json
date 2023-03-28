const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowPrincipal = addKeyword(['edix','bootcamp'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Soy Eleuterio Hernández y he creado una encuesta para superar el ejercicio de esta semana del Lab 01 de Investigación de Mercados con la suposición de que Netflix necesita información sobre sus usuarios',
            '👉 Te agradezco muchísimo tu participación, tu tiempo es oro. Solo te llevará 3 minutos, empecemos… ',
        ],
        null,
        null
    )
    .addAnswer('¿Cual es tu nombre?', {capture:true}, (ctx) => {
        console.log('Info nombre: ', ctx.body)
    })
    .addAnswer('¿Cual es tu primer Apellido?', {capture:true}, (ctx) => {
        console.log('Info apellido: ', ctx.body)
    })
    .addAnswer('¿Desde donde ves Netflix con mayor frecuencia?', buttons:[ {body:'Televisión'}, {body:'Ordenador o Portátil'}, {body:'Movil'}, {body:'Tablet'}]})
    .addAnswer('¿Cómo conociste la plataforma de Netflix?', {capture:true}, (ctx) => {
        console.log('Recomendado por : ', ctx.body)
    })
    .addAnswer('¿Tienes otros servicios de streaming además de Netflix?', buttons:[{ body:'Si'} ,{body:'No'}] , {capture:true}, (ctx) => {
        console.log('Otros streaming : ', ctx.body)
    })


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
