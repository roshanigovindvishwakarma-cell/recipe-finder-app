let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = null;

const grid = document.getElementById("bookGrid");

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
  grid.innerHTML = "";

  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter").value;

  let filtered = books.filter(b =>
    (b.title.toLowerCase().includes(search) ||
     b.author.toLowerCase().includes(search)) &&
    (filter === "all" || b.status === filter)
  );

  document.getElementById("emptyState").style.display =
    filtered.length === 0 ? "block" : "none";

  filtered.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "card";

    let colorClass =
      book.status === "Read" ? "green" :
      book.status === "Reading" ? "blue" : "yellow";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${book.genre || ""}</p>
      <span class="badge ${colorClass}">${book.status}</span>
      <br><br>
      <button onclick="editBook(${index})">Edit</button>
      <button onclick="deleteBook(${index})">Delete</button>
    `;

    grid.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  document.getElementById("total").textContent = books.length;
  document.getElementById("read").textContent =
    books.filter(b => b.status === "Read").length;
  document.getElementById("reading").textContent =
    books.filter(b => b.status === "Reading").length;
  document.getElementById("want").textContent =
    books.filter(b => b.status === "Want").length;
}

function openForm() {
  document.getElementById("formModal").style.display = "block";
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
  document.getElementById("bookForm").reset();
  editIndex = null;
}

document.getElementById("bookForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
    genre: genre.value,
    pages: pages.value,
    status: status.value
  };

  if (!book.title || !book.author) {
    alert("Title and Author required");
    return;
  }

  if (editIndex !== null) {
    books[editIndex] = book;
  } else {
    books.push(book);
  }

  saveBooks();
  renderBooks();
  closeForm();
});

function editBook(index) {
  const b = books[index];

  title.value = b.title;
  author.value = b.author;
  genre.value = b.genre;
  pages.value = b.pages;
  status.value = b.status;

  editIndex = index;
  openForm();
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

document.getElementById("search").addEventListener("input", renderBooks);
document.getElementById("filter").addEventListener("change", renderBooks);

renderBooks();
