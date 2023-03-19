const compose =
  (...functions) =>
  (data) =>
    functions.reduceRight((value, func) => func(value), data);

/*

 #     # ####### #     # #       
 #     #    #    ##   ## #       
 #     #    #    # # # # #       
 #######    #    #  #  # #       
 #     #    #    #     # #       
 #     #    #    #     # #       
 #     #    #    #     # ####### 
                                 

*/

const description = $("#description"),
  calories = $("#calories"),
  carbs = $("#carbs"),
  protein = $("#protein"),
  table = $("#items");

const currentInputs = [description, calories, carbs, protein];

currentInputs.forEach((input) => {
  input.keypress(() => {
    input.removeClass("is-invalid");
  });
});

function clearInputs(...inputs) {
  inputs.forEach((input) => {
    input.val("");
  });
}

// Generador de HTML con programacion funcional
class HTMLGenerator {
  static _render(payload) {
    if (Array.isArray(payload))
      return () => HTMLGenerator.generateFromArray(payload);
    if (typeof payload === "object" && !Array.isArray(payload))
      return () => HTMLGenerator.generateFromObject(payload);
    return () => undefined;
  }
  static generateFromArray(objectList) {
    return objectList
      .map((item) => HTMLGenerator.generateFromObject(item))
      .join("");
  }
  static generateFromObject(object, resultingHtml = []) {
    let currentChange;
    for (const key in object) {
      const currentObject = object[key];
      currentChange = HTMLGenerator.createTag(
        key,
        currentObject.selfClosing
      )(HTMLGenerator.reduceAttributesToString(currentObject.attr))(
        currentObject.content
          ? currentObject.content
          : HTMLGenerator._render(currentObject.child)()
      );
      resultingHtml.push(currentChange);
    }
    if (resultingHtml.length === Object.keys(object).length)
      return resultingHtml.join("");
    return HTMLGenerator.generateFromObject(object, resultingHtml);
  }

  static createTag =
    (tag, selfClosing = false) =>
    (attr) =>
    (content = "") =>
      `<${tag}${attr !== undefined ? ` ${attr}` : ``}${
        selfClosing ? "" : ">"
      }${content}${selfClosing ? "/>" : `</${tag}>`}`;

  static reduceAttributesToString(tags) {
    return tags
      ? Object.keys(tags).reduceRight((prev, curr) => {
          const prop = `${curr.trim()}="${tags[curr]}"`;
          return `${prop} ${prev}`;
        }, "")
      : undefined;
  }
}
const deleteIcon = HTMLGenerator.createTag("i")(
  HTMLGenerator.reduceAttributesToString({
    class: "fas fa-trash",
  })
)();

const deleteButton = (id) =>
  HTMLGenerator.createTag("button")(
    HTMLGenerator.reduceAttributesToString({
      type: "button",
      class: "btn btn-danger",
      onclick: `deleteElement(${id})`,
    })
  )(deleteIcon);

const dataElementCell = HTMLGenerator.createTag("td")(); // This return a function which takes the content inside the td cell.

const buildCells = (obj) =>
  `${Object.keys(obj)
    .map((item) => dataElementCell(obj[item]))
    .join("")}${dataElementCell(deleteButton(obj.id))}`;

const rowElement = HTMLGenerator.createTag("tr")();

/*
 ######                         #     #                                             
 #     #   ##   #####   ##      #     #   ##   #    # #####  #      # #    #  ####  
 #     #  #  #    #    #  #     #     #  #  #  ##   # #    # #      # ##   # #    # 
 #     # #    #   #   #    #    ####### #    # # #  # #    # #      # # #  # #      
 #     # ######   #   ######    #     # ###### #  # # #    # #      # #  # # #  ### 
 #     # #    #   #   #    #    #     # #    # #   ## #    # #      # #   ## #    # 
 ######  #    #   #   #    #    #     # #    # #    # #####  ###### # #    #  ####  
                                                                                    
*/

let list = [];

function validateInput(...inputs) {
  const areAllValidInputs = inputs.map((input) => {
    const result = [input, input[0].id];
    if (input.val() !== "") {
      result.push(true);
    } else {
      result.push(false);
      input.addClass("is-invalid");
    }
    return result;
  });

  return {
    allValid: areAllValidInputs.every(
      (evaluatedItem) => evaluatedItem[2] === true
    ),
    inputs: areAllValidInputs,
  };
}

function addOneElementToList(list, ...inputs) {
  const currentElement = inputs.reduce((prev, curr) => {
    return {
      ...prev,
      [curr[1]]: curr[0].val(),
    };
  }, {});
  const copiedList = JSON.parse(JSON.stringify(list));
  copiedList.push({ id: list.length + 1, ...currentElement });
  return copiedList;
}

function deleteElement(id) {
  list = list.filter((item) => item.id !== id);
  const currentRoads = list.map(compose(rowElement, buildCells));
  table.html(currentRoads.join(""));
}

function submit() {
  const validated = validateInput(...currentInputs);

  if (validated.allValid) {
    list = addOneElementToList(list, ...validated.inputs);
    clearInputs(...currentInputs);
    const newRowToAdd = list.map(compose(rowElement, buildCells));
    table.html(newRowToAdd.join(""));
    console.log(list);
  }
}
