<template>
  <div class="editor">
    <div class="toolbar">
      <div class="line">
        <div class="box">
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="undo"
              >
                <svg data-src="/img/icons/undo.svg"/>
              </span>
            </template>
            {{ $t('textEditor.undo') }}
          </tooltip>
        </div>
        <div class="box">
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="bold"
                  data-tag-name="b"
              >
                <svg data-src="/img/icons/bold.svg"/>
              </span>
            </template>
            {{ $t('textEditor.bold') }}
          </tooltip>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="italic"
                  data-tag-name="i"
              >
            <svg data-src="/img/icons/italic.svg"/>
          </span>
            </template>
            {{ $t('textEditor.italic') }}
          </tooltip>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="underline"
                  data-tag-name="u"
              >
            <svg data-src="/img/icons/underline.svg"/>
          </span>
            </template>
            {{ $t('textEditor.underline') }}
          </tooltip>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="strikeThrough"
                  data-tag-name="strike"
              >
            <svg data-src="/img/icons/strikethrough.svg"/>
          </span>
            </template>
            {{ $t('textEditor.strikeThrough') }}
          </tooltip>
        </div>
        <div class="box">
          <span class="editor-btn icon has-submenu">
            <svg data-src="/img/icons/text-align-left.svg"/>
            <div class="submenu">
              <tooltip top>
                <template #activator>
                  <span
                      class="editor-btn icon"
                      data-action="justifyLeft"
                      data-style="textAlign:left"
                  >
                <svg data-src="/img/icons/text-align-left.svg"/>
              </span>
                </template>
                {{ $t('textEditor.justify.left') }}
              </tooltip>
              <tooltip top>
                <template #activator>
                  <span
                      class="editor-btn icon"
                      data-action="justifyCenter"
                      data-style="textAlign:center"
                  >
                <svg data-src="/img/icons/text-align-center.svg"/>
              </span>
                </template>
                {{ $t('textEditor.justify.center') }}
              </tooltip>
              <tooltip top>
                <template #activator>
                  <span
                      class="editor-btn icon"
                      data-action="justifyRight"
                      data-style="textAlign:right"
                  >
                <svg data-src="/img/icons/text-align-right.svg"/>
              </span>
                </template>
                {{ $t('textEditor.justify.right') }}
              </tooltip>
              <tooltip top>
                <template #activator>
                  <span
                      class="editor-btn icon"
                      data-action="formatBlock"
                      data-style="textAlign:justify"
                  >
                <svg data-src="/img/icons/text-align-justify.svg"/>
              </span>
                </template>
                {{ $t('textEditor.justify.wide') }}
              </tooltip>
            </div>
          </span>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="insertOrderedList"
                  data-tag-name="ol"
              >
            <svg data-src="/img/icons/numbered-list.svg"/>
          </span>
            </template>
            {{ $t('textEditor.ol') }}
          </tooltip>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="insertUnorderedList"
                  data-tag-name="ul"
              >
            <svg data-src="/img/icons/list.svg"/>
          </span>
            </template>
            {{ $t('textEditor.ul') }}
          </tooltip>
        </div>
        <div class="box">
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="insertHorizontalRule"
              >
            <svg data-src="/img/icons/line.svg"/>
          </span>
            </template>
            {{ $t('textEditor.line') }}
          </tooltip>
        </div>
        <div class="box">
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon"
                  data-action="removeFormat"
              >
            <svg data-src="/img/icons/remove-format.svg"/>
          </span>
            </template>
            {{ $t('textEditor.unFormat') }}
          </tooltip>
        </div>
        <div class="box">
          <tooltip top>
            <template #activator>
              <span
                  :class="[
                  'editor-btn', 'icon', 'smaller',
                  {
                    'editor-btn--active': insertLinkDialog
                  }
                  ]"
                  data-action="createLink"
                  @click="togglePopup()"
              >
            <svg data-src="/img/icons/link.svg"/>
          </span>
            </template>
            {{ $t('textEditor.link') }}
          </tooltip>
          <tooltip top>
            <template #activator>
              <span
                  class="editor-btn icon smaller"
                  data-action="unlink"
                  data-tag-name="a"
              >
            <svg data-src="/img/icons/unlink.svg"/>
          </span>
            </template>
            {{ $t('textEditor.unlink') }}
          </tooltip>
        </div>
      </div>
    </div>
    <div class="content-area plain-content">
      <div
          class="visual-view"
          contenteditable
          @input="handleInput"
      />
    </div>
  </div>
  <div
      :class="['pop-up',
        {
          'pop-up--show': insertLinkDialog
        }
      ]"
  >
    <div
        class="close"
        @click="togglePopup"
    >
      <svg data-src="/img/icons/close.svg"/>
    </div>
    <div id="pop-upCreateLink" class="pop-up-content">
      <h3>
        {{ $t('title.insertLink') }}
      </h3>
      <input
          id="linkValue"
          placeholder="Link (example: https://Crowdfunding.uz.uz)"
          type="text"
      />
      <div class="row">
        <input id="new-tab" type="checkbox"/>
        <label for="new-tab">
          {{ $t('button.openInNewTab') }}
        </label>
      </div>
      <btn
          class="done"
          color="green"
      >
        <template v-slot:icon>
          <svg
              data-src="/img/icons/plus.svg"
          />
        </template>
        {{ $t('button.confirm') }}
      </btn>
    </div>
  </div>
