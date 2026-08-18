# Publicar

Para quem mantém o pacote no GitHub/npm.

Segredo **`NPM_TOKEN`**: token npm **Automation** (ou Granular) com **Bypass 2FA**. Token clássico com 2FA quebra o CI (`EOTP`).

| Como dispara | O que acontece |
| --- | --- |
| Actions → Publish → bump **`none`** | Publica a versão do `package.json` e cria a tag `vX.Y.Z` se ainda não existir |
| bump **patch / minor / major** | Sobe versão, publica, faz push da tag |
| GitHub Release publicado | Publica a versão do `package.json` nesse tag |

Se a versão já está no npm, o publish é saltado. CI em push/PR para `main` (Node 18, 20, 22). Peer: Harness ≥ 0.7.0 (opcional no npm, obrigatório para um `doctor` verde).
