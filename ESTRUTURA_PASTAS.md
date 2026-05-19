# 📂 Estrutura de Pastas - DeliveryControl

Documentação detalhada da estrutura de diretórios do projeto DeliveryControl.

---

## 🏗️ Árvore Completa do Projeto

```
deriveryControl/
│
├── 📄 package.json                  # Dependências do projeto e scripts NPM
├── 📄 tsconfig.json                 # Configuração TypeScript
├── 📄 tsconfig.node.json            # Configuração TypeScript para build tools
├── 📄 vite.config.ts                # Configuração do Vite (dev server, build)
├── 📄 tailwind.config.ts            # Configuração Tailwind CSS
├── 📄 postcss.config.mjs            # Configuração PostCSS (processador de CSS)
├── 📄 pnpm-workspace.yaml           # Configuração workspace pnpm
├── 📄 index.html                    # HTML base da aplicação
├── 📄 README.md                     # Documentação do projeto
├── 📄 ESTRUTURA_PASTAS.md           # Este arquivo
├── 📄 default_shadcn_theme.css      # Tema padrão shadcn/ui
│
├── 📁 src/                          # Código fonte principal
│  │
│  ├── 📄 main.tsx                   # Ponto de entrada React
│  ├── 📄 vite-env.d.ts              # Tipos TypeScript do Vite
│  │
│  ├── 📁 app/                       # Aplicação principal
│  │  │
│  │  ├── 📄 App.tsx                 # Componente raiz da aplicação
│  │  │                              # Contém: RouterProvider, DeliveryProvider, Toaster, LanguageProvider
│  │  │
│  │  ├── 📄 routes.ts               # Definição de rotas React Router v7+
│  │  │                              # Contém: /login, /, /entregas, /analytics, /reportes
│  │  │
│  │  ├── 📄 types.ts                # Tipos e interfaces compartilhadas
│  │  │                              # Interfaces: Delivery, ChartDataPoint, Period
│  │  │
│  │  ├── 📄 mockData.ts             # Dados mock para testes e demo
│  │  │                              # Array de entregas de exemplo
│  │  │
│  │  ├── 📄 translations.ts         # Textos multilíngues (Português, Español)
│  │  │                              # ✓ Suporte para PT e ES
│  │  │                              # ✓ Facilita adicionar novos idiomas
│  │  │
│  │  ├── 📁 components/             # Componentes principais da aplicação
│  │  │  │
│  │  │  ├── 📄 Layout.tsx           # Layout principal
│  │  │  │                           # Navbar, sidebar, outlet de rotas
│  │  │  │
│  │  │  ├── 📄 Dashboard.tsx        # Dashboard com KPIs
│  │  │  │                           # ✓ KPI Cards (Total, Lotes, Combustível, Lucro)
│  │  │  │                           # ✓ Gráfico de Área (Tendência)
│  │  │  │                           # ✓ Distribuição de Lucros (Gráfico Pizza)
│  │  │  │
│  │  │  ├── 📄 Entregas.tsx         # Gerenciamento de Entregas (CRUD)
│  │  │  │                           # ✓ Tabela paginada de entregas
│  │  │  │                           # ✓ Formulário para nova entrega
│  │  │  │                           # ✓ Busca e filtro em tempo real
│  │  │  │                           # ✓ Ordenação por colunas
│  │  │  │                           # ✓ Deletar entrega com confirmação
│  │  │  │
│  │  │  ├── 📄 Analytics.tsx        # Análise detalhada de dados
│  │  │  │                           # ✓ Gráfico de performance (semana/mês)
│  │  │  │                           # ✓ Análise de despesas
│  │  │  │                           # ✓ Comparação de períodos
│  │  │  │                           # ✓ Trend indicators
│  │  │  │
│  │  │  ├── 📄 Reportes.tsx         # Geração de relatórios
│  │  │  │                           # ✓ Relatório mensal
│  │  │  │                           # ✓ Distribuição de ganhos
│  │  │  │                           # ✓ Exportação em PDF
│  │  │  │
│  │  │  ├── 📄 Login.tsx            # Tela de autenticação
│  │  │  │                           # ✓ Formulário de login
│  │  │  │                           # ✓ Animações de entrada
│  │  │  │                           # ✓ Validação de campos
│  │  │  │                           # ✓ Persistência de autenticação
│  │  │  │
│  │  │  ├── 📄 LanguageSelector.tsx # Seletor de idioma
│  │  │  │                           # ✓ Toggle PT | ES
│  │  │  │                           # ✓ Integrado ao header (Layout)
│  │  │  │                           # ✓ Atualiza idioma em tempo real
│  │  │  │
│  │  │  └── 📁 figma/               # Componentes customizados
│  │  │     └── 📄 ImageWithFallback.tsx  # Componente de imagem com fallback
│  │  │
│  │  ├── 📁 context/                # Context API (gerenciamento de estado)
│  │  │  ├── 📄 DeliveryContext.tsx  # Context das entregas
│  │  │  │                           # ✓ Estado global de entregas
│  │  │  │                           # ✓ Funções: addDelivery, deleteDelivery
│  │  │  │                           # ✓ Hook: useDeliveries()
│  │  │  │                           # ✓ Persistência em localStorage
│  │  │  │
│  │  │  └── 📄 LanguageContext.tsx  # Context do idioma
│  │  │                              # ✓ Gerencia idioma global (PT, ES)
│  │  │                              # ✓ Hook: useLanguage()
│  │  │                              # ✓ Persistência em localStorage (dc_language)
│  │  │
│  │  └── 📁 ui/                     # Componentes shadcn/ui (Radix UI + Tailwind)
│  │     │
│  │     ├── 📄 accordion.tsx        # Componente Accordion (expansível)
│  │     ├── 📄 alert-dialog.tsx     # Dialog de alerta
│  │     ├── 📄 alert.tsx            # Componente Alert
│  │     ├── 📄 aspect-ratio.tsx     # Container com aspect ratio fixo
│  │     ├── 📄 avatar.tsx           # Avatar de usuário
│  │     ├── 📄 badge.tsx            # Badge/tag
│  │     ├── 📄 breadcrumb.tsx       # Breadcrumb navigation
│  │     ├── 📄 button.tsx           # Botão customizável
│  │     ├── 📄 calendar.tsx         # Calendar picker
│  │     ├── 📄 card.tsx             # Container de card
│  │     ├── 📄 carousel.tsx         # Carousel/slider
│  │     ├── 📄 chart.tsx            # Wrapper de gráficos
│  │     ├── 📄 checkbox.tsx         # Checkbox
│  │     ├── 📄 collapsible.tsx      # Conteúdo colapsível
│  │     ├── 📄 command.tsx          # Command palette
│  │     ├── 📄 context-menu.tsx     # Context menu
│  │     ├── 📄 dialog.tsx           # Modal dialog
│  │     ├── 📄 drawer.tsx           # Drawer/sidebar
│  │     ├── 📄 dropdown-menu.tsx    # Dropdown menu
│  │     ├── 📄 form.tsx             # Wrapper React Hook Form
│  │     ├── 📄 hover-card.tsx       # Card ao passar mouse
│  │     ├── 📄 input-otp.tsx        # Input para código OTP
│  │     ├── 📄 input.tsx            # Input text
│  │     ├── 📄 label.tsx            # Label para form
│  │     ├── 📄 menubar.tsx          # Menu bar
│  │     ├── 📄 navigation-menu.tsx  # Navigation menu
│  │     ├── 📄 pagination.tsx       # Controle de paginação
│  │     ├── 📄 popover.tsx          # Popover tooltip
│  │     ├── 📄 progress.tsx         # Progress bar
│  │     ├── 📄 radio-group.tsx      # Radio button group
│  │     ├── 📄 resizable.tsx        # Container redimensionável
│  │     ├── 📄 scroll-area.tsx      # Área com scroll customizado
│  │     ├── 📄 select.tsx           # Select dropdown
│  │     ├── 📄 separator.tsx        # Linha separadora
│  │     ├── 📄 sheet.tsx            # Sheet (drawer)
│  │     ├── 📄 sidebar.tsx          # Sidebar layout
│  │     ├── 📄 skeleton.tsx         # Skeleton loading
│  │     ├── 📄 slider.tsx           # Slider range
│  │     ├── 📄 sonner.tsx           # Toast notifications
│  │     ├── 📄 switch.tsx           # Toggle switch
│  │     ├── 📄 table.tsx            # Table component
│  │     ├── 📄 tabs.tsx             # Abas/tabs
│  │     ├── 📄 textarea.tsx         # Textarea
│  │     ├── 📄 toggle-group.tsx     # Toggle group
│  │     ├── 📄 toggle.tsx           # Toggle button
│  │     ├── 📄 tooltip.tsx          # Tooltip
│  │     ├── 📄 use-mobile.ts        # Hook para detectar mobile
│  │     └── 📄 utils.ts             # Funções utilitárias (cn, classNames)
│  │
│  └── 📁 styles/                    # Estilos CSS
│     ├── 📄 index.css               # Estilos globais
│     ├── 📄 globals.css             # Variáveis CSS globais
│     ├── 📄 tailwind.css            # Configuração Tailwind CSS
│     ├── 📄 theme.css               # Tema customizado
│     └── 📄 fonts.css               # Importação de fontes
│
└── 📁 public/                       # Arquivos estáticos públicos
   └── 📄 (adicione ícones, imagens, etc aqui)
```

