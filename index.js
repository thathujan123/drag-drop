var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var userList = document.getElementById("userList");
var draggedItem = null;
userList.addEventListener("dragstart", function (e) {
    draggedItem = e.target;
    draggedItem.classList.add("dragging");
});
userList.addEventListener("dragend", function (e) {
    e.target.classList.remove("dragging");
    draggedItem = null;
});
userList.addEventListener("dragover", function (e) {
    e.preventDefault();
    var afterElement = getDragAfterElement(userList, e.clientY);
    if (draggedItem) {
        if (afterElement == null) {
            userList.appendChild(draggedItem);
        }
        else {
            userList.insertBefore(draggedItem, afterElement);
        }
    }
});
function getDragAfterElement(container, y) {
    var draggableElements = __spreadArray([], container.querySelectorAll(".user-item:not(.dragging)"), true);
    return draggableElements.reduce(function (closest, child) {
        var box = child.getBoundingClientRect();
        var offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}
