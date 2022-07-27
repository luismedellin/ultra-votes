// import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMasterDataStore } from "../../hooks";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';

import { addHours, differenceInSeconds, parseISO  } from 'date-fns';


registerLocale( 'es', es );

const schema = yup.object().shape({
    name: yup.string().required(),
    points: yup.number().required().min(0).max(10),
  })
  .required();

export const NewVotesPage = () => {
    const { data } = useMasterDataStore();

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    // console.log(parseISO('2012-07-18 15:30:30'))

    const [formValues, setFormValues] = useState({
        name: '',
        category: 0,
        points: 0,
        start: parseISO('2012-07-18 15:30:30'),
        end: null,
    });

    const onDateChanged = ( event, changing, field ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })

        field.onChange(event);
    }

    const onSubmit = data => console.log(data, {formValues});

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
                            />
                            { errors.name && <span className="text-danger">Ingrese el nombre de la votación</span> }
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría: *</label>
                                <select 
                                    className="form-select"
                                    {...register("category")}
                                    >
                                    <option value="0">-- Seleccione una categoría</option>
                                    {
                                    data.categories.map(({masterVoteCategoryId: id, description: name}) => (
                                        <option key={id} value={id}>{ name }</option>
                                    ))
                                    }
                                </select>
                                { errors.category && <span className="text-danger">Seleccione una categoría</span> }
                            </div>
                            <div className="col-6">
                                <label htmlFor="points" className="form-label">Puntos: *</label>
                                <input
                                    type="number"
                                    className="form-control col-2"
                                    {...register("points")}
                                />
                                { errors.points && <span className="text-danger">Seleccione un rango entre 0 y 10</span> }
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="dateFrom" className="form-label">Desde:</label>
                                <Controller
                                    control={control}
                                    name='dateFrom'
                                    render={({ field }) => (
                                        <DatePicker 
                                            selected={ formValues.start }
                                            onChange={ (event) => onDateChanged(event, 'start', field) }
                                            className="form-control"
                                            dateFormat="Pp"
                                            showTimeSelect
                                            locale="es"
                                            timeCaption="Hora"
                                        />
                                        )}
                                    />
                                { errors.dateFrom && <span className="text-danger">Ingrese una fecha</span> }
                            </div>
                            <div className="col">
                                <label htmlFor="dateTo" className="form-label">Hasta:</label>
                                <Controller
                                    control={control}
                                    name='dateTo'
                                    render={({ field }) => (
                                        <DatePicker 
                                            selected={ formValues.end }
                                            onChange={ (event) => onDateChanged(event, 'end', field) }
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
                        
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </fieldset>
                </form>
                </div>
            </section>
            </div>
        </main>
    </>
  )
}
