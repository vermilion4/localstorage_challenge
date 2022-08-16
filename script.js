// create an empty array to store the users
let database = JSON.parse(localStorage.getItem('database')) || [];
// console.log(database);

// function to add a new fellow to the database after getting the input from the user
function userDetails() {
  let name = prompt('Enter name');
  let email = prompt('Enter email');
  let track = prompt(
    'Enter track:\nFrontend, Backend, DevOps, Design, Fullstack, Others'
  );
  let isTeamLead = prompt('Is team lead? (yes/no)');
  let isSuspended = prompt('Is suspended? (yes/no)');
  let isExpelled = prompt('Is expelled? (yes/no)');
  let fellow = {
    name,
    email,
    track,
    isTeamLead: isTeamLead === 'yes',
    isSuspended: isSuspended === 'yes',
    isExpelled: isExpelled === 'yes',
  };
  database.push(fellow);
  localStorage.setItem('database', JSON.stringify(database));
  showFellows();
}

// create a table row for each fellow
let table = document.querySelector('table');
function showFellows() {
  table.innerHTML = '';
  let header = document.createElement('tr');
  header.innerHTML = `
         <th>ID</th>
         <th>Name</th>
         <th>Email</th>
         <th>Track</th>
         <th>isTeamLead</th>
         <th>isSuspended</th>
         <th>isExpelled</th>
         <th>Action</th>
     `;
  table.appendChild(header);
  let i = 1;
  database.forEach((fellow) => {
    let row = document.createElement('tr');
    row.innerHTML = `
             <td>${i++}</td>
             <td>${fellow.name}</td>
             <td>${fellow.email}</td>
             <td>${fellow.track}</td>
             <td>${fellow.isTeamLead}</td>
             <td>${fellow.isSuspended}</td>
             <td>${fellow.isExpelled}</td>
             <td class="action"><a class="delete-btn" onclick="deleteFellow(${i})">Delete</a><a class="edit-btn" onclick="editFellow(${i})">Edit</a></td>
         `;
    table.appendChild(row);
  });
}

// delete a fellow
function deleteFellow(id) {
  confirm("Are you sure you want to delete this fellow's details?")
    ? database.splice(id - 2, 1)
    : null;
  localStorage.setItem('database', JSON.stringify(database));
  showFellows();
}

// Edit a fellow
function editFellow(id) {
  let name = prompt('Enter name');
  let email = prompt('Enter email');
  let track = prompt(
    'Enter track:\nFrontend, Backend, DevOps, Design, Fullstack, Others'
  );
  let isTeamLead = prompt('Is team lead? (yes/no)');
  let isSuspended = prompt('Is suspended? (yes/no)');
  let isExpelled = prompt('Is expelled? (yes/no)');
  let fellow = {
    name: name || database[id - 2].name,
    email: email || database[id - 2].email,
    track: track || database[id - 2].track,
    isTeamLead: isTeamLead === 'yes' || database[id - 2].isTeamLead,
    isSuspended: isSuspended === 'yes' || database[id - 2].isSuspended,
    isExpelled: isExpelled === 'yes' || database[id - 2].isExpelled,
  };
  database.splice(id - 2, 1, fellow);
  localStorage.setItem('database', JSON.stringify(database));
  showFellows();
}
