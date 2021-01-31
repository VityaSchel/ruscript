let editor = CodeMirror.fromTextArea(document.querySelector('textarea#code'), {
  mode: "javascript",
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  theme: "material-palenight",
  font: "monospace"
});

document.querySelector(".compile").addEventListener("click", compile)
function compile(){
  document.querySelector('#output').innerHTML = "";
  try {
    eval(editor.getValue())
  } catch (e){
    console.error(e);
  }
}

console._log = console.log
console._warn = console.warn
console._error = console.error
console.log = function(value)
{
  console._log(value);
  let color = "#ffffff";
  switch(typeof value){
    case "string":
      //sets further
      break;

    case "number":
      color = "#ac64fa";
      break;

    case "boolean":
      color = "#96f573";
      break;
  }
  console.log_to_output(value, color);
};
console.log_to_output = function(value, color = "#FFFFFF", special_message = false){
  let v = document.createElement("label")
  v.style.color = color;
  if(typeof value == "string" && !special_message){
    let span_left = document.createElement("span");
    span_left.innerText = '"';
    span_left.style.color = "#ffffff";

    let span_center = document.createElement("span");
    span_center.innerText = value;
    span_center.style.color = "#f5a967";

    let span_right = document.createElement("span");
    span_right.innerText = '"';
    span_right.style.color = "#ffffff";

    v.appendChild(span_left)
    v.appendChild(span_center)
    v.appendChild(span_right)
  } else {
    v.innerText = value;
  }
  document.querySelector('#output').appendChild(v)
}
console.warn = value => { console._warn(value); console.log_to_output("Предупреждение: "+value, "#f5f571", true); }
console.error = value => { console._error(value); console.log_to_output("Ошибка: "+value, "#f54242", true); }