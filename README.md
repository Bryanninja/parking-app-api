# 🚗 Parking App API

> Uma API RESTful profissional para gestão operacional, controle de acesso e métricas financeiras de estacionamentos rotativos.

Desenvolvida com **Node.js** nativo (ES Modules), **Express**, **Prisma ORM**, **PostgreSQL** e **Docker**, seguindo rigorosamente os princípios de **Clean Architecture**, **SOLID** e boas práticas de engenharia de software.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Arquitetura e Boas Práticas](#-arquitetura-e-boas-práticas)
- [Regras de Negócio e Funcionalidades](#-regras-de-negócio-e-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Rotas da API](#-rotas-da-api)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Qualidade de Código e Git Hooks](#-qualidade-de-código-e-git-hooks)

---

## 🎯 Visão Geral

O **Parking App API** é o backend responsável por gerenciar toda a operação de um estacionamento moderno:
- Cadastro e controle de clientes com integridade referencial.
- Check-in de veículos com validação universal de placas brasileiras.
- Check-out automático com cálculo de permanência, carência de tolerância e tarifação por hora.
- Listagens paginadas e filtradas por períodos customizados.
- Dashboard analítico em tempo real com comparativo dia a dia e gráfico de horários de pico.

---

## 🏛 Arquitetura e Boas Práticas

O projeto foi construído sobre as bases da **Clean Architecture** (Arquitetura Limpa), desacoplando a lógica de negócio dos frameworks e bibliotecas externas.

### Fluxo de Dados:
```
[ Requisição HTTP ]
        │
        ▼
   [ Routes ] ────────── Define os endpoints e métodos HTTP
        │
        ▼
  [ Controllers ] ────── Valida e sanitiza requisições com Zod (Fronteira HTTP)
        │
        ▼
   [ UseCases ] ──────── Executa as regras de negócio puras (Independente de HTTP)
        │
        ▼
 [ Repositories ] ───── Abstrai o acesso aos dados
        │
        ▼
[ Prisma ORM / DB ] ─── PostgreSQL
```

### Princípios Aplicados:
- **SOLID**:
  - **S (Single Responsibility):** Controllers apenas adaptam HTTP; UseCases apenas executam regras de negócio; Repositories apenas realizam consultas ao banco.
  - **D (Dependency Inversion):** UseCases dependem de interfaces/abstrações de repositórios injetadas via construtor, facilitando testes e desacoplamento.
- **Factory Pattern:** Criação e injeção de dependências centralizadas na pasta `factories/`.
- **Fail-Fast & Defensive Validation:** Validação estrita de entradas com Zod antes de atingir o domínio.

---

## ⚙️ Regras de Negócio e Funcionalidades

### 1. Gestão de Clientes
- Cadastro completo com nome e telefone.
- Validação de telefone com DDD (10 ou 11 dígitos numéricos).
- Integridade referencial: exclusão bloqueada (`onDelete: Restrict`) caso o cliente possua histórico de tickets vinculados.

### 2. Controle de Entrada (Check-in)
- **Validação Universal de Placas:** Expressão regular que valida tanto o formato brasileiro tradicional (`ABC1234`) quanto o formato Mercosul (`ABC1D23`).
- Sanitização automática (remoção de hifens, espaços e conversão para maiúsculas).
- **Anti-Duplicidade:** Bloqueio de entrada se a placa já estiver com status `PARKED` (estacionado).

### 3. Controle de Saída (Check-out) e Cobrança
- **Tolerância Gratuita:** Saídas em até **15 minutos** são isentas de cobrança (`total_amount: 0` e `payment_method: null`).
- **Cálculo de Tarifação:** 
  - Valor base: **R$ 10,00** por hora iniciada.
  - **Carência de 15 minutos na transição:** Se o veículo permanecer por 1 hora e 12 minutos, é cobrada apenas 1 hora. Se permanecer 1 hora e 16 minutos, a segunda hora é contabilizada.
- Métodos de pagamento aceitos: `CASH`, `CARD`, `PIX`.

### 4. Listagem e Filtros
- Paginação dinâmica com cálculo matemático de deslocamento (`skip = (page - 1) * limit`).
- Proteção contra requisições abusivas com limites máximos via Zod (`limit.max(100)`).
- **Filtros por Período:** Suporte a atalhos: `today`, `yesterday`, `last_7_days`, `last_14_days`, `this_month` e `this_year`.

### 5. Dashboard Operacional & Métricas em Tempo Real
- **Clientes Hoje vs. Ontem:** Total de clientes atendidos no dia e comparativo numérico com o dia anterior.
- **Receita Hoje vs. Ontem:** Faturamento consolidado do dia vs. dia anterior.
- **Taxa de Crescimento:** Cálculo percentual de evolução em relação a ontem (com proteção contra divisão por zero).
- **Distribuição de Picos:** Agrupamento automático dos ingressos em 6 faixas horárias operacionais:
  - `06:00 / 09:00`
  - `09:00 / 12:00`
  - `12:00 / 15:00`
  - `15:00 / 18:00`
  - `18:00 / 21:00`
  - `21:00 / 00:00`

---

## 🛠 Tecnologias Utilizadas

- **Linguagem:** JavaScript (Node.js v20+ em formato nativo ESM)
- **Framework Web:** Express 5
- **Banco de Dados:** PostgreSQL 16
- **ORM:** Prisma v6
- **Validação de Esquemas:** Zod v4
- **Containerização:** Docker e Docker Compose
- **Qualidade & Padronização:** ESLint, Prettier, Husky, Lint-staged, Commitlint

---

## 🛣 Rotas da API

### Clientes (`/api/customers`)
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/customers` | Cadastra um novo cliente |
| `GET` | `/api/customers` | Lista todos os clientes |
| `PATCH` | `/api/customers/:customerId` | Atualiza dados do cliente |
| `DELETE` | `/api/customers/:customerId` | Remove um cliente (sem tickets ativos) |

### Tickets (`/api/tickets`)
| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/tickets` | Realiza o check-in de um veículo |
| `PATCH` | `/api/tickets/:ticketId/checkout` | Realiza o check-out e processa cobrança |
| `GET` | `/api/tickets?page=1&limit=10&period=today` | Lista tickets com paginação e filtros |
| `DELETE` | `/api/tickets/:ticketId` | Exclui um ticket do sistema |

### Dashboard (`/api/dashboard`)
| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/dashboard` | Retorna métricas consolidadas e gráfico horário |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker e Docker Compose](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Bryanninja/parking-app-api.git
   cd parking-app-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
   *(Assegure-se de que a `DATABASE_URL` esteja apontando para o seu container do Postgres).*

4. **Inicie o banco de dados via Docker:**
   ```bash
   docker compose up -d
   ```

5. **Execute as migrations do Prisma:**
   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O servidor estará rodando em: `http://localhost:3000`  
Endpoint de verificação de saúde: `http://localhost:3000/health`

---

## 🛡 Qualidade de Código e Git Hooks

O repositório possui automações ativas com **Husky** para garantir a saúde do código:
- **`pre-commit`:** Executa o `lint-staged` para aplicar correções automáticas com **ESLint** e formatação com **Prettier** antes de cada commit.
- **`commit-msg`:** Valida mensagens através do **Commitlint** seguindo a convenção [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat:`, `fix:`, `refactor:`, `chore:`).

---

## 👨‍💻 Autor

Desenvolvido por **Bryan**  
GitHub: [@Bryanninja](https://github.com/Bryanninja)
