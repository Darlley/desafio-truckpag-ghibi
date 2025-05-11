# Desafio TruckPag - Filmes Studio Ghibli

Este projeto é uma aplicação web desenvolvida como parte do desafio técnico da **TruckPag**. Ele exibe uma lista de filmes do **Studio Ghibli**, permitindo aos usuários visualizar detalhes, marcar como favoritos, assistidos e adicionar avaliações pessoais.

Para a UI me inspirei no feed do TikTok junto com os cards de filmes em destaque da Netflix.

![Captura de tela_11-5-2025_15194_localhost](https://github.com/user-attachments/assets/d9d58c09-f602-44c5-8363-883b5012311a)

---

## 🚀 Funcionalidades

* Exibição de uma lista de filmes do Studio Ghibli em um feed vertical.
* Visualização de detalhes do filme: título, imagem, banner, data de lançamento, duração, descrição, diretor, produtor e pontuação.
* Marcar filmes como **Favoritos**.
* Marcar filmes como **Assistidos**.
* Adicionar **Avaliação** (nota de 1 a 5 estrelas) e **Comentário** por filme.
* Interface **responsiva** para dispositivos móveis e desktop.
* Persistência de interações do usuário (`localStorage`).
* Modal para **filtros** (com muita ajuda da IA nesta parte para ser sincero).
* Modal para **comentários** (UI implementada com dados estáticos, a ideia era implementar o [utterances](https://github.com/utterance/utterances)).

---

## 🧪 Tech Stack

### Frontend

* **Next.js (v15)** – Framework React com App Router.
* **React (v19)** – Biblioteca para construção de interfaces.
* **TypeScript** – Superset do JavaScript com tipagem estática.
* **Tailwind CSS (v4)** – Framework CSS utility-first.
* **TanStack Query (v5)** – Gerenciamento de cache e requisições (React Query).
* **Zustand (v5)** – Gerenciamento de estado global e armazenamento no LocalStorage.
* **Axios** – Cliente HTTP baseado em Promises.
* **ShadCN** – Primitivos de UI acessíveis (usados via componentes customizados).
* **Matsu** - Componentes do Shdcn customizados inspirados nos estilos do Studio Ghibli.
* **Lucide React** – Ícones SVG.

### API Externa

* **Ghibli API** – Fornece os dados dos filmes.

---

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Rotas, layouts e páginas (App Router)
│   ├── globals.css      # Estilos globais e temas
│   ├── layout.tsx       # Layout principal da aplicação
│   ├── page.tsx         # Página inicial
│   └── providers.tsx    # Provedores globais (ex: React Query)
│
├── components/          # Componentes reutilizáveis de UI
│   ├── ui/              # Componentes base do shadcn e Matsu (botões, modais etc.)
│   ├── available-modal.tsx 
│   ├── comments-modal.tsx
│   ├── film-card.tsx
│   └── filter-modal.tsx
│
├── features/            # Funcionalidades específicas
│   └── feed/
│       └── vertical-feed.tsx
│
├── hooks/               # Hooks customizados (TanStack Query)
│   └── useFetchFilms.ts
│
├── lib/                 # Utilitários e funções auxiliares
│   ├── formatDurationTime.ts
│   └── utils.ts         # Função `cn` para classes
│
├── services/            # Configuração de serviços externos
│   ├── api.ts           # Cliente Axios
│   └── queryClient.ts   # Instância do TanStack Query
│
├── store/               # Estados globais (Zustand)
│   └── MovieStore.ts
│
└── types/               # Tipos TypeScript
    └── movie.type.ts
```

---

## 🧰 Primeiros Passos

### ✅ Pré-requisitos

* Node.js (v18.x ou superior)
* Gerenciador de pacotes npm

### 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Darlley/desafio-truckpag-ghibi
cd desafio-truckpag-ghibli
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 🚀 Rodando em Desenvolvimento

Inicie o servidor:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse `http://localhost:3000` no seu navegador.

---

## 📜 Scripts Disponíveis

* `npm run dev` – Inicia o servidor de desenvolvimento.
* `npm run build` – Compila a aplicação para produção.
* `npm run start` – Inicia o servidor de produção (após o build).
* `npm run lint` – Executa o linter (ESLint) para verificar a qualidade do código.
