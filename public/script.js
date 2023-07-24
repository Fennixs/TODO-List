const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addToList = (item) => {
  let li = document.createElement("li");
  if(item.completed) li.classList.add('checked');
  
  li.onclick = (e) => {
    e.target.classList.toggle("checked");
    const completed = e.target.classList.contains('checked');
    const itemId = item.id;
    updateList(itemId, completed);
  }

  li.innerText = item.text;
  listContainer.appendChild(li);
  let span = document.createElement("span");

  span.onclick = (e) => { 
    deleteData(item.id)
      .then(() => {
        e.target.parentElement.remove();
      })
      .catch(console.error);
  };

  span.innerText = "\u00d7";
  li.appendChild(span);
};

const updateList = async (id, completed) => {
  try {
    const response = await fetch(`/api/list`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed, id }) 
    });
  } catch (error) {
    console.error('Error while completing the item:', error);
  }
};

const deleteData =  (id) =>  
  fetch(`/api/list`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id }) 
  });



function addTask() {
  if (inputBox.value === "") {
    return alert("Please write a Task!");
  }

  fetch("/api/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: inputBox.value,
    }),
  })
    .then((res) => res.json())
    .then((items) => {
      items.map(addToList);
      inputBox.value = "";
    })
    .catch(console.error);
}

fetch("/api/list")
  .then((res) => res.json())
  .then((todoList) => {
    todoList.map(addToList);
  })
  .catch(console.error);
