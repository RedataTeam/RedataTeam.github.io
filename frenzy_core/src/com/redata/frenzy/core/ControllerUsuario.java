/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.frenzy.core;

import com.redata.frenzy.db.ConexionMySQL;
import com.redata.frenzy.model.Persona;
import com.redata.frenzy.model.Usuario;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author GTO
 */
public class ControllerUsuario {
    public int insert(Usuario u) throws SQLException{
        String query = "{call insertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " //Datos personales
                + "?, ?, " //Datos de usuario
                + "?, ?)}"; //Datos de retorno
        
        int idPersonaGenerado = -1;
        int idUsuarioGenerado = -1;
        
        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto invocaremos al StoredProcedure:
        //Creamos un callableStatement pasandole la llamada 
        //Para ejecutar instrucciones NO SQL
        CallableStatement cstmt = conn.prepareCall(query);
        
        //Establecemos los valores de los parámetros de los datos personales 
        //en el orden en que los pide el procedimiento almacenado, 
        //comenzando en 1:
        //Establecemos los datos en el mismo orden que tenemos en la base de datos
        cstmt.setString(1, u.getPersona().getNombre());
        cstmt.setString(2, u.getPersona().getPrimerApellido());
        cstmt.setString(3, u.getPersona().getSegundoApellido());
        cstmt.setString(4, u.getPersona().getFechaNacimiento());
        cstmt.setString(5, u.getPersona().getIdentificacion());
        cstmt.setString(6, u.getPersona().getTelMovil());
        cstmt.setString(7, u.getPersona().getCorreo());
        cstmt.setString(8, u.getPersona().getCiudad());
        cstmt.setString(9, u.getPersona().getEstado());
        cstmt.setString(10, u.getPersona().getFotografia());
        cstmt.setString(11, u.getNombre());
        cstmt.setString(12, u.getContrasenia());
        
        //Registramos los parámetros de salida:
        //Types se importa de sql y se le define el tipo de datos de sql
        cstmt.registerOutParameter(13, Types.INTEGER);
        cstmt.registerOutParameter(14, Types.INTEGER);
        
        cstmt.executeUpdate();

        //Recuperamos los ID's generados:
        idPersonaGenerado = cstmt.getInt(13);
        idUsuarioGenerado = cstmt.getInt(14);

        u.setIdUsuario(idUsuarioGenerado);
        u.getPersona().setIdPersona(idPersonaGenerado);
                
        cstmt.close();
        connMySQL.close();

        //Devolvemos el ID de Usuario generado:
        return idUsuarioGenerado;
    }
    
    public void update(Usuario u) throws SQLException{
        String query = "{call actualizarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " //Datos de ls persona
                + "?, ?,"   //Datos del usuario
                + "?, ?)}"; //Datos de retorno
        
        
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(query);
        
        cstmt.setString(1, u.getPersona().getNombre());
        cstmt.setString(2, u.getPersona().getPrimerApellido());
        cstmt.setString(3, u.getPersona().getSegundoApellido());
        cstmt.setString(4, u.getPersona().getFechaNacimiento());
        cstmt.setString(5, u.getPersona().getIdentificacion());
        cstmt.setString(6, u.getPersona().getTelMovil());
        cstmt.setString(7, u.getPersona().getCorreo());
        cstmt.setString(8, u.getPersona().getCiudad());
        cstmt.setString(9, u.getPersona().getEstado());
        cstmt.setString(10, u.getPersona().getFotografia());
        cstmt.setString(11, u.getNombre());
        cstmt.setString(12, u.getContrasenia());
        
        cstmt.setInt(13, u.getPersona().getIdPersona());
        cstmt.setInt(14, u.getIdUsuario());
        
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }
    
    public List<Usuario> getAll(String filtro) throws Exception {
        //La consulta SQL a ejecutar:
        String query = "SELECT * FROM v_usuario WHERE nombreUsuario like '%"+filtro+"%'";

        //Con este objeto nos vamos a conectar a la Base de Datos:
        ConexionMySQL connMySQL = new ConexionMySQL();

        //Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();

        //Con este objeto ejecutaremos la consulta:
        //Para ejecutar instrucciones SQL
        PreparedStatement pstmt = conn.prepareStatement(query);

        //Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();

        //Cada registro de empleado lo agregamos a una lista
        List<Usuario> usuarios = new ArrayList<>();

        while (rs.next()) {
            usuarios.add(fill(rs));
        }

        //Cerramos conexion
        rs.close();
        pstmt.close();
        connMySQL.close();

        return usuarios;
    }
    
    private Usuario fill(ResultSet rs) throws Exception {
        Usuario u = new Usuario();
        Persona p = new Persona();

        //Le establecemos a persona los valores
        p.setIdPersona(rs.getInt("idPersona"));
        p.setNombre(rs.getString("nombre"));
        p.setPrimerApellido(rs.getString("primerApellido"));
        p.setSegundoApellido(rs.getString("segundoApellido"));
        p.setFechaNacimiento(rs.getString("fechaNacimiento"));
        p.setIdentificacion(rs.getString("identificacion"));
        p.setTelMovil(rs.getString("telMovil"));
        p.setCorreo(rs.getString("correo"));
        p.setCiudad(rs.getString("ciudad"));
        p.setEstado(rs.getString("estado"));
        p.setFotografia(rs.getString("fotografia"));    

        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setNombre(rs.getString("nombreUsuario"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setPersona(p);

        //Devolvemos cliente
        return u;
    }
    
    
}
