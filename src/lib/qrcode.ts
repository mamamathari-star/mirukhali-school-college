import QRCode from 'qrcode'

export async function generateQRCode(text: string): Promise<string> {
  try {
    const dataURL = await QRCode.toDataURL(text, {
      width: 256,
      margin: 2,
      color: { dark: '#1e3a8a', light: '#ffffff' },
    })
    return dataURL
  } catch {
    return ''
  }
}
