
package com.redata.frenzy.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.redata.frenzy.core.ControllerUsuario;
import com.redata.frenzy.model.Usuario;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("usuario")
public class RESTUsuario {
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosUsuario") @DefaultValue("") String datosUsuario) {
        String out = null;
        Gson gson = new Gson();
        Usuario usuario = null;
        ControllerUsuario cu = new ControllerUsuario();

        try {
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            if (usuario.getIdUsuario()== 0) {
                cu.insert(usuario);
            } else {
                cu.update(usuario);
            }
            
            out = Integer.toString(usuario.getIdUsuario());
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o en el formato.\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerUsuario cu = null;
        List<Usuario> clientes = null;
        try {
            cu = new ControllerUsuario();
            clientes = cu.getAll(filtro);
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
