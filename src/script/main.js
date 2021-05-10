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
                <p class="ingridient__name" id='${ingridient}'>${ingridient}</p>
                <div class="counter">
                    <button class="sub-btn">-</button>
                    <p class='number'>0</p>
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

let dish = {
    broth: [],
    noodle: [],
    stock: [],
    toppings: [],
    sauces: [],
};

let listOfIng = document.querySelector('.ramen__lists')

listOfIng.addEventListener('click', e => {
    if (e.target.classList.contains('add-btn')){
        let context = e.target.closest('.ingridient');
        dish[context.id].push(e.target.closest('li').querySelector('.ingridient__name').innerHTML)
        console.log(dish);
        updateCounter(context, dish[context.id]);
        setLocal(dish)
        updateMenu(dish)
    }
})

document.querySelector('.reset').addEventListener('click', () => {
    dish = {
        broth: [],
        noodle: [],
        stock: [],
        toppings: [],
        sauces: [],
    }; 

    updateCounterAll(dish);
    setLocal(dish);
    updateMenu(dish);
})

function updateCounter(target, array){
    target.querySelectorAll('.number').forEach(element => element.innerHTML = 0)
    
        for(let i of array){
            let id = '#'+i
            document.querySelector(id).nextElementSibling.querySelector('.number').innerHTML++
        }
}

function updateCounterAll(dish){
    document.querySelectorAll('.number').forEach(element => element.innerHTML = 0)
    for(let key in dish){
        for(let i of dish[key]){
            let id = '#'+i
            document.querySelector(id).nextElementSibling.querySelector('.number').innerHTML++
        }
    }
}

function setLocal (obj){
    sessionStorage.setItem('dish', JSON.stringify(obj))
}

function getLocal(){
    if(JSON.parse(sessionStorage.getItem('dish'))){
        dish = JSON.parse(sessionStorage.getItem('dish'))
        console.log(dish);
        updateCounterAll(dish)
    }
}

getLocal()

function updateMenu (dish){
    let menu = document.querySelector('.menu')
    menu.innerHTML = '';
    
    for(let key in dish){
        let count = {}
        let item = document.createElement('h2')
        let id = '#'+key
        item.innerText = document.querySelector(id).innerHTML
        item.classList.add('menu__title');
        menu.appendChild(item)

        dish[key].forEach(function(x) { count[x] = (count[x] || 0)+1; });

        for(let ct in count){
            item.insertAdjacentHTML("beforeend", `
                <p class="menu__item">${count[ct]}x ${ct}</p>
            `)
        }
    }
    
}

updateMenu(dish)