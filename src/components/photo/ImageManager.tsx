import { FormEvent, useState } from 'react';
import ImagesList from './ImagesList';

import style from './ImageManager.module.css';

const ImageManager = () => {
  const [data, setData] = useState<string[]>([]);
   
  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        resolve(fileReader.result as string);      
      });
      
      fileReader.addEventListener('error', () => {            
        reject(fileReader.error);
      });
      
      fileReader.readAsDataURL(file);
    });
  }

  const handleSelect = async (evt: FormEvent<HTMLInputElement>) => {    
    const target = evt.target as HTMLInputElement & {
      files: FileList;
    }

    const files: File[] = [...target.files];      
    const urls = await Promise.all(files.map(o => fileToDataUrl(o)));     
    
    setData(prev => [...prev, ...urls]);
  }

  const removeImage = (src: string | ArrayBuffer | null) => {     
    const filteredData = data.filter(i => i !== src);
    setData([...filteredData]);   
  }

  return (
    <>    
      <form className={style.images_form}>
        <label htmlFor='image' className={style.images_label}>Click to select</label>
        <input id='image' type="file" accept="image/*" onChange={handleSelect} className={style.images_input}/>
      </form>  
      <div className={style.images_container}>
        <ImagesList data={data} remove={removeImage}/>        
      </div>
    </>
  );
}

export default ImageManager;