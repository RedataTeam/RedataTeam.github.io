
package com.redata.frenzy.model;


public class Usuario {
    int idUsuario;
    Persona persona;
    String nombre;
    String contrasenia;

    public Usuario() {
    }

    public Usuario(int idUsuario, Persona persona, String nombre, String contrasenia) {
        this.idUsuario = idUsuario;
        this.persona = persona;
        this.nombre = nombre;
        this.contrasenia = contrasenia;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }
    
    
}
