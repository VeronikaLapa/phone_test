# phone_test
Test task for superkassa

## Запуск приложения
Для запуска используйте команду <code>docker-compose up -d --build</code> в корне репозитория.
В переменных окружения записан пример стартовой конфигурации. При необходимости, можно изменить порты, который используют приложения, изменив .env

## Структура проекта
<p>Приложение состоит из клиентской и серверной части.
<p>Клиент запускается на localhost:3000, Сервер на localhost:3000 
<p>При запуске клиент получает историю телефонов из бд и устанавливает websocket соединение с сервером.
<P>При отправке формы данные отправляются на сервер через post запрос. При успешном сохранении сервер шлет сообщение 
через вебсокет о созданном объекте всем подключенным страницам, тем самым обновляя список у всех клиентов онлайн, без необходимости перезагрузки.

## Использованные технологии:
Клиент:
<ul>
  <li>React</li>
  <li>Redux</li>
  <li>Axios</li>
</ul>
Сервер
<ul>
  <li>Node.js</li>
  <li>Express</li>
</ul>
Общие технологии
<ul>
  <li>WebSocket</li>
  <li>База данных PostgreSQL</li>
  <li>Docker</li>
</ul>
