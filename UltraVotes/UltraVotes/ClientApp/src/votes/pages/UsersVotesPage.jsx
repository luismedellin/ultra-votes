import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTable, useGlobalFilter } from 'react-table';

import { VotesMenu, UserCandidates, Candidate } from '../';
import { useMasterVoteStore, useCandidateStore } from "../../hooks";
import { DetailVoteModal } from '../../my-votes';
import { GlobalFiltering } from '../../ui';

export const UsersVotesPage = () => {

  const { id } = useParams();

  const [masterVote, setMasterVote] = useState(null);
  const [data, setData] = useState([]);
  
  const { getDefaultMasterVote } = useMasterVoteStore();
  const { selectCandidate } =  useCandidateStore();
  

  useEffect(() => {
    const load = async() => {
       const myMasterVote = await getDefaultMasterVote(id);
       setMasterVote(myMasterVote);
    }

    load();
  }, []);

  useEffect(() => {
    if(masterVote?.users){
      setData(masterVote.users);
    }
  }, [masterVote]);

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

  const onUpdateUsers = ()=>{
    console.log('Update users');
  }

  const onOpenCandidate = ({original: user}) => {
    const chooseCandidate = {
      ...user,
      candidateId: 0,
      masterVoteId: +id,
      description: '',
      avatar: '',
      isFinalist: true
    };
    
    selectCandidate(chooseCandidate);
  }

  if (!data){
    return <p>loading...</p>
  }

  return (
    <>
      <main className="container">
        <div className="admin-votes">
          <VotesMenu />
          <section className="card me-2">
                <div className="card-body">
                  <h2>Usuarios de la votación:</h2>

                  <div className="mb-2">
                    <button 
                        className="btn btn-outline-primary"
                        onClick={ onUpdateUsers }
                        >Actualizar usuarios</button>
                  </div>
                  <hr />
                  <div className="mb-2">
                    <GlobalFiltering 
                      filter={globalFilter} 
                      placeholder="Buscar un usuario"
                      setFilter={setGlobalFilter} />
                  </div>

                  <div className='p-2'>

                <table {...getTableProps()} 
                  className="table table-striped border select-item-row">
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
                      <tr {...row.getRowProps()} onClick={() => onOpenCandidate(row)}>
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
                  
          {
            masterVote?.categoryId === 1 && (
              <>
                <UserCandidates />
                <Candidate />
              </>
            )
          }

        </div>
      </main>

    </>
  )
}
