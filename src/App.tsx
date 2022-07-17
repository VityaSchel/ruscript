import React from 'react'
import './App.scss'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { duotoneDark } from '@uiw/codemirror-theme-duotone'

function App() {
  const [value, setValue] = React.useState('new Рускрипт(\'Взять значение «Привет, мир!» и вывести в журнал\')\n/* new Рускрипт(\'код\', [ввод, ввод]).вывод */')
  const [output, setOutput] = React.useState('')

  return (
    <div className='App'>
      <div className='compilation'>
        <p>Код на JavaScript:</p>
        <div className='editor'>
          <CodeMirror
            value={value}
            extensions={[javascript({ jsx: false })]}
            onChange={setValue}
            theme={duotoneDark}
            minWidth='0px'
            width='100%'
            height='100%'
          />
        </div>
        <button>Компилировать</button>
      </div>
      <div className='output'>
        <p>Вывод:</p>
        <div id='output'>{output}</div>
      </div>
    </div>
  )
}

export default App
