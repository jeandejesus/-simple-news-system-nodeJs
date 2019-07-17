module.exports.formulario_inclusao_noticia = function(app,req,res){
    res.render('admin/form_add_noticia', { validacao : {}, noticia : {} });
}

module.exports.noticias_salvar =  function(app,req,res){

    var noticia = req.body;
    console.log(noticia);
    req.assert('titulo','titulo requerido').notEmpty();
    req.assert('resumo','resumo requerido').notEmpty();
    var erros = req.validationErrors();
    
    if(erros){
        console.log(erros)
        res.render("admin/form_add_noticia", {validacao : erros});	
        return;
    }

    var connection = app.config.dbConnection();
    var NoticiasModel = new app.app.models.NoticiasDAO(connection);

    NoticiasModel.salvarNoticia(noticia , function(error, result){
        res.redirect('/noticias');
    });	
    
}