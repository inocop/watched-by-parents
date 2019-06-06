// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import main from './Main';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Enable by command
    let enableCommand = vscode.commands.registerCommand('extension.enable', () => main.enable());
    context.subscriptions.push(enableCommand);

    // Disable by command
    let disableCommand = vscode.commands.registerCommand('extension.disable', () => main.disable() );
    context.subscriptions.push(disableCommand);

    // Auto Enable at install and update
    let autoEnable = vscode.workspace.onDidChangeConfiguration(() => main.enable());
    context.subscriptions.push(autoEnable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
