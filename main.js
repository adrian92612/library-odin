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
  if (
    Number(pagesRead.value) > Number(pages.value) ||
    pagesRead.value < 0 ||
    pages.value < 0
  ) {
    return;
  }
  const newBook = new Book(
    title.value,
    author.value,
    pagesRead.value,
    pages.value
  );
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
            <p class='type1'>${library[i].title}</p>
            <p class='type1'>${library[i].author}</p>
            <p class='type2'>${library[i].pagesRead}</p>
            <p class='type2'>${library[i].pages}</p>
            <button onclick="removeBook(${i})">Remove</button>
            <button onClick='editBookEntry(${i})'>Edit</button>
        </div>
    `;
    bookCard.classList.add("card-cont");
    container.appendChild(bookCard);
  }
}
function removeBook(index) {
  if (editForm.hasAttribute("style")) return;
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
  if (
    Number(editPagesRead.value) > Number(editPages.value) ||
    editPagesRead.value < 0 ||
    editPages.value < 0
  ) {
    return;
  }
  library[editCurrentIndex].title = editTitle.value;
  library[editCurrentIndex].author = editAuthor.value;
  library[editCurrentIndex].pagesRead = editPagesRead.value;
  library[editCurrentIndex].pages = editPages.value;

  editForm.removeAttribute("style");
  renderBooks();
});
