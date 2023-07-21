console.log("Welcome to NotePia!");
showNotes();
// If user adds a note, add it to the localStorage->
let addBtn = document.getElementById("add_btn");
addBtn.addEventListener("click", (e) => {
  let addtxt = document.getElementById("add_txt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addtxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addtxt.value = "";
  showNotes();
});

// To show the notes from localStorage->
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="note_card my-2 mx-2" style="width: 18rem;">
    <div class="card-body border border-success p-4" style= "">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-success">Delete Note</button>
    </div>
</div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length == 0) {
    notesElm.innerHTML =
      'Nothing to show! Use "Add a Note" section above to add notes';
  } else {
    notesElm.innerHTML = html;
  }
}

//To delete a note->
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//To search->
let search = document.getElementById("search_txt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note_card");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
