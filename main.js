const form = document.getElementById("appraisal-form");
const saveBtn = document.getElementById("save-btn");
const input = form.querySelectorAll("input");
const textarea = form.querySelectorAll("textarea");
const formDetails = document.getElementById("accordion__evaluation-details");
const floatingActionButtons = document.getElementById(
  "floating-action-buttons"
);
floatingActionButtons.style.marginTop = "0";

const deleteQuestion = (e) => {
  let question = e.closest("section").parentElement;
  question.remove();
};

const duplicateQuestion = (e) => {
  let question = e.closest("section").parentElement;
  const clonedQuestion = question.cloneNode(true);

  question.parentNode.insertBefore(clonedQuestion, question.nextSibling);
};

const handleClickEvents = (e) => {
  let { id } = e.target.dataset;

  switch (id) {
    case "accordion__evaluation-info-btn":
      e.target.classList.toggle("-rotate-90");
      formDetails.classList.toggle("h-0");
      formDetails.classList.toggle("py-5");
      formDetails.classList.toggle("mt-4");
      formDetails.classList.toggle("border-t-8");
      formDetails.classList.toggle("opacity-0");
      break;

    default:
      return;
  }
};

const calcLowestTop = (a, b) => {
  switch (true) {
    case a === 0 && b > 0:
      return b;
    case a < b:
      return a;
    case a === b:
      return a || b;
    case a === b && a > 0 && b > 0:
      console.log({ a, b }, 0);
      return 0;
    default:
      return;
  }
};

const handleFocusInEvents = (e) => {
  let { parentElement } = e.target.parentElement;
  let allInputElements = parentElement.querySelectorAll("input");
  let allTextAreaElements = parentElement.querySelectorAll("textarea");
  let top = parentElement.parentElement.offsetTop;
  let top_2 = parentElement.offsetTop;

  e.target.classList.add("border-b");
  floatingActionButtons.style.top = calcLowestTop(top, top_2) + "px";
};

const handleFocusOutEvents = (e) => {
  let { parentElement } = e.target.parentElement;
  let allInputElements = parentElement.querySelectorAll("input");
  let allTextAreaElements = parentElement.querySelectorAll("textarea");

  if (allInputElements) {
    if (!e.target.value) {
      return;
    } else {
      e.target.classList.remove("border-b");
    }
  }
};

const addNewSection = async () => {
  let route = `/hrm/appraisal/forms/add-new-section`;
  fetch(route)
    .then((response) => response.text())
    .then((section) => {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("data-name", "new-entire-question");
      newDiv.innerHTML = section;
      saveBtn.insertAdjacentElement("beforebegin", newDiv);
    })
    .catch((error) => {
      console.error("Error fetching response:", error);
    });
};

const addNewQuestion = async (questionType) => {
  let route = `/hrm/appraisal/forms/add-new-question/${questionType}`;
  let templateView;
  await $.ajax({
    type: "GET",
    url: route,
    success: function (data) {
      const template = document.createElement("div");
      template.setAttribute("data-name", "question");
      template.innerHTML = data;
      templateView = template;
    },
    error: function (data) {
      console.error(data);
    },
  });
  return templateView;
};

const changeQuestionType = async (e) => {
  const selectedValue = e.value;
  const response = await addNewQuestion(selectedValue);
  const oldQuestionType = e.closest("section").parentElement;
  form.replaceChild(response, oldQuestionType);
};

const addQuestionOnClick = async (questionType) => {
  const response = await addNewQuestion(questionType);
  saveBtn.insertAdjacentElement("beforebegin", response);
};

const getSections = () => {
  let formSections = document.querySelectorAll('[data-name="section"]');
  let inputLists = formSections[0].querySelectorAll("input");
  let section = [];
  let name = inputLists[0].value;
  let description = inputLists[1].value;
  section.push({ name, description });
  return section;
};

const getQuestions = () => {
  let formQuestions = document.querySelectorAll('[data-name="question"]');
  let sections = getSections();
  let formOptions = document.querySelectorAll('[data-name="options"]');

  let questions = [];

  formQuestions.forEach((question) => {
    let name =
        question.firstElementChild.children[0].children[0].children[1].value,
      type =
        question.firstElementChild.children[0].children[1].firstElementChild
          .value,
      options;

    if (!options) {
      options = [];
    }

    questions.push({ name, type, options });
  });

  sections[0].questions = questions;

  // return questions;
  return { sections };
};

const getOptions = () => {};

const submitForm = async (e) => {
  e.preventDefault();

  let formDetailsInput = formDetails.querySelectorAll("input");
  let formDetailsTextarea = formDetails.querySelectorAll("textarea");

  let formData = {
    name: formDetailsInput[0].value,
    description: formDetailsInput[1].value,
    instruction: formDetailsTextarea[0].value,
    purpose_of_evaluation: formDetailsTextarea[1].value,
    form_questions: getQuestions(),
    // sections: getQuestions(),
  };

  console.log({ formData });
};

document.addEventListener("click", handleClickEvents);
form.addEventListener("focusin", handleFocusInEvents);
form.addEventListener("focusout", handleFocusOutEvents);
form.addEventListener("submit", submitForm);

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const newHeight = entry.contentRect.height;
    console.log(`New height: ${newHeight}px`);
    // handleFocusInEvents()
  }
});
// resizeObserver.observe(form);
