// Generador de HTML con programacion funcional
class HTMLGenerator {
    static _render(payload) {
        if (Array.isArray(payload)) return () => HTMLGenerator.generateFromArray(payload)
        if (typeof payload === 'object' && !Array.isArray(payload)) return () => HTMLGenerator.generateFromObject(payload);
        return () => undefined;
    }
    static generateFromArray(objectList) {
        return objectList.map(item => HTMLGenerator.generateFromObject(item)).join("")
    }
    static generateFromObject(object, resultingHtml = []) {
        let currentChange;
        for (const key in object) {
            const currentObject = object[key];
            currentChange = HTMLGenerator.createTag(key, currentObject.selfClosing)
                (HTMLGenerator.reduceAttributesToString(currentObject.attr))
                (currentObject.content ? currentObject.content : HTMLGenerator._render(currentObject.child)());
            resultingHtml.push(currentChange)
        }
        if (resultingHtml.length === Object.keys(object).length) return resultingHtml.join("")
        return HTMLGenerator.generateFromObject(object, resultingHtml);
    }

    static createTag = (tag, selfClosing = false) => (attr) => (content = '') =>
        `<${tag}${attr !== undefined ? ` ${attr}` : ``}${selfClosing ? '' : '>'}${content}${selfClosing ? '/>' : `</${tag}>`}`;

    static reduceAttributesToString(tags) {
        return tags ? Object.keys(tags).reduceRight((prev, curr) => {
            const prop = `${curr.trim()}="${tags[curr]}"`
            return `${prop} ${prev}`
        }, '') : undefined;
    }
}

const dataElementCell = HTMLGenerator.createTag('td')() // This return a function which takes the content inside the td cell.
const rowElement = HTMLGenerator.createTag('tr')(); // This return a function which takes the content inside the row is creating.


const compose = (...functions) => (...data) =>
    functions.reduceRight((value, func, index) => {
        console.log(func(value))
        return data[index]
    }, data);


console.log(
    compose(dataElementCell, rowElement)('hola', 'hello')
)