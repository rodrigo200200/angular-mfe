# Guia de Teste da Aplicação

## Pré-requisitos
- Node.js 18+
- Angular CLI 15+
- npm

## Como Executar

### Opção 1: Script Automático (Windows)
```bash
# Execute o script que inicia todos os serviços
./start-dev.bat
```

### Opção 2: Script Automático (Linux/Mac)
```bash
# Dê permissão de execução
chmod +x start-dev.sh

# Execute o script
./start-dev.sh
```

### Opção 3: Manual
```bash
# 1. Instalar dependências
npm run install:all

# 2. Terminal 1 - API
npm run start:api

# 3. Terminal 2 - MFE Cadastro
npm run start:mfe-cadastro

# 4. Terminal 3 - MFE Sucesso
npm run start:mfe-sucesso

# 5. Terminal 4 - Shell
npm run start:shell
```

## Testando a Aplicação

### 1. Acesso Inicial
- Abra o navegador em http://localhost:4200
- Verifique se a aplicação redireciona para `/cadastro`
- Confirme se o MFE Cadastro foi carregado

### 2. Teste do Formulário de Cadastro
- Preencha o campo "Nome" (mínimo 2 caracteres)
- Preencha o campo "E-mail" (formato válido)
- Teste as validações:
  - Deixe campos vazios e tente submeter
  - Digite um e-mail inválido
  - Digite um nome com menos de 2 caracteres
- Clique em "Cadastrar" com dados válidos

### 3. Teste da Navegação
- Após cadastro bem-sucedido, verifique se navega para `/sucesso`
- Confirme se o MFE Sucesso foi carregado

### 4. Teste da Exibição de Dados
- Verifique se os dados cadastrados aparecem na seção "Dados Cadastrados"
- Confirme se a lista "Todos os Usuários Cadastrados" é exibida
- Verifique se o novo usuário aparece na lista

### 5. Teste da API
Teste diretamente os endpoints:

```bash
# Listar usuários
curl http://localhost:3001/users

# Criar usuário
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com"}'
```

### 6. Teste de Navegação de Volta
- Clique no botão "Cadastrar Novo Usuário"
- Verifique se retorna para a tela de cadastro
- Confirme se os dados foram limpos do localStorage

## Cenários de Teste

### Teste 1: Fluxo Completo
1. Acesse a aplicação
2. Cadastre: "Ana Silva", "ana.silva@email.com"
3. Verifique na tela de sucesso
4. Volte para o cadastro
5. Cadastre: "Carlos Santos", "carlos@email.com"
6. Verifique se ambos aparecem na lista

### Teste 2: Validações
1. Tente cadastrar apenas com nome
2. Tente cadastrar com e-mail inválido
3. Tente cadastrar com nome de 1 caractere
4. Verifique se as mensagens de erro aparecem

### Teste 3: Persistência
1. Cadastre um usuário
2. Feche o navegador
3. Abra novamente e vá para `/sucesso`
4. Verifique se o usuário permanece na lista (via API)

## URLs de Teste

- **Aplicação Principal**: http://localhost:4200
- **MFE Cadastro direto**: http://localhost:4201
- **MFE Sucesso direto**: http://localhost:4202
- **API**: http://localhost:3001/users
- **Rotas do Shell**:
  - http://localhost:4200/cadastro
  - http://localhost:4200/sucesso

## Troubleshooting

### Problema: MFE não carrega
- Verifique se todos os serviços estão rodando
- Confirme as portas 4200, 4201, 4202, 3001
- Verifique o console do navegador para erros

### Problema: API não responde
- Confirme se json-server está instalado: `npm list -g json-server`
- Verifique se o arquivo `api/db.json` existe
- Teste direto: http://localhost:3001/users

### Problema: Formulário não valida
- Verifique o console para erros
- Confirme se ReactiveFormsModule foi importado
- Teste cada validação individualmente

### Problema: Dados não persistem
- Verifique se a API está respondendo
- Confirme se o localStorage está funcionando
- Teste a comunicação HTTP no DevTools
