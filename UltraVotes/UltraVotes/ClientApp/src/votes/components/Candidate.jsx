import { useRef, useState } from 'react';
import { useFormik } from 'formik';

import { useCandidateStore } from "../../hooks";

export const Candidate = () => {
    const { currentCandidate: candidate, onSavingCandidate } =  useCandidateStore();
    
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInput = useRef(null);

    const formik = useFormik({
        initialValues: {
            avatar: candidate?.avatar  ?? "",
            description: candidate?.description ?? ""
        },
        onSubmit: values => {
            const savedCandidate = {
                ...candidate,
                ...values
            };
            // console.log(values);
            // console.log(savedCandidate);
            onSavingCandidate(savedCandidate);
        },
      });
      
      const uploadPhoto = (e) => { 
        formik.setFieldValue("avatar", e.currentTarget.files[0].name);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                
                formik.setFieldValue('file', fileReader);
                setAvatarPreview(fileReader.result);
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <div>{candidate?.departmentId}</div>
                <div>{candidate?.areaId}</div>
            </div>

            <hr/>

            <div className="mb-3 text-center d-flex">

                <input id="file" name="file" type="file" className="d-none" 
                    accept="image/*"
                    onChange={ uploadPhoto } 
                    ref={ fileInput }
                    />
                {
                    avatarPreview 
                        ? <img src={avatarPreview} width="50px" alt="avatar" />
                        : <i className="fas fa-user-circle fa-4x"></i>
                        
                }
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={ () => fileInput.current.click() }
                    >
                    Actualizar foto</button>
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">Descripción :</label>
                <textarea 
                    style={{resize: 'none'}}
                    className="form-control" rows="2"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                ></textarea>
                <div className="fw-light text-end">
                    <span>Texto alternativo para la votación final</span>
                </div>
            </div>

            <div className="d-flex">
                <button 
                    type="submit"
                    className="btn btn-primary"
                    >Guardar</button>
            </div>

        </form>
    )
}
