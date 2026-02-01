# Архитектура проекта (Admin и PIM)

Схема папок и файлов с описаниями и минимальным кодом. Создавай папки и файлы по порядку.

---

## 1. Дерево папок и файлов

```
config/
├── test-config.ts              (существует)
└── section-nav.config.ts       ← один источник правды для групп подменю

types/
├── ...                         (существует)
├── page-objects.types.ts       (дополнить IBaseAppPage, ISectionSubnav)
└── section-nav.types.ts        ← типы для section nav

components/
└── layout/
    ├── Sidebar.ts              ← левое меню (Admin, PIM, Leave…)
    └── SectionSubnav.ts        ← полоса групп под баннером (User Management | Job | …)

pages/
├── base/
│   └── BaseAppPage.ts          ← базовая страница после логина (section + sidebar + sectionSubnav)
├── login/
│   └── LoginPage.ts            (существует)
├── admin/
│   ├── AdminPage.ts            ← Admin → Users
│   └── JobTitleListPage.ts     ← Admin → Job → Job Titles
└── pim/
    └── EmployeeListPage.ts     ← PIM → Employee List
```

---

## 2. Файлы по порядку

### 2.1 `config/section-nav.config.ts`

**Описание:** Единственное место, где перечислены группы подменю по разделам (Admin, PIM и т.д.). Добавление/изменение пунктов — только здесь.

**Код:** см. раздел «Минимальный код» ниже.

---

### 2.2 `types/section-nav.types.ts`

**Описание:** Типы для конфига section nav (SectionKey, SectionNavItem) и интерфейсы компонентов навигации.

**Код:** см. раздел «Минимальный код» ниже.

---

### 2.3 Дополнение `types/page-objects.types.ts`

**Описание:** Добавить интерфейсы `IBaseAppPage` и `ISectionSubnav`, чтобы страницы и компонент соответствовали контракту.

**Дополнить:** экспорт `IBaseAppPage`, `ISectionSubnav` и при необходимости импорт типов из `section-nav.types.ts`.

---

### 2.4 `components/layout/Sidebar.ts`

**Описание:** Компонент левого меню приложения. Топ-уровень (Admin, PIM, Leave…), раскрытие раздела, переход по пункту. Локаторы — через геттеры.

---

### 2.5 `components/layout/SectionSubnav.ts`

**Описание:** Полоса групп под оранжевым баннером (User Management | Job | Organization … в Admin; Configuration | Employee List … в PIM). Импортирует `section-nav.config`, не хранит списки групп. Получает `section` извне (от BaseAppPage).

---

### 2.6 `pages/base/BaseAppPage.ts`

**Описание:** Базовая страница для всех экранов после логина (Admin, PIM и т.д.). Содержит абстрактный геттер `section`, композицию `sidebar` (левое меню) и композицию `sectionSubnav`. Не импортирует Sidebar и SectionSubnav в каждой конкретной странице — только здесь.

---

### 2.7 `pages/admin/AdminPage.ts`

**Описание:** Страница Admin → User Management → Users. Наследует BaseAppPage, объявляет `section = 'Admin'`, добавляет геттеры/методы только для контента этой страницы (заголовок, фильтры, таблица — по мере необходимости).

---

### 2.8 `pages/admin/JobTitleListPage.ts`

**Описание:** Страница Admin → Job → Job Titles. Наследует BaseAppPage, `section = 'Admin'`, контент страницы Job Titles.

---

### 2.9 `pages/pim/EmployeeListPage.ts`

**Описание:** Страница PIM → Employee List. Наследует BaseAppPage, `section = 'PIM'`, контент страницы Employee List.

---

### 2.10 Экспорт типов в `types/index.ts`

**Описание:** Добавить строку `export * from './section-nav.types';` (если создан отдельный файл section-nav.types.ts).

---

## 3. Минимальный код по файлам

### `config/section-nav.config.ts`

```ts
import type { SectionNavConfig } from '../types/section-nav.types';

export const SECTION_NAV_GROUPS: SectionNavConfig = {
  Admin: [
    { label: 'User Management', type: 'dropdown' },
    { label: 'Job', type: 'dropdown' },
    { label: 'Organization', type: 'dropdown' },
    { label: 'Qualifications', type: 'dropdown' },
    { label: 'Nationalities', type: 'link' },
    { label: 'Corporate Branding', type: 'link' },
    { label: 'Configuration', type: 'dropdown' },
  ],
  PIM: [
    { label: 'Configuration', type: 'dropdown' },
    { label: 'Employee List', type: 'link' },
    { label: 'Add Employee', type: 'link' },
    { label: 'Reports', type: 'link' },
  ],
} as const;

export type SectionKey = keyof typeof SECTION_NAV_GROUPS;
```

---

### `types/section-nav.types.ts`

