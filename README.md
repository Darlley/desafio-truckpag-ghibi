# Desafio TruckPag - Filmes Studio Ghibli

Este projeto é uma aplicação web desenvolvida como parte do desafio técnico da TruckPag. Ele exibe uma lista de filmes do Studio Ghibli, permitindo aos usuários visualizar detalhes, marcar como favoritos, assistidos e adicionar avaliações pessoais.

## Funcionalidades

*   Visualização de uma lista de filmes do Studio Ghibli em um feed vertical.
*   Detalhes do filme: título, imagem, banner, data de lançamento, duração, descrição, diretor, produtor e pontuação RT.
*   Marcar filmes como **Favoritos**.
*   Marcar filmes como **Assistidos**.
*   Adicionar **Avaliação** (nota de 1 a 5 estrelas) e **Comentário** para cada filme.
*   Interface responsiva para dispositivos móveis e desktop.
*   Persistência das interações do usuário (favoritos, assistidos, avaliações) no `localStorage`.
*   Modal para filtrar resultados (UI implementada, funcionalidade de filtro pendente).
*   Modal para visualização de comentários (UI implementada com dados estáticos, funcionalidade de submissão pendente).

## Tech Stack

*   **Frontend:**
    *   Next.js (v15) - Framework React com App Router.
    *   React (v19) - Biblioteca para construção de interfaces de usuário.
    *   TypeScript - Superset do JavaScript que adiciona tipagem estática.
    *   Tailwind CSS (v4) - Framework CSS utility-first.
    *   TanStack Query (React Query) (v5) - Para gerenciamento de estado do servidor, caching, e data fetching.
    *   Zustand (v5) - Gerenciamento de estado global do cliente, simples e flexível.
    *   Axios - Cliente HTTP baseado em Promises.
    *   Radix UI - Primitivos de UI acessíveis e não estilizados (usados através de componentes customizados na pasta `src/components/ui/`).
    *   Lucide React - Ícones.
    *   `clsx` & `tailwind-merge` - Utilitários para classes CSS condicionais.
*   **API Externa:**
    *   Ghibli API - Para buscar os dados dos filmes.

## Estrutura do Projeto (`src/`)

src/ ├── app/ # Rotas, layouts e páginas do Next.js (App Router) │ ├── globals.css # Estilos globais e variáveis de tema Tailwind │ ├── layout.tsx # Layout principal da aplicação │ ├── page.tsx # Página inicial │ └── providers.tsx # Provedores globais (ex: React Query) ├── components/ # Componentes de UI reutilizáveis │ ├── ui/ # Componentes de UI base (botões, modais, etc.) │ ├── available-modal.tsx # Modal para avaliação de filmes │ ├── comments-modal.tsx # Modal para comentários │ ├── film-card.tsx # Card de exibição de um filme │ └── filter-modal.tsx # Modal de filtros ├── features/ # Componentes específicos de funcionalidades │ └── feed/ │ └── vertical-feed.tsx # Componente do feed vertical de filmes ├── hooks/ # Hooks customizados React │ └── useFetchFilms.ts # Hook para buscar filmes e integrar com Zustand ├── lib/ # Funções utilitárias │ ├── formatDurationTime.ts # Formatação de tempo │ └── utils.ts # Utilitário cn para classes ├── services/ # Configuração de serviços externos │ ├── api.ts # Cliente Axios para a API Ghibli │ └── queryClient.ts # Configuração do TanStack Query Client ├── store/ # Gerenciamento de estado global (Zustand) │ └── MovieStore.ts # Store para o estado dos filmes (favoritos, notas, etc.) └── types/ # Definições de tipos TypeScript └── movie.type.ts # Tipos relacionados aos filmes


## Primeiros Passos

### Pré-requisitos

*   Node.js (versão 18.x ou superior recomendada)
*   npm, yarn ou pnpm

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd desafio-truckpag-ghibi
    ```

2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

### Rodando em Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev

Abra http://localhost:3000 no seu navegador para ver a aplicação.

Scripts Disponíveis
No package.json, você encontrará os seguintes scripts:

npm run dev: Inicia a aplicação em modo de desenvolvimento.
npm run build: Compila a aplicação para produção.
npm run start: Inicia um servidor de produção (após o build).
npm run lint: Executa o linter (ESLint) para verificar o código.