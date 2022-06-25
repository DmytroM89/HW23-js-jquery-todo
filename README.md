### Переделать ToDo-list (желательно который реализован на class) с использованием jQuery.
Вся работа с DOM должна проходить через jquery, в том числе обработка событий и url данных (jQuery ajax).
1. При загрузке страницы нужно вывести список всех todos в html.
2. Реализовать создание новых задач.
   1. При нажатии на кнопку create отправить (post) запрос на создание todo.
   2. При успешном создании todo отобразить todo в списке задач и очистить input.
   3. При возникновении ошибки показать сообщение. (Можно вывести в консоль или вывести сообщение в удобном месте).
3. Реализовать изменение статуса todo.
   1. При изменении статуса нужно обновить ui.
   2. Отправить запрос (put або patch) на обновление задачи в базе данных (данные должны обновиться в файле db.json).
4. **Опциональное задание.** Реализовать удаление todo
   1. Удаление todo с DOM дерева.
   2. Отправить запрос на удаление из базы данных