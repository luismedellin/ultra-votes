import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMasterDataStore } from "../../hooks";


export const NewVotesPage = () => {
    const { data } = useMasterDataStore();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

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
                                {...register("name", { required: true })}
                            />
                            { errors.name && <span className="text-danger">Ingrese el nombre de la votación</span> }
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="category" className="form-label">Categoría</label>
                                <select 
                                    className="form-select"
                                    {...register("category", { required: true })}
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
                            <div className="col-2">
                                <label htmlFor="points" className="form-label">Puntos:</label>
                                <input
                                    type="number"
                                    id="points"
                                    min="0"
                                    max="10"
                                    value="0"
                                    className="form-control" 
                                    {...register("points", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="dateFrom" className="form-label">Desde:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("dateFrom")}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="dateTo" className="form-label">Hasta:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("dateTo")}
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
