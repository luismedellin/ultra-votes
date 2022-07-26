

export const NewVotesPage = () => {
  return (
    <>
        <main className="container">
            <div className="row justify-content-md-center pt-3">
            <section className="card col-8">
                <div className="card-body">
                <h2>Registro de nueva votación</h2>
                <form>
                    <fieldset>
                        <legend>
                            Ingrese todos los campos a continuación para registrar una nueva votación.
                        </legend>
                        
                        <div className="mb-3">
                            <label for="disabledTextInput" className="form-label">Nombre:</label>
                            <input type="text" id="disabledTextInput" className="form-control" placeholder="Ingrese el nombre de la votación" />
                        </div>

                        <div className="row mb-3">
                            <div className="col-6">
                                <label for="disabledTextInput" className="form-label">Categoría</label>
                                <select id="disabledSelect" className="form-select">
                                    <option>-- Seleccione una categoría</option>
                                    <option>Compañía</option>
                                    <option>Departamento</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <label for="points" className="form-label">Puntos:</label>
                                <input type="number" id="points" min="0" max="10" className="form-control" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label for="dateFrom" className="form-label">Desde:</label>
                                <input type="date" id="dateFrom" className="form-control" />
                            </div>
                            <div className="col">
                                <label for="dateTo" className="form-label">Hasta:</label>
                                <input type="date" id="dateTo" className="form-control" />
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
