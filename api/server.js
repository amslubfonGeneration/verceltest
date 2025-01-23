import fastify  from "fastify"
import fastifyFormbody from "@fastify/formbody"
import fastifyStatic from "@fastify/static"
import fastifyView from "@fastify/view"
import ejs from 'ejs'
import { dirname, join } from "node:path"
import {c, scilab, python, latex} from "../src/action.js"


const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const app = fastify()
app.register(fastifyView,{
    engine: {
        ejs
    }
})
app.register(fastifyStatic, {
    root:join(rootDir,'public')
})
app.register(fastifyFormbody)


export default async function handler(req, res) {

    app.get("/",(req,res)=>{
        return res.redirect('index.html')
    })

    app.get('/python/test', async (req,res) =>{
    return res.view('template/form.ejs',{
            python:"python"
        })
    })
    app.get('/latex/test', async (req,res) =>{
        return res.view('template/form.ejs',{
            latex:"latex"
        })
    })
    app.get('/scilab/test', async (req,res) =>{
        return res.view('template/form.ejs',{
            scilab:"scilab"
        })
    })
    app.get('/c++/test', async (req,res) =>{
        return res.view('template/form.ejs',{
            c:"c++"
        })
    })

    app.post('/python/test', python)
    app.post('/c++/test', c)
    app.post('/scilab/test', scilab)
    app.post('/latex/test', latex)


    app.setErrorHandler((error,req,res) => {
        console.error(error)
        res.statusCode = 500
        return {
            error: error.message  
        }
    })
}
