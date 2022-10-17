

# Описание файлов и папок

- `с` компоненты
  - `inputs` поля формы
    - `fields-options.jsx` объект с настройками полей форм и функции для их получения
    - `file.jsx` компонент поля выбора файла
    - `input.jsx` компоненты различных инпутов
    - `uncontrol_form.jsx` неконтролируемые компоненты инпутов
  - `catalog_page.jsx` компонент страницы каталога
  - `catalog.jsx` компонент каталога
  - `fetch.js` функции произвольных запросов и запросов к API сервера
  - `get_reg_data_mess.jsx` компонент сообщений в шапке о переносе регистрационных данных
  - `lang-switcher.jsx` компонент переключателя языков админки
  - `lang.jsx` компонент предоставляющий локализованные данные
  - `locale_direction.jsx` компонент настроек локализации
  - `mail_page.jsx` компонент страницы почты
  - `mydomen_page.jsx` компонент страницы домена
  - `nav.jsx` компонент навигации
  - `notice.jsx` компонент инлайновых сообщений
  - `page-lang-tabs.jsx` компонент табов локализации админки
  - `pages.jsx` компонент вывода страниц
  - `password_page.jsx` компонент страницы смены пароля
  - `popup_notice.jsx` компонент всплывающих сообщений
  - `products.jsx` компонент продуктов
  - `reducer.jsx` основной и единственный редьюсер
  - `section-1.jsx` компонент секции
  - `section-2.jsx` компонент секции
  - `section-3.jsx` компонент секции
  - `section-4.jsx` компонент секции
  - `section-5.jsx` компонент секции
  - `section-6.jsx` компонент секции
  - `section-7.jsx` компонент секции
  - `section.jsx` компонент оболочки секции
  - `support_page.jsx` компонент страницы обращения в поддержку
  - `topbar.jsx` компонент шапки
- `css` файлы стилей
  - `util.sass` вспомогательные стили
- `font` файлы шрифтов
- `img` изображения
- `App.jsx` основной файл приложения
- `App.css` основной файл стилей

&nbsp;

# Описание работы приложения

1. При инициализации приложения `state` должен получить объект `window.o` заданный инлайн скриптом в основном *html* или *php* файле.
  ```javascript
  window.o = {
      v: "1.0.0",                                           // версия приложения
      ajaxUrl: 'https://domain-name.com/api.php',           // адрес API
      homeUrl: 'https://domain-name.com',                   // Собственный адрес сайта
      admin_settings: {                                     // можно задать настройки для использования(или нет) внутри приложения
        min_title_value_length: 5,                          // минимальное кол-во символов для шортрида
        min_longtext_value_length: 15,                      // минимальное кол-во символов для лонгрида
      },
      user: {                                               // Данные авторизованного пользователя
        data: {
          ID: "2",                                          // ID 1 должен занимать мастер-аккаунт
          display_name: "username",
          user_email: "admin_email@gmail.com",
          user_login: "login",
          user_nicename: "nicename",
          user_pass: "$P$BRHvXQSJz8xothKuRr18IYB3Wvx7as/",  // зашифрованный MD5 пароль
          user_registered: "2021-12-15 17:34:11",           // дата регистрации
          user_status: "0",
          user_url: "https://self-domain.com",              // адрес текущего сайта
        }
      }
    }
  ```
2. Далее совершается запрос к собственному API с ключом `init`. В ответ получаем объект всех полей из БД относящихся к настройкам и пользовательским данным приложения. Ответ разбирается в событии `reducer.init` и записывается в `state.form`.

3. Запрос на изменение данных в БД отправляется событием `onblur` поля ввода данных за исключением поля с типом `file` и `uncontrol` форм, которые имеют свою логику.

4. На отдельных страницах приложения, таких как "Управление почтой" используются `uncontrol` формы - формы, за которыми не следит `state` и отправляют данные через API на почту администратора.

&nbsp;

# Отправка запросов к API

За общение с API по-умолчанию отвечают две функции из файла `/c/fetch.js`.
- `Fetch(key,value,[cb])`
  - __Принимает:__ ключ (строка) и значение (строка) мета-поля, котрое нужно изменить. Опционально принимает функцию обратного вызова, в которую передаётся результат запроса;
  - __Возвращает:__ объект ошибки в случае ошибки обновления поля либо результат работы вызванного API;
- `_Fetch(action, [options], [cb])`
  - __Принимает:__ название экшена (строка), который нужно выполнить. Опционально принимает несериализованный объект с произвольными данными и функцию обратного вызова, в которую передаётся результат запроса;
  - __Возвращает:__ результат работы вызванного API

&nbsp;

# Добавление нового поля
Инпуты различных типов могут использоваться самостоятельно без создания формы. За исключение `uncontrol` полей, которые имеют свою логику.
В случае если какое-то свойство не указано, оно берётся из `fields_options.jsx` по ключу поля в БД

