# ✅ DeliveryControl | Sistema de Gerenciamento de Entregas

Projeto desenvolvido para gerenciar entregas, controlar despesas e gerar relatórios analíticos.

Uma aplicação web moderna para gerenciar entregas com funcionalidades de registro de entregas, análise de dados, geração de relatórios, cálculo de lucro/custo e autenticação. Focada em arquitetura escalável, componentização com React, integração com API REST e gerenciamento de estado com Context API. Utiliza React 19+ com componentes funcionais, hooks customizados, TypeScript para type safety e integração com UI moderna via shadcn/ui.

Durante o desenvolvimento, foco em:

- Arquitetura moderna React com componentes funcionais e hooks.
- Context API para gerenciamento de estado global (entregas).
- Lazy loading com React Router v7+ para otimização.
- Type safety com TypeScript em toda aplicação.
- Integração com Recharts para visualização de dados em tempo real.
- Separação clara entre componentes, contexto e tipos.
- Autenticação com persistência em localStorage.
- Design system com Tailwind CSS e componentes Radix UI (shadcn/ui).
- Animações fluidas com Motion (Framer Motion).
- Responsividade total com mobile-first approach.

---

## 🚀 Tecnologias Utilizadas

Este projeto utiliza tecnologias modernas do ecossistema web:

