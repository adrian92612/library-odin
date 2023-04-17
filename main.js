let library = [];

class Book {
  constructor(title = "Unkown", author = "Unkown", pagesRead = 0, pages = 0) {
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.pages = pages;
  }
}

const form = document.getElementById("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pagesRead = document.getElementById("pages-read");
const pages = document.getElementById("pages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle =
    title.value.replace(/\s+/, "") === "" ? "Unkown" : title.value;
  const bookAuthor =
    author.value.replace(/\s+/, "") === "" ? "Unkown" : author.value;
  const read = pagesRead.value;
  const totalPage = pages.value;
  if (read > totalPage) {
    console.log("cannot be");
    return;
  }
  const newBook = new Book(bookTitle, bookAuthor, pagesRead.value, pages.value);
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
        <div class='items' date-index='${i}'>
            <p>${library[i].title}</p>
            <p>${library[i].author}</p>
            <p>${library[i].pagesRead}</p>
            <p>${library[i].pages}</p>
            <button onclick="removeBook(${i})">Remove</button>
            <button onClick='editBookEntry(${i})'>Edit</button>
        </div>
    `;
    bookCard.classList.add("card-cont");
    container.appendChild(bookCard);
  }
}
function removeBook(index) {
  library.splice(index, 1);
  renderBooks();
}

const editForm = document.getElementById("edit-form");
const editTitle = document.getElementById("edit-title");
const editAuthor = document.getElementById("edit-author");
const editPagesRead = document.getElementById("edit-pages-read");
const editPages = document.getElementById("edit-pages");
let editCurrentIndex = "";

function editBookEntry(i) {
  editTitle.value = library[i].title;
  editAuthor.value = library[i].author;
  editPagesRead.value = library[i].pagesRead;
  editPages.value = library[i].pages;
  editCurrentIndex = i;
  editForm.setAttribute("style", "transform: translate(-50%, -50%) scale(1)");
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  library[editCurrentIndex].title = editTitle.value;
  library[editCurrentIndex].author = editAuthor.value;
  library[editCurrentIndex].pagesRead = editPagesRead.value;
  library[editCurrentIndex].pages = editPages.value;

  editForm.removeAttribute("style");
  renderBooks();
});
