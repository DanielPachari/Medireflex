import React, { useState } from 'react'
import Uno from '../images/1.jpg'
import Dos from '../images/2.jpg'
import Tres from '../images/3.jpg'
import '../App.css';


import { app, auth } from '../credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
// eslint-disable-next-line no-unused-vars
const authInstance = getAuth(app);

const Login = () => {
    const [registrando, setRegistrando] = useState(false)

    const handlerSubmit = async(e)=>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;

        if(registrando){
            await createUserWithEmailAndPassword(auth, correo, contraseña)
        }
        else{
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={Uno} alt="" className="tamaño-imagen img-fluid" />
                </div>
                <div className="carousel-item">
                  <img src={Dos} alt="" className="tamaño-imagen img-fluid" />
                </div>
                <div className="carousel-item">
                  <img src={Tres} alt="" className="tamaño-imagen img-fluid" />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="text-center">
              <h1 className="mb-4">{registrando ? "Regístrate" : "Inicia sesión"}</h1>
              <form className="card card-body" onSubmit={handlerSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Correo electrónico"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    id="password"
                    required
                  />
                </div>
  
                <button type="submit" className="btn btn-primary btn-block">
                  {registrando ? "Regístrate" : "Inicia sesión"}
                </button>
              </form>
  
              <div className="form-group mt-3">
                <button
                  className="btn btn-secondary btn-block"
                  onClick={() => setRegistrando(!registrando)}
                >
                  {registrando
                    ? "¿Ya tienes cuenta? Inicia sesión"
                    : "¿No tienes cuenta? Regístrate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Login
