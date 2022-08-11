import { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

const schema = yup.object().shape({
    // message: yup.string().required(),
    points: yup.number().required().min(0),
  })
  .required();

export const Vote = ({vote, candidate}) => {

    const limit = 180;
    const [characters, setCharacters] = useState(0)

    const { 
        register,
        control,
        handleSubmit,
        setValue,
        formState: { isDirty, isValid, isSubmitting, errors },
        clearErrors,
        reset
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit = async(data) => {
        console.log(data);
    }

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>

                        {/* <div className="mb-2">
                            <label htmlFor="message" className="form-label">Mensaje* :</label>
                            <textarea 
                                style={{resize: 'none'}}
                                className="form-control" rows="4"
                                {...register("message")}
                                disabled={candidate.voted}
                                onChange={(({target})=> setCharacters(target.value.length))}
                                maxLength={limit}
                            ></textarea>

                            <div className="text-end mt-1 fw-light">
                                <span>{characters} / {limit}</span>
                            </div>
                        </div> */}
                        
                        {
                            vote.points > 0 &&

                            <div className="col-12 mb-5">
                                <label htmlFor="points" className="form-label">Puntos: *</label>
                                <input
                                    type="number"
                                    disabled={candidate.voted}
                                    className="form-control col-2"
                                    {...register("points")}
                                    defaultValue={candidate.points}
                                    />
                                { errors.points && <span className="text-danger">Seleccione un número >= 0</span> }

                                <div className="text-end mt-1 fw-light">
                                    <span>Puntos disponibles {vote.availablePoints} / {vote.points}</span>
                                </div>
                            </div>
                        }
                        {
                        !candidate.voted && 
                        <div className="d-grid gap-2">
                        <button 
                            className="btn btn-outline-primary btn-lg"
                            disabled={!(isDirty && isValid)}
                            // disabled={isSubmitting}
                            >Enviar</button>
                        </div>
                        }
                        
                    </fieldset>
                </form>

            </div>
        </div>
    )
}