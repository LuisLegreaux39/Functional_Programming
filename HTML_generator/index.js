/*

    <head>, <title>, <body>, <header>, <footer>, <article>, <section>, <p>, <div>, <span>, 
    <img>, <aside>, <audio>, <canvas>, <datalist>, <details>, <embed>, 
    <nav>, <output>, <progress>, <video>, <ul>, <ol>, <li>


*/

const createTag = (tag, selfClosing = false) => (attr) => (content = '') =>
    `<${tag}${attr !== undefined ? ` ${attr}` : ``}${selfClosing ? '' : '>'}${content}${selfClosing ? '/>' : `</${tag}>`}`;

function reduceAttributesToString(tag) {
    return Object.keys(tag).reduceRight((prev, curr) => {
        const prop = `${curr.trim()}="${tag[curr]}"`
        return `${prop} ${prev}`
    }, '')
}

console.log(
    createTag('h2')()('test content')
)

console.log(
    createTag('h1')(
        reduceAttributesToString({
            id: 'primer-id',
            class: "flex valid-text",
        })
    )('test content')
)

console.log(
    createTag('li')(
        reduceAttributesToString({ 'data-testid': "1" })
    )('test content')
)

console.log(
    createTag('li')(
        reduceAttributesToString({ 'data-testid': "1" })
    )('test content')
)

console.log(
    createTag('head')(
        reduceAttributesToString({ 'data-testid': "1" })
    )('test content')
)

console.log(
    createTag('html ')(
        reduceAttributesToString({ 'html': "en-US" })
    )()
)

console.log(
    createTag('input', true)(
        reduceAttributesToString({ 'type': "text", 'name': "nombre" })
    )()
)

console.log(
    createTag('button')(
        reduceAttributesToString({ 'type': "buttom", 'name': "nombre" })
    )('Click me')
)

console.log(
    createTag('html')(
        reduceAttributesToString({ lang: 'en-US' })
    )(
        createTag('head')()(
            `${createTag('meta', true)(reduceAttributesToString({ charset: "UTF=8" }))()}
            ${createTag('meta', true)(reduceAttributesToString({ name: "viewport", content: "width=device-width" }))()}
            ${createTag('title')()('Document title')}`
        )
    )
)


/*

    <head>, <title>, <body>, <header>, <footer>, <article>, <section>, <p>, <div>, <span>, 
    <img>, <aside>, <audio>, <canvas>, <datalist>, <details>, <embed>, 
    <nav>, <output>, <progress>, <video>, <ul>, <ol>, <li>


*/

// const createTag = (tag, selfClosing = false) => (attr) => (content = '') =>
//     `<${tag}${attr !== undefined ? ` ${attr}` : ``}${selfClosing ? '' : '>'}${content}${selfClosing ? '/>' : `</${tag}>`}`;

// function reduceAttributesToString(tag) {
//     return Object.keys(tag).reduceRight((prev, curr) => {
//         const prop = `${curr.trim()}="${tag[curr]}"`
//         return `${prop} ${prev}`
//     }, '')
// }


// const temp = {

//     html: {
//         attr: {
//             lang: 'en-US'
//         },
//         child: [
//             {
//                 meta: {
//                     selfClosing: true,
//                     attr: {
//                         charset: "UTF=8"
//                     },
//                 }
//             },
//             {
//                 meta: {
//                     selfClosing: true,
//                     attr: {
//                         name: "viewport", content: "width=device-width"
//                     },
//                 }
//             },
//             {
//                 title: {
//                     content: 'Document title'
//                 }
//             }
//         ]
//     }
// }
// return Object.keys(object).reduceRight((prev, curr) => {
//     let resultingHtml, currentObject = object[curr], currentChange, processedChildren;

//     if (currentObject.content) processedChildren = currentObject.content

//     if (currentObject.child) {
//         processedChildren = currentObject.child.map(currentChild => {
//             return HTMLGenerator.generate(currentChild)
//         })
//         processedChildren = processedChildren.join(" ")
//     }


//     currentChange = HTMLGenerator.createTag(curr, object[curr].selfClosing)(
//         HTMLGenerator.reduceAttributesToString(
//             object[curr].attr
//         )
//     )

//     resultingHtml = currentChange(processedChildren)

//     return resultingHtml;
// }, '')

// const temp = {
//     html: {
//         attr: {
//             lang: 'en-US',
//             id: "html-id"
//         },
//         child: [
//             {
//                 title: {
//                     content: 'Document title'
//                 }
//             },
//             {
//                 title: {
//                     content: 'Second title'
//                 }
//             }
//         ]
//     },
//     html2: {
//         attr: {
//             lang: 'en-US',
//             id: "html2-id"
//         },
//         child: [
//             {
//                 title: {
//                     content: 'Document title'
//                 }
//             },
//             {
//                 title: {
//                     content: 'Second title'
//                 }
//             }
//         ]
//     },
//     html3: {
//         attr: {
//             lang: 'en-US',
//             hello: 'World',
//             id: "html3-id"
//         }
//     }
// }


const temp = {
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
                body: {}
            }
        ]
    },

}

class HTMLGenerator {
    static _render(payload) {
        if (Array.isArray(payload)) return HTMLGenerator.generateFromArray(payload)
        if (typeof payload === 'object' && !Array.isArray(payload)) return HTMLGenerator.generateFromObject(payload);
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
                (currentObject.content ? currentObject.content : HTMLGenerator._render(currentObject.child));
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

console.log(HTMLGenerator._render(temp))
console.log(HTMLGenerator._render(temp))




// const temp = {
//     html: {
//         attr: {
//             lang: 'en-US'
//         },
//         child: [
//             {
//                 head: {
//                     attr: {
//                         id: "head-id"
//                     },
//                     child: [
//                         {
//                             meta: {
//                                 selfClosing: true,
//                                 attr: {
//                                     charset: "UTF=8"
//                                 },
//                             }
//                         },
//                         {
//                             meta: {
//                                 selfClosing: true,
//                                 attr: {
//                                     name: "viewport", content: "width=device-width"
//                                 },
//                             }
//                         },
//                         {
//                             title: {
//                                 content: 'Document title'
//                             }
//                         }
//                     ]
//                 }
//             }
//         ]
//     },

// }



// console.log(
//     createTag('h1')(
//         reduceAttributesToString({
//             id: 'primer-id',
//             class: "flex valid-text",
//         })
//     )('test content')
// )

// console.log(
//     createTag('li')(
//         reduceAttributesToString({ 'data-testid': "1" })
//     )('test content')
// )

// console.log(
//     createTag('li')(
//         reduceAttributesToString({ 'data-testid': "1" })
//     )('test content')
// )

// console.log(
//     createTag('head')(
//         reduceAttributesToString({ 'data-testid': "1" })
//     )('test content')
// )

// console.log(
//     createTag('html ')(
//         reduceAttributesToString({ 'html': "en-US" })
//     )()
// )

// console.log(
//     createTag('input', true)(
//         reduceAttributesToString({ 'type': "text", 'name': "nombre" })
//     )()
// )
const temp = {
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
                body: {}
            }
        ]
    },

}

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

console.log(HTMLGenerator._render(temp)())
console.log(HTMLGenerator._render(temp)())