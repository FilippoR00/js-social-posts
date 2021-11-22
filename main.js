const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


const content = document.querySelector(".posts-list");
let temp = "";

// funzione che strapola le inziali di una stringa
function initials(name){
    let temp = name[0];
    for (let i = 0; i < name.length; i++) {
        if(name[i] == " "){
            temp += name[i + 1];
        }
    }
    return `<div class="profile-pic-default"><span>${temp}</span></div>`;
}

// funzione che inverte la data 
function reverseDate(date){
    let temp = "";
    temp = date.split("-").reverse().join("-");
    return temp;
}

// faccio un ciclo che scorre e inzializza la pagina in modo dinamico
for (let i = 0; i < posts.length; i++) {
    // creo le variabili che mi serviranno per formare la parte HTML dinamica da inserire del container 
    const {name, image} = posts[i].author;
    let userPhoto = "";
    let data = reverseDate(posts[i].created);
    if(image == null){

        userPhoto = initials(posts[i].author.name);
    } else {
        userPhoto = `<img class="profile-pic" src="${image}" alt="${name}">`;
    }

    temp += `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">
                <div class="post-meta__icon">
                    ${userPhoto}
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${posts[i].author.name}</div>
                    <div class="post-meta__time">${data}</div>
                </div>
            </div>
        </div>
        <div class="post__text">${posts[i].content}</div>
        <div class="post__image">
            <img src="${posts[i].media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${posts[i].id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${posts[i].id}" class="js-likes-counter">${posts[i].likes}</b> persone
                </div>
            </div>
        </div>
    </div>
    `

    
}
// incollo l'HTML nel container 
content.innerHTML = temp;

// creo una variabile che memorizzi il pulsante e che ad ogni click tolga e aggiunga una determinata classe. Se il bottone risulta cliccato (in base alla classe) aumento la variabile sia nella pagina che nell'array, quando verrà disattivato diminuisco il valore sia nella pagina che nell'array 
let button = document.querySelectorAll(".like-button");
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function () {
        event.preventDefault();
        const like = document.getElementById("like-counter-" + (i + 1));
        button[i].classList.toggle("like-button--liked");
        if (button[i].classList.contains("like-button--liked")) {
            like.innerHTML = parseInt(document.getElementById("like-counter-" + (i + 1)).innerText) + 1;
            posts[i].likes++;
        } else {
            like.innerHTML = parseInt(document.getElementById("like-counter-" + (i + 1)).innerText) - 1;
            posts[i].likes--;
        }    
    });
}