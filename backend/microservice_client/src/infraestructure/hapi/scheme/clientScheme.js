import z from "zod";

// Scheme para cliente
const clienteScheme = z.object({
    // Obligar llenar el Correo Electrónico
    email: z.string().email(),
    // Obligar llenar el Nombre
    first_name: z.string(),
    // obligar llenar el Apellido
    last_name: z.string(),
});

// Validar cliente
export function validateClient (input) {
    return clienteScheme.safeParse(input);
}