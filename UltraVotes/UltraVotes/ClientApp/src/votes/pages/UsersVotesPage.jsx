import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTable, useGlobalFilter } from 'react-table';

import { VotesMenu } from '../';
import { useMasterVoteStore } from "../../hooks";
import { GlobalFiltering } from '../../ui';

export const UsersVotesPage = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);

  const { getDefaultMasterVote } = useMasterVoteStore();

  useEffect(() => {
    const load = async() => {
       const myMasterVote = await getDefaultMasterVote(id);
       setData(myMasterVote.users);
    }

    load();
 }, [id]);

  const columns = useMemo(
    () => [
      {
        Header: 'Nombres',
        accessor: 'name',
      },
      {
        Header: 'Apellidos',
        accessor: 'lastName',
      },
      {
        Header: 'Departamento',
        accessor: 'departmentId',
      },
      {
        Header: 'Área',
        accessor: 'areaId',
      }
    ],
    []
  )

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
    state,
  } = useTable({ 
    columns, 
    data 
  }, useGlobalFilter)

  const { globalFilter } = state;

  if (!data){
    return <p>loading...</p>
  }

  return (
    <>
      <main className="container">
        <div className="d-flex justify-content-md-center">
          <VotesMenu />
          <section className="card col-8">
                <div className="card-body">
                  <h2>Usuarios de la votación:</h2>

                  <GlobalFiltering 
                    filter={globalFilter} 
                    setFilter={setGlobalFilter} />

                  <div className='p-2'>

                <table {...getTableProps()} 
                  className="table">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps()}
                          // style={{
                          //   background: 'aliceblue',
                          //   color: 'black',
                          //   fontWeight: 'bold',
                          // }}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              // style={{
                              //   padding: '10px',
                              //   border: 'solid 1px gray',
                              //   background: 'papayawhip',
                              // }}
                            >
                              {cell.render('Cell')}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
                  
                </div>

                </div>
          </section>
        </div>
      </main>

    </>
  )
}
