# Desenho de Solução - Arquitetura Microfrontends

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         🌐 BROWSER (Cliente)                     │
│                      http://localhost:4200                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    🏠 SHELL (HOST MFE)                          │
│                     Porta: 4200                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  • Roteamento Principal (/cadastro, /sucesso)          │   │
│  │  • Carregamento Dinâmico de MFEs                       │   │
│  │  • Layout Global (Header, Footer, Navigation)          │   │
│  │  • Module Federation Host                              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────┬─────────────────────────┬─────────────────────────┘
              │                         │
              ▼                         ▼
┌─────────────────────────┐    ┌─────────────────────────┐
│   📝 MFE CADASTRO       │    │   ✅ MFE SUCESSO        │
│     Porta: 4201         │    │     Porta: 4202         │
│                         │    │                         │
│ ┌─────────────────────┐ │    │ ┌─────────────────────┐ │
│ │ • Formulário        │ │    │ │ • Exibir Dados      │ │
│ │ • Validações        │ │    │ │ • Lista Usuários    │ │
│ │ • HTTP Client       │ │    │ │ • HTTP Client       │ │
│ │ • LocalStorage      │ │    │ │ • LocalStorage      │ │
│ └─────────────────────┘ │    │ └─────────────────────┘ │
└─────────┬───────────────┘    └─────────┬───────────────┘
          │                              │
          └─────────────┬──────────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │     🌐 JSON-SERVER      │
            │       Porta: 3001       │
            │                         │
            │ ┌─────────────────────┐ │
            │ │  API Endpoints:     │ │
            │ │  • GET /users       │ │
            │ │  • POST /users      │ │
            │ │                     │ │
            │ │  Database:          │ │
            │ │  • api/db.json      │ │
            │ └─────────────────────┘ │
            └─────────────────────────┘
```

## Arquitetura Detalhada dos Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🏗️ MODULE FEDERATION ARCHITECTURE                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              🏠 SHELL (HOST)                                │
│                                                                             │
│  webpack.config.js:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  remotes: {                                                         │   │
│  │    "mfe-cadastro": "http://localhost:4201/remoteEntry.js",         │   │
│  │    "mfe-sucesso": "http://localhost:4202/remoteEntry.js"           │   │
│  │  }                                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  app.routes.ts:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  {                                                                  │   │
│  │    path: 'cadastro',                                                │   │
│  │    loadChildren: () => loadRemoteModule({                           │   │
│  │      remoteEntry: 'http://localhost:4201/remoteEntry.js',          │   │
│  │      exposedModule: './CadastroModule'                              │   │
│  │    })                                                               │   │
│  │  }                                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  │                  ▼
┌─────────────────────────────┐        │        ┌─────────────────────────────┐
│     📝 MFE CADASTRO          │        │        │     ✅ MFE SUCESSO           │
│                             │        │        │                             │
│  webpack.config.js:         │        │        │  webpack.config.js:         │
│  ┌─────────────────────────┐ │        │        │ ┌─────────────────────────┐ │
│  │  name: 'mfe-cadastro',  │ │        │        │ │  name: 'mfe-sucesso',   │ │
│  │  exposes: {             │ │        │        │ │  exposes: {             │ │
│  │    './CadastroModule':  │ │        │        │ │    './SucessoModule':   │ │
│  │    './src/app/cadastro/ │ │        │        │ │    './src/app/sucesso/  │ │
│  │     cadastro-module.ts' │ │        │        │ │     sucesso-module.ts'  │ │
│  │  }                      │ │        │        │ │  }                      │ │
│  └─────────────────────────┘ │        │        │ └─────────────────────────┘ │
│                             │        │        │                             │
│  Funcionalidades:           │        │        │  Funcionalidades:           │
│  • Reactive Forms           │        │        │  • Exibição de Dados        │
│  • Field Validations        │        │        │  • Lista de Usuários        │
│  • HTTP POST /users         │        │        │  • HTTP GET /users          │
│  • LocalStorage Write       │        │        │  • LocalStorage Read        │
│  • Navigation to Success    │        │        │  • Back to Cadastro         │
└─────────────────────────────┘        │        └─────────────────────────────┘
                                       │
                                       ▼
                        ┌─────────────────────────────┐
                        │      🌐 BACKEND MOCK        │
                        │                             │
                        │  json-server:               │
                        │  ┌─────────────────────────┐ │
                        │  │  Port: 3001             │ │
                        │  │  File: api/db.json      │ │
                        │  │                         │ │
                        │  │  Routes:                │ │
                        │  │  GET    /users          │ │
                        │  │  POST   /users          │ │
                        │  │  GET    /users/:id      │ │
                        │  │  PUT    /users/:id      │ │
                        │  │  DELETE /users/:id      │ │
                        │  └─────────────────────────┘ │
                        │                             │
                        │  Data Structure:            │
                        │  ┌─────────────────────────┐ │
                        │  │  {                      │ │
                        │  │    "users": [           │ │
                        │  │      {                  │ │
                        │  │        "id": 1,         │ │
                        │  │        "name": "João",  │ │
                        │  │        "email": "..."   │ │
                        │  │      }                  │ │
                        │  │    ]                    │ │
                        │  │  }                      │ │
                        │  └─────────────────────────┘ │
                        └─────────────────────────────┘
```

