import * as vscode from "vscode";
import { bishengFormat } from "bisheng-formatter-core";
import {
  BishengMainFeature,
} from "bisheng-formatter-core/dist/types";

const DEBUG = 0;

const getFullRange = (doc: vscode.TextDocument) => {
  let start = new vscode.Position(0, 0);
  let end = new vscode.Position(
    doc.lineCount - 1,
    doc.lineAt(doc.lineCount - 1).text.length
  );
  let range = new vscode.Range(start, end);
  return range;
};

const formatContent = ({
  range,
  doc,
  edit,
}: {
  range: vscode.Range;
  doc: vscode.TextDocument;
  edit: vscode.TextEditorEdit;
}) => {
  const contentToFormat = doc.getText(range);
  /* Get Content */
  if (DEBUG) {
    console.log("Before Format");
    console.log(contentToFormat);
  }

  const mainFeature: BishengMainFeature =
    vscode.workspace.getConfiguration().get("mainFeature") || {};
  const useSimpleQuotation: boolean = vscode.workspace
    .getConfiguration()
    .get("general.useSimpleQuotation") || false;

  /* Format the content */
  const formattedContent = bishengFormat(contentToFormat, {
    mainFeature,
    useSimpleQuotation,
  });
  

  if (DEBUG) {
    console.log("After Format");
    console.log(formattedContent);
  }
  /* Replace the active content */
  edit.replace(range, formattedContent);
};

const main = (editor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
  const doc = editor.document;
  if (["markdown", "plaintext"].indexOf(doc.languageId) > -1) {
    // let editor = vscode.window.activeTextEditor;
    const selections = editor.selections;

    if (selections.filter((selection) => !selection.isEmpty).length > 0) {
      selections.forEach((selection) => {
        formatContent({
          range: new vscode.Range(selection.start, selection.end),
          doc,
          edit,
        });
      });
      vscode.window.showInformationMessage(
        "BiSheng Formatter: Selected Text Formatted"
      );
    } else {
      formatContent({
        range: getFullRange(doc),
        doc,
        edit,
      });
      vscode.window.showInformationMessage(
        "BiSheng Formatter: Document Formatted"
      );
    }
  } else {
    vscode.window.showInformationMessage(
      "BiSheng Formatter: Try to run Formatter in Markdown or PlainText"
    );
  }
};

const activate = (context: vscode.ExtensionContext) => {
  if (DEBUG) {
    console.log("Congratulations, BiSheng Formatter is ready!");
  }

  let formatterDisposable = vscode.commands.registerTextEditorCommand(
    "bisheng-formatter-vscode-extension.format",
    main
  );
  context.subscriptions.push(formatterDisposable);
};

const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
