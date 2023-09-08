import './App.css';
import { useState } from 'react';
import _ from 'lodash';

function App() {
    const [objState, setObjState] = useState([
        { breed: 'Labrador', name: 'Blackie', color: 'Black' },
        { breed: 'Golden Retriever', name: 'Brown', color: 'Gold' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    function handleEdit(idx) {
        setEditingIndex(idx);
        setIsModalOpen(true);
    }

    function updateDogValue(key, value) {
        setObjState(prevState => {
            const updatedDogs = [...prevState];
            updatedDogs[editingIndex][key] = value;
            return updatedDogs;
        });
    }

    const modalBackGround = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px'
    };

    /* Lodash */
    const arrOne = [{ id: 20, name: 'alex' }, { id: 30, name: 'alina' }];
    const arrTwo = [{ id: 40, name: 'hello' }, { id: 30, name: 'world' }];

    const symmetricDifference = _.xorBy(arrOne, arrTwo, 'id');


    // Find common ids
    const commonIds = _.intersectionBy(arrOne, arrTwo, 'id').map(item => item.id);

    // Filter objects from arrOne and arrTwo based on common ids
    const matchedFromArrOne = arrOne.filter(item => commonIds.includes(item.id));
    const matchedFromArrTwo = arrTwo.filter(item => commonIds.includes(item.id));

    const combinedMatchedItems = [...matchedFromArrOne, ...matchedFromArrTwo];



    // Matching storageVal with str array
    const str = ['u', 'ec'];
    const arr = [
        { storageVal: 'u', table: ['E', 'F'] },
        { storageVal: 'data', table: ['E', 'F'] },
        { storageVal: 'ec', table: ['E'] }
    ];

    const matchingTables = arr
        .filter(item => str.includes(item.storageVal))
        .map(item => item.table);

    // Flatten an array
    const a = [['E'], ['F']];
    const flattenedArray = _.flatten(a);

    // Merge and Unique
    const t = [['F'], ['G']];
    const mergedUnique = _.union(['E', 'F'], _.flatten(t));

    // Search box
    const [searchTerm, setSearchTerm] = useState('');
    const filteredArray = arrOne.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <pre>{JSON.stringify(objState)}</pre>
            <div>
                {objState.map((dog, index) => (
                    <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <p><strong>Breed:</strong> {dog.breed}</p>
                        <p><strong>Name:</strong> {dog.name}</p>
                        <p><strong>Color:</strong> {dog.color}</p>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div style={modalBackGround}>
                    <div style={modalStyle}>
                        <div>
                            <button onClick={() => { setIsModalOpen(false); setEditingIndex(null); }}>X</button>
                        </div>
                        <div>
                            <label>Breed:</label>
                            <input
                                value={objState[editingIndex].breed}
                                onChange={(e) => updateDogValue('breed', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                value={objState[editingIndex].name}
                                onChange={(e) => updateDogValue('name', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Color:</label>
                            <input
                                value={objState[editingIndex].color}
                                onChange={(e) => updateDogValue('color', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h1>Results:</h1>

                <h2>Symmetric Difference:</h2>
                <p><strong>Given Arrays:</strong> {JSON.stringify(arrOne)} and {JSON.stringify(arrTwo)}</p>
                <p><strong>xorBy:</strong> {JSON.stringify(symmetricDifference)}</p>
                <p><strong>intersectionBy:</strong> {JSON.stringify(combinedMatchedItems)}</p>

                <h2>Matching Tables:</h2>
                <p><strong>Before:</strong> {JSON.stringify(str)} and {JSON.stringify(arr)}</p>
                <p><strong>After:</strong> {JSON.stringify(matchingTables)}</p>

                <h2>Flattened Array:</h2>
                <p><strong>Before:</strong> {JSON.stringify(a)}</p>
                <p><strong>After:</strong> {JSON.stringify(flattenedArray)}</p>

                <h2>Merged and Unique:</h2>
                <p><strong>Before:</strong> {JSON.stringify(['E', 'F'])} and {JSON.stringify(t)}</p>
                <p><strong>After:</strong> {JSON.stringify(mergedUnique)}</p>

                <h2>Search Box:</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    {filteredArray.map(item => (
                        <p key={item.id}>{item.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
