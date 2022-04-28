const root = document.querySelector('.container');
let liked = JSON.parse(localStorage.getItem('liked'));
if (liked === null) {
    localStorage.setItem('gameSave', []);
    liked = []
}
const types = JSON.parse(localStorage.getItem('type'));
if (types === null) {

    fetch('https://in3.dev/knygos/types/')
        .then(response => response.json())
        .then(type => {
            localStorage.setItem('type', JSON.stringify(type));

        });
}

fetch('https://in3.dev/knygos/')
    .then(response => response.json())
    .then(data => {
        data.map(book => {
            let content = document.createElement('div');
            content.className = 'book';
            root.appendChild(content);
            const bookId = book.type;
            types.map(item => {
                if (bookId === item.id) {
                    content.innerHTML =
                        `
                                <small>${item.title}</small>
                                <h3>${book.title}. (<i>${book.author}</i>)</h3>
                                <img src="${book.img}" alt="${book.title}">
                                <p>Kaina: ${book.price} Eur. </p>
                                <i class="fas fa-thumbs-up this${book.id}"></i>
                                `;


                    const like = document.querySelector(`.this${book.id}`);
                    if (liked.length !== 0) {
                        liked.map(favorite => {
                            if (like.classList.contains(favorite)) {
                                like.classList.add('yellow');
                            }
                        });
                    }

                    like.addEventListener('click', () => {
                        like.classList.toggle('yellow');
                        if (like.classList.contains('yellow')) {
                            liked.push(`this${book.id}`);
                        } else {
                            liked = liked.filter(id => id !== `this${book.id}`);
                        }
                        localStorage.setItem('liked', JSON.stringify(liked))
                    })
                }
            })
        })
    })