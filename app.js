const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowOtrosSi = addKeyword(['si','sí'])
    .addAnswer('Igual que yo, tengo varios más 😄 ¿Cuáles tienes contratados, escribe sus nombres?', {capture:true}, (ctx) => {
        console.log('Otras plataformas: ', ctx.body)
    })
    .addAnswer('Y con respecto a las otras plataformas, ¿Qué te parece más sencillo de utilizar Netflix o cualquiera de tus otros servicios de streaming?', {capture:true}, (ctx) => {
        console.log('Info comparativa: ', ctx.body)
    }, flowOtrosNo)

const flowOtrosNo = addKeyword(['no','nop'])
    .addAnswer(['¿Cuál es tu nivel de estudios?', 'Ninguno, Secundaria, Formación Profesional, Grado universitario, Master o Doctorado'], {capture:true}, (ctx) => {
        console.log('Nivel de estudios: ', ctx.body)
    })
    .addAnswer('¿Recomendarías el servicio de Netflix a tus amigos  o familiares?', {capture:true}, (ctx) => {
        console.log('Nivel de estudios: ', ctx.body)
    }, [flowRecomendationNo,flowRecomendation])

const flowRecomendationNo = addKeyword(['no','nop'])
    .addAnswer('Vaya, no lo recomendarías,  ¿por qué? ¿Qué podemos cambiar?', {capture:true}, (ctx) => {
        console.log('Otras plataformas: ', ctx.body)
    }, flowRecomendation)

const flowRecomendation = addKeyword(['si','sí'])
    .addAnswer('Genial, ¿y por último cuál es tu edad? Introduce solo numeros porfa 🙏 (Ejemplo: 28)', {capture:true}, (ctx) => {
        console.log('Edad: ', ctx.body)
    })
    .addAnswer(['Eh Voilà! ya hemos terminado, ¿Viste? Fue solo un momento y ahora gracias a tu colaboración miles de personas serán ayudadas con tus respuestas.',
               '👉 Muchas gracias por tu tiempo y por usar nuestro servicio'])

const flowPrincipal = addKeyword(['edix','bootcamp'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Soy Eleuterio Hernández y he creado una encuesta para superar el ejercicio de esta semana del Lab 01 de Investigación de Mercados con la suposición de que Netflix necesita información sobre sus usuarios',
            '👉 Te agradezco muchísimo tu participación, tu tiempo es oro. No te preocupes si te equivocas al constar esto es solo una prueba',
            ' Solo te llevará 3 minutos, empecemos… ',
        ]
    )
    .addAnswer('¿Cual es tu nombre?', {capture:true}, (ctx) => {
        console.log('Info nombre: ', ctx.body)
    })
    .addAnswer('¿Cual es tu primer Apellido?', {capture:true}, (ctx) => {
        console.log('Info apellido: ', ctx.body)
    })
    .addAnswer('¿Desde que dispositivo ves Netflix con mayor frecuencia? Televisión, Portatil, Movil o Tablet', {capture:true}, (ctx) => {
        console.log('Dispotivo preferido: ', ctx.body)
    })
    .addAnswer('¿Cómo conociste la plataforma de Netflix?', {capture:true}, (ctx) => {
        console.log('Recomendado por : ', ctx.body)
    })
    .addAnswer('Del 1 al 10 cómo de sencillo te parece usar Netflix (Siendo 10 muy fácil de usar, y 1 muy difícil)', {capture:true}, (ctx) => {
        console.log('Recomendado por : ', ctx.body)
    })
    .addAnswer('¿Tienes contratados otros servicios de streaming además de Netflix? Contesta *si* o *no*', {capture:true}, (ctx) => {
        console.log('Recomendado por : ', ctx.body)
    }, [flowOtrosSi,flowOtrosNo])


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
