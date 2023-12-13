import style from './Converter.module.css';
import { useState } from 'react';

const Converter = () => { 
  const [rgb, setRgb] = useState<string>('rgb(0, 0, 0)'); 
  
  const hex2rgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return (Number.isNaN(r) || Number.isNaN(g)|| Number.isNaN(b)) ? 'Ошибка!' : `rgb(${r}, ${g}, ${b})`;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    if (e.target.value.length === 7) {      
      setRgb(hex2rgb(e.target.value));
    }
  }
  
  const styles = {
    color: {
      backgroundColor: (rgb !== 'Ошибка!') ? rgb : 'rgb(233,75,53)',
    }   
  }

  return (
    <>
      <div className={style.container} style={styles.color}>
        <input 
          name='input'
          type="text" 
          className={style.hex} 
          onChange={handleChange}
        />
        <div className={style.rgb}>{rgb}</div>
      </div>
    </>    
  );
}

export default Converter;