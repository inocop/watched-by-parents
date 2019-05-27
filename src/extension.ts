// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "watched-by-parents" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}



/*

.editor-container .editor-instance
{
	background: rgba(255,255,255,0.5);
}

.editor-container .editor-instance[data-mode-id=ruby] .monaco-editor-background
{
	background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/Yukihiro_Matsumoto.JPG");
	//opacity: 0.5;
	background-position: bottom right;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: 400px auto;
}

.editor-container .editor-instance[data-mode-id=javascript] .monaco-editor-background
{
	background-image: url();
}

*/