#!/bin/bash

# Script para iniciar todos os serviços
echo "🚀 Iniciando aplicação de Microfrontends..."

# Verificar se json-server está instalado
if ! command -v json-server &> /dev/null; then
    echo "📦 Instalando json-server..."
    npm install -g json-server
fi

echo "🔧 Configurando ambiente..."

# Iniciar API em background
echo "🌐 Iniciando API (porta 3001)..."
cd api && json-server --watch db.json --port 3001 &
API_PID=$!

# Aguardar um pouco para a API iniciar
sleep 3

# Iniciar MFE Cadastro
echo "📝 Iniciando MFE Cadastro (porta 4201)..."
cd ../mfe-cadastro && npm start &
CADASTRO_PID=$!

# Aguardar um pouco
sleep 5

# Iniciar MFE Sucesso
echo "✅ Iniciando MFE Sucesso (porta 4202)..."
cd ../mfe-sucesso && npm start &
SUCESSO_PID=$!

# Aguardar um pouco
sleep 5

# Iniciar Shell
echo "🏠 Iniciando Shell (porta 4200)..."
cd ../shell && npm start &
SHELL_PID=$!

echo "✨ Todos os serviços foram iniciados!"
echo ""
echo "📍 Acesse a aplicação em: http://localhost:4200"
echo ""
echo "🔗 URLs dos serviços:"
echo "   - Shell (Host): http://localhost:4200"
echo "   - MFE Cadastro: http://localhost:4201"
echo "   - MFE Sucesso: http://localhost:4202"
echo "   - API: http://localhost:3001"
echo ""
echo "Para parar todos os serviços, pressione Ctrl+C"

# Função para cleanup quando o script for interrompido
cleanup() {
    echo ""
    echo "🛑 Parando todos os serviços..."
    kill $API_PID $CADASTRO_PID $SUCESSO_PID $SHELL_PID 2>/dev/null
    echo "✅ Todos os serviços foram parados."
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT

# Aguardar indefinidamente
wait
