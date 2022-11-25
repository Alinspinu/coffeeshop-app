const Produs = require('./models/produs');
const Categorie = require('./models/categorie');
const Conamda = require('./models/order')
const {produsSchema, catSchema, comandaSchema} = require('./schema.js')
const ExpressError = require('./utilities/expressError')




module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Trebuie sa fii logat')
        return res.redirect('user/login');
    }
    next();
}


module.exports.validateProdus = (req, res, next) => {
    const {error} = produsSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
};


module.exports.validateComanda = (req, res, next) => {
    const {error} = comandaSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
};

module.exports.validateCat = (req, res, next) => {
    const {error} = catSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
};

module.exports.isAdmin = (req, res, next) => {
    if(!req.user || req.user.admin === 0){
    req.flash('error', 'Acțiune neautorizată! Trebuie să fii admin!')
            return res.redirect('/meniu')
        }
        next()
}
















// VECHIUL ADMIN :)
// module.exports.isAdmin = (req, res, next) => {
//     if(!req.session.admin_id) {
//         req.flash('error', 'Not Today')
//         return res.redirect('/meniu')
//     }
//     next()
// } 