---

## 📋 Descrição por Diretório

### `/src/app/`

Centro da aplicação React. Contém a configuração principal, rotas, tipos e componentes.

### `/src/app/components/`

**Componentes principais da UI**

| Componente             | Propósito      | Funcionalidades                        |
| ---------------------- | -------------- | -------------------------------------- |
| `Layout.tsx`           | Estrutura base | Navbar, Sidebar, Outlet                |
| `Dashboard.tsx`        | Visão geral    | KPIs, Gráficos, Tendências             |
| `Entregas.tsx`         | Gerenciamento  | CRUD, Tabela, Busca, Filtro            |
| `Analytics.tsx`        | Análise        | Gráficos avançados, Comparações        |
| `Reportes.tsx`         | Relatórios     | Exportação, Distribuição               |
| `Login.tsx`            | Autenticação   | Formulário, Validação                  |
| `LanguageSelector.tsx` | Seletor idioma | Toggle PT \| ES, Mudança em tempo real |

### `/src/app/context/`

**Gerenciamento de estado global**

- `DeliveryContext.tsx`: Estado compartilhado de entregas
  - Centraliza dados de entregas
  - Persistência em localStorage
  - Hook customizado `useDeliveries()`

- `LanguageContext.tsx`: Estado compartilhado de idioma
  - Gerencia idioma global (Português, Español)
  - Persistência em localStorage (`dc_language`)
  - Hook customizado `useLanguage()`

