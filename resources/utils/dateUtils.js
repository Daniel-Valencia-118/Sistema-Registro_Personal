export const formatFecha = (fechaString) => {
    if (!fechaString) return '-';

    const parteFecha = fechaString.split('T')[0];
    const partes = parteFecha.split('-');
    
    if (partes.length !== 3) return '-';

    const [anio, mes, dia] = partes;
    const anioCorto = anio.slice(-2);

    return `${dia}/${mes}/${anioCorto}`;
};