</template>

<script>
import {ENTER_KEYCODE} from "../../../constants/keycodes";
import Btn from "../Btn/Btn";
import Tooltip from "../Tooltip/Tooltip";

export default {
  name: "TextEditor",
  components: {Tooltip, Btn},
  props: {
    modelValue: String,
  },
  data: () => ({
    insertLinkDialog: false,
    selection: ''
  }),
  methods: {
    updateValue(val){
      const visualView = document.getElementsByClassName('visual-view')[0];
      visualView.innerHTML = val
    },
    handleInput(e) {
      this.$emit('update:modelValue', e.target.innerHTML);
    },
    togglePopup() {
      if (this.insertLinkDialog) {
        this.insertLinkDialog = false;
        // this.closeFunc(event)
      } else {
        this.insertLinkDialog = true
        // this.execLinkAction()
      }
    },

  },
  mounted() {
    // eslint-disable
    const editor = document.getElementsByClassName('editor')[0];
    const toolbar = editor.getElementsByClassName('toolbar')[0];
    const buttons = toolbar.querySelectorAll('.editor-btn:not(.has-submenu)');
    const contentArea = editor.getElementsByClassName('content-area')[0];
    const visualView = contentArea.getElementsByClassName('visual-view')[0];
    const popUp = document.getElementsByClassName('pop-up')[0];

    visualView.innerHTML = this.modelValue;
// add active tag event
    document.addEventListener('selectionchange', selectionChange);

// add paste event
    visualView.addEventListener('paste', pasteEvent);

// add paragraph tag on new line
    contentArea.addEventListener('keypress', addParagraphTag);

// add toolbar button actions
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];

      button.addEventListener('click', function () {
        let action = this.dataset.action;

        if (action === 'createLink') {
          execLinkAction();
        } else {
          execDefaultAction(action);
        }

      });
    }

    let submit = popUp.querySelectorAll('button.done')[0];
    let close = popUp.querySelectorAll('.close')[0];

    function closeFunc(e) {
      e.preventDefault();
      let linkInput = popUp.querySelectorAll('#linkValue')[0];

      popUp.style.display = 'none';
      linkInput.value = '';

      // deregister pop-up events
      submit.removeEventListener('click', arguments);
      close.removeEventListener('click', arguments);
    }

    /**
     * This function adds a link to the current selection
     */
    function execLinkAction() {
      popUp.style.display = 'block';
      let selection = saveSelection();


      // done button active => add link
      submit.addEventListener('click', function (e) {
        e.preventDefault();
        let newTabCheckbox = popUp.querySelectorAll('#new-tab')[0];
        let linkInput = popUp.querySelectorAll('#linkValue')[0];
        let linkValue = linkInput.value;
        let newTab = newTabCheckbox.checked;

        restoreSelection(selection);

        if (window.getSelection().toString()) {
          let a = document.createElement('a');
          a.href = linkValue;
          if (newTab) a.target = '_blank';
          window.getSelection().getRangeAt(0).surroundContents(a);
        }
        popUp.style.display = 'none';
        linkInput.value = '';
        this.insertLinkDialog = false;

        // deregister pop-up events
        submit.removeEventListener('click', arguments);
        close.removeEventListener('click', arguments);
      });

      // close pop-up on X click
      close.addEventListener('click', closeFunc);
    }

    window.addEventListener('click', (e) => {
      if (!popUp.contains(e.target)) {
        closeFunc
      }
    });

    /**
     * This function executes all 'normal' actions
     */
    function execDefaultAction(action) {
      document.execCommand(action, false);
    }

    /**
     * Saves the current selection
     */
    function saveSelection() {
      if (window.getSelection) {
        let sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          let ranges = [];
          for (let i = 0, len = sel.rangeCount; i < len; ++i) {
            ranges.push(sel.getRangeAt(i));
          }
          return ranges;
        }
      } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
      }
      return null;
    }

    /**
     *  Loads a saved selection
     */
    function restoreSelection(savedSel) {
      if (savedSel) {
        if (window.getSelection) {
          let sel = window.getSelection();
          sel.removeAllRanges();
          for (let i = 0, len = savedSel.length; i < len; ++i) {
            sel.addRange(savedSel[i]);
          }
        } else if (document.selection && savedSel.select) {
          savedSel.select();
        }
      }
    }

    /**
     * Sets the current selected format buttons active/inactive
     */
    function selectionChange() {

      for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];

        // don't remove active class on code toggle button
        if (button.dataset.action === 'toggle-code') continue;

        button.classList.remove('active');
      }

      if (!childOf(window.getSelection().anchorNode.parentNode, editor)) return false;

      parentTagActive(window.getSelection().anchorNode.parentNode);
    }

    /**
     * Checks if the passed child has the passed parent
     */
    function childOf(child, parent) {
      return parent.contains(child);
    }

    /**
     * Sets the tag active that is responsible for the current element
     */
    function parentTagActive(elem) {
      if (!elem || !elem.classList || elem.classList.contains('visual-view')) return false;

      let toolbarButton;

      // active by tag names
      let tagName = elem.tagName.toLowerCase();
      toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-tag-name="${tagName}"]`)[0];
      if (toolbarButton) {
        toolbarButton.classList.add('active');
      }

      // active by text-align
      let textAlign = elem.style.textAlign;
      toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-style="textAlign:${textAlign}"]`)[0];
      if (toolbarButton) {
        toolbarButton.classList.add('active');
      }

      return parentTagActive(elem.parentNode);
    }

    /**
     * Handles the paste event and removes all HTML tags
     */
    function pasteEvent(e) {
      e.preventDefault();

      let text = (e.originalEvent || e).clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    }

    /**
     * This functions adds a paragraph tag when the enter key is pressed
     */
    function addParagraphTag(e) {
      if (e.keyCode === ENTER_KEYCODE) {
        if (window.getSelection().anchorNode.parentNode.tagName === 'LI') return;
        document.execCommand('formatBlock', false, 'p');
      }
    }
  },
  // eslint-enable
  /*watch: {
    modelValue(val) {
      const visualView = document.getElementsByClassName('visual-view')[0];
      visualView.innerHTML = val
    }
  },*/
  /*unmounted() {
    window.removeEventListener('click', this.onClickOutside)
  }*/
}
</script>

<style lang="scss" src="./TextEditor.scss"/>