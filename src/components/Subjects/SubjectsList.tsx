import { useState } from "react";
import Subject from "./Subject";

interface Subject {
  subjectNumber: string;
  dateOfReceipt: string;
  subject: string;
  associates: string,
  client: string,
  opponent: string;
}

interface SubjectListProps {
  subjects: Subject[];
}

const SubjectsList: React.FC<SubjectListProps> = ({ subjects }) => {   
  
  const [isClickedSubject, setIsClickedSubject] = useState(false);
  const [subjectNumberstate, setSubjectNumberState] = useState('');
  const [subjectState, setSubjectState] = useState('');
  const [dateOfReceiptState, setDateOfReceiptState] = useState('');
  const [associatesState, setAssociatesState] = useState('');
  const [clientState, setClientState] = useState('');
  const [opponentState, setOpponentState] = useState('');

  const test = (subject: Subject) => {      
      setSubjectNumberState(subject.subjectNumber);
      setDateOfReceiptState(subject.dateOfReceipt);
      setSubjectState(subject.subject);
      setAssociatesState(subject.associates);
      setClientState(subject.client);
      setOpponentState(subject.opponent);
      setIsClickedSubject(true);
  }

  const closeModal = () => {
    setIsClickedSubject(false);
  }

  return (
    
    <div className="border p-[20px]">
      {!isClickedSubject 
        ?
        <h1 className="flex justify-center mb-[30px] text-[25px]">Lista predmeta: </h1>
        :
        <h1 className="flex justify-center mb-[10px] text-[25px]">Predmet</h1>
      }
      {!isClickedSubject && 
      <table>
      <thead key="">
          <tr>
          <td>Predmet</td>
          <td>Broj predmeta</td>
          <td>Datum prijema</td>          
          <td>Saradnici</td>
          <td>Klijent</td>
          <td>Protivnik</td>          
          </tr>
      </thead>
      <tbody >
          {subjects.map((subject, index) => (        
                <tr key={index}> 
                  <td className="cursor-pointer hover:text-blue-300 underline " onClick={() => test(subject)}>{`${subject.subject}`}</td>
                  <td>{`${subject.subjectNumber}`}</td>
                  <td>{`${subject.dateOfReceipt}`}</td>            
                  <td>{`${subject.associates}`}</td>
                  <td>{`${subject.client}`}</td>
                  <td>{`${subject.opponent}`}</td>
                </tr>
          ))}
      </tbody>
    </table>
      }
      
      {isClickedSubject && 
        <div className="flex flex-col text-center w-full"> 
          <Subject 
          subjectNumber={subjectNumberstate} 
          dateOfReceipt={dateOfReceiptState} 
          subject={subjectState} 
          associates={associatesState} 
          client={clientState} 
          opponent={opponentState} />
          <button className="mt-[20px] w-1/2 mx-auto" onClick={closeModal}>Close</button>
        </div>
      }
      
    </div>
  );
};

export default SubjectsList;