### `/src/app/`

**Arquivos raiz da aplicação**

- `translations.ts`: Dicionário multilíngue
  - Suporte para Português (PT) e Español (ES)
  - Facilita adicionar novos idiomas
  - Referenciado em `LanguageContext.tsx` e componentes

### `/src/app/ui/`

**Biblioteca de componentes reutilizáveis**

Todos os componentes seguem o padrão shadcn/ui:

- Baseados em Radix UI (acessibilidade)
- Estilizados com Tailwind CSS
- Totalmente customizáveis

### `/src/styles/`

**Configuração visual e temas**

- `index.css`: Reset global, estilos base
- `globals.css`: Variáveis CSS
- `tailwind.css`: Configuração Tailwind
- `theme.css`: Tema específico do projeto
- `fonts.css`: Importação de tipografias

---

## 🔄 Fluxo de Arquivos

```
App.tsx (raiz)
    ↓
Routes (router.ts)
    ├── /login → Login.tsx
    └── / (Layout.tsx)
        ├── / → Dashboard.tsx
        ├── /entregas → Entregas.tsx
        ├── /analytics → Analytics.tsx
        └── /reportes → Reportes.tsx

DeliveryContext (Provider)
    ↓ (disponível para todos os componentes)
useDeliveries() (hook customizado)
```

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-router": "^7.x",
    "@radix-ui/*": "^1.x",
    "tailwindcss": "^3.x",
    "recharts": "^2.x",
    "motion": "^12.x",
    "sonner": "^1.x",
    "lucide-react": "^0.x",
    "date-fns": "^3.x",
    "react-hook-form": "^7.x"
  }
}
```

---

## 🎯 Convenções de Nomenclatura

### Componentes

- **PascalCase**: `Dashboard.tsx`, `LoginForm.tsx`
- **Funcão**: Componente React (export default ou named)

### Hooks/Utilitários

- **camelCase**: `useDeliveries.ts`, `formatCurrency.ts`
- **Prefixo `use`**: Para custom hooks

### Tipos/Interfaces

- **PascalCase**: `interface Delivery {}`, `type Period = 'week' | 'month'`

### Estilos

- **kebab-case em classes**: `bg-slate-900`, `text-lime-400`
- **Tailwind CSS**: Sem arquivo CSS separado (exceto globals)

---

## 🚀 Carregamento de Módulos

```
vite.config.ts (define entrada e saída)
    ↓
main.tsx (monta React)
    ↓
App.tsx (carrega DeliveryProvider + Router)
    ↓
Routes (carrega componentes conforme rota)
    ↓
Componentes + UI (carregam sob demanda)
```

---

## 💾 Armazenamento de Dados

```
localStorage
    ├── dc_auth (string: 'true' | null)
    └── dc_deliveries (JSON: Delivery[])
```

---

## 📝 Próximas Adições Recomendadas

Para organização escalável futura:

```
src/
├── app/
│  ├── components/        # ✓ Existente
│  ├── context/          # ✓ Existente
│  ├── hooks/            # Novo: Custom hooks
│  ├── services/         # Novo: API calls, utils
│  ├── utils/            # Novo: Funções utilitárias
│  ├── types/            # Novo: Tipos separados
│  └── constants/        # Novo: Constantes da app
```

---

## 🔗 Importações Recomendadas

```typescript
// ✓ Bom
import { Dashboard } from "@/components/Dashboard";
import { useDeliveries } from "@/context/DeliveryContext";
import { Button } from "@/ui/button";

// ✗ Evite
import Dashboard from "../../../components/Dashboard";
import useDeliveries from "../../../context/DeliveryContext";
```

Configure path aliases em `vite.config.ts`:

```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
}
```

---

**Última atualização:** Maio de 2026
