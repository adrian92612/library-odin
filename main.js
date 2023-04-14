let library = [];

class Book {
  constructor(title = "Unkown", author = "Unkown", pages = 0) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

const form = document.getElementById("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new Book(title.value, author.value, pages.value);
  library.push(newBook);
  renderBooks();
  form.reset();
});

const container = document.getElementById("container");
function renderBooks() {
  container.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.innerHTML = `
        <div>
            <h3>Title</h3>
            <p>${library[i].title}</p>
        </div>
        <div>
            <h3>Author</h3>
            <p>${library[i].author}</p>
        </div>
        <div>
            <h3>Pages</h3>
            <p>${library[i].pages}</p>
        </div>
        <div>
            <button onClick="removeBook(${i})">Remove</button>
        </div>
    `;
    bookCard.classList.add("card-cont");
    container.appendChild(bookCard);
  }
}

function removeBook(index) {
  library.splice(index, 1);
  console.log("adsf");
  renderBooks();
}
