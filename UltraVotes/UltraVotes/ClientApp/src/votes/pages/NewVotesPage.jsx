import { useState } from "react";
import {useFormik} from "formik";

import { useMasterDataStore, useMasterVoteStore } from "../../hooks";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select'
import DatePicker, { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';

import { addHours, differenceInSeconds, parseISO  } from 'date-fns';

registerLocale( 'es', es );

const schema = yup.object().shape({
    title: yup.string()
            .required('Ingrese un título')
            .min(2, 'Ingrese al menos 2 caracteres'),
    subtitle: yup.string(),
    category: yup.number()
                .min(1, 'Seleccione una categoría'),
    restriction: yup.number().required(),
    points: yup.number()
            .required('Seleccione un número >= 0')
            .min(0, 'Seleccione un número >= 0'),
    candidates: yup.number()
            .required('Ingrese un rango entre 0 y 5')
            .min(0, 'Ingrese un rango entre 0 y 5')
            .max(5, 'Ingrese un rango entre 0 y 5'),
    // fromDate: yup.date().required(),
    // toDate: yup.date().required(),
  })
  .required();

const defaultValues = {
    category: { value: 0, label: "-- Seleccione una categoría" },
    restriction: { value: "1", label: "Ninguna" },
    points: 0,
    candidates:0,
    fromDate: null,
    toDate: null
};

export const NewVotesPage = () => {
    const { data } = useMasterDataStore();
    const { startSavingMasterVotes } = useMasterVoteStore();

    const formik = useFormik({
        initialValues: {
            title: '',
            subtitle: '',
            category: 0,
            restriction: 1,
            points: 0,
            candidates: 0
        },
        validationSchema: schema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const navigate = useNavigate();

    // console.log(parseISO('2012-07-18 15:30:30'))

     const [formValues, setFormValues] = useState({
         fromDate: defaultValues.fromDate,
         toDate: defaultValues.toDate,
     });

    const onDateChanged = ( event, changing, field ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })

        field.onChange(event);
    }

    // const onInputChange = ({target}, name)=> {
    //     setValue(name, target.value);
    //     // setFormValues({...formValues, [name]: target.value})
    // }

    const onSubmit = async(data) => {
        console.log(data);
        // await startSavingMasterVotes( data );
        // navigate(-1);
    }


  return (
    <>
        <main className="container">
            <div className="row justify-content-md-center pt-1 mx-auto">
            <section className="card col-9">
                <div className="card-body pt-1">
                <h2>Registro de nueva votación</h2>
                <form onSubmit={formik.handleSubmit}>
                    <fieldset>
                        <legend className="fw-light">
                            Ingrese la siguiente información para crear una nueva votación.
                        </legend>
                        
                        <div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titulo: *</label>
                            <input 
                                placeholder="Ingrese el nombre de la votación" 
                                className="form-control"
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            {
                                formik.errors.title && formik.touched.title ? (
                                    <span className="text-danger">{formik.errors.title}</span>
                                ) : null
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subtitle" className="form-label">Subtitulo: </label>
                            <input
                                placeholder="Ingrese un subtitulo a la votación"
                                className="form-control"
                                id="subtitle"
                                name="subtitle"
                                onChange={formik.handleChange}
                                value={formik.values.subtitle}
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría: *</label>
                                <Select
                                    classNamePrefix="form-select"
                                    options={ data.categories }
                                    defaultValue={ defaultValues.category }
                                    onChange={ selectedOption => formik.setFieldValue("category", selectedOption.value) }
                                />
                                {
                                    formik.errors.category && formik.touched.category ? (
                                        <span className="text-danger">{formik.errors.category}</span>
                                    ) : null
                                }
                            </div>
                            
                            <div className="col-6">
                                    <label htmlFor="restriction" className="form-label">Restricción por votación: *</label>
                                    <Select
                                        classNamePrefix="form-select"
                                        options={ data.restrictions }
                                        defaultValue={ defaultValues.restriction }
                                        onChange={ selectedOption => formik.setFieldValue("restriction", selectedOption.value) }
                                    />
                            </div>
                            
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                    <label htmlFor="points" className="form-label">Puntos: *</label>
                                    <input
                                        type="number"
                                        className="form-control col-2"
                                        id="points"
                                        name="points"
                                        onChange={formik.handleChange}
                                        value={formik.values.points}
                                    />
                                    {
                                        formik.errors.points && formik.touched.points ? (
                                            <span className="text-danger">{formik.errors.points}</span>
                                        ) : null
                                    }
                            </div>

                            <div className="col-6">
                                    <label htmlFor="points" className="form-label">Número de candidatos: *</label>
                                    <input
                                        type="number"
                                        className="form-control col-2"
                                        id="candidates"
                                        name="candidates"
                                        onChange={formik.handleChange}
                                        value={formik.values.candidates}
                                        // onChange={event => onInputChange(event, 'points') }
                                    />
                                    {
                                        formik.errors.candidates && formik.touched.candidates ? (
                                            <span className="text-danger">{formik.errors.candidates}</span>
                                        ) : null
                                    }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="fromDate" className="form-label">Desde:</label>
                                {/*<Controller*/}
                                {/*    control={control}*/}
                                {/*    name='fromDate'*/}
                                {/*    render={({ field }) => (*/}
                                {/*        <DatePicker */}
                                {/*            selected={ formValues.fromDate }*/}
                                {/*            {...register('fromDate')}*/}
                                {/*            onChange={ (event) => onDateChanged(event, 'fromDate', field) }*/}
                                {/*            className="form-control"*/}
                                {/*            dateFormat="Pp"*/}
                                {/*            showTimeSelect*/}
                                {/*            locale="es"*/}
                                {/*            timeCaption="Hora"*/}
                                {/*        />*/}
                                {/*        )}*/}
                                {/*/>*/}
                                {/*{ errors.fromDate && <span className="text-danger">Seleccione una fecha</span> }*/}
                            </div>
                            <div className="col">
                                <label htmlFor="toDate" className="form-label">Hasta:</label>
                                {/*<Controller*/}
                                {/*    control={control}*/}
                                {/*    name='toDate'*/}
                                {/*    render={({ field }) => (*/}
                                {/*        <DatePicker */}
                                {/*            selected={ formValues.toDate }*/}
                                {/*            onChange={ (event) => onDateChanged(event, 'toDate', field) }*/}
                                {/*            className="form-control"*/}
                                {/*            dateFormat="Pp"*/}
                                {/*            showTimeSelect*/}
                                {/*            locale="es"*/}
                                {/*            timeCaption="Hora"*/}
                                {/*        />*/}
                                {/*        )}*/}
                                {/*    />*/}
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            className="btn btn-primary mr-1"
                            // disabled={isSubmitting}
                        >
                        {/*{isSubmitting && (<span className="spinner-border spinner-border-sm mr-2"></span>)}*/}
                        Guardar</button>

                        </div>
                    </fieldset>
                </form>
                </div>
            </section>
            </div>
        </main>
    </>
  )
}
