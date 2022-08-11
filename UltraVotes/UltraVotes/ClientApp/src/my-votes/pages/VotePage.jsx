import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'

import { useMyVotesStore, useUiStore } from '../../hooks';
import { DetailVoteModal } from '../components/DetailVoteModal';
import { VoteInformation } from '../';
import { useGlobalFilter, useTable } from 'react-table';
import { GlobalFiltering } from '../../ui';
import { Vote } from '../components/Vote';

export const VotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const { user } = useSelector( state => state.auth );
    const { startLoadingMyVotes, isLoading, myVotes, getVote, currentVote } = useMyVotesStore();
    const [vote, setVote] = useState(null);

    const { 
        register,
        control
    } = useForm();

    useEffect(() => {
        // if(user.username){
        //   startLoadingMyVotes(user.username);
        // }
        startLoadingMyVotes('luiseduardo1218@gmail.com');
    }, [id, user])

    useEffect(() => {
        const load = async() => {
        
            // const myVote = await getVote(id);
            // setVote(myVote);
            await getVote(id, 'luiseduardo1218@gmail.com');
        }
        
        if(myVotes.length){
            load();
        }
     }, [myVotes])

     useEffect(() => {
        setVote(currentVote);
        // debugger;
        if(currentVote?.candidatesToVote){
            console.log(currentVote.candidatesToVote)
            setData(currentVote.candidatesToVote);
        }
     }, [currentVote])


    const onSelectChanged = (idVotacion) => {
        navigate(`../mis-votaciones/votar/${idVotacion}`)
    }

    const columns = useMemo(
        () => [
          {
            Header: 'Nombres',
            accessor: 'fullName',
          },
          {
            Header: 'Área',
            accessor: 'areaId',
          },
          {
            accessor: 'voted',
            Header: '',
            Cell: ({ row: { original } }) => (
                original.voted && <i className="fas fa-trophy text-warning fs-6 text-center"></i>
            )
           },
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
        data,
      }, useGlobalFilter);

    const { globalFilter } = state;

    const { openModal } = useUiStore();
    const { isModalOpen, closeModal } = useUiStore();
    const [voteInformationOpen, setVoteInformationOpen] = useState(false);
    const [addCandidateModal, setAddCandidateModal] = useState(false);
    const [candidate, setCandidate] = useState({});

    const onViewDetail = () => {
        // openModal();
        setVoteInformationOpen(true);
    }

    const onCloseModalViewDetail = () => {
        // openModal();
        setVoteInformationOpen(false);
        setAddCandidateModal(false);
    }

    const onOpenVote = ({original: candidate}) => {
        setAddCandidateModal(true);
        setCandidate(candidate);

    }

    if(!vote){
        return <p>Loading...</p>
    }

    return (
        <>
        <main id="LoginPage" 
            className="container mx-auto border row justify-content-md-center animate__animated animate__fadeIn" 
            style={{minHeight: '60vh'}}>

        <div className="col col-md-4 p-5 d-none d-md-block">
            <VoteInformation vote={{...vote}} />
        </div>

        <div className="col col-md-5 p-2">

            <div className="mb-2">
                <Controller
                    control={control}
                    name="vote"
                    defaultValue={'0'}
                    render={({ ref }) => (
                        <Select
                            inputRef={ref}
                            classNamePrefix="form-select"
                            options={myVotes}
                            {...register('vote')}
                            defaultValue={{ value: vote.masterVoteId, label: vote.title }}
                            onChange={ ({value}) => onSelectChanged(value)  }l
                        />
                    )}
                />
            </div>

            <div className="mb-2">
            {/* <div className="d-lg-none d-md-none d-xxl-none mb-2"> */}
            {/* <div className=""> */}
                <button 
                    className="btn btn-outline-primary"
                    onClick={ onViewDetail }
                    >Ver información</button>
            </div>

            <div className="mb-2">
                <GlobalFiltering 
                    filter={globalFilter} 
                    setFilter={setGlobalFilter}
                    placeholder="Busque algun candidato"
                    />
            </div>

            <div className="mb-2 text-end">
                <span>Candidatos: { vote?.candidatesToVote.length }</span>
            </div>

            <div>

                <table {...getTableProps()} 
                  className="table table-striped border candidates">
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
                  {rows.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} onClick={() => onOpenVote(row)} >
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
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
        
                        {/* <tr {...row.getRowProps()} onClick={() => console.log(row.original)} > */}

        <DetailVoteModal isModalOpen={voteInformationOpen} closeModal={onCloseModalViewDetail}>
            <VoteInformation vote={{...vote}} />
        </DetailVoteModal>

        <DetailVoteModal isModalOpen={addCandidateModal} closeModal={onCloseModalViewDetail} title={vote.title}>
            <Vote vote={{...vote}} candidate={{...candidate}} />
        </DetailVoteModal>;

        </main>
        </>
    )
}
