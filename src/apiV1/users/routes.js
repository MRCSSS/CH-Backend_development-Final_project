/* =================================== MODULES =================================== */
import { Router } from "express";
import userController from './controller.js';
import passport from "passport";
import LocalStrategy from "passport-local";
import UsersDAOFactory from './classes/DAOFactory.class.js';
import bcrypt from 'bcrypt';
/* ================================== INSTANCES ================================== */
const controller = new userController();
const userRouter = Router();
const DAO = UsersDAOFactory.get(); 
/* ================================= MIDDLEWARES ================================= */
    /* ----------------------- Passport ------------------------ */
passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await DAO.searchUser(username);
        if (user === null) {
            return done(null, false);
        } else {
            const match = await bcrypt.compare(password, user.password);
            if(!match){ return done(null, false); }
            return done(null, user);
        }
    }
));
passport.serializeUser((user, done)=>{
    done(null, {id:user.id,name:user.name,username:user.username});
});
passport.deserializeUser( async (username, done)=>{
    const user = await usersDao.searchUser(username);
    done(null, user);
});
/* ==================================== ROUTES =================================== */
//     - Register
userRouter.route ('/register')
    .post   (controller.register)
//     - Log In
userRouter.route ('/login')
    .post   ((req, res, next)=>{
            passport.authenticate('local', function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/'); }

                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            })(req, res, next);
        });
//     - Log Out
userRouter.route ('/logout')
    .post   (controller.logout)
//     - User
userRouter.route ('/:id')
    .get    (controller.getUser)
    .put    (controller.updateUser)
    .delete (controller.deleteUser)
//     - All Users
userRouter.route ('/')
    .get    (controller.getAllUsers)
/* =============================== EXPORTED MODULES ============================== */
export default userRouter;