# Рускрипт
Юмористический язык программирования полностью на русском, написанный и компилирующийся в JavaScript.

```
Объявить переменную приветМир.
Взять значение «Привет» и прибавить «, » и записать в переменную приветМир.
Прочитать значение переменной приветМир и прибавить «мир!» и вывести в журнал.
```

0. Основы
1. Переменные
2. Ввод
3. Вывод
4. Функции (планируется)
5. Условия

## 0. Основы
### Правила форматирования:
- Все переменные компилятора, названия функций должны быть на русском
- Все слова должны иметь русские корни, то есть нельзя использовать слово контент, но можно слово содержимое или нельзя консоль, но можно журнал, нельзя тип и вариант, но можно вид
- Не смотря на это правило, все еще используется «команда», «модификатор», «логика», «операция» (планируется заменить)
### Другое
- Все команды разделяются точкой и любым количеством пробелов между точкой и следующим любым отличным от пробела символом.
- Во время компиляции все символы новой строки объединяются в одну строку, а пустые команды удаляются.
- Между точкой и следующим символом может и не быть пробелов. Регистр не имеет значения.
- Писать союз И перед первым модификатором не обязательно
- Модификаторы это команды добавляемые после команды в составе одной строки. Пример: Значение Да| вывести на экран
- Рекомендуемые правила форматирования:
  1. Каждую команду начинать с большой буквы.
  2. По одной команде на строку (кроме содержания функций)
  3. Модификаторы писать через союз и, кроме случая с командой Значение
- Комментарии имеют следующий формат: `/*комментарий*/` и могут находиться в любом месте кода и иметь любое содержание (включая многострочное)
- В синтаксисе поддерживаются только целые числа в пределах int32

## 1. Переменные
### Команды:
- Объявить перменную *название*
- Прочитать значение переменной *название*


### Модификаторы:
  \+ [ и] записать в переменную *название*\
    Примеры:\
      Взять значение 10 записать в переменную приветМир\
      Прочитать ввод и записать в переменную данные

  \+ [ и] прибавить (значение) [...модификаторы]\
    Возвращает новое значение\
      Примеры:\
        Взять значение «Привет» и прибавить «, » и прибавить «мир!» и вывести в журнал

   \+ [ и] умножить на (значение) [...модификаторы]\
    Возвращает новое значение\
      Примеры:\
        Взять значение 2 и умножить на 2 и вывести в журнал

   \+ [ и] поделить на (значение) [...модификаторы]\
    Возвращает новое значение\
      Примеры:\
        Взять значение 1 и поделить на 0 и вывести в журнал

  \+ [ и] перевести в число [...модификаторы]\
    Возвращает число или строку\
      Примеры:\
        Прочитать ввод и перевести в число и прибавить 5 и вывести в журнал

  \+ [ и] перевести в строку [...модификаторы]\
    Возвращает строку\
      Примеры:\
        Прочитать ввод и перевести в строку и прибавить 0 и вывести в журнал\

  \+ [ и] определить вид [...модификаторы]\
    Возвращает тип: «Строка», «Число», «Логическое значение»\
      Примеры:\
        Прочитать ввод и определить вид и вывести в журнал

  (Значение):
  Тип|Пример
  ---|---
  Логическое|`Да`, `Нет`
  Числовое|`1`, `10`, `-100`
  Строковое|`«строка»`

  *Планирутся: Числовое: `сто`, `пять`, `тысяча двести`, `отрицательное пять`*


## 2. Ввод
### Команды:
- Прочитать ввод (=prompt)

### Примеры:
  `Прочитать ввод и записать в переменную приветМир`

## 3. Вывод

### Модификаторы:
  \+ [ и] вывести в консоль (=console.log)\
  \+ [ и] вывести на экран (=alert)\
  Примеры:\
    `Прочитать ввод и вывести в консоль`\
    `Взять значение Да и вывести на экран`


## 5. Условия
Если (*условие*), то (*команда*)[, иначе (*команда*)]
Примеры:\
  `Если (взять значение Да), то (взять значение «Истина» и вывести в журнал)`

### Модификаторы:

  \+ [ и] определить равняется ли *значение*
  Примеры:
    Если (прочитать ввод и определить равняется ли Да), то (взять значение «Истина» и вывести в журнал)
