# Guia de Deploy - Microfrontends

## Deploy em Produção

### 1. Build dos MFEs
```bash
# Build de todos os MFEs
npm run build

# Ou individualmente
cd shell && ng build --configuration production
cd ../mfe-cadastro && ng build --configuration production  
cd ../mfe-sucesso && ng build --configuration production
```

### 2. Estrutura de Deploy
```
dist/
├── shell/              # Aplicação host
├── mfe-cadastro/       # MFE remoto 1
├── mfe-sucesso/        # MFE remoto 2
└── api/                # Backend ou configuração
```

### 3. Configuração de Servidor

#### Nginx
```nginx
server {
    listen 80;
    server_name sua-aplicacao.com;

    # Shell (Host)
    location / {
        root /var/www/dist/shell;
        try_files $uri $uri/ /index.html;
    }

    # MFE Cadastro
    location /mfe-cadastro/ {
        root /var/www/dist;
        try_files $uri $uri/ /mfe-cadastro/index.html;
    }

    # MFE Sucesso  
    location /mfe-sucesso/ {
        root /var/www/dist;
        try_files $uri $uri/ /mfe-sucesso/index.html;
    }

    # Headers CORS
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept';
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName sua-aplicacao.com
    DocumentRoot /var/www/dist/shell

    # Shell
    <Directory "/var/www/dist/shell">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        FallbackResource /index.html
    </Directory>

    # MFEs
    Alias /mfe-cadastro /var/www/dist/mfe-cadastro
    Alias /mfe-sucesso /var/www/dist/mfe-sucesso

    # CORS Headers
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET,POST,OPTIONS"
    Header always set Access-Control-Allow-Headers "Origin,Content-Type,Accept"
</VirtualHost>
```

### 4. Docker (Opcional)

#### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build shell
COPY shell/ ./shell/
RUN cd shell && npm run build

# Build MFE Cadastro  
COPY mfe-cadastro/ ./mfe-cadastro/
RUN cd mfe-cadastro && npm run build

# Build MFE Sucesso
COPY mfe-sucesso/ ./mfe-sucesso/
RUN cd mfe-sucesso && npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/shell/dist /usr/share/nginx/html
COPY --from=build /app/mfe-cadastro/dist /usr/share/nginx/html/mfe-cadastro
COPY --from=build /app/mfe-sucesso/dist /usr/share/nginx/html/mfe-sucesso
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
  
  api:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./api:/app
    command: npx json-server --watch db.json --host 0.0.0.0 --port 3001
    ports:
      - "3001:3001"
```

### 5. Configurações de Produção

#### URLs de Produção
```typescript
// webpack.config.js (shell)
module.exports = withModuleFederationPlugin({
  remotes: {
    "mfe-cadastro": "https://sua-aplicacao.com/mfe-cadastro/remoteEntry.js",
    "mfe-sucesso": "https://sua-aplicacao.com/mfe-sucesso/remoteEntry.js",    
  },
  // ...
});
```

#### Variáveis de Ambiente
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.sua-aplicacao.com',
  mfeCadastroUrl: 'https://sua-aplicacao.com/mfe-cadastro',
  mfeSucessoUrl: 'https://sua-aplicacao.com/mfe-sucesso'
};
```

### 6. CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy Microfrontends

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm run install:all
    
    - name: Build all MFEs
      run: npm run build
    
    - name: Deploy to server
      run: |
        # Script de deploy para seu servidor
        scp -r dist/ user@servidor:/var/www/
```

### 7. Monitoramento

#### Health Checks
```typescript
// health-check.service.ts
@Injectable()
export class HealthCheckService {
  checkMFEHealth(): Observable<boolean> {
    return this.http.get('http://mfe-cadastro/health').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
```

#### Error Tracking
```typescript
// error-handler.service.ts
@Injectable()
export class ErrorHandlerService {
  handleError(error: any): void {
    // Integração com Sentry, DataDog, etc.
    console.error('MFE Error:', error);
  }
}
```

### 8. Considerações de Performance

- **CDN**: Hospedar assets estáticos em CDN
- **Caching**: Configurar cache headers apropriados
- **Compression**: Habilitar gzip/brotli
- **Bundle Analysis**: Monitorar tamanho dos bundles
- **Lazy Loading**: Carregar MFEs sob demanda

### 9. Segurança

- **HTTPS**: Sempre usar conexões seguras
- **CSP**: Content Security Policy
- **CORS**: Configuração apropriada
- **Sanitização**: Validar inputs do usuário
