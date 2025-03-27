const $qrContainer = document.createElement('div')
$qrContainer.className = 'qr-container'

document.forms[0].addEventListener('submit', (e) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  const $error = document.querySelector('#error')
  let url;
  
  // This try catch validates if the url is a valid url. If it's not, the "catch" will show a message and stop the code
  try {
    url = new URL(formData.get('url'))
  }catch(e) {
    $error.innerText = 'The URL is not a valid URL (ˉ﹃ˉ)'
    $error.classList.add('error-appears')

    return false
  }

  const qr = new QRCode($qrContainer, {
    text: formData.get('url'),
    width: 150,
    height: 150
  })

  document.querySelector('.main-container').classList.remove('main-container__jusfity-center')
  document.querySelector('.main-container').innerHTML = 
  `
    <img class="logo logo--margin" src="resources/Logo-small.svg" alt="QRCODE's Logo">

    <div class="qr-actions">
      <a id="download" class="btn" href="#" download>
        Download
        <img src="resources/Load_circle_duotone.svg" alt="Download Icon">
      </a>
      <a id="copy" class="btn" href="#">
        Share
        <img src="resources/link_alt.svg" alt="Share Icon">
      </a>
    </div>
  `

  // Insert the QR Container after the logo
  document.querySelector('.main-container img').after($qrContainer)

  // Button "Download"
  document.querySelector('#download').addEventListener('click', (e) => {
    e.currentTarget.href = document.querySelector('.qr-container img').src
  })

  // Button "Copy"
  document.querySelector('#copy').addEventListener('click', (e) => {
    navigator.clipboard.writeText(document.querySelector('.qr-container img').src);

    const $notification = document.createElement('p')
    $notification.innerText = 'Copied to the clipboard'
    $notification.className = 'notification'

    document.body.append($notification)

    $notification.addEventListener('animationend', () => {
      $notification.remove()
    })
  })
})