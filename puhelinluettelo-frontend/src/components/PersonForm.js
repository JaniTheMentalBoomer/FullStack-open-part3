const PersonForm = ({ addP, newName, hNameC, newNum, hNumC }) => {
    return (
        <form onSubmit={addP}>
            <h1>add a new</h1>
            <div> name: <input value={newName} onChange={hNameC} /></div>
            <div>number: <input value={newNum} onChange={hNumC} /></div>
            <div><button type="submit">add</button></div>
        </form>)
    
}

export default PersonForm