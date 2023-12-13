import { IData, IFormData } from "./Steps";
import { PiPencil } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

import style from "./Steps.module.css";
import moment from "moment";

interface ITableProps {
  data: IData,
  editor: (item: IFormData) => void,
  remover: (id: string) => void,
}

const Table = (props: ITableProps) => {  
  return props.data.array.map(item => {    
    const edit = () => props.editor(item);
    const remove = () => props.remover(item.id);
    
    return (            
      <tr key={item.id}>
        <td>{moment(item.date).format('DD.MM.YYYY')}</td>
        <td>{item.distance}</td>
        <td>
          <PiPencil onClick={edit} className={style.icon} />
          <IoMdClose onClick={remove} className={style.icon} />         
        </td>
      </tr>
    );      
  });  
}

export default Table;