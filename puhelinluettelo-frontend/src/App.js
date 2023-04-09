//Versio 2.17
import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import peopleService from './services/people'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('') 
    const [notification, setNotification] = useState(null)

    //useEffect-hookin avulla haetaan JSON-serverilt� persons data
    useEffect(() => {
        peopleService
          .getAll()
            .then(initialPersons => {
            setPersons(initialPersons)
          })
      }, [])
    console.log('render', persons.length, 'persons')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const person = persons.filter(p => p.name === newName)
        const targetedPerson = person[0]
        const changedPerson = { ...targetedPerson, number: newNumber }

        if (persons.find(person => person.name === newName)) {
            if (window.confirm("Korvataanko olemasassa oleva numero uudella?")) {
                peopleService
                .update(changedPerson.id, changedPerson)
                    .then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== targetedPerson.id ? p : returnedPerson))
                })
                .catch(error => {
                    setNotification(
                      `VIRHE! Yhteystieto '${targetedPerson.name}' on jo poistettu serveriltä`
                    )
                    setTimeout(() => {
                      setNotification(null)
                    }, 6000)
                  })
                setNotification('Yhteystieto päivitetty onnistuneesti!')
                setTimeout(() => {
                  setNotification(null)
                }, 6000)
            }
        }
        else {
            peopleService
            .create(personObject)
            .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification('Yhteystieto lisätty onnistuneesti!')
            setTimeout(() => {
                setNotification(null)
            }, 6000)
            })
            .catch(error => {
                console.log(error.response.data.error)
                setNotification(`VIRHE: ${error.response.data.error}`)
                setTimeout(() => {
                    setNotification(null)
                }, 6000)
            })
        }
    }

    const removePerson = id => {
        const targetedPerson = persons.filter(person => person.id === id)
        const targetName = targetedPerson[0].name
        const personId = targetedPerson[0].id

        console.log(personId)
        if (window.confirm(`Poistetaanko yhteystieto: ${targetName}`)) {
            peopleService
                .removePerson(personId).then(returnedPerson => {
                    setPersons(persons.filter(p => p.id !== personId))
                })
                .catch(error => {
                    setNotification(
                        `Yhteystiedon poistamisessa tapahtui VIRHE!`
                    )
                setTimeout(() => {
                    setNotification(null)
                }, 6000)
                })
            setNotification('Yhteystieto poistettu onnistuneesti!')
            setTimeout(() => {
                setNotification(null)
            }, 6000)
        }
            
      }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notification}/>
            <Filter search={search} handleChange={handleFilterChange} />
            <PersonForm addP={addPerson} newName={newName} hNameC={handleNameChange}
            newNum={newNumber} hNumC={handleNumberChange}/>
            <h2>Numbers</h2>
            <ul>
                <Persons persons={persons} search={search} removePerson={removePerson}/> 
            </ul>
        </div>
    )

}

export default App