import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import { Login } from "@/components/login/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import IncidentesReportes from "@/pages/incidentes_reportes/incidentes_reportes";
import Inspecciones from "@/pages/inspecciones/inspeccion";
import EPPCapacitacion from "@/pages/epp_capacitaciones/epp_capacitacion";
import Documentacion from "@/pages/documentos_normas/documentacion";
import Reportes from "@/pages/reportes/reportes";
import ObrasPage from "@/pages/mis_obras/mis_obras";


export function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />
        <Route
        path="/incidentes"
        element={
          <AppLayout>
            <IncidentesReportes />
          </AppLayout>
        }
      />
        <Route
        path="/inspecciones"
        element={
          <AppLayout>
            <Inspecciones />
          </AppLayout>
        }
      />
          <Route
        path="/epp-capacitacion"
        element={
          <AppLayout>
            <EPPCapacitacion />
          </AppLayout>
        }
      />
        <Route
        path="/documentos"
        element={
          <AppLayout>
            <Documentacion/>
          </AppLayout>
        }
      />
       <Route
        path="/obras"
        element={
          <AppLayout>
            <ObrasPage/>
          </AppLayout>
        }
      />
       <Route
        path="/reportes"
        element={
          <AppLayout>
            <Reportes/>
          </AppLayout>
        }
      />
    
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
