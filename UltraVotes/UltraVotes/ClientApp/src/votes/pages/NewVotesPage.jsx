import { useState, useEffect } from "react";
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
    name: yup.string().required(),
    category: yup.number().min(1),
    points: yup.number().required(),
  })
  .required();

const defaultValues = {
    category: 0,
    // category: '',
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

    const onInputChange = ({target}, name)=> {
        setValue(name, target.value);
        // setFormValues({...formValues, [name]: target.value})
    }

    const onSubmit = async(data) => {
        await startSavingMasterVotes( data );
        navigate(-1);
    }


  return (
    <>
        <main className="container">
            <div className="row justify-content-md-center pt-3">
            <section className="card col-8">
                <div className="card-body">
                <h2>Registro de nueva votación</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>
                            Ingrese la siguiente información para crear una nueva votación.
                        </legend>
                        
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre: *</label>
                            <input 
                                placeholder="Ingrese el nombre de la votación" 
                                className="form-control"
                                name="name"
                                {...register("name")}
                                // onChange={event => onInputChange(event, 'name') }
                            />
                            { errors.name && <span className="text-danger">Ingrese el nombre de la votación</span> }
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
                                <label htmlFor="points" className="form-label">Puntos: *</label>
                                <input
                                    type="number"
                                    className="form-control col-2"
                                    {...register("points")}
                                    // onChange={event => onInputChange(event, 'points') }
                                />
                                { errors.points && <span className="text-danger">Seleccione un rango entre 0 y 10</span> }
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
                                            {...register('category')}
                                            onChange={ (event) => onDateChanged(event, 'fromDate', field) }
                                            className="form-control"
                                            dateFormat="Pp"
                                            showTimeSelect
                                            locale="es"
                                            timeCaption="Hora"
                                        />
                                        )}
                                    />
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
                    </fieldset>
                </form>
                </div>
            </section>
            </div>
        </main>
    </>
  )
}
