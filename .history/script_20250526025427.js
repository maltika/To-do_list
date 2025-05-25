const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value = "";
    saveData();
}

// ✅ click สำหรับเช็คหรือปิด
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// ✅ double-click สำหรับแก้ไข
listContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        if (e.target.classList.contains("checked")) return;

        let currentText = e.target.firstChild.textContent.trim();
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.style.all = "unset";
        input.style.font = "inherit";
        input.style.width = "100%";

        e.target.innerHTML = "";
        e.target.appendChild(input);
        input.focus();

        input.addEventListener("blur", () => {
            if (input.value.trim() !== "") {
                e.target.innerHTML = input.value;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                e.target.appendChild(span);
                saveData();
            } else {
                e.target.remove();
                saveData();
            }
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
});

function saveData(){
    localStorage.setItem("data" , listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();