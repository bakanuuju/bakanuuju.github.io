const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function findBook(bookId) {
    for (bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

function makeBook(bookObject) {
    const { id, title, author, year, isCompleted } = bookObject;

    const bookTitle = document.createElement('h3');
    bookTitle.innerText = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = 'Penulis: ' + author;

    const releasedYear = document.createElement('p');
    releasedYear.innerText = 'Tahun: ' + year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('description');
    textContainer.append(bookTitle, bookAuthor, releasedYear);

    if (isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.setAttribute('class', 'yellow');
        undoButton.innerHTML = "<svg fill=\"none\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M6.03 2.47a.75.75 0 0 1 0 1.06L4.81 4.75H11A6.25 6.25 0 1 1 4.75 11a.75.75 0 0 1 1.5 0A4.75 4.75 0 1 0 11 6.25H4.81l1.22 1.22a.75.75 0 0 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0Z\" fill=\"#ffffff\" class=\"fill-212121\"></path> </svg>";

        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(id);
        });

        const trashButton = document.createElement('button');
        trashButton.setAttribute('class', 'red');
        trashButton.innerHTML = "<svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M0 0h48v48H0V0z\" fill=\"none\"></path> <path d=\"M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24 2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z\" fill=\"#ffffff\" class=\"fill-000000\"></path> <path d=\"M0 0h48v48H0z\" fill=\"none\"></path> </svg>";

        trashButton.addEventListener('click', function () {
            removeBook(id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'action');

        buttonContainer.append(undoButton, trashButton);

        const container = document.createElement('article');
        container.classList.add('bookItem');
        container.append(textContainer);
        container.append(buttonContainer);
        container.setAttribute('id', `book-${bookItem.id}`);

        return container;

    } else {
        const checkButton = document.createElement('button');
        checkButton.setAttribute('class', 'green');
        checkButton.innerHTML = "<svg viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d =\"M5.9 8.1 4.5 9.5 9 14 19 4l-1.4-1.4L9 11.2 5.9 8.1ZM18 10c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.8 0 1.5.1 2.2.3L13.8.7C12.6.3 11.3 0 10 0 4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10h-2Z\" fill =\"#ffffff\" fill-rule=\"evenodd\" class=\"fill-000000\"></path></svg > ";

        checkButton.addEventListener('click', function () {
            addBookToCompleted(id);
        });

        const trashButton = document.createElement('button');
        trashButton.setAttribute('class', 'red');
        trashButton.innerHTML = "<svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M0 0h48v48H0V0z\" fill=\"none\"></path> <path d=\"M12 38c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V14H12v24zm4.93-14.24 2.83-2.83L24 25.17l4.24-4.24 2.83 2.83L26.83 28l4.24 4.24-2.83 2.83L24 30.83l-4.24 4.24-2.83-2.83L21.17 28l-4.24-4.24zM31 8l-2-2H19l-2 2h-7v4h28V8z\" fill=\"#ffffff\" class=\"fill-000000\"></path> <path d=\"M0 0h48v48H0z\" fill=\"none\"></path> </svg>";

        trashButton.addEventListener('click', function () {
            removeBook(id);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'action');

        buttonContainer.append(checkButton, trashButton);

        const container = document.createElement('article');
        container.classList.add('bookItem');
        container.append(textContainer);
        container.append(buttonContainer);
        container.setAttribute('id', `book-${bookItem.id}`);

        return container;

    }
}

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const releasedYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, releasedYear, isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));

    saveData();
}

function removeBook(bookId) {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

document.addEventListener('DOMContentLoaded', function () {
    if (isStorageExist()) {
        loadDataFromStorage();
    }

    const submitForm = document.getElementById('inputBook');

    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    })
});


document.addEventListener(RENDER_EVENT, function () {
    const readingItem = document.getElementById('readingItem');
    const completedItem = document.getElementById('completedItem');

    readingItem.innerHTML = '';
    completedItem.innerHTML = '';

    for (bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (bookItem.isCompleted) {
            completedItem.append(bookElement);
        } else {
            readingItem.append(bookElement);
        }
    }
});

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});