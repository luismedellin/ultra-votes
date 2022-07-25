import { Routes, Route, Navigate } from "react-router-dom";
import { VotesPage, NewVotesPage } from "..";

export const VotesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="votaciones/nueva" element={ <NewVotesPage /> } />
        <Route path="*" element={<VotesPage />} />
      </Routes>
    </>
  )
}
