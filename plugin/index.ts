import MarkdownIt from "markdown-it"
import defaultContent from "./defaultContent"
import wrapper from "./wrapper.html?raw"

// console.log('in index' , parsed, defaultContent)
function typeInTextarea(text, el = document.activeElement) {
  var txtarea = el
  var scrollPos = txtarea.scrollTop
  var strPos = 0
  var br = txtarea.selectionStart || txtarea.selectionStart == "0" ? "ff" : document.selection ? "ie" : false
  if (br == "ie") {
    txtarea.focus()
    var range = document.selection.createRange()
    range.moveStart("character", -txtarea.value.length)
    strPos = range.text.length
  } else if (br == "ff") strPos = txtarea.selectionStart

  var front = txtarea.value.substring(0, strPos)
  var back = txtarea.value.substring(strPos, txtarea.value.length)
  txtarea.value = front + text + back
  strPos = strPos + text.length
  if (br == "ie") {
    txtarea.focus()
    var range = document.selection.createRange()
    range.moveStart("character", -txtarea.value.length)
    range.moveStart("character", strPos)
    range.moveEnd("character", 0)
    range.select()
  } else if (br == "ff") {
    txtarea.selectionStart = strPos
    txtarea.selectionEnd = strPos
    txtarea.focus()
  }
  txtarea.scrollTop = scrollPos
}

class Marky {
  public element
  public wrapper
  // public textarea
  public options
  // public editorButton
  // public previewButton
  // public editorField
  // public previewField

  constructor({element, options = {}}: {element: any; options?: any}) {
    this.element = element
    this.options = options
    this.init()
  }

  get editorField() {
    return this.element.querySelector(".js-editor-field")
  }

  get previewField() {
    return this.element.querySelector(".js-preview-field")
  }

  get editorButton() {
    return this.element.querySelector(".js-editor-button")
  }

  get previewButton() {
    return this.element.querySelector(".js-preview-button")
  }

  init() {
    this.addHTML()
  }

  private addHTML() {
    this.createElements()
    // this.createWrapper()
    // this.createTextarea()
    // this.addStyles()
    // this.addPlaceholder()
  }

  public switchToEditor() {
    console.log("switchToEditor", this.editorField, this.previewField)
    this.editorField.classList.remove("hidden")
    this.previewField.classList.add("hidden")
  }

  public switchToPreview() {
    const content = this.editorField.value
    const parsedContent = this.parse(content)
    console.log("parsedContent->", parsedContent)
    this.previewField.innerHTML = parsedContent
    this.previewField.classList.remove("hidden")
    this.editorField.classList.add("hidden")
  }

  private insert(modifier) {
    // console.log("insert->", modifier)
    const contentForModifier = {
      "quote": "> ",
      "code": "``",
      "link": "[](url)",
      "list-unordered": "- ",
      "list-ordered": "1. ",
      "tasklist": "- [ ]",
      "image": "",
      "fold-down": `<details>
<summary>Details</summary>



</details>
`,
    }
    const content = contentForModifier[modifier]
    if (content) {
      typeInTextarea(content, this.editorField)
    }
  }

  private createElements() {
    this.element.innerHTML = wrapper

    this.editorButton.addEventListener("click", this.switchToEditor.bind(this))
    this.previewButton.addEventListener("click", this.switchToPreview.bind(this))

    const modifiers = ["quote", "code", "link", "list-unordered", "list-ordered", "tasklist", "image", "fold-down"]

    modifiers.forEach((modifier) => {
      // console.log('modifier->', modifier)
      this.element.querySelector(`.js-insert-${modifier}`).addEventListener("click", () => this.insert(modifier))
    })
  }

  private parse(content) {
    // console.log("content->", content)
    const md = new MarkdownIt()

    return md.render(content)
  }

  // private createWrapper() {
  //   this.wrapper = document.createElement('div')
  //   this.wrapper.classList.add('border', 'border-red-400', 'rounded', 'w-full')

  //   this.element.appendChild(this.wrapper)
  // }

  // private createTextarea() {
  //   // const

  //   this.textarea = document.createElement('textarea')
  //   this.textarea.classList.add('border', 'border-gray-400', 'rounded', 'w-full')
  //   this.textarea.placeholder = "Leave a comment"

  //   this.wrapper.appendChild(this.textarea)
  // }
}

const parent = document.querySelector(".marky")
const instance = new Marky({element: parent})
// console.log("instance->", instance)
