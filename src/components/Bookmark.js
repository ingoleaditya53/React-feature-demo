import React from 'react';

const Bookmarked = ({ bookmarked }) => {
  return (
    <div>
      <h3>Bookmarked Products</h3>
      <div className="row">
        {bookmarked.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarked;
