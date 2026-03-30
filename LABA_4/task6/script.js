function libraryManagement() {
  let books = [
    { title: "Кобзар", author: "Шевченко", genre: "Поезія", pages: 300, isAvailable: true }
  ];
  console.log("Завдання 6.1:", [...books]);

  function addBook(title, author, genre, pages) {
    books.push({ title, author, genre, pages, isAvailable: true });
  }

  function removeBook(title) {
    books = books.filter(b => b.title !== title);
  }

  function findBooksByAuthor(author) {
    return books.filter(b => b.author === author);
  }

  function toggleBookAvailability(title, isBorrowed) {
    let book = books.find(b => b.title === title);
    if (book) book.isAvailable = !isBorrowed;
  }

  function sortBooksByPages() {
    books.sort((a, b) => a.pages - b.pages);
  }

  function getBooksStatistics() {
    let total = books.length;
    let available = books.filter(b => b.isAvailable).length;
    let avgPages = total === 0 ? 0 : books.reduce((s, b) => s + b.pages, 0) / total;
    return { total, available, borrowed: total - available, avgPages };
  }

  addBook("1984", "Оруелл", "Антиутопія", 328);
  console.log("Завдання 6.2:", [...books]);
  
  toggleBookAvailability("Кобзар", true);
  console.log("Завдання 6.5:", [...books]);
  
  sortBooksByPages();
  console.log("Завдання 6.6:", [...books]);
  
  console.log("Завдання 6.7:", getBooksStatistics());
}
libraryManagement();