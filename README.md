# Premium Platform API

Uma API robusta desenvolvida com **NestJS** e **TypeScript** como projeto de estudos para aprofundar conhecimentos em arquitetura de software, boas práticas de desenvolvimento e tecnologias modernas.

## 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido com foco nos seguintes conceitos e tecnologias:

### 📚 Princípios SOLID

- **Single Responsibility Principle (SRP)**: Cada classe e módulo tem uma única responsabilidade bem definida
- **Open/Closed Principle (OCP)**: Sistema extensível sem modificar código existente
- **Liskov Substitution Principle (LSP)**: Substituição de classes base por suas derivadas
- **Interface Segregation Principle (ISP)**: Interfaces específicas e coesas
- **Dependency Inversion Principle (DIP)**: Dependência de abstrações, não de implementações concretas

### 🏗️ Arquitetura de Dados

- **Padrão Repository**: Abstração da camada de dados
- **Entity Relationship Modeling**: Modelagem relacional com TypeORM
- **Database Migrations**: Versionamento e evolução do schema
- **Data Transfer Objects (DTOs)**: Validação e transformação de dados
- **Cache Strategy**: Implementação de cache com Redis para otimização

### 🎨 Design Patterns

- **Dependency Injection**: Injeção de dependências nativa do NestJS
- **Guard Pattern**: Proteção de rotas com AuthGuard e RolesGuard
- **Decorator Pattern**: Decorators personalizados para roles e validações
- **Factory Pattern**: Configuração dinâmica de serviços
- **Strategy Pattern**: Diferentes estratégias de autenticação e autorização

### 🐳 Docker (Primeiro Contato)

- **Containerização**: Aplicação containerizada com Dockerfile
- **Docker Compose**: Orquestração de múltiplos serviços
- **Multi-container Setup**: PostgreSQL + Redis + API
- **Environment Management**: Configuração de ambientes via containers

### 🔴 Redis (Primeiro Contato)

- **Cache Implementation**: Sistema de cache para otimização de performance
- **Token Blacklist**: Gerenciamento de tokens inválidos/expirados
- **Session Management**: Armazenamento de dados de sessão
- **TTL Management**: Controle de tempo de vida dos dados

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **NestJS** (Framework)
- **TypeORM** (ORM)
- **PostgreSQL** (Database)
- **Redis** (Cache & Session Store)
- **Docker** + **Docker Compose**
- **JWT** (Authentication)
- **bcrypt** (Password Hashing)
- **Nodemailer** (Email Service)

## 🏗️ Arquitetura do Projeto

```
src/
├── common/                 # Componentes compartilhados
│   ├── decorators/        # Decorators customizados (@Roles)
│   ├── guards/            # Guards de autenticação e autorização
│   ├── redis/             # Serviço e configuração Redis
│   ├── mail/              # Serviço de email
│   └── utils/             # Utilitários e helpers
├── database/              # Configuração e migrations
├── modules/               # Módulos de domínio
│   ├── auth/              # Autenticação e autorização
│   ├── users/             # Gestão de usuários
│   ├── subscription/      # Sistema de assinaturas
│   └── subscription-plan/ # Planos de assinatura
├── init/                  # Inicializadores (admin padrão)
└── types/                 # Definições de tipos
```

## 🚀 Funcionalidades

- **Autenticação JWT** com blacklist de tokens
- **Sistema de Roles** (Admin, User)
- **Gestão de Usuários** com validação de email
- **Sistema de Assinaturas Premium**
- **Cache Inteligente** com Redis
- **Email Service** para confirmações
- **Database Migrations** automáticas

## 📦 Como Executar

### Com Docker (Recomendado)

```bash
# Clone o repositório
git clone <repository-url>
cd Premium-platform-API

# Configure as variáveis de ambiente
cp .env.example .env

# Execute com Docker Compose
docker-compose up -d
```

### Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Execute as migrations
npm run migration:run

# Inicie em modo desenvolvimento
npm run start:dev
```

## 🎓 Aprendizados Principais

### Princípios SOLID na Prática

- Separação clara de responsabilidades entre controllers, services e repositories
- Uso de interfaces para definir contratos entre camadas
- Injeção de dependências para baixo acoplamento

### Arquitetura Modular

- Estrutura baseada em domínios (DDD-inspired)
- Reutilização de componentes através de módulos compartilhados
- Configuração centralizada e environment-aware

### Performance e Escalabilidade

- Implementação de cache estratégico com Redis
- Otimização de queries com TypeORM
- Gerenciamento eficiente de sessões e tokens

### DevOps e Containerização

- Primeiro contato prático com Docker e orquestração
- Configuração de ambientes isolados e reproduzíveis
- Integração de múltiplos serviços (API, DB, Cache)

## 📈 Próximos Passos

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar rate limiting
- [ ] Adicionar monitoring e logging estruturado
- [ ] Explorar padrões de microserviços

---

_Este projeto representa uma jornada de aprendizado contínuo em arquitetura de software, boas práticas de desenvolvimento e tecnologias modernas do ecossistema Node.js._

Desenvolvido por Anderson Freire 🚀
