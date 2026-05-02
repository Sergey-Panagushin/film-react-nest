# FILM!

Приложение для просмотра афиши и бронирования билетов в кино.

## Ссылка на задеплоенный проект

http://sergey-panagushins-front.nomorepartiessite.ru

## Запуск проекта

```bash
docker compose up -d --build
```

## Переменные окружения

DATABASE_DRIVER=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=films
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=films
LOGGER_TYPE=json

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb` 
* `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/practicum`.  

MongoDB должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.