![React](https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React_Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=chart.js&logoColor=white)
![Radix_UI](https://img.shields.io/badge/Radix%20UI-161615?style=for-the-badge&logo=radix-ui&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white)

---

## 📂 Estrutura do Projeto

```bash
.
├── src/
│  ├── main.tsx                      # Ponto de entrada da aplicação
│  ├── vite-env.d.ts                 # Tipos do Vite
│  ├── app/
│  │  ├── App.tsx                    # Componente raiz com router
│  │  ├── routes.ts                  # Definição de rotas (React Router v7+)
│  │  ├── types.ts                   # Tipos e interfaces da aplicação
│  │  ├── mockData.ts                # Dados mock para testes
│  │  ├── components/
│  │  │  ├── Layout.tsx              # Layout principal com navbar
│  │  │  ├── Dashboard.tsx           # Dashboard com KPIs e gráficos
│  │  │  ├── Entregas.tsx            # Gerenciamento de entregas (CRUD)
│  │  │  ├── Analytics.tsx           # Análise detalhada de dados
│  │  │  ├── Reportes.tsx            # Geração de relatórios mensais
│  │  │  ├── Login.tsx               # Tela de autenticação
│  │  │  └── figma/
│  │  │     └── ImageWithFallback.tsx # Componente de imagem com fallback
│  │  ├── context/
│  │  │  └── DeliveryContext.tsx     # Context API para gerenciamento de entregas
│  │  └── ui/                        # Componentes shadcn/ui (Radix UI)
│  │     ├── accordion.tsx
│  │     ├── alert.tsx
│  │     ├── badge.tsx
│  │     ├── button.tsx
│  │     ├── card.tsx
│  │     ├── checkbox.tsx
│  │     ├── dialog.tsx
│  │     ├── form.tsx
│  │     ├── input.tsx
│  │     ├── label.tsx
│  │     ├── popover.tsx
│  │     ├── select.tsx
│  │     ├── sheet.tsx
│  │     ├── table.tsx
│  │     ├── tabs.tsx
│  │     ├── textarea.tsx
│  │     └── ... (demais componentes UI)
│  ├── styles/
│  │  ├── index.css                  # Estilos globais
│  │  ├── globals.css                # Variáveis CSS globais
│  │  ├── tailwind.css               # Configuração Tailwind
│  │  ├── theme.css                  # Tema da aplicação
│  │  └── fonts.css                  # Importação de fontes
│  └── index.html                    # HTML base
├── public/                          # Arquivos estáticos
├── vite.config.ts                   # Configuração Vite
├── tsconfig.json                    # Configuração TypeScript
├── package.json                     # Dependências e scripts
├── tailwind.config.ts               # Configuração Tailwind CSS
├── postcss.config.mjs               # Configuração PostCSS
├── README.md                        # Este arquivo
└── ESTRUTURA_PASTAS.md              # Documentação de pastas
```

## 🔄 Fluxo da Aplicação

1. **Autenticação**: Usuário realiza login na tela de autenticação.
2. **Dashboard**: Após login, é redirecionado para dashboard com KPIs em tempo real.
3. **Entregas**: Usuário pode criar, visualizar, editar e deletar entregas.
4. **Analytics**: Visualiza gráficos detalhados de performance (semanal/mensal).
5. **Relatórios**: Gera relatórios completos do mês com distribuição de ganhos.
6. **Persistência**: Todos os dados são salvos em localStorage.
7. **Logout**: Limpa autenticação e retorna à tela de login.

## ✨ Funcionalidades Principais

✅ **Autenticação Segura** com persistência em localStorage
✅ **Dashboard Responsivo** com KPIs em tempo real
✅ **Gerenciamento de Entregas** (Criar, Ler, Atualizar, Deletar)
✅ **Cálculo Automático** de lucro, despesa de combustível e distribuição de ganhos
✅ **Análise de Dados** com gráficos interativos (Área, Barra, Pizza)
✅ **Filtros e Busca** em tempo real
✅ **Paginação** de entregas com navegação intuitiva
✅ **Ordenação Dinâmica** por múltiplas colunas
✅ **Geração de Relatórios** mensais em PDF
✅ **Animações Fluidas** com Motion (Framer Motion)
✅ **Design Responsivo** mobile-first com Tailwind CSS
✅ **Notificações Toast** com Sonner
✅ **Type Safety** completo com TypeScript

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação:

```bash
# 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd deriveryControl

# 2. Instalar dependências
npm install
# ou com pnpm
pnpm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
# ou com pnpm
pnpm dev

# 4. Acessar no navegador
# http://localhost:5173

# 5. Login
# Email: admin@deliverycontrol.com
# Senha: qualquer coisa (simulado)
```

## 📦 Scripts Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento com hot reload
npm run build      # Compila o projeto para produção (dist/)
```

---

## 🏗️ Arquitetura e Padrões

### Componentes Funcionais

Todos os componentes utilizam React Hooks para gerenciamento de estado local e efeitos.

### Context API para Estado Global

```typescript
// DeliveryContext.tsx
const { deliveries, addDelivery, deleteDelivery } = useDeliveries();
```

Centraliza o estado de entregas com hooks customizados para fácil acesso em qualquer componente.

### Type Safety com TypeScript

```typescript
// types.ts
interface Delivery {
  id: string;
  date: string;
  workers: string[];
  lots: number;
  totalValue: number;
  gasExpense: number;
  netProfit: number;
  carShare: number;
  workerAShare: number;
  workerBShare: number;
}
```

Todas as estruturas de dados são tipadas para evitar erros em tempo de desenvolvimento.

### React Router v7+ com Loader

```typescript
// routes.ts
function requireAuth() {
  if (!localStorage.getItem("dc_auth")) {
    return redirect("/login");
  }
  return null;
}
```

Proteção de rotas com guard de autenticação usando loaders do React Router.

### Componentes Reutilizáveis (shadcn/ui)

Biblioteca Radix UI com estilos Tailwind para componentes acessíveis e consistentes:

- Buttons, Inputs, Forms, Tables, Dialogs
- Totalmente customizáveis com CSS

### Animações e Transições

Utiliza Motion (Framer Motion) para animações suaves:

```typescript
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35 }}
>
  Conteúdo
