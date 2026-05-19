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

📄 **Para a documentação completa e detalhada da estrutura de pastas, consulte [ESTRUTURA_PASTAS.md](./ESTRUTURA_PASTAS.md)**

### Organização Principal

```
src/
├── app/
│  ├── components/          # Componentes principais (Dashboard, Entregas, Analytics, etc)
│  ├── context/            # Context API para gerenciamento de estado (DeliveryContext)
│  ├── ui/                 # Componentes reutilizáveis shadcn/ui
│  ├── App.tsx             # Componente raiz com roteador
│  ├── routes.ts           # Definição de rotas
│  ├── types.ts            # Interfaces TypeScript
│  ├── mockData.ts         # Dados de exemplo
│  └── translations.ts     # Textos multilíngues (PT, ES)
├── styles/               # CSS global, Tailwind, tema e fontes
├── main.tsx             # Ponto de entrada
└── vite-env.d.ts        # Tipos Vite
```

## 🔄 Como Usar a Aplicação

### 1️⃣ Login

- Acesse http://localhost:5173
- Email: `admin@deliverycontrol.com` | Senha: qualquer coisa (simulado)

### 2️⃣ Dashboard

Visão geral com KPIs em tempo real:

- Total de receita, lotes transportados, despesas e lucro líquido
- Gráfico de tendência de receita (últimos 7 dias)
- Distribuição de lucros (40% carro, 30% cada trabalhador)

### 3️⃣ Entregas (CRUD)

- **Criar**: Clique em "Nova Entrega" e preencha o formulário
- **Visualizar**: Tabela paginada com busca em tempo real
- **Editar**: Clique no ícone de edição (implementar)
- **Deletar**: Clique no ícone de lixo com confirmação

### 4️⃣ Analytics

- Filtrar por período (semana/mês)
- Análise de despesas vs receita
- Comparação de performance

### 5️⃣ Relatórios

- Gere relatório mensal com distribuição de ganhos
- Visualize dados em gráfico pizza
- Exportação em PDF (em desenvolvimento)

### 🌍 Multilíngue

- **Português (PT)** e **Español (ES)**
- Clique no seletor de idioma no header
- Idioma persiste em localStorage
- **Para adicionar novo texto**, edite `src/app/translations.ts`

---

## 🌐 Sistema Multilíngue

DeliveryControl suporta **Português** e **Español** com mudança de idioma em tempo real!

### Como Usar no Código

```typescript
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function MeuComponente() {
  const { language, setLanguage } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];

  return (
    <div>
      <h1>{t('dashboard')}</h1>
      <button onClick={() => setLanguage('pt')}>Português</button>
      <button onClick={() => setLanguage('es')}>Español</button>
    </div>
  );
}
```

### Adicionar Novo Texto

Edite `src/app/translations.ts`:

```typescript
export const translations = {
  pt: { meuTexto: "Meu texto em português", ... },
  es: { meuTexto: "Mi texto en español", ... },
};
```

### Componentes com Suporte Multilíngue

✅ Layout.tsx, Login.tsx, LanguageSelector, App.tsx

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

## 🏗️ Arquitetura

### Padrões Utilizados

| Padrão               | Descrição                                                                  |
| -------------------- | -------------------------------------------------------------------------- |
| **Context API**      | Gerenciamento de estado global (entregas) com persistência em localStorage |
| **React Hooks**      | Componentes funcionais com hooks customizados                              |
| **TypeScript**       | Type safety em toda aplicação                                              |
| **React Router v7+** | Roteamento com proteção de rotas (guard de autenticação)                   |
| **shadcn/ui**        | Componentes reutilizáveis baseados em Radix UI + Tailwind                  |
| **Recharts**         | Visualização de dados interativa                                           |
| **Motion**           | Animações suaves com Framer Motion                                         |

### Estrutura de Componentes

```typescript
// Exemplo: useDeliveries() do DeliveryContext
const { deliveries, addDelivery, deleteDelivery } = useDeliveries();

// Componentes recebem dados do contexto e renderizam de forma reativa
```

### Cálculo de Distribuição (por Entrega)

- **40%**: Proprietário (carro)
- **30%**: Trabalhador A
- **30%**: Trabalhador B

Formula: `Lucro Líquido = Valor Total - Despesa de Combustível`

---

## � Persistência

Todos os dados são salvos em **localStorage** do navegador:

```typescript
// Entregas: salvas em 'dc_deliveries'
// Autenticação: salva em 'dc_auth'
// Idioma: salvo em 'dc_language'
```

**Vantagens**: Funciona offline, rápido, sem backend necessário  
**Limitação**: ~5-10MB por domínio  
**Próxima fase**: Backend Node.js para sincronização em nuvem

---

## 🎨 Design

**Tema**: Moderno com Tailwind CSS e Radix UI  
**Paleta**: Lime (#a3e635), Purple (#8b5cf6), Cyan (#38bdf8), Dark backgrounds  
**Tipografia**: Inter (sans-serif)  
**Responsivo**: Mobile-first com suporte total a dispositivos

---

## 🔐 Autenticação

Autenticação simples com persistência em localStorage:

**Credencial de Demo:**

- Email: `admin@deliverycontrol.com`
- Senha: qualquer coisa (não validada no frontend)

⚠️ **Próxima fase**: Implementar autenticação real com JWT e backend

## 🚀 Próximas Fases

- [ ] Backend Node.js/Express com banco de dados (PostgreSQL/MongoDB)
- [ ] Autenticação real com JWT
- [ ] Exportação de relatórios em PDF
- [ ] Integração com Google Maps para rastreamento
- [ ] Dark/Light mode toggle
- [ ] Completar traduções (Dashboard, Entregas, Analytics, Reportes)
- [ ] PWA (Progressive Web App)
- [ ] API REST documentada com Swagger

---

## Contato

- [![linkedin](https://img.shields.io/badge/Linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-martinez-352032222/)
- [![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:juniorjose1925@gmail.com)
- [![portfolio](https://img.shields.io/badge/Jose.Dev-0A0A03?style=for-the-badge&logo=react&logoColor=white)](https://my-portfolio-jose-martinez.netlify.app/)

---

## 📄 Licença

Este projeto é de uso privado/educacional. Desenvolvido como demonstração de conhecimentos em React, TypeScript e desenvolvimento full-stack.

---

**Última atualização:** Maio de 2026
