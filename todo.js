const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submit');
let todoList = document.querySelector('.todo-ul');
const todoLi = document.querySelectorAll('.todo-li');
const deletePopup = document.querySelector('.delete-popup');

input.addEventListener('input', () => {
  if (input.value == '') {
    submitBtn.innerHTML = '+';
    submitBtn.style.backgroundColor = 'rgb(194, 183, 209)';
  } else {
    submitBtn.style.backgroundColor = 'rgb(225, 217, 235)';
    submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i>';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputVal = input.value;
  const li = document.createElement('li');
  li.className = 'todo-li';
  li.innerText = inputVal;
  const spanWrapper = document.createElement('div');
  const strong = document.createElement('strong');
  strong.className = 'delete';
  strong.innerText = 'x';
  const infoIcon = document.createElement('span');
  infoIcon.className = 'info';
  infoIcon.innerHTML = '<i class="fa fa-info-circle"></i>';
  li.appendChild(strong);
  li.appendChild(infoIcon);
  todoList.prepend(li);

  form.reset();
  submitBtn.innerHTML = '+';
  submitBtn.style.backgroundColor = 'rgb(194, 183, 209)';

  // function to delete an item
  function deleteItem() {
    // Listener for the delete btn
    strong.addEventListener('click', (e) => {
      // create modal
      const modal = document.createElement('div');
      modal.className = 'delete-popup';
      const popup = document.createElement('div');
      popup.className = 'popup';
      const h3 = document.createElement('h3');
      h3.innerText = 'Are you sure?';
      popup.appendChild(h3);
      const optionBox = document.createElement('div');
      optionBox.className = 'option-box';
      const button1 = document.createElement('button');
      button1.className = 'cancel';
      button1.innerText = 'Cancel';
      optionBox.appendChild(button1);
      const button2 = document.createElement('button');
      button2.className = 'remove';
      button2.innerText = 'Delete';
      optionBox.appendChild(button2);
      popup.appendChild(optionBox);
      modal.appendChild(popup);
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-popup') || e.target.classList.contains('cancel')) {
          modal.style.display = 'none';
        } else if (e.target.classList.contains('remove')) {
          modal.style.display = 'none';
          const ul = strong.parentElement.parentElement;
          const item = strong.parentElement;
          ul.removeChild(item);
        }
      });
    });
  }
  deleteItem();

  // Info icon display
  infoIcon.addEventListener('click', (e) => {
    // create the info Element
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';
    const infoBox = document.createElement('div');
    infoBox.className = 'info-box';
    const infoUl = document.createElement('ul');
    infoUl.className = 'info-list';
    const del = document.createElement('span');
    del.className = 'close';
    del.innerHTML = '&times;';
    infoUl.appendChild(del);
    const infoItem1 = document.createElement('li');
    infoItem1.className = 'info-item';
    infoItem1.innerText = 'December 5, 2020. 9:00AM';
    infoUl.appendChild(infoItem1);
    const infoItem2 = document.createElement('li');
    infoItem2.className = 'info-item';
    infoItem2.innerText = 'Edit Todo';
    const item2span = document.createElement('span');
    const item2icon = document.createElement('i');
    item2icon.className = 'fas fa-pencil-square-o';
    item2span.appendChild(item2icon);
    infoItem2.appendChild(item2icon);
    infoUl.appendChild(infoItem2);
    const infoItem3 = document.createElement('li');
    infoItem3.className = 'info-item';
    infoItem3.innerText = 'Mark task as completed';
    const togglebtn = document.createElement('span');
    togglebtn.className = 'check-complete-box';
    infoItem3.appendChild(togglebtn);
    infoUl.appendChild(infoItem3);
    infoBox.appendChild(infoUl);
    infoContainer.appendChild(infoBox);
    document.body.appendChild(infoContainer);

    infoContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('info-container') || e.target.classList.contains('close')) {
        infoContainer.style.display = 'none';
      }
      togglebtn.addEventListener('click', (e) => {
        e.target.classList.toggle('btn-active');
        const ul = infoIcon.parentElement.parentElement;
        const li = infoIcon.parentElement;
        li.style.textDecoration = 'line-through';
        li.style.color = '#777';
        setTimeout(() => {
          ul.removeChild(li);
        }, 60000);
      });
    });
  });
});