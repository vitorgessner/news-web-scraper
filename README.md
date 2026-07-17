# Web Scrapper

Este projeto é um scraper de notícias voltado para encontrar automaticamente publicações que mencionem cidades específicas cadastradas em [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts).

A ideia é facilitar a automação do trabalho de monitoramento de notícias, começando com o portal da Polícia Federal e permitindo, no futuro, a inclusão de muitos outros portais.

## Objetivo

O scraper acessa páginas de notícias, extrai títulos, descrições, conteúdos e datas de publicação, e verifica se alguma das cidades de interesse aparece no texto.

Quando uma notícia relevante é encontrada, o sistema exibe as informações no console para posterior análise.

## Como funciona

- A lista de cidades de interesse está em [INTERESTING_CIDADES.ts](INTERESTING_CITIES.ts).
- Cada portal de notícia deve implementar a lógica de extração e herdar da classe base [classes/Portal.ts](classes/Portal.ts).
- O exemplo atual é o portal da Polícia Federal, implementado em [classes/PoliciaFederalPortal.ts](classes/PoliciaFederalPortal.ts).
- O ponto de entrada principal é [index.ts](index.ts).

## Requisitos

- Node.js
- npm

## Instalação

No diretório raiz do projeto, execute:

```bash
npm install
```

## Executando o projeto

```bash
npm run dev
```

Esse comando inicia o fluxo principal definido em [index.ts](index.ts).

## Estrutura do projeto

- [index.ts](index.ts): ponto de entrada da aplicação.
- [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts): lista das cidades monitoradas.
- [classes/Portal.ts](classes/Portal.ts): classe base para todos os portais.
- [classes/PoliciaFederalPortal.ts](classes/PoliciaFederalPortal.ts): implementação para o portal da Polícia Federal.

## Como adicionar novos portais

Para incluir outro site de notícias, siga estes passos:

1. Crie uma nova classe no diretório [classes](classes).
2. Faça a nova classe estender [classes/Portal.ts](classes/Portal.ts).
3. Implemente os métodos obrigatórios:
   - `getNewsLinks(html)`
   - `getTitle($)`
   - `getDescription($)`
   - `getContent($)`
   - `getPublishDate(url)`
   - `logNews(title, url, citiesMentioned, publishDate)`
4. Instancie a nova classe em [index.ts](index.ts) e chame o método `verifyUrls()`.

## Observações

- O projeto atual faz buscas por substring simples, então as cidades devem estar exatamente cadastradas em [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts).
- Para futuras melhorias, pode ser interessante adicionar:
  - tratamento de erros mais robusto
  - suporte a múltiplos portais em paralelo
  - persistência dos resultados em arquivo ou banco de dados
  - filtros adicionais por data, estado ou tipo de notícia

---

# Web Scrapper

This project is a news scraper designed to automatically find publications that mention specific cities listed in [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts).

The goal is to simplify the automation of news monitoring work, starting with the Federal Police portal and enabling the addition of many other portals in the future.

## Objective

The scraper accesses news pages, extracts titles, descriptions, content, and publication dates, and checks whether any of the target cities appear in the text.

When a relevant news item is found, the system displays the information in the console for later analysis.

## How it works

- The list of cities of interest is stored in [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts).
- Each news portal must implement its extraction logic and inherit from the base class [classes/Portal.ts](classes/Portal.ts).
- The current example is the Federal Police portal, implemented in [classes/PoliciaFederalPortal.ts](classes/PoliciaFederalPortal.ts).
- The main entry point is [index.ts](index.ts).

## Requirements

- Node.js
- npm

## Installation

From the project root, run:

```bash
npm install
```

## Running the project

```bash
npm run dev
```

This command starts the main flow defined in [index.ts](index.ts).

## Project structure

- [index.ts](index.ts): application entry point.
- [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts): list of monitored cities.
- [classes/Portal.ts](classes/Portal.ts): base class for all portals.
- [classes/PoliciaFederalPortal.ts](classes/PoliciaFederalPortal.ts): implementation for the Federal Police portal.

## How to add new portals

To include another news website, follow these steps:

1. Create a new class inside the [classes](classes) directory.
2. Make the new class extend [classes/Portal.ts](classes/Portal.ts).
3. Implement the required methods:
   - `getNewsLinks(html)`
   - `getTitle($)`
   - `getDescription($)`
   - `getContent($)`
   - `getPublishDate(url)`
   - `logNews(title, url, citiesMentioned, publishDate)`
4. Instantiate the new class in [index.ts](index.ts) and call `verifyUrls()`.

## Notes

- The current project uses simple substring matching, so the cities must be registered exactly in [INTERESTING_CITIES.ts](INTERESTING_CITIES.ts).
- For future improvements, it would be useful to add:
  - more robust error handling
  - support for multiple portals in parallel
  - persistence of results to a file or database
  - additional filters by date, state, or news type
