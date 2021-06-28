document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  // FORM
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage()
  }
});

document.addEventListener("onbookdatasaved", () => {
  console.log("Data berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
})