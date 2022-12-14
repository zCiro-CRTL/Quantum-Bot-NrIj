import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) return m.reply('Que esta buscando?')
  global.mcarga('proceso', m, conn)
  const { video, channel } = await youtubeSearch(text)
  const listSections = []
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': {
        listSections.push([`โก${v.title}`, [
          ['[ Video ๐ฅ ]', `${usedPrefix}ytv ${v.url} yes`, `Descargar: (${v.url})`],
          ['[ Audio ๐ง ]', `${usedPrefix}yta ${v.url} yes`, `Descargar: (${v.url})`]
        ]])
        return `
๐ *${v.title}* (${v.url})
โ Duraciรณn: ${v.durationH}
โฒ๏ธ Fecha de subida ${v.publishedTime}
๐๏ธ Vistas ${v.view}
      `.trim()
      }
      case 'channel': return `
๐ *${v.channelName}* (${v.url})
๐งโ๐คโ๐ง _${v.subscriberH}_
๐ฅ ${v.videoCount} video(s)
`.trim()
    }
  }).filter(v => v).join('\n\n========================\n\n')
  const msg = await m.reply(teks)
  conn.sendList(m.chat, '๐บ *Bรบsqueda en Youtube* ๐', '\n'+NombreBot+' ๐ฅ', global.wm, 'Lista de descargas', listSections, msg)
}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <busqueda>')
handler.tags = ['servicio']
handler.command = /^yts(earch)?$/i

export default handler
