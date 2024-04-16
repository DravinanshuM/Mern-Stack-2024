import React from 'react';
import './Table.css';
import { NavLink } from 'react-router-dom';

// Import base_URL.
import { BASE_URL } from '../../Services/helper.js';
// Import.
import { satatusChangeFunction } from '../../Services/Api.js';
// Import.
import { toast } from "react-hot-toast";
import Paginations from '../Paginations/Paginations.js';

const Table = ({ userData, deleteFunction, userGetAll, handleNext, handlePrev, page, pageCount, setPage }) => {
  console.log("table inside :: ", userData);

  // update Status.
  const updateFunction = async(id, status) => {
    console.log(id, status);
    const res = await satatusChangeFunction(id, status);
    if (res && res.status === 200) {
      userGetAll();
      toast.success("Status Updated", {position: "top-right"});
    } else {
      toast.error("error ");
    }

  }

  return (
    <div className='container-fluid'>
      <div className='row table-responsive'>
        <div className='col-lg-12 col-md-12 col-12'>
          <table className='table table-striped text-center table-hover myNewTable'>
            <thead>
              <tr>
                <th>Id</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Profile</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData && userData.length > 0 ? (
                userData.map((item, index) => (
                  <tr key={index}> 
                    <td>{index + 1 + (page - 1) * 4}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.gender}</td>
                    <td>
                      <div className="dropdown text-white">
                        <button className={`${item.status === "Active" ? "bg-primary": "bg-danger"} btn btn-sm dropdown-toggle text-white`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span className="badge">{item.status}</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="statusDropdown">
                          {["Active", "Inactive"].map(status => (
                            <li key={status} className="dropdown-item" onClick={() => updateFunction(item._id, status)} style={{ cursor: 'pointer' }}>
                              {status}
                            </li>
                          ))}
                        </ul>

                      </div>
                    </td>
                    <td>
                      <img src={`${BASE_URL}/public/uploads/${item.profile}`} alt='error' className='img-fluid myTableImage'/>
                    </td>
                    <td>{item.address}</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fas fa-ellipsis-vertical"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="actionDropdown">
                          <li className='dropdown-item'>
                            <NavLink to={`/profile/${item._id}`} className="text-decoration-none text-dark">
                              <i className="fa-solid fa-eye text-warning"></i> 
                              <span className='mx-2'>View</span>
                            </NavLink>
                          </li>
                          <li className='dropdown-item'>
                            <NavLink to={`/edit/${item._id}`} className="text-decoration-none text-dark">
                              <i className="fa-solid fa-pen-to-square text-success"></i>
                              <span className='mx-2'>Edit</span>
                            </NavLink>
                          </li>
                          <li className='dropdown-item'>
                            <div className='btn btn-sm border-none' onClick={()=>deleteFunction(`${item._id}`)}>
                              <i className="fa-solid fa-trash text-danger"></i> 
                              <span className='mx-2'>Delete</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">There is no data</td>
                </tr>
              )}
            </tbody>
          </table>
          <Paginations handleNext={handleNext} handlePrev={handlePrev} page={page} pageCount={pageCount} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}

export default Table;
