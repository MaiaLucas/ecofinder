import React, { useState, useEffect } from "react";
import lotus from "../assets/img/lotus.png";
import { Redirect } from "react-router-dom";
import API from "../API";

export default function Login() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card card-login">
        <h4>
          Login
        </h4>
        <img src={lotus} className="img-fluid" alt="" />
        <form className="col-sm-12">
          <div className="form-group">
            <label for="login-email">Email</label>
            <input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Digite seu Email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="login-password">Senha</label>
            <input type="password" className="form-control" id="login-password" placeholder="Digite sua Senha" />
            <small className="d-flex justify-content-end">
              <a href="/" className="d-flex text-muted align-self-end">Ainda não tem uma conta? Cadastre-se aqui</a>
            </small>
          </div>
          <button type="submit" className="w-100 btn-login mt-4">Continuar</button>
        </form>
      </div>
    </div>
  )
}