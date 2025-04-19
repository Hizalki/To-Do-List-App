document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("add-task");
    const todoList = document.getElementById("todo-tasks");
    const doneList = document.getElementById("done-tasks");
    const taskInput = document.getElementById("task-input");
    const priorityInput = document.getElementById("priority");
    const taskDate = document.getElementById("task-date");
    const filterDate = document.getElementById("filter-date");
    const deleteAllBtn = document.getElementById("delete-all");
    const currentDate = document.getElementById("current-date");
  
    // Tampilkan tanggal saat ini
    const now = new Date();
    currentDate.textContent = now.toDateString();
  
    function createTaskElement(text, priority, date) {
      const li = document.createElement("li");
      li.className = "task-item";
      const today = new Date().toISOString().split("T")[0];
      if (date && date < today) li.classList.add("overdue");
  
      li.innerHTML = `
        <div class="content">
          <strong>${text}</strong>
          <span class="priority">${priority.toUpperCase()} — ${date}</span>
        </div>
        <input type="checkbox" />
      `;
  
      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          li.classList.add("done");
          doneList.appendChild(li);
        } else {
          li.classList.remove("done");
          todoList.appendChild(li);
        }
      });
  
      return li;
    }
  
    addBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      const priority = priorityInput.value;
      const date = taskDate.value;
  
      if (!text || !date) return alert("Tugas dan tanggal harus diisi!");
  
      const taskEl = createTaskElement(text, priority, date);
      todoList.appendChild(taskEl);
  
      taskInput.value = "";
      taskDate.value = "";
    });
  
    filterDate.addEventListener("change", () => {
      const selected = filterDate.value;
      [...todoList.children].forEach(task => {
        const date = task.querySelector(".priority").textContent.split("—")[1].trim();
        task.style.display = date === selected ? "flex" : "none";
      });
    });
  
    deleteAllBtn.addEventListener("click", () => {
      todoList.innerHTML = "";
      doneList.innerHTML = "";
    });
  });
  