let ingridients = {
    broth: ['мясной', "рыбный", "овощной"],
    noodle: ["рисовая", "пшеничная", "мисо", "фунчоза", "гречневая"],
    stock: ['свинина', "ростбиф", "цыпленок-гриль","бекон", "тунец", "креветка", "окунь", "лосось", "угорь", "кальмар", "осьминог"],
    toppings: ["баклажаны", "томаты", "перец", "такуан", "соя", "чука", "кукуруза", "вакамэ", "шпинат", "мояши", "дайкон", "брокколи", "яйцо", "бобы", "сыр", "шампиньоны", "шиитаке","древесные грибы", "вешенки", "номэко"],
    sauces: ["Ким Чи", "айсберг", "спайси", "унаги","терияки", "хойсин", "чили", "ореховый", "шрирача"],
}

let {broth} = ingridients;

function createList(ingridients){
    let lists = document.querySelector('.ramen__lists');
    

    for (let arr in ingridients) {

        let block = document.createElement('div')
        block.classList.add('ingridient')
        block.id = arr
        lists.appendChild(block)

        let list = document.createElement('ul')
        list.classList.add('ramen__list')
        block.appendChild(list)

        let button = document.createElement('button')
        button.innerHTML = 'Далее'
        button.classList.add('next__btn')
        block.appendChild(button)

        ingridients[arr].forEach(element => {
            let ingridient = element.charAt(0).toUpperCase() + element.slice(1);
            list.insertAdjacentHTML("afterbegin", 
            `<li class="ramen__ingridient"> 
                <p class="ingridient__name">${ingridient}</p>
                <div class="counter">
                    <button class="sub-btn">-</button>
                    <p>0</p>
                    <button class="add-btn">+</button>
                </div>
            </li>`  
            )
        });
    }      
}

createList(ingridients)
document.querySelector('.ingridient').classList.add('open')


function toggle(target) {

    document.querySelectorAll('.ramen__tab--item').forEach(element => {
        element.classList.remove('active');
    })
    target.classList.add('active');


    document.querySelectorAll('.ingridient').forEach(element => element.classList.remove('open'));
    let id = '#' + target.id
    document.querySelector('.ramen__lists').querySelector(id).classList.add('open')
}


document.querySelector('.ramen__tab--list').addEventListener('click', e => {
    if (e.target.classList.contains('ramen__tab--item')){
        toggle(e.target)
    }
})


document.querySelector('.ramen__lists').addEventListener('click', e => {
    if(e.target.classList.contains('next__btn')){
        let id = '#' + e.target.parentNode.id
        if (document.querySelector('.ramen__tab--list').querySelector(id).nextElementSibling){
            toggle(document.querySelector('.ramen__tab--list').querySelector(id).nextElementSibling)
        }
    }
})