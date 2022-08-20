import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
    tittle: yup.string().required().min(2),
    subtitle: yup.string(),
    candidates: yup.number().min(0).max(5),
    category: yup.number().min(1),
    restriction: yup.number().required(),
    points: yup.number().required().min(0),
    fromDate: yup.date().required(),
    toDate: yup.date().required(),
  })
  .required();

const defaultValues = {
    category: 0,
    // category: '',
    restriction: { value: "1", label: "Ninguna" },
    points: 0,
    fromDate: null,
    toDate: null
};

export const NewVotesPage = () => {
    const { data } = useMasterDataStore();
    const { startSavingMasterVotes } = useMasterVoteStore();

    const { 
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        clearErrors  
    } = useForm({
        defaultValues: {
            points: 0
        },
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    // console.log(parseISO('2012-07-18 15:30:30'))

     const [formValues, setFormValues] = useState({
         fromDate: defaultValues.fromDate,
         toDate: defaultValues.toDate,
     });

    const onSelectChanged = ({value, label}, {name}) => {
        setValue(name, value);
        // setFormValues({
        //     ...formValues,
        //     [name]: value,
        //     'category': label
        // })
        // console.log(errors);
        clearErrors(name);
    }

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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                name="title"
                                {...register("title")}
                                // onChange={event => onInputChange(event, 'name') }
                            />
                            { errors.title && <span className="text-danger">Ingrese el nombre de la votación</span> }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subtitle" className="form-label">Subtitulo: </label>
                            <input
                                placeholder="Ingrese un subtitulo a la votación"
                                className="form-control"
                                name="subtitle"
                                {...register("subtitle")}
                                // onChange={event => onInputChange(event, 'subtitle') }
                            />
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría: *</label>
                                <Controller
                                    control={control}
                                    defaultValue={defaultValues.category}
                                    name="category"
                                    render={({ onChange, value, name, ref }) => (
                                        <Select
                                            inputRef={ref}
                                            classNamePrefix="form-select"
                                            options={data.categories}
                                            {...register('category')}
                                            defaultValue={{ value: 0, label: "-- Seleccione una categoría" }}
                                            // value={data.categories.find(c => c.value === value)}
                                            onChange={ onSelectChanged }l
                                        />

                                    )}
                                />
                                { errors.category && <span className="text-danger">Seleccione una categoría</span> }
                            </div>
                            
                            <div className="col-6">
                                    <label htmlFor="restriction" className="form-label">Restricción por votación: *</label>
                                    <Controller
                                        control={control}
                                        defaultValue={defaultValues.restriction}
                                        name="restriction"
                                        render={({ onChange, value, name, ref }) => (
                                            <Select
                                                inputRef={ref}
                                                classNamePrefix="form-select"
                                                options={data.restrictions}
                                                {...register('restriction')}
                                                defaultValue={defaultValues.restriction}
                                                onChange={ onSelectChanged }
                                            />

                                        )}
                                    />
                            </div>
                            
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                    <label htmlFor="points" className="form-label">Puntos: *</label>
                                    <input
                                        type="number"
                                        className="form-control col-2"
                                        {...register("points")}
                                        // onChange={event => onInputChange(event, 'points') }
                                    />
                                    { errors.points && <span className="text-danger">Seleccione un número >= 0</span> }
                            </div>

                            <div className="col-6">
                                    <label htmlFor="points" className="form-label">Número de candidatos: *</label>
                                    <input
                                        type="number"
                                        className="form-control col-2"
                                        {...register("candidates")}
                                        // onChange={event => onInputChange(event, 'points') }
                                    />
                                    { errors.candidates && <span className="text-danger">Seleccione un rango entre 0 y 5</span> }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="fromDate" className="form-label">Desde:</label>
                                <Controller
                                    control={control}
                                    name='fromDate'
                                    render={({ field }) => (
                                        <DatePicker 
                                            selected={ formValues.fromDate }
                                            {...register('fromDate')}
                                            onChange={ (event) => onDateChanged(event, 'fromDate', field) }
                                            className="form-control"
                                            dateFormat="Pp"
                                            showTimeSelect
                                            locale="es"
                                            timeCaption="Hora"
                                        />
                                        )}
                                />
                                { errors.fromDate && <span className="text-danger">Seleccione una fecha</span> }
                            </div>
                            <div className="col">
                                <label htmlFor="toDate" className="form-label">Hasta:</label>
                                <Controller
                                    control={control}
                                    name='toDate'
                                    render={({ field }) => (
                                        <DatePicker 
                                            selected={ formValues.toDate }
                                            onChange={ (event) => onDateChanged(event, 'toDate', field) }
                                            className="form-control"
                                            dateFormat="Pp"
                                            showTimeSelect
                                            locale="es"
                                            timeCaption="Hora"
                                        />
                                        )}
                                    />
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            className="btn btn-primary mr-1"
                            disabled={isSubmitting}
                        >
                        {isSubmitting && (<span className="spinner-border spinner-border-sm mr-2"></span>)}
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
