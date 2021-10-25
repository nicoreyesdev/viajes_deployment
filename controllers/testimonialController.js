import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
    //validar
    const {nombre, correo, mensaje} = req.body;
    const errores = [];
    if (nombre.trim()=== ''){ //trim saca espacios vacios al inicio y final
        errores.push({mensaje: 'El nombre está vacío'})
    }
    if (correo.trim()=== ''){
        errores.push({mensaje: 'El correo está vacío'})
    }
    if (mensaje.trim()=== ''){
        errores.push({mensaje: 'El mensaje está vacío'})
    }

    if(errores.length > 0) {
        // consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        
        //mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //almacenar en db
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales')

        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}