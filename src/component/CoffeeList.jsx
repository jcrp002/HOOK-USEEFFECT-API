import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const CoffeeList = () => {

  const [coffeeList, setCoffeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/coffee/hot');
        setCoffeeList(response.data);
      } catch (error) {
        console.log('Error al recuperar los datos del café: ', error)
      }
    };
    fetchData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const handleReset = () => {
    setCurrentPage(1);
  };

  //Calcular el indice del ultimo elemento en la pagina actual
  const indexOfLastItem = currentPage * itemsPerPage;
  //calcular el indice del primer elemento en la pagina actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //Obtener los elementos que se deben mostrar en la pagina actual
  const currentItems = coffeeList.slice(indexOfFirstItem, indexOfLastItem)
 //Obtener total de paginas que se mostraran
  const totalPages = Math.ceil(coffeeList.length / itemsPerPage);

  return (
    <div className="container my-4">
      <h1 className="text-center text-white mb-4">Coffee List</h1>
      <div className="row">
        {currentItems.map((coffee, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100">
              <img src={coffee.image} className="card-img-top" alt={coffee.title} />
              <div className="card-body">
                <h5 className="card-title">{coffee.title}</h5>
                <p className="card-text">{coffee.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleReset}>Volver al inicio</button>
      </div>
    </div>
  );
}