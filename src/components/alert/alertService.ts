import Swal from "sweetalert2";

type AlertConfig = {
  title: string;
  icon: "success" | "error" | "warning" | "info";
  timer?: number;
  showConfirmButton?: boolean;
};

export function AlertSweet(num: number, dato?: string, id?: string) {
  const messages: Record<number, AlertConfig> = {
    1: { title: "¡Se creó correctamente!", icon: "success", timer: 2500, showConfirmButton: false },
    2: { title: `Hay Campos Obligatorios ${dato}`, icon: "warning", timer: 2000, showConfirmButton: true },
    3: { title: dato || "Error", icon: "error", showConfirmButton: true },
    4: { title: `Has iniciado sesión correctamente${dato ? `, ${dato}` : ""}`, icon: "success", timer: 2000, showConfirmButton: false },
    5: { title: "Las credenciales no son correctas", icon: "error", timer: 6000, showConfirmButton: true },
    6: { title: dato || "Error", icon: "error", timer: 6000, showConfirmButton: true },
    7: { title: "¡Se modificó correctamente!", icon: "success", timer: 6000, showConfirmButton: false },
    8: { title: `Se envió un email a ${dato}`, icon: "success", timer: 6000, showConfirmButton: false },
    9: { title: "¡Se ha registrado correctamente!", icon: "success", timer: 4000, showConfirmButton: false },
    10: { title: `Las contraseñas no son iguales - Debe tener al menos una minúscula, una mayúscula, un número, un caracter especial y mínimo 8 dígitos`, icon: "error", showConfirmButton: true },
    11: { title: "La persona ya se encuentra registrada", icon: "error", showConfirmButton: true },
    12: { title: "Su sesión ha expirado, por favor vuelva a ingresar", icon: "warning", timer: 6000, showConfirmButton: false },
    13: { title: "Error del servidor", icon: "error", showConfirmButton: true },
    14: { title: "¡Se Actualizó correctamente!", icon: "success", timer: 2500, showConfirmButton: false },
    15: { title: `¡Se creó correctamente! ID de búsqueda: ${id}`, icon: "success", timer: 5000, showConfirmButton: false },
    16: { title: "La persona debe ser mayor de edad", icon: "warning", timer: 3000, showConfirmButton: false },
  };

  const config = messages[num];
  if (config) {
    Swal.fire(config);
  } else {
    console.warn("Número de alerta no definido:", num);
  }
}
