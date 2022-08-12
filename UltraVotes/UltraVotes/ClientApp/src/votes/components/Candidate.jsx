import { useCandidateStore } from "../../hooks";

export const Candidate = ({candidate}) => {

    const { onAddingCandidate } =  useCandidateStore();
    
    const onSaveCandidate = () => {

        const currentCandidate = {
            ...candidate,
            candidateId: 0,
            avatar: ''
        }
        
        onAddingCandidate(currentCandidate);
    }

    return (
        <div>
            <div className="mb-3">
                <div>{candidate.departmentId}</div>
                <div>{candidate.areaId}</div>
            </div>

            <hr/>

            <div className="mb-3 text-center d-flex">
                {
                    !candidate.avatar && 
                    <>
                        <i className="fas fa-user-circle fa-4x"></i>
                        <button className="btn btn-link">Actualizar foto</button>
                    </>
                }
                
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">Descripción :</label>
                <textarea 
                    style={{resize: 'none'}}
                    className="form-control" rows="2"
                    id="description"
                    name="description"
                    onChange={((e)=> {
                        console.log(e.target.value)
                    })}
                    value={candidate.description}
                ></textarea>
                <div className="fw-light text-end">
                    <span>Texto alternativo para la votación final</span>
                </div>
            </div>

            <div className="d-flex">
                <button 
                    className="btn btn-primary"
                    onClick={ onSaveCandidate }
                    >Guardar</button>
            </div>

        </div>
    )
}
