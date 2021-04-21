let range = document.querySelector('#customRange2')
let number = 4
range.addEventListener('input', e => {
    number = range.value
    document.querySelector('#number-of-rolls').innerHTML = `Вы выбрали ${number} роллов`
    
})



document.querySelector('.btn-primary').addEventListener('click', e => {
    range.disabled = true
})

document.querySelector('.btn-secondary').addEventListener('click', e => {
    if(range.disabled){
        range.disabled = false
    }else {
        number = 4;
        range.value = 4;
        document.querySelector('#number-of-rolls').innerHTML = `Вы выбрали ${number} роллов`
    }
})

let form = document.querySelector('.form')


form.addEventListener('input', calculate)

function calculate(){
    let total = 0
    form.querySelectorAll('input').forEach(item => {
        if(item.checked){
            total += Number(item.value);
        }
    })
    document.querySelector('#total').innerText = `Всего: ${total}р`
    return total
}