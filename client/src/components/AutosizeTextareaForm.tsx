"use client"

import React, { useState } from 'react';
import { useToast } from './ui/use-toast';

interface Question {
  id: number;
  question: string;
}
interface Answer {
  id: number;
  question: string;
  answer: string;
}

interface FormProps {
  questions: Question[];
}

const Form: React.FC<FormProps> = ({questions}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const {toast} = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number, question: string) => {
    const { value } = e.target;
    const index = answers.findIndex(answer => answer.id === id);

    if (index !== -1) {
      
      const updatedAnswers = [...answers];
      updatedAnswers[index] = { ...updatedAnswers[index], answer: value };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { id, question, answer: value }]);
    }

  };

  const handlesubmit = (e:any)=>{
    e.preventDefault();
    console.log(answers);
    toast({title:"Test Submitted"});
  }

  return (
    <form className='border border-0 border-black w-10/12' onSubmit={handlesubmit}>
      {questions.map(question => (
        <div className='mb-5' key={question.id}>
          <div className="mb-2"> 
            <label  htmlFor={`question-${question.id}`}>
              {question.id}. {question.question}
            </label>
          </div>
          <div>  
            <textarea
            className='border border-2 border-black h-20 w-full p-1'
            id={`question-${question.id}`}
            value={answers.find(answer => answer.id === question.id)?.answer || ''}
            onChange={(e) => handleChange(e, question.id, question.question)}
          />
          </div>
        </div>
      ))}
      <button 
          className='bg-black text-white p-3 rounded ' 
          type='submit'
      >
          Submit
      </button>
    </form>
    
  );
};

export default Form;