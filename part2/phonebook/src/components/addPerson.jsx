const addPerson = event => {
    event.preventDefault();
    const PersonObject = {
        name: event.target.name.value,
        number: event.target.number.value,
    };
    axios.post('http://localhost:3001/persons', PersonObject)
        .then(response => {
            console.log('Person added:', response.data);
        })
        .catch(error => {
            console.error('Error adding person:', error);
        });
    return PersonObject;
}