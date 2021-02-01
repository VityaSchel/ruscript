class Рускрипт {

  ошибки_рускрипта = {
    не_существующая_команда: "Указана неизвестная команда: «%команда%».",
    нет_содержимого: "В конструкторе класса рускрипт не передан код для компиляции.",
    не_существующий_модификатор: "Указан несуществующий модификатор: «%модификатор%».",
    пустое_условие: "Указано пустое условие в блоке «Если, то».",
    большое_исполнение: "Указано более одной команды в исходе в блоке «Если, то».",
    не_поддерживаемое_значение: "Передано не поддерживаемое значение: %значение%. Текущие поддерживаемые значения: %поддерживаемые_значения%"
  };

  команды_рускрипта = {
    переменные: {
      объявление: /^Объявить переменную (\S+)(.*)$/ui,
      чтение: /^Прочитать значение переменной (\S+)(.*)$/ui
    },
    ввод: {
      чтение: /^Прочитать ввод(.*)$/ui,
      примитивы: /^Взять значение ((Да|Нет)|(\d+)|«(.*?)»)(.*)$/ui
    },
    условие: {
      проверка: /^Если \((.*?)\), то \((.*?)\)(, иначе \((.*?)\))?$/ui
    }
  }

  модификаторы_рускрипта = {
    записать_в_переменную: /^ ?( и)? записать в переменную (\S+)(.*)$/ui,
    вывести_на_экран: /^( и)? вывести на экран(.*)$/ui,
    вывести_в_журнал: /^( и)? вывести в журнал(.*)$/ui,
    прибавить: /^( и)? прибавить («.*?»|\d+|Да|Нет|значение переменной \S+)((?=( и))(.*))?$/ui,
    вычесть: /^( и)? вычесть («.*?»|\d+|Да|Нет|значение переменной \S+)((?=( и))(.*))?$/ui,
    умножить: /^( и)? умножить на («.*?»|\d+|Да|Нет|значение переменной \S+)((?=( и))(.*))?$/ui,
    поделить: /^( и)? поделить на («.*?»|\d+|Да|Нет|значение переменной \S+)((?=( и))(.*))?$/ui,
    остаток_от_деления: /^( и)? определить остаток от деления на («.*?»|\d+|Да|Нет|значение переменной \S+)((?=( и))(.*))?$/ui,
    перевести_в_число: /^( и)? перевести в число((?=( и))(.*))?$/ui,
    перевести_в_строку: /^( и)? перевести в строку((?=( и))(.*))?$/ui,
    вид_переменной: /^( и)? определить вид((?=( и))(.*))?$/ui,
    равняется_ли: /^( и)? определить равняется ли (.+?)((?=( и))(.*))?$/ui,
    заменить: /^( и)? заменить «?(.+?)»? на «?(.+?)»?((?=( и))(.*))?$/ui
  }

  примитив_строки_выражение = /^«(.*)»$/ui;
  примитив_число_выражение = /^\d+$/;
  примитив_логическое_выражение = /^(Да|Нет)$/ui;

  примитив_в_переменную = /^значение переменной (\S+)$/ui

  _временно = undefined;
  _переменные = {};
  ввод = [];
  ввод_индекс = 0;

  вывод = [];

  поддерживаемые_значения = "Строка — «Пример», Целое число — 100, Логическое значение — Да — Нет"

  игнорировать_вывод_на_экран = false;

  constructor(содержимое, ввод = [], игнорировать_вывод_на_экран = false) {
    this.ввод = ввод;
    this.ввод_индекс = 0;
    this.игнорировать_вывод_на_экран = игнорировать_вывод_на_экран;
    this.обработать(содержимое);
  }

  обработать(содержимое) {
    if(!содержимое || !содержимое.length) { throw this.ошибки_рускрипта.нет_содержимого; }
    содержимое = содержимое.replace(/\n/guim, "");
    содержимое = содержимое.replace(/(\/\*(.|[^.])*?\*\/)/guim, "")
    let команды = содержимое.split(/((?<!\/)\.\s*)+/guim);
    команды = команды.map(команда => команда.replace(/\/\./gium, '.'))
    команды = команды.filter(команда => команда !== "");
    команды = команды.filter(команда => !/^\.\s*$/gium.test(команда))
    if(!команды || !команды.length) { throw this.ошибки_рускрипта.нет_содержимого; }
    команды.forEach(команда => {
      this.обработать_команду(команда)
      this._временно = undefined;
    });
  }

  обработать_команду(команда) {
    if(this.команды_рускрипта.ввод.чтение.test(команда)){
      let [,модификаторы] = this.команды_рускрипта.ввод.чтение.exec(команда);
      let ответ_пользователя = this.прочитать_ввод();
      if(ответ_пользователя === null){
        ответ_пользователя = ""
      }
      this._временно = ответ_пользователя

      this.обработать_модификаторы(модификаторы)
    } else if (this.команды_рускрипта.ввод.примитивы.test(команда)){
      let [,значение,,,,модификаторы] = this.команды_рускрипта.ввод.примитивы.exec(команда);
      this._временно = this.преобразовать_значение(значение)

      this.обработать_модификаторы(модификаторы)
    } else if (this.команды_рускрипта.переменные.объявление.test(команда)){
      let [,название_переменной,модификаторы] = this.команды_рускрипта.переменные.объявление.exec(команда)
      this._переменные[название_переменной] = undefined;
      this._временно = undefined;

      this.обработать_модификаторы(модификаторы)
    } else if (this.команды_рускрипта.переменные.чтение.test(команда)){
      let [,название_переменной,модификаторы] = this.команды_рускрипта.переменные.чтение.exec(команда)
      this._временно = this._переменные[название_переменной];

      this.обработать_модификаторы(модификаторы)
    } else if (this.команды_рускрипта.условие.проверка.test(команда)){
      let [,условие,то,,иначе] = this.команды_рускрипта.условие.проверка.exec(команда)
      if(условие === "" || условие === undefined) {
        throw this.ошибки_рускрипта.пустое_условие;
      }
      this.обработать_команду(условие);
      if(this.преобразовать_значение(this._временно)){
        if(условие.split(".").length > 1){
          throw this.ошибки_рускрипта.большое_исполнение;
        }
        this.обработать_команду(то)
      } else {
        if(иначе !== undefined && иначе !== ""){
          if(иначе.split(".").length > 1){
            throw this.ошибки_рускрипта.большое_исполнение;
          }
          this.обработать_команду(иначе)
        }
      }
    } else {
      throw this.ошибки_рускрипта.не_существующая_команда.replace("%команда%", команда);
    }
  }

  прочитать_ввод(){
    let ввод = this.ввод[this.ввод_индекс]
    if(ввод === undefined){
      return prompt()
    }
    this.ввод_индекс++;
    /* на будущее: не использовать ввод || prompt() из-за evaluating */
    return ввод
  }

  преобразовать_значение(значение, преобразовать_логическое_значение = true){
    switch(this.определить_вид(значение)){
      case "«Строка»":
        return значение.slice(1,-1);

      case "«Число»":
        return Number(значение)

      case "«Логическое значение»":
        if(typeof значение == "string" && преобразовать_логическое_значение){
          return "да"==значение.toLowerCase()
        } else {
          return значение
        }
    }
  }

  определить_вид(значение){
    if(this.примитив_число_выражение.test(значение)){
      return "«Число»"
    } else if (this.примитив_логическое_выражение.test(значение) || typeof значение === "boolean") {
      return "«Логическое значение»"
    } else if (typeof значение === "string") {
      return "«Строка»"
    } else {
      throw this.ошибки_рускрипта.не_поддерживаемое_значение.replace("%значение%", значение).replace("%поддерживаемые_значения%", this.поддерживаемые_значения);
    }
  }

  обработать_модификаторы(модификаторы){
    if(модификаторы === "" || модификаторы === undefined) { return; }
    let модификаторы_рускрипта = Object.keys(this.модификаторы_рускрипта);
    let модификатор, выражение_модификатора = null;
    for (let i = 0; i < модификаторы_рускрипта.length; i++) {
      модификатор = модификаторы_рускрипта[i]
      выражение_модификатора = this.модификаторы_рускрипта[модификатор]
      if(выражение_модификатора.test(модификаторы)){
        break;
      } else {
        модификатор = null;
        выражение_модификатора = null;
      }
    }

    switch(модификатор){
      case "вывести_на_экран":
        let вывод = this._временно;
        if(!this.игнорировать_вывод_на_экран){
          this.вывод.push(вывод)
          alert(вывод);
        }
        break;

      case "вывести_в_журнал":
        let _вывод = this._временно;
        this.вывод.push(_вывод)
        console.log(_вывод);
        break;

      case "записать_в_переменную":
        var [,,название_переменной] = выражение_модификатора.exec(модификаторы)
        this._переменные[название_переменной] = this._временно;
        break;

      case "прибавить":
        var [,,значение,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно += this.преобразовать_значение_для_операции(значение)
        break;

      case "вычесть":
        var [,,значение,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно -= this.преобразовать_значение_для_операции(значение)
        break;

      case "умножить":
        var [,,значение,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно *= this.преобразовать_значение_для_операции(значение)
        break;

      case "поделить":
        var [,,значение,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно /= this.преобразовать_значение_для_операции(значение)
        break;

      case "перевести_в_число":
        var [,,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        let числовое_значение = parseInt(this._временно)
        if(!isNaN(числовое_значение)){
          this._временно = числовое_значение
        }
        break;

      case "перевести_в_строку":
        var [,,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно = String(this._временно)
        break;

      case "вид_переменной":
        var [,,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно = this.определить_вид(this._временно)
        break;

      case "равняется_ли":
        var [,,предположение,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        let первое_сравнение = this.преобразовать_значение(this._временно, false);
        let второе_сравнение = this.преобразовать_значение(предположение, false);
        this._временно = первое_сравнение==второе_сравнение
        break;

      case "остаток_от_деления":
        var [,,делитель,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        this._временно %= this.преобразовать_значение_для_операции(делитель)
        break;

      case "заменить":
        var [,,что,на_что,последующие_модификаторы] = выражение_модификатора.exec(модификаторы)
        что = this.преобразовать_значение_для_операции(что)
        на_что = this.преобразовать_значение_для_операции(на_что)
        if(typeof this._временно == "string"){
          this._временно = this._временно.replace(что,на_что)
        }
        break;

      default:
        throw this.ошибки_рускрипта.не_существующий_модификатор.replace("%модификатор%", модификаторы);
        break;
    }

    this.обработать_модификаторы(последующие_модификаторы);
  }

  преобразовать_значение_для_операции(значение) {
    if(this.примитив_в_переменную.test(значение)){
      let [,название_переменной] = this.примитив_в_переменную.exec(значение)
      return this._переменные[название_переменной]
    } else if(this.определить_вид(значение) == "«Число»") {
      return Number(значение)
    } else if(this.примитив_строки_выражение.test(значение)) {
      return this.примитив_строки_выражение.exec(значение)[1];
    } else if(this.примитив_логическое_выражение.test(значение)){
      return значение.toLowerCase()==="да"
    } else {
      return значение
    }
  }
}
