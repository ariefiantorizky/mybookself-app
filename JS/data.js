const STORAGE_KEY = "BOOK_APP";

let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");

        return false;
    }

    return true;
}

function saveBookData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);

    document.dispatchEvent(new Event("onbookdatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) {
        saveBookData()
    }
}

function composeBookObject(title, author, publication, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        publication,
        isCompleted
    };
}

function findBook(bookID) {
    for (book of books) {
        if (book.id === bookID) {
            return book;
        }
    }

    return null;
}

function findBookList(bookID) {
    let index = 0;

    for (book of books) {
        if (books.id === bookID) {
            return index;
        }

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ_BOOK);
    const listCompleted = document.getElementById(COMPLETED_READ_BOOK);

    for (book of books) {
        const newBook = createListBook(book.title, book.author, book.publication, book.isCompleted);
        newBook[BOOK_ID] = book.id;

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook)
        }
    }
}