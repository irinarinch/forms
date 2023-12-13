import Converter from './components/hex2rgb/Converter';
import Steps from './components/steps/Steps';
import ImageManager from './components/photo/ImageManager';

function App() {
  return (
    <>
      <h1>Forms</h1>
      <div className="task">
        <h3>Задача 1. Конвертер цветов</h3>
        <Converter />      
      </div>  
      <div className="task">
        <h3>Задача 2. Учет тренировок</h3>
        <Steps />        
      </div>
      <div className="task">
        <h3>Задача 3. Менеджер фото</h3>
        <ImageManager /> 
      </div>
    </>
  );
}

export default App;
