import { FormEvent, useState } from 'react';
import { IFormData } from './Steps';
import style from './Steps.module.css';
import { v1 } from 'uuid';

interface IFormProps {
  formData: IFormData, 
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>,
  dataHandler: (formData: IFormData) => void,  
}

const Form = (props: IFormProps) => {
  const [error, setError] = useState({
    date: false,
    distance: false,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    props.setFormData(prevForm => ({
      ...prevForm,      
      [name]: value,           
    }));

    if (value !== '') {
      setError((prev) => ({
        ...prev,
        [name]: false,              
      })); 
    }    
  } 

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();  

    checkError();

    if (props.formData.date === '' || props.formData.distance === '') return;

    props.dataHandler(props.formData);

    props.setFormData({
      date: '',
      distance: '',
      id: v1(),
    });    
  }

  const checkError = async () => {
    Object.entries(props.formData).forEach(pair => {
      if (pair.includes('')) {
        setError((prev) => ({
          ...prev,
          [pair[0]]: true,              
        }));
      } 
    });    
  }

  return (
    <form onSubmit={onSubmitHandler} className={style.form}>
      <div className={style.date}>
        <label htmlFor='date' className={style.label}>Дата</label>
        <input 
          value={props.formData.date}
          id='date'
          name='date'               
          type='date'
          onChange={onChangeHandler}
          className={error.date ? style.error : ''}
        />
      </div>      
      <div className={style.distance}>
        <label htmlFor='distance' className={style.label}>Пройдено км</label>
        <input 
          value={props.formData.distance}
          id='distance' 
          name='distance'             
          type='number'
          min='0.1'
          step='0.1'
          onChange={onChangeHandler}  
          className={error.distance ? style.error : ''}
        />
      </div> 
      <button type='submit' className={style.btn}>OK</button> 
    </form>
  );
}

export default Form;