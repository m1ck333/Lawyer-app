const Subjects = () => {
    return (
    
    <div>
        <h1 className="flex items-center justify-center text-3xl font-bold mb-10">Subjects</h1>
        <div className="flex items-center justify-center ">        
        <ul>
            <li>
                Sudksa sifra: tip predmeta, jedinsveni broj, godina
            </li>
            <li>
                Kancelarijska sifra: (interna šifra advokatske kancelarije sastoji se iz tipa predmeta, jedinstvenog broja i godine)	
            </li>
            <li>
            	Aktivnosti na predmentu (ročišta, sastanci, napomene, dokumenti ...) hronološki od datuna kreiranja predmeta 
            </li>
            <li>
            	Dokumenti vezani za predmet, attach koji se uvek može download na kompu ili kratak prevue 
            </li>
            <li>
            	Vrednost spora 
            </li>
            <li>
            	Podaci o strankama u predmetu (tužilac, tuženi,vrednost spora, vrsta spora)
            </li>
            <li>
                Troškovnik 
            </li>
            <li>
                Napomene
            </li>
            <li>
            	Korisnike koji su vezani za predmet (Advokat, pripravnici, grupa advokata)
            </li>
            <li>
            	Veza parničnog predmeta sa izvršnim ili drugim, ako je predmet povezan sa nekim prethodnim predmetom ili novi predmet kao posledica prošlog predmeta
            </li>
            <li>
                Tip predmeta (parnični predmeti, izvrišni predmeti, ...). Ovaj podatak nije obavezan, može se dodadi kada se odredi
            </li>
        </ul>
        </div>
    </div>

    );
  };
  
  export default Subjects;