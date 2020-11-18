import * as vscode from "vscode";
import { format } from "bisheng-formatter-core";

const DEBUG = 1;

const getFullRange = (doc: vscode.TextDocument) => {
  let start = new vscode.Position(0, 0);
  let end = new vscode.Position(
    doc.lineCount - 1,
    doc.lineAt(doc.lineCount - 1).text.length
  );
  let range = new vscode.Range(start, end);
  return range;
};

const getFullRangeContent = (doc: vscode.TextDocument) =>
  doc.getText(getFullRange(doc));

const formatDoc = (editor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
  // let editor = vscode.window.activeTextEditor;
  let doc = editor.document;

  if (DEBUG) {
    console.log(getFullRangeContent(doc));
  }

  if (["markdown", "plaintext"].indexOf(doc.languageId) > -1) {
    /* Get Content */
    let formattedContent = getFullRangeContent(doc);
    if (DEBUG) {
      console.log("Before Format");
      console.log(formattedContent);
    }

    /* Format the content */
    formattedContent = format(formattedContent);

    if (DEBUG) {
      console.log("After Format");
      console.log(formattedContent);
    }
    /* Replace the active content */
    edit.replace(getFullRange(doc), formattedContent);
  }
};

const activate = (context: vscode.ExtensionContext) => {
  console.log("Congratulations, BiSheng Formatter is ready!");

  let disposable = vscode.commands.registerCommand(
    "bisheng-formatter-vscode-extension.helloWorld",
    () => {
      // Display a message box to the user
      vscode.window.showInformationMessage("BiSheng Formatter: Activated");
    }
  );

  context.subscriptions.push(disposable);

  let formatterDisposable = vscode.commands.registerTextEditorCommand(
    "bisheng-formatter-vscode-extension.format",
    formatDoc
  );
  context.subscriptions.push(formatterDisposable);
};

const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
