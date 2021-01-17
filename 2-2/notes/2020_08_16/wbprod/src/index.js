import createHeading from './heading.js'
import './main.css'
import './heading.css'
import icon1 from './icon1.svg'
import icon2 from './icon2.png'

const heading = createHeading()

document.body.append(heading)

const img1 = new Image()
img1.src=icon1
document.body.append(img1)

const img2 = new Image()
img2.src=icon2
document.body.append(img2)

for(let i=1;i<3;i++){
    for(let j=1;j<4;j++){
        const imgTemp=new Image()
        imgTemp.src=`static/images/list${i}_icon${j}.svg`;
        document.body.append(imgTemp)
    }
}

import footerHtml from './footer.html'

document.getElementById('footer').innerHTML=footerHtml

let lastHead=heading;
module.hot.accept('./heading.js',()=>{
    console.log('heading.js 更新了')
    document.body.removeChild(lastHead);
    const newHead=createHeading();
    document.body.appendChild(newHead);
    lastHead=newHead;
})

module.hot.accept('./icon2.png',()=>{
    img2.src=icon2;
})