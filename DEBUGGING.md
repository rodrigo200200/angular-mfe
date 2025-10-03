# 🔧 Guia de Debugging - Microfrontends

## 🚨 Problemas Comuns e Soluções

### **1. MFE não carrega**
```bash
# Verificar se todas as portas estão rodando
netstat -an | findstr :4200  # Shell
netstat -an | findstr :4201  # MFE Cadastro
netstat -an | findstr :4202  # MFE Sucesso
netstat -an | findstr :3001  # API

# Reiniciar todos os serviços
cd shell && npm start
cd mfe-cadastro && npm start  
cd mfe-sucesso && npm start
cd api && npm run start
```

### **2. CORS Errors**
```bash
# Verificar se o json-server está rodando com CORS habilitado
cd api
npx json-server --watch db.json --port 3001 --cors
```

### **3. Module Federation Errors**
```bash
# Limpar cache e reinstalar
npm run clean:all
npm run install:all
npm run build:all
npm run start:all
```

## 🔍 Ferramentas de Debugging

### **Debug URLs**
- Shell: http://localhost:4200
- MFE Cadastro: http://localhost:4201
- MFE Sucesso: http://localhost:4202
- API: http://localhost:3001/users
- Health Check: http://localhost:4200/status (se implementado)

### **Browser DevTools**
```javascript
// No console do browser
// Ver logs da aplicação
JSON.parse(localStorage.getItem('app-logs'))

// Ver dados do último usuário
JSON.parse(localStorage.getItem('lastUser'))

// Verificar Module Federation
window.__FEDERATION__

// Debug do Webpack
window.__webpack_require__.cache
```

### **Network Tab - O que verificar**
- ✅ `remoteEntry.js` deve carregar (status 200)
- ✅ Chamadas para API (`/users`) devem funcionar
- ❌ Se CORS error, verificar backend
- ❌ Se 404 em remoteEntry.js, verificar se MFE está rodando

## 🛠️ Scripts de Diagnóstico

### **Verificar Status dos Serviços**
```bash
# Criar script de diagnóstico
echo "#!/bin/bash
echo '🔍 Verificando serviços...'

echo '📱 Shell (4200):'
curl -I http://localhost:4200 2>/dev/null | head -1

echo '📱 MFE Cadastro (4201):'
curl -I http://localhost:4201 2>/dev/null | head -1

echo '📱 MFE Sucesso (4202):'
curl -I http://localhost:4202 2>/dev/null | head -1

echo '🗄️ API (3001):'
curl -I http://localhost:3001/users 2>/dev/null | head -1
" > diagnostic.sh

chmod +x diagnostic.sh
./diagnostic.sh
```

## 🐛 Debugging por Problema

### **"Cannot load remote module"**
1. Verificar se o MFE está rodando na porta correta
2. Verificar webpack.config.js - expose paths
3. Verificar app.routes.ts - loadRemoteModule URLs
4. Ver Network tab - remoteEntry.js deve carregar

### **"Module not found"**
1. Verificar exposedModule name no webpack.config.js
2. Verificar import path no bootstrap.ts
3. Verificar se o module está sendo exportado corretamente

### **API não funciona**
1. Verificar se json-server está rodando
2. Verificar CORS headers
3. Ver Network tab para erro específico
4. Verificar URL do endpoint (localhost:3001)

### **Dados não aparecem**
1. Verificar localStorage no DevTools
2. Verificar se API retorna dados válidos
3. Verificar console para erros de parsing JSON
4. Verificar se componente está subscribed no observable

## 📊 Monitoramento

### **Logs Centralizados**
```typescript
// Adicionar em cada componente
import { Logger } from '../shared/utils/logger';

// Registrar eventos importantes
Logger.info('Component loaded', 'CadastroComponent');
Logger.error('API call failed', 'UserService', error);
```

### **Performance Monitoring**
```javascript
// No console do browser
performance.getEntriesByType('navigation')
performance.getEntriesByType('resource')
```

## 🔄 Fluxo de Debug Recomendado

1. **Verificar Serviços** → diagnostic.sh
2. **Verificar Network** → DevTools Network tab  
3. **Verificar Console** → Errors e warnings
4. **Verificar Storage** → localStorage data
5. **Verificar Código** → Breakpoints e logs

## 📞 Emergency Recovery

```bash
# Se tudo der errado, resetar ambiente
npm run clean:all
rm -rf node_modules package-lock.json (em cada projeto)
npm install (em cada projeto)
npm run build:all
npm run start:all
```

## 🎯 Checklist de Troubleshooting

- [ ] Todas as portas estão livres (4200, 4201, 4202, 3001)
- [ ] Todos os serviços estão rodando
- [ ] remoteEntry.js acessível em cada MFE
- [ ] API responde em /users
- [ ] CORS está habilitado
- [ ] Console não tem erros críticos
- [ ] localStorage funciona
- [ ] Navegação entre MFEs funciona
