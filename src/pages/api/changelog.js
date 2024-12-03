// src/api/changelog.js - Este es un endpoint independiente

export async function GET() {
  return Response.json({
    entries: [
      {
        version: "1.2.9",
        date: "2024-11-29",
        changes: {
          new: [
            "Agregado historial de cambios (changelog)",
            "Nueva página de administración para el changelog"
          ],
          improved: [
            "Mejorada la interfaz de usuario de las calculadoras",
            "Optimizado el rendimiento general de la aplicación"
          ],
          fixed: [
            "Corregidos problemas de visualización en dispositivos móviles",
            "Solucionados errores en el formato de montos grandes"
          ]
        }
      }
    ]
  });
}

export async function POST({ request }) {
  try {
    const body = await request.json();
    console.log('Received data:', body);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}