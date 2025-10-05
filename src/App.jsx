import './App.css'
import TextType from './components/TextType'

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'transparent',  // 透明背景
      color: 'black',
      fontSize: '2rem',
      fontFamily: 'Montserrat-VariableFont_wght, sans-serif'
    }}>
      <TextType
        text={["Wu Ho Yu", "for the website", "designer portfolio"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />
    </div>
  )
}

export default App
