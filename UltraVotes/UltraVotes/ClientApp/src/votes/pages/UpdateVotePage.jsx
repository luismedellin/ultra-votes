import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addHours, differenceInSeconds, parseISO  } from 'date-fns';

import es from 'date-fns/locale/es';

import Select from 'react-select'
import * as yup from 'yup';
import { useMasterDataStore, useMasterVoteStore } from "../../hooks";

registerLocale( 'es', es );

const schema = yup.object().shape({
    name: yup.string().required(),
    candidates: yup.number().min(0).max(5),
    points: yup.number().required().min(0),
  })
  .required();

export const UpdateVotePage = () => {
  const { id } = useParams();
  const { data } = useMasterDataStore();

  const { getDefaultMasterVote, startSavingMasterVotes } = useMasterVoteStore();
  const [masterVote, setMasterVote] = useState(null);

  const [formValues, setFormValues] = useState({
      fromDate: new Date(),
      toDate: new Date(),
  });  

  const { 
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
    reset
} = useForm({
    resolver: yupResolver(schema),
});

  useEffect(() => {
     const load = async() => {
        const myMasterVote = await getDefaultMasterVote(id);
        setMasterVote(myMasterVote);
        setFormValues({
          fromDate: parseISO(myMasterVote.fromDate),
          toDate: parseISO(myMasterVote.toDate)
        })
     }

     load();
  }, [id])

  useEffect(() => {
      reset(masterVote);
  }, [masterVote]);

  const onDateChanged = ( event, changing, field ) => {
    setFormValues({
        ...formValues,
        [changing]: event
    })

    field.onChange(event);
}

  const onSelectChanged = (value, label, propId, name) => {
    setValue(propId, value);
    setValue(name, label);
    clearErrors(name);
  }

  const onSubmit = async(data) => {
    await startSavingMasterVotes( data );
  }
  
  
  if (!masterVote){
    return <p>loading...</p>
  }

  return (
    <main className="container">
            <div className="row justify-content-md-center pt-3">
            <section className="card col-8">
                <div className="card-body">
                <h2>Actualización de votación:</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>
                            Actualice la información de la votación.
                        </legend>
                        
                        <div className="row mb-3">
                          <div className="col-9">
                              <label htmlFor="name" className="form-label">Nombre: *</label>
                              <input 
                                  placeholder="Ingrese el nombre de la votación" 
                                  className="form-control"
                                  name="name"
                                  {...register("name")}
                              />
                              { errors.name && <span className="text-danger">Ingrese el nombre de la votación</span> }
                          </div>

                          <div className="col-3">
                            <span className="badge bg-success">{ masterVote.status }</span>
                          </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría: *</label>
                                <Controller
                                    control={control}
                                    defaultValue={masterVote.masterVoteCategoryId}
                                    name="category"
                                    render={({ onChange, value, name, ref }) => (
                                        <Select
                                            inputRef={ref}
                                            classNamePrefix="form-select"
                                            options={data.categories}
                                            {...register('category')}
                                            defaultValue={{ value: masterVote.masterVoteCategoryId, label: masterVote.category }}
                                            onChange={ ({value, label}, {name}) => onSelectChanged(value, label, "masterVoteCategoryId", name)  }l
                                        />

                                    )}
                                />
                                { errors.category && <span className="text-danger">Seleccione una categoría</span> }
                            </div>
                            
                            <div className="col-6">
                                    <label htmlFor="restriction" className="form-label">Restricción por votación: *</label>
                                    <Controller
                                        control={control}
                                        defaultValue={masterVote.masterVoteRestrictionId}
                                        name="restriction"
                                        render={({ onChange, value, name, ref }) => (
                                            <Select
                                                inputRef={ref}
                                                classNamePrefix="form-select"
                                                options={data.restrictions}
                                                {...register('restriction')}
                                                defaultValue={{ value: masterVote.masterVoteRestrictionId, label: masterVote.restriction }}
                                                onChange={ ({value, label}, {name}) => onSelectChanged(value, label, "masterVoteRestrictionId", name) }l
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
                                    />
                                    { errors.points && <span className="text-danger">Seleccione un número >= 0</span> }
                            </div>

                            <div className="col-6">
                                    <label htmlFor="points" className="form-label">Número de candidatos: *</label>
                                    <input
                                        type="number"
                                        className="form-control col-2"
                                        {...register("candidates")}
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
  )
}
