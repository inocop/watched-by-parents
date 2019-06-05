// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import main from './Main';

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


    // Enable by command
    let enableCommand = vscode.commands.registerCommand('extension.enable', () => main.enable());
    context.subscriptions.push(enableCommand);

    // Disable by command
    let disableCommand = vscode.commands.registerCommand('extension.disable', () => main.disable() );
    context.subscriptions.push(disableCommand);

    // Auto Enable at install and update
    //let autoEnable = vscode.workspace.onDidChangeConfiguration(() => main.enable());
    //context.subscriptions.push(autoEnable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
