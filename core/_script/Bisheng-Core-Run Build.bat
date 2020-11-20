cd %cd%
cd ..
npm run build 
copy dist ..\vscode-extension\node_modules\bisheng-formatter-core\dist /Y