```ts
export const SECTION_KEYS = ['Admin', 'PIM'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type SectionNavItemType = 'link' | 'dropdown';

export interface SectionNavItem {
  label: string;
  type: SectionNavItemType;
}

export type SectionNavConfig = Record<SectionKey, readonly SectionNavItem[]>;
```

*(В config мы используем `SectionNavConfig` и экспортируем свой `SectionKey` из config; в types можно оставить только интерфейсы и базовый SectionKey — как в коде ниже в реальных файлах.)*

---

### `types/page-objects.types.ts` — дополнение

В конец файла (перед закрытием) добавить:

```ts
import type { SectionKey } from '../config/section-nav.config';

export interface ISectionSubnav {
  readonly container: Locator;
  getGroup(name: string): Locator;
  get expectedGroupLabels(): readonly string[];
}

export interface IBaseAppPage extends IPageObject {
  readonly section: SectionKey;
  readonly sectionSubnav: import('../../components/layout/SectionSubnav').SectionSubnav;
}
```

*(Лучше SectionKey импортировать из config; для sectionSubnav можно использовать тип через ReturnType или отдельный types-файл, чтобы не было циклических зависимостей. В созданных файлах ниже я использую простой вариант.)*

---

### `components/layout/Sidebar.ts`

```ts
import { Page, Locator } from '@playwright/test';

export class Sidebar {
  constructor(private readonly page: Page) {}

  get container(): Locator {
    return this.page.getByRole('navigation').first();
  }

  getSection(name: string): Locator {
    return this.container.getByRole('link', { name: new RegExp(name, 'i') })
      .or(this.container.getByRole('button', { name: new RegExp(name, 'i') }));
  }

  async goToSection(name: string): Promise<void> {
    await this.getSection(name).click();
  }
}
```

---

### `components/layout/SectionSubnav.ts`

Класс реализует интерфейс `ISectionSubnav` из types. Селекторы `.oxd-topbar-body-nav` / `.oxd-topbar-body-nav-tabs` — примерные под OrangeHRM; при необходимости заменить на `getByRole` после инспекта DOM.

```ts
import { Page, Locator } from '@playwright/test';
import { SECTION_NAV_GROUPS, type SectionKey } from '../../config/section-nav.config';
import type { ISectionSubnav } from '../../types/section-nav.types';

export class SectionSubnav implements ISectionSubnav {
  constructor(private readonly page: Page, private readonly section: SectionKey) {}
  get container(): Locator { ... }
  getGroup(name: string): Locator { ... }
  get expectedGroupLabels(): readonly string[] { ... }
}
```

---

### `pages/base/BaseAppPage.ts`

Базовый класс абстрактный: `goto()` объявляется абстрактным, каждая страница реализует его и вызывает `gotoPath(path)`.

```ts
import { Page } from '@playwright/test';
import { SectionSubnav } from '../../components/layout/SectionSubnav';
import { Sidebar } from '../../components/layout/Sidebar';
import type { SectionKey } from '../../config/section-nav.config';
import type { IBaseAppPage, IPageObject } from '../../types';

export abstract class BaseAppPage implements IBaseAppPage, IPageObject {
  constructor(readonly page: Page) {}

  abstract get section(): SectionKey;

  get sidebar(): Sidebar {
    return new Sidebar(this.page);
  }

  get sectionSubnav(): SectionSubnav {
    return new SectionSubnav(this.page, this.section);
  }

  protected async gotoPath(path: string): Promise<void> {
    const baseUrl = process.env.ORANGEHRM_BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php';
    await this.page.goto(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
  }

  abstract goto(): Promise<void>;
}
```

---

### `pages/admin/AdminPage.ts`

```ts
import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

export class AdminPage extends BaseAppPage {
  override get section() {
    return 'Admin' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /system users/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/admin/viewSystemUsers');
  }
}
```

---

### `pages/admin/JobTitleListPage.ts`

```ts
import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

export class JobTitleListPage extends BaseAppPage {
  override get section() {
    return 'Admin' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /job titles/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/admin/viewJobTitleList');
  }
}
```

---

### `pages/pim/EmployeeListPage.ts`

```ts
import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

export class EmployeeListPage extends BaseAppPage {
  override get section() {
    return 'PIM' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /employee list/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/pim/viewEmployeeList');
  }
}
```

---

## 4. Зависимости

- **SectionSubnav** импортирует только `config/section-nav.config.ts` и Playwright.
- **BaseAppPage** импортирует `Sidebar`, `SectionSubnav` и `SectionKey` из config.
- Конкретные страницы (AdminPage, JobTitleListPage, EmployeeListPage) импортируют только `BaseAppPage`; левое меню доступно через `this.sidebar`, полоса групп — через `this.sectionSubnav`.

Данные групп не дублируются: они задаются в `section-nav.config.ts`, типы — в `types/section-nav.types.ts` и при необходимости в `page-objects.types.ts`.
