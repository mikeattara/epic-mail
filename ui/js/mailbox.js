const modal = document.getElementById("newMessageModal");
const modalBtn = document.getElementById("modalBtn");
const closeModalBtn = document.getElementById("closeBtn");
// const modalContent = document.querySelector('.modal-content');

modalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", close);

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  // modalContent.style.animationName = 'modal-close'
  modal.style.display = "none";
}

function close(ev) {
  if (ev.target == modal) {
    closeModal();
  }
}
