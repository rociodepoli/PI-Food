const validatePost= (req, res, next)=>{    //esta funcion validadora sirve para 
    const{name, summary} = req.body;        // parametros obligatorios
    if(!name) return res.status(400).json({error:'Missing name'});
    if(!summary) return res.status(400).json({error:'Missing summary'});
    next()
}

const validateQuery= (req, res, next)=>{
    const {name}= req.query;
    if(!name) return res.status(400).json({error: 'No name inserted'});
    next()
}

// const validateParams= (req, res, next)=>{
//     const {id}= req.params;
//     if(!id) return res.status(400).json({error: 'No id inserted'});
//     next()
// }

module.exports= {validateQuery, validatePost}