# Microfrontends com Module Federation - Angular 15+

> **Case Técnico**: Aplicação demonstrando Microfrontends utilizando Module Federation no Angular 15+ com arquitetura modular e escalável.

## 📋 **REQUISITOS ATENDIDOS**

### ✅ **Configuração do Ambiente**
- ✅ Module Federation configurado no Angular 15+
- ✅ Shell carrega MFEs dinamicamente via lazy loading
- ✅ Webpack configurado para host e remotes

### ✅ **Backend Mockado** 
- ✅ json-server configurado com mock fornecido
- ✅ MFE Cadastro envia dados para backend (POST /users)
- ✅ MFE Sucesso exibe dados do backend (GET /users)

### ✅ **Funcionalidades Implementadas**
#### **MFE Cadastro:**
- ✅ Formulário com campos Nome (input texto) e E-mail (input texto)
- ✅ Botão "Salvar" envia dados para backend mockado
- ✅ Validações: Nome (min 2 chars), E-mail (formato válido)

#### **MFE Sucesso:**
- ✅ Exibe dados cadastrados na tela anterior
- ✅ Lista completa de usuários do backend
- ✅ Navegação de volta ao cadastro

### ✅ **Estilização**
- ✅ Interface cuidadosamente projetada
- ✅ Design responsivo e profissional
- ✅ UX otimizada para fluxo de cadastro

### ✅ **Entrega Completa**
- ✅ [Diagrama de Sequência](./SEQUENCE-DIAGRAM.md)
- ✅ [Desenho de Solução](./SOLUTION-ARCHITECTURE.md)
- ✅ README com instruções claras

## 🏗️ **ARQUITETURA**

O projeto é composto por **3 Microfrontends (MFEs)**:

- **Shell (Host)**: Orquestra os MFEs e gerencia navegação (Porta 4200)
- **MFE Cadastro**: Formulário para cadastro de usuários (Porta 4201)  
- **MFE Sucesso**: Exibe dados cadastrados e lista de usuários (Porta 4202)
- **API Mock**: Backend simulado com json-server (Porta 3001)

## 🚀 **COMO EXECUTAR**

### **Pré-requisitos**
```bash
- Node.js 18+
- Angular CLI 15+
- npm
```

### **Opção 1: Setup Automático Completo (RECOMENDADO)**
```bash
# 1. Clone o repositório
git clone https://github.com/rodrigo200200/angular-mfe.git
cd angular-mfe

# 2. Windows
./start-dev.bat

# 2. Linux/Mac
chmod +x start-dev.sh && ./start-dev.sh
```

### **Opção 2: Setup Manual Passo a Passo**
```bash
# 1. Clone o repositório
git clone https://github.com/rodrigo200200/angular-mfe.git
cd angular-mfe

# 2. Instale dependências em todos os projetos
npm run install:all

# 3. Em 4 terminais separados, execute:

# Terminal 1 - API Backend
npm run start:api

# Terminal 2 - MFE Cadastro (aguarde API iniciar)
npm run start:mfe-cadastro

# Terminal 3 - MFE Sucesso (aguarde MFE Cadastro)
npm run start:mfe-sucesso

# Terminal 4 - Shell Host (aguarde todos os MFEs)
npm run start:shell
```

### **Opção 3: Todos os Serviços Simultaneamente**
```bash
# Depois de instalar dependências
npm start
```

## 📍 **URLs DE ACESSO**

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **🏠 Aplicação Principal** | http://localhost:4200 | Shell host com navegação |
| **📝 MFE Cadastro** | http://localhost:4201 | Formulário de cadastro |
| **✅ MFE Sucesso** | http://localhost:4202 | Tela de sucesso |
| **🌐 API Backend** | http://localhost:3001/users | JSON Server API |

## 🧪 **COMO TESTAR**

### **Fluxo Principal (E2E)**
1. ✅ Acesse http://localhost:4200
2. ✅ Verifique redirecionamento para `/cadastro`
3. ✅ Preencha Nome: "João Silva"
4. ✅ Preencha E-mail: "joao@email.com"
5. ✅ Clique "Salvar"
6. ✅ Aguarde navegação para `/sucesso`
7. ✅ Verifique dados exibidos
8. ✅ Confirme usuário na lista
9. ✅ Teste botão "Cadastrar Novo Usuário"