- __INPUT__, __TEXTAREA__

  Включает в себя готовое поле формы, с лэйблом и счётчиком символов.

  ```javascript
  <Field
    key="string"        // Уникальный ключ React для списков
    l="string"          // label поля
    f="s1_3"            // ключ поля в БД
    width="number"      // ширина поля в %
    className="input"   // класс инпута
    min="5"             // Минимальное кол-во символов
    max="15"            // Максимальное кол-во символов
    p="placeholder"     // Placeholder текст
    disabled="disabled" // disabled property
    type="type"         // text,number,textarea или другой тип инпута
  />
  ```
- __CHECKBOX__
  ```javascript
  <CHECKBOX
    key="string"        // Уникальный ключ React для списков
    f="string"          // ключ поля в БД
    nolocale="bool"     // нужно ли локализовать ключ БД
    disabled="bool"
  />
  ```

- __OptionalInput__
  
  Представляет собой группу из __INPUT__ и кастомного чекбокса, который включает или отключает текстовое поле. Значение обоих полей фиксируется в БД при `change`.

  ```javascript
  <OptionalInput
    key="string"      // Уникальный ключ React для списков
    l="string"        // label текстового поля
    f="string"        // ключ поля в БД. Добавляется к текстовому полю в чистом вид и с приставкой `_on` к чекбоксу. Так же добавляется как класс к чекбоксу, по которому устанавливается изображение при помощи стилей.
    className="input" // класс текстового поля
    p="string"        // placeholder text
    type="string"     // text,number,textarea или другой тип инпута
  />
  ```

- __FileField__

  Представляет собой поле с диалогом для загрузки изображений или добавления из медиабиблиотеки. Показывает миниатюру и индикатор загрузки.

  ```javascript
    <FileField
      l="string"        // label текстового поля
      btnText="string"  // текст кнопки загрузки
      note="string"     // текст подсказки
      f="string"        // ключ поля в БД
    />
  ```

&nbsp;

## Uncontrol form

Неконтролируемые поля представляют собой форму для отправки данных в API без обработки каждого отдельного поля. Обязательно оборачивается в `UNCONTROL_FORM`, где и зашита логика передачи данных. К каждой передаче данных добавляются обязательные поля:

- IPKEY - ключ пользователя в БД главного сайта
- request_URL - домен сайта, с которого производится запрос
- userID - ID пользователя в БД собственного сайта

```javascript
  <UNCONTROL_FORM
    action="string"           // название экшена
    theme="string"            // заполняет поле <theme> при отправке
    successMessage="string"   // текст сообщения при успешной отправке
    btntext="string"          // текст кнопки submit
    >

    <UNC_INPUT
      name="string"           // имя поля, добавляется в FormData как есть
      type="string"           // тип поля
      label="string"          // label поля
      min="number"            // минимальное кол-во символов
      maxLength="number"      // максимальное кол-во символов
      width="number"          // ширина поля в %
      notice="string"         // подсказка для поля
      required                // обязательность
      defaultValue="string"   // значение по-умолчанию
    />
    
    <UNC_TEXTAREA
      name="string"           // имя поля
      label="string"          // label поля
      min="number"            // минимальное кол-во символов
      rows="number"           // кол-во строк поля
      maxLength="number"      // максимальное кол-во символов
      width="number"          // ширина в %
    />

    <UNC_LABEL                // Может использоваться отдельно как обёртка для произвольного инпута, не отображается, если тип поля hidden
      width="width"           // ширина блока в %
      label="string"          // label блока
    />

  </UNCONTROL_FORM>
```

&nbsp;

# Локализация

Локализованные данные хранятся в `window.localize` и получаются по порядковому номеру. Функции для работы с локализованными данными из `/c/lang.jsx`

- `locals`

  Константа. Содержит объект, список используемых локалей с расшифровкой. Добавьте к списку локаль, если планируете разрешить её.

- `__(number, [defaultValue])`

  Возвращает локализованную строку согласно текущей локали или `defaultValue`, если определено. Если перевод не найден и не указано `defaultValue`, то вернётся заглушка `[get text]`. Например:
  ```javascript
  __(123, 'default string')
  ```
  Во время разработки всегда выводятся дефолтные значения так как нет простой возможности получить все локализованные строки.

- `_f(field_key)`

  Используется для получения ключа поля текущей локали. Так как одни и те же поля могут использоваться с разными локалями, то и в БД они хранятся с указанием локали, с которой были созданы.
  
  Например, ключ `s1_1` при условии, что соответствующие поля заполнены, может храниться как `s1_1[en_US]` и/или `s1_1[ru_RU]` и/или другие. Поэтому для получения значения поля с актуальной локалью используте данную функцию.

  ```javascript
  _f("s1_1") // вернёт строку "s1_1[en_US]" при активной вкладке английского языка
  ```

  &nbsp;