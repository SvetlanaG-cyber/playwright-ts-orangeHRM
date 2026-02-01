# Test Configuration

## Environment Variables

Проект использует переменные окружения для конфигурации тестов. Все переменные определены в централизованном файле `config/test-config.ts`.

### Настройка .env файла

1. Скопируйте `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

2. Отредактируйте `.env` файл и укажите ваши значения:
   ```env
   ORANGEHRM_USERNAME=Admin
   ORANGEHRM_PASSWORD=admin123
   ```

### Доступные переменные окружения

- `ORANGEHRM_LOGIN_URL` - URL страницы логина (по умолчанию: демо-версия OrangeHRM)
- `ORANGEHRM_USERNAME` - Валидный username для тестов (по умолчанию: 'Admin')
- `ORANGEHRM_PASSWORD` - Валидный password для тестов (по умолчанию: 'admin123')
- `ORANGEHRM_INVALID_USERNAME` - Невалидный username для негативных тестов
- `ORANGEHRM_INVALID_PASSWORD` - Невалидный password для негативных тестов
- `MAX_PAGE_LOAD_TIME` - Максимальное время загрузки страницы в мс (по умолчанию: 3000)
- `MAX_LOGIN_RESPONSE_TIME` - Максимальное время ответа логина в мс (по умолчанию: 5000)
- `MAX_FIELD_LENGTH` - Максимальная длина поля для boundary тестов (по умолчанию: 255)

### Использование в тестах

Все тесты используют централизованный конфиг:

```typescript
import { TestConfig } from '../config/test-config';

const { VALID_USERNAME, VALID_PASSWORD } = TestConfig;
```

### Безопасность

**Важно**: Файл `.env` добавлен в `.gitignore` и не должен попадать в репозиторий. Используйте `.env.example` как шаблон.
