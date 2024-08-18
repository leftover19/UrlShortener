import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import ShortUrl from './models/shortUrls';
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false}));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urlShortener' , { bufferCommands: false })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.listen(process.env.PORT || 8000 , ()=>{console.log(`Server is running on port ${process.env.PORT}`)});

app.get('/' , async (req:Request, res:Response)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index' , {shortUrls : shortUrls});
})

app.post('/shortUrls' , async (req:Request , res:Response)=>{
    await ShortUrl.create({full : req.body.fullUrl});
    res.redirect('/');
})
app.post('/deleteUrl', async (req: Request, res: Response) => {
    await ShortUrl.deleteOne({ short: req.body.shortUrl })
    .then(() => res.redirect('/'))
  });


app.get('/:shortUrl' , async (req : Request  , res : Response)=>{
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl});
    if(shortUrl == null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})

app.post('/shortUrls')