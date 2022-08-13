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
  const [title, setTitle] = useState(null);
  const [addCandidateModal, setAddCandidateModal] = useState(false);
  
  const { getDefaultMasterVote } = useMasterVoteStore();
  const { candidates, selectCandidate } =  useCandidateStore();
  

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
      },
      {
        accessor: 'IsCandidated',
        Header: '',
        Cell: ({ row: { original } }) => (
            
            original.isCandidated && <i className="fas fa-trophy text-warning fs-6 text-center"></i>
        )
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

  const getCandidate = (user) => {
    if(user.isCandidated) {
      return candidates.find((candidate)=> candidate.userId === user.userId);
    }

    return {
      ...user,
      candidateId: 0,
      masterVoteId: +id,
      description: '',
      avatar: '',
      isFinalist: true
    };
  }

  const onOpenCandidate = ({original: user}) => {

    if(masterVote.categoryId === 2) return;

    const chooseCandidate = getCandidate(user);
    console.log(chooseCandidate);
    
    onOpenModal(chooseCandidate);
  }

  const onOpenModal = (candidate) => {
    selectCandidate(candidate);
    setTitle(candidate.fullName)
    setAddCandidateModal(true);
  }

  const onCloseModalViewDetail = () => {
    setAddCandidateModal(false);
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
            masterVote?.categoryId === 1 && <UserCandidates openModal={onOpenModal} />
          }

        </div>
      </main>

      <DetailVoteModal 
        isModalOpen={addCandidateModal} 
        closeModal={onCloseModalViewDetail}
        title={title}>
          <Candidate onCloseModalViewDetail={onCloseModalViewDetail} />
      </DetailVoteModal>

    </>
  )
}
