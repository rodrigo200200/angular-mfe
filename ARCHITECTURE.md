# Arquitetura dos Microfrontends

## Visão Geral

Este projeto implementa uma arquitetura de Microfrontends utilizando Module Federation do Webpack, permitindo que diferentes equipes desenvolvam e implementem partes da aplicação de forma independente.

## Componentes da Arquitetura

### Shell (Host) - Porta 4200
- **Responsabilidade**: Orquestrar e carregar os MFEs
- **Tecnologia**: Angular 15+ com Module Federation
- **Funcionalidades**:
  - Roteamento principal da aplicação
  - Carregamento dinâmico dos MFEs
  - Layout base e navegação

### MFE Cadastro - Porta 4201
- **Responsabilidade**: Formulário de cadastro de usuários
- **Exposição**: `./CadastroModule`
- **Funcionalidades**:
  - Validação de formulário
  - Comunicação com API
  - Envio de dados para o MFE Sucesso

### MFE Sucesso - Porta 4202
- **Responsabilidade**: Exibição dos dados cadastrados
- **Exposição**: `./SucessoModule`
- **Funcionalidades**:
  - Exibição dos dados do usuário recém-cadastrado
  - Lista de todos os usuários
  - Navegação de volta para o cadastro

## Comunicação entre MFEs

### 1. Via LocalStorage
- Os dados do usuário recém-cadastrado são armazenados no localStorage
- O MFE Sucesso recupera esses dados para exibição

### 2. Via API REST
- Ambos os MFEs se comunicam com a mesma API
- Sincronização de dados através do backend

### 3. Via Navegação
- Utiliza-se `window.location.href` para navegação entre MFEs
- O Shell gerencia as rotas principais

## Configuração do Module Federation

### Shell (webpack.config.js)
```javascript
module.exports = withModuleFederationPlugin({
  remotes: {
    "mfe-cadastro": "http://localhost:4201/remoteEntry.js",
    "mfe-sucesso": "http://localhost:4202/remoteEntry.js",    
  }
});
```

### MFE Cadastro (webpack.config.js)
```javascript
module.exports = withModuleFederationPlugin({
  name: 'mfe-cadastro',
  exposes: {
    './CadastroModule': './src/app/cadastro/cadastro.module.ts',
  }
});
```

### MFE Sucesso (webpack.config.js)
```javascript
module.exports = withModuleFederationPlugin({
  name: 'mfe-sucesso',
  exposes: {
    './SucessoModule': './src/app/sucesso/sucesso.module.ts',
  }
});
```

## API Mock

A API utiliza json-server para simular um backend REST com os endpoints:

- `GET /users` - Lista todos os usuários
- `POST /users` - Cria um novo usuário

### Estrutura de Dados
```json
{
  "users": [
    { "id": 1, "name": "João", "email": "joao@email.com" },
    { "id": 2, "name": "Maria", "email": "maria@email.com" }
  ]
}
```

## Fluxo da Aplicação

1. **Acesso inicial**: Usuário acessa http://localhost:4200
2. **Redirecionamento**: Shell redireciona para `/cadastro`
3. **Carregamento do MFE**: Shell carrega dinamicamente o MFE Cadastro
4. **Preenchimento**: Usuário preenche o formulário
5. **Envio**: Dados são enviados para a API e salvos no localStorage
6. **Navegação**: Aplicação navega para `/sucesso`
7. **Exibição**: MFE Sucesso carrega e exibe os dados

## Benefícios da Arquitetura

- **Independência**: Cada MFE pode ser desenvolvido e implantado independentemente
- **Tecnologia agnóstica**: Diferentes MFEs podem usar diferentes versões do Angular
- **Escalabilidade**: Fácil adição de novos MFEs
- **Manutenibilidade**: Código isolado por domínio

## Considerações de Produção

- **Versionamento**: Implementar estratégias de versionamento para os MFEs
- **Error Boundaries**: Adicionar tratamento de erros para falhas de carregamento
- **Fallbacks**: Implementar fallbacks para quando MFEs não estão disponíveis
- **Performance**: Otimizar o carregamento e compartilhamento de dependências
- **Segurança**: Implementar autenticação e autorização entre MFEs
