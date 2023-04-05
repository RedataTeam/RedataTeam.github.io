
package com.redata.frenzy.model;


public class Evento {
    int idEvento;
    String nombre;
    String ubicacion;
    String fecha;
    String horaInicio;
    String horaTermino;
    String motivo;
    String descripcion;
    double costo;
    String fotografia;
    String privacidad;

    public Evento() {
    }

    public Evento(int idEvento, String nombre, String ubicacion, String fecha, String horaInicio, String horaTermino, String motivo, String descripcion, double costo, String fotografia, String privacidad) {
        this.idEvento = idEvento;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaTermino = horaTermino;
        this.motivo = motivo;
        this.descripcion = descripcion;
        this.costo = costo;
        this.fotografia = fotografia;
        this.privacidad = privacidad;
    }

    public int getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(int idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraTermino() {
        return horaTermino;
    }

    public void setHoraTermino(String horaTermino) {
        this.horaTermino = horaTermino;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getCosto() {
        return costo;
    }

    public void setCosto(double costo) {
        this.costo = costo;
    }

    public String getFotografia() {
        return fotografia;
    }

    public void setFotografia(String fotografia) {
        this.fotografia = fotografia;
    }

    public String getPrivacidad() {
        return privacidad;
    }

    public void setPrivacidad(String privacidad) {
        this.privacidad = privacidad;
    }
    
    
}
