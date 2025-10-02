
# FOXX Comunicação Visual — Site (Vite + React + Tailwind)

Projeto pronto para abrir no VS Code, instalar dependências e rodar.

## Como rodar
1. Instale o Node.js 18+
2. No terminal, dentro da pasta do projeto:
   ```bash
   npm install
   npm run dev
   ```
3. Abra http://localhost:5173

## Build de produção
```bash
npm run build
npm run preview
```

## Onde editar
- `src/App.tsx`: textos, itens do catálogo, contatos (objeto BRAND) e layout.
- `index.html`: metatags básicas.
- `tailwind.config.js` e `src/index.css`: estilos utilitários.

## Observações
- O JSON-LD é injetado dinamicamente via `useEffect` para manter os dados do BRAND/PRODUCTS no SEO.
- Remova o bloco "Testes rápidos" (DevTests) em produção.


---

## Deploy no GitHub Pages (automático)

1. Crie um repositório no GitHub (ex.: `foxx-comunicacao`).
2. Faça commit/push do projeto (branch `main`).
3. Vá em **Settings → Pages**, selecione **Build and deployment = GitHub Actions**. O workflow `.github/workflows/deploy.yml` já está pronto.
4. A cada push na `main`, o site é publicado automaticamente em:
   `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`

> Obs.: O `vite.config.ts` já está com `base: "./"`, compatível com GitHub Pages (subpasta).

