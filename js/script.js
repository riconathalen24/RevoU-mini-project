const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const deleteAllBtn = document.getElementById("delete-all");
const filterBtn = document.getElementById("filter-btn");

let ascending = true; 

function checkEmpty() {
  if (todoList.children.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No task found</td>
      </tr>
    `;
  }
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill in both fields!");
    return;
  }

  if (todoList.querySelector(".empty")) {
    todoList.innerHTML = "";
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td>Not Yet</td>
    <td>
      <button class="done-btn">Done</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  const doneBtn = row.querySelector(".done-btn");
  doneBtn.style.border = "2px solid #4CAF50";
  doneBtn.style.backgroundColor = "#4CAF50"; 
  doneBtn.style.color = "white";
  doneBtn.style.padding = "6px 12px";
  doneBtn.style.borderRadius = "6px";
  doneBtn.style.cursor = "pointer";
  doneBtn.style.fontWeight = "bold";

  const deleteBtn = row.querySelector(".delete-btn");
  deleteBtn.style.border = "2px solid #FF5252";
  deleteBtn.style.backgroundColor = "#FF5252"; 
  deleteBtn.style.color = "white";
  deleteBtn.style.padding = "6px 12px";
  deleteBtn.style.borderRadius = "6px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontWeight = "bold";

  doneBtn.addEventListener("click", () => {
    const statusCell = row.children[2];
    statusCell.textContent =
      statusCell.textContent === "Not Yet" ? "Accomplished" : "Not Yet";
  });

  deleteBtn.addEventListener("click", () => {
    row.remove();
    checkEmpty();
  });

  todoList.appendChild(row);

  todoInput.value = "";
  dateInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  todoList.innerHTML = "";
  checkEmpty();
});

filterBtn.addEventListener("click", () => {
  const rows = Array.from(todoList.querySelectorAll("tr:not(.empty)"));
  if (rows.length === 0) return;

  rows.sort((a, b) => {
    const dateA = new Date(a.cells[1].innerText);
    const dateB = new Date(b.cells[1].innerText);
    return ascending ? dateA - dateB : dateB - dateA;
  });

  todoList.innerHTML = "";
  rows.forEach((row) => todoList.appendChild(row));

  ascending = !ascending;
});

checkEmpty();