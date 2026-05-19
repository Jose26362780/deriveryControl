# 🌍 Sistema Multilíngue - DeliveryControl

## Visão Geral

O DeliveryControl agora suporta **Português (PT)** e **Español (ES)** com mudança de idioma em tempo real!

## Como Usar

### 1️⃣ No Componente

```typescript
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function MeuComponente() {
  const { language, setLanguage } = useLanguage();
  const t = (key: keyof typeof translations.pt) => translations[language][key];

  return (
    <div>
      <h1>{t('dashboard')}</h1> // "Dashboard" ou "Panel de Control"
      <button onClick={() => setLanguage('pt')}>PT</button>
      <button onClick={() => setLanguage('es')}>ES</button>
    </div>
  );
}
```

### 2️⃣ Adicionar Novo Texto

Edite `src/app/translations.ts`:

```typescript
export const translations = {
  pt: {
    meuTexto: "Meu texto em português",
    // ...
  },
  es: {
    meuTexto: "Mi texto en español",
    // ...
  },
};
```

### 3️⃣ Hook Disponível

```typescript
const { language, setLanguage } = useLanguage();

// language: 'pt' | 'es' (persiste em localStorage)
// setLanguage('es') // muda para espanhol
```

## 📍 Componentes Já Implementados

✅ **Layout.tsx** - Menu, botões, labels  
✅ **Login.tsx** - Formulário, labels, botões  
✅ **LanguageSelector** - Botão PT | ES no header  
✅ **App.tsx** - Provider envolvendo tudo

## 📋 Componentes Que Precisam de Traduções

Ainda faltam traduzir:

- [ ] Dashboard.tsx (KPI cards, gráficos, labels)
- [ ] Entregas.tsx (formulário, tabela, filtros)
- [ ] Analytics.tsx (gráficos, comparações, KPIs)
- [ ] Reportes.tsx (labels, botões)

## 🎨 Selector de Idioma

No **header** (ao lado do ícone de notificação):

```
[ Português | Español ]
```

- Verde quando ativo
- Azul/cinza quando inativo
- Animação suave
- Persiste em localStorage (`dc_language`)

## 💾 Storage

- **Idioma**: Salvo em `localStorage.dc_language`
- **Padrão**: Português (PT)
- **Exemplo**: `localStorage.setItem('dc_language', 'es')`

## 🔄 Fluxo

1. Usuário abre app → `LanguageProvider` carrega idioma do localStorage
2. Componentes usam `useLanguage()` para pegar idioma atual
3. Usuário clica em "Español" → `setLanguage('es')` atualiza contexto
4. **Todos os componentes re-renderizam** com novo idioma
5. localStorage é atualizado automaticamente

## 📚 Contexto

**Arquivo**: `src/app/context/LanguageContext.tsx`

```typescript
- LanguageProvider // Envolve a app
- useLanguage()    // Hook para usar em componentes
- Language type    // 'pt' | 'es'
```

## ✨ Próximos Passos

1. Traduzir **Dashboard.tsx**
2. Traduzir **Entregas.tsx**
3. Traduzir **Analytics.tsx**
4. Traduzir **Reportes.tsx**
5. Teste completo em ambos idiomas
