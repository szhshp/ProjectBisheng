cd %cd%
cd ..
start npm run build 
xcopy dist ..\web\node_modules\bisheng-formatter-core\dist /Y /S /E
xcopy dist ..\vscode-extension\node_modules\bisheng-formatter-core\dist /Y /S /E