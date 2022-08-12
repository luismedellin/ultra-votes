import { useState } from 'react'
import { useFormik } from 'formik';
import { useMyVotesStore } from '../../hooks';

export const Vote = ({vote, candidate}) => {

    const limit = 180;
    const [characters, setCharacters] = useState(0)

    console.log({vote})

    const { startSavingVote } = useMyVotesStore();

    const formik = useFormik({
        initialValues: {
            points: candidate.points,
            message: candidate.message
        },
        onSubmit: values => {
          const savedVote = {
            ...values,
            masterVoteId: vote.masterVoteId,
            candidateId: candidate.userId,
            userId: 'luiseduardo1218@gmail.com',
            createdBy: 'FORM'
          };

          startSavingVote(savedVote);
          console.log(savedVote);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
      });

    return (
        <div>
            {
                vote.categoryId === 1 && 
                <img
                    style={{backgroundColor: "#FF8200"}} 
                    src={process.env.PUBLIC_URL + '/img/ultra_logo_light.svg'} 
                    height="70px" 
                    width="70px" 
                    alt="logo" />
            }
            
            <div>
                <h3 className="mb-2 text-center">{candidate.fullName}</h3>

                <form onSubmit={formik.handleSubmit}>
                    <fieldset>

                        <div className="mb-2">
                            <label htmlFor="message" className="form-label">Mensaje* :</label>
                            <textarea 
                                style={{resize: 'none'}}
                                className="form-control" rows="4"
                                id="message"
                                name="message"
                                onChange={((e)=> {
                                    setCharacters(e.target.value.length)
                                    formik.handleChange(e);
                                })}
                                value={formik.values.message}
                                disabled={candidate.voted}
                                maxLength={limit}
                            ></textarea>
                            {
                                !candidate.voted && 
                                <div className="text-end mt-1 fw-light">
                                    <span>{characters} / {limit}</span>
                                </div>
                            }
                        </div>
                        
                        {
                            vote.points > 0 &&

                            <div className="col-12 mb-5">
                                <label htmlFor="points" className="form-label">Puntos: *</label>
                                <input
                                    type="number"
                                    disabled={candidate.voted}
                                    className="form-control col-2"
                                    id="points"
                                    name="points"
                                    onChange={formik.handleChange}
                                    value={formik.values.points}
                                    />
                                {
                                    !candidate.voted && 
                                    <div className="text-end mt-1 fw-light">
                                        <span>Puntos disponibles {vote.availablePoints} / {vote.points}</span>
                                    </div>
                                }
                            </div>
                        }
                        {
                        !candidate.voted && 
                        <div className="d-grid gap-2">
                        <button type="submit"
                            className="btn btn-outline-primary btn-lg"
                            disabled={!formik.dirty}
                            >Votar</button>
                        </div>
                        }
                        
                    </fieldset>
                </form>

            </div>
        </div>
    )
}