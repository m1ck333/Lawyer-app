
import SubjectsList from "../components/Subjects/SubjectsList";


const Subjects = () => {  

    const dummySubjects = [
        { 
          subjectNumber: '4-11-22',
          dateOfReceipt: new Date('2023-04-07'),
          subject: 'Brakorazvodna parnica',
          associates: 'Milos Petrovic',
          client: 'Goran Mladenovic',
          opponent: 'Milica Mladenovic'
        },
        {
          subjectNumber: '3-11-22',
          dateOfReceipt: new Date('2023-02-18'),
          subject: 'Ostavinska rasprava',
          associates: 'Milos Petrovic',
          client: 'Milos Verkic',
          opponent: 'Tanja Verkic'
        },
        {
          subjectNumber: '3-11-22',
          dateOfReceipt: new Date('2023-06-10'),
          subject: 'Nasledjivanje',
          associates: 'Milos Petrovic',
          client: 'Milan Miladinovic',
          opponent: 'Zoran Miladinovic'
        }
    ]; 

    // dummySubjects.sort((a: any, b: any) => a.dateOfReceipt - b.dateOfReceipt);    
    
    return (
    
        <div>
            <h1 className="flex items-center justify-center text-3xl font-bold mb-10">Subjects</h1>        
            <SubjectsList subjects={dummySubjects} />             
        </div>

    );
  };
  
  export default Subjects;