### **Testes de Validação**
```bash
# Teste 1: Campos obrigatórios
- Deixe nome vazio → Deve mostrar erro
- Deixe email vazio → Deve mostrar erro

# Teste 2: Validação de formato
- Digite email inválido → Deve mostrar erro
- Digite nome com 1 char → Deve mostrar erro

# Teste 3: API Integration
curl http://localhost:3001/users
# Deve retornar JSON com usuários
```

### **Teste de MFEs Individuais**
```bash
# Teste MFE Cadastro direto
curl http://localhost:4201

# Teste MFE Sucesso direto  
curl http://localhost:4202

# Teste API Mock
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@email.com"}'
```

## ✨ Funcionalidades

### Shell (Host)
- ✅ Navegação entre MFEs
- ✅ Layout responsivo com header e footer
- ✅ Carregamento dinâmico dos remotes
- ✅ Roteamento principal da aplicação

### MFE Cadastro  
- ✅ Formulário reativo com validações
- ✅ Campos: Nome (min. 2 caracteres) e E-mail (formato válido)
- ✅ Integração com API REST (POST /users)
- ✅ Feedback visual durante envio
- ✅ Comunicação com MFE Sucesso via localStorage

### MFE Sucesso
- ✅ Exibição dos dados do usuário recém-cadastrado
- ✅ Lista completa de usuários cadastrados
- ✅ Integração com API REST (GET /users)
- ✅ Navegação de volta ao cadastro
- ✅ Loading states e tratamento de erros

### API Mock
- ✅ Endpoints RESTful (GET e POST /users)
- ✅ Persistência de dados em arquivo JSON
- ✅ CORS configurado para desenvolvimento

## 🔧 Tecnologias Utilizadas

- **Angular 15+** - Framework principal
- **Module Federation** - Arquitetura de microfrontends
- **Webpack** - Bundling e configuração de federation
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **SCSS** - Estilização
- **json-server** - Mock do backend
- **Angular Forms** - Formulários reativos

## 📁 Estrutura do Projeto

```
microfrontends-app/
├── api/                    # Mock API
│   └── db.json            # Dados dos usuários
├── shell/                 # MFE Host (4200)
│   ├── src/app/
│   │   ├── app.routes.ts  # Configuração de rotas para MFEs
│   │   └── app.ts         # Componente principal
│   └── webpack.config.js  # Configuração Module Federation
├── mfe-cadastro/         # MFE Cadastro (4201)
│   ├── src/app/cadastro/ # Módulo de cadastro
│   └── webpack.config.js # Exposição do módulo
├── mfe-sucesso/          # MFE Sucesso (4202)
│   ├── src/app/sucesso/  # Módulo de sucesso
│   └── webpack.config.js # Exposição do módulo
├── shared/               # Biblioteca compartilhada
│   ├── models/          # Interfaces TypeScript
│   └── services/        # Serviços compartilhados
├── start-dev.bat        # Script Windows
├── start-dev.sh         # Script Linux/Mac
└── package.json         # Scripts principais
```

## 🧪 Como Testar

### Fluxo Principal
1. Acesse http://localhost:4200
2. Preencha o formulário de cadastro
3. Submeta os dados
4. Verifique na tela de sucesso
5. Teste navegação entre MFEs

### Cenários de Teste
- ✅ Validação de campos obrigatórios
- ✅ Formato de e-mail inválido
- ✅ Persistência de dados na API
- ✅ Comunicação entre MFEs
- ✅ Responsividade mobile
- ✅ Tratamento de erros

## 📊 Diferenciais Implementados

### Boas Práticas
- ✅ **Standalone Components** (Angular 15+)
- ✅ **Zoneless Change Detection** 
- ✅ **Reactive Forms** com validações
- ✅ **Error Boundaries** e tratamento de erros
- ✅ **TypeScript interfaces** para tipagem
- ✅ **SCSS** com variáveis e mixins

### Arquitetura
- ✅ **Separation of Concerns** entre MFEs
- ✅ **Shared Libraries** para reutilização
- ✅ **Lazy Loading** de módulos
- ✅ **Multiple Communication Strategies**
- ✅ **Scalable Structure** para novos MFEs

### DevEx (Developer Experience)
- ✅ **Scripts de automação** para desenvolvimento
- ✅ **Hot Reload** em todos os MFEs
- ✅ **Documentação detalhada**
- ✅ **Guias de teste** e arquitetura
- ✅ **Cross-platform** scripts

## 📚 Documentação Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detalhes técnicos da arquitetura
- [TESTING.md](./TESTING.md) - Guia completo de testes

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Add nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido como demonstração de Microfrontends com Module Federation no Angular 15+**
