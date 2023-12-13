import { useState } from 'react';
import Form from './Form';
import Table from './Table';
import { v1 } from 'uuid';

import style from './Steps.module.css';

export interface IFormData {
  date: string;
  distance: string;
  id: string;
}

export interface IData {
  array: IFormData[];
}

const Steps = () => {
  const [data, setData] = useState<IData>({
    array: [],
  });  

  const [formData, setFormData] = useState<IFormData>({    
    date: '',
    distance: '',
    id: v1(),
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  const dataHandler = (formData: IFormData) => {
    let newData: IFormData[] = [];

    const editData = (array: IFormData[]) => {
      const found = array.find(i => i.date === formData.date);
  
      if (!found) {
        newData = [...array, formData];
        return;
      }
      
      const count = Number(found.distance) + Number(formData.distance);
      found.distance = count.toString();
      newData = [...array];    

      setEditMode(false);
    }

    const filteredArray = data.array.filter(i => i.id !== formData.id);    
    editMode ? editData(filteredArray) : editData(data.array);
  
    setData({
      array: newData.sort(compare),
    });
  }
  
  const removeNote = (id: string) => {    
    const filteredData = data.array.filter(i => i.id !== id);

    setData({
      array: filteredData.sort(compare),
    });
  }

  const fillForm = (item: IFormData) => {
    setFormData({
      date: item.date,
      distance: item.distance,
      id: item.id,
    });

    setEditMode(true);
  }

  function compare(a: IFormData, b: IFormData) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    return Number(dateB) - Number(dateA);
  }

  return (  
    <> 
      <Form formData={formData} setFormData={setFormData} dataHandler={dataHandler} />  
      { data.array.length !== 0 
        ? <table className={style.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Пройдено км</th>
                <th>Действия</th>
              </tr>
            </thead>        
            <tbody>          
              <Table data={data} editor={fillForm} remover={removeNote} />         
            </tbody>         
          </table>
        : null
      }
    </> 
  );
}

export default Steps;