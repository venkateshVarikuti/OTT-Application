
import nodemailer from "nodemailer";
import Movie from "../../../database/models/movies"
import User from "../../../database/models/user"



class MovieController{

    async uploadMovie(req: any, res:any){
        console.log(req.body);
        const movie=Movie.create(
            {
                directorName: req.body.directorName,
                singerName: req.body.singerName,
                editorName: req.body.editorName,
                musicDirectorName:req.body.musicDirectorName,
                movieDescription:req.body.movieDescription,
                Lanaguage:req.body.Lanaguage,
                commission:req.body.commission,
                user: req.body.user,
                key: req.body.key
            }
        );
        return movie;
    }

    async getMoviesByDistributorByMe(req: any, res:any){
        const user = await User.findOne({email : req.user.email});
        if(req.params.accepted=="true" && req.params.rejected=="true"){
            const movies = await Movie.find({ user: user._id});
             return movies;
        }else if( req.params.accepted=="true"){
            const movies = await Movie.find({ $and: [
                { user: user._id }, 
                { isAccepted : true }
              ],});
            return movies;
        }else{
            const movies = await Movie.find({ $and: [
                { user: user._id }, 
                { isRejected : true }
              ],});
            return movies;

        }
        
    }

    async getMoviesByDistributor(req: any, res:any){
        if(req.params.accepted=="true" && req.params.rejected=="true"){
            const movies = await Movie.find({ user: req.params.id});
             return movies;
        }else if( req.params.accepted=="true"){
            const movies = await Movie.find({ $and: [
                {user: req.params.id }, 
                { isAccepted : true }
              ],});
            return movies;
        }else{
            const movies = await Movie.find({ $and: [
                { user: req.params.id }, 
                { isRejected : true }
              ],});
            return movies;
       }
    }

    
    async acceptMovie(req: any, res:any){
        try{
            const user = await User.findOne({email : req.user.email});
            console.log(user)
            if(user.role!='superAdmin'){
                throw new Error("only superAdmin can change the Status")
            }
            if(req.params.isAccepted="true"){
                const distributor= User.updateOne(
                    {
                        id : req.params.id
                    },{
                        isAccepted : true
                    }
                )
                return 'Successfully You have Accepted the Movie'
            }
            if(req.paras.isRejected=="true"){
                const distributor= User.updateOne(
                    {
                        id : req.params.id
                    },{
                        isRejected : true
                    }
                )
                return 'You have Rejected the Movie'

            }
            
       
        }catch(err: any){
            throw Error(err.message)

        }
        
    }

    async getAllMovies(req: any, res:any){
        const user = await User.findOne({email : req.user.email});
            console.log(user)
            if(user.role!='superAdmin'){
                throw new Error("only superAdmin can change the Status")
            }
        if(req.params.accepted=="true" && req.params.rejected=="true"){
            const movies = await Movie.find({});
            return movies;
        }
        else if (req.params.accepted=="true"){
            const movies = await Movie.find({isAccepted: true});
            return movies;
            
        }else{
            const movies = await Movie.find({isRejected: true});
            return movies;
        }
        
    }


}
export default new MovieController();

