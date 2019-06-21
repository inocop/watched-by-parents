// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import main from './Main';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Enable by command
    let enableCommand = vscode.commands.registerCommand('extension.enable', () => {
        if (main.enable()) showInfoRestart("Please reload to enable.");
    });
    context.subscriptions.push(enableCommand);

    // Disable by command
    let disableCommand = vscode.commands.registerCommand('extension.disable', () => {
        if (main.disable()) showInfoRestart("Please reload to disable.");
    });
    context.subscriptions.push(disableCommand);

    // Change Configuration
    let changeConfig = vscode.workspace.onDidChangeConfiguration(() => {
        if (main.enable(false)) showInfoRestart("Please reload to enable.");
    });
    context.subscriptions.push(changeConfig);
}


function showInfoRestart(message: string): void
{
    vscode.window.showInformationMessage(message, { title: "Restart VSCode" })
    .then((item) => {
        if (!item) return;
            vscode.commands.executeCommand('workbench.action.reloadWindow');
    });
}


// this method is called when your extension is deactivated
export function deactivate() {}
