import { v1 } from 'uuid';
import style from './ImageManager.module.css';
import { IoIosClose } from "react-icons/io";

export type ImagesListPropsType = {
  data: string[],  
  remove: (src: string) => void,
}

const ImagesList = (props: ImagesListPropsType) => { 
  return (
    props.data.map(item => {
      const remove = () => props.remove(item);
      return (
        <div key={v1()} className={style.image_box}>
          <IoIosClose onClick={remove} className={style.image_remover}/>
          <img src={item} className={style.image}/>
        </div>
      )
    })    
  );
}

export default ImagesList;