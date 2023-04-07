import Person from './Person'

const Persons = ({ persons, search, removePerson }) => {
    return (
        <>
            <div>
                {persons.filter(keyword => keyword.name.toLowerCase().includes(search)).map(person => (<Person key={person.name} person={person} removePerson={removePerson} />))}
            </div>
        </>)
}

export default Persons