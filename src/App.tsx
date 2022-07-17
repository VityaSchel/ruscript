import React from 'react'
import './App.scss'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { duotoneDark } from '@uiw/codemirror-theme-duotone'
import './demo.js'

function App() {
  const [value, setValue] = React.useState('new Рускрипт(\'Взять значение «Привет, мир!» и вывести в журнал\')\n/* new Рускрипт(\'код\', [ввод, ввод]).вывод */')
  const outputRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const importedCode = new URLSearchParams(new URL(document.location.href).searchParams).get('text')
    if (importedCode !== null && importedCode !== undefined && importedCode !== '') {
      setValue(importedCode)
    }

  }, [])

  const compile = () => {
    if(outputRef.current) outputRef.current.innerHTML = ''
    try {
      eval(value)
      // насколько это опасно вместе с аргументом text? на 100/10.
    } catch (e) {
      console.error(e)
    }
  }

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
        <button onClick={compile}>Компилировать</button>
      </div>
      <div className='output'>
        <p>Вывод:</p>
        <div id='output' ref={outputRef} />
      </div>
    </div>
  )
}

export default App
