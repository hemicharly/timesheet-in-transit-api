# timesheet-in-transit-api (NestJs)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Documentação disponível em idiomas

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-br.md)


### Cobertura de teste

<p align="center">
  <img src="app/test/badges/entrypoints.svg" alt="Entrypoints" hspace="3">
  <img src="app/test/badges/core.svg" alt="Core" hspace="3">
  <img src="app/test/badges/infrastructure.svg" alt="Infrastructure" hspace="3">
  <img src="app/test/badges/shared.svg" alt="Shared" hspace="3">
</p>



## Introdução

Este projeto foi desenvolvido com fins didáticos, visando explorar e aprofundar o conhecimento no framework **NestJS**.
Ele funciona como um estudo prático para a "adaptação" de conceitos como **Clean Architecture** e
**Hexagonal Architecture**, visando promover boas práticas de design de software, garantindo uma clara
separação de responsabilidadese a abstração de dependências externas.

![architecture-timesheet-in-transit-api](diagram/architecture-timesheet-in-transit-api.png)

## 1. Requisitos de Instalação

Para rodar o projeto, você precisará dos seguintes requisitos:

* **Sistema Operacional**: Linux Ubuntu / Mint
* **Docker**: Certifique-se de ter o Docker instalado na sua máquina.
* **Docker Compose**: Instale o Docker Compose para orquestrar os containers.
* **Makefile**: Certifique-se de ter o Makefile instalado para facilitar a execução de comandos.
* **MongoDB**: Versão 8.x do MongoDB com container docker.
* **NodeJs**: Versão 22.x do NodeJs com container docker.
* **NodeJs**: Versão 20.x do NodeJs instalado na máquina local.
* **Yarn**: Versão 1.22.x do Yarn instalado na máquina local.

## 1.1. Estrutura do Projeto

Este projeto se assemelha muito à **Clean Architecture** e à **Hexagonal Architecture**, pois promove uma clara
separação de responsabilidades e abstração das dependências externas.
Isso facilita a manutenção, escalabilidade e testabilidade, além de permitir que a aplicação evolua sem impactos diretos
nas regras de negócios centrais.

A divisão ocorre em três módulos principais, cada um com uma responsabilidade específica:

```lua
timesheet-in-transit-api/
│-- app/
│   │-- src/
│   │   │-- app.module.ts
│   │   │-- database.module.ts
│   │   │-- index.ts
│   │   │-- main.ts
│   │   │-- seed.module.ts
│   │   │-- seed.ts
│   │   │-- entrypoints/
│   │   │   │-- consumers/
│   │   │   │-- web/
│   │   │   │   │-- config/
│   │   │   │   │-- rest/
│   │   │   │   │-- shared/
│   │   │-- core/
│   │   │   │-- domain/
│   │   │   │   │-- entities/
│   │   │   │   │-- enums/
│   │   │   │   │-- exceptions/
│   │   │   │-- providers/
│   │   │   │   │-- config-env/
│   │   │   │   │-- integrations/
│   │   │   │   │-- queue/
│   │   │   │   │-- repositories/
│   │   │   │-- usecases/
│   │   │   │   │-- auth/
│   │   │   │   │-- notification/
│   │   │   │   │-- orders/
│   │   │-- infrastructure/
│   │   │   │-- config-env/
│   │   │   │-- integrations/
│   │   │   │-- queue/
│   │   │   │-- repositories/
│   │   │-- shared/
│   │   │   │-- audit/
│   │   │   │-- config/
│   │-- test/
│   │   │-- entrypoints/
│   │   │   │-- web/
│   │   │   │   │-- rest/
```

### **entrypoints**

O módulo `entrypoints` é responsável pela gestão dos pontos de entrada da aplicação, como `web`, `jobs` e
`consumers`.

**Importante**: **não deve conter regras de negócio**. Este pode ter validações de entradas de dados
de objetos de requests.

### **core**

O módulo `core` gerencia todas as regras de negócio da aplicação. Algumas diretrizes importantes:

- Este módulo deve ser **autônomo** e **sem dependências externas**.
- Não use framework ou bibliotecas.
- A pasta **domain** dentro do módulo contém as entidades e regras de negócio em nível mais granular.
- **Comunicação de saída** para sistemas externos deve ser feita através das interfaces definidas no módulo `providers`.
- **Comunicação de entrada** deve ocorrer através das interfaces do módulo `usecases`.

### **infrastructure**

O módulo `infrastructure` gerencia a comunicação externa da aplicação, como:

- **Conexões com Bancos de Dados**
- **Integrações com APIs**
- **Mensageria**

**Importante**: O módulo `infrastructure` **não deve conter regras de negócio**.

### **shared**

O módulo `shared` é usado para compartilhar funcionalidades/utilitários comuns.


## 2. Passos para Rodar o Projeto

### 2.1. Iniciando o Projeto em Modo Desenvolvimento

Siga os passos abaixo para rodar o projeto em modo desenvolvimento.

#### 2.1.1. **Copiar o arquivo de configuração**:

- Copie o arquivo `.env.dist` para `.env` com o comando:
```bash
  cp .env.dist .env
```

#### 2.1.2. **Iniciar o projeto com Docker usando os comandos**:

- Cria a rede Docker necessária para o projeto:
```bash
  make create-network
```

- Constrói as imagens Docker:
```bash
  make build
```

- Instala as dependências do projeto:
```bash
  make install
```

- Atualiza as dependências do projeto:
```bash
  make upgrade-lib
```

- Popula o banco de dados com dados iniciais:
```bash
  make seed
```

- Inicia container docker do mongodb:
```bash
  make mongodb
```

- Inicia container docker do localstack:
```bash
  make localstack-dev
```

- Cria filas no localstack:
```bash
  make create-queue-local
```

- Inicia a aplicação no modo desenvolvimento:
```bash
  make dev
```

- Executa lint e formatação do código:
```bash
  make lint-format
```

- Gera índices automaticamente (se necessário):
```bash
  make generate-index
```

- Gera arquivos de teste automaticamente:
```bash
  make generate-test-file
```

- Executa testes:
```bash
  make test
```

- Executa testes de cobertura:
```bash
  make test-coverage
```


### 2.2. Documentação

O projeto inclui várias formas de documentação acessíveis localmente:

- [Swagger UI - Interface Interativa](http://localhost:3000/swagger-doc)
- [Swagger JSON - Documento Swagger](http://localhost:3000/swagger-doc-json)
- [Redoc - Documentação Alternativa](http://localhost:3000/docs)
- [Health Check - Verificação de Saúde da Aplicação](http://localhost:3000/health)

### 2.3. Diagramas

Para melhor compreensão do fluxo da aplicação, consulte os diagramas abaixo:

- [Diagrama](diagram/README.md)