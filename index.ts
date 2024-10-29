const userList = document.getElementById("userList") as HTMLElement;
let draggedItem: HTMLElement | null = null;

userList.addEventListener("dragstart", (e) => {
  draggedItem = e.target as HTMLElement;
  draggedItem.classList.add("dragging");
});

userList.addEventListener("dragend", (e) => {
  (e.target as HTMLElement).classList.remove("dragging");
  draggedItem = null;
});

userList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(userList, e.clientY);
  if (draggedItem) {
    if (afterElement == null) {
      userList.appendChild(draggedItem);
    } else {
      userList.insertBefore(draggedItem, afterElement);
    }
  }
});

function getDragAfterElement(container: HTMLElement, y: number): HTMLElement | null {
  const draggableElements = [...container.querySelectorAll(".user-item:not(.dragging)")];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element as HTMLElement | null;
}