## Fluxo de Dados e Comunicação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           💾 ESTRATÉGIAS DE COMUNICAÇÃO                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  1️⃣ VIA LOCALSTORAGE (Dados Temporários)                                   │
│                                                                             │
│  MFE Cadastro ──────► LocalStorage ──────► MFE Sucesso                     │
│      │                     │                    │                          │
│      ▼                     ▼                    ▼                          │
│  setItem(                key:                getItem(                      │
│   'lastCreatedUser',    'lastCreatedUser'    'lastCreatedUser')            │
│   {id, name, email}                                                        │
│  )                                                                         │
│                                                                             │
│  ✅ Vantagens: Rápido, sem dependência de rede                             │
│  ⚠️  Limitações: Apenas para dados temporários                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  2️⃣ VIA API REST (Single Source of Truth)                                  │
│                                                                             │
│  MFE Cadastro ────────► API Backend ◄──────── MFE Sucesso                  │
│      │                     │                    │                          │
│      ▼                     ▼                    ▼                          │
│  POST /users           json-server           GET /users                    │
│  {name, email}         (Port 3001)           → [users array]              │
│      │                     │                                               │
│      ▼                     ▼                                               │
│  Response:             Persistent                                          │
│  {id, name, email}     File Storage                                        │
│                        (api/db.json)                                       │
│                                                                             │
│  ✅ Vantagens: Persistente, consistente, escalável                         │
│  ⚠️  Limitações: Requer conectividade                                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  3️⃣ VIA NAVIGATION/ROUTING (Controle de Fluxo)                             │
│                                                                             │
│  MFE Cadastro ────────► Shell Router ◄──────── MFE Sucesso                 │
│      │                     │                    │                          │
│      ▼                     ▼                    ▼                          │
│  window.location.href   Router.navigate()   routerLink="/cadastro"         │
│  = '/sucesso'           loadRemoteModule()                                  │
│                                                                             │
│  ✅ Vantagens: Controle de navegação, SEO-friendly                         │
│  ⚠️  Limitações: Não transfere dados diretamente                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Deployment e Infraestrutura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            🚀 DEPLOYMENT ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   🌐 CDN/DNS    │
                              │                 │
                              │ sua-app.com     │
                              └─────────┬───────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │  🔄 Load        │
                              │     Balancer    │
                              └─────────┬───────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
        ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
        │  🏠 Shell       │  │ 📝 MFE Cadastro │  │ ✅ MFE Sucesso  │
        │                 │  │                 │  │                 │
        │ Nginx/Apache    │  │ Nginx/Apache    │  │ Nginx/Apache    │
        │ Port: 80        │  │ Port: 8001      │  │ Port: 8002      │
        │                 │  │                 │  │                 │
        │ /               │  │ /mfe-cadastro/  │  │ /mfe-sucesso/   │
        │ Static Files    │  │ Static Files    │  │ Static Files    │
        └─────────────────┘  └─────────────────┘  └─────────────────┘
                    │                   │                   │
                    └───────────────────┼───────────────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ 🌐 API Backend  │
                              │                 │
                              │ Node.js/Express │
                              │ Port: 3000      │
                              │                 │
                              │ Database:       │
                              │ PostgreSQL/     │
                              │ MongoDB         │
                              └─────────────────┘
```
