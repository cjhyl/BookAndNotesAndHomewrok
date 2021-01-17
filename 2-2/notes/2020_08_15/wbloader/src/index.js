import createHeading from './heading.js'
import './main.css'
import './heading.css'
import icon1 from './icon1.svg'

const heading = createHeading()

document.body.append(heading)

const img1 = new Image()
img1.src=icon1
document.body.append(img1)

import footerHtml from './footer.html'

document.getElementById('footer').innerHTML=footerHtml