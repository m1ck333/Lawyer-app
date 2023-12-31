import { useState } from "react";
import Subject from "./Subject";

interface SubjectList {
  subjectNumber: string;
  dateOfReceipt: any;
  subject: string;
  associates: string,
  client: string,
  opponent: string;
}

interface SubjectListProps {
  subjects: SubjectList[];
}

const SubjectsList: React.FC<SubjectListProps> = ({subjects}) => {    
  
  const [isClickedSubject, setIsClickedSubject] = useState(false);
  const [subjectNumberstate, setSubjectNumberState] = useState('');
  const [subjectState, setSubjectState] = useState('');
  const [dateOfReceiptState, setDateOfReceiptState] = useState({});
  const [associatesState, setAssociatesState] = useState('');
  const [clientState, setClientState] = useState('');
  const [opponentState, setOpponentState] = useState('');

  const [subjectsArray, setSubjectsArray] = useState(subjects)

  const openSubject = (subject: SubjectList) => {      
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

  function compareFunction (a: any, b: any) { 
    const propA = a['subject'].toLowerCase();
    const propB = b['subject'].toLowerCase();   
    
    if (propA < propB) {
        return -1;
    }
    if (propA > propB) {
        return 1;
    }

    return 0;
    
}  

  function sortAlphabeticalSubjects() {
    const sortedSubjects = [...subjects].sort(compareFunction);
    setSubjectsArray(sortedSubjects);
  }

  function sortSubjectsByDate() {
    const sortedSubjects = [...subjects].sort((a: any, b: any) => a.dateOfReceipt - b.dateOfReceipt);
    setSubjectsArray(sortedSubjects);
  }

  return (
    
    <div className="border p-[20px] ">
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
          <td className="cursor-pointer hover:text-blue-300 underline" onClick={sortAlphabeticalSubjects}>Predmet</td>          
          <td>Broj predmeta</td>
          <td className="cursor-pointer hover:text-blue-300 underline" onClick={sortSubjectsByDate}>Datum prijema</td>          
          <td>Saradnici</td>
          <td>Klijent</td>
          <td>Protivnik</td>          
          </tr>
      </thead>
      <tbody >
          {subjectsArray.map((subject, index) => (
                <tr key={index}> 
                  <td className="cursor-pointer hover:text-blue-300 underline " onClick={() => openSubject(subject)}>{`${subject.subject}`}</td>
                  <td>{`${subject.subjectNumber}`}</td>
                  <td>
                    {`
                      ${subject.dateOfReceipt.getDate()}.
                      ${subject.dateOfReceipt.getMonth() + 1}.
                      ${subject.dateOfReceipt.getFullYear()}.
                   `}
                  </td>            
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