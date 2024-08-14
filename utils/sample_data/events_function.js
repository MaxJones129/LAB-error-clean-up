import { students, voldysArmy, houses } from './array_data';
import filterBtnRow from './filterBtnRow_function';

const renderToDOM = (divId, content) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = content;
};

const studentsOnDom = (divId, array, house = 'Hogwarts') => {
  let domString = '';
  if (!array.length) {
    domString += `NO ${house.toUpperCase()} STUDENTS`;
  }
  array.forEach((student) => {
    domString += `
    <div class="card bg-dark text-white">
      <img src="${
  divId === '#voldy'
    ? 'https://carboncostume.com/wordpress/wp-content/uploads/2019/10/deatheater-harrypotter.jpg' : student.crest}" 
          class="card-img" alt="${student.house} crest">
      <div class="card-img-overlay">
        <h5 class="card-title">${student.name}</h5>
        ${
  divId === '#voldy'
    ? '<p class="card-text">Death Eater</p>'
    : ` <p class="card-text">${student.house}</p>
          <button type="button" id="expel--${student.id}" class="btn btn-danger btn-sm">Expel</button>`
}
      </div>
    </div>
    `;
  });
  renderToDOM(divId, domString);
};

const createId = (array) => {
  if (array.length) {
    const idArray = array.map((el) => el.id);
    return Math.max(...idArray) + 1;
  }
  return 0;
};

const sortStudent = (e) => {
  e.preventDefault();
  const sortingHat = houses[Math.floor(Math.random() * houses.length)];

  if (e.target.id === 'sorting') {
    const student = document.querySelector('#student-name');

    // create the new student object
    students.push({
      id: createId(students),
      name: student.value,
      house: sortingHat.house,
      crest: sortingHat.crest
    });

    student.value = ''; // reset value of input
    studentsOnDom('#students', students);
  }
};

const studentAreas = () => {
  const domString = `<div id="students">No Students</div>
    <div id="voldy">No Death Eaters</div>`;

  renderToDOM('#student-container', domString);
};

const form = () => {
  const domString = `<form id="sorting" class="d-flex flex-column form-floating ">
      <input
      type="text"
      class="form-control mb-1"
      id="student-name"
      placeholder="Enter a name"
      required
    />
    <label for="floatingInputValue">Name to be sorted</label>
  <button type="submit" class="btn btn-success">Get Sorted!</button>
  </form>`;

  renderToDOM('#form-container', domString);

  // has to be put on the DOM after form is on DOM, not before
  // on form submit, sort student
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const deleteStudent = document.querySelector('#student-container');
deleteStudent.addEventListener('click', (e) => {
  if (e.target.id.includes('expel')) {
    const [, id] = e.target.id.split('--');
    const index = students.findIndex((student) => student.id === Number(id));
    // move from one array to another
    voldysArmy.push(students.splice(index, 1));
    // get both sets of students on the DOM
    studentsOnDom('#students', students);
    studentsOnDom('#voldy', voldysArmy);
  }
});
const tangle = document.querySelector('#filter-container');
tangle.addEventListener('click', (e) => {
  if (e.target.id.includes('filter')) {
    const [, house] = e.target.id.split('--');
    if (house === 'all') {
      studentsOnDom('#students', students);
    } else if (house) {
      const filter = students.filter((student) => student.house === house);
      studentsOnDom('#students', filter, house);
    }
  }
});

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    form(); // form
    filterBtnRow(); // filter buttons
    studentAreas(); // students and voldy's army divs
  });
};

export default events;
