export default ()=>{
    const ele = document.createElement('h2')

    ele.textContent = 'Hello world'
    ele.addEventListener('click',()=>{
        alert('Hello webpack')
    })
    return ele;
}