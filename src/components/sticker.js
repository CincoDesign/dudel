class Sticker {
  static load(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }
}

const stamp = (data, ctx) => {
  let drawing = false
  let x = 0
  let y = 0

  const down = () => {
    drawing = true
  }

  const stop = () => {
    drawing = false
  }

  const move = event => {
    x = event.clientX - data.width / 4
    y = event.clientY - data.height / 4
  }

  const draw = () => {
    if (drawing) {
      ctx.drawImage(data, x, y, data.width / 2, data.height / 2)
    }
  }

  window.addEventListener('mousedown', down)
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', stop)

  return Object.freeze({
    draw,
  })
}

export { Sticker, stamp }
