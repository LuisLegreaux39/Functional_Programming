# Functional_Programming

Functional programming simple app oriented made to track calories counting.


## Possible features to add
* 1 - update items when saved.
* 2 - picture uploading.
* 4 - local storage use.

## Code highlights

  
```
const compose =(...functions) =>(data) =>
    functions.reduceRight((value, func) => func(value), data);

```

Compose method implementation could be seen as a pipe operation in backwards when the order of the arguments would be inverted from left to right setting the return from the last the arguments of the next as a pure function 

```
function clearInputs(...inputs) {
  inputs.forEach((input) => {
    input.val("");
  });
}
```
it receives a list of inputs objects selected using ```$()``` using the jquery notation so clean all the input values when is executed.

### Exercise made in between the course

```
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
```

Static class for Html Generation made using functional programming as base and key base conversion for handling a acceptable markup format and used in this project to generate the rows of the table.

### Explanation of HTML Generator

```createTag ``` method is made to to return 3 functions witch will be building the strings of the markup and accepting arguments as ```tag``` which will be the tag key name, ```selfClosing``` to close the tag if true ```<[tag] /> ```, ```attr``` which will be the string of attributes if will have on the scope of the tags   ```<[tag] attr_name="attr_value"></[tag]> ``` and the ```content``` inside the tags ```<[tag] attr_name="attr_value">[content]</[tag]> ```.

Ex:
```
 HTMLGenerator.createTag("i")(`class="class_name"`)('my conten'); //<i `class="class_name"></i>
```

```reduceAttributesToString``` method is made to receive an object and transform it's pairs in a markup valid string as the key of the object and it value.

Ex:
```
HTMLGenerator.reduceAttributesToString({
      type: "button",
      class: "btn btn-danger",
      onclick: "deleteElement()",
    }) // type="button" class="btn btn-danger" onclick="deleteElement()"
```

This both method can be used together to create a valid and functional tag as 
```
HTMLGenerator.createTag("button")(
    HTMLGenerator.reduceAttributesToString({
      type: "button",
      class: "btn btn-danger",
      onclick: "deleteElement()",
    })
  )('my_button'); // <button  type="button" class="btn btn-danger" onclick="deleteElement()">my_button</button>
``` 

Class Use Example:
```
const payload = {
    html: {
        attr: {
            lang: "en"
        },
        child: [
            {
                head: {
                    child: [
                        {
                            meta: {
                                selfClosing: true,
                                attr: {
                                    charset: "UTF=8"
                                },
                            }
                        },
                        {
                            meta: {
                                selfClosing: true,
                                attr: {
                                    "http-equiv": "X-UA-Compatible",
                                    content: "IE=edge"
                                },
                            }
                        },
                        {
                            meta: {
                                selfClosing: true,
                                attr: {
                                    "name": "viewport",
                                    content: "width=device-width,  initial-scale=1.0"
                                },
                            }
                        },
                        {
                            title: {
                                content: "Document"
                            }
                        }
                    ]
                }
            },
            {
                body: {
                    child:[{
                        h1:{
                            content:'hola mundo'
                        }
                    }]
                }
            }
        ]
    },

}

HTMLGenerator._render(payload)()

```

Result:
```
<html lang="en" >
   <head>
      <meta charset="UTF=8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,  initial-scale=1.0" />
      <title>Document</title>
   </head>
   <body>
      <h1>hola mundo</h1>
   </body>
</html>

```