const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addToList = (text) => {
  let li = document.createElement("li");
  li.innerText = inputBox.value;
  listContainer.appendChild(li);
  let span = document.createElement("span");
  span.innerText = "\u00d7";
  li.appendChild(span);
};

function addTask() {
  if (inputBox.value === "") {
    return alert("Please write a Task!");
  }

  fetch("/api/list", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      Text: inputBox.value,
    }),
  })
    .then((res) => res.json())
    .then((item) => {
      addToList(inputBox.value);
      inputBox.value = "";
    })
    .catch(console.error);
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
  },
  false
);

fetch("/api/list")
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
