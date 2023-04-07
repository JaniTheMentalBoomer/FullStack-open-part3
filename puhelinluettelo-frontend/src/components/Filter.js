const Filter = ({ search, handleChange }) => {
    return (
        <div>
            filter shown with <input value={search} onChange={handleChange} />
        </div>)
}

export default Filter