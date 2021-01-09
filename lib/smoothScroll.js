export default async function smoothScrollForAll () {
  const smoothscroll = await import('smoothscroll-polyfill')
  smoothscroll.polyfill()
}
