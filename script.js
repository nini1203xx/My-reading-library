const addButton = document.querySelector(".toolbar button");
const bookList = document.querySelector(".book-list");

// Lấy danh sách truyện đã lưu
let books = JSON.parse(localStorage.getItem("myBooks")) || [];

// Lưu danh sách truyện
function saveBooks() {
    localStorage.setItem("myBooks", JSON.stringify(books));
}

// Hiển thị truyện
function showBooks() {
    bookList.innerHTML = "";

    books.forEach((book, index) => {
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

// Thêm truyện
addButton.addEventListener("click", function () {
    const title = prompt("Tên truyện là gì?");

    if (!title || !title.trim()) {
        return;
    }

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

    // Lưu vào localStorage
    saveBooks();

    // Hiển thị lại danh sách
    showBooks();
});

// Xóa truyện
bookList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const index = Number(event.target.dataset.index);

        books.splice(index, 1);

        saveBooks();
        showBooks();
    }
});

// Hiển thị truyện khi mở web
showBooks();
