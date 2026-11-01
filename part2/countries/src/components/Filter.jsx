const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter">
      find countries <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}
export default Filter