</motion.div>
```

### Visualização de Dados

Recharts para gráficos responsivos e interativos:

- **Área**: Tendência de valores ao longo do tempo
- **Barra**: Comparação de métricas
- **Pizza**: Distribuição de lucros (40% carro, 30% cada trabalhador)

---

## 📊 Dados e Cálculos

### Estrutura de Entrega

Cada entrega registra:

- **Data**: Quando a entrega foi realizada
- **Lotes**: Quantidade de lotes transportados
- **Valor Total**: Receita bruta
- **Despesa de Combustível**: Custo de gasolina
- **Lucro Líquido**: Valor Total - Despesa
- **Distribuição**:
  - 40% para o carro (proprietário)
  - 30% para Trabalhador A
  - 30% para Trabalhador B

### KPIs no Dashboard

- **Total de Receita**: Soma de todas as entregas do período
- **Lotes Transportados**: Quantidade total de lotes
- **Despesa de Combustível**: Total de gastos com combustível
- **Lucro Líquido**: Receita - Despesa

---

## 💾 Persistência de Dados

Todos os dados são armazenados em **localStorage** do navegador:

```typescript
// DeliveryContext.tsx
const saved = localStorage.getItem("dc_deliveries");
localStorage.setItem("dc_deliveries", JSON.stringify(deliveries));
```

- **Vantagem**: Funciona offline, rápido, sem backend necessário
- **Limitação**: Dados limitados a ~5-10MB por domínio
- **Future**: Implementar backend para sincronização em nuvem

---

## 🎨 Design System

### Paleta de Cores

- **Primary**: Lime (#a3e635)
- **Secondary**: Purple (#8b5cf6)
- **Tertiary**: Cyan (#38bdf8)
- **Background**: Slate-950 (#0f172a)
- **Card**: Slate-900 (#0f1729)

### Tipografia

- **Font Family**: Inter (sans-serif)
- **Headline**: Bold
- **Body**: Regular
- **Pequeno**: Small

### Espaçamento

- **Gap**: 16px (padrão)
- **Padding**: 20-32px
- **Margin**: 8-24px

---

## 🔐 Autenticação

Sistema simples de autenticação via localStorage:

1. Usuário insere email/senha na tela de login
2. Após validação simulada (900ms de delay)
3. Token é salvo em `localStorage.setItem('dc_auth', 'true')`
4. Router guard redireciona para dashboard se autenticado
5. Logout remove o token

**Credencial de Demo:**

- Email: `admin@deliverycontrol.com`
- Senha: Qualquer coisa (não validada no frontend)

---

## 📈 Estatísticas e Relatórios

### Dashboard

- KPIs principais com deltas percentuais
- Gráfico de tendência de receita (últimos 7 dias)
- Distribuição de lucros por stakeholder

### Analytics

- Gráfico de performance por período (semana/mês)
- Análise de gastos vs receita
- Tendências e comparações

### Relatórios

- Filtro por mês
- Distribuição de ganhos em gráfico pizza
- Exportação em PDF (implementação futura)

---

## 🚀 Próximos Passos / Features Futuras

- [ ] Backend Node.js/Express para persistência em banco de dados
- [ ] Autenticação real com JWT
- [ ] Exportação de relatórios em PDF
- [ ] Integração com Google Maps para rastreamento
- [ ] Dark/Light mode toggle
- [ ] Multilíngue (PT, EN, ES)
- [ ] Gráficos mais avançados (heatmaps, comparações)
- [ ] Integração com sistema de pagamento
- [ ] Notificações push
- [ ] PWA (Progressive Web App)

---

## 💻 Sobre o Autor 😄

Engenheiro de Software com foco em desenvolvimento front-end rumo ao full stack. Dedicado a criar experiências digitais inovadoras que impactam o mundo através da tecnologia.

## 🔗 Contato

- [![linkedin](https://img.shields.io/badge/Linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-martinez-352032222/)
- [![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:juniorjose1925@gmail.com)
- [![portfolio](https://img.shields.io/badge/Jose.Dev-0A0A03?style=for-the-badge&logo=react&logoColor=white)](https://my-portfolio-jose-martinez.netlify.app/)

---

## 📄 Licença

Este projeto é de uso privado/educacional. Desenvolvido como demonstração de conhecimentos em React, TypeScript e desenvolvimento full-stack.

---

**Última atualização:** Maio de 2026
