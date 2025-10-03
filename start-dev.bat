@echo off
echo 🚀 Iniciando aplicação de Microfrontends...

echo 🌐 Iniciando API (porta 3001)...
start "API" cmd /k "cd api && npx json-server --watch db.json --port 3001"

timeout /t 3

echo 📝 Iniciando MFE Cadastro (porta 4201)...
start "MFE Cadastro" cmd /k "cd mfe-cadastro && npm start"

timeout /t 5

echo ✅ Iniciando MFE Sucesso (porta 4202)...
start "MFE Sucesso" cmd /k "cd mfe-sucesso && npm start"

timeout /t 5

echo 🏠 Iniciando Shell (porta 4200)...
start "Shell" cmd /k "cd shell && npm start"

echo.
echo ✨ Todos os serviços foram iniciados!
echo.
echo 📍 Acesse a aplicação em: http://localhost:4200
echo.
echo 🔗 URLs dos serviços:
echo    - Shell (Host): http://localhost:4200
echo    - MFE Cadastro: http://localhost:4201
echo    - MFE Sucesso: http://localhost:4202
echo    - API: http://localhost:3001
echo.
echo Para parar os serviços, feche as janelas do terminal abertas.
pause
