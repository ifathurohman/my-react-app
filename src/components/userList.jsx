import React, {useState, useEffect, useMemo, useRef} from 'react';
import UserDataService from '../service/userService';
import {useTable} from 'react-table';

const UserList = props => {
  const [user, setUser] = useState([]);
  const [searchName, setSearchName] = useState('');
  const userRef = useRef();

  userRef.current = user;

  useEffect(() => {
    retrieveUser();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    console.log(searchName);
    setSearchName(searchName);
  };

  const retrieveUser = () => {
    UserDataService.getAll()
      .then(response => {
        setUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUser();
  };

  const removeAllUser = () => {
    UserDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    UserDataService.findByName(searchName)
      .then(response => {
        console.log(response);
        setUser(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openUser = rowIndex => {
    const id = userRef.current[rowIndex]._id;
    console.log(id);
    props.history.push('/user/' + id);
  };

  const deleteUser = rowIndex => {
    const id = userRef.current[rowIndex]._id;

    UserDataService.remove(id)
      .then(response => {
        props.history.push('/user');

        let newUser = [...userRef.current];
        newUser.splice(rowIndex, 1);

        setUser(newUser);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: () => <span>No</span>,
        id: 'rowNumber',
        width: 30,
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Email',
        accessor: 'Email',
      },
      {
        Header: 'Username',
        accessor: 'Username',
      },
      {
        Header: 'Password',
        accessor: 'Password',
      },
      {
        Header: 'Image',
        Cell: props => {
          const image = props.row.original.Image;
          return (
            <div>
              <img alt="" src={image} width="40" height="40" />
            </div>
          );
        },
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: props => {
          const rowIdx = props.row.id;
          console.log(rowIdx);
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({
      columns,
      data: user,
    });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.column.id === 'rowNumber'
                          ? i + 1
                          : cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllUser}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default UserList;
