/* eslint-disable no-param-reassign, no-unused-vars, import/no-extraneous-dependencies */
import type { ContentScriptContext, MarkdownEditorContentScriptModule } from 'api/types';
import { EditorView } from '@codemirror/view';

// modified from: https://github.com/personalizedrefrigerator/bug-report/tree/example/plugin-scroll-to-line
export default (context: ContentScriptContext): MarkdownEditorContentScriptModule => ({
  plugin: (editorControl: any) => {
    if (!editorControl.cm6) { return; }

    // Running in CM6
    editorControl.registerCommand('scrollToLine', (lineNumber: number) => {
      const { editor } = editorControl;

      // Bounds checking
      if (lineNumber < 0) {
        lineNumber = 0;
      }
      if (lineNumber >= editor.state.doc.lines) {
        lineNumber = editor.state.doc.lines - 1;
      }

      // Scroll to line, place the line at the *top* of the editor
      const lineInfo = editor.state.doc.line(lineNumber + 1);
      editor.dispatch(editor.state.update({
        effects: EditorView.scrollIntoView(lineInfo.from, { y: 'start' }),
      }));
    });
  },
});
