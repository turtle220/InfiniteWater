import Jimp from 'jimp'

export function createBase64Image (imageUrl) {
  return new Promise((resolve, reject) => {
    Jimp.read(imageUrl, function (err, image) {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      if (!image) {
        reject(err)
        return
      }

      image.getBase64(Jimp.MIME_PNG, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        image.rgba(false)
        resolve(data)
      })
    })
  })
}
