let library = [];

class Book {
  constructor(title, author, published, acquired, pagesRead, pages) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.acquired = acquired;
    this.pagesRead = pagesRead;
    this.pages = pages;
  }
}

const form = document.getElementById("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const published = document.getElementById("published");
const acquired = document.getElementById("acquired");
const pagesRead = document.getElementById("pages-read");
const pages = document.getElementById("pages");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    Number(pagesRead.value) > Number(pages.value) ||
    pagesRead.value < 0 ||
    pages.value < 0
  ) {
    errorMsg.setAttribute("style", "visibility:visible");
    return;
  }
  const newBook = new Book(
    title.value,
    author.value,
    published.value,
    acquired.value,
    pagesRead.value,
    pages.value
  );
  library.push(newBook);
  renderBooks();
  errorMsg.removeAttribute("style");
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
            <p class='type2'>${library[i].published}</p>
            <p class='type2'>${library[i].acquired}</p>
            <p class='type3'>${library[i].pagesRead}</p>
            <p class='type3'>${library[i].pages}</p>
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
