const Person = ({ person, removePerson }) => {
    return (
        <div>
            <li className='person'>
                {person.name} 
                {' '}
                {person.number}
                {' '}
                <button onClick={() => removePerson(person.id)}>delete</button>
            </li>
        </div>
    )
}

export default Person