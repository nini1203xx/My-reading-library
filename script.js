
const addButton = document.querySelector(".toolbar button");
const bookList = document.querySelector(".book-list");

let books = JSON.parse(localStorage.getItem("myBooks")) || [];

function saveBooks() {
    localStorage.setItem("myBooks", JSON.stringify(books));
}
   
function showBooks(keyword = "") {
    bookList.innerHTML = "";

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword.toLowerCase()) ||
        book.author.toLowerCase().includes(keyword.toLowerCase())
    );

    filteredBooks.forEach((book) => {
        const index = books.indexOf(book);

        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <div class="cover">📖</div>
            <h3>${book.title}</h3>
            <p>✍️ ${book.author || "Chưa rõ tác giả"}</p>
            <p>⭐ ${book.rating || "Chưa đánh giá"}</p>
            <span>${book.status}</span>
            <button class="delete-button" data-index="${index}">
                Xóa truyện
            </button>
        `;

        bookList.appendChild(card);
    });
}

addButton.addEventListener("click", function () {
    const title = prompt("Tên truyện là gì?");
    if (!title || !title.trim()) return;

    const author = prompt("Tên tác giả:");
    const rating = prompt("Đánh giá truyện (ví dụ: 5.0):");

    const status = prompt(
        "Trạng thái:\n1. Đang đọc\n2. Đã đọc\n3. Muốn đọc",
        "1"
    );

    const statusText = {
        "1": "📖 Đang đọc",
        "2": "✅ Đã đọc",
        "3": "🌷 Muốn đọc"
    };

    books.push({
        title: title.trim(),
        author: author || "",
        rating: rating || "",
        status: statusText[status] || "📖 Đang đọc"
    });

    saveBooks();
    showBooks();
});

bookList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const index = Number(event.target.dataset.index);
        books.splice(index, 1);
        saveBooks();
        showBooks();
    }
});

const searchInput = document.querySelector(".toolbar input");

searchInput.addEventListener("input", function () {
    showBooks(this.value);
});

showBooks();
