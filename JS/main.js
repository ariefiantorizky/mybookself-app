const UNCOMPLETED_READ_BOOK = "list-book-uncompleted";
const COMPLETED_READ_BOOK = "list-book-completed";
const BOOK_ID = "itemId";

function addBook() {
    const bookTitle = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const publication = document.getElementById("publication").value;

    const uncompletedRead = document.getElementById(UNCOMPLETED_READ_BOOK);

    const bookList = createListBook(bookTitle, author, publication);

    const bookObject = composeBookObject(bookTitle, author, publication, false);
    bookList[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    uncompletedRead.append(bookList);

    updateDataToStorage();

    form.reset()
}

function createListBook(title, author, publication, isCompleted) {
    const textList = ["Penulis : ", "Tahun Terbit : "];

    const bookTitle = document.createElement("h3");
    bookTitle.innerHTML = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = textList[0] + author;

    const public = document.createElement("span");
    public.innerHTML = textList[1] + publication;

    const containerButton = document.createElement("div");
    containerButton.classList.add("container-button");

    if (isCompleted) {
        containerButton.append(createUndoButton(), createRemoveButton())
    } else {
        containerButton.append(createCompleteButton(), createRemoveButton())
    }

    const container = document.createElement("div");
    container.classList.add("book");

    container.append(bookTitle, bookAuthor, public, containerButton);


    return container;
}

function addBookToCompleted(book) {
    const completedRead = document.getElementById(COMPLETED_READ_BOOK);
    const bookTitle = book.querySelector(".book > h3").innerText;
    const author = book.querySelector(".book > p").innerText;
    const public = book.querySelector(".book > span").innerText;

    const newBook = createListBook(bookTitle, author, public, true);

    const bookItem = findBook(book[BOOK_ID]);
    bookItem.isCompleted = true;
    newBook[BOOK_ID] = bookItem.id;

    completedRead.append(newBook);

    book.remove();

    updateDataToStorage();
}

function createButton(iconType, eventListener) {
    const button = document.createElement("button");
    const icon = document.createElement("i");

    icon.classList.add("bi", iconType);
    button.append(icon);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
}

function createCompleteButton() {

    return createButton("bi-check", function (event) {
        addBookToCompleted(event.target.parentElement.parentElement.parentElement);

        completeModals();
    });

}

function completeModals() {
    const popup = document.querySelector(".container-popup");
    popup.classList.toggle("modals");

    return popup;
}

function removeListBook(book) {
    const bookPosition = findBookList(book[BOOK_ID]);
    books.splice(bookPosition, 1);

    book.remove();
    updateDataToStorage();
}

function createRemoveButton() {

    return createButton("bi-trash", function (event) {
        removeListBook(event.target.parentElement.parentElement.parentElement);

        removeModals();
    })
}

function removeModals() {
    const removeBookModals = document.querySelector(".container-popup-remove");
    removeBookModals.classList.toggle("modals");

    return removeBookModals;
}

function undoBookFromList(book) {
    const uncompletedRead = document.getElementById(UNCOMPLETED_READ_BOOK);
    const bookTitle = book.querySelector(".book > h3").innerText;
    const author = book.querySelector(".book > p").innerText;
    const publication = book.querySelector(".book > span").innerText;

    const newBook = createListBook(bookTitle, author, publication, false);

    const bookItem = findBook(book[BOOK_ID]);
    bookItem.isCompleted = false;
    newBook[BOOK_ID] = bookItem.id;

    uncompletedRead.append(newBook);

    book.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("bi-arrow-repeat", function (event) {
        undoBookFromList(event.target.parentElement.parentElement);
    })
}