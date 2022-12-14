import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return m.reply(`Ejemplo de uso ${usedPrefix}${command} maincra`)
  let playtext = encodeURIComponent(text)
  global.mcarga('proceso', m, conn)
  let vid = (await youtubeSearch(playtext)).video[0]
  if (!vid) return m.reply('VΓ­deo/Audio no encontrado')
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
βοΈ *Titulo:* ${title}
π *Fecha de subida:* ${publishedTime}
β° *Duracion:* ${durationH}
π *Vistas:* ${viewH}
π *Descripcion:* ${description}
  `.trim(), NombreBot+' π₯', thumbnail, url, 'Ver en Youtube πΊ', null, null, [
    ['[ Audio π§ ]', `${usedPrefix}yta ${url} yes`],
    ['[ Video π₯ ]', `${usedPrefix}ytv ${url} yes`],
    ['[ Buscar en Youtube π ]', `${usedPrefix}yts ${url}`]
  ], m)
}
handler.help = ['play2'].map(v => v + ' <busqueda>')
handler.tags = ['servicio']
handler.command = /^play2$/i

handler.exp = 0
handler.limit = false

export